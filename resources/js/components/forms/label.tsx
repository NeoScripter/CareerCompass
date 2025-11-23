import { cn } from "@/lib/utils/cn";
import { ComponentProps } from "preact";

function Label({
    className,
    ...props
}: ComponentProps<'label'>) {
    return (
        <label
            data-slot="label"
            className={cn(
                'leading-none text-lg text-center font-bold select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50',
                className,
            )}
            {...props}
        />
    );
}

export default Label;
