import { outcomeSlides } from '@/lib/data/outcomeSlides';
import { cn } from '@/lib/utils/cn';
import { range } from '@/lib/utils/range';
import { NodeProps } from '@/types/nodeProps';
import { FC, useEffect, useRef, useState } from 'preact/compat';

const SWIPE_THRESHOLD = 50;

const SliderNav: FC<NodeProps<{activeSlide: number}>> = ({ className, activeSlide }) => {
        const [touchStartX, setTouchStartX] = useState<number | null>(null);
    const [visibleSlides, setVisibleSlides] = useState(0);
    const containerRef = useRef<HTMLUListElement | null>(null);


    const handleTouchStart = (e: TouchEvent) => {
        setTouchStartX(e.touches[0].clientX);
    };

    const handleTouchEnd = (e: TouchEvent) => {
        if (touchStartX === null) return;

        const deltaX = e.changedTouches[0].clientX - touchStartX;

        if (Math.abs(deltaX) > SWIPE_THRESHOLD) {
            deltaX > 0 ? handleDecrement() : handleIncrement();
        }
    };

    useEffect(() => {
        const update = () => {
            if (!containerRef.current) return;
            const width = containerRef.current.offsetWidth;
            const slideWidth = window.innerWidth < 380 ? 120 : 170;
            setVisibleSlides(Math.min(4, Math.floor(width / slideWidth)));
        };

        update();
        window.addEventListener('resize', update);
        return () => window.removeEventListener('resize', update);
    }, []);

    const start = Math.max(0, Math.min(activeSlide, 4 - visibleSlides));
    const valid = [0, 1, 2, 3].slice(start, start + visibleSlides);
    return (
        <nav onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
            <ul
                ref={containerRef}
                class="grid"
                style={{
                    gridTemplateColumns: `repeat(${visibleSlides}, 1fr)`,
                }}
            >
                {outcomeSlides.map((slide, idx) => {
                    if (!valid.includes(idx)) return null;

                    return (
                        <SliderBtn
                            key={slide.id}
                            current={activeSlide}
                            label={slide.label}
                            idx={idx}
                            onClick={() => handleClick(idx)}
                        />
                    );
                })}
            </ul>
        </nav>
    );
};

export default SliderNav;

const SliderBtn: FC<{
    current: number;
    label: string;
    idx: number;
    onClick: () => void;
}> = ({ current, label, idx, onClick }) => {
    const active = idx === current;

    return (
        <li class={cn('flex-1')}>
            <button
                onClick={onClick}
                class={cn(
                    'xs:text-base ease rounded-t-[2rem] bg-white p-5 text-sm font-bold transition-colors duration-300',
                    {
                        'bg-muted cursor-default': active,
                    },
                )}
            >
                <span class="mr-2">{`0${idx + 1}`}</span>
                <span class="">{label}</span>
            </button>
        </li>
    );
};

