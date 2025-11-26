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
            className={cn('dialog-layout', className)}
        >
            <DialogBackdrop transition className="dialog-layout__backdrop" />
            <DialogPanel transition className="dialog-layout__panel">
                {showBtn && (
                    <button onClick={onClose} className="dialog-layout__close">
                        <X className="dialog-layout__close-icon" />
                    </button>
                )}
                {children}
            </DialogPanel>
        </Dialog>
    );
}
