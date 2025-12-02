import NavLink from '@/components/nav/NavLink/NavLink';
import { Button } from '@/components/ui/Button/Button';
import { navLinks } from '@/lib/data/navLinks';
import { cn } from '@/lib/utils/cn';
import { Test, User } from '@/types/model';
import { router, usePage } from '@inertiajs/react';
import { FC } from 'preact/compat';
import css from './Nav.module.scss';

const Nav: FC<{ showMenu: boolean; isLoggedIn: boolean }> = ({
    showMenu,
    isLoggedIn,
}) => {
    const { auth } = usePage<{
        auth: { user: User | null; lastTest: Test | null; plan: string | null };
    }>().props;

    const disabled = auth.lastTest == null;
    console.log(auth.plan);

    const handleLastResultClick = () => {
        if (auth.lastTest == null) return;

        router.visit(route('test.result.show', auth.lastTest.id), {
            method: 'get',
        });
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
                        disabled={disabled}
                        class={cn('button secondary', disabled && css.disabled)}
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
