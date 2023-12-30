import { create } from 'zustand'

interface useSignInModalProps {
    isOpen:boolean,
    onOpen:() => void,
    onClose:() => void
}

const useSignInModal = create<useSignInModalProps>((set) => ({
  isOpen: false,
  onOpen: () => set((state) => ({...state,isOpen:true})),
  onClose: () => set((state) => ({...state,isOpen:false})),
}))

export default useSignInModal;