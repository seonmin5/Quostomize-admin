import Image from 'next/image';
import Icons from "../../public/icons/icons"
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'

function AlertModal({title, description, isOpen, setIsOpen, isSuccess}) {

return (
        <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
            <div className="fixed inset-0 flex w-screen items-center justify-center p-4 bg-black/30">
                <DialogPanel className="w-44 h-52 space-y-4 border bg-white p-6 rounded-xl">
                    <DialogTitle className="font-bold">{title}</DialogTitle>
                    <div className="flex items-center justify-center mb-4">
                        <Image
                            src={ isSuccess ? Icons.celebrate : Icons.anxious }
                            alt="Error"
                            width={60}
                            height={60}
                        />
                    </div>
                    <p className="pt-2 whitespace-pre-line text-center">{description}</p>
                </DialogPanel>
            </div>
        </Dialog>
    )
}

export default AlertModal;
