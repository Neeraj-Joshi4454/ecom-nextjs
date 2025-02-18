"use client"
import React from 'react'
import LogoutUser from './LogoutUser'
import { useRouter } from 'next/navigation'

function CustomNavbar() {
  const Router = useRouter();
  return (
    <>
      <div className='border shadow-md flex justify-between p-2 items-center sticky top-0'>
        <div>
            <p className='text-blue-600 text-2xl'>ESHOP</p>
        </div>
        <div>
            <ul className='flex justify-center items-center gap-4'>
              <li className='hover:text-blue-600 cursor-pointer hover:shadow p-2 hover:rounded' onClick={() => {Router.push('/products')}}>Home</li>
              <li className='hover:text-blue-600 cursor-pointer hover:shadow p-2 hover:rounded' onClick={() => {Router.push('/cart')}}>Cart</li>
              <li className='hover:text-blue-600 cursor-pointer hover:shadow p-2 hover:rounded' onClick={() => {Router.push('/orders')}}>Orders</li>
            </ul>
        </div>
        <div>
          <LogoutUser/>
        </div>
      </div>
    </>
  )
}

export default CustomNavbar