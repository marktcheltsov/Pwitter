import React, { useCallback, useState } from 'react'
import Input from '../Input';
import Modal from '../Modal';
import useLoginModal from '@/hooks/useLoginModal';
import useRegisterModal from '@/hooks/useRegisterModal';
import { toast } from "react-hot-toast";
import { loginUser ,registerUser } from '@/serveces/user';
import { useActions } from '@/hooks/useActions';

const RegisterModal = () => {
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal()
  const { loginAction } = useActions()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const onToggle = useCallback(()=> {
    if (isLoading) {
        return
    }
    registerModal.onClose()
    loginModal.onOpen()
  },[isLoading, loginModal, registerModal])

  const OnSubmit = useCallback(async ()=>{
    try {
      setIsLoading(true)
      const { data } = await registerUser( email, password, username, name )
      const { data: tokenData } = await loginUser(email, password)
      localStorage.setItem('token', tokenData.jwt)
      loginAction()
      toast.success('Accoun created.')
      registerModal.onClose()
    } catch (error) {
      console.log(error)
      toast.error('Something went wrong')
    } finally {
      setIsLoading(false)
    }
  }, [registerModal, email, password, username, name])

  const bodyContent = (
    <div className='flex flex-col gap-4'>
      <Input placeholder='email' onChange={(e)=> setEmail(e.target.value)} value={email} disabled={isLoading}></Input>
      <Input placeholder='name' onChange={(e)=> setName(e.target.value)} value={name} disabled={isLoading}></Input>
      <Input placeholder='username' onChange={(e)=> setUsername(e.target.value)} value={username} disabled={isLoading}></Input>
      <Input type="password" placeholder='password' onChange={(e)=> setPassword(e.target.value)} value={password} disabled={isLoading}></Input>
    </div>
  )

  const footerContent = (
    <div className='text-neutral-400 text-center mt-4'>
        <p>Already have account? <span className='text-white cursor-pointer hover:underline' onClick={onToggle}>Sign In</span></p>
    </div>
)

  return (
    <Modal footer={footerContent} disabled={isLoading} body={bodyContent} isOpen={registerModal.isOpen} title='Create an account' actionLabel='Register' onClose={()=> {registerModal.onClose()}} onSubmit={OnSubmit}></Modal>
  )
}

export default RegisterModal