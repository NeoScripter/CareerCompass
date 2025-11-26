import { cn } from '@/lib/utils/cn';
import { ComponentProps } from 'preact';

export default function Input({
    className,
    type,
    ...props
}: ComponentProps<'input'>) {
    return (
        <input
            type={type}
            data-slot="input"
            className={cn('input', className)}
            {...props}
        />
    );
}
