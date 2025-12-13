import TestModal from '@/components/ui/TestModal/TestModal';
import { cn } from '@/lib/utils/cn';
import Login from '@/pages/shared/Login/Login';
import Signup from '@/pages/shared/Signup/Signup';
import { useLoginModal } from '@/providers/login-context';
import { useSignupModal } from '@/providers/signup-context';
import { useTestModalModal } from '@/providers/test-modal-context';
import { Plan } from '@/types/model';
import { NodeProps } from '@/types/nodeProps';
import { usePage } from '@inertiajs/react';
import { FC } from 'preact/compat';
import { toast, Toaster } from 'sonner';
import DialogLayout from '../DialogLayout/DialogLayout';
import AppFooter from '../partials/AppFooter/AppFooter';
import AppHeader from '../partials/AppHeader/AppHeader';

const AppLayout: FC<NodeProps> = ({ children, className }) => {
    const { show: showTestModal } = useTestModalModal();
    const { show } = useLoginModal();
    const { show: showSignupModal } = useSignupModal();
    const { plans, flash } = usePage<{
        plans: Plan[] | undefined;
        flash: { error: string | null };
    }>().props;

    if (flash?.error != null) {
        toast(flash?.error);
    }

    return (
        <div className={cn('app-layout', className)}>
            <AppHeader />
            <main className="app-layout__content">{children}</main>
            <Toaster
                position="top-center"
                expand
                richColors
                toastOptions={{
                    className: 'app-layout__toaster',
                }}
            />
            {plans != null && (
                <DialogLayout
                    show={showTestModal.value}
                    onClose={() => (showTestModal.value = false)}
                    className="app-layout__modal-dialog"
                >
                    <TestModal />
                </DialogLayout>
            )}
            <DialogLayout
                show={show.value}
                onClose={() => (show.value = false)}
                className="app-layout__dialog"
            >
                <Login />
            </DialogLayout>
            <DialogLayout
                show={showSignupModal.value}
                onClose={() => (showSignupModal.value = false)}
                className="app-layout__dialog"
            >
                <Signup />
            </DialogLayout>
            <AppFooter />
        </div>
    );
};

export default AppLayout;
