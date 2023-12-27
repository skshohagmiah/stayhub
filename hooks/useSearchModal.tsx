import { create } from 'zustand'

interface useSearchModalProps {
    isOpen:boolean,
    onOpen:() => void,
    onClose:() => void
}

const useSearchModal = create<useSearchModalProps>((set) => ({
  isOpen: false,
  onOpen: () => set((state) => ({...state,isOpen:true})),
  onClose: () => set((state) => ({...state,isOpen:false})),
}))

export default useSearchModal;