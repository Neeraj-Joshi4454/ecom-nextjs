"use client"
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchProducts } from '../../redux/slices/productSlice'; 
import { addToCart, fetchCart } from '@/redux/slices/cartSlice';
import { toast } from "react-toastify";


const ProductsPage = () => {
  const dispatch = useDispatch();
  const { items, status, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);


  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  const handleAddToCart = (id) => {
    dispatch(addToCart({ productId:id, quantity: 1 }))
    .unwrap()
      .then(() => {
        toast.success("Product added to cart!");
      })
      .catch((error) => {
        toast.error(error || "Failed to add product");
      });
  }



  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
      <h1 className="text-2xl text-blue-600 mb-4 text-center">Products</h1>
      {status === 'loading' && <p>Loading...</p>}
      {status === 'failed' && <p className="text-red-500">{error}</p>}
      {status === 'succeeded' && (
        <div className="grid grid-cols-3 gap-6">
          {items?.map((product) => (
            <div key={product._id} className="border p-4 rounded-md w-[18rem] h-[40vh] overflow-scroll">
              <img src={product.image} alt={product.name} className="w-full h-[20vh]" />
              <h2 className="text-xl">{product.name}</h2>
              <p>{product.description}</p>
              <p className="text-lg font-bold">{product.price}rs</p>
              <button className='bg-blue-600 text-white p-2 shadow rounded mt-2' onClick={() => handleAddToCart(product._id)}>Add to cart</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductsPage;
