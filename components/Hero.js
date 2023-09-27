import React from 'react'

const Hero = () => {
  return (
    <section className='flex justify-center items-center w-full border-2 hero border-black h-[15rem] rounded-md p-2'>
      <div className='md:w-1/2'></div>
      <div className='md:w-1/2 bg-white py-2 px-4 bg-opacity-30 rounded-lg'>
        <h1 className='md:text-right font-semibold md:text-xl text-lg'>
          MuteDiary is a community where personal stories and experiences can be
          anonymously shared, especially when it hurts and no one believes you.
          Let it out,keep a positive vibe,rise through those experiences.
        </h1>
      </div>
    </section>
  )
}

export default Hero
