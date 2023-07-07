import React, { useCallback, useState } from 'react'
import Input from '../Input';
import Modal from '../Modal';
import useLoginModal from '@/hooks/useLoginModal';
import axios from "axios";
import useRegisterModal from '@/hooks/useRegisterModal';
import { IToken } from '@/types/interfaces';
import { toast } from 'react-hot-toast';
import { loginUser } from '@/serveces/user';
import { useActions } from '@/hooks/useActions';

const LoginModal = () => {
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal()
  const { loginAction } = useActions()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const onToggle = useCallback(()=> {
    if (isLoading) {
        return
    }
    registerModal.onOpen()
    loginModal.onClose()
  },[isLoading, loginModal, registerModal])

  const OnSubmit = useCallback(async ()=>{
    try {
      setIsLoading(true)
      const { data: tokenData } = await loginUser(email, password)
      localStorage.setItem('token', tokenData.jwt)
      loginModal.onClose()
      loginAction()
      toast.success('Accoun logined.')
    } catch (error) { 
      console.log(error)
      toast.error('Something went wrong')
    } finally {
      setIsLoading(false)
    }
  }, [loginModal, email, password])

  const bodyContent = (
    <div className='flex flex-col gap-4'>
      <Input placeholder='email' onChange={(e)=> setEmail(e.target.value)} value={email} disabled={isLoading}></Input>
      <Input type="password" placeholder='password' onChange={(e)=> setPassword(e.target.value)} value={password} disabled={isLoading}></Input>
    </div>
  )

  const footerContent = (
    <div className='text-neutral-400 text-center mt-4'>
        <p>Dont have an account?<span className='text-white cursor-pointer hover:underline' onClick={onToggle}>Sign up</span></p>
    </div>
)

  return (
    <Modal footer={footerContent} disabled={isLoading} body={bodyContent} isOpen={loginModal.isOpen} title='Login' actionLabel='Sign In' onClose={()=> {loginModal.onClose()}} onSubmit={OnSubmit}></Modal>
  )
}

export default LoginModal