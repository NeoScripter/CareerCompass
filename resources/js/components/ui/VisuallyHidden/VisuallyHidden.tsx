import { cn } from '@/lib/utils/cn';
import { NodeProps } from '@/types/nodeProps';
import { FC } from 'preact/compat';

const VisuallyHidden: FC<NodeProps> = ({ children, className }) => {
    return <span className={cn('visually-hidden', className)}>{children}</span>;
};

export default VisuallyHidden;
