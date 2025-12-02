import PlanCard from '@/components/ui/PlanCard/PlanCard';
import { cn } from '@/lib/utils/cn';
import { Plan } from '@/types/model';
import { usePage } from '@inertiajs/react';
import css from './Plans.module.scss';

const Plans = () => {
    const { plans } = usePage<{ plans: Plan[] }>().props;

    return (
        <ul class={css.plans}>
            {plans.map((plan, idx) => (
                <PlanCard
                    key={plan.id}
                    plan={plan}
                    className={cn(
                        idx === 2
                            ? [css.cardLast]
                            : [css.cardRegular],
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
