import { Button } from '@/components/ui/button';
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
        <ul class="mx-auto grid max-w-80 gap-5 sm:max-w-full sm:grid-cols-4 lg:grid-cols-3 lg:gap-7.5">
            {plans.map((plan, idx) => (
                <PlanCard
                    key={plan.id}
                    plan={plan}
                    className={
                        idx === plans.length - 1
                            ? 'sm:col-start-2 sm:col-end-4 sm:items-center lg:col-start-auto lg:col-end-auto'
                            : 'sm:col-span-2 lg:col-span-1'
                    }
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
                'bg-muted rounded-[2rem] px-5 py-5.5 sm:py-7.5 lg:px-7.5 lg:pt-12.5 lg:pb-10 xl:px-12.5',
                {
                    'hover:ring-primary transition-[outline,scale] duration-300 ease-in-out hover:scale-103 hover:ring-4':
                        !disabled,
                },
                className,
            )}
            role="article"
            aria-labelledby={`plan-title-${plan.title}`}
        >
            <h4
                id={`plan-title-${plan.title}`}
                class="text-foreground mb-3.5 text-center text-lg font-bold lg:mb-5 lg:text-2xl xl:text-3xl"
            >
                {plan.title}
            </h4>
            <p class="mb-7.5 text-center text-base lg:text-xl xl:mb-8 xl:text-2xl">
                <span aria-label={`Примерно ${plan.duration} минут`}>
                    ~{plan.duration} мин
                </span>
            </p>
            <div class="mb-5 inline-flex gap-2.5 select-none lg:mb-7.5">
                <p class="text-3xl font-bold lg:text-5xl xl:text-6xl">
                    <span
                        class="text-foreground"
                        aria-label={`${plan.price} рублей`}
                    >
                        {plan.price} ₽
                    </span>
                </p>
                {plan.prevPrice && (
                    <p class="text-base line-through lg:text-lg xl:text-xl">
                        <span
                            aria-label={`Предыдущая цена ${plan.prevPrice} рублей`}
                        >
                            {plan.prevPrice} ₽
                        </span>
                    </p>
                )}
            </div>
            <p class="text-base lg:min-h-42 lg:text-xl xl:min-h-35 xl:text-2xl">
                {plan.description}
            </p>
            <Button
                onClick={handleClick}
                variant="primary"
                class={cn(
                    'mx-auto my-7.5 px-[2.5em] lg:my-11 xl:my-13 xl:px-[3em]',
                    disabled && 'pointer-events-none opacity-50',
                )}
                aria-label={`Пройти тест для плана ${plan.title}`}
                disabled={disabled}
            >
                Пройти тест
            </Button>
            <ul
                class="space-y-5 lg:space-y-6 lg:text-lg"
                aria-label="Преимущества плана"
            >
                {plan.perks.map((perk, idx) => (
                    <PerkItem key={`perk-${idx}`} perk={perk} />
                ))}
            </ul>
        </li>
    );
};

const PerkItem: FC<{ perk: string }> = ({ perk }) => {
    return (
        <li class="flex items-start gap-3 lg:gap-5">
            <CircleCheckBig
                class="mt-0.5 size-5 shrink-0 lg:size-6"
                aria-hidden="true"
            />
            <span>{perk}</span>
        </li>
    );
};
