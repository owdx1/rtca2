"use client"
import useConversation from '@/app/hooks/useConversation'
import { FullMessageType } from '@/app/types'
import { Message } from '@prisma/client'
import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import MessageBox from './MessageBox'
import axios from 'axios'
import { url } from 'inspector'

interface BodyPropsI {
  initialMessages: FullMessageType[]
  isGroup?: boolean | null
}


const Body: React.FC<BodyPropsI> = ({initialMessages , isGroup}) => {

  const [messages, setMessages] = useState(initialMessages)
 

  const bottomRef = useRef<HTMLDivElement>(null)

  const { conversationId } =  useConversation();

  useEffect(() => {
    axios.post(`/api/conversations/${conversationId}/seen`)
  }, [conversationId])

  // style={{background:"url('/chatbg.jpg')", backgroundSize:"cover", backgroundColor: 'rgba(0, 0, 0, 0.7)'}}

  return (
    <div className='flex-1 overflow-y-auto bg-gradient-to-bl from-gray-100 to-gray-200'>
      {messages.map((message, index) => (
        <MessageBox
          isLast={index === messages.length - 1}  
          key={message.id}
          data={message}
          isGroup={isGroup}

        />
      ))}
      <div ref={bottomRef} className='pt-24' />
    </div>
  )
}

export default Body