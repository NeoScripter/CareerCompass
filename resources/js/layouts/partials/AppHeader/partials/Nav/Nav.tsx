import NavLink from '@/components/nav/NavLink/NavLink';
import { Button } from '@/components/ui/Button/Button';
import { navLinks } from '@/lib/data/navLinks';
import { cn } from '@/lib/utils/cn';
import { Test, User } from '@/types/model';
import { router, usePage } from '@inertiajs/react';
import { FC } from 'preact/compat';

const Nav: FC<{ showMenu: boolean; isLoggedIn: boolean }> = ({
    showMenu,
    isLoggedIn,
}) => {
    const { auth } = usePage<{
        auth: { user: User | null; lastTest: Test | null };
    }>().props;

    const disabled = auth.lastTest == null;

    const handleLastResultClick = () => {
        if (auth.lastTest == null) return;

        router.visit(route('test.result.show', auth.lastTest.id), {
            method: 'get',
        });
    };

    return (
        <nav
            class={cn('Nav', {
                'nav-open': showMenu,
                'nav-closed': !showMenu,
            })}
        >
            <ul class="list">
                {navLinks.map((link) => (
                    <NavLink
                        key={link.id}
                        label={link.label}
                        href={link.href}
                    />
                ))}
            </ul>

            {isLoggedIn && (
                <Button
                    onClick={handleLastResultClick}
                    disabled={disabled}
                    class={cn(
                        'button secondary result-btn',
                        disabled && 'disabled',
                    )}
                    type="button"
                    as="button"
                >
                    Последний результат
                </Button>
            )}
        </nav>
    );
};

export default Nav;
