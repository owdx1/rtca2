"use client"
import Image from 'next/image'
import React from 'react'


const EmptyState = () => {
  return (
    <div className='py-10 px-4 border-l-1 h-full items-center justify-center flex flex-col sm:px-6 lg:px-8'>
      <Image
        alt=''
        src="/zeychat.png"
        width={300}
        height={300}
      />
      <p className='text-2xl font-extralight'>Start a conversation!</p>
    </div>
  )
}

export default EmptyState