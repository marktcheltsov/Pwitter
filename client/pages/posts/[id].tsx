import Form from '@/components/Form'
import Header from '@/components/Header'
import CommentFeed from '@/components/posts/CommentFeed'
import PostItem from '@/components/posts/PostItem'
import { useActions } from '@/hooks/useActions'
import { usePosts } from '@/hooks/usePosts'
import { fetchPost } from '@/serveces/posts'
import { IPost } from '@/types/interfaces'
import { useRouter } from 'next/router'
import {FC, useEffect, useState} from 'react'
import { ClipLoader } from 'react-spinners'

const PostView:FC = () => {
    const router = useRouter()
    const { setCurrentPost } = useActions()
    const { currentPost } = usePosts()
    const [isLoading, setIsLoading] = useState(true)
    const { id } = router.query


    useEffect(() => {
    setIsLoading(true)
    if (typeof id === 'string') {
        fetchPost(id)
        .then(res => {
            console.log(res.data)
            setIsLoading(false)
            setCurrentPost(res.data)
        })
        .catch(e => console.log(e))
    }
    }, [id])

    if (isLoading || !currentPost) {
        return (
          <div className="flex justify-center items-center h-full">
            <ClipLoader color="lightblue" size={80} />
          </div>
        )
      }
    
  return (
    <>
    <Header showBackArrow label="Tweet" />
    {currentPost && (
        <>
        <PostItem post={currentPost} />
        <Form postId={typeof id === 'string' ? id : currentPost._id} isComment placeholder="Tweet your reply" />
        <CommentFeed comments={currentPost.comments} />
        </>
    )}
  </>
  )
}

export default PostView

