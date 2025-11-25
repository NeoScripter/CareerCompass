import { cn } from '@/lib/utils/cn';
import { Link } from '@inertiajs/react';
import type { ComponentChildren } from 'preact';

type ButtonProps = {
    as?: 'button' | 'a' | 'link';
    href?: string;
    className?: string;
    children: ComponentChildren;
    [key: string]: unknown;
};

export function Button({
    as = 'button',
    className,
    children,
    href,
    ...rest
}: ButtonProps) {
    if (as === 'a') {
        return (
            <a class={cn('button', className)} href={href} {...rest}>
                {children}
            </a>
        );
    }

    if (as === 'link') {
        return (
            <Link class={cn('button', className)} href={href} {...rest}>
                {children}
            </Link>
        );
    }

    return (
        <button class={cn('button', className)} {...rest}>
            {children}
        </button>
    );
}
