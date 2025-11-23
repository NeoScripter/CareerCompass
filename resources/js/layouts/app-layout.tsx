import { cn } from '@/lib/utils/cn';
import Login from '@/pages/shared/login';
import { NodeProps } from '@/types/nodeProps';
import { FC } from 'preact/compat';
import { Toaster } from 'sonner';
import DialogLayout from './dialog-layout';
import AppFooter from './partials/app-footer';
import AppHeader from './partials/app-header';
import { useLoginModal } from '@/providers/login-context';
import Signup from '@/pages/shared/signup';
import { useSignupModal } from '@/providers/signup-context';

const AppLayout: FC<NodeProps> = ({ children, className }) => {
    const { show } = useLoginModal();
    const { show: showSignupModal } = useSignupModal();
    return (
        <div
            class={cn(
                'text-foreground mx-auto max-w-480 pb-5 lg:pb-9 lg:text-xl xl:text-2xl',
                className,
            )}
        >
            <AppHeader />
            <main class="mb-20 space-y-20 px-5 sm:px-6 lg:mb-33 lg:space-y-33 lg:px-9 xl:mb-37.5 xl:space-y-37.5">
                {children}
            </main>
            <Toaster
                position="top-center"
                expand={true}
                richColors={true}
                toastOptions={{
                    className:
                        'mt-16 w-fit flex justify-center text-center !text-base',
                }}
            />{' '}
            <DialogLayout
                show={show.value}
                onClose={() => (show.value = false)}
                className="mx-auto max-w-260"
            >
                <Login />
            </DialogLayout>
            <DialogLayout
                show={showSignupModal.value}
                onClose={() => (showSignupModal.value = false)}
                className="mx-auto max-w-260"
            >
                <Signup />
            </DialogLayout>
            <AppFooter />
        </div>
    );
};

export default AppLayout;
