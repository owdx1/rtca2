"use client"
import { User } from '@prisma/client'
import React from 'react'
import UserBox from './UserBox'

interface UserListPropsI {
  users: User[]
}

const UserList: React.FC<UserListPropsI> = ({users}) => {
  return (
    <aside
      className="fixed inset-y-0 pb-20 lg:pb-0 lg:left-20 lg:w-80 lg:block overflow-y-auto w-full left-0"
    >
      <div className='px-5'>
        <div className='flex-col'>
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