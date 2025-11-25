import { Link, router, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-preact';

import Checkbox from '@/components/forms/checkbox';
import Input from '@/components/forms/input';
import InputError from '@/components/forms/input-error';
import Label from '@/components/forms/label';
import PasswordInput from '@/components/forms/password-input';
import { Button } from '@/components/ui/Button/Button';
import SecondaryHeading from '@/components/ui/secondary-heading';
import { cn } from '@/lib/utils/cn';
import { useLoginModal } from '@/providers/login-context';
import { useSignupModal } from '@/providers/signup-context';
import { TargetedEvent } from 'preact';
import { toast } from 'sonner';

type RegisterForm = {
    name: string;
    email: string;
    policy: boolean;
    password: string;
    password_confirmation: string;
};

export default function Signup() {
    const { show: showLoginModal } = useLoginModal();
    const { show } = useSignupModal();

    const { data, setData, post, processing, errors, reset } = useForm<
        Required<RegisterForm>
    >({
        name: '',
        email: '',
        policy: false,
        password: '',
        password_confirmation: '',
    });

    const submit = (e: TargetedEvent<HTMLFormElement, SubmitEvent>) => {
        e.preventDefault();

        post(route('register'), {
            onSuccess: () => {
                router.flushAll();
                toast('Регистрация успешна!');
                show.value = false;
            },
            onFinish: () =>
                reset('password', 'password_confirmation', 'policy'),
        });
    };

    return (
        <div class="py-8">
            <SecondaryHeading className="mx-auto w-fit lg:text-3xl xl:text-3xl">
                Регистрация
            </SecondaryHeading>

            <form className="flex flex-col gap-6" onSubmit={submit}>
                <div className="mx-auto grid w-full max-w-90 gap-3 px-2 sm:w-4/5 sm:max-w-full sm:gap-4 sm:px-0">
                    {/* Name */}
                    <div className="grid gap-2">
                        <Label htmlFor="name">Имя</Label>
                        <Input
                            id="name"
                            required
                            autoFocus
                            tabIndex={1}
                            autoComplete="name"
                            value={data.name}
                            onChange={(e) =>
                                setData('name', e.currentTarget.value)
                            }
                            placeholder="Иван Иванов"
                            className={cn('sm:text-base')}
                        />
                        <InputError message={errors.name} />
                    </div>

                    {/* Email */}
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            required
                            tabIndex={2}
                            autoComplete="email"
                            value={data.email}
                            onChange={(e) =>
                                setData('email', e.currentTarget.value)
                            }
                            placeholder="email@example.com"
                            className={cn('sm:text-base')}
                        />
                        <InputError message={errors.email} />
                    </div>

                    {/* Password */}
                    <div className="grid gap-2">
                        <Label htmlFor="password">Пароль</Label>
                        <PasswordInput
                            id="password"
                            required
                            tabIndex={3}
                            autoComplete="new-password"
                            value={data.password}
                            onChange={(e) =>
                                setData('password', e.currentTarget.value)
                            }
                            placeholder="Пароль"
                            className={cn('sm:text-base')}
                        />
                        <InputError message={errors.password} />
                    </div>

                    {/* Password Confirmation */}
                    <div className="grid gap-2">
                        <Label htmlFor="password_confirmation">
                            Подтверждение пароля
                        </Label>
                        <PasswordInput
                            id="password_confirmation"
                            required
                            tabIndex={4}
                            autoComplete="new-password"
                            value={data.password_confirmation}
                            onChange={(e) =>
                                setData(
                                    'password_confirmation',
                                    e.currentTarget.value,
                                )
                            }
                            placeholder="Подтвердите пароль"
                            className={cn('sm:text-base')}
                        />
                        <InputError message={errors.password_confirmation} />
                    </div>
                    <div className="mt-6 inline space-y-2 px-2 text-xs sm:mt-8 md:mt-10 md:space-y-4 md:px-4">
                        <Checkbox
                            checked={data.policy}
                            onChange={(checked) => setData('policy', checked)}
                            checkboxClassName="size-7"
                            error={errors.policy}
                        >
                            Я даю согласие на сбор и обработку персональных
                            данных в соответствии с
                            <InfoLink
                                label=" Политикой обработки персональных данных "
                                routeName={route('legal.policy')}
                            />
                            и принимаю условия
                            <InfoLink
                                label=" Пользовательского соглашения "
                                routeName={route('legal.consent')}
                            />
                        </Checkbox>
                    </div>

                    <Button
                        tabIndex={5}
                        disabled={processing}
                        type="submit"
                        variant="secondary"
                        class="mx-auto mt-3 w-fit px-[4em]"
                        as="button"
                    >
                        {processing && (
                            <LoaderCircle className="h-4 w-4 animate-spin" />
                        )}
                        Регистрация
                    </Button>
                    <div class="flex items-center justify-center gap-1 text-sm">
                        Уже зарегистрированы?
                        <button
                            type="button"
                            onClick={() => {
                                show.value = false;
                                showLoginModal.value = true;
                            }}
                            class="underline underline-offset-3"
                        >
                            Вход
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}

const InfoLink: React.FC<{ routeName: string; label: string }> = ({
    label,
    routeName,
}) => {
    const { show } = useSignupModal();
    return (
        <Link
            href={routeName}
            onClick={() => show.value = false}
            className="ease hover:text-dark-swamp inline underline underline-offset-3 transition-colors duration-200"
        >
            {label}
        </Link>
    );
};
