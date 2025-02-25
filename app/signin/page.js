"use client"
import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

const LoginPage = () => {
  const Router = useRouter();
  const [errorMessage, setErrorMessage] = useState('');

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Email is required'),
      password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    }),
    onSubmit: async (values) => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(values),
        });

        const data = await response.json();

        if (response.status === 200) {
          console.log('data', data)
          localStorage.setItem('auth_token', data.token);
          localStorage.setItem('user_role', data.userRole);
          localStorage.setItem('user_id', data.userId);
          localStorage.setItem('name', data.name);
          document.cookie = `auth_token=${data.token}; path=/; max-age=3600`;
          document.cookie = `user_role=${data.userRole}; path=/; max-age=3600`; 
          document.cookie = `user_id=${data.userId}; path=/; max-age=3600`;
    
          toast.success("Login successfull")
          window.location.href = '/products';
        } else {
          setErrorMessage(data.message || 'Something went wrong.');
        }
      } catch (error) {
        setErrorMessage('Internal Server Error');
      }
    },
  });

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h1 className="text-2xl text-blue-600 mb-4 text-center">Signin</h1>
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          {errorMessage && <div className="text-red-500">{errorMessage}</div>}

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
            {formik.isSubmitting ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <p className='text-blue-600 mt-3'>Don&apos;t have account ? <span className='text-black cursor-pointer' onClick={() => Router.push('/signup')}>create</span></p>
      </div>
    </div>
  );
};

export default LoginPage;
