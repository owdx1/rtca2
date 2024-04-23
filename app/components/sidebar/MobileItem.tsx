import { User } from "@prisma/client"
import classNames from "classnames"
import Link from "next/link"
import Avatar from "../Avatar"
import { useState } from "react"
import SettingsModal from "./SettingsModal"

interface MobileItemProps {
  label: string,
  icon?: any
  href?: string
  onClick?: () => void
  active?: boolean
  currentUser?: User
}

const MobileItem: React.FC<MobileItemProps> = ({label, icon: Icon, href, onClick, active, currentUser}) => {

  const handleClick = () => {
    if(onClick) return onClick()
  }

  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);

  if (!currentUser) {
    return (
      <Link 
        href={href as string} 
        onClick={handleClick}
        className={classNames({
          "group flex gap-x-3 text-sm leading-6 font-extralight w-full justify-center p-4 text-gray-500 hover:text-black hover:bg-gray-100": true,
          "bg-gray-100 text-black": active
        })}
      >
        <Icon className="h-6 w-6"/>
      </Link>
    )
  }

  return (
    <>
      <SettingsModal isOpen={isSettingsModalOpen} currentUser={currentUser} onClose={() => setIsSettingsModalOpen(false)} />
      <div onClick={() => setIsSettingsModalOpen(true)} className={classNames({
          "group flex gap-x-3 text-sm leading-6 font-extralight w-full justify-center p-4 text-gray-500 hover:text-black hover:bg-gray-100": true,
          "bg-gray-100 text-black": active
        })}>
        <Avatar user={currentUser} />
      </div>
    </>

  )
}

export default MobileItem