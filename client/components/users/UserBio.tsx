import { useCurrentsUser } from '@/hooks/useCurrentsUser'
import { IUser } from '@/types/interfaces'
import React, { FC, useMemo, useState, useEffect } from 'react'
import { format } from "date-fns";
import Button from '../Button';
import { BiCalendar } from 'react-icons/bi';
import { followUser, unFollowUser } from '@/serveces/users';
import { useActions } from '@/hooks/useActions';
import useEditModal from '@/hooks/useEditModal';

interface UserBioProps {
    user: IUser
}

const UserBio:FC<UserBioProps> = ({ user }) => {
    const [btnState, setBtnState] = useState<boolean>(true)
    const [followers, setFollowers] = useState<number>(user.followersCount.length || 0)
    const {followToUser, unFollowToUser} = useActions()
    const currentsUser = useCurrentsUser()
    const editModal = useEditModal()
    const createdAt = useMemo(() => {
        if (!user.createdAt) {
            return null
        }
        return format(new Date(user.createdAt), 'MMMM yyyy')
    }, [user.createdAt])

    useEffect(() => {
        console.log(user._id, currentsUser._id)
        if (user._id && currentsUser.followingIds.includes(user._id) && currentsUser._id !== user._id) {
            setBtnState(false)
        }
    }, [])
    
    useEffect(() => {
        console.log(user, currentsUser)
    }, [user, currentsUser])
    

    const onClick = () => {
        if (user._id && !currentsUser.followingIds.includes(user._id) && currentsUser._id !== user._id) {
            followUser(user._id)
            .then(res => {
                setFollowers(pref => pref + 1)
                followToUser(res.data)
                setBtnState(false)
            })
            .catch(e => console.log(e))
        } else if (user._id && currentsUser.followingIds.includes(user._id) && currentsUser._id !== user._id) {
            unFollowUser(user._id)
            .then(res => {
                setFollowers(pref => pref - 1)
                unFollowToUser(res.data)
                setBtnState(true)
            })
            .catch(e => console.log(e))
        }
    }

  return (
    <div className='border-b-[1px] border-neutral-800 pb-4'>
        <div className='flex justify-end p-2'>
            {currentsUser._id === user._id ? (
                <Button secondary label='Edit' onClick={editModal.onOpen}/>
            ): <Button onClick={onClick} label={btnState ? 'Follow' : 'UnFollow'} secondary={btnState} outline={!btnState}/>}
        </div>
        <div className='mt-8 px-4'>
            <div className='flex flex-col'>
                <p className='text-white text-2xl font-semibold'>
                    {user.name}
                </p>
                <p className='text-neutral-500 text-md'>
                    @{user.username}
                </p>
            </div>
            <div className='flex flex-col mt-4'>
                <p className='text-white'>
                    {user.bio}
                </p>
                <div className='flex flex-row items-center gap-2 mt-4 text-neutral-500'>
                    <BiCalendar size={24}/>
                    <p>Joined {createdAt}</p>
                </div>
            </div>
            <div className='flex flex-row items-center mt-4 gap-6'>
                <div className='flex flex-row items-center gap-1'>
                    <p className='text-white'>
                        {user.followingIds.length}
                    </p>
                    <p className='text-neutral-500'>Following</p>
                </div>
                <div className='flex flex-row items-center gap-1'>
                    <p className='text-white'>
                        {followers}
                    </p>
                    <p className='text-neutral-500'>Followers</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default UserBio