"use client"

import Avatar from '@/app/components/Avatar'
import LoadingModal from '@/app/components/LoadingModal'
import { User } from '@prisma/client'
import axios from 'axios'
import { useRouter } from 'next/navigation'

import React, { useCallback, useState } from 'react'

interface UserBoxProps {
  user: User
}

const UserBox: React.FC<UserBoxProps> = ({ user }) => {

  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const handleClick = useCallback(async () => {
    setIsLoading(true)
      await axios.post("/api/conversations", {
      userId: user.id
    })
    .then((data) => {
      router.push(`/conversations/${data.data.id}`)
    })
    .catch((error) => {
      console.log(error)
    })
    .finally(() => setIsLoading(false))

  }, [user, router])


  return (
    <>
      {isLoading && 
        <LoadingModal />
      }
      <div 
        onClick={handleClick} 
        className="w-full relative flex items-center space-x-3 bg-white p-3 hover:bg-neutral-100 transition cursor-pointer rounded-lg border-b-1 mt-1"
      >
        <Avatar user={user}/>
        <div className='min-w-0 flex-1'>
          <div className="focus:outline-none">
            <div className='flex justify-between items-center mb-1'>
              <p className='text-sm font-light text-gray-900'>
                {user.name}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default UserBox