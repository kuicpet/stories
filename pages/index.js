import Head from 'next/head'
import axios from 'axios'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Loader, PostCard } from '../components'

export default function Home() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(false)
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

  console.log(posts)
  return (
    <div className='w-full m-5 flex items-center justify-center'>
      <Head>
        <title>Stories | Share your stories</title>
        <meta name='description' content='Share your stories' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div className='lg:w-3/4 w-full m-5'>
        <div className='border-b-2 border-black outline-none mb-2'>
          <h1 className='text-2xl p-2'>Stories</h1>
        </div>
        {loading && (
          <div className='fixed top-0 right-0 bottom-0 left-0 z-50 flex justify-center items-center bg-[rgba(0,0,0,0.5)]'>
            <Loader />
          </div>
        )}
        <div className=' w-full flex flex-col'>
          {posts && posts.length > 0
            ? posts.map((post) => (
                <div key={post._id}>
                  <PostCard
                    _id={post._id}
                    title={post.title}
                    content={shortenContent(post.content)}
                    timestamp={post.createdAt}
                    author={post.userId?.username}
                    likes={post.likes.length}
                    comments={post.comments.length}
                  />
                </div>
              ))
            : 'No Posts'}
        </div>
      </div>
    </div>
  )
}
