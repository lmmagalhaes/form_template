import React from 'react'

interface ModalProps {
  isOpen: boolean
  name: string
  email: string
  cpf: string
}

const Modal: React.FC<ModalProps> = ({ name, email, cpf }) => {
  return (
    <div className="h-screen flex justify-center items-center bg-slate-600 px-5">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Parabéns</h3>
        <p className="py-4">Sua inscrição foi realizada com sucesso!</p>
        <p>Dados da inscrição</p>
        <p className="py-2">Nome: {name}</p>
        <p>E-mail: {email}</p>
        <p>CPF: {cpf}</p>
      </div>
    </div>
  )
}

export default Modal
