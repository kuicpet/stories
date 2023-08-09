import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import useAuthStore from '../store/authStore'
import { Meta } from '../components'

const Profile = () => {
  const router = useRouter()
  const { userProfile } = useAuthStore()
  useEffect(() => {
    if (!userProfile) {
      router.push(`/login`)
    }
  }, [router, userProfile])
  return (
    <section>
      <Meta title='Profile' />
      {userProfile && (
        <>
          <h1>Hi, {userProfile?.username}</h1>
          <p>Email: {userProfile?.email}</p>
          {/* Display other profile information here */}
        </>
      )}
    </section>
  )
}

export default Profile
