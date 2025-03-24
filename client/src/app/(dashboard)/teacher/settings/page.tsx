import SharedNotificationSettings from '@/components/SharedNotificationSettings'
import React from 'react'

const TeacherSettings = () => {
  return (
    <div className="w-3/5">
        <SharedNotificationSettings 
            title='Teacher settings'
            subtitle='Manage your teacher settings'
        />
    </div>
  )
}

export default TeacherSettings