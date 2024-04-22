import Avatar from '@/app/components/Avatar'
import useOtherUser from '@/app/hooks/useOtherUser'
import { FullConversationType } from '@/app/types'
import classNames from 'classnames'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React, { useCallback, useMemo } from 'react'
import {format} from "date-fns"


interface ConversationBoxPropsI {
  data: FullConversationType,
  selected?: boolean
}

const ConversationBox: React.FC<ConversationBoxPropsI> = ({ data , selected }) => {

  const session = useSession();
  const router = useRouter();

  const otherUser = useMemo(() => {
    const currentUserEmail = session.data?.user?.email
    const otherUser = data.users.filter((user) => user.email !== currentUserEmail)
    return otherUser[0]
  }, [session.data?.user?.email, data])


  const handleClick = useCallback(() => {
    router.push(`/conversations/${data.id}`)
  },[data.id, router])

  const lastMessage = useMemo(() => {
    const messages = data.messages || []
    return messages[messages.length - 1]
  }, [data.messages])

  const userEmail = useMemo(() => {
    return session.data?.user?.email
  }, [session.data?.user?.email])

  const hasSeen = useMemo(() => {
    if(!lastMessage) { return false }

    const seenArray = lastMessage.seen || []

    if(!userEmail) { return false }

    return seenArray
    .filter((user) => user.email === userEmail)
    .length !== 0


  
  }, [userEmail, lastMessage])

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
      <Avatar  user={otherUser}/>
      <div className='min-w-0 flex-1'>
        <div className="focus:outline-none">
          <div className='flex justify-between items-center mb-1'>
            <p className="text-md font-extralight text-gray-900">
              { data.name || otherUser.name }
            </p>
            {lastMessage?.createdAt && 
            (<p className="text-xs text-gray-400 font-light">
              {format(new Date(lastMessage.createdAt), "p")}
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