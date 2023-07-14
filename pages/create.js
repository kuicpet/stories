import React, { useState } from 'react'
import { toast, Toaster } from 'react-hot-toast'
import axios from 'axios'
import { useRouter } from 'next/router'
import { Loader } from '../components'
import useAuthStore from '../store/authStore'

const CreatePost = () => {
  const router = useRouter()
  const { userProfile } = useAuthStore()
  const userId = userProfile?._id
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      // console.log({ title: title, content: content })
      await axios
        .post(`/api/post/create`, { title, content, userId })
        .then((response) => {
          if (response.status === 201) {
            toast.success(response?.data?.message)
            console.log(response)
            // save user
            // redirect
            router.push('/')
          } else {
            setLoading(false)
            toast.error(response?.data?.message)
            return
          }
        })
    } catch (error) {
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
      <div className='lg:w-[90%] w-full'>
        <div className='flex items-center justify-center'>
          <h1 className='text-xl font-semibold'>Write your Story.</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <div className='mb-2'>
            <label>Title</label>
            <input
              type='text'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder='Enter a Title for your Story'
              className='border border-black w-full p-1.5'
            />
          </div>
          <div className='mb-2'>
            <label>Content</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className='border border-black w-full p-1.5'
              rows={12}
              cols={10}></textarea>
          </div>
          <div className='my-7'>
            <button
              disabled={!title || !content}
              type='submit'
              className='w-full border border-black p-2 disabled:cursor-not-allowed rounded-full'>
              Post Story
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}

export default CreatePost
