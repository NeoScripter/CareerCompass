import { cn } from '@/lib/utils/cn';
import { useLoginModal } from '@/providers/login-context';
import { useSignupModal } from '@/providers/signup-context';
import { NodeProps } from '@/types/nodeProps';
import { FC } from 'preact/compat';
import { Toaster } from 'sonner';
import DialogLayout from '../DialogLayout/DialogLayout';
import AppFooter from '../partials/AppFooter/AppFooter';
import AppHeader from '../partials/AppHeader/AppHeader';
import Signup from '@/pages/shared/Signup/Signup';
import Login from '@/pages/shared/Login/Login';

const AppLayout: FC<NodeProps> = ({ children, className }) => {
    const { show } = useLoginModal();
    const { show: showSignupModal } = useSignupModal();

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
