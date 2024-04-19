import React from 'react'
import { Button } from '@nextui-org/react'
import { FaGoogle } from 'react-icons/fa'
import { FaGithub } from 'react-icons/fa'
import { signIn } from 'next-auth/react'
import { toast } from 'sonner'

type loginProps = {
  type: "login" | "register"
}


const Socials = (props: loginProps) => {

  const type = props.type

  const handleAuthentication = async (provider: string) => {
    if (type === "login") {
      const response = await signIn(provider, { redirect: false })
      if(!response?.ok) {
        toast(`Something went wrong: ${response?.error}`)
      } 
      else {
        toast.success(`Logged in with ${provider} successfully!`)
      }
    }
  }

  return (
    <div className='flex flex-col items-center justify-center gap-2 w-full'>
      <span className='text-sm'>or continue with</span>
      <Button variant="bordered" className="rounded-sm shadow w-full" onClick={() => handleAuthentication("google")}>
        <FaGoogle />
      </Button>
      <Button variant="bordered" className="rounded-sm shadow w-full" onClick={() => handleAuthentication("github")}>
        <FaGithub />
      </Button>
    </div>
  )
}

export default Socials