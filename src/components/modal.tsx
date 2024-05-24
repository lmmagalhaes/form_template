import React from 'react'

interface ModalProps {
  isOpen: boolean
}

const Modal: React.FC<ModalProps> = ({ isOpen }) => {
  if (!isOpen) {
    return null
  }

  return <div>Modal Content</div>
}

export default Modal
