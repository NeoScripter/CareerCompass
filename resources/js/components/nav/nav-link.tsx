import { cn } from '@/lib/utils/cn';
import scrollToSection from '@/lib/utils/scrollToSection';
import { NodeProps } from '@/types/nodeProps';
import { router } from '@inertiajs/react';
import { FC } from 'preact/compat';

const NavLink: FC<NodeProps<{ href: string; label: string }>> = ({
    href,
    className,
    label,
}) => {
    const handleClick = () => {
        if (route().current('home')) {
            scrollToSection(`#${href}`);
        } else {
            router.get(route('home'));
        }
    };
    return (
        <li>
            <button
                type="button"
                onClick={handleClick}
                class={cn(
                    'ease mx-auto block w-fit font-bold transition-colors duration-200 hover:text-primary md:mx-0 md:text-sm xl:text-base',
                    className,
                )}
            >
                {label}
            </button>
        </li>
    );
};

export default NavLink;
