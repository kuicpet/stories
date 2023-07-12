import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

const Header = () => {
  return (
    <header className='w-full flex justify-between items-center py-2 px-4 border border-black'>
      <Link href='/'>
        <div className='w-full md:w-[130px]'>
          <Image
            className='cursor-pointer border-2 border-black'
            src=''
            alt='Logo'
          />
        </div>
      </Link>
      <div className='flex gap-5 md:gap-10'>
        <Link href={`/login`}>Login</Link>
        <Link href={`/signup`}>Signup</Link>
      </div>
    </header>
  )
}

export default Header
