import { cn } from '@/lib/utils/cn';
import { useState } from 'preact/hooks';
import ShowInputBtn from './show-input-btn';

export default function PasswordInput({
    className,
    ...props
}: React.ComponentProps<'input'>) {
    const [showInput, setShowInput] = useState(false);

    return (
        <div className={cn('relative', className)}>
            <input
                type={showInput ? 'text' : 'password'}
                data-slot="input"
                className={cn(
                    'flex h-12 w-full min-w-0 rounded-full bg-gray-200 px-4 py-1 text-center text-sm shadow-xs transition-[color,box-shadow] outline-none placeholder:text-gray-500 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
                    'focus-visible:border-ring focus-visible:ring-[1px] focus-visible:ring-gray-600/20',
                    'aria-invalid:border-red-600 aria-invalid:ring-red-600/20',
                    className,
                )}
                {...props}
            />
            <ShowInputBtn
                showInput={showInput}
                onClick={() => setShowInput((o) => !o)}
            />
        </div>
    );
}
