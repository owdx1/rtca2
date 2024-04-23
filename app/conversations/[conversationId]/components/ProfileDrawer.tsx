"use client"
import { Conversation, User } from '@prisma/client'
import { useSession } from 'next-auth/react'
import React, { useCallback, useMemo, useState } from 'react'
import { format } from "date-fns"
import { AvatarGroup, Button, Chip, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Popover, PopoverContent, PopoverTrigger } from '@nextui-org/react'
import Avatar from '@/app/components/Avatar'
import { BsBalloonHeart } from "react-icons/bs";
import { MdOutlineMarkEmailUnread } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { useRouter } from 'next/navigation'
import useConversation from '@/app/hooks/useConversation'
import axios from 'axios'
import { toast } from 'sonner'


interface ProfileDrawerPropsI {
  data: Conversation & {
    users: User[]
  }
  isOpen: boolean
  onClose:  () => void
}

const ProfileDrawer: React.FC<ProfileDrawerPropsI> = ({isOpen, onClose, data}) => {

  const session = useSession()
  const otherUser = useMemo(() => {
    const currentUserEmail = session.data?.user?.email
    const otherUser = data.users.filter((user) => user.email !== currentUserEmail)
    return otherUser[0]
  }, [session.data?.user?.email, data])

  const joinedDate = useMemo(() => {
    return format(new Date(otherUser?.createdAt) , "PP")
  }, [otherUser?.createdAt])

  const title = useMemo(() => {
    return data.name || otherUser.name
  }, [data.name, otherUser.name])

  const statusText = useMemo(() => {
    if(data.isGroup) {
      return (
        <AvatarGroup isBordered>
          {data.users.map((user, index) => (
            <Avatar user={user} key={index}/>
          ))}
        </AvatarGroup>
      )
    }

    return `active`


  }, [data])

  /* delete operations */
 
  const router = useRouter()
  const { conversationId } = useConversation();
  const [isLoading, setIsLoading] = useState(false)

  const onDelete = useCallback(() => {
    setIsLoading(true)
    axios.delete(`/api/conversations/${conversationId}`)
    .then(() => {
      router.push("/conversations")
      router.refresh()
    })
    .catch(() => {
      toast.error("Something went wrong...")
    })
    .finally(() => {
      setIsLoading(false)
      onClose()
    })
  }, [conversationId, router, onClose])


  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader className='flex flex-col items-center'>
          <div className='flex flex-col gap-2 w-full items-center'>
            <div className='flex flex-col gap-2 items-center w-full'> 
              <Avatar user={otherUser}/>
              <p>{title}</p>
            </div>
            <p className="font-sm text-gray-400 font-light">{statusText}</p>
          </div>
        </ModalHeader>
        <ModalBody>
          <Chip variant='light' startContent={<BsBalloonHeart size={20} className='m-2' />} className="border-none shadow-sm flex gap-2">{`date of join: ${joinedDate}`}</Chip>
          <Chip variant='light' startContent={<MdOutlineMarkEmailUnread size={20} className='m-2' />} className='border-none shadow-sm flex gap-2'>{`email: ${otherUser.email}`}</Chip>
          <hr />
          <Popover
            backdrop="blur"
            
          >
            <PopoverTrigger>
              <Button startContent={<MdDelete size={24} className='m-2 text-red-600'/>} variant="light" className="rounded-md">
                Delete
              </Button>  
            </PopoverTrigger>
            <PopoverContent className='flex flex-col justify-center items-center p-12 gap-4'>
              do you really want to delete this user?
              <div className='flex gap-4'>
                <Button className="bg-white" variant="faded" onClick={onClose}>
                  cancel
                </Button>
                <Button className="bg-white" variant="faded" color="danger" onClick={onDelete}>
                  yes
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        </ModalBody>
        <ModalFooter>
          <Button onPress={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

console.log()

export default ProfileDrawer