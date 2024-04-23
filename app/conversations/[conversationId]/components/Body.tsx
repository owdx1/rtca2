"use client"
import useConversation from '@/app/hooks/useConversation'
import { FullMessageType } from '@/app/types'
import { Message } from '@prisma/client'
import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import MessageBox from './MessageBox'
import axios from 'axios'
import { url } from 'inspector'
import { pusherClient } from '@/app/lib/pusher'
import { find } from 'lodash'

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


  useEffect(() => {
    pusherClient.subscribe(conversationId);
    bottomRef.current?.scrollIntoView()

    const messageHandler = (message: FullMessageType) => {
      axios.post(`/api/conversations/${conversationId}/seen`)
      
      setMessages((current) => {
        //to not duplicate messages
        if(find(current, {id: message.id})){
          return current
        }
        return [...current, message]
      })

      bottomRef.current?.scrollIntoView()
    }

    const updateMessageHandler = (message: FullMessageType) => {
      setMessages((current) => current.map((currentMessage) => {
        if(currentMessage.id === message.id) {
          return message;
        }
        return currentMessage
      }))
    }

    pusherClient.bind("messages:new", messageHandler)
    pusherClient.bind("message:update", updateMessageHandler)

    return () => {
      pusherClient.unsubscribe(conversationId)
      pusherClient.unbind("messages:new" , messageHandler)
      pusherClient.unbind("message:update", updateMessageHandler)        
    }
  }, [conversationId])
 
  return (
    <div 
      className='flex-1 overflow-y-auto' 
      style={{background:"url('/zeychat-gray.png')", backgroundSize:"fill", backgroundPositionX:-300, backgroundPositionY:-160}}
    >
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