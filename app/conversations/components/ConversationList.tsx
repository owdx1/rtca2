"use client"
import useConversation from '@/app/hooks/useConversation'
import { FullConversationType } from '@/app/types'
import classNames from 'classnames'
import { useRouter } from 'next/navigation'
import React, { useEffect, useMemo, useState } from 'react'
import { MdOutlineGroupAdd } from 'react-icons/md'
import ConversationBox from './ConversationBox'
import GroupChatModal from './GroupChatModal'
import { User } from '@prisma/client'
import { Image } from '@nextui-org/react'
import { useSession } from 'next-auth/react'
import { pusherClient } from '@/app/lib/pusher'
import { find } from 'lodash'

interface ConversationListPropsI {
  initialItems: FullConversationType[]
  users : User[]
  currentUser: User
}

const ConversationList: React.FC<ConversationListPropsI> = ({ initialItems, users, currentUser }) => {

  const session = useSession()
  const router = useRouter();
  const [items, setItems] = useState(initialItems);
  const { conversationId, isOpen } = useConversation();
  const [isGroupModalOpen, setIsGroupModalOpen] = useState(false);

  const pusherKey = useMemo(() => {
    return session.data?.user?.email
  }, [session.data?.user?.email])

  useEffect(() => {
    if(!pusherKey){
      return
    }
    pusherClient.subscribe(pusherKey)

    const newHandler = (conversation: FullConversationType) => {
      setItems((current) => {
        if(find(current, { id: conversation.id})){
          return current
        }
        return [conversation, ...current]
      })
    }

    const updateHandler = (conversation: FullConversationType) => {
      setItems((current) => current.map((currentConversation) => {
        if(currentConversation.id === conversation.id){
          return {
            ...currentConversation,
            messages: conversation.messages
          }
        }
        return currentConversation
      }))
    } 
    const removeHandler = (conversation: FullConversationType) => {
      setItems((current) => {
        return [...current.filter((convo) => convo.id !== conversation.id)]
      })

      if(conversationId === conversation.id) {
        router.push("/conversations")
      }
    }

    pusherClient.bind("conversation:new", newHandler);
    pusherClient.bind("conversation:update", updateHandler)
    pusherClient.bind("conversation:remove" , removeHandler);
    return () => {
      pusherClient.unsubscribe(pusherKey);
      pusherClient.unbind("conversation:new", newHandler)
      pusherClient.unbind("conversation:update", updateHandler)
      pusherClient.unbind("conversation:remove", removeHandler)

    }
  }, [pusherKey, conversationId, router])

  return (
    <>
      <GroupChatModal users={users} isGroupModalOpen={isGroupModalOpen} onClose={() => setIsGroupModalOpen(false)}/>
      <aside
        className={classNames({
          "fixed inset-y-0 pb-20 lg:pb-0 lg:block overflow-y-auto lg:left-20 lg:w-80 border-r border-gray-200": true,
          "hidden" : isOpen,
          "block w-full left-0": !isOpen
        })}
      >
        <div className='px-5'>
          <div className='flex justify-between mb-4  items-center border-b-1 py-2'>
            <div className='flex gap-2 items-center'>
              <Image
                alt=''
                src='/icon.png'
                width={80}
                height={80}
              />
              <div className='text-2xl font-extralight text-neutral-800'>
                Messages
              </div>
            </div>
            <div onClick={() => setIsGroupModalOpen(true)} className='flex items-center justify-center p-2 cursor-pointer hover:opacity-75 text-gray-600 rounded-lg'>
              <MdOutlineGroupAdd size={20}/>
            </div>
          </div>
          {items.map((item, index) => (
            <ConversationBox key={item.id} data={item} selected={conversationId === item.id} currentUser={currentUser}/>
          ))}
        </div>
      </aside>
    </>
  )
}

export default ConversationList