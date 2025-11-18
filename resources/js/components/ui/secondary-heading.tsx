import { cn } from '@/lib/utils/cn';
import { NodeProps } from '@/types/nodeProps';
import { FC } from 'preact/compat';

const SecondaryHeading: FC<NodeProps> = ({ children, className }) => {
    return (
        <h2
            class={cn(
                'mb-5 text-3xl font-bold lg:mb-7.5 lg:text-5xl xl:text-6xl',
                className,
            )}
        >
            {children}
        </h2>
    );
};

export default SecondaryHeading;
