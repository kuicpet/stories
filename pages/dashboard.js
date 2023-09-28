import React from 'react'
import Image from 'next/image'
import { AiOutlineUser } from 'react-icons/ai'
import { BiCalendar } from 'react-icons/bi'
import { Meta } from '../components'
import useAuthStore from '../store/authStore'
import { formatTimestamp } from '../utils/formatTimestamp'

const UserDashboard = () => {
  const { userProfile } = useAuthStore()
  return (
    <section className='flex flex-col md:w-3/4 w-[95%] border'>
      <Meta title='Dashboard' />
      <div className='flex md:flex-row flex-col  w-full border-2 p-2 md:h-[12rem] border-black rounded-md dash'>
        <div className='flex  items-center justify-center md:w-1/4 h-full mr-auto'>
          <div className='p-1 m-1 rounded-md bg-white opacity-80'>
            <AiOutlineUser className='w-[150px] h-[150px]' />
          </div>
        </div>
        <div className='flex border md:w-3/4 w-full  '>
          <div className='p-4 m-1 rounded-md w-full bg-white opacity-80'>
            <h3 className='font-semibold text-3xl text-black'>{userProfile?.username}</h3>
            <h3 className='font-semibold text-xl text-[gray]'>
              {userProfile?.email}
            </h3>
            <div className='flex items-center  my-3 text-black'>
              <BiCalendar className='mr-1' />
              <h4 className=''>
                Joined {formatTimestamp(userProfile.registeredAt)}
              </h4>
            </div>
          </div>
        </div>
      </div>
      <div className='my-5 border-2 border-black rounded-md p-2'>
        User Posts
      </div>
    </section>
  )
}

export default UserDashboard
