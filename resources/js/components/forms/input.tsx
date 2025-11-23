import { cn } from "@/lib/utils/cn";
import { ComponentProps } from "preact";

export default function Input({
    className,
    type,
    ...props
}: ComponentProps<'input'>) {
    return (
        <input
            type={type}
            data-slot="input"
            className={cn(
                'flex h-12 w-full min-w-0 rounded-full bg-gray-200 px-4 py-1 text-center text-sm shadow-xs transition-[color,box-shadow] outline-none placeholder:text-gray-500 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
                'focus-visible:border-ring focus-visible:ring-[1px] focus-visible:ring-gray-600/20',
                'aria-invalid:border-red-600 aria-invalid:ring-red-600/20',
                className,
            )}
            {...props}
        />
    );
}
