"use client"
import Avatar from '@/app/components/Avatar'
import useOtherUser from '@/app/hooks/useOtherUser'
import { FullConversationType } from '@/app/types'
import classNames from 'classnames'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React, { useCallback, useMemo } from 'react'
import {format} from "date-fns"
import { AvatarGroup } from '@nextui-org/react'
import { User } from '@prisma/client'


interface ConversationBoxPropsI {
  data: FullConversationType,
  selected?: boolean
  currentUser: User
}


const ConversationBox: React.FC<ConversationBoxPropsI> = ({ data , selected, currentUser }) => {

  const router = useRouter();

  console.log(currentUser, "current user")
  console.log("GELEN DATA: ", data.users)

  const otherUser = useMemo(() => {
    const otherUser = data.users.filter((user) => user.email !== currentUser.email)
    return otherUser[0]
  }, [currentUser, data])


  const handleClick = useCallback(() => {
    router.push(`/conversations/${data.id}`)
  },[data.id, router])

  const lastMessage = useMemo(() => {
    const messages = data.messages || []
    return messages[messages.length - 1]
  }, [data.messages])


  const hasSeen = useMemo(() => {
    if(!lastMessage) { return false }

    const seenArray = lastMessage.seen || []

    if(!currentUser.email) { return false }

    return seenArray
    .filter((user) => user.email === currentUser.email)
    .length !== 0


  
  }, [currentUser, lastMessage])

  const lastMessageText = useMemo(() => {
    if(lastMessage?.image) {
      return "Sent an image"
    }
    return lastMessage?.body ? lastMessage.body : "Conversation started!"
  }, [lastMessage])


  return (
    <div
      className={classNames({
        "w-full relative flex items-center space-x-3 hover:bg-neutral-100 rounded-lg transition cursor-pointer p-3 border-b-1": true,
        "bg-neutral-100": selected,
        "bg-white": !selected
      })}
      onClick={handleClick}
    >
      {
        !data.isGroup ? 
        (<Avatar  user={otherUser}/>)
        :
        (
          <AvatarGroup isBordered max={3} total={data.users.length - 3}>
            {data.users.map((user, index) => (
              <Avatar user={user} key={index}/>
            ))}
          </AvatarGroup>
        )
      }
      <div className='min-w-0 flex-1'>
        <div className="focus:outline-none">
          <div className='flex justify-between items-center mb-1'>
            <p className="text-md font-bold text-gray-900">
              { data.name || otherUser.name }
            </p>
            {lastMessage?.createdAt && 
            (<p className="text-xs text-gray-400 font-light">
              {format(new Date(lastMessage?.createdAt || Date.now()), "p")}
            </p>)
            }
          </div>
          <p className={classNames({
            "truncate text-sm": true,
            "text-gray-500": hasSeen,
            "text-gray-900 font-bold": !hasSeen
          })}>{lastMessageText}</p>
        </div>
      </div>
    </div>
  )
}

export default ConversationBox