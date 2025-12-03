import { cn } from '@/lib/utils/cn';
import Plans from '@/pages/Home/partials/Plans/Plans';
import { NodeProps } from '@/types/nodeProps';
import { FC } from 'preact/compat';
import css from './TestModal.module.scss';

const TestModal: FC<NodeProps> = ({ className }) => {
    return (
        <div class={cn(css.wrapper, className)}>
            <h3 class={css.heading}>
                Упс... <br /> Вы еще не проходили тест
            </h3>
            <p class={css.description}>Выберите подходящий тариф</p>
            <Plans className={css.grid} />
        </div>
    );
};

export default TestModal;
