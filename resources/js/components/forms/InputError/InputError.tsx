import { cn } from '@/lib/utils/cn';
import { HTMLAttributes } from 'preact';

export default function InputError({
    message,
    className = '',
    ...props
}: HTMLAttributes<HTMLParagraphElement> & { message?: string }) {
    return message ? (
        <p {...props} className={cn('input-error', className)}>
            {message}
        </p>
    ) : null;
}
