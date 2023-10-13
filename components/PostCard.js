import React from 'react'
import moment from 'moment/moment'
import Link from 'next/link'
import { LiaCommentDotsSolid, LiaHeart, LiaHeartSolid } from 'react-icons/lia'
import { AiOutlineUser } from 'react-icons/ai'
import { HiOutlineUser } from 'react-icons/hi2'

const PostCard = ({
  _id,
  title,
  content,
  author,
  timestamp,
  likes,
  comments,
}) => {
  return (
    <section className='flex flex-col m-2 shadow-md rounded-lg bg-[#f2efe6]'>
      <div className='flex w-full items-center justify-between p-2'>
        <div>
          <div className='flex items-center justify-center text-xl'>
            {author && <HiOutlineUser className='mr-2' />}

            <p className='capitalize'>{author && `By ${author}`}</p>
          </div>
          <p className='text-xs text-gray-600'>{timestamp}</p>
        </div>
      </div>
      <div className='p-2 border-b border-black hover:text-[blue]'>
        <Link href={`/post/${_id}`}>
          <h2 className='font-semibold text-lg uppercase'>{title}</h2>
          <p>{content}</p>
        </Link>
      </div>
      <div className='flex items-center justify-end'>
        {/**
           * 
           *  <div className='flex items-center space-x-1 flex-grow-0 justify-center rounded-xl p-2 cursor-pointer'>
          <LiaHeart className='h-4' />
          <p className='text-xs sm:text-base'>
            {likes} {likes === 1 ? 'Like' : 'Likes'}
          </p>
        </div>
           */}

        <div className='flex items-center space-x-1 flex-grow-0 justify-center rounded-xl p-2 cursor-pointer'>
          <LiaCommentDotsSolid className='h-4' />
          <p className='text-xs sm:text-base'>
            {comments} {comments === 1 ? 'Comment' : 'Comments'}
          </p>
        </div>
      </div>
    </section>
  )
}

export default PostCard
