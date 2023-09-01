import { useEffect, useState } from 'react'
import axios from 'axios'
import '../styles/globals.css'
import { Footer, Header } from '../components'

function MyApp({ Component, pageProps }) {
  const [isSSR, setIsSSR] = useState(true)
  // const [imgUrl, setImgUrl] = useState('')

  /* const fetchRandomImage = async () => {
    try {
      const apiUrl = 'https://source.unsplash.com/random'
      const response = await axios.get(apiUrl)
      console.log(response)
      setImgUrl(response?.request?.responseURL)
    } catch (error) {
      console.error('Error fetching image:', error)
    }
  }

  useEffect(() => {
    fetchRandomImage()
  }, [])*/

  useEffect(() => {
    setIsSSR(false)
  }, [])

  if (isSSR) return null
  return (
    <div className='xl:w-[1200px] m-auto h-screen'>
      <Header />
      <div className='flex flex-col items-center mt-4'>
        <Component {...pageProps} />
      </div>
      <Footer />
    </div>
  )
}

export default MyApp
