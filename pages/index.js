import Head from 'next/head'
import styles from '../styles/Home.module.css'
import axios from 'axios'
import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function Home() {
  const [posts, setPosts] = useState([])
  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    try {
      const response = await axios.get('/api/post')
      // console.log(response.data)
      setPosts(response.data)
    } catch (error) {
      console.error(error)
    }
  }
  console.log(posts)
  return (
    <div className=''>
      <Head>
        <title>Stories | Share your stories</title>
        <meta name='description' content='Share your stories' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div>
        
        <h1 className='text-2xl'>Stories</h1>
        <div className=''>
          {posts && posts.length > 0
            ? posts.map((post) => (
                <Link href={`/post/${post._id}`} key={post._id}>
                  {post.title}
                </Link>
              ))
            : 'No Posts'}
        </div>
      </div>
    </div>
  )
}
