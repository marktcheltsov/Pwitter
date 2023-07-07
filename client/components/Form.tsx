import { useCurrentsUser } from '@/hooks/useCurrentsUser'
import useLoginModal from '@/hooks/useLoginModal'
import useRegisterModal from '@/hooks/useRegisterModal'
import React, { FC, useCallback, useState } from 'react'
import { toast } from 'react-hot-toast'
import Button from './Button'
import { createPost } from '@/serveces/posts'
import { useActions } from '@/hooks/useActions'
import { useRouter } from 'next/router'
import { createComment } from '@/serveces/comment'

interface FormProps {
    placeholder: string
    isComment?: boolean
    postId?: string
}

const Form:FC<FormProps> = ({placeholder, isComment, postId}) => {
  const router = useRouter();
  const currentPath = router.asPath;
  const currentUser = useCurrentsUser()
    const { addPost, addComment } = useActions()
    const registerModal = useRegisterModal()
    const loginModal = useLoginModal()
    const user = useCurrentsUser()
    const [body, setBody] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const onSubmit = useCallback(() => {
      if (postId && currentPath === `/posts/${postId}`) {
        createComment(body, postId)
        .then(res => {
          res.data.user = currentUser
          addComment(res.data)
          toast.success('Comment created');
          setBody('');
        })
        .catch(e => console.log(e))
      } else {
        createPost(body)
        .then(res => {
          res.data.user = currentUser
          addPost(res.data)
          toast.success('Tweet created');
          setBody('');
        })
        .catch(e => toast.error('Something went wrong'))
        .finally(()=> setIsLoading(false))
      }
      }, [body, isComment, postId]);

      return (
        <div className="border-b-[1px] border-neutral-800 px-5 py-2">
          {user._id ? (
            <>
            <div className="flex flex-row gap-4">
              <div className="w-full">
                <textarea
                  disabled={isLoading}
                  onChange={(event) => setBody(event.target.value)}
                  value={body}
                  className="
                    disabled:opacity-80
                    peer
                    resize-none 
                    mt-3 
                    w-full 
                    bg-black 
                    ring-0 
                    outline-none 
                    text-[20px] 
                    placeholder-neutral-500 
                    text-white
                  "
                  placeholder={placeholder}>
                </textarea>
                <hr 
                  className="
                    opacity-0 
                    peer-focus:opacity-100 
                    h-[1px] 
                    w-full 
                    border-neutral-800 
                    transition"
                />
                <div className="mt-4 flex flex-row justify-end">
                  <Button disabled={isLoading || !body} onClick={onSubmit} label="Tweet" />
                </div>
              </div>
            </div>
            </>
          ) : (
            <div className="py-8">
              <h1 className="text-white text-2xl text-center mb-4 font-bold">Welcome to Twitter</h1>
              <div className="flex flex-row items-center justify-center gap-4">
                <Button label="Login" onClick={loginModal.onOpen} />
                <Button label="Register" onClick={registerModal.onOpen} secondary />
              </div>
            </div>
          )}
        </div>
      );
    
}

export default Form