import { cn } from '@/lib/utils/cn';
import { NodeProps } from '@/types/nodeProps';
import { CornerUpLeft } from 'lucide-preact';
import { FC } from 'preact/compat';

const TestLayout: FC<NodeProps> = ({ children, className }) => {
    return (
        <div class='test-layout'>
            <div class={cn("test-layout__body", className)}>
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
