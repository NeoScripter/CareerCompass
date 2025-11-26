import { cn } from '@/lib/utils/cn';
import { ComponentProps } from 'preact';

function Label({ className, ...props }: ComponentProps<'label'>) {
    return (
        <label
            data-slot="label"
            className={cn('label', className)}
            {...props}
        />
    );
}

export default Label;
