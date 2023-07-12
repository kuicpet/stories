import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { PostCard } from '../../components'

const PostDetails = () => {
  const router = useRouter()
  const { postId } = router.query

  const [post, setPost] = useState({})
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`/api/post/postId?postId=${postId}`)
        console.log(response.data)
        setPost(response.data)
      } catch (error) {
        console.error(error)
      }
    }
    fetchPost()
  }, [postId])

  return <div>Post Details Page {postId}</div>
}

export default PostDetails
