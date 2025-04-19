"use client"

import { NotificationSettingsFormData, notificationSettingsSchema } from '@/lib/schemas';
import { useUpdateUserMutation } from '@/state/api';
import { useUser } from '@clerk/nextjs'
import React from 'react'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Header from './Header';
import { Form } from './ui/form';
import { CustomFormField } from './CustomFormField';
import { Button } from './ui/button';

const SharedNotificationSettings = ({
    title="Notification Settings",
    subtitle="Manage your notification settings",
}: SharedNotificationSettingsProps) => {

    const { user } = useUser();
    const [updateUser] = useUpdateUserMutation()

    const currentSettings = (user?.publicMetadata as { settings?: UserSettings })?.settings || {}
  
    const methods = useForm<NotificationSettingsFormData>({
        resolver: zodResolver(notificationSettingsSchema),
        defaultValues: {
            courseNotifications: currentSettings.courseNotifications || false,
            emailAlerts: currentSettings.emailAlerts || false,
            smsAlerts: currentSettings.smsAlerts || false,
            notificationFrequency: currentSettings.notificationFrequency || "daily",
        },
    })

    const onSubmit = async (data: NotificationSettingsFormData) => {
        if(!user) return;

        const updatedUser = {
            userId: user.id,
            publicMetadata: {
                ...user.publicMetadata,
                settings: {
                    ...currentSettings,
                    ...data,
                }
            }
        }

        try {
            await updateUser(updatedUser)
        } catch (error) {
            console.error("Failed to update user settings: ", error);
        }
    }

    if(!user) return (
        <div className="w-full p-8 text-center text-lg text-gray-600 bg-white rounded-lg shadow-md">
            Please sign in to manage your settings.
        </div>
    )
    
    return (
        <div className="w-full bg-white rounded-lg shadow-md p-6">
            <Header title={title} subtitle={subtitle} /> 
            <Form {...methods}>
                <form 
                    onSubmit={methods.handleSubmit(onSubmit)}
                    className="mt-8 space-y-6"
                >
                    <div className="space-y-5 divide-y divide-[#EEF0F2]">
                        <div className="py-4">
                            <CustomFormField
                                name="courseNotification"
                                label='Course Notifications'
                                type='switch'
                            />
                        </div>
                        
                        <div className="py-4">
                            <CustomFormField
                                name="emailAlert"
                                label='Email Alert'
                                type='switch'
                            />
                        </div>
                        
                        <div className="py-4">
                            <CustomFormField
                                name="smsAlert"
                                label='SMS Alert'
                                type='switch'
                            />
                        </div>
                        
                        <div className="py-4">
                            <CustomFormField
                                name="notificationFrequency"
                                label='Notification Frequency'
                                type='select'
                                options={[
                                    { value: "immediate", label: "Immediate"},
                                    { value: "daily", label: "Daily"},
                                    { value: "weekly", label: "Weekly"},
                                ]}
                            />
                        </div>
                    </div>

                    <Button 
                        type='submit' 
                        className="w-full sm:w-auto px-6 py-3 bg-[#0056D2] hover:bg-[#004BB4] text-white font-medium rounded-md shadow-sm transition-colors duration-200 flex items-center justify-center"
                    >
                        Update Settings
                    </Button>
                </form>
            </Form>
        </div>
    )
}

export default SharedNotificationSettings