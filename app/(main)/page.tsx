"use client"
import React, { useEffect } from 'react'
import FormContainer from '../components/forms/FormContainer'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'


type Props = {}

const LandingPage = (props: Props) => {

  const session = useSession()
  const router = useRouter()

  useEffect(() => {
    if(session?.status === "authenticated") {
      router.push("/users")
    }
  } ,[session?.status, router])
  
  return (
    <div className='w-full h-full items-center justify-center flex'>
      <FormContainer />
    </div>
  )
}

export default LandingPage