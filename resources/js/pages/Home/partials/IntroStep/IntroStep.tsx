import { cn } from '@/lib/utils/cn';
import { FC } from 'preact/compat';

const IntroStep: FC<{
    onMouseEnter: () => void;
    onMouseLeave: () => void;
    title: string;
    active: boolean;
    description: string;
    order: number;
}> = ({ title, active, description, order, onMouseEnter, onMouseLeave }) => {
    return (
        <li
            class={cn('intro-step', active && 'intro-step--active')}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            <h4 class="intro-step__title">
                <span
                    class={cn(
                        'intro-step__indicator',
                        active ? 'intro-step__indicator--active' : '',
                    )}
                >
                </span>
                <span class="intro-step__order">{`0${order}`}</span>
                {title}
            </h4>
            <p class="intro-step__description">{description}</p>
        </li>
    );
};

export default IntroStep;
