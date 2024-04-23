"use client"
import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/react'
import { User } from '@prisma/client'
import { Form, Formik } from 'formik'
import { CldUploadButton } from 'next-cloudinary'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { Image } from '@nextui-org/react'
import { format } from 'date-fns'
import { IoAdd } from "react-icons/io5";
import axios from 'axios'
import { toast } from 'sonner'


interface SettingsModalPropsI {
  isOpen: boolean
  onClose: () => void
  currentUser: User
}

const SettingsModal: React.FC<SettingsModalPropsI> = ({isOpen, currentUser, onClose}) => {

  const router = useRouter();
  const email = currentUser?.email
  const [isLoading, setIsLoading] = useState(false)
  const [imgUrl, setImgUrl] = useState(currentUser?.image as string)

  const handleUpload = (result: any) => {
    setImgUrl(result?.info?.secure_url)
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader>
          <div className='flex flex-col gap-2'>
            <p className="text-2xl font-light text-gray-600">Settings</p>
            <p className='text-sm font-light text-gray-500'> Edit your public information </p>
          </div>
        </ModalHeader>
        <ModalBody className="flex flex-col">
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
              name: `${currentUser?.name}`,
              image: ''
            }}
            onSubmit={(values) => {
              setIsLoading(true);
              values.image = imgUrl
              axios.post("/api/settings", values)
              .then(() => {
                router.refresh()
                onClose()
              })
              .catch(() => {
                toast.error("Something went wrong..")
              })
              .finally(() => {
                setIsLoading(false)
              })
            }}
          >
            {({handleChange, handleSubmit, values}) => (
              <Form onSubmit={handleSubmit} className='p-4 gap-3 flex flex-col'>
                <Input 
                  value={values.name}
                  name="name"
                  onChange={handleChange}
                  label="Username"
                  variant="underlined"
                />
                <Input
                  isReadOnly
                  name='email'
                  label="Email"
                  variant="underlined"
                  defaultValue={email || ""}
                />
                <Button type="submit" className="p-2 bg-neutral-600 text-white rounded-md" variant="light" isLoading={isLoading}>
                  Save
                </Button>
              </Form>
            )}

          </Formik>
          <hr />
          <div>
            <p>Joined: {format(new Date(currentUser?.createdAt || Date.now()), "PP")}</p>
          </div>
        </ModalBody>
        
      </ModalContent>
    </Modal>
  )
}

export default SettingsModal