// "use client";
// import { deleteCartItem, fetchCart, updateCartQuantity } from "@/redux/slices/cartSlice";
// import handlePayment from "@/utils/handlePayment";
// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { toast } from "react-toastify";

// export default function Page() {
//   const dispatch = useDispatch();
//   const [total, setTotal] = useState(0);
//   const { cart, loading, error } = useSelector((state) => state.cart);

//   useEffect(() => {
//     dispatch(fetchCart());
//   }, [dispatch]);

//   const handleIncrement = async (itemId, quantity) => {
//     await dispatch(updateCartQuantity({ itemId, quantity: quantity + 1 }));
//     dispatch(fetchCart())
//   };

//   const handleDecrement = async (itemId, quantity) => {
//     if (quantity > 1) {
//       await dispatch(updateCartQuantity({ itemId, quantity: quantity - 1 }));
//       dispatch(fetchCart())
//     }
//   };

//   const handleDelete = (itemId) => {
//     dispatch(deleteCartItem({ itemId }))
//     .unwrap()
//           .then(() => {
//             toast.error("Product removed from cart!");
//           })
//           .catch((error) => {
//             toast.error(error || "Failed to remove product");
//           });
//   };

//   if (loading) return <p className="text-center text-lg">Loading...</p>;
//   if (error) return <p className="text-center text-red-500">Error: {error}</p>;

//   return (
//     <div className="max-w-4xl mx-auto p-6">
//       <h2 className="text-2xl font-semibold mb-4">Your Cart</h2>
//       {cart?.items?.length > 0 ? (

//         <div className="space-y-4">
//           {cart.items.map((item) => (
//             <div key={item._id} className="flex justify-between items-center border p-4 rounded-lg">
//               <div>
//                 <h3 className="text-lg font-semibold">{item.productId.name}</h3>
//                 <p className="text-gray-600">Price: ${item.productId.price}</p>
//                 <div className="flex items-center mt-2">
//                   <button
//                     onClick={() => handleDecrement(item._id, item.quantity)}
//                     className="px-2 py-1 bg-gray-200 rounded-lg"
//                   >
//                     -
//                   </button>
//                   <span className="px-4">{item.quantity}</span>
//                   <button
//                     onClick={() => handleIncrement(item._id, item.quantity)}
//                     className="px-2 py-1 bg-gray-200 rounded-lg"
//                   >
//                     +
//                   </button>
//                 </div>
//               </div>
//               <button
//                 onClick={() => handleDelete(item._id)}
//                 className="text-red-500 hover:text-red-700"
//               >
//                 Remove
//               </button>
//             </div>
//           ))}
//           <div className="mt-4 text-xl font-semibold">
//             Total: $
//             {cart.items.reduce((acc, item) => acc + item.productId.price * item.quantity, 0)}
//           </div>
//         </div>
//       ) : (
//         <p className="text-center text-gray-500">Your cart is empty.</p>
//       )}

//       <button onClick={async () => {
//         await setTotal(cart.items.reduce((acc, item) => acc + item.productId.price * item.quantity, 0))
//         handlePayment(total)}}>checkout</button>
//     </div>
//   );
// }

"use client";
import {
  deleteCartItem,
  fetchCart,
  updateCartQuantity,
} from "@/redux/slices/cartSlice";
import handlePayment from "@/utils/handlePayment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

function Page() {
  const dispatch = useDispatch();
  const [total, setTotal] = useState(0);
  const { cart, loading, error } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const handleIncrement = async (itemId, quantity) => {
    await dispatch(updateCartQuantity({ itemId, quantity: quantity + 1 }));
    dispatch(fetchCart());
  };

  const handleDecrement = async (itemId, quantity) => {
    if (quantity > 1) {
      await dispatch(updateCartQuantity({ itemId, quantity: quantity - 1 }));
      dispatch(fetchCart());
    }
  };

  const handleDelete = (itemId) => {
    dispatch(deleteCartItem({ itemId }))
      .unwrap()
      .then(() => {
        toast.error("Product removed from cart!");
      })
      .catch((error) => {
        toast.error(error || "Failed to remove product");
      });
  };

  if (loading)
    return (
      <p className="text-center text-lg font-medium text-gray-700">
        Loading...
      </p>
    );
  if (error)
    return (
      <p className="text-center text-red-500 font-medium">Error: {error}</p>
    );

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 border-b pb-2">
        Your Cart
      </h2>
      {cart?.items?.length > 0 ? (
        <div className="space-y-6">
          {cart.items.map((item) => (
            <div
              key={item._id}
              className="flex items-center justify-between p-4 bg-gray-100 rounded-lg shadow-md"
            >
              <div className="flex items-center space-x-4">
                <img
                  src={item.productId.image}
                  alt={item.productId.name}
                  className="w-16 h-16 object-cover rounded-md"
                />
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {item.productId.name}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    ₹{item.productId.price}
                  </p>
                  <div className="flex items-center mt-2 space-x-2">
                    <button
                      onClick={() => handleDecrement(item._id, item.quantity)}
                      className="px-3 py-1 bg-gray-300 text-gray-700 font-bold rounded-md hover:bg-gray-400"
                    >
                      −
                    </button>
                    <span className="px-4 text-lg font-semibold">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => handleIncrement(item._id, item.quantity)}
                      className="px-3 py-1 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
              <button
                onClick={() => handleDelete(item._id)}
                className="text-red-500 font-medium hover:text-red-700 transition"
              >
                Remove
              </button>
            </div>
          ))}
          <div className="mt-6 text-xl font-bold text-gray-800 flex justify-between border-t pt-4">
            <span>Total:</span>
            <span>
              ₹
              {cart.items.reduce(
                (acc, item) => acc + item.productId.price * item.quantity,
                0
              )}
            </span>
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-500 text-lg">Your cart is empty.</p>
      )}

      {cart?.items?.length > 0 && (
        <button
          onClick={async () => {
            await setTotal(
              cart.items.reduce(
                (acc, item) => acc + item.productId.price * item.quantity,
                0
              )
            );
            handlePayment(total);
          }}
          className="mt-6 w-full bg-green-500 text-white font-semibold py-3 rounded-lg shadow-md hover:bg-green-600 transition"
        >
          Proceed to Checkout
        </button>
      )}
    </div>
  );
}

export default Page;
