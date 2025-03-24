import SharedNotificationSettings from '@/components/SharedNotificationSettings'
import React from 'react'

const UserSetting = () => {
  return (
    <div className="w-3/5">
        <SharedNotificationSettings 
            title='User settings'
            subtitle='Manage your user settings'
        />
    </div>
  )
}

export default UserSetting