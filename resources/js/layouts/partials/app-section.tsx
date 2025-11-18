import { cn } from '@/lib/utils/cn';
import { NodeProps } from '@/types/nodeProps';
import { FC } from 'preact/compat';

const AppSection: FC<NodeProps> = ({ children, className }) => {
    return <section class={cn('', className)}>{children}</section>;
};

export default AppSection;
