import { Loader2 } from 'lucide-react'
import React from 'react'

const Loading = () => {
  return (
    <div className='flex flex-col items-center justify-center h-64 w-full'>
        <Loader2 className="h-10 w-10 text-[#0056D2] animate-spin mb-2" />
        <span className="text-gray-600 font-medium">Loading...</span>
    </div>
  )
}

export default Loading