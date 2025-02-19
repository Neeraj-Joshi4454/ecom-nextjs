"use client";
import { useRouter } from "next/navigation";

export default function LandingPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center px-6">
      {/* Hero Section */}
      <div className="text-center">
        <h1 className="text-5xl font-extrabold text-blue-600 mb-4">
          Welcome to eShop
        </h1>
        <p className="text-lg text-gray-700 mb-6">
          Discover the best deals on your favorite products. Shop now and enjoy seamless online shopping.
        </p>

        {/* CTA Buttons */}
        <div className="flex space-x-4">
          <button
            onClick={() => router.push("/signin")}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-700 transition"
          >
            Sign In
          </button>
          <button
            onClick={() => router.push("/signup")}
            className="bg-gray-200 text-blue-600 px-6 py-3 rounded-lg shadow-lg hover:bg-gray-300 transition"
          >
            Sign Up
          </button>
        </div>
      </div>
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-white rounded-lg shadow-md text-center">
          <h3 className="text-xl font-semibold text-blue-600 mb-2">Best Deals</h3>
          <p className="text-gray-600">Get the best prices on top products every day.</p>
        </div>
        <div className="p-6 bg-white rounded-lg shadow-md text-center">
          <h3 className="text-xl font-semibold text-blue-600 mb-2">Fast Delivery</h3>
          <p className="text-gray-600">Enjoy fast and reliable shipping on all your orders.</p>
        </div>
        <div className="p-6 bg-white rounded-lg shadow-md text-center">
          <h3 className="text-xl font-semibold text-blue-600 mb-2">Secure Payments</h3>
          <p className="text-gray-600">Pay with confidence using our secure payment gateway.</p>
        </div>
      </div>
    </div>
  );
}
