import AnimatedUnderline from '@/components/ui/animated-underline';
import BurgerMenu from '@/components/ui/burger-menu';
import { Button } from '@/components/ui/button';
import { useClickOutside } from '@/hooks/use-click-outside';
import { navLinks } from '@/lib/data/navLinks';
import { cn } from '@/lib/utils/cn';
import { NodeProps } from '@/types/nodeProps';
import { LogOut } from 'lucide-preact';
import { FC } from 'preact/compat';

const AppHeader: FC<{ className?: string }> = ({ className }) => {
    const { show: showMenu, setShow: setShowMenu } = useClickOutside([
        '#header',
    ]);

    const isLoggedIn = true;

    const toggleMenu = () => {
        setShowMenu((p) => !p);
    };
    return (
        <header
            id="header"
            class={cn(
                'fixed top-8 left-1/2 z-100 flex w-9/10 -translate-x-1/2 items-center justify-between bg-white p-3',
                className,
                {
                    'rounded-[2rem]': !showMenu,
                    'rounded-t-[2rem]': showMenu,
                },
            )}
        >
            <BurgerMenu
                show={showMenu}
                onClick={toggleMenu}
                className="z-5 ml-4 w-7"
                aria-label={showMenu ? 'Закрыть меню' : 'Открыть меню'}
                aria-expanded={showMenu}
            />

            {isLoggedIn && <span class="text-center max-w-1/2 font-medium">Здравствуйте, Дмитрий</span>}

            <Nav showMenu={showMenu} isLoggedIn={isLoggedIn} />

            {isLoggedIn ? (
                <button class="mr-2 size-7">
                    <LogOut class="size-full" />
                </button>
            ) : (
                <Button variant="secondary" type="button" as="button">
                    Войти
                </Button>
            )}
        </header>
    );
};

export default AppHeader;

const NavLink: FC<NodeProps<{ href: string; label: string }>> = ({
    href,
    className,
    label,
}) => {
    return (
        <li>
            <a
                href={href}
                class={cn(
                    'group relative mx-auto block w-fit font-bold md:text-sm',
                    className,
                )}
            >
                {label}
                <AnimatedUnderline className="h-0.5" />
            </a>
        </li>
    );
};

const Nav: FC<{ showMenu: boolean; isLoggedIn: boolean }> = ({
    showMenu,
    isLoggedIn,
}) => {
    return (
        <nav
            class={cn(
                'absolute inset-x-0 top-0 translate-y-16 overflow-clip rounded-b-[2rem] bg-white px-3 transition-[max-height,padding] duration-300 ease-in-out md:static md:max-h-full md:translate-y-0',
                {
                    'max-h-200 py-5': showMenu,
                    'max-h-0 py-0': !showMenu,
                },
            )}
        >
            <ul class="space-y-4 md:flex md:items-center md:space-y-0">
                {navLinks.map((link) => (
                    <NavLink
                        key={link.id}
                        label={link.label}
                        href={link.href}
                    />
                ))}
                {isLoggedIn && (
                    <li class="pt-1">
                        <Button
                            variant="secondary"
                            class="mx-auto text-sm"
                            type="button"
                            as="button"
                        >
                            Последний результат
                        </Button>
                    </li>
                )}
            </ul>
        </nav>
    );
};
