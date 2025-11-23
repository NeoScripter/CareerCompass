import { cn } from "@/lib/utils/cn";
import { HTMLAttributes } from "preact";

export default function InputError({
    message,
    className = '',
    ...props
}: HTMLAttributes<HTMLParagraphElement> & { message?: string }) {
    return message ? (
        <p
            {...props}
            className={cn(
                'mt-1 text-red-600 text-center text-sm font-medium text-balance',
                className,
            )}
        >
            {message}
        </p>
    ) : null;
}
