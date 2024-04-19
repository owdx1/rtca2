"use client"
import React from 'react'
import useConversation from '../hooks/useConversation'
import EmptyState from '../components/EmptyState'
import classNames from 'classnames'

type Props = {}

const Home = (props: Props) => {

  const { isOpen } = useConversation()


  return (
    <div className={classNames({
      "lg:pl-80 h-full lg:block": true,
      "block": isOpen,
      "hidden": !isOpen
    })}>
      <EmptyState />
    </div>
  )
}

export default Home