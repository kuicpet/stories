import Head from 'next/head'
import axios from 'axios'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Loader, PostCard } from '../components'

export default function Home() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(false)
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
  console.log(posts)
  return (
    <div className='w-full m-5 flex items-center justify-center'>
      <Head>
        <title>Stories | Share your stories</title>
        <meta name='description' content='Share your stories' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div className='border border-black lg:w-3/4 w-full m-5'>
        <div className='border-b-black border-2 mb-2'>
          <h1 className='text-2xl p-2'>Stories</h1>
        </div>
        {loading && (
          <div className='absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg'>
            <Loader />
          </div>
        )}
        <div className='border border-black w-full flex flex-col shadow-lg'>
          {posts && posts.length > 0
            ? posts.map((post) => (
                <Link href={`/post/${post._id}`} key={post._id}>
                  <PostCard
                    title={post.title}
                    content={post.content}
                    timestamp={post.createdAt}
                    author={post.userId?.username}
                    likes={post.likes.length}
                    comments={post.comments.length}
                  />
                </Link>
              ))
            : 'No Posts'}
        </div>
      </div>
    </div>
  )
}
