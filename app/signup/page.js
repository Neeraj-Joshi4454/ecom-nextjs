"use client"
import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/navigation';


const RegisterPage = () => {
  const Router = useRouter();
  const [errorMessage, setErrorMessage] = useState('');

  const formik = useFormik({
    initialValues: {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      first_name: Yup.string().required('First name is required'),
      last_name: Yup.string().required('Last name is required'),
      email: Yup.string().email('Invalid email address').required('Email is required'),
      password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    }),
    onSubmit: async (values) => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(values),
        });

        const data = await response.json();

        if (response.status === 201) {
          alert('Registration successful');
        } else {
          setErrorMessage('User already exists');
        }
      } catch (error) {
        setErrorMessage('Internal Server Error');
      }
    },
  });

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h1 className="text-2xl text-blue-600 mb-4 text-center">Signup</h1>
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          {errorMessage && <div className="text-red-500">{errorMessage}</div>}

          <div>
            <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">First Name</label>
            <input
              type="text"
              id="first_name"
              name="first_name"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              value={formik.values.first_name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.first_name && formik.errors.first_name && (
              <div className="text-red-500 text-sm">{formik.errors.first_name}</div>
            )}
          </div>

          <div>
            <label htmlFor="last_name" className="block text-sm font-medium text-gray-700">Last Name</label>
            <input
              type="text"
              id="last_name"
              name="last_name"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              value={formik.values.last_name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.last_name && formik.errors.last_name && (
              <div className="text-red-500 text-sm">{formik.errors.last_name}</div>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.email && formik.errors.email && (
              <div className="text-red-500 text-sm">{formik.errors.email}</div>
            )}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.password && formik.errors.password && (
              <div className="text-red-500 text-sm">{formik.errors.password}</div>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
            disabled={formik.isSubmitting}
          >
            {formik.isSubmitting ? 'processing...' : 'Signup'}
          </button>
        </form>
        <p className='text-blue-600 mt-3'>Already have account ? <span className='text-black cursor-pointer' onClick={() => Router.push('/signin')}>Signin</span></p>
      </div>
    </div>
  );
};

export default RegisterPage;
