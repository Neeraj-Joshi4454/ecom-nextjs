// "use client"

// import { useState } from 'react';

// export default function CreateProduct() {
//   const [name, setName] = useState('');
//   const [description, setDescription] = useState('');
//   const [price, setPrice] = useState('');
//   const [image, setImage] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     const formData = new FormData();
//     formData.append('name', name);
//     formData.append('description', description);
//     formData.append('price', price);
//     formData.append('image', image);

//     const token = localStorage.getItem('auth_token')
//     const response = await fetch('/api/products', {
//       method: 'POST',
//       body: formData,
//       headers: {
//         'Authorization': `Bearer ${token}`,
//       },
//     });

//     const result = await response.json();

//     if (result.success) {
//       alert('Product created successfully!');
//       setName('');
//       setDescription('');
//       setPrice('');
//       setImage(null);
//     } else {
//       alert('Failed to create product: ' + result.error);
//     }

//     setLoading(false);
//   };

//   return (
//     <div>
//       <h1>Create Product</h1>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Name:</label>
//           <input
//             type="text"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             required
//           />
//         </div>
//         <div>
//           <label>Description:</label>
//           <textarea
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             required
//           />
//         </div>
//         <div>
//           <label>Price:</label>
//           <input
//             type="number"
//             value={price}
//             onChange={(e) => setPrice(e.target.value)}
//             required
//           />
//         </div>
//         <div>
//           <label>Image:</label>
//           <input
//             type="file"
//             onChange={(e) => setImage(e.target.files[0])}
//             required
//           />
//         </div>
//         <button type="submit" disabled={loading}>
//           {loading ? 'Creating...' : 'Create Product'}
//         </button>
//       </form>
//     </div>
//   );
// }


"use client";

import { useState } from "react";

export default function Page() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("image", image);

    const token = localStorage.getItem("auth_token");
    const response = await fetch("/api/products", {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const result = await response.json();

    if (result.success) {
      alert("Product created successfully!");
      setName("");
      setDescription("");
      setPrice("");
      setImage(null);
    } else {
      alert("Failed to create product: " + result.error);
    }

    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-lg">
        <h1 className="text-2xl font-semibold text-gray-700 text-center mb-6">
          Create Product
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Field */}
          <div>
            <label className="block text-gray-600 font-medium">Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-600 font-medium">
              Description:
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-600 font-medium">Price:</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-600 font-medium">Image:</label>
            <input
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition flex items-center justify-center"
          >
            {loading ? (
              <span className="animate-spin border-2 border-white border-t-transparent rounded-full h-5 w-5 mr-2"></span>
            ) : (
              "Create Product"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
