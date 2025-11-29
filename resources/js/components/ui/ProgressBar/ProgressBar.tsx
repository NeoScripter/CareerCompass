import { NodeProps } from '@/types/nodeProps';
import { FC, useId } from 'preact/compat';

const ProgressBar: FC<NodeProps<{ progress: number }>> = ({
    className,
    progress = 0,
}) => {
    const id = useId(),
        unique = `${id}-line-template`,
        hash = `#${unique}`;
    return (
        <div class="progress-bar">
            <svg overflow="visible" viewBox="0 0 100 2" aria-hidden="true">
                <defs>
                    <path
                        pathLength={100}
                        id={unique}
                        stroke-linecap="round"
                        className="progress-bar__path"
                        d="
                            M 0,0
                            L 100,0
                          "
                    />{' '}
                </defs>
                <use href={hash} class="progress-bar__background" />{' '}
                <use
                    href={hash}
                    style={{ strokeDashoffset: 100 - progress }}
                    class="progress-bar__foreground"
                />{' '}
            </svg>
        </div>
    );
};

export default ProgressBar;
