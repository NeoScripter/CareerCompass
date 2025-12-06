import { Button } from '@/components/ui/Button/Button';
import { useLoginModal } from '@/providers/login-context';
import { useSignupModal } from '@/providers/signup-context';
import { Link, router, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-preact';
import { TargetedEvent } from 'preact';
import { toast } from 'sonner';

import Checkbox from '@/components/forms/Checkbox/Checkbox';
import FormSection from '@/components/forms/FormSection/FormSection';
import Input from '@/components/forms/Input/Input';
import InputError from '@/components/forms/InputError/InputError';
import Label from '@/components/forms/Label/Label';
import PasswordInput from '@/components/forms/PasswordInput/PasswordInput';
import FormLayout from '@/layouts/FormLayout/FormLayout';

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
            preserveScroll: true,
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
        <div class="signup">
            <h2 className="signup__title">Регистрация</h2>

            <form className="signup__form" onSubmit={submit}>
                <FormLayout>
                    {/* Name */}
                    <FormSection>
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
                            placeholder="Иван"
                            className="signup__input"
                        />
                        <InputError message={errors.name} />
                    </FormSection>

                    {/* Email */}
                    <FormSection>
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
                            className="signup__input"
                        />
                        <InputError message={errors.email} />
                    </FormSection>

                    {/* Password */}
                    <FormSection>
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
                            className="signup__input"
                        />
                        <InputError message={errors.password} />
                    </FormSection>

                    {/* Password Confirmation */}
                    <FormSection>
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
                            className="signup__input"
                        />
                        <InputError message={errors.password_confirmation} />
                    </FormSection>

                    <div className="signup__policy">
                        <Checkbox
                            checked={data.policy}
                            onChange={(checked) => setData('policy', checked)}
                            checkboxClassName="signup__policy-checkbox"
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
                        class="button secondary signup__submit"
                        as="button"
                    >
                        {processing && (
                            <LoaderCircle className="signup__loader" />
                        )}
                        Регистрация
                    </Button>

                    <div class="signup__login-prompt">
                        Уже зарегистрированы?
                        <button
                            type="button"
                            onClick={() => {
                                show.value = false;
                                showLoginModal.value = true;
                            }}
                            class="signup__login-link"
                        >
                            Вход
                        </button>
                    </div>
                </FormLayout>
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
        <a
            target="_blank"
            href={routeName}
            // onClick={() => (show.value = false)}
            className="info-link"
        >
            {label}
        </a>
    );
};
