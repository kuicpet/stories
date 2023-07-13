import React, { useState } from 'react'
import Link from 'next/link'
import { toast, Toaster } from 'react-hot-toast'
import axios from 'axios'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios
        .post(`/api/user/login`, { username, password })
        .then((response) => {
          if (response.status === 200) {
            toast.success(response?.data?.message)
            // console.log(response)
            // save user
            // redirect user
          } else {
            toast.error(response?.data?.message)
            return
          }
        })
    } catch (error) {
      // console.log(error)
      toast.error(error?.response?.data?.message)
    }
  }

  return (
    <section className='flex items-center justify-center border border-black lg:w-1/2 w-[90%] m-5 p-2'>
      <Toaster />
      <div className='lg:w-[90%]'>
        <div className='flex items-center justify-center'>
          <h1 className='text-xl font-semibold'>Login to share your Stories</h1>
        </div>
        <form className='m-3 p-2' onSubmit={handleSubmit}>
          <div className='mb-2'>
            <label>Username</label>
            <input
              type='text'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder='Enter your Username'
              className='border border-black w-full p-1.5'
            />
          </div>
          <div className='mb-2'>
            <label>Password</label>
            <input
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='Password'
              className='border border-black w-full p-1.5'
            />
          </div>
          <div className='my-7'>
            <button type='submit' className='w-full border border-black p-2'>
              Login
            </button>
          </div>
        </form>
        <div className='flex justify-center mb-2'>
          <p>
            Don&apos;t have an account?{' '}
            <Link className='text-[blue] hover:underline' href={`/signup`}>
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </section>
  )
}

export default Login
