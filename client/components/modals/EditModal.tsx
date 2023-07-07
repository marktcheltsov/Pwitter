import { useCurrentsUser } from '@/hooks/useCurrentsUser'
import useEditModal from '@/hooks/useEditModal'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import Modal from '../Modal'
import Input from '../Input'
import ImageUpload from '../ImageUpload'
import { updateCurrentUser } from '@/serveces/user'
import { useActions } from '@/hooks/useActions'

const EditModal = () => {
    const user = useCurrentsUser()
    const {getUserMe} = useActions()
    const editModal = useEditModal()

    const [name, setName] = useState('')
    const [bio, setBio] = useState('')
    const [username, setUsername] = useState('')
    const [coverImage, setCoverImage] = useState('')
    const [profileImage, setProfileImage] = useState('')


    useEffect(()=> {
        setName(user.name)
        setUsername(user.username)
        if (user.coverImage) {
            setCoverImage(user.coverImage)
        }
        if (user.profileImage) {
            setProfileImage(user.profileImage)
        }
        if (user.bio) {
            setBio(user.bio)
        }
    }, [user])

        const [isLoading, setIsLoading] = useState(false)

        const onSubmit = async () => {
            setIsLoading(true)
            updateCurrentUser(name, username, bio, coverImage, profileImage)
            .then(res => {
                getUserMe(res.data)
                toast.success('User was Updated')
            })
            .catch(error => {
                console.log(error)
                toast.error('Something went wrong')
            })
            .finally(()=> {
                setIsLoading(false)
                editModal.onClose()
            })
        }

    const bodyContent = (
        <div className='flex flex-col gap-4'>
            <ImageUpload value={profileImage} disabled={isLoading} onChange={(image) => setProfileImage(image)} label="Upload profile image" />
            <ImageUpload value={coverImage} disabled={isLoading} onChange={(image) => setCoverImage(image)} label="Upload cover image" />
            <Input 
            placeholder="Name" 
            onChange={(e)=> {
                console.log(e.target.value)
                setName(e.target.value)
            }}
            value={name}
            disabled={isLoading}
            />
            <Input 
            placeholder="Username" 
            onChange={(e)=> setUsername(e.target.value)}
            value={username}
            disabled={isLoading}
            />
            <Input 
            placeholder="Bio" 
            onChange={(e)=> setBio(e.target.value)}
            value={bio}
            disabled={isLoading}
            />
        </div>
    )    
  return (
    <Modal disabled={isLoading} isOpen={editModal.isOpen} title='Edit Your Profile' actionLabel='Save' onClose={editModal.onClose} onSubmit={onSubmit} body={bodyContent}/>
  )
}

export default EditModal





// const user = useCurrentsUser()