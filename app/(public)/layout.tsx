import Footer from '@/components/footer'
import Navbar from '@/components/navbar'
import React from 'react'

const layout = () => {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
            <Navbar />
            <Footer />
        </div>
    )
}

export default layout
