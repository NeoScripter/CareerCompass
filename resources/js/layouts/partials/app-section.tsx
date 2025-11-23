import { cn } from '@/lib/utils/cn';
import { NodeProps } from '@/types/nodeProps';
import { FC } from 'preact/compat';

const AppSection: FC<NodeProps<{ id?: string }>> = ({
    children,
    className,
    id,
}) => {
    return (
        <section id={id} class={cn('', className)}>
            {children}
        </section>
    );
};

export default AppSection;
