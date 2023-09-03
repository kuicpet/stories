import React from 'react'

const Footer = () => {
  const date = new Date().getFullYear()
  return (
    <footer className='flex items-center justify-end mt-5 mx-5 bottom-0'>
      <small className='p-3'>
        &copy; Stories {date}
      </small>
    </footer>
  )
}

export default Footer
