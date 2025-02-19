// "use client"
// import React from 'react'
// import LogoutUser from './LogoutUser'
// import { useRouter } from 'next/navigation'

// function CustomNavbar() {
//   const role = localStorage.getItem('user_role');
//   const Router = useRouter();
//   return (
//     <>
//       <div className='border shadow-md flex justify-between p-2 items-center sticky top-0'>
//         <div>
//             <p className='text-blue-600 text-2xl'>ESHOP</p>
//         </div>
//         <div>
//             <ul className='flex justify-center items-center gap-4'>
//               <li className='hover:text-blue-600 cursor-pointer hover:shadow p-2 hover:rounded' onClick={() => {Router.push('/products')}}>Home</li>
//               <li className='hover:text-blue-600 cursor-pointer hover:shadow p-2 hover:rounded' onClick={() => {Router.push('/cart')}}>Cart</li>
//               <li className='hover:text-blue-600 cursor-pointer hover:shadow p-2 hover:rounded' onClick={() => {Router.push('/orders')}}>Orders</li>
//               {role === 'admin' &&  <li className='hover:text-blue-600 cursor-pointer hover:shadow p-2 hover:rounded' onClick={() => {Router.push('/createproduct')}}>Add Product</li>}
//             </ul>
//         </div>
//         <div>
//           <LogoutUser/>
//         </div>
//       </div>
//     </>
//   )
// }

// export default CustomNavbar

"use client";
import React, { useState, useEffect } from "react";
import LogoutUser from "./LogoutUser";
import { useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";

function CustomNavbar() {
  const [role, setRole] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const Router = useRouter();

  useEffect(() => {
    setRole(localStorage.getItem("user_role"));
  }, []);

  return (
    <nav className="bg-white shadow-md fixed top-0 w-full z-50">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Logo */}
        <div className="text-blue-600 text-2xl font-bold cursor-pointer" onClick={() => Router.push("/")}>
          ESHOP
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-6 text-gray-700 font-medium">
          <li className="hover:text-blue-600 cursor-pointer transition" onClick={() => Router.push("/products")}>
            Home
          </li>
          <li className="hover:text-blue-600 cursor-pointer transition" onClick={() => Router.push("/cart")}>
            Cart
          </li>
          <li className="hover:text-blue-600 cursor-pointer transition" onClick={() => Router.push("/orders")}>
            Orders
          </li>
          {role === "admin" && (
            <li className="hover:text-blue-600 cursor-pointer transition" onClick={() => Router.push("/createproduct")}>
              Add Product
            </li>
          )}
        </ul>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-gray-700" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Logout Button (Desktop) */}
        <div className="hidden md:block">
          <LogoutUser />
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-lg rounded-lg absolute top-16 left-0 w-full text-center py-4">
          <ul className="flex flex-col gap-4 text-gray-700 font-medium">
            <li className="hover:text-blue-600 cursor-pointer transition" onClick={() => { setIsOpen(false); Router.push("/products"); }}>
              Home
            </li>
            <li className="hover:text-blue-600 cursor-pointer transition" onClick={() => { setIsOpen(false); Router.push("/cart"); }}>
              Cart
            </li>
            <li className="hover:text-blue-600 cursor-pointer transition" onClick={() => { setIsOpen(false); Router.push("/orders"); }}>
              Orders
            </li>
            {role === "admin" && (
              <li className="hover:text-blue-600 cursor-pointer transition" onClick={() => { setIsOpen(false); Router.push("/createproduct"); }}>
                Add Product
              </li>
            )}
            {/* Logout Button (Mobile) */}
            <div className="mt-4">
              <LogoutUser />
            </div>
          </ul>
        </div>
      )}
    </nav>
  );
}

export default CustomNavbar;
