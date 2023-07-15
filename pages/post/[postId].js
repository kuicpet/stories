import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import moment from 'moment'
import { LiaCommentDotsSolid, LiaHeart, LiaHeartSolid } from 'react-icons/lia'

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

  return (
    <section className='flex flex-col lg:w-3/4 w-full p-2 m-5'>
      <div className='my-4'>
        <Link className='font-semibold text-[blue] hover:underline' href={`/`}>
          Back to Stories
        </Link>
      </div>
      <div className='border-b-2 border-black'>
        <h2 className='uppercase font-semibold'>{post.title}</h2>
      </div>
      <div className='m-4 border-b border-black'>
        <p className='py-2'>{post.content}</p>
      </div>
      <div className='flex w-full border-b border-black items-center justify-between'>
        <div className='flex px-4'>
          <p className='mr-5 font-semibold'>{post?.userId?.username}</p>
          <p>{moment(post.createdAt).fromNow()}</p>
        </div>
        <div className='flex'>
          <div className='flex items-center space-x-1 flex-grow-0 justify-center rounded-xl p-2 cursor-pointer'>
            {post.likes?.length > 0 ? (
              <LiaHeartSolid className='h-4 text-[red]' />
            ) : (
              <LiaHeart className='h-4' />
            )}
            <p className='text-xs sm:text-base'>
              {post.likes?.length} {post.likes?.length === 1 ? 'Like' : 'Likes'}
            </p>
          </div>
          <div className='flex items-center space-x-1 flex-grow-0 justify-center rounded-xl p-2 cursor-pointer'>
            {post.comments?.length > 0 ? (
              <LiaCommentDotsSolid className='h-4 text-[blue]' />
            ) : (
              <LiaCommentDotsSolid className='h-4' />
            )}
            <p className='text-xs sm:text-base'>
              {post.comments?.length}{' '}
              {post.comments?.length === 1 ? 'Comment' : 'Comments'}
            </p>
          </div>
        </div>
      </div>
      <div className='flex flex-col nw-full mt-2'>
        <div className='flex items-center justify-between border-b border-black  w-full px-2 py-1'>
          <div>
            <h3>Comments</h3>
          </div>
          <div className='flex items-center justify-center bg-black text-white px-3 py-1 rounded-full'>
            <button>Add comment</button>
          </div>
        </div>
        <div>
          {post.comments?.map((item, i) => (
            <>
              <div key={i} className='flex flex-col border py-5 px-3'>
                <div>
                  <p className='font-semibold'>{item?.user}</p>
                  <p className='text-[gray]'>{moment(item?.createdAt).fromNow()}</p>
                </div>
                <p className=''>{item?.content}</p>
              </div>
            </>
          ))}
        </div>
      </div>
    </section>
  )
}

export default PostDetails
