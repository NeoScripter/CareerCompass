import PlanCard from '@/components/ui/PlanCard/PlanCard';
import { cn } from '@/lib/utils/cn';
import { Plan } from '@/types/model';
import { NodeProps } from '@/types/nodeProps';
import { usePage } from '@inertiajs/react';
import { FC } from 'preact/compat';
import css from './Plans.module.scss';

const Plans: FC<NodeProps> = ({ className }) => {
    const { plans } = usePage<{ plans: Plan[] }>().props;

    return (
        <ul id="result-cards" class={cn(css.plans, className)}>
            {plans.map((plan, idx) => (
                <PlanCard
                    key={plan.id}
                    plan={plan}
                    className={cn(
                        idx === 2 ? [css.cardLast] : [css.cardRegular],
                        {
                            [css.cardSecond]: idx === 1,
                        },
                    )}
                />
            ))}
        </ul>
    );
};

export default Plans;
