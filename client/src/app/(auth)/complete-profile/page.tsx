"use client"

import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { RadioGroup } from "@headlessui/react";
import { useUpdateUserMutation } from "@/state/api";

export default function CompleteProfilePage() {
    const [userType, setUserType] = useState<"student" | "teacher">("student");
    const { user, isLoaded: isUserLoaded } = useUser();
    const router = useRouter();
    const [updateUser, { isLoading }] = useUpdateUserMutation();

    const handleSubmit = async () => {
        if (!user || !isUserLoaded) return;

        try {
            // Update user metadata
            const updatedUser = {
                userId: user.id,
                publicMetadata: {
                    ...user.publicMetadata,
                    userType: userType
                }
            };

            await updateUser(updatedUser);
            console.log("User type updated successfully:", userType);
            await user.reload();
            
            setTimeout(() => {
                router.push(userType === "student" ? "/user/courses" : "/teacher/courses");
            }, 500);
            
        } catch (error) {
            console.error("Failed to update user type:", error);
        }
    };

    if (!isUserLoaded) {
        return (
            <div className="w-full max-w-md mx-auto p-8 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="w-full max-w-md mx-auto">
                <div className="bg-white p-8 rounded-lg shadow-md text-center">
                    <h2 className="text-2xl font-bold mb-4">Please Sign In</h2>
                    <p className="text-gray-600 mb-6">You need to be signed in to complete your profile.</p>
                    <button
                        onClick={() => router.push("/signin")}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md transition-colors"
                    >
                        Sign In
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full max-w-md mx-auto">
            <div className="bg-white p-8 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-2 text-center">Complete Your Profile</h2>
                <p className="text-gray-600 mb-6 text-center">Choose how you want to use our platform</p>

                <RadioGroup value={userType} onChange={setUserType} className="mb-6">
                    <div className="space-y-4">
                        <RadioGroup.Option
                            value="student"
                            className={({ checked }) =>
                                `${checked ? 'bg-blue-500 text-white' : 'bg-white'} 
                                relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md 
                                focus:outline-none border border-gray-200`
                            }
                        >
                            {({ checked }) => (
                                <div className="flex w-full items-center justify-between">
                                    <div className="text-sm">
                                        <RadioGroup.Label
                                            as="p"
                                            className={`font-medium ${checked ? 'text-white' : 'text-gray-900'}`}
                                        >
                                            Student
                                        </RadioGroup.Label>
                                        <RadioGroup.Description
                                            as="span"
                                            className={`inline ${checked ? 'text-blue-100' : 'text-gray-500'}`}
                                        >
                                            Join to access courses and learning materials
                                        </RadioGroup.Description>
                                    </div>
                                    {checked && (
                                        <div className="shrink-0 text-white">
                                            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none">
                                                <circle cx={12} cy={12} r={12} fill="currentColor" opacity="0.2" />
                                                <path
                                                    d="M7 13l3 3 7-7"
                                                    stroke="currentColor"
                                                    strokeWidth={2}
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                            </svg>
                                        </div>
                                    )}
                                </div>
                            )}
                        </RadioGroup.Option>

                        <RadioGroup.Option
                            value="teacher"
                            className={({ checked }) =>
                                `${checked ? 'bg-blue-500 text-white' : 'bg-white'} 
                                relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md 
                                focus:outline-none border border-gray-200`
                            }
                        >
                            {({ checked }) => (
                                <div className="flex w-full items-center justify-between">
                                    <div className="text-sm">
                                        <RadioGroup.Label
                                            as="p"
                                            className={`font-medium ${checked ? 'text-white' : 'text-gray-900'}`}
                                        >
                                            Teacher
                                        </RadioGroup.Label>
                                        <RadioGroup.Description
                                            as="span"
                                            className={`inline ${checked ? 'text-blue-100' : 'text-gray-500'}`}
                                        >
                                            Join to create and manage courses
                                        </RadioGroup.Description>
                                    </div>
                                    {checked && (
                                        <div className="shrink-0 text-white">
                                            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none">
                                                <circle cx={12} cy={12} r={12} fill="currentColor" opacity="0.2" />
                                                <path
                                                    d="M7 13l3 3 7-7"
                                                    stroke="currentColor"
                                                    strokeWidth={2}
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                            </svg>
                                        </div>
                                    )}
                                </div>
                            )}
                        </RadioGroup.Option>
                    </div>
                </RadioGroup>

                <button
                    onClick={handleSubmit}
                    disabled={isLoading}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors flex items-center justify-center"
                >
                    {isLoading ? (
                        <>
                            <div className="animate-spin mr-2 h-4 w-4 border-t-2 border-b-2 border-white rounded-full"></div>
                            Setting up your profile...
                        </>
                    ) : (
                        "Continue"
                    )}
                </button>
            </div>
        </div>
    );
}