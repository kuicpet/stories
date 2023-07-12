import React from 'react'

const Footer = () => {
  const date = new Date().getFullYear()
  return (
    <footer className='flex items-center lg:justify-end justify-center mt-5 mx-5'>
      <small className='p-3'>&copy; Stories {date}</small>
    </footer>
  )
}

export default Footer
