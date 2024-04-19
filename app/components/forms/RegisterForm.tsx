"use client"
import { RegisterSchema } from '@/app/schemas/validation/RegisterSchema';
import { Button, Chip, Input } from '@nextui-org/react'
import { Form, Formik } from 'formik'
import React from 'react'
import { IoLogInOutline } from "react-icons/io5";
import { SiSimplelogin } from "react-icons/si";
import Socials from './Socials';
import axios from 'axios';
import { toast } from 'sonner';
import { signIn } from 'next-auth/react';


type Props = {}

/* is clearable doesnt work with formik */

const RegisterForm = (props: Props) => {
  return (
    <Formik
      initialValues={
        {
          username:'',
          email:'',
          password:'',
          confirmPassword:'',
        }
      }
      onSubmit={async (values, actions) => {
        const response = await axios.post("/api/register", values)
        actions.setSubmitting(false);
        console.log(response)
        const { data } = response;
        const { email } = data
        if (response.status === 200) {
          toast.success(`Successfully registered user: ${email}`)
          signIn("credentials", values)
        }
      }}
      validationSchema={RegisterSchema}
    >
      {({handleBlur, handleChange, handleReset, handleSubmit, values, errors, touched, isSubmitting}) => (
        <Form className='w-full h-full flex flex-col gap-4 items-center'>
          <Chip className="font-extralight text-3xl gap-4" variant="light" startContent={<SiSimplelogin className="mt-2" />}>Register</Chip>
          <Input 
            name='username'
            value={values.username}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder='...'
            label="username"
            type="text"
            variant="underlined"
            isClearable
            startContent={<IoLogInOutline />}
            autoComplete=""
          />
          {errors.username && touched.username && <p className='text-red-400 text-sm'>{errors.username}</p>}
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
          <Input 
            name='confirmPassword'
            value={values.confirmPassword}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder='****'
            label="confirmPassword"
            type="password"
            variant="underlined"
            isClearable
            autoComplete=""
          />
          {errors.confirmPassword && touched.confirmPassword && <p className='text-red-400 text-sm'>{errors.confirmPassword}</p>}
          <Button
            className="p-4 mt-4 rounded-sm shadow"
            variant="light"
            type="submit"
            isLoading={isSubmitting}
          >
            Register
          </Button>
          <Socials type='register' />
        </Form>
      )}
    </Formik>
  )
}

export default RegisterForm