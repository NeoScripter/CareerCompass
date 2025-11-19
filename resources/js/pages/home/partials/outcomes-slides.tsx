import { outcomeSlides } from '@/lib/data/outcomeSlides';
import { cn } from '@/lib/utils/cn';
import { range } from '@/lib/utils/range';
import { NodeProps } from '@/types/nodeProps';
import { FC, useState } from 'preact/compat';

const OutcomesSlides: FC<NodeProps> = ({ className }) => {
    const [activeSlide, setActiveSlide] = useState(0);

    const handleClick = (idx: number) => {
        setActiveSlide(idx);
    }

    return (
        <div class={cn('', className)}>
            <header>
                <div class="mb-5 flex items-center justify-between gap-1">
                    {range(0, 3).map((slide) => (
                        <SliderLine active={slide === activeSlide} />
                    ))}
                </div>

                <nav>
                    <ul class="flex items-center">
                        {outcomeSlides.map((slide, idx) => (
                            <SliderBtn
                                key={slide.id}
                                current={activeSlide}
                                label={slide.label}
                                idx={idx}
                                onClick={() => handleClick(idx)}
                            />
                        ))}
                    </ul>
                </nav>
            </header>
        </div>
    );
};

export default OutcomesSlides;

const SliderBtn: FC<{ current: number; label: string; idx: number, onClick: () => void }> = ({
    current,
    label,
    idx,
    onClick,
}) => {
    const active = idx === current;

    return (
        <li class={cn('flex-1')}>
            <button
                onClick={onClick}
                class={cn(
                    'flex bg-white items-start gap-2 text-sm rounded-t-[2rem] p-4 font-bold',
                    {
                        'bg-muted cursor-default' : active,
                    }
                )}
            >
                <span>{`0${idx + 1}`}</span>
                <span>{label}</span>
            </button>
        </li>
    );
};

const SliderLine: FC<{ active: boolean }> = ({ active }) => {
    return (
        <div
            class={cn(
                'h-1 flex-1 rounded-full',
                active ? 'bg-foreground' : 'bg-gray-300',
            )}
        />
    );
};
