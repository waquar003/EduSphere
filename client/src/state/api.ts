import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BaseQueryApi, BaseQueryFn, FetchArgs } from "@reduxjs/toolkit/query";
import { User } from "@clerk/nextjs/server";

const customBaseQuery = async (
    args: string | FetchArgs,
    api: BaseQueryApi,
    extraOptions: any
) => {
    const baseQuery = fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
    });

    try {
        const result: any = await baseQuery(args, api, extraOptions);

        if(result.data) {
            return { data: result.data };
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
    }),
})
export const {
    useGetCoursesQuery,
    useGetCourseQuery,
    useUpdateUserMutation,
} = api;