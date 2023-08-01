'use client';

import { useState } from 'react';
import {createToken} from "@/api/vulog";

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
        const userData = await createToken('dev@troopy.com', 'password');
        console.log('User data:', userData);
    } catch (error) {
      console.error('error.message');
    }
  };

  return (
      <section className='py-36'>
        <div className='container px-4 mx-auto'>
          <div className='relative max-w-lg mx-auto pt-16 pb-16 px-6 md:px-10 lg:px-16 bg-gray-500 rounded-xl'>
            <a
              className='absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2'
              href='#'
            >
              <img
                className='block'
                src='@assets/trizzle-assets/logos/trizzle-logo-blue.svg'
                alt=''
              />
            </a>
            <div className='relative max-w-md mx-auto text-center'>
              <h2 className='text-2xl text-gray-100 font-semibold mb-2'>
                Log in to your account
              </h2>
              <p className='text-gray-300 font-medium mb-10'>
                Welcome back! Please enter your details.
              </p>
              <form onSubmit={handleSignIn}>
                <div className='relative w-full h-14 py-4 px-3 mb-8 border border-gray-400 hover:border-white focus-within:border-green-500 rounded-lg'>
          <span className='absolute bottom-full left-0 ml-3 -mb-1 transform translate-y-0.5 text-xs font-semibold text-gray-300 px-1 bg-gray-500'>
            Email
          </span>
                  <input
                      className='block w-full outline-none bg-transparent text-sm text-gray-100 font-medium'
                      type='email'
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className='relative w-full h-14 py-4 px-3 mb-6 border border-gray-400 hover:border-white focus-within:border-green-500 rounded-lg'>
          <span className='absolute bottom-full left-0 ml-3 -mb-1 transform translate-y-0.5 text-xs font-semibold text-gray-300 px-1 bg-gray-500'>
            Password
          </span>
                  <input
                      className='block w-full outline-none bg-transparent text-sm text-gray-100 font-medium'
                      type='password'
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <button
                    type='submit'
                    className='block w-full py-4 mb-4 leading-6 text-white font-semibold bg-blue-500 hover:bg-blue-600 rounded-lg transition duration-200'
                >
                  Sign In
                </button>
                <p className='font-medium'>
                  <span className='text-gray-300'>Don’t have an account?</span>
                  <a
                    className='inline-block text-blue-500 hover:underline'
                    href='#'
                  >
                    Sign up
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
  );
}

