import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { LiaEdit } from 'react-icons/lia'
import useAuthStore from '../store/authStore'
import { AiOutlineUser } from 'react-icons/ai'
import { LiaSignOutAltSolid } from 'react-icons/lia'

const Header = () => {
  const { userProfile, logoutUser } = useAuthStore()
  const [showDropDown, setShowDropDown] = useState(false)

  const handleToggleDropDown = () => {
    setShowDropDown(!showDropDown)
  }
  
  return (
    <header className='w-full flex justify-between items-center py-2 px-4 border-b-black border-2'>
      <Link href='/'>
        <div className='w-full md:w-[130px]'>
          {/*<Image
            className='cursor-pointer border-2 border-black'
            src=''
            alt='Logo'
  />*/}
          <p className='cursor-pointer border-2 border-black px-3'>Logo</p>
        </div>
      </Link>
      <div className='relative flex items-center justify-evenly  lg:w-1/4 gap-5 md:gap-10'>
        {userProfile ? (
          <>
            <div className='flex items-center space-x-1 flex-grow-0 justify-center rounded-xl p-2 cursor-pointer'>
              <LiaEdit className='h-4' />
              <Link href={`/create`}>Write</Link>
            </div>

            <div
              onClick={handleToggleDropDown}
              className='p-1 rounded-full bg-[lightgray] cursor-pointer'>
              <AiOutlineUser className='w-full text-xl' />
            </div>
            {showDropDown && (
              <div className='absolute z-30 top-10 right-0 bg-white w-[200px]  p-2 rounded-lg shadow-lg'>
                <ul className=''>
                  <li className='flex flex-col border-b border-black justify-start py-1'>
                    <p className='text-left capitalize'>
                      Hi, {userProfile?.username}
                    </p>
                  </li>
                  <li className='flex items-center justify-start  px-4 py-1 hover:font-semibold cursor-pointer'>
                    <Link href={`/profile`}>Profile</Link>
                  </li>
                  <li className='flex items-center justify-start  px-4 py-1 hover:font-semibold cursor-pointer'>
                    <Link href={`/create`}>Write Story</Link>
                  </li>
                  <li className='flex items-center justify-start  px-4 py-1 rounded-full hover:font-semibold cursor-pointer'>
                    <Link href={`/dashboard`}>Dashboard</Link>
                  </li>
                  <li>
                    <button
                      className='flex  text-[red] items-center justify-start  px-4 py-1 rounded-full hover:font-semibold'
                      onClick={() => logoutUser()}>
                      <LiaSignOutAltSolid className='mr-1' />
                      Sign out
                    </button>
                  </li>
                </ul>
              </div>
            )}
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
