"use client"
import { LoginSchema } from '@/app/schemas/validation/LoginSchema';
import { Button, Chip, Input } from '@nextui-org/react'
import { Form, Formik } from 'formik'
import React from 'react'
import { IoLogInOutline } from "react-icons/io5";
import { SiSimplelogin } from "react-icons/si";
import Socials from './Socials';
import { toast } from 'sonner';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { StatusType } from '@/app/types';


type Props = {}

/* is clearable doesnt work with formik */

const LoginForm = (props: Props) => {
  const router = useRouter()
  return (
    <Formik
      initialValues={
        {
          email:'',
          password:''
        }
      }
      onSubmit={async (values, actions) => {
        const response = await signIn("credentials", {
          ...values,
          redirect: false
        })
        if (!response?.ok) {
          toast(`Something went wrong: ${response?.error}`)
        } else {
          console.log(response.status)
          toast("Logged in successfully!")
          const status: StatusType = "online"
          const statusUpdate = axios.post("/api/users/statusUpdate", { status })
          .then((response) => {
            console.log("status is updated", response.data)         
          })
          .catch((e) => {
            console.log("status didnt update", e)
          })
          .finally(() => {
            actions.setSubmitting(false)
          })
          router.push("/users");

        }
      }}
      validationSchema={LoginSchema}
    >
      {({handleBlur, handleChange, values, errors, touched, isSubmitting}) => (
        <Form className='w-full h-full flex flex-col gap-4 items-center'>
          <Chip className="font-extralight text-3xl gap-4" variant="light" startContent={<SiSimplelogin className="mt-2" />}>Log in</Chip>
          <Input 
            name='email'
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder='can@gmail.co'
            label="email"
            type="text"
            variant="underlined"
            isClearable
            startContent={<IoLogInOutline />}
            autoComplete=""
          />
          {errors.email && touched.email && <p className='text-red-400 text-sm'>{errors.email}</p>}
          <Input 
            name='password'
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder='****'
            label="password"
            type="password"
            variant="underlined"
            isClearable
            autoComplete=""
          />
          {errors.password && touched.password && <p className='text-red-400 text-sm'>{errors.password}</p>}
          <Button
            className="p-4 mt-4 rounded-sm shadow bg-slate-800 text-white w-64"
            variant="light"
            type="submit"
            isLoading={isSubmitting}
          >
            Log in
          </Button>
          <Socials type='login' />
        </Form>
      )}
    </Formik>
  )
}

export default LoginForm