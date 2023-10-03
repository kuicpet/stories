import axios from 'axios'
import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import { formatTimestamp } from '../../utils/formatTimestamp'

const AdminDashboard = () => {
  const [userList, setuserList] = useState([])
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
          setPosts(response.data)
          console.log(response.data)
        }
      })
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const fetchUsers = () => {}

  return (
    <section className='flex w-[95%] p-2 border-2 border-black m-2'>
      <div className='flex flex-col w-1/4 border border-black p-1 h-[92vh]'>
        <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
          <TabList>
            <Tab className='border-2 p-1 cursor-pointer border-black'>
              Stories
            </Tab>
            <Tab className='border-2 p-1 cursor-pointer border-black'>
              Users
            </Tab>
          </TabList>
        </Tabs>
      </div>
      <div className='w-3/4 border border-black p-1'>
        <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
          <TabPanel>
            <div className='border-2 border-black p-1'>
              <div className='border-b-2 border-black'>
                <p>Stories</p>
              </div>
              <table className='w-full text-left'>
                <thead className='border-b-2 border-black'>
                  <tr>
                    <th>PostId</th>
                    <th>User</th>
                    <th>Title</th>
                    <th>createdAt</th>
                  </tr>
                </thead>
                {posts &&
                  posts.length > 0 &&
                  posts?.map((post) => (
                    <tbody key={post._id} className=''>
                      <tr className='border-t border-black'>
                        <td>{post._id.slice(0, 6)}...</td>
                        <td>{post?.userId?.username}</td>
                        <td>{post.title}</td>
                        <td>{formatTimestamp(post?.createdAt)}</td>
                      </tr>
                    </tbody>
                  ))}
              </table>
            </div>
          </TabPanel>
          <TabPanel>
            <div className='border-2 border-black p-1'>
              <p>Users Content</p>
            </div>
          </TabPanel>
        </Tabs>
      </div>
    </section>
  )
}

export default AdminDashboard
