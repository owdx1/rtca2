"use client"
import React from 'react'
import Link from 'next/link'
import classNames from 'classnames'

interface DesktopItemProps {
  label: string,
  icon: any
  href: string
  onClick?: () => void
  active?: boolean
}

const DesktopItem: React.FC<DesktopItemProps> = ({label, icon: Icon, href, onClick, active}) => {

  const handleClick = () => { 
    if(onClick) return onClick()
  }


  return (
    <li onClick={handleClick}>
      <Link
        href={href}
        className={classNames({
          "group flex gap-x-3 rounded-md text-sm p-3 leading-6 font-extralight text-gray-500 hover:bg-gray-100 hover:text-black": true,
          "bg-gray-100 text-black": active
        })} 
      >
        <Icon className="h-6 w-6 shrink-0"/>
        <span className="sr-only">
          {label}
        </span>
      </Link>
    </li>
  )
}

export default DesktopItem