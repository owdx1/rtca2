import { Modal, ModalBody, ModalContent, Image, ModalFooter, Button } from '@nextui-org/react'
import React from 'react'

interface ImageModalPropsI {
  src: string
  isModalOpen?: boolean
  onClose: () => void
}

const ImageModal: React.FC<ImageModalPropsI> = ({ src, isModalOpen, onClose}) => {
  return (
    <Modal isOpen={isModalOpen} onClose={onClose} size="full">
      <ModalContent>
        <ModalBody className="flex items-center justify-center bg-gray-600 border-b-2">
          <Image
            alt=''
            src={src}
            className="w-full h-full"
          />
        </ModalBody>
        <ModalFooter className='bg-gray-600'>
          <Button onClick={onClose} variant="light" className='p-4 bg-gray-800 text-white font-extralight'>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default ImageModal