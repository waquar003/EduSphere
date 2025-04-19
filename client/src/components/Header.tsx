import React from 'react'

const Header = ({ title, subtitle, rightElement }: HeaderProps) => {
  return (
    <div className='flex justify-between items-center mb-6 pb-4 border-b border-[#EEF0F2]'>
        <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-1">{title}</h1>
            <p className="text-gray-500">{subtitle}</p>
        </div>
        {rightElement && <div>{rightElement}</div>}
    </div>
  )
}

export default Header