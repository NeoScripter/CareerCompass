import { outcomeSlides } from '@/lib/data/outcomeSlides';
import { cn } from '@/lib/utils/cn';
import { NodeProps } from '@/types/nodeProps';
import { FC, useEffect, useRef, useState } from 'preact/compat';

const SWIPE_THRESHOLD = 50;

const SliderNav: FC<
    NodeProps<{
        activeSlide: number;
        handleIncrement: () => void;
        handleDecrement: () => void;
        handleClick: (arg: number) => void;
    }>
> = ({
    className,
    activeSlide,
    handleDecrement,
    handleIncrement,
    handleClick,
}) => {
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
            const visible = Math.min(4, Math.floor(width / slideWidth));
            setVisibleSlides(visible);

            const event = new CustomEvent('visibleSlidesChange', {
                detail: {
                    slides: visible,
                },
            });
            document.dispatchEvent(event);
        };

        update();
        window.addEventListener('resize', update);
        return () => window.removeEventListener('resize', update);
    }, []);

    const start = Math.max(0, Math.min(activeSlide, 4 - visibleSlides));
    const valid = [0, 1, 2, 3].slice(start, start + visibleSlides);

    return (
        <nav
            class={className}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
        >
            <ul
                ref={containerRef}
                class="grid items-stretch overflow-x-clip"
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
        <li class={cn('relative flex-1')}>
            <button
                onClick={onClick}
                class={cn(
                    'sm:text-base xs:text-sm ease z-25 size-full rounded-t-[2rem] bg-transparent px-2 py-5 text-center text-xs font-bold transition-colors duration-300 sm:px-5 md:text-lg lg:px-[2em] xl:py-7 xl:text-2xl',
                    {
                        'bg-muted cursor-default': active,
                    },
                )}
            >
                <span class="mr-2">{`0${idx + 1}`}</span>
                <span class="z-30">{label}</span>
            </button>

            <span
                aria-hidden="true"
                class={cn(
                    'absolute inset-y-0 left-full -z-15 block w-full transition-all duration-300',
                    active ? 'bg-muted opacity-100' : 'opacity-0',
                )}
            >
                <span class="absolute inset-0 block rounded-bl-[2rem] bg-white" />
            </span>
            <span
                aria-hidden="true"
                class={cn(
                    'absolute inset-y-0 right-full -z-15 block w-full transition-all duration-300',
                    active ? 'bg-muted opacity-100' : 'opacity-0',
                )}
            >
                <span class="absolute inset-0 block rounded-br-[2rem] bg-white" />
            </span>
        </li>
    );
};
