import SharedNotificationSettings from '@/components/SharedNotificationSettings'
import React from 'react'

const TeacherSettings = () => {
  return (
    <div className="w-full md:w-4/5 lg:w-3/5 mx-auto px-4 py-6 bg-[#F5F7FA]">
        <SharedNotificationSettings 
            title='Teacher settings'
            subtitle='Manage your teacher settings'
        />
    </div>
  )
}

export default TeacherSettings