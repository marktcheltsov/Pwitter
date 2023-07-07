import React, { useEffect, useState } from 'react'
import { BsHouseFill, BsBellFill } from "react-icons/bs";
import { BiLogOut } from "react-icons/bi";
import { FaUser } from "react-icons/fa";
import SideBarLogo from './SideBarLogo';
import { ISideBarItem } from '../../types/layout.interfaces';
import SideBarItem from './SideBarItem';
import SideBarTweetButton from './SideBarTweetButton';
import { useCurrentsUser } from '@/hooks/useCurrentsUser';
import { useNotifications } from '@/hooks/useNotifications';
import { useActions } from '@/hooks/useActions';
import { useRouter } from 'next/router';


const SideBar = () => {
  const user = useCurrentsUser()
  const router = useRouter()
  const { notifications } = useNotifications()
  const [alarmState, setAlarmState] = useState(false)
  const { logOut } = useActions()

  useEffect(()=>{
    setAlarmState(false)
    for (let index = 0; index < notifications.length; index++) {
      const element = notifications[index];
      if (!element.wasCheaked) {
        setAlarmState(true)
        break
      }
    }
  }, [notifications])

  const items: ISideBarItem[] = [
  {
    label: 'Home',
    href: '/',
    icon: BsHouseFill,
  },
  {
    label: 'Notifications',
    href: '/notifications',
    icon: BsBellFill,
    auth: true,
    alert: alarmState
  },
  {
    label: 'Profile',
    href: `/users/${user._id}`,
    icon: FaUser,
    auth: true,
  }
  ];

  return (
    <div className='col-span-1 h-full pr-4 md:pr-6'>
        <div className='flex flex-col items-end'>
          <div className='space-y-2 lg:w-[230px]'>
            <SideBarLogo/>
            {items.map((item) => (<SideBarItem key={item.href} href={item.href} label={item.label} icon={item.icon} onClick={item.onClick} auth={item.auth} alert={item.alert} />))}
            {user._id && <SideBarItem label='Logout' icon={BiLogOut} onClick={()=> {
              router.push('/')
              logOut()
              localStorage.clear()}} />}
            <SideBarTweetButton></SideBarTweetButton>
          </div>
        </div>
    </div>
  )
}

export default SideBar