import { cn } from '@/lib/utils/cn';
import { NodeProps } from '@/types/nodeProps';
import { FC } from 'preact/compat';

const TestLayout: FC<NodeProps> = ({ children, className }) => {
    return (
        <div
            class={cn(
                'text-foreground mx-auto max-w-480 pb-5 lg:pb-9 lg:text-xl xl:text-2xl',
                className,
            )}
        >
            <main class="mb-20 space-y-20 px-5 sm:px-6 lg:mb-33 lg:space-y-33 lg:px-9 xl:mb-37.5 xl:space-y-37.5">
                {children}
            </main>
        </div>
    );
};

export default TestLayout;
