"use client"
import { Button, Chip, Image, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Select, SelectItem } from '@nextui-org/react'
import { User } from '@prisma/client'
import axios from 'axios'
import { Form, Formik } from 'formik'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { toast } from 'sonner'
import { HiUserGroup } from "react-icons/hi2";
import { CldUploadButton } from 'next-cloudinary'
import { IoAdd } from 'react-icons/io5'
import { RiGroup2Fill, RiGroupFill } from "react-icons/ri";
import getCurrentUser from '@/app/action/getCurrentUser'



interface GroupChatModalPropsI {
  isGroupModalOpen? : boolean
  onClose : () => void
  users: User[]
}

const GroupChatModal:React.FC<GroupChatModalPropsI> = ({ isGroupModalOpen, onClose, users }) => {

  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false);  
  const [imgUrl, setImgUrl] = useState("");
  const handleUpload = (result: any) => {
    setImgUrl(result?.info?.secure_url)
  }
  return (
    <Modal isOpen={isGroupModalOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader>
          <Chip endContent={<HiUserGroup className='mx-2' size={32}/>} className='text-2xl font-extralight' variant='light'>Create a Group</Chip>
        </ModalHeader>
        <ModalBody>
          <>
            <CldUploadButton 
              className='flex mx-auto' 
              onSuccess={handleUpload}
              options={{ maxFiles: 1 }}
              uploadPreset='vo1x7wxc'
            >
              <div className='relative'>
                <Image 
                  alt=''
                  src={imgUrl as string || "/placeholder.jpg"}
                  width={100}
                  height={100}
                  className="object-cover"
                />
                <div className="absolute top-0 -right-3 z-20"> <IoAdd size={24} className='bg-gray-700 text-white rounded-full' /></div>
              </div>
            </CldUploadButton>
            <Formik
              initialValues={{
                name: '',
                members: ''
              }}
              onSubmit={async(values) => {
                setIsLoading(true);
                console.log(values)
                const sentArray = values.members.split(",")
                const name = values.name
                axios.post("/api/conversations", {name, isGroup: true, members: sentArray})
                .then(() => {
                  router.refresh()
                  onClose()
                })
                .catch(() => {
                  toast.error("Something went wrong...")
                })
                .finally(() => {
                  setIsLoading(false);
                })
              }}
            >
              {({values, handleSubmit, handleChange}) => (
                <Form onSubmit={handleSubmit} className='flex flex-col gap-2'>
                  <Input
                    name='name'
                    value={values.name}
                    placeholder='enter the group name...'
                    onChange={handleChange}
                    variant="underlined"
                    label="Group Name"
                    endContent={<RiGroupFill />}
                  />
                  <Select
                    label="members"
                    variant="underlined"
                    name='members'
                    value={values.members}
                    onChange={handleChange}
                    isMultiline
                    selectionMode="multiple"
                  >
                    {users.map((user) => (
                      <SelectItem key={user.id}>
                        {user.name}
                      </SelectItem>
                    ))}
                  </Select>
                  <Button type="submit" className="p-4 bg-gray-800 text-white rounded-md" variant="light">
                    Create Group
                  </Button>
                </Form>
              )}

            </Formik>
          </>
        </ModalBody>
        <ModalFooter>
          foot
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default GroupChatModal