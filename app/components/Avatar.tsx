import { Badge, Image } from '@nextui-org/react'
import { User } from '@prisma/client'
import React from 'react'
import { Avatar as NAvatar } from '@nextui-org/react'

interface AvatarPropsI {
  user?: User
}

const Avatar: React.FC<AvatarPropsI> = ({user}) => {
  return (
    <Badge color="success" content="">
      <NAvatar 
        radius='md'
        src={user?.image as string || "placeholder.jpg"}
      />
    </Badge>
  )
}

export default Avatar