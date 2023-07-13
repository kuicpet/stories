import React, { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { toast, Toaster } from 'react-hot-toast'
import axios from 'axios'

const Signup = () => {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      toast.error('Passwords donot match')
      return
    }
    try {
      await axios
        .post(`/api/user/register`, {
          username,
          email,
          password,
        })
        .then((response) => {
          if (response.status === 201) {
            toast.success(response?.data?.message)
            // save user
            // redirect user
            router.push(`/login`)
          } else {
            toast.error(response?.data?.message)
            return
          }
        })
    } catch (error) {
      console.log(error)
      toast.error(error?.response?.data?.message)
    }
  }

  return (
    <section className='flex items-center justify-center border border-black lg:w-1/2 w-[90%] m-5 p-2'>
      <Toaster />
      <div className='lg:w-[90%]'>
        <div className='flex items-center justify-center'>
          <h1 className='text-xl font-semibold'>
            Sign up to share your Stories
          </h1>
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
            <label>Email</label>
            <input
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='Email'
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
          <div className='mb-2'>
            <label>Confirm Password</label>
            <input
              type='password'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder='Confirm password'
              className='border border-black w-full p-1.5'
            />
          </div>
          <div className='my-7'>
            <button type='submit' className='w-full border border-black p-2'>
              Sign up
            </button>
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

export default Signup
