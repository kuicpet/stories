import React from 'react'
import moment from 'moment/moment'
import { LiaCommentDotsSolid, LiaHeart } from 'react-icons/lia'

const PostCard = ({ title, content, author, timestamp, likes, comments }) => {
  return (
    <section className='flex flex-col m-2 shadow-md'>
      <div className='flex w-full items-center justify-between p-2'>
        <p>By {author}</p>
        <p className='text-xs text-gray-600'>{moment(timestamp).fromNow()}</p>
      </div>
      <div className='p-2'>
        <h2 className='font-semibold text-lg'>{title}</h2>
        <p>{content}</p>
      </div>
      <div className='flex items-center justify-end'>
        <div className='flex items-center space-x-1 flex-grow-0 justify-center rounded-xl p-2 cursor-pointer'>
          <LiaHeart className='h-4' />
          <p className='text-xs sm:text-base'>Like</p>
        </div>
        <div className='flex items-center space-x-1 flex-grow-0 justify-center rounded-xl p-2 cursor-pointer'>
          <LiaCommentDotsSolid className='h-4' />
          <p className='text-xs sm:text-base'>Comment</p>
        </div>
      </div>
    </section>
  )
}

export default PostCard
