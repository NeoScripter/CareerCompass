import { cn } from '@/lib/utils/cn';
import { Checkbox as LibCheckbox, Field, Label } from '@headlessui/react';
import { ComponentChildren } from 'preact';

type CheckboxProps = {
    checked: boolean | undefined;
    onChange: ((checked: boolean) => void) | undefined;
    labelClassName?: string;
    checkboxClassName?: string;
    children: ComponentChildren;
    error?: string;
};

export default function Checkbox({
    checked,
    onChange,
    labelClassName,
    checkboxClassName,
    children,
    error,
}: CheckboxProps) {
    return (
        <div>
            <Field className={cn('flex items-center gap-4', labelClassName)}>
                <LibCheckbox
                    checked={checked}
                    onChange={onChange}
                    className={cn(
                        'group block size-12 shrink-0 cursor-pointer rounded-sm bg-white data-checked:bg-bright-salad',
                        checkboxClassName,
                    )}
                >
                    {/* Checkmark icon */}
                    <svg
                        className="stroke-white opacity-0 group-data-checked:opacity-100"
                        viewBox="0 0 14 14"
                        fill="none"
                    >
                        <path
                            transform="translate(0, -1)"
                            d="M3 8L6 11L11 5.5"
                            strokeWidth={1}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </LibCheckbox>
                <Label className="flex items-center flex-wrap gap-1.5 w-full">{children}</Label>
            </Field>
            {error != null && (
                <div className="mt-2 px-2 text-sm text-red-500 md:text-base">
                    {error}
                </div>
            )}{' '}
        </div>
    );
}

