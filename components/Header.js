import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { LiaEdit } from 'react-icons/lia'
import useAuthStore from '../store/authStore'

const Header = () => {
  const { userProfile, logoutUser } = useAuthStore()
  return (
    <header className='w-full flex justify-between items-center py-2 px-4 border-b-black border-2'>
      <Link href='/'>
        <div className='w-full md:w-[130px]'>
          <Image
            className='cursor-pointer border-2 border-black'
            src=''
            alt='Logo'
          />
        </div>
      </Link>
      <div className='flex items-center justify-evenly  lg:w-1/4 gap-5 md:gap-10'>
        {userProfile ? (
          <>
            <div className='flex items-center space-x-1 flex-grow-0 justify-center rounded-xl p-2 cursor-pointer'>
              <LiaEdit className='h-4' />
              <Link href={`/create`}>Write</Link>
            </div>
            <button
              className='flex items-center justify-center  px-4 py-1 rounded-full font-semibold'
              onClick={() => logoutUser()}>
              Sign out
            </button>
          </>
        ) : (
          <>
            <Link href={`/login`}>Sign in</Link>
            <Link
              className='flex items-center justify-center  border-2 border-black px-4 py-1 rounded-full font-semibold bg-black text-white'
              href={`/signup`}>
              Get started
            </Link>
          </>
        )}
      </div>
    </header>
  )
}

export default Header
