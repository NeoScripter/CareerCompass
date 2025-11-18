import AnimatedUnderline from '@/components/ui/animated-underline';
import BurgerMenu from '@/components/ui/burger-menu';
import { Button } from '@/components/ui/button';
import { useClickOutside } from '@/hooks/use-click-outside';
import { useEscapeKey } from '@/hooks/use-escape-key';
import { navLinks } from '@/lib/data/navLinks';
import { cn } from '@/lib/utils/cn';
import { NodeProps } from '@/types/nodeProps';
import { LogOut } from 'lucide-preact';
import { FC } from 'preact/compat';

const AppHeader: FC<{ className?: string }> = ({ className }) => {
    const { show: showMenu, setShow: setShowMenu } = useClickOutside([
        '#header',
    ]);

    useEscapeKey(() => setShowMenu(false));

    const isLoggedIn = false;

    const toggleMenu = () => {
        setShowMenu((p) => !p);
    };
    return (
        <header
            id="header"
            class={cn(
                'fixed top-8 left-1/2 z-100 flex w-9/10 lg:pr-4 -translate-x-1/2 items-center justify-between bg-white p-3 md:[width:calc(100%-1rem)] md:max-w-267 xl:max-w-347',
                className,
                {
                    'rounded-full': !showMenu,
                    'rounded-t-full': showMenu,
                    'md:pl-20 lg:pl-30 xl:pl-40': !isLoggedIn,
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
                <button class="mr-2 size-7 md:-order-2 md:mr-4 md:ml-4 lg:size-9">
                    <LogOut class="size-full" />
                </button>
            ) : (
                <Button
                    class="ml-1"
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
                    'group relative mx-auto block w-fit font-bold md:mx-0 md:text-sm lg:text-base xl:text-xl',
                    className,
                )}
            >
                {label}
                <AnimatedUnderline className="z-10 h-0.5 shrink-0 bg-black" />
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
                'absolute inset-x-0 top-0 translate-y-16 overflow-clip rounded-b-[2rem] bg-white px-3 transition-[max-height,padding] duration-300 ease-in-out md:static md:flex md:flex-1 md:translate-y-0 md:items-center md:overflow-auto md:rounded-[2rem] md:px-0',
                {
                    'max-h-200 py-5 md:py-0': showMenu,
                    'max-h-0 py-0 md:max-h-full': !showMenu,
                },
            )}
        >
            <ul class="space-y-4 md:mx-auto md:flex md:items-center md:gap-10 md:space-y-0 lg:gap-12 xl:gap-14">
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
                    variant="secondary"
                    class="mx-auto mt-3 text-sm md:mx-0 md:mt-0 lg:text-base"
                    type="button"
                    as="button"
                >
                    Последний результат
                </Button>
            )}
        </nav>
    );
};
