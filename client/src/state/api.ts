import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BaseQueryApi, BaseQueryFn, FetchArgs } from "@reduxjs/toolkit/query";
import { User } from "@clerk/nextjs/server";
import { Clerk } from "@clerk/clerk-js"
import { toast } from "sonner";

const customBaseQuery = async (
    args: string | FetchArgs,
    api: BaseQueryApi,
    extraOptions: any
) => {
    const baseQuery = fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
        prepareHeaders: async (headers) => {
            const token = await window.Clerk?.session?.getToken()
            if(token) {
                headers.set("Authorization", `Bearer ${token}`)
            }
            return headers
        }
    });

    try {
        const result: any = await baseQuery(args, api, extraOptions);

        if(result.error) {
            const errorData = result.error.data;
            const errorMessage = errorData?.message || result.error.status.toString() || "An error occurred";
            toast.error(`Error: ${errorMessage}`)
        }

        const isMuatationRequest = (args as FetchArgs).method && (args as FetchArgs).method !== "GET";

        if(isMuatationRequest) {
            const successMessage = result.data?.message || "Request processed Successfully";
            toast.success(successMessage)
        }

        if(result.data) {
            return { data: result.data };
        } else if (
            result.meta?.response?.status === 24 ||
            result.error.status === 204
        ){
            return { data: null }
        }
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
    
        return { error: { status: "FETCH_ERROR", error: errorMessage } };
    }
}

export const api = createApi({
    baseQuery: customBaseQuery as BaseQueryFn,
    reducerPath: "api",
    tagTypes: ["Courses", "Users"],
    endpoints: (build) => ({
        getCourses: build.query<Course[], { category?: string }>({
            query: ({ category }) => ({
                url: "courses",
                params: { category },
            }),
            providesTags: ["Courses"],
        }),
        getCourse: build.query<Course, string>({
            query: (id) => `course/${id}`,
            providesTags: (result, error, id) => [{ type: "Courses", id }],
        }),
        updateUser: build.mutation<User, Partial<User> & { userId: string }>({
            query: ({ userId, ...updatedUser }) => ({
                url: `users/clerk/${userId}`,
                method: "PUT",
                body: updatedUser,
            }),
            invalidatesTags: ["Users"]
        }),

        createStripePaymentIntent: build.mutation<
            { clientSecret: string },
            { amount: number }
        >({
            query: ({ amount }) => ({
                url: `/transactions/stripe/payment-intent`,
                method: "POST",
                body: { amount },
            }),
        }),
        createTransaction: build.mutation<Transaction, Partial<Transaction>>({
            query: (transaction) => ({
                url: "transactions",
                method: "POST",
                body: transaction,
            }),
        }),
    }),
})
export const {
    useGetCoursesQuery,
    useGetCourseQuery,
    useUpdateUserMutation,
    useCreateStripePaymentIntentMutation,
    useCreateTransactionMutation,
} = api;