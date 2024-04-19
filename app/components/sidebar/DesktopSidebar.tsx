"use client"
import useRoutes from '@/app/hooks/useRoutes'
import React, { useState } from 'react'
import DesktopItem from './DesktopItem'
import { User } from '@prisma/client'
import Avatar from '../Avatar'

interface DesktopSidebarProps {
  currentUser: User
}

const DesktopSidebar: React.FC<DesktopSidebarProps> = ({ currentUser }) => {

  const routes = useRoutes()
  const [isOpen, setIsOpen] = useState(false)
  console.log(currentUser)
  return (
    <div className='hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-40 lg:w-20 lg:overflow-y-auto lg:bg-white lg:border-r-[1px] lg:pb-4 lg:flex lg:flex-col justify-between lg:bg-slate-900'>
      <nav className='flex flex-col justify-between mt-4 w-full h-full items-center'>
        <ul role='list' className='flex flex-col items-center space-y-1'>
          {routes.map((route, index) => (
            <DesktopItem 
            key={index} 
            label={route.label} 
            href={route.href} 
            icon={route.icon} 
            onClick={route.onClick}
            active={route.active}
            />
          ))}
        </ul>
        <div className='bottom-0 flex text-center w-full h-24 justify-center items-center cursor-pointer hover:opacity-75 transition'
          onClick={() => setIsOpen(true)}
        >
        <Avatar user={currentUser}/>
        </div>
      </nav>
    </div>
  )
}

export default DesktopSidebar