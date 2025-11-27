import { cn } from '@/lib/utils/cn';
import { NodeProps } from '@/types/nodeProps';
import { CornerUpLeft } from 'lucide-preact';
import { FC } from 'preact/compat';

const TestLayout: FC<NodeProps> = ({ children, className }) => {
    return (
        <div class={cn('test-layout', className)}>
            <div class="test-layout__body">
                <header class="test-layout__header">
                    <button type="button" class="test-layout__btn">
                        <CornerUpLeft class="test-layout__icon" />
                    </button>
                </header>
                <main>{children}</main>
            </div>
        </div>
    );
};

export default TestLayout;
