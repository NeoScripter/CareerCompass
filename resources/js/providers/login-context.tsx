import { Signal, signal } from '@preact/signals';
import { createContext } from 'preact';
import { useContext } from 'preact/hooks';

interface LoginContextValue {
    show: Signal<boolean>;
}

const LoginContext = createContext<LoginContextValue | null>(null);

export function useLoginModal() {
    const ctx = useContext(LoginContext);
    if (!ctx) {
        throw new Error('useLoginModal must be used within LoginProvider');
    }
    return ctx;
}

export function LoginProvider({
    children,
}: {
    children: preact.ComponentChildren;
}) {
    const show = signal(false);
    return (
        <LoginContext.Provider value={{ show }}>
            {children}
        </LoginContext.Provider>
    );
}
