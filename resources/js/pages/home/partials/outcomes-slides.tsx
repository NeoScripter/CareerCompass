import { outcomeSlides } from '@/lib/data/outcomeSlides';
import { cn } from '@/lib/utils/cn';
import { range } from '@/lib/utils/range';
import { NodeProps } from '@/types/nodeProps';
import { FC, useEffect, useRef, useState } from 'preact/compat';

const SWIPE_THRESHOLD = 50;

const OutcomesSlides: FC<NodeProps> = ({ className }) => {
    const [activeSlide, setActiveSlide] = useState(0);
    const [touchStartX, setTouchStartX] = useState<number | null>(null);
    const [visibleSlides, setVisibleSlides] = useState(0);
    const containerRef = useRef<HTMLUListElement | null>(null);

    const handleClick = (idx: number) => {
        setActiveSlide(idx);
    };

    const handleDecrement = () => {
        setActiveSlide((prev) => (prev === 0 ? 0 : prev - 1));
    };

    const handleIncrement = () => {
        setActiveSlide((prev) =>
            prev === outcomeSlides.length - 1
                ? outcomeSlides.length - 1
                : prev + 1,
        );
    };

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
        <div class={className}>
            <header>
                <div class="mb-5 flex items-center justify-between gap-1 sm:hidden">
                    {range(0, 3).map((slide) => (
                        <SliderLine active={slide === activeSlide} />
                    ))}
                </div>

                <nav
                    onTouchStart={handleTouchStart}
                    onTouchEnd={handleTouchEnd}
                >
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
            </header>
        </div>
    );
};

export default OutcomesSlides;

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
                    'xs:text-base rounded-t-[2rem] transition-colors duration-300 ease bg-white p-5 text-sm font-bold',
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
