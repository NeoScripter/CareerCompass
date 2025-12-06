import { Button } from '@/components/ui/Button/Button';
import { cn } from '@/lib/utils/cn';
import { useLoginModal } from '@/providers/login-context';
import { Plan, User } from '@/types/model';
import { NodeProps } from '@/types/nodeProps';
import { router, usePage } from '@inertiajs/react';
import { CircleCheckBig } from 'lucide-preact';
import { FC } from 'preact/compat';
import css from './PlanCard.module.scss';

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
                css.card,
                {
                    [css.planCardDisabled]: disabled,
                },
                className,
            )}
            role="article"
            aria-labelledby={`plan-title-${plan.title}`}
        >
            <h4 id={`plan-title-${plan.title}`} class={css.title}>
                {plan.title}
            </h4>
            <p class={css.duration}>
                <span aria-label={`Примерно ${plan.duration} минут`}>
                    ~{plan.duration} мин
                </span>
            </p>
            <div class={css.pricing}>
                <p class={css.price}>
                    <span class={css.priceValue} aria-label={`${plan.price} рублей`}>
                        {plan.price} ₽
                    </span>
                </p>
                {plan.prevPrice && (
                    <p class={css.prevPrice}>
                        <span
                            class={css.prevPriceWrapper}
                            aria-label={`Предыдущая цена ${plan.prevPrice} рублей`}
                        >
                            <span
                                aria-hidden="true"
                                class={css.prevPriceLine}
                            />
                            {plan.prevPrice} ₽
                        </span>
                    </p>
                )}
            </div>
            <p class={css.description}>{plan.description}</p>
            <Button
                onClick={handleClick}
                class={cn(css.button, 'button primary', {
                    [css.buttonDisabled]: disabled,
                })}
                aria-label={`Пройти тест для плана ${plan.title}`}
                disabled={disabled}
            >
                {plan.taken ? 'Пройти еще раз' : 'Пройти тест'}
            </Button>
            <ul class={css.perks} aria-label="Преимущества плана">
                {plan.perks.map((perk, idx) => (
                    <PerkItem key={`perk-${idx}`} perk={perk} />
                ))}
            </ul>
        </li>
    );
};

export default PlanCard;

const PerkItem: FC<{ perk: string }> = ({ perk }) => {
    return (
        <li class={css.perk}>
            <CircleCheckBig class={css.perkIcon} aria-hidden="true" />
            <span class={css.perkText}>{perk}</span>
        </li>
    );
};
