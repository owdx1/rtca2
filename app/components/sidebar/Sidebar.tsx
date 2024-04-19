import React from 'react'
import DesktopSidebar from './DesktopSidebar'
import MobileFooter from './MobileFooter'
import getCurrentUser from '@/app/action/getCurrentUser'

export const Sidebar = async ({children} : {children: React.ReactNode}) => {

  const currentUser = await getCurrentUser();
  return (
    <div className='h-full'>
      <DesktopSidebar currentUser={currentUser!} />
      <MobileFooter />
      <main className='h-full lg:pl-20 lg:bg-fuchsia-500'>
        {children}
      </main>      
    </div>
  )
}