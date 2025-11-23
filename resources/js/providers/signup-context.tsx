import { Signal, signal } from '@preact/signals';
import { createContext } from 'preact';
import { useContext } from 'preact/hooks';

interface SignupContextValue {
    show: Signal<boolean>;
}

const SignupContext = createContext<SignupContextValue | null>(null);

export function useSignupModal() {
    const ctx = useContext(SignupContext);
    if (!ctx) {
        throw new Error('useSignupModal must be used within SignupProvider');
    }
    return ctx;
}

export function SignupProvider({
    children,
}: {
    children: preact.ComponentChildren;
}) {
    const show = signal(false);
    return (
        <SignupContext.Provider value={{ show }}>
            {children}
        </SignupContext.Provider>
    );
}
