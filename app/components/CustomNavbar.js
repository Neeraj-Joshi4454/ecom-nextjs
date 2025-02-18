import React from 'react'
import LogoutUser from './LogoutUser'

function CustomNavbar() {
  return (
    <>
      <div className='border shadow-md flex justify-between p-2 items-center'>
        <div>
            <p className='text-blue-600 text-2xl'>ESHOP</p>
        </div>
        <div>
            <ul className='flex justify-center items-center gap-4'>
              <li>Cart</li>
              <li>Orders</li>
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