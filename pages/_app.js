import { useEffect, useState } from 'react'
import '../styles/globals.css'
import { Footer, Header } from '../components'

function MyApp({ Component, pageProps }) {
  const [isSSR, setIsSSR] = useState(true)

  useEffect(() => {
    setIsSSR(false)
  }, [])

  if (isSSR) return null
  return (
    <div className='xl:w-[1200px] m-auto overflow-hidden h-[100vh] '>
      <Header />
      <div className='flex flex-col mt-4'>
        <Component {...pageProps} />
      </div>
      <Footer />
    </div>
  )
}

export default MyApp
