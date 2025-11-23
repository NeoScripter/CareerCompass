import { cn } from '@/lib/utils/cn';
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';
import { X } from 'lucide-preact';

type DialogLayoutProps = {
    children: React.ReactNode;
    show: boolean;
    onClose: () => void;
    className?: string;
    showBtn?: boolean;
};

export default function DialogLayout({
    show,
    children,
    onClose,
    className,
    showBtn = true,
}: DialogLayoutProps) {
    return (
        <Dialog
            open={show}
            onClose={onClose}
            className={cn(
                'fixed inset-0 z-150 isolate flex items-center justify-center overflow-y-auto outline-none',
                className,
            )}
        >
            <DialogBackdrop
                transition
                className="fixed inset-0 backdrop-blur-sm duration-300 ease-in-out data-[closed]:opacity-0"
            />

            <DialogPanel
                transition
                className={cn(
                    'relative z-50 h-max w-9/10 max-w-120 rounded-[2rem] duration-300 ease-in-out data-[closed]:scale-40 bg-white data-[closed]:opacity-0',
                )}
            >
                {showBtn && (
                    <button
                        onClick={onClose}
                        className="absolute top-5 right-5 z-20 flex cursor-pointer items-center justify-center transition-opacity duration-200 ease-in hover:opacity-75"
                    >
                        <X className="size-6" />
                    </button>
                )}
                {children}
            </DialogPanel>
        </Dialog>
    );
}
