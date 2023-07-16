import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import moment from 'moment'
import { LiaCommentDotsSolid, LiaHeart, LiaHeartSolid } from 'react-icons/lia'
import { Loader } from '../../components'
import useAuthStore from '../../store/authStore'

const PostDetails = () => {
  const router = useRouter()
  const { userProfile } = useAuthStore()
  const { postId } = router.query
  const [loading, setLoading] = useState(false)
  const [comment, setComment] = useState('')

  const [post, setPost] = useState({})

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true)
        const response = await axios.get(`/api/post/postId?postId=${postId}`)
        // console.log(response.data)
        setPost(response.data)
        setLoading(false)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
    fetchPost()
  }, [postId])

  const handleSubmitComment = async (e) => {
    e.preventDefault()
    console.log({ postId, userId: userProfile._id, content: comment })
    try {
      setLoading(true)
      const response = await axios.post('/api/comment', {
        postId,
        userId: userProfile._id, // Replace with the actual user ID or fetch it from your authentication system: ;
        content: comment,
      })
      setPost(response.data.data.post) // Update the post with the new comment
      setComment('') // Clear the comment input
      setLoading(false)
    } catch (error) {
      console.error(error)
      setLoading(false)
    } finally {
      setLoading(false)
    }
  }
  return (
    <section className='flex flex-col lg:w-3/4 w-full p-2 m-5'>
      {loading && (
        <div className='absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg'>
          <Loader />
        </div>
      )}
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
            <p className='flex text-xs sm:text-base'>
              {post.likes?.length}
              <span className='hidden lg:flex md:flex mx-1'>
                {post.likes?.length === 1 ? 'Like' : 'Likes'}
              </span>
            </p>
          </div>
          <div className='flex items-center space-x-1 flex-grow-0 justify-center rounded-xl p-2 cursor-pointer'>
            {post.comments?.length > 0 ? (
              <LiaCommentDotsSolid className='h-4 text-[blue]' />
            ) : (
              <LiaCommentDotsSolid className='h-4' />
            )}
            <p className='flex text-xs sm:text-base'>
              {post.comments?.length}{' '}
              <span className='hidden lg:flex md:flex mx-1'>
                {post.comments?.length === 1 ? 'Comment' : 'Comments'}
              </span>
            </p>
          </div>
        </div>
      </div>
      <div className='flex flex-col nw-full mt-2'>
        <div className='flex flex-col lg:flex-row items-center justify-between border-b border-black  w-full px-2 py-1'>
          <div className='lg:w-[20%] w-full my-1'>
            <h3 className=''>Comments</h3>
          </div>
          {userProfile ? (
            <div className='flex  lg:w-[80%] w-full border border-[blue] rounded-full'>
              <form
                className='flex w-full items-center justify-between ml-2'
                onSubmit={handleSubmitComment}>
                <input
                  className='w-[60%] px-1 outline-none'
                  type='text'
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder='Write your comment here...'
                />
                <div className='flex items-center ml-auto justify-center bg-[blue] text-white px-3 py-1 rounded-full border-none outline-none'>
                  <button>Add comment</button>
                </div>
              </form>
            </div>
          ) : (
            <div>
              <Link className='text-[blue] font-semibold hover:underline' href={`/signin`}>Sign in to add Comments</Link>
            </div>
          )}
        </div>
        <div>
          {post.comments?.map((item) => (
            <div key={item._id} className='flex flex-col border py-5 px-3'>
              <div>
                <p className='font-semibold'>{item?.user?.username}</p>
                <p className='text-[gray]'>
                  {moment(item?.createdAt).fromNow()}
                </p>
              </div>
              <p className=''>{item?.content}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default PostDetails
