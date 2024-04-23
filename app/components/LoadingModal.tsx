"use client"

import { Image, Modal, ModalBody, ModalContent, Spinner } from "@nextui-org/react"

const LoadingModal = () => {
  return(
    <Modal isOpen={true} size="full" placement="center" backdrop="transparent" className="shadow-none bg-opacity-15">
      <ModalContent className="p-10">
        <ModalBody className="flex gap-4 items-center justify-center"> 
          <Image 
            alt=""
            src="/zeychat-nobg.png"
            width={250}
            height={250}
          />
          <Spinner color="default" className="flex" label="loading..."/>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default LoadingModal