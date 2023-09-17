import React, { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Image from 'next/image'
import { LiaEdit } from 'react-icons/lia'
import useAuthStore from '../store/authStore'
import { AiOutlineUser } from 'react-icons/ai'
import { LiaSignOutAltSolid } from 'react-icons/lia'
import { PiBookBookmarkBold } from 'react-icons/pi'

const Header = () => {
  const router = useRouter()
  const { userProfile, logoutUser } = useAuthStore()
  const [showDropDown, setShowDropDown] = useState(false)

  const handleToggleDropDown = () => {
    setShowDropDown(!showDropDown)
  }

  const normalLink = 'hover:font-semibold'
  const activeLink = 'font-semibold'
  return (
    <header className='w-full flex justify-between items-center py-2 px-4  bg-[hsla(51,36%,83%,.5)]'>
      <Link href='/'>
        <div className='w-full md:w-[130px]'>
          <p className='flex items-center justify-center cursor-pointer px-3'>
            <PiBookBookmarkBold className='mx-1' />
            MuteDiary
          </p>
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
              className='p-1  cursor-pointer hover:bg-[lightgray]'>
              {userProfile.photo ? (
                <Image
                  className='rounded-full'
                  src={userProfile?.photo}
                  alt=''
                  width={30}
                  height={30}
                />
              ) : (
                <AiOutlineUser className='w-full text-xl' />
              )}
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
                      onClick={() => {
                        logoutUser()
                        router.push('/')
                      }}>
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
            <Link
              className={router.pathname === '/login' ? activeLink : normalLink}
              href={`/login`}>
              Sign in
            </Link>
            <Link
              className='flex items-center justify-center   px-4 py-1 rounded-full font-semibold bg-black text-[white] hover:bg-[rgba(0,0,0,0.85)]'
              href={`/signup`}>
              Get Started
            </Link>
          </>
        )}
      </div>
    </header>
  )
}

export default Header
