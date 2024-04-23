"use client"
import React, { useEffect, useState } from 'react'
import FormContainer from '../components/forms/FormContainer'
import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Image, Spinner } from '@nextui-org/react'
import LoadingModal from '../components/LoadingModal'


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
    <div className='w-full h-full items-center justify-center flex max-sm:flex-col'>
      <Image 
        alt=''
        src='/zeychat.png'
        className='lg:flex-1'
      />
      <FormContainer />
      {/*isLoading &&
        <LoadingModal />
      */}
    </div>
  )
}

export default LandingPage