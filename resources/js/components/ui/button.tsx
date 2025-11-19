import { Link } from '@inertiajs/react';
import type { ComponentChildren } from 'preact';

type ButtonVariant = 'primary' | 'secondary' | 'neutral';

type ButtonProps = {
    as?: 'button' | 'a' | 'link';
    href?: string;
    variant?: ButtonVariant;
    class?: string;
    children: ComponentChildren;
    [key: string]: unknown;
};

const baseClass =
    'flex items-center justify-center rounded-full font-bold transition-all duration-250 ease focus:outline-none';

const variants: Record<ButtonVariant, string> = {
    primary:
        'px-[4.375em] py-[0.75em] lg:px-[7.3em] lg:py-[1.15em] bg-primary hover:bg-foreground hover:text-white focus-within:bg-foreground focus-wihtin:text-white',
    secondary:
        'bg-foreground text-white hover:text-foreground focus-within:text-foreground hover:bg-primary focus-within:bg-primary px-[1.5em] py-[0.75em] lg:px-[3.5em] lg:py-[1em]',
    neutral: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
};

export function Button({
    as = 'button',
    variant = 'primary',
    class: className = '',
    children,
    href,
    ...rest
}: ButtonProps) {
    const classes = `${baseClass} ${variants[variant]} ${className}`.trim();

    if (as === 'a') {
        return (
            <a class={classes} href={href} {...rest}>
                {children}
            </a>
        );
    }

    if (as === 'link') {
        return (
            <Link class={classes} href={href} {...rest}>
                {children}
            </Link>
        );
    }

    return (
        <button class={classes} {...rest}>
            {children}
        </button>
    );
}
