"use client"
import useConversation from '@/app/hooks/useConversation'
import { ChatInputSchema } from '@/app/schemas/chat/ChatInputSchema'
import { Button, Input } from '@nextui-org/react'
import axios from 'axios'
import { Form, Formik } from 'formik'
import React, { useRef } from 'react'
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi'
import { HiPhoto } from 'react-icons/hi2'
import { CldUploadButton } from "next-cloudinary"

type Props = {}

const MessageForm = (props: Props) => {

  const { conversationId } = useConversation()

  const inputRef = useRef<HTMLInputElement | null>(null)

  const handleUpload = (result: any) => {
    axios.post("/api/messages", {
      image: result?.info?.secure_url,
      conversationId
    }
  
  )}

  return (
    <Formik
      initialValues={
        {
          message: ''
        }
      }
      onSubmit={(values, actions) => {
        actions.setSubmitting(true)
        actions.resetForm()
        axios.post("/api/messages", {...values, conversationId})
        if(inputRef.current) {
          inputRef.current.focus()
        }
      }}
      validationSchema={ChatInputSchema}
    >
      {({handleBlur, handleChange, handleSubmit, values, isSubmitting}) => (
        <div className='flex'>
          <CldUploadButton 
            options={{ maxFiles: 1}}
            uploadPreset='vo1x7wxc'
            onSuccess={handleUpload}
          
          >
            <HiPhoto size={32} className='text-neutral-600 hover:text-neutral-300 cursor-pointer m-3'/>
          </CldUploadButton> 
          <Form className='w-full flex items-center' onSubmit={handleSubmit}> 
          <Input 
            name='message'
            value={values.message}
            onChange={handleChange}
            onBlur={handleBlur}
            className='flex-1 p-2 px-4 font-light text-2xl justify-center'
            variant="underlined"
            placeholder='Enter your message here...'
            ref={inputRef}
            required
          />
          <Button className='' variant='light' type="submit" isLoading={isSubmitting}>
            <HiChevronRight size={32} />
          </Button>
        </Form>
        </div>
        
      )}

    </Formik>
  )
}

export default MessageForm