'use client'
import { create } from 'zustand'

interface useListModalProps {
    isOpen:boolean,
    onOpen:() => void,
    onClose:() => void
}

const useListModal = create<useListModalProps>((set) => ({
  isOpen: false,
  onOpen: () => set((state) => ({...state,isOpen:true})),
  onClose: () => set((state) => ({...state,isOpen:false})),
}))

export default useListModal;