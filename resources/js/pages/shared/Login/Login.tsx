import { router, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-preact';

import FormSection from '@/components/forms/FormSection/FormSection';
import Input from '@/components/forms/Input/Input';
import InputError from '@/components/forms/InputError/InputError';
import Label from '@/components/forms/Label/Label';
import PasswordInput from '@/components/forms/PasswordInput/PasswordInput';
import { Button } from '@/components/ui/Button/Button';
import FormLayout from '@/layouts/FormLayout/FormLayout';
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
        <div class="login">
            <h2 className="login__title">Вход</h2>

            <form className="login__form" onSubmit={submit}>
                <FormLayout>
                    <FormSection>
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
                            className="login__input"
                        />
                        <InputError message={errors.email} />
                    </FormSection>

                    <FormSection>
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
                            className="login__input"
                        />
                        <InputError message={errors.password} />
                    </FormSection>

                    <Button
                        tabIndex={4}
                        disabled={processing}
                        type="submit"
                        class="button secondary login__submit"
                        as="button"
                    >
                        {processing && (
                            <LoaderCircle className="login__loader" />
                        )}
                        Войти
                    </Button>
                </FormLayout>
                <div class="login__signup-prompt">
                    Еще не зарегистрированы?
                    <button
                        type="button"
                        onClick={() => {
                            show.value = false;
                            showSignupModal.value = true;
                        }}
                        class="login__signup-link"
                    >
                        Регистрация
                    </button>
                </div>
            </form>
        </div>
    );
}
