import NavLink from '@/components/nav/nav-link';
import BurgerMenu from '@/components/ui/burger-menu';
import { Button } from '@/components/ui/Button/Button';
import { useClickOutside } from '@/hooks/use-click-outside';
import { useEscapeKey } from '@/hooks/use-escape-key';
import { navLinks } from '@/lib/data/navLinks';
import { cn } from '@/lib/utils/cn';
import { useLoginModal } from '@/providers/login-context';
import { Test, User } from '@/types/model';
import { Link, router, usePage } from '@inertiajs/react';
import { LogOut } from 'lucide-preact';
import { FC, useEffect, useRef, useState } from 'preact/compat';
import { toast } from 'sonner';

const AppHeader: FC<{ className?: string }> = ({ className }) => {
    const { show } = useLoginModal();

    const { auth } = usePage<{
        auth: { user: User | null; lastTest: Test | null };
    }>().props;

    const { show: showMenu, setShow: setShowMenu } = useClickOutside([
        '#header',
    ]);

    const [hide, setHide] = useState(false);
    const lastScrollTopRef = useRef(0);
    useEscapeKey(() => setShowMenu(false));

    const isLoggedIn = auth?.user != null;

    const toggleMenu = () => {
        setShowMenu((p) => !p);
    };

    useEffect(() => {
        const handleScrollDown = () => {
            if (showMenu && window.screen.width < 768) return;
            const currentScrollTop =
                window.scrollY || document.documentElement.scrollTop;

            if (currentScrollTop > lastScrollTopRef.current + 30) {
                // User is scrolling down
                setHide(true);
            } else if (currentScrollTop < lastScrollTopRef.current) {
                // User is scrolling up
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
            class={cn(
                'fixed top-8 left-1/2 z-100 flex w-9/10 -translate-x-1/2 items-center justify-between bg-white p-2 shadow-lg transition-transform duration-300 ease-in md:w-full md:max-w-3/4 md:rounded-full lg:w-240',
                className,
                {
                    'rounded-full': !showMenu,
                    'rounded-t-[2rem]': showMenu,
                    'md:pl-20 lg:pl-30 xl:pl-40': !isLoggedIn,
                    '-translate-y-3/2': hide,
                },
            )}
        >
            <BurgerMenu
                show={showMenu}
                onClick={toggleMenu}
                className="z-5 ml-4 w-7 md:hidden"
                aria-label={showMenu ? 'Закрыть меню' : 'Открыть меню'}
                aria-expanded={showMenu}
            />

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
                    class="mr-2 size-7 md:-order-2 md:mr-4 md:ml-4 lg:size-9"
                >
                    <LogOut class="size-full" />
                </Link>
            ) : (
                <Button
                    onClick={() => (show.value = true)}
                    class="ml-1 text-sm xl:text-base"
                    variant="secondary"
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

const Nav: FC<{ showMenu: boolean; isLoggedIn: boolean }> = ({
    showMenu,
    isLoggedIn,
}) => {
    const { auth } = usePage<{
        auth: { user: User | null; lastTest: Test | null };
    }>().props;

    const disabled = auth.lastTest == null;

    return (
        <nav
            class={cn(
                'absolute inset-x-0 top-8 -z-1 overflow-clip rounded-b-[2rem] bg-white px-3 transition-[max-height,padding] duration-300 ease-in-out md:static md:flex md:flex-1 md:translate-y-0 md:items-center md:overflow-auto md:rounded-[2rem] md:px-0',
                {
                    'max-h-200 pt-13 pb-5 md:py-0 md:pt-0': showMenu,
                    'max-h-0 py-0 md:max-h-full': !showMenu,
                },
            )}
        >
            <ul class="space-y-4 md:mx-auto md:flex md:items-center md:gap-8 md:space-y-0 lg:gap-10">
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
                    disabled={disabled}
                    variant="secondary"
                    class={cn(
                        'mx-auto mt-3 text-sm md:mx-0 md:mt-0 lg:text-base',
                        disabled ? 'cursor-default opacity-50 pointer-events-none' : 'opacity-100',
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
