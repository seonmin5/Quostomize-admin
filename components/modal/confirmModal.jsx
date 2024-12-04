import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'


function ConfirmModal({title, description, isOpen, setIsOpen, onClose}) {

  return (
    <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
    <div className="fixed inset-0 flex w-screen items-center justify-center p-4 bg-black/30">
      <DialogPanel className="w-72 h-44 space-y-4 border bg-white p-6 rounded-xl">
        <DialogTitle className="font-bold">{title}</DialogTitle>
        <p className="pt-2">{description}</p>
        <div className="pt-4 flex gap-4 justify-end">
          <button onClick={() => onClose()} className="w-16 h-9 rounded-md bg-content-highlight font-semibold text-white">보내기</button>
          <button onClick={() => setIsOpen(false)} className="font-light text-content-accent3">취소</button>
        </div>
      </DialogPanel>
    </div>
  </Dialog>
  )
}

export default ConfirmModal;