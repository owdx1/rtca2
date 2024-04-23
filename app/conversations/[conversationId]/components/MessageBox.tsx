"use client"
import Avatar from '@/app/components/Avatar'
import { FullMessageType } from '@/app/types'
import classNames from 'classnames'
import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import { format } from "date-fns"
import { Image } from '@nextui-org/react'
import axios from 'axios'
import { RiCheckDoubleFill } from "react-icons/ri";
import { IoCheckmarkOutline } from "react-icons/io5";
import ImageModal from './ImageModal'



interface MessageBoxPropsI {
  isLast?: boolean,
  data: FullMessageType,
  isGroup?: boolean | null

}

const MessageBox: React.FC<MessageBoxPropsI> = ({isLast, data, isGroup}) => {

  const session = useSession()
  const isOwn = session.data?.user?.email === data.sender.email
  const seenList = (data.seen || [])
  .filter((user) => user.email !== data.sender.email)
  .map((user) => user.name)
  .join(", ")

  const container = classNames({
    "flex gap-3 p-4": true,
    "justify-end": isOwn,

  })

  const avatar = classNames({
    "order-2": isOwn
  })

  const body = classNames({
    "flex flex-col gap-2": true,
    "items-end": isOwn
  })

  const message = classNames({
    "text-sm w-fit overflow-hidden": true,
    "bg-neutral-500 text-white": isOwn,
    "bg-gray-100": !isOwn,
    "rounded-md p-0": data.image,
    "rounded-md py-2 px-3": !data.image
  })

  const [imageModalOpen, setImageModalOpen] = useState(false)

  
  return (
    <div className={container}>
      <div className={avatar}>
        <Avatar user={data.sender} />
      </div>
      <div className={body}>
        <div className='flex items-center gap-1'>
          <div className="text-sm text-gray-500">
            {data.sender.name}
          </div>
          <div className='text-xs text-gray-400'>
            {format(new Date(data.createdAt), 'p')}
          </div>
        </div>
        <div className={message}>
          <ImageModal 
            src={data.image as string}
            isModalOpen={imageModalOpen}
            onClose={() => setImageModalOpen(false)}
          />

          {data.image ? 
          (
            <Image 
              alt='img'
              width={200}
              height={200}
              src={data.image}
              className="object-cover cursor-pointer hover:scale-110 transition"
              onClick={() => setImageModalOpen(true)}
            />
          )
          : 
          (
            <div>{data.body}</div>
          )}
        </div>
        {
          !isGroup && isOwn && isLast && seenList.length > 0 && (
            <RiCheckDoubleFill  className="text-fuchsia-700"/>
          )
        }
        {
          !isGroup && isOwn && isLast && seenList.length == 0 && (
            <IoCheckmarkOutline  className="text-fuchsia-700"/>
          )
        }
        {
          isGroup && isOwn && isLast && seenList.length > 0 && (
            <div>
              {`seen by: ${seenList}`}
            </div>
          )
        }
      </div>
    </div>
  )
}

export default MessageBox