"use client"
import React, { useState } from 'react'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'
import { Switch } from '@nextui-org/react'

type Props = {}

const FormContainer = (props: Props) => {

  const [isLoginForm, setIsLoginForm] = useState(true)

  return (
    <div className='flex flex-col gap-4 items-center'>
      <Switch isSelected={isLoginForm} onValueChange={setIsLoginForm} color="default" size="sm">
        {isLoginForm ? 'Login' : 'Register'}
      </Switch>
      <div className="form-container border-2 max-sm:border-none p-12 w-[28rem]">
        {isLoginForm ? <LoginForm /> : <RegisterForm />}
      </div>
    </div>
    
  )
}

export default FormContainer