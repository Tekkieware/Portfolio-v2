import React from 'react'

const Loader = ({text}: {text?: string}) => {
    return (
        <div className="flex flex-col items-center">
            <div className="relative w-24 h-24">
                <div className="absolute inset-0 border-4 border-purple-500/30 rounded-full animate-ping"></div>
                <div className="absolute inset-2 border-4 border-purple-500 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
                <div className="absolute inset-4 border-4 border-r-amber-500 border-t-transparent border-b-transparent border-l-transparent rounded-full animate-spin-slow"></div>
                <div className="absolute inset-6 border-4 border-b-emerald-500 border-t-transparent border-r-transparent border-l-transparent rounded-full animate-spin-slower"></div>
                <div className="absolute inset-8 border-4 border-l-rose-500 border-t-transparent border-r-transparent border-b-transparent rounded-full animate-spin"></div>
            </div>
            <div className="mt-4 text-purple-500 font-mono text-sm tracking-wider">{text}</div>
        </div>
    )
}

export default Loader