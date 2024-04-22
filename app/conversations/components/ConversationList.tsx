"use client"
import useConversation from '@/app/hooks/useConversation'
import { FullConversationType } from '@/app/types'
import classNames from 'classnames'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { MdOutlineGroupAdd } from 'react-icons/md'
import ConversationBox from './ConversationBox'

interface ConversationListPropsI {
  initialItems: FullConversationType[]
}

const ConversationList: React.FC<ConversationListPropsI> = ({ initialItems }) => {

  const router = useRouter()
  const [items, setItems] = useState(initialItems)

  const { conversationId, isOpen } = useConversation()

  return (
    <aside
      className={classNames({
        "fixed inset-y-0 pb-20 lg:pb-0 lg:block overflow-y-auto lg:left-20 lg:w-80 border-r border-gray-200": true,
         "hidden" : isOpen,
         "block w-full left-0": !isOpen
      })}
    >
      <div className='px-5'>
        <div className='flex justify-between mb-4 pt-4'>
          <div className='text-2xl font-extralight text-neutral-800'>
            Messages
          </div>
          <div className='flex items-center justify-center p-2 cursor-pointer hover:opacity-75 text-gray-600 rounded-lg'>
            <MdOutlineGroupAdd size={20}/>
          </div>
        </div>
        {items.map((item, index) => (
          <ConversationBox key={item.id} data={item} selected={conversationId === item.id}/>
        ))}
      </div>
    </aside>
  )
}

export default ConversationList