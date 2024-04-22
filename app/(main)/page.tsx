"use client"
import React, { useEffect, useState } from 'react'
import FormContainer from '../components/forms/FormContainer'
import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Spinner } from '@nextui-org/react'


type Props = {}

const LandingPage = (props: Props) => {

  const session = useSession()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if(session?.status === "authenticated") {
      router.push("/users")
      setIsLoading(false)
    }
    else if(session.status === "loading") {
      setIsLoading(true)
    }
    else if(session.status === "unauthenticated") {
      setIsLoading(false)
    }
  } ,[session?.status, router])
  

  return (
    <div className='w-full h-full items-center justify-center flex'>
      <FormContainer />
      {isLoading &&
        <div className='fixed w-full h-full bg-slate-50 flex items-center justify-center'>
          <Spinner />
        </div>
      }
    </div>
  )
}

export default LandingPage