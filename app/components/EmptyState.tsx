import React from 'react'
import { FaFish } from "react-icons/fa";


type Props = {}

const EmptyState = (props: Props) => {
  return (
    <div className='py-10 px-4 bg-gray-100 h-full items-center justify-center flex sm:px-6 lg:px-8'>
      <div className='text-center items-center flex flex-col'>
        <div className='flex gap-4 items-center justify-center'>
          not too much in here...
        </div>
        <h3 className='mt-2 text-2xl text-gray-950'>
          Select a chat or start a new conversation!
        </h3>
      </div>
    </div>
  )
}

export default EmptyState