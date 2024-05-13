import Head from 'next/head'
import axios from 'axios'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Loader, PostCard, Meta, Hero } from '../components'
import bgImg from '../assets/bg.jpg'
import moment from 'moment/moment'

const pageSize = 3
export default function Home() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)
  const steps = page * pageSize - pageSize

  const MAX_CONTENT_LENGTH = 20

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    try {
      setLoading(true)
      await axios.get('/api/post').then((response) => {
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

  // console.log(posts)
  return (
    <div className='w-[95%] m-5 flex flex-col items-center justify-center bg-transparent'>
      <Meta />
      <div className='lg:w-[90%]  w-full m-5'>
        <Hero />
        <div className='border-b-2 border-black outline-none mb-2'>
          <h1 className='text-2xl p-2'>... tell your story</h1>
        </div>
        {loading ? (
          <div className='fixed top-0 right-0 bottom-0 left-0 z-50 flex justify-center items-center bg-[rgba(0,0,0,0.5)]'>
            <Loader />
          </div>
        ) : (
          <div className=' w-full flex flex-col'>
            <p className='m-3 font-semibold'>Recent stories...</p>
            {posts && posts.length > 0
              ? posts?.slice(steps, steps + pageSize).map((post) => (
                  <div key={post._id}>
                    <PostCard
                      _id={post._id}
                      title={post.title}
                      content={shortenContent(post.content)}
                      timestamp={moment(post.createdAt).fromNow()}
                      author={post.userId?.username}
                      likes={post.likes.length}
                      comments={post.comments.length}
                    />
                  </div>
                ))
              : 'No Posts'}
          </div>
        )}
        {posts && posts.length > 0 && (
          <div className='my-3 flex justify-between p-2'>
            <button
              className='border-2 bg-[#ace5d4] border-black font-semibold py-1 w-1/4 rounded-full cursor-pointer
            hover:bg-black hover:text-white disabled:bg-[gray] disabled:cursor-not-allowed outline-none disabled:text-white'
              disabled={page <= 1}
              onClick={() => setPage((prev) => prev - 1)}>
              Prev
            </button>
            <button
              className='border-2 bg-[#ace5d4] border-black  font-semibold py-1 w-1/4 rounded-full cursor-pointer
            hover:bg-black hover:text-white disabled:bg-[gray] disabled:cursor-not-allowed outline-none disabled:text-white'
              disabled={page >= posts.length / pageSize}
              onClick={() => setPage((prev) => prev + 1)}>
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
