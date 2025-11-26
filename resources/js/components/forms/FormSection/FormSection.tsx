import { cn } from '@/lib/utils/cn';
import { NodeProps } from '@/types/nodeProps';
import { FC } from 'preact/compat';

const FormSection: FC<NodeProps> = ({ children, className }) => {
    return <div class={cn("form-section", className)}>{children}</div>;
};

export default FormSection;
