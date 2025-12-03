
import { Signal, signal } from '@preact/signals';
import { createContext } from 'preact';
import { useContext } from 'preact/hooks';

interface TestModalContextValue {
    show: Signal<boolean>;
}

const TestModalContext = createContext<TestModalContextValue | null>(null);

export function useTestModalModal() {
    const ctx = useContext(TestModalContext);
    if (!ctx) {
        throw new Error('useTestModalModal must be used within TestModalProvider');
    }
    return ctx;
}

export function TestModalProvider({
    children,
}: {
    children: preact.ComponentChildren;
}) {
    const show = signal(false);
    return (
        <TestModalContext.Provider value={{ show }}>
            {children}
        </TestModalContext.Provider>
    );
}
