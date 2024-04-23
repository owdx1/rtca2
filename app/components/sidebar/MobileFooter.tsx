"use client"

import useConversation from "@/app/hooks/useConversation"
import useRoutes from "@/app/hooks/useRoutes"
import MobileItem from "./MobileItem"
import { User } from "@prisma/client"
import React from "react"
import Avatar from "../Avatar"

interface MobileFooterPropsI {
  currentUser: User
}

const MobileFooter: React.FC<MobileFooterPropsI> = ({ currentUser }) => {

  const routes = useRoutes()
  const { isOpen } = useConversation();

  if(isOpen) return null

  return(
    <div
      className="fixed justify-between w-full bottom-0 z-40 flex items-center bg-white border-t-[1px] lg:hidden"
    >
      <MobileItem 
        label="user"
        currentUser={currentUser}
      />
      {routes.map((route, index) => (
        <MobileItem 
          key={index} 
          label={route.label} 
          href={route.href} 
          icon={route.icon} 
          onClick={route.onClick}
          active={route.active}
        />
      ))}
      
      
    </div>
  )
}

export default MobileFooter