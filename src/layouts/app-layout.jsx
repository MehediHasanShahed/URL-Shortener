import Header from '@/components/header'
import React from 'react'
import { Outlet } from 'react-router-dom'

const AppLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      
      <main className="container mx-auto min-h-screen">
        {/* Header */}
        <Header />

        {/* Body */}
        <div>
          <Outlet />
        </div>
      </main>

      {/* Footer */}
      <footer className="p-10 text-center bg-gray-800 mt-10">
        © 2025 URL Shortener. All rights reserved.
      </footer>
    </div>
  )
}

export default AppLayout
