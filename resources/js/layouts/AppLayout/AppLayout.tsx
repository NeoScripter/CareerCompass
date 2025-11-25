import { cn } from '@/lib/utils/cn';
import Login from '@/pages/shared/login';
import Signup from '@/pages/shared/signup';
import { useLoginModal } from '@/providers/login-context';
import { useSignupModal } from '@/providers/signup-context';
import { NodeProps } from '@/types/nodeProps';
import { FC } from 'preact/compat';
import { Toaster } from 'sonner';
import DialogLayout from '../DialogLayout/DialogLayout';
import AppFooter from '../partials/AppFooter/AppFooter';
import AppHeader from '../partials/AppHeader/AppHeader';

const AppLayout: FC<NodeProps> = ({ children, className }) => {
    const { show } = useLoginModal();
    const { show: showSignupModal } = useSignupModal();

    return (
        <div className={cn('AppLayout', className)}>
            {/* <AppHeader /> */}
            <main className="content">{children}</main>
            <Toaster
                position="top-center"
                expand
                richColors
                toastOptions={{
                    className: 'toaster',
                }}
            />
            {/* <DialogLayout */}
            {/*     show={show.value} */}
            {/*     onClose={() => (show.value = false)} */}
            {/*     className="dialog" */}
            {/* > */}
            {/*     <Login /> */}
            {/* </DialogLayout> */}
            {/* <DialogLayout */}
            {/*     show={showSignupModal.value} */}
            {/*     onClose={() => (showSignupModal.value = false)} */}
            {/*     className="dialog" */}
            {/* > */}
            {/*     <Signup /> */}
            {/* </DialogLayout> */}
            <AppFooter />
        </div>
    );
};

export default AppLayout;
