"use client"
import Avatar from '@/app/components/Avatar'
import { Conversation, User } from '@prisma/client'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import React, { useMemo, useState } from 'react'
import { HiChevronLeft } from 'react-icons/hi'
import { HiEllipsisHorizontal } from 'react-icons/hi2'
import ProfileDrawer from './ProfileDrawer'

interface HeaderPropsI {
  conversation: Conversation & {
    users: User[]
  }
}

const Header: React.FC<HeaderPropsI> = ({conversation}) => {

  const session = useSession();

  const [drawerOpen, setDrawerOpen] = useState(false)

  const otherUser = useMemo(() => {
    const currentUserEmail = session.data?.user?.email
    const otherUser = conversation.users.filter((user) => user.email !== currentUserEmail)
    return otherUser[0]
  }, [session.data?.user?.email, conversation])
  
  const statusText = useMemo(() => {
    if(conversation.isGroup) {
      return `${conversation.users.length} members`
    }
    return "Active";
  }, [conversation])


  return (
    <>
      <ProfileDrawer data={conversation} isOpen={drawerOpen} onClose={() => setDrawerOpen(false)}/>
      <div className='bg-white w-full flex border-b-1 sm:px-4 py-3 px-4 lg:px-6 justify-between items-center shadow-sm'>
        <div className='flex gap-3 items-center'>
          <Link
            href="/conversations"
            className="lg:hidden text-neutral-600 hover:text-neutral-300 transition cursor-pointer block"
          >
            { <HiChevronLeft size={32} /> }
          </Link>
          <Avatar user={otherUser}/>
          <div className='flex flex-col'>
            <div>
              {conversation.name || otherUser.name}
            </div>
            <div className="text-sm font-extralight text-neutral-500">
              {statusText}
            </div>
          </div>
        </div>
        <HiEllipsisHorizontal onClick={() => setDrawerOpen(true)} size={32} className="cursor-pointer text-neutral-600 hover:text-neutral-300" />
      </div>
    </>
  )
}

export default Header