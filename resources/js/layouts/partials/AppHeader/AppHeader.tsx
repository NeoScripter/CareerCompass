import BurgerMenu from '@/components/ui/BurgerMenu/BurgerMenu';
import { Button } from '@/components/ui/Button/Button';
import { useClickOutside } from '@/hooks/use-click-outside';
import { useEscapeKey } from '@/hooks/use-escape-key';
import { cn } from '@/lib/utils/cn';
import { useLoginModal } from '@/providers/login-context';
import { Test, User } from '@/types/model';
import { Link, router, usePage } from '@inertiajs/react';
import { LogOut } from 'lucide-preact';
import { FC, useEffect, useRef, useState } from 'preact/compat';
import { toast } from 'sonner';
import css from './AppHeader.module.scss';
import Nav from './partials/Nav/Nav';

const AppHeader: FC<{ className?: string }> = ({ className }) => {
    const { show } = useLoginModal();

    const { auth } = usePage<{
        auth: { user: User | null; lastTest: Test | null; plan: string | null };
    }>().props;

    const { show: showMenu, setShow: setShowMenu } = useClickOutside([
        '#header',
    ]);

    const [hide, setHide] = useState(false);
    const lastScrollTopRef = useRef(0);
    useEscapeKey(() => setShowMenu(false));

    const isLoggedIn = auth?.user != null;

    const toggleMenu = () => setShowMenu((p) => !p);

    useEffect(() => {
        const handleScrollDown = () => {
            if (showMenu && window.screen.width < 768) return;
            const currentScrollTop =
                window.scrollY || document.documentElement.scrollTop;

            if (currentScrollTop > lastScrollTopRef.current + 30) {
                setHide(true);
            } else if (currentScrollTop < lastScrollTopRef.current) {
                setHide(false);
            }

            lastScrollTopRef.current = currentScrollTop;
        };

        window.addEventListener('scroll', handleScrollDown);
        return () => window.removeEventListener('scroll', handleScrollDown);
    }, [showMenu]);

    return (
        <header
            id="header"
            class={cn(css.header, className, {
                [css.roundedDefault]: !showMenu,
                [css.roundedOpen]: showMenu,
                [css.hiddenHeader]: hide,
            })}
        >
            <BurgerMenu
                show={showMenu}
                onClick={toggleMenu}
                aria-label={showMenu ? 'Закрыть меню' : 'Открыть меню'}
                aria-expanded={showMenu}
            />
            {auth.plan && <span class={css.planTitle}>{auth.plan}</span>}

            {!isLoggedIn && <div class={css.placeholder} aria-hidden="true" />}
            <Nav showMenu={showMenu} isLoggedIn={isLoggedIn} />

            {isLoggedIn ? (
                <Link
                    href={route('logout')}
                    onSuccess={() => {
                        toast('До новых встреч!');
                        router.flushAll();
                    }}
                    method="post"
                    as="button"
                    class={css.logoutBtn}
                >
                    <LogOut class={css.logoutIcon} />
                </Link>
            ) : (
                <Button
                    onClick={() => (show.value = true)}
                    class={cn('button secondary')}
                    type="button"
                    as="button"
                >
                    Войти
                </Button>
            )}
        </header>
    );
};

export default AppHeader;
