import React from 'react'

const Layout = ({children}: {children: React.ReactNode}) => {
  return (
    <div className='min-h-screen bg-[#F5F7FA] flex flex-col'>
      <div className='w-full py-6 px-4 bg-white shadow-sm'>
        <div className='max-w-7xl mx-auto'>
          <h1 className='text-[#0056D2] font-bold text-2xl'>EduSphere</h1>
        </div>
      </div>
      <main className='flex-grow flex flex-col justify-center items-center px-4 py-8'>
        {children}
      </main>
      <footer className='w-full py-4 px-4 bg-white border-t border-[#EEF0F2] text-center'>
        <div className='max-w-7xl mx-auto'>
          <p className='text-gray-500 text-sm'>© {new Date().getFullYear()} EduSphere LMS. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default Layout