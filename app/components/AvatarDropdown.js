import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AvatarDropdown({ name }) {
  const [isOpen, setIsOpen] = useState(false);
  const Router = useRouter();
  const username = name || "John Doe";

  return (
    <div className="relative inline-block text-left">
      <div
        className="w-12 h-12 bg-blue-500 text-white flex items-center justify-center rounded-full cursor-pointer capitalize"
        onClick={() => setIsOpen(!isOpen)}
      >
        {username.charAt(0)}
      </div>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg">
          <p className="capitalize bg-gray-100 text-center p-2 text-blue-600 font-semibold">{username}</p>
          <ul className="py-2">
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => setIsOpen(false)}>Profile</li>
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => setIsOpen(false)}>Settings</li>
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => {localStorage.removeItem('auth_token'); Router.push('/signin'); setIsOpen(false);}}>Logout</li>
          </ul>
        </div>
      )}
    </div>
  );
}