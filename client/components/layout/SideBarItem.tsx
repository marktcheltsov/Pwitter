import React, { use, useCallback } from 'react';
import { ISideBarItem } from '../../types/layout.interfaces';
import { useRouter } from 'next/router';
import { useCurrentsUser } from '@/hooks/useCurrentsUser';
import useLoginModal from '@/hooks/useLoginModal';
import { BsDot } from 'react-icons/bs';



const SidebarItem: React.FC<ISideBarItem> = ({ label, icon: Icon, href, onClick, auth, alert }) => {
  const logiModal = useLoginModal()
  const router = useRouter()
  const user = useCurrentsUser()
  const handleClick = useCallback(()=> { 
    if (onClick) {
      return onClick()
    }
    if (auth && !user._id) {
      console.log('s')
      logiModal.onOpen()
    } else if (href) {
      router.push(href)
    }
  }, [onClick, router, href, user, auth, logiModal])

  return (

    <div onClick={handleClick} className="flex flex-row items-center">
      <div className="
        relative
        rounded-full 
        h-14
        w-14
        flex
        items-center
        justify-center 
        p-4
        hover:bg-slate-300 
        hover:bg-opacity-10 
        cursor-pointer 
        lg:hidden
      ">
        <Icon size={28} color="white" />
        {alert ? <BsDot className='text-sky-500 absolute -top-4 left-0' size={70}/> : null}
      </div>
      <div className="
        relative
        hidden 
        lg:flex 
        items-row 
        gap-4 
        p-4 
        rounded-full 
        hover:bg-slate-300 
        hover:bg-opacity-10 
        cursor-pointer
        items-center
      ">
        <Icon size={24} color="white" />
        <p className="hidden lg:block text-white text-xl">
          {label}
        </p>
        {alert ? <BsDot className='text-sky-500 absolute -top-4 left-0' size={70}/> : null}
      </div>
    </div>
  );
}

export default SidebarItem;