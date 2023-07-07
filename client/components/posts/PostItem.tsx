import { useCurrentsUser } from '@/hooks/useCurrentsUser'
import useLoginModal from '@/hooks/useLoginModal'
import { IPost } from '@/types/interfaces'
import { formatDistanceToNowStrict } from 'date-fns'
import { useRouter } from 'next/router'
import { FC, useCallback, useEffect, useMemo, useState } from 'react'
import Avatar from '../Avatar'
import { AiFillHeart, AiOutlineHeart, AiOutlineMessage } from 'react-icons/ai'
import { deleteLikePost, likePost } from '@/serveces/posts'

interface PostItemProps {
    post: IPost
}
const PostItem:FC<PostItemProps> = ({post}) => {
    const router = useRouter()
    const user = useCurrentsUser()
    const loginModal = useLoginModal()
    const [ hasLiked, setHasLike ] = useState(false) 
    const [ likesCount, setLikesCount] = useState(0)

    useEffect(()=>{
      if (user._id) {
        if (post.likedIds.includes(user._id)) {
          setHasLike(true)
        }
      }
      setLikesCount(post.likedIds.length)
    }, [])

    const goToUser = (e: any) => {
      e.stopPropagation()
        router.push(`/users/${post.user._id}`)
    }
      
    const goToPost = useCallback((e: any) => {
        router.push(`/posts/${post._id}`)
    }, [router, post._id])

    const onLike = (e: any) => {
        e.stopPropagation()
        if (!user) {
            return loginModal.onOpen();
          }
        if (hasLiked) {
          deleteLikePost(post._id)
          .then(res => {
            setLikesCount(pref => pref - 1)
            setHasLike(false)
          })
          .catch(e => console.log(e))
        } else if (!hasLiked) {
          likePost(post._id)
          .then(res => {
            setLikesCount(pref => pref + 1)
            setHasLike(true)
          })
          .catch(e => console.log(e))
        }

    }

    const createdAt = useMemo(() => {
        if (!post.createdAt) {
            return null
        }
        return formatDistanceToNowStrict(new Date(post.createdAt))
    }, [post.createdAt])

  return (
        <div 
          onClick={goToPost}
          className="
            border-b-[1px] 
            border-neutral-800 
            p-5 
            cursor-pointer 
            hover:bg-neutral-900 
            transition
          ">
          <div className="flex flex-row items-start gap-3">
            <Avatar user={post.user} />
            <div>
              <div className="flex flex-row items-center gap-2">
                <p 
                  onClick={goToUser} 
                  className="
                    text-white 
                    font-semibold 
                    cursor-pointer 
                    hover:underline
                ">
                  {post.user.name}
                </p>
                <span 
                  onClick={goToUser} 
                  className="
                    text-neutral-500
                    cursor-pointer
                    hover:underline
                    hidden
                    md:block
                ">
                  @{post.user.username}
                </span>
                <span className="text-neutral-500 text-sm">
                  {createdAt}
                </span>
              </div>
              <div className="text-white mt-1">
                {post.body}
              </div>
              <div className="flex flex-row items-center mt-3 gap-10">
                <div 
                  className="
                    flex 
                    flex-row 
                    items-center 
                    text-neutral-500 
                    gap-2 
                    cursor-pointer 
                    transition 
                    hover:text-sky-500
                ">
                  <AiOutlineMessage size={20} />
                  <p>
                    {post.comments?.length || 0}
                  </p>
                </div>
                <div
                  onClick={onLike}
                  className="
                    flex 
                    flex-row 
                    items-center 
                    text-neutral-500 
                    gap-2 
                    cursor-pointer 
                    transition 
                    hover:text-red-500
                ">
                  {hasLiked ? <AiFillHeart color={hasLiked ? 'red' : ''} size={20}/> : <AiOutlineHeart color={hasLiked ? 'red' : ''} size={20}/>}
                  <p>
                    {likesCount}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
  )
}

export default PostItem