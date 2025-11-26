import { cn } from '@/lib/utils/cn';
import { NodeProps } from '@/types/nodeProps';
import { FC } from 'preact/compat';

const FormLayout: FC<NodeProps> = ({ className, children }) => {
    return <div className={cn('form-layout', className)}>{children}</div>;
};

export default FormLayout;
