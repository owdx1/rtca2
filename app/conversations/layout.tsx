import React from "react";
import { Sidebar } from "../components/sidebar/Sidebar";
import ConversationList from "./components/ConversationList";
import getConversations from "../action/getConversations";
import getUsers from "../action/getUsers";
import getCurrentUser from "../action/getCurrentUser";

export default async function ConversationLayout({children}: {children: React.ReactNode}) {

  const conversations = await getConversations();
  const users = await getUsers();
  const currentUser = await getCurrentUser();
  return(
    <Sidebar>
      <div className="h-full">
        <ConversationList 
          initialItems={conversations}
          users={users}
          currentUser={currentUser!}
        />
        {children}
      </div>
    </Sidebar>
  )
}