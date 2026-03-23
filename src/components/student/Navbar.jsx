import { useState } from 'react'

const Navbar = ({ student, onLogout }) => {
  return (
    <nav className="bg-[#312783] text-[#F3F4F8] shadow-sm sticky top-0 z-40" style={{ fontFamily: "'Sora', sans-serif" }}>
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-white">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
            </svg>
            <h1 className="text-xl font-bold tracking-tight text-white hidden sm:block">StudentHomeFinder</h1>
          </div>
          <div className="hidden md:flex items-center gap-8 text-[15px] font-medium text-[#D1D5DB]">
            <a href="#" className="hover:text-white transition-colors">Home</a>
            <div className="relative">
              <a href="#" className="text-white pb-1">Search</a>
              <div className="absolute -bottom-[21px] left-0 w-full h-[3px] bg-white rounded-t-sm"></div>
            </div>
            <a href="#" className="hover:text-white transition-colors">Favorites</a>
            <a href="#" className="hover:text-white transition-colors">Profile</a>
          </div>
          <div className="flex items-center gap-3">
             <button onClick={onLogout} className="bg-[#5D529B] hover:bg-[#4A408A] text-white px-5 py-2 rounded-full text-sm font-medium transition-colors">Log In / Sign Up</button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
