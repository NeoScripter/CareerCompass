import { cn } from '@/lib/utils/cn';
import { NodeProps } from '@/types/nodeProps';
import { FC } from 'preact/compat';
import css from './ProgressIndicator.module.scss';

const ProgressIndicator: FC<NodeProps<{ percent: number }>> = ({
    className,
    percent,
}) => {
    return (
        <figure
            class={cn(css.progressWrapper, className)}
            role="img"
            aria-label={`${percent}% совместимость с профессией`}
        >
            <svg
                viewBox="0 0 240 240"
                fill="none"
                class={css.svgProgress}
                aria-hidden="true"
            >
                <defs>
                    <circle
                        id="path-template"
                        pathLength="99"
                        r="100"
                        cx="120"
                        cy="120"
                    />
                </defs>
                <use href="#path-template" class={css.progressTrack} />
                <use
                    href="#path-template"
                    style={{ '--percent': percent }}
                    class={css.progressIndicator}
                />
            </svg>
            <output class={css.bigNumber} aria-live="polite">
                {percent}%
            </output>
        </figure>
    );
};

export default ProgressIndicator;
