import { Button } from '@/components/ui/Button/Button';
import { cn } from '@/lib/utils/cn';
import scrollToSection from '@/lib/utils/scrollToSection';
import { NodeProps } from '@/types/nodeProps';
import { FC } from 'preact/compat';
import css from './PaywallBtn.module.scss';

const PaywallBtn: FC<NodeProps> = ({ className }) => {
    return (
        <Button
            onClick={() => scrollToSection('#result-cards')}
            className={cn(css.scrollBtn, 'button primary', className)}
        >
            Открыть полный доступ
        </Button>
    );
};

export default PaywallBtn;
