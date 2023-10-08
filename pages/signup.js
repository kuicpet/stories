import React, { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { toast, Toaster } from 'react-hot-toast'
import axios from 'axios'
import { Loader } from '../components'
import useAuthStore from '../store/authStore'

const Signup = () => {
  const router = useRouter()
  const { redirect } = router.query
  const { registerUser } = useAuthStore()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [emailToken, setEmailToken] = useState(null)

  const sendEmailConfirmation = async () => {
    try {
      await axios.get(`/api/generateToken`).then((response) => {
        if (response.status === 200) {
          console.log(response)
          const { token } = response?.data
          console.log(token)
          // Create the email message
          const msg = {
            to: email, // User's email address
            from: 'noreply@mutediary.com', // Your sender email address
            subject: 'Confirm Your Email',
            html: `<p>Click the following link to confirm your email:</p>
                    <a href="https://mutediary.com/confirm?token=${token}">Confirm Email</a>
            `,
          }
        }
      })
    } catch (error) {
      console.log(error)
    }
  }
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
            toast.success(
              response?.data?.message,
              {
                style: {
                  backgroundColor: '#e0f5e6',
                },
              },
              sendEmailConfirmation()
            )
            // save user
            // registerUser(response?.data)
            // redirect user
            // router.push(`/login`)
          } else {
            setLoading(false)
            toast.error(response?.data?.message, {
              style: {
                color: 'red',
                backgroundColor: '#ffebee',
              },
            })
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
    <section className='flex items-center justify-center border border-black lg:w-1/2 w-[90%] m-5 p-2 rounded-md bg-[#f2efe6]'>
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
            <label>
              Username <span className='text-[red]'>*</span>
            </label>
            <input
              type='text'
              value={username}
              required
              onChange={(e) => setUsername(e.target.value)}
              placeholder='Enter your Username'
              className='border border-black w-full p-1.5 bg-[#ededed] outline-none'
            />
          </div>
          <div className='mb-2'>
            <label>
              Email <span className='text-[red]'>*</span>
            </label>
            <input
              type='email'
              value={email}
              required
              // pattern='/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/'
              onChange={(e) => setEmail(e.target.value)}
              placeholder='Email'
              className='border border-black w-full p-1.5 bg-[#ededed] outline-none'
            />
          </div>
          <div className='mb-2'>
            <label>
              Password <span className='text-[red]'>*</span>
            </label>
            <input
              type='password'
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
              placeholder='Password'
              className='border border-black w-full p-1.5 bg-[#ededed] outline-none'
            />
          </div>
          <div className='mb-2'>
            <label>
              Confirm Password <span className='text-[red]'>*</span>
            </label>
            <input
              type='password'
              value={confirmPassword}
              required
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder='Confirm password'
              className='border border-black w-full p-1.5 bg-[#ededed] outline-none'
            />
          </div>
          <div className='my-7'>
            <button
              disabled={
                !username ||
                !email ||
                !password ||
                !confirmPassword ||
                password.length <= 5
              }
              type='submit'
              className='w-full outline-none border border-black  font-semibold disabled:bg-[gray] p-2 disabled:cursor-not-allowed rounded-full  bg-[#ace5d4] text-black disabled:text-white'>
              Sign up
            </button>
          </div>
        </form>
        <div className='flex justify-center mb-2'>
          <p>
            Have an account?{' '}
            <Link
              className='text-[#5765f2] font-semibold hover:underline'
              href={`/login?redirect=${redirect || '/'}`}>
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </section>
  )
}

export default Signup
