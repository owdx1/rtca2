import getConversationById from '@/app/action/getConversationById'
import getMessages from '@/app/action/getMessages';
import React from 'react'
import Header from './components/Header';
import Body from './components/Body';
import MessageForm from './components/MessageForm';

interface ChatParamsI {
  conversationId: string
}

const Chat = async ({ params } : { params: ChatParamsI }) => {

  const conversation = await getConversationById(params.conversationId);
  
  const messages = await getMessages(params.conversationId);

  if(!conversation) {
    return (
      <div className="lg:pl-80 h-full">
        <div className="h-full flex flex-col">
          <p> something went wrong... </p>
        </div>
      </div>
    )
  }


  return (
    <div className="lg:pl-80 h-full">
      <div className='h-full flex flex-col'>
        <Header conversation={conversation}/>
        <Body initialMessages={messages} isGroup={conversation.isGroup}/>
        <MessageForm />
      </div>
    </div>
  )
}

export default Chat