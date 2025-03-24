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
    subtitle="Manaage your notification settings",
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
        if(!user)   return ;

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

    if(!user)   return <div>Please sign i to mannage your settings.</div>
    return (
        <div className='notification-settings'>
            <Header title={title} subtitle={subtitle} /> 
            <Form {...methods}>
                <form 
                    onSubmit={methods.handleSubmit(onSubmit)}
                    className='notification-settings__form'
                >
                    <div className="notification-settings__fields">
                        <CustomFormField
                            name="courseNotification"
                            label='Course Notifications'
                            type='switch'
                        />
                        
                        <CustomFormField
                            name="emailAlert"
                            label='Email Alert'
                            type='switch'
                        />
                        
                        <CustomFormField
                            name="smsAlert"
                            label='SMS Alert'
                            type='switch'
                        />
                        
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

                    <Button type='submit' className='notification-settings__submit'>
                        Update Settings
                    </Button>
                </form>
            </Form>
        </div>
  )
}

export default SharedNotificationSettings