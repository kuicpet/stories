import React, { useState, useEffect } from 'react'
import { toast, Toaster } from 'react-hot-toast'
import { useRouter } from 'next/router'
import Image from 'next/image'
import axios from 'axios'
import { AiOutlineUser } from 'react-icons/ai'
import FileBase from 'react-file-base64'
import useAuthStore from '../store/authStore'
import { Meta, Loader } from '../components'

const Profile = () => {
  const router = useRouter()
  const { userProfile, registerUser } = useAuthStore()
  const [loading, setLoading] = useState(false)
  const [selectedFile, setSelectedFile] = useState()
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      toast.error('Passwords donot match')
      return
    }
    try {
      setLoading(true)
      await axios
        .put(`/api/user/updateProfile`, {
          username: userProfile.username,
          email: userProfile.email,
          password,
          photo: selectedFile,
        })
        .then((response) => {
          if (response.status === 201) {
            console.log(response)
            toast.success(response?.data?.message, {
              style: {
                backgroundColor: '#e0f5e6',
              },
            })
            // save user
            registerUser(response?.data)
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
    // console.log(userProfile.username, userProfile.email, password, confirmPassword, selectedFile)
  }
  useEffect(() => {
    if (!userProfile) {
      router.push(`/login`)
    }
  }, [router, userProfile])

  return (
    <section className='flex items-center justify-center border border-black lg:w-1/2 w-[90%] m-5 p-2 rounded-md bg-[#f2efe6]'>
      <Meta title='Profile' />
      {userProfile && (
        <>
          <Toaster />
          {loading && (
            <div className='absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg'>
              <Loader />
            </div>
          )}
          <div className='lg:w-[90%] w-full'>
            <div className='flex items-center justify-center'>
              <h1 className='text-xl font-semibold'>Update your Profile</h1>
            </div>
            <form className='m-3 p-2' onSubmit={handleSubmit}>
              <div className='mb-2 flex  flex-col'>
                <div className='w-[150px] h-[150px] border border-black mb-2 rounded-md'>
                  {selectedFile ? (
                    <Image
                      src={selectedFile ? selectedFile : userProfile.photo}
                      alt=''
                      width={150}
                      height={150}
                    />
                  ) : (
                    <AiOutlineUser className='w-[150px] h-[150px]' />
                  )}
                </div>
                <label className='flex flex-col'>
                  <p>
                    Profile Image <span className='text-[red]'>*</span>
                  </p>
                  <FileBase
                    type='file'
                    multiple={false}
                    onDone={({ base64 }) => setSelectedFile(base64)}
                  />
                </label>
              </div>
              <div className='mb-2'>
                <label>
                  Username <span className='text-[red]'>*</span>
                </label>
                <input
                  type='text'
                  value={userProfile.username}
                  required
                  disabled
                  //onChange={(e) => setUsername(e.target.value)}
                  placeholder='Enter your Username'
                  className='border border-black w-full p-1.5 bg-[#ededed] outline-none text-[gray]'
                />
              </div>
              <div className='mb-2'>
                <label>
                  Email <span className='text-[red]'>*</span>
                </label>
                <input
                  type='email'
                  value={userProfile.email}
                  required
                  disabled
                  // pattern='/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/'
                  // onChange={(e) => setEmail(e.target.value)}
                  placeholder='Email'
                  className='border border-black w-full p-1.5 bg-[#ededed] outline-none text-[gray]'
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
                    !userProfile.username ||
                    !userProfile.email ||
                    !password ||
                    !confirmPassword ||
                    password.length <= 5
                  }
                  type='submit'
                  className='w-full outline-none border border-black  font-semibold disabled:bg-[gray] p-2 disabled:cursor-not-allowed rounded-full  bg-[#ace5d4] text-black disabled:text-white'>
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </>
      )}
    </section>
  )
}

export default Profile
