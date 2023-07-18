import React, { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { toast, Toaster } from 'react-hot-toast'
import axios from 'axios'
import { Loader } from '../components'
import useAuthStore from '../store/authStore'

const Signup = () => {
  const router = useRouter()
  const { registerUser } = useAuthStore()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      toast.error('Passwords donot match')
      return
    }
    try {
      setLoading(true)
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
            registerUser(response?.data)
            // redirect user
            router.push(`/login`)
          } else {
            setLoading(false)
            toast.error(response?.data?.message)
            return
          }
        })
    } catch (error) {
      console.log(error)
      toast.error(error?.response?.data?.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className='flex items-center justify-center border border-black lg:w-1/2 w-[90%] m-5 p-2 rounded-md'>
      <Toaster />
      {loading && (
        <div className='absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg'>
          <Loader />
        </div>
      )}
      <div className='lg:w-[90%] w-full'>
        <div className='flex items-center justify-center'>
          <h1 className='text-xl font-semibold'>
            Sign up to share your Stories
          </h1>
        </div>
        <form className='m-3 p-2' onSubmit={handleSubmit}>
          <div className='mb-2'>
            <label>Username <span className='text-[red]'>*</span></label>
            <input
              type='text'
              value={username}
              required
              onChange={(e) => setUsername(e.target.value)}
              placeholder='Enter your Username'
              className='border border-black w-full p-1.5'
            />
          </div>
          <div className='mb-2'>
            <label>Email <span className='text-[red]'>*</span></label>
            <input
              type='email'
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
              placeholder='Email'
              className='border border-black w-full p-1.5'
            />
          </div>
          <div className='mb-2'>
            <label>Password <span className='text-[red]'>*</span></label>
            <input
              type='password'
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
              placeholder='Password'
              className='border border-black w-full p-1.5'
            />
          </div>
          <div className='mb-2'>
            <label>Confirm Password <span className='text-[red]'>*</span></label>
            <input
              type='password'
              value={confirmPassword}
              required
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder='Confirm password'
              className='border border-black w-full p-1.5'
            />
          </div>
          <div className='my-7'>
            <button
              disabled={!username || !email || !password || !confirmPassword}
              type='submit'
              className='w-full outline-none border-none disabled:bg-[gray] p-2 disabled:cursor-not-allowed rounded-full text-white bg-[blue]'>
              Sign up
            </button>
          </div>
        </form>
        <div className='flex justify-center mb-2'>
          <p>
            Already have an account?{' '}
            <Link
              className='text-[blue] font-semibold hover:underline'
              href={`/login`}>
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </section>
  )
}

export default Signup
