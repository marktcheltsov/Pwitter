import React, { FC } from 'react'
import Avatar from '../Avatar'
import Image from 'next/image'
import { IUser } from '@/types/interfaces'

interface UserHeroProps {
    user: IUser
}

const UserHero:FC<UserHeroProps> = ({user}) => {

  return (
    <div className='bg-neutral-700 h-44 relative'>
        {user.coverImage && (
            <Image src={user.coverImage} fill alt='Cover Image' style={{objectFit: 'cover'}} />
        )}
        <div className='absolute -bottom-16 left-4'>
            <Avatar user={user} isLarge hasBorder></Avatar>
        </div>
    </div>
  )
}

export default UserHero