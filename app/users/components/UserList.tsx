"use client"
import { User } from '@prisma/client'
import React from 'react'
import UserBox from './UserBox'
import { Image } from '@nextui-org/react'

interface UserListPropsI {
  users: User[]
}

const UserList: React.FC<UserListPropsI> = ({users}) => {
  return (
    <aside
      className="fixed inset-y-0 pb-20 lg:pb-0 lg:left-20 lg:w-80 lg:block overflow-y-auto w-full left-0"
    >
      <div className='px-5'>
        <div className='flex gap-2 items-center border-b-1 py-2'>
          <Image
            alt=''
            src='/icon.png'
            width={80}
            height={80}
            className="text-purple-600"
          />
          <div className='text-2xl font-extralight text-neutral-800 py-4'>
            People
          </div>
        </div>
        {users.map((user, index) => (
          <UserBox user={user} key={user.id}/>
        ))}
      </div>

    </aside>
  )
}

export default UserList