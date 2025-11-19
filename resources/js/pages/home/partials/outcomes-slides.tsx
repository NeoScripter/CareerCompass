import { cn } from '@/lib/utils/cn';
import { NodeProps } from '@/types/nodeProps';
import { FC } from 'preact/compat';

const OutcomesSlides: FC<NodeProps> = ({ className }) => {
    return <div class={cn('', className)}>this is slides section</div>;
};

export default OutcomesSlides;
