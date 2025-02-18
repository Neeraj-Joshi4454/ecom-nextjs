"use client"
import logout from '@/utils/logout';
import { useRouter } from 'next/navigation'
import React from 'react'

function LogoutUser() {
  const Router = useRouter();
  const handleLogout = () => {
    logout();
    Router.push('/signin')
  }
  return (
    <>
        <button className='bg-red-700 text-white rounded-md p-2' onClick={handleLogout}>Logout</button>
    </>
  )
}

export default LogoutUser