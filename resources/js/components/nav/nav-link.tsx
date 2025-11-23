import { cn } from '@/lib/utils/cn';
import scrollToSection from '@/lib/utils/scrollToSection';
import { NodeProps } from '@/types/nodeProps';
import { FC } from 'preact/compat';

const NavLink: FC<NodeProps<{ href: string; label: string }>> = ({
    href,
    className,
    label,
}) => {
    return (
        <li>
            <button
                type='button'
                onClick={() =>
                    scrollToSection(`#${href}`)
                }
                class={cn(
                    'ease mx-auto block w-fit font-bold transition-colors duration-200 hover:text-lime-500 md:mx-0 md:text-sm lg:text-base xl:text-xl',
                    className,
                )}
            >
                {label}
            </button>
        </li>
    );
};

export default NavLink;
