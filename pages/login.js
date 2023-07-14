import React, { useState } from 'react'
import Link from 'next/link'
import { toast, Toaster } from 'react-hot-toast'
import axios from 'axios'
import { useRouter } from 'next/router'
import { Loader } from '../components'
import useAuthStore from '../store/authStore'

const Login = () => {
  const router = useRouter()
  const { loginUser } = useAuthStore()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      await axios
        .post(`/api/user/login`, { username, password })
        .then((response) => {
          if (response.status === 200) {
            toast.success(response?.data?.message)
            // console.log(response)
            // login user
            loginUser(response?.data)
            // redirect user
            router.push('/')
          } else {
            setLoading(false)
            toast.error(response?.data?.message)
            return
          }
        })
      setLoading(false)
    } catch (error) {
      // console.log(error)
      toast.error(error?.response?.data?.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className='flex items-center justify-center border border-black lg:w-1/2 w-[90%] m-5 p-2'>
      <Toaster />
      {loading && (
        <div className='absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg'>
          <Loader />
        </div>
      )}
      <div className='lg:w-[90%]'>
        <div className='flex items-center justify-center'>
          <h1 className='text-xl font-semibold'>Welcome back.</h1>
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
            <button
              disabled={!username || !password}
              type='submit'
              className='w-full border border-black p-2 disabled:cursor-not-allowed rounded-full'>
              Login
            </button>
          </div>
        </form>
        <div className='flex justify-center mb-2'>
          <p>
            No account?{' '}
            <Link
              className='text-[blue] font-semibold hover:underline'
              href={`/signup`}>
              Create one
            </Link>
          </p>
        </div>
      </div>
    </section>
  )
}

export default Login
