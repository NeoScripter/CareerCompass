import { cn } from '@/lib/utils/cn';
import { FC } from 'preact/compat';

const BurgerMenu: FC<{
    onClick: () => void;
    show: boolean;
}> = ({ onClick, show }) => {
    return (
        <button
            onClick={onClick}
            id="burger-menu"
            class={cn('BurgerMenu', { open: show })}
        >
            <svg
                class="icon"
                viewBox="0 0 36 36"
                xmlns="http://www.w3.org/2000/svg"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <path
                    class={cn('line', show ? 'burger-open line-top-open' : 'burger-close line-top')}
                    d="M0 18h36"
                />
                <path
                    class={cn('line-middle', show && 'hidden')}
                    d="M0 18h36"
                />
                <path
                    class={cn(
                        'line',
                        show ? 'line-bottom-open burger-open' : 'burger-close line-bottom',
                    )}
                    d="M0 18h36"
                />
            </svg>
        </button>
    );
};

export default BurgerMenu;
