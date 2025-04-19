"use client";

import Loading from "@/components/Loading";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatPrice } from "@/lib/utils";
import { useGetTransactionsQuery } from "@/state/api";
import { useUser } from "@clerk/nextjs";
import React, { useState } from "react";

const TeacherBilling = () => {
  const [paymentType, setPaymentType] = useState("all");
  const { user, isLoaded } = useUser();

  const { data: transactions, isLoading: isLoadingTransactions } =
    useGetTransactionsQuery(user?.id || "", {
      skip: !isLoaded || !user,
    });

  // Safely extract the actual array of transactions
  const rawData = transactions?.data || [];

  const filteredData = rawData.filter((transaction) => {
    const matchesTypes =
      paymentType === "all" || transaction.paymentProvider === paymentType;
    return matchesTypes;
  });

  if (!isLoaded) return <Loading />;
  if (!user) return <div className="p-8 text-center text-lg text-gray-600 bg-[#F5F7FA] rounded-lg shadow-sm">Please sign in to view your billing information.</div>;

  return (
    <div className="w-full bg-[#F5F7FA] px-4 py-6">
      <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Payment History</h2>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
          <Select value={paymentType} onValueChange={setPaymentType}>
            <SelectTrigger className="w-full sm:w-48 border border-[#EEF0F2] rounded-md bg-white">
              <SelectValue placeholder="Payment Type" />
            </SelectTrigger>

            <SelectContent className="bg-white border border-[#EEF0F2] rounded-md shadow-md">
              <SelectItem className="hover:bg-[#D8E8FF] cursor-pointer" value="all">
                All Types
              </SelectItem>
              <SelectItem className="hover:bg-[#D8E8FF] cursor-pointer" value="stripe">
                Stripe
              </SelectItem>
              <SelectItem className="hover:bg-[#D8E8FF] cursor-pointer" value="paypal">
                Paypal
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="w-full overflow-x-auto">
          {isLoadingTransactions ? (
            <div className="flex justify-center p-8">
              <Loading />
            </div>
          ) : (
            <Table className="w-full border-collapse">
              <TableHeader className="bg-[#F5F7FA]">
                <TableRow className="border-b border-[#EEF0F2]">
                  <TableHead className="py-3 px-4 text-left font-semibold text-gray-700">Date</TableHead>
                  <TableHead className="py-3 px-4 text-left font-semibold text-gray-700">Amount</TableHead>
                  <TableHead className="py-3 px-4 text-left font-semibold text-gray-700">
                    Payment Method
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.length > 0 ? (
                  filteredData.map((transaction) => (
                    <TableRow
                      className="border-b border-[#EEF0F2] hover:bg-[#F5F7FA] transition-colors duration-150"
                      key={transaction.transactionId}
                    >
                      <TableCell className="py-3 px-4 text-gray-700">
                        {new Date(transaction.dateTime).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="py-3 px-4 font-medium text-[#0056D2]">
                        {formatPrice(transaction.amount)}
                      </TableCell>
                      <TableCell className="py-3 px-4 text-gray-700 capitalize">
                        {transaction.paymentProvider}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      className="py-8 text-center text-gray-500"
                      colSpan={3}
                    >
                      No transactions to display
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeacherBilling;