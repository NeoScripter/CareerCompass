import NavLink from '@/components/nav/NavLink/NavLink';
import { Button } from '@/components/ui/Button/Button';
import { navLinks } from '@/lib/data/navLinks';
import { cn } from '@/lib/utils/cn';
import { useTestModalModal } from '@/providers/test-modal-context';
import { Plan, Test, User } from '@/types/model';
import { router, usePage } from '@inertiajs/react';
import { FC } from 'preact/compat';
import css from './Nav.module.scss';

const Nav: FC<{ showMenu: boolean; isLoggedIn: boolean }> = ({
    showMenu,
    isLoggedIn,
}) => {
    const { show: showTestModal } = useTestModalModal();
    const { auth, plans } = usePage<{
        auth: { user: User | null; lastTest: Test | null; plan: string | null };
        plans: Plan[] | undefined;
    }>().props;

    const handleLastResultClick = () => {
        if (auth.lastTest == null) {
            showTestModal.value = true;
        } else {
            router.visit(route('test.result.show', auth.lastTest.id), {
                method: 'get',
            });
        }
    };

    return (
        <nav
            class={cn(css.nav, {
                [css.navOpen]: showMenu,
                [css.navClosed]: !showMenu,
            })}
        >
            <ul class={css.list}>
                {navLinks.map((link) => (
                    <NavLink
                        key={link.id}
                        label={link.label}
                        href={link.href}
                    />
                ))}
            </ul>

            {isLoggedIn && (
                <div class={css.btnWrapper}>
                    {auth.plan && (
                        <span class={css.planTitle}>{auth.plan}</span>
                    )}
                    <Button
                        onClick={handleLastResultClick}
                        disabled={plans == null}
                        class={cn(
                            'button secondary',
                            plans == null && css.disabled,
                        )}
                        type="button"
                        as="button"
                    >
                        Последний результат
                    </Button>
                </div>
            )}
        </nav>
    );
};

export default Nav;
