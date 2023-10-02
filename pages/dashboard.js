import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { AiOutlineUser } from 'react-icons/ai'
import { BiCalendar } from 'react-icons/bi'
import axios from 'axios'
import { Meta, Loader, PostCard } from '../components'
import useAuthStore from '../store/authStore'
import { formatTimestamp } from '../utils/formatTimestamp'

const UserDashboard = () => {
  const { userProfile } = useAuthStore()
  const userId = userProfile._id
  const [loading, setLoading] = useState(false)
  const [posts, setPosts] = useState([])

  const MAX_CONTENT_LENGTH = 20

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setLoading(true)
        await axios
          .get(`/api/user/profile?userId=${userId}`)
          .then((response) => {
            if (response.status === 200) {
              setLoading(false)
              console.log(response?.data?.data?.posts)
              setPosts(response?.data?.data?.posts)
            }
          })
        // console.log(response.data)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    fetchUserProfile()
  }, [userId])

  const fetchUserProfile = async () => {
    try {
      setLoading(true)
      await axios.get(`/api/user/profile?userId=${userId}`).then((response) => {
        if (response.status === 200) {
          setLoading(false)
          setPosts(response.data)
        }
      })
      // console.log(response.data)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const shortenContent = (content) => {
    if (content.split(' ').length > MAX_CONTENT_LENGTH) {
      return content.split(' ').slice(0, MAX_CONTENT_LENGTH).join(' ') + '...'
    }
    return content
  }

  return (
    <section className='flex flex-col md:w-3/4 w-[95%] border'>
      <Meta title='Dashboard' />
      <div className='flex md:flex-row flex-col  w-full border-2 p-2 md:h-[12rem] border-black rounded-md dash'>
        <div className='flex  items-center justify-center md:w-1/4 h-full mr-auto'>
          <div className='p-1 m-1 rounded-md bg-white opacity-80'>
            <AiOutlineUser className='w-[150px] h-[150px]' />
          </div>
        </div>
        <div className='flex md:w-3/4 w-full  flex-col'>
          <div className='flex md:flex-row flex-col p-4 m-1 rounded-md w-full bg-white opacity-80'>
            <div className='flex flex-col  md:w-1/2 w-full'>
              <h3 className='font-semibold text-3xl text-black'>
                {userProfile?.username}
              </h3>
              <h3 className='font-semibold text-xl text-[gray]'>
                {userProfile?.email}
              </h3>
              <div className='flex items-center  my-1 text-black'>
                <BiCalendar className='mr-1' />
                <h4 className=''>
                  Joined {formatTimestamp(userProfile.registeredAt)}
                </h4>
              </div>
              <div className='flex'>
                <Link
                  href={`/profile`}
                  className='hover:bg-black hover:text-white border-2 border-black px-4 rounded-full'>
                  Update Profile
                </Link>
              </div>
            </div>
            {/**
             * 
             * 
            <div className='flex flex-col items-start  md:w-1/2 my-2 border-2 border-black p-2 rounded-md'>
              <p>Your Total Stories: {posts?.length}</p>
              <p>Your Total Comments: {posts?.length}</p>
            </div>
             */}
          </div>
        </div>
      </div>
      <div className='my-5 border-2 border-black rounded-md p-2'>
        {loading ? (
          <div className='fixed top-0 right-0 bottom-0 left-0 z-50 flex justify-center items-center bg-[rgba(0,0,0,0.5)]'>
            <Loader />
          </div>
        ) : (
          <div className=' w-full flex flex-col'>
            <p>My stories...</p>
            {posts && posts.length > 0
              ? posts?.map((post) => (
                  <div key={post._id}>
                    <PostCard
                      _id={post._id}
                      title={post.title}
                      content={shortenContent(post.content)}
                      timestamp={formatTimestamp(post.createdAt)}
                      author={post.userId?.username}
                      likes={post.likes.length}
                      comments={post.comments.length}
                    />
                  </div>
                ))
              : 'No Posts Found'}
          </div>
        )}
      </div>
    </section>
  )
}

export default UserDashboard
