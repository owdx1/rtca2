import { Badge, Image } from '@nextui-org/react'
import { User } from '@prisma/client'
import React from 'react'
import { Avatar as NAvatar } from '@nextui-org/react'

interface AvatarPropsI {
  user?: User,
  includeName?: boolean
}

const Avatar: React.FC<AvatarPropsI> = ({user, includeName}) => {
  return (
    <div>
      <Badge color={user?.status === "online" ? "success" : "danger"} content="" className='flex flex-col items-center justify-center'>
        <NAvatar 
          radius='md'
          src={user?.image as string || "/placeholder.jpg"}
        />
      </Badge>
      {includeName && <p>{user?.name}</p> }
    </div>
  )
}

export default Avatar