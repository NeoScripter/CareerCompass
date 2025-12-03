import { createInertiaApp } from '@inertiajs/react';
import { createRoot } from 'preact/compat/client';
// import '../css/app.css';
import '../scss/app.scss';
import { LoginProvider } from './providers/login-context';
import { SignupProvider } from './providers/signup-context';
import { TestModalProvider } from './providers/test-modal-context';
const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => (title ? `${title} - ${appName}` : appName),
    resolve: (name) => {
        const pages = import.meta.glob('./pages/**/*.tsx');
        return pages[`./pages/${name}.tsx`]();
    },
    setup({ el, App, props }) {
        createRoot(el).render(
            <TestModalProvider>
                <LoginProvider>
                    <SignupProvider>
                        <App {...props} />
                    </SignupProvider>
                </LoginProvider>
                ,
            </TestModalProvider>,
        );
    },
    progress: {
        color: '#CCFB55',
    },
});
