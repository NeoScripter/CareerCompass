import { router, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-preact';

import Input from '@/components/forms/input';
import InputError from '@/components/forms/input-error';
import Label from '@/components/forms/label';
import PasswordInput from '@/components/forms/password-input';
import { Button } from '@/components/ui/button';
import SecondaryHeading from '@/components/ui/secondary-heading';
import { cn } from '@/lib/utils/cn';
import { useLoginModal } from '@/providers/login-context';
import { useSignupModal } from '@/providers/signup-context';
import { TargetedEvent } from 'preact';
import { toast } from 'sonner';

type LoginForm = {
    email: string;
    password: string;
};

export default function Login() {
    const { show } = useLoginModal();
    const { show: showSignupModal } = useSignupModal();
    const { data, setData, post, processing, errors, reset } = useForm<
        Required<LoginForm>
    >({
        email: '',
        password: '',
    });

    const submit = (e: TargetedEvent<HTMLFormElement, SubmitEvent>) => {
        e.preventDefault();

        post(route('login'), {
            onSuccess: () => {
                router.flushAll();
                toast('Добро пожаловать!');
                show.value = false;
            },
            onFinish: () => reset('password'),
        });
    };

    return (
        <div class="py-8">
            <SecondaryHeading className="mx-auto w-fit lg:text-3xl xl:text-3xl">
                Вход
            </SecondaryHeading>

            <form className="flex flex-col gap-6" onSubmit={submit}>
                <div className="mx-auto grid w-full max-w-90 gap-3 px-2 sm:w-4/5 sm:max-w-full sm:gap-4 sm:px-0">
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            required
                            autoFocus
                            tabIndex={1}
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

                    <div className="grid gap-2">
                        <Label className="sr-only" htmlFor="password">
                            Пароль
                        </Label>
                        <PasswordInput
                            id="password"
                            required
                            tabIndex={2}
                            autoComplete="current-password"
                            value={data.password}
                            onChange={(e) =>
                                setData('password', e.currentTarget.value)
                            }
                            placeholder="Password"
                            className={cn('sm:text-base')}
                        />
                        <InputError message={errors.password} />
                    </div>

                    <Button
                        tabIndex={4}
                        disabled={processing}
                        type="submit"
                        variant="secondary"
                        class="mx-auto mt-3 w-fit px-[4em]"
                        as="button"
                    >
                        {' '}
                        {processing && (
                            <LoaderCircle className="h-4 w-4 animate-spin" />
                        )}
                        Войти
                    </Button>
                </div>
                <div class="flex gap-1 text-sm items-center justify-center">
                    Еще не зарегистрированы?
                    <button
                        type='button'
                        onClick={() => {
                            show.value = false;
                            showSignupModal.value = true;
                        }}
                        class="underline underline-offset-3"
                    >
                        Регистрация
                    </button>
                </div>
            </form>
        </div>
    );
}
