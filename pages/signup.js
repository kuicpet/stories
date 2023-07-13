import React from 'react'
import Link from 'next/link'

const signup = () => {
  return (
    <section className='flex items-center justify-center border border-black lg:w-1/2 w-[90%] m-5 p-2'>
      <div className='lg:w-[90%]'>
        <div className='flex items-center justify-center'>
          <h1 className='text-xl font-semibold'>
            Sign up to Share your Stories
          </h1>
        </div>
        <form className='m-3 p-2'>
          <div className='mb-2'>
            <label>Username</label>
            <input
              type='text'
              placeholder='Enter your Username'
              className='border border-black w-full p-1.5'
            />
          </div>
          <div className='mb-2'>
            <label>Email</label>
            <input
              type='text'
              placeholder='Email'
              className='border border-black w-full p-1.5'
            />
          </div>
          <div className='mb-2'>
            <label>Password</label>
            <input
              type='password'
              placeholder='Password'
              className='border border-black w-full p-1.5'
            />
          </div>
          <div className='mb-2'>
            <label>Confirm Password</label>
            <input
              type='password'
              placeholder='Confirm password'
              className='border border-black w-full p-1.5'
            />
          </div>
          <div className='my-7'>
            <button className='w-full border border-black p-2'>Sign up</button>
          </div>
        </form>
        <div className='flex justify-center mb-2'>
          <p>
            Already have an account?{' '}
            <Link className='text-[blue] hover:underline' href={`/login`}>
              Login
            </Link>
          </p>
        </div>
      </div>
    </section>
  )
}

export default signup
