import { cn } from '@/lib/utils/cn';
import { useState } from 'preact/hooks';
import ShowInputBtn from '../ShowInputBtn/ShowInputBtn';

export default function PasswordInput({
    className,
    ...props
}: React.ComponentProps<'input'>) {
    const [showInput, setShowInput] = useState(false);

    return (
        <div className={cn('password-input', className)}>
            <input
                type={showInput ? 'text' : 'password'}
                data-slot="input"
                className="password-input__field"
                {...props}
            />
            <ShowInputBtn
                showInput={showInput}
                onClick={() => setShowInput((o) => !o)}
            />
        </div>
    );
}
