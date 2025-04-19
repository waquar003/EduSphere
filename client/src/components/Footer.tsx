import Link from 'next/link'
import React from 'react'

const Footer = () => {
  const footerLinks = ["About", "Privacy Policy", "Licensing", "Contact"]
  
  return (
    <footer className="bg-white border-t border-border py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-gray-500 text-sm">&copy; 2025 EduSphere. All Rights Reserved</p>
          
          <div className="flex flex-wrap items-center space-x-6">
            {footerLinks.map((item) => (
              <Link 
                key={item}
                href={`/${item.toLowerCase().replace(" ","-")}`}
                className="text-gray-500 hover:text-primary text-sm transition-colors"
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer