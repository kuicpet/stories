import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast, Toaster } from 'react-hot-toast'
import Link from 'next/link'
import { useRouter } from 'next/router'
import moment from 'moment'
import { LiaCommentDotsSolid, LiaHeart, LiaHeartSolid } from 'react-icons/lia'
import { HiOutlineBookmark, HiBookmark } from 'react-icons/hi'
import { HiDotsHorizontal } from 'react-icons/hi'
import { FiChevronLeft } from 'react-icons/fi'
import { Loader, Meta } from '../../components'
import useAuthStore from '../../store/authStore'

const PostDetails = () => {
  const router = useRouter()
  const { userProfile } = useAuthStore()
  const { postId } = router.query
  const [post, setPost] = useState({})
  const [loading, setLoading] = useState(false)
  const [comment, setComment] = useState('')
  const [showDelete, setShowDelete] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const { likes, setLikes } = useState(post.likes || [])
  const [isLiked, setIsLiked] = useState(
    post.likes && userProfile ? post.likes.includes(userProfile._id) : false
  )

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
    try {
      setLoading(true)
      await axios
        .post('/api/comment', {
          postId,
          userId: userProfile._id, // Replace with the actual user ID or fetch it from your authentication system: ;
          content: comment,
        })
        .then((response) => {
          if (response.status === 201) {
            console.log(response)
            toast.success(response?.data?.data?.message)
            setPost(response?.data?.data?.post) // Update the post with the new comment
            setComment('') // Clear the comment input
            setLoading(false)
          } else {
            setLoading(false)
            toast.error(response?.data?.message)
            return
          }
        })
    } catch (error) {
      console.error(error)
      setLoading(false)
    } finally {
      setLoading(false)
    }
  }

  const handleToggle = (commentId) => {
    setShowDelete((prevState) => (prevState === commentId ? null : commentId))
  }

  const handleDeleteComment = async (commentId) => {
    try {
      setLoading(true)
      await axios
        .delete(`/api/comment/delete`, {
          postId,
          commentId,
        })
        .then((response) => {
          console.log(response)
        })
      setLoading(false)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  const handleLikePost = async () => {
    try {
      if (!userProfile) {
        // User is not authenticated, redirect to login page or show a message
        toast.error('Please sign in to like the post')
        return
      }
      if (isLiked) {
        // User has already liked the post, so we need to unlike it
        await axios
          .post(`/api/post/unlike`, {
            postId,
            userId: userProfile._id,
          })
          .then((response) => {
            console.log(response)
          })
        /* setLikes((prevLikes) =>
          prevLikes.filter((like) => like !== userProfile._id)
        )*/
        setIsLiked(false)
      } else {
        // User hasn't liked the post yet, so we need to like it
        await axios
          .post(`/api/post/like`, { postId, userId: userProfile._id })
          .then((response) => {
            console.log(response)
          })
        // setLikes((prevLikes) => [...prevLikes, userProfile._id])
        setIsLiked(true)
      }
    } catch (error) {
      console.log(error)
      toast.error('Failed to like/unlike the post')
    }
  }

  const handleBookmarkPost = async () => {
    try {
      if (!userProfile) {
        toast.error('Please sign in to bookmark the post', {
          style: {
            color: 'red',
            backgroundColor: '#ffebee',
          },
        })
        return
      }
      const response = await axios.post(`/api/post/bookmark`, {
        postId,
        userId: userProfile?._id,
      })
      // console.log(response)
      if (response.status === 200) {
        setIsBookmarked((prev) => !prev)
        toast.success(response.data.message, {
          style: {
            backgroundColor: '#e0f5e6',
          },
        })
      } else {
        toast.error(response.data.error)
      }
    } catch (error) {
      console.log(error)
      toast.error('Failed to bookmark/unbookmark the post')
    }
  }

  return (
    <section className='flex flex-col lg:w-3/4 w-full p-2 m-5'>
      <Meta title={post.title} />
      <Toaster />
      {loading ? (
        <div className='fixed top-0 right-0 bottom-0 left-0 z-50 flex justify-center items-center bg-[rgba(0,0,0,0.5)]'>
          <Loader />
        </div>
      ) : (
        <>
          <div className='my-4 flex items-center'>
            <Link
              className='flex items-center  font-semibold text-[blue] hover:underline'
              href={`/`}>
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
            <div className='flex items-center space-x-1 flex-grow-0 justify-center rounded-xl p-2 cursor-pointer'>
              <div
                onClick={handleBookmarkPost}
                className='flex items-center justify-center'>
                {isBookmarked ? (
                  <HiBookmark className='h-4' />
                ) : (
                  <HiOutlineBookmark className='h-4' />
                )}
                <p className='hidden lg:flex md:flex mx-1'>
                  {isBookmarked ? 'Bookmarked' : 'Bookmark Post'}
                </p>
              </div>
              <div
                onClick={handleLikePost}
                className='flex items-center space-x-1 flex-grow-0 justify-center rounded-xl p-2 cursor-pointer'>
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
                <div className='lg:w-1/4 w-full'>
                  <Link
                    className='text-[blue] font-semibold hover:underline'
                    href={`/login`}>
                    Sign in to add Comments
                  </Link>
                </div>
              )}
            </div>
            <div>
              {post.comments?.map((item) => (
                <div key={item._id} className='flex flex-col border py-5 px-3'>
                  <div className='p-2'>
                    <div className='relative flex items-center justify-between'>
                      <p className='font-semibold'>{item?.user?.username}</p>
                      {userProfile && userProfile._id === item.user._id && (
                        <button
                          onClick={() => handleToggle(item._id)}
                          className='px-1 rounded-md hover:bg-[lightgray]'>
                          <HiDotsHorizontal />
                        </button>
                      )}
                      {showDelete === item._id && (
                        <div className='flex flex-col items-start justify-center absolute right-0 top-5 rounded-md z-20 w-1/4 border border-gray-300 p-1'>
                          {userProfile && userProfile._id === item.user._id && (
                            <>
                              <button
                                onClick={() => handleDeleteComment(item._id)}
                                className='flex items-center justify-between border text-justify px-2 w-full hover:bg-gray-300'>
                                Edit
                              </button>
                              <button
                                onClick={() => handleDeleteComment(item._id)}
                                className='flex items-center justify-between text-justify px-2 w-full hover:bg-gray-300'>
                                Delete
                              </button>
                            </>
                          )}
                        </div>
                      )}
                    </div>
                    <p className='text-[gray]'>
                      {moment(item?.createdAt).fromNow()}
                    </p>
                  </div>
                  <p className=''>{item?.content}</p>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </section>
  )
}

export default PostDetails
