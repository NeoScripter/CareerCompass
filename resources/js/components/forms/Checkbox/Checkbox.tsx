import { cn } from '@/lib/utils/cn';
import { Field, Label, Checkbox as LibCheckbox } from '@headlessui/react';
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
        <div className="checkbox">
            <Field className={cn('checkbox__field', labelClassName)}>
                <LibCheckbox
                    checked={checked}
                    onChange={onChange}
                    className={cn('checkbox__input', checkboxClassName)}
                >
                    <svg
                        className="checkbox__icon"
                        viewBox="0 0 14 14"
                        fill="none"
                        overflow="visible"
                    >
                        <path
                            transform="translate(0, -1)"
                            d="M3 5 L6 10 L14 0"
                            strokeWidth={3}
                            strokeLinecap="butt"
                            strokeLinejoin="miter"
                        />
                    </svg>
                </LibCheckbox>
                <Label className="checkbox__label">{children}</Label>
            </Field>
            {error != null && <div className="checkbox__error">{error}</div>}
        </div>
    );
}
