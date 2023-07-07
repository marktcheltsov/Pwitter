import React, { FC, ReactNode, useEffect } from 'react'
import SideBar from './layout/SideBar'
import FollowBar from './layout/FollowBar'
import { useActions } from '@/hooks/useActions'
import { useCurrentsUser } from '@/hooks/useCurrentsUser'
import { fetchCurrentUser } from '@/serveces/user'
import { fetchUsers } from '@/serveces/users'
import { fetchPosts } from '@/serveces/posts'
import { fetchNotifications } from '@/serveces/notifications'

const Layout:FC<{children: ReactNode}> = ({children}) => {
  const { loggedIn } = useCurrentsUser()
  const { getUsers, getUserMe, getPosts } = useActions()
  const { getNotificetions } = useActions()

  useEffect(()=> {
    const jwt = localStorage.getItem('token')
    if (jwt) {
      fetchCurrentUser()
      .then(res => {
        getUserMe(res.data)
      })
      .catch(e => console.log(e))
      fetchUsers()
      .then(res => getUsers(res.data))
      .catch(e => console.log(e))
      fetchPosts()
      .then(res => {
        getPosts(res.data)
      })
      .catch(e => console.log(e))
      fetchNotifications()
      .then(res => {
        console.log(res.data)
        getNotificetions(res.data)
      })
      .catch(e => console.log(e))
    }
  }, [loggedIn])

  return (
    <div className='h-screen bg-black'>
        <div className='container h-full mx-auto xl:px-30 max-w-6xl'>
            <div className='grid grid-cols-4 h-full'>
                <SideBar/>
                <div className=' col-span-3 lg:col-span-2 border-x-[1px] border-neutral-800'>{children}</div>
                <FollowBar></FollowBar>
            </div>
        </div>
    </div>
  )
}

export default Layout