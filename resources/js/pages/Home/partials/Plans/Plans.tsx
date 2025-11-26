import { Button } from '@/components/ui/Button/Button';
import { cn } from '@/lib/utils/cn';
import { useLoginModal } from '@/providers/login-context';
import { Plan, User } from '@/types/model';
import { NodeProps } from '@/types/nodeProps';
import { router, usePage } from '@inertiajs/react';
import { CircleCheckBig } from 'lucide-preact';
import { FC } from 'react-dom/src';

const Plans = () => {
    const { plans } = usePage<{ plans: Plan[] }>().props;

    return (
        <ul class="plans">
            {plans.map((plan, idx) => (
                <PlanCard
                    key={plan.id}
                    plan={plan}
                    className={cn(
                        idx === plans.length - 1
                            ? 'plans__card--last'
                            : 'plans__card--regular',
                        {
                            'plans__card--second': idx === 1,
                        },
                    )}
                />
            ))}
        </ul>
    );
};

export default Plans;

const PlanCard: FC<NodeProps<{ plan: Plan; disabled?: boolean }>> = ({
    plan,
    className,
    disabled = false,
}) => {
    const { show: showLoginModal } = useLoginModal();

    const { auth } = usePage<{
        auth: { user: User | null };
    }>().props;

    const handleClick = () => {
        if (auth?.user == null) {
            showLoginModal.value = true;
        } else {
            router.visit(route('test.store'), {
                method: 'post',
                data: { tier: plan.tier },
            });
        }
    };

    return (
        <li
            class={cn(
                'plans__card',
                {
                    'plans__card--disabled': disabled,
                },
                className,
            )}
            role="article"
            aria-labelledby={`plan-title-${plan.title}`}
        >
            <h4 id={`plan-title-${plan.title}`} class="plans__title">
                {plan.title}
            </h4>
            <p class="plans__duration">
                <span aria-label={`Примерно ${plan.duration} минут`}>
                    ~{plan.duration} мин
                </span>
            </p>
            <div class="plans__pricing">
                <p class="plans__price">
                    <span
                        class="plans__price-value"
                        aria-label={`${plan.price} рублей`}
                    >
                        {plan.price} ₽
                    </span>
                </p>
                {plan.prevPrice && (
                    <p class="plans__prev-price">
                        <span
                            class="plans__prev-price-wrapper"
                            aria-label={`Предыдущая цена ${plan.prevPrice} рублей`}
                        >
                            <span
                                aria-hidden="true"
                                class="plans__prev-price-line"
                            />
                            {plan.prevPrice} ₽
                        </span>
                    </p>
                )}
            </div>
            <p class="plans__description">{plan.description}</p>
            <Button
                onClick={handleClick}
                class={cn('plans__button button primary', {
                    'plans__button--disabled': disabled,
                })}
                aria-label={`Пройти тест для плана ${plan.title}`}
                disabled={disabled}
            >
                Пройти тест
            </Button>
            <ul class="plans__perks" aria-label="Преимущества плана">
                {plan.perks.map((perk, idx) => (
                    <PerkItem key={`perk-${idx}`} perk={perk} />
                ))}
            </ul>
        </li>
    );
};

const PerkItem: FC<{ perk: string }> = ({ perk }) => {
    return (
        <li class="plans__perk">
            <CircleCheckBig class="plans__perk-icon" aria-hidden="true" />
            <span class="plans__perk-text">{perk}</span>
        </li>
    );
};
