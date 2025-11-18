import { cn } from '@/lib/utils/cn';
import { FC } from 'preact/compat';

const AnimatedUnderline: FC<{ className?: string }> = ({ className }) => {
    return (
        <span
            aria-hidden="true"
            class={cn(
                'bg-foreground absolute -bottom-1 left-0 block h-px w-[0%] transition-[width] duration-300 group-hover:w-[100%]',
                className,
            )}
        />
    );
};

export default AnimatedUnderline;
