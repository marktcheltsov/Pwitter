import Header from '@/components/Header'
import PostFeed from '@/components/posts/PostFeed'
import UserBio from '@/components/users/UserBio'
import UserHero from '@/components/users/UserHero'
import { useCurrentsUser } from '@/hooks/useCurrentsUser'
import { fetchUser } from '@/serveces/users'
import { IUser } from '@/types/interfaces'
import { useRouter, } from 'next/router'
import React, { useEffect, useState } from 'react'
import { ClipLoader } from 'react-spinners'

const UserView = () => {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const [user, setUser] = useState<IUser | null>(null)
    const currentUser = useCurrentsUser()
    const { id } = router.query

    console.log(currentUser.posts)

    useEffect(()=> {
        if (typeof id === 'string') {
            setIsLoading(true)
            fetchUser(id)
            .then(res => {
                setUser(res.data)
                setIsLoading(false)
            })
            .catch(e => {
                console.log(e)
                setIsLoading(false)
            })
        }
    }, [id, currentUser])

    if (isLoading || !user ) {
        return (
            <div className='flex justify-center items-center h-full'>
                <ClipLoader color='LightBlue' size={80}></ClipLoader>
            </div>
        )
    }
  return (
    <>
        <Header showBackArrow label={user?.name}/>
        <UserHero user={user}></UserHero>
        <UserBio user={user}></UserBio>
        <PostFeed posts={user.posts}/>
    </>
)
}

export default UserView