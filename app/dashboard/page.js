"use client";
import { deleteProduct, fetchProducts } from "@/redux/slices/productSlice";
import { fetchUsers } from "@/redux/slices/usersSlice";
import { useEffect, useState } from "react";
import { FiBox, FiUsers, FiSettings, FiLogOut } from "react-icons/fi";
import { MdDashboard } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import logout from "@/utils/logout";
import Image from "next/image";
import { useRouter } from "next/navigation";
import AddProductModal from "@/utils/modal";

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");
  const { count: productCount, items: productItems } = useSelector(
    (state) => state.products
  );
  const { count: userCount, items: userItems } = useSelector(
    (state) => state.users
  );
  const Router = useRouter();

  const menuItems = [
    { name: "Dashboard", icon: <MdDashboard />, tab: "dashboard" },
    { name: "Products", icon: <FiBox />, tab: "products" },
    { name: "Users", icon: <FiUsers />, tab: "users" },
    { name: "Settings", icon: <FiSettings />, tab: "settings" },
  ];

  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-600 text-white p-6 space-y-6">
        <h1 className="text-2xl font-bold">Admin Panel</h1>
        <nav>
          {menuItems.map((item) => (
            <button
              key={item.tab}
              onClick={() => setActiveTab(item.tab)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition ${
                activeTab === item.tab ? "bg-blue-700" : "hover:bg-blue-500"
              }`}
            >
              {item.icon}
              <span>{item.name}</span>
            </button>
          ))}
          <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition hover:bg-red-500 mt-6">
            <FiLogOut />
            <span
              onClick={() => {
                logout();
                Router.push("/signin");
              }}
            >
              Logout
            </span>
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        {/* Dashboard Cards */}
        {activeTab === "dashboard" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-lg font-semibold">Total Products</h3>
              <p className="text-2xl font-bold">{productCount}</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-lg font-semibold">Total Users</h3>
              <p className="text-2xl font-bold">{userCount}</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-lg font-semibold">Total Orders</h3>
              <p className="text-2xl font-bold">2</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-lg font-semibold">Revenue</h3>
              <p className="text-2xl font-bold">₹60,000</p>
            </div>
          </div>
        )}

        {/* Product List */}
        {activeTab === "products" && (
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-bold mb-4">Product List</h2>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg mb-4" onClick={() => Router.push('/createproduct')}>
              Add Product
            </button>
            {/* <AddProductModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} /> */}
            <table className="w-full text-left border-collapse overflow-y-scroll h-[30vh]">
              <thead>
                <tr className="bg-gray-200">
                  <th className="p-2">Image</th>
                  <th className="p-2">Name</th>
                  <th className="p-2">Category</th>
                  <th className="p-2">Price</th>
                  <th className="p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {productItems.length > 0 ? (
                  productItems.map((product) => (
                    <tr
                      key={product._id}
                      className="border-b hover:bg-gray-100"
                    >
                      <td className="p-2">
                        <Image
                          height={100}
                          width={100}
                          src={product.image}
                          alt={product.name}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                      </td>
                      <td className="p-2 font-medium">{product.name}</td>
                      <td className="p-2 text-gray-600">{product.category}</td>
                      <td className="p-2 font-bold text-blue-600">
                        ₹{product.price}
                      </td>
                      <td className="p-2 space-x-2">
                        <button onClick={() => {
                          localStorage.setItem('product', JSON.stringify(product))
                          Router.push(`/createproduct/${product._id}`)}}  className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600">
                          Edit
                        </button>
                        <button onClick={() => {dispatch(deleteProduct(product._id))}} className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600">
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="p-2 text-center text-gray-500">
                      No products found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === "users" && (
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-bold mb-4">User List</h2>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-200">
                  <th className="p-2">Name</th>
                  <th className="p-2">Email</th>
                  <th className="p-2">Role</th>
                </tr>
              </thead>
              <tbody>
                {userItems.length > 0 ? (
                  userItems.map((user) => (
                    <tr key={user._id} className="border-b hover:bg-gray-100">
                      <td className="p-2 font-medium">
                        {user.first_name} {user.last_name}
                      </td>
                      <td className="p-2 text-gray-600">{user.email}</td>
                      <td
                        className={`p-2 font-bold ${
                          user.role === "admin"
                            ? "text-red-600"
                            : "text-blue-600"
                        }`}
                      >
                        {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="p-2 text-center text-gray-500">
                      No users found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
