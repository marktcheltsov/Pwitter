import { IAvatarProps } from '@/types/layout.interfaces'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { FC, useCallback } from 'react'

const Avatar:FC<IAvatarProps> = ({user, isLarge, hasBorder}) => {
    const router = useRouter()
    const onClick = useCallback((e: any)=> {
        e.stopPropagation();
        const url = `/users/${user._id}`
        router.push(url)
    }, [router, user])

  return (
    <div className={`
    ${hasBorder ? 'border-4 border-black' : ''}
    ${isLarge ? 'h-32' : 'h-12'}
    ${isLarge ? 'w-32' : 'w-12'}
    rounded-full
    hover:opacity-90
    transition
    cursor-pointer
    relative
    `}>
    <Image style={{objectFit: 'cover', borderRadius: '100%'}}
    fill
    alt='Avatar'
    onClick={onClick}
    src={user.profileImage}
    ></Image>
    </div>
  )
}

export default Avatar