import Stripe from "stripe"
import dotenv from "dotenv"
import { Request, Response } from "express";
import Course from "../models/course.model";
import Transaction from "../models/transaction.model";
import UserCourseProgress from "../models/userCourseProgress.model";

dotenv.config();

if(!process.env.STRIPE_SECRET_KEY) {
    throw new Error("STRIPE_SECRET_KEY is not defined")
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export const createStripePaymentIntent = async (
  req: Request,
  res: Response
): Promise<void> => {
  let { amount } = req.body;

  if (!amount || amount <= 0) amount = 50;

  try {
    // Hardcoded Indian customer info
    const customer = await stripe.customers.create({
      name: "Rahul Sharma",
      email: "rahul.sharma@example.in",
      address: {
        line1: "22 MG Road",
        city: "Bengaluru",
        state: "Karnataka",
        postal_code: "560001",
        country: "IN", // INDIA
      },
    });

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
      customer: customer.id,
      automatic_payment_methods: {
        enabled: true,
        allow_redirects: "never",
      },
      description: "Purchase of online course",
    });

    res.json({
      message: "Payment intent created successfully",
      data: {
        clientSecret: paymentIntent.client_secret,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Error creating payment intent",
      error: error instanceof Error ? error.message : error,
    });
  }
};



export const createTransaction = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    const { userId, courseId, transactionId, amount, paymentProvider } = req.body;
  
    try {
      // 1. get course info
      const course = await Course.get(courseId);
  
      // 2. create transaction record
      const newTransaction = new Transaction({
        dateTime: new Date().toISOString(),
        userId,
        courseId,
        transactionId,
        amount,
        paymentProvider,
      });
      await newTransaction.save();
  
      // 3. create initial course progress
      const initialProgress = new UserCourseProgress({
        userId,
        courseId,
        enrollmentDate: new Date().toISOString(),
        overallProgress: 0,
        sections: course.sections.map((section: any) => ({
          sectionId: section.sectionId,
          chapters: section.chapters.map((chapter: any) => ({
            chapterId: chapter.chapterId,
            completed: false,
          })),
        })),
        lastAccessedTimestamp: new Date().toISOString(),
      });
      await initialProgress.save();
  
      // 4. add enrollment to relevant course
      await Course.update(
        { courseId },
        {
          $ADD: {
            enrollments: [{ userId }],
          },
        }
      );
  
      res.json({
        message: "Purchased Course successfully",
        data: {
          transaction: newTransaction,
          courseProgress: initialProgress,
        },
      });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error creating transaction and enrollment", error });
    }
};


export const listTransactions = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    const { userId } = req.query;
  
    try {
      const transactions = userId
        ? await Transaction.query("userId").eq(userId).exec()
        : await Transaction.scan().exec();
  
      res.json({
        message: "Transactions retrieved successfully",
        data: transactions,
      });
    } catch (error) {
      res.status(500).json({ message: "Error retrieving transactions", error });
    }
  };