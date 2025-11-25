import scrollToSection from '@/lib/utils/scrollToSection';
import { NodeProps } from '@/types/nodeProps';
import { router } from '@inertiajs/react';
import { FC } from 'preact/compat';

const NavLink: FC<NodeProps<{ href: string; label: string }>> = ({
    href,
    className = '',
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
        <li class="nav-link">
            <button
                type="button"
                onClick={handleClick}
                class={`link ${className}`.trim()}
            >
                {label}
            </button>
        </li>
    );
};

export default NavLink;
