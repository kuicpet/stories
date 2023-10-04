import axios from 'axios'
import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import { formatTimestamp } from '../../utils/formatTimestamp'
import { Loader } from '../../components'

const AdminDashboard = () => {
  const [users, setUsers] = useState([])
  const [posts, setPosts] = useState([])
  const [tabIndex, setTabIndex] = useState(0)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchPosts()
  }, [])

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchPosts = async () => {
    try {
      setLoading(true)
      await axios.get('/api/post').then((response) => {
        if (response.status === 200) {
          setLoading(false)
          setPosts(response?.data)
          // console.log(response.data, 'admin')
        }
      })
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const fetchUsers = async () => {
    try {
      setLoading(true)
      await axios.get('/api/admin/user').then((response) => {
        if (response.status === 200) {
          setLoading(false)
          setUsers(response?.data)
          // console.log(response?.data)
        }
      })
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className='flex flex-col md:flex-row w-[95%] p-2 border-2 border-black m-2'>
      {loading && (
        <div className='absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg'>
          <Loader />
        </div>
      )}
      <div className='flex flex-col w-1/4 border border-black p-1 md:h-[92vh]'>
        <Tabs
          selectedIndex={tabIndex}
          onSelect={(index) => setTabIndex(index)}
          className='border-none outline-none'>
          <TabList>
            <Tab
              className={`${
                tabIndex === 0 ? 'bg-[#ace5d4]' : 'hover:bg-[#ace5d4]'
              } border-2 p-1 cursor-pointer border-black outline-none`}>
              Stories
            </Tab>
            <Tab
              className={`${
                tabIndex === 1 ? 'bg-[#ace5d4]' : 'hover:bg-[#ace5d4]'
              } border-2 p-1 cursor-pointer border-black outline-none`}>
              Users
            </Tab>
          </TabList>
        </Tabs>
      </div>
      <div className='md:w-3/4 border border-black p-1'>
        <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
          <TabPanel>
            <div className='border-2 border-black p-1 overflow-x-auto'>
              <div className='w-full'>
                <p>Stories</p>
              </div>
              <table className='min-w-full border-2 border-black divide-y text-left uppercase'>
                <thead className='border-b-2 border-black bg-[#ace5d4]'>
                  <tr>
                    {/**
                     * 
                    <th>PostId</th>
                     */}
                    <th
                      scope='col'
                      className='text-xs md:text-[1rem]  py-1 font-medium tracking-wider'>
                      Date
                    </th>
                    <th
                      scope='col'
                      className='flex text-xs md:text-[1rem]  py-1 font-medium tracking-wider'>
                      <span className='hidden md:block mr-1'>Created </span> By
                    </th>
                    <th
                      scope='col'
                      className='text-xs md:text-[1rem]  py-1 font-medium tracking-wider'>
                      Title
                    </th>
                  </tr>
                </thead>
                {posts &&
                  posts.length > 0 &&
                  posts?.map((post) => (
                    <tbody key={post._id} className=''>
                      <tr className='border-t border-black'>
                        {/**
                         * 
                        <td>{post._id.slice(0, 6)}...</td>
                         */}
                        <td className='whitespace-nowrap'>
                          {formatTimestamp(post?.createdAt)}
                        </td>
                        <td className='whitespace-nowrap'>
                          {post?.userId?.username}
                        </td>
                        <td className='whitespace-nowrap'>{post.title}</td>
                      </tr>
                    </tbody>
                  ))}
              </table>
            </div>
          </TabPanel>
          <TabPanel>
            <div className='border-2 border-black p-1 overflow-x-auto'>
              <div className='w-full'>
                <p>Users</p>
              </div>
              <table className='min-w-full border-2 border-black divide-y text-left uppercase'>
                <thead className='border-b-2 border-black bg-[#ace5d4]'>
                  <tr>
                    {/**
                     * 
                    <th>PostId</th>
                     */}
                    <th
                      scope='col'
                      className='text-xs md:text-[1rem]  py-1 font-medium tracking-wider'>
                      Date Joined
                    </th>
                    <th
                      scope='col'
                      className='text-xs md:text-[1rem]  py-1 font-medium tracking-wider'>
                      username
                    </th>
                    <th
                      scope='col'
                      className='text-xs md:text-[1rem]  py-1 font-medium tracking-wider'>
                      email
                    </th>
                  </tr>
                </thead>
                {users &&
                  users.length > 0 &&
                  users?.map((user) => (
                    <tbody key={user._id} className=''>
                      <tr className='border-t border-black'>
                        {/**
                         * 
                        <td>{post._id.slice(0, 6)}...</td>
                         */}
                        <td className='whitespace-nowrap'>
                          {formatTimestamp(user?.createdAt)}
                        </td>
                        <td className='whitespace-nowrap'>{user?.username}</td>
                        <td className='whitespace-nowrap'>{user?.email}</td>
                      </tr>
                    </tbody>
                  ))}
              </table>
            </div>
          </TabPanel>
        </Tabs>
      </div>
    </section>
  )
}

export default AdminDashboard
