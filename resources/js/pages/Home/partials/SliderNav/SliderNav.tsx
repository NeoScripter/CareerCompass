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
            class={cn('slider-nav', className)}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
        >
            <ul
                ref={containerRef}
                class="slider-nav__list"
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
        <li class="slider-nav__item">
            <button
                onClick={onClick}
                class={cn('slider-nav__button', {
                    'slider-nav__button--active': active,
                })}
            >
                <span class="slider-nav__number">{`0${idx + 1}`}</span>
                <span class="slider-nav__label">{label}</span>
            </button>

            <span
                aria-hidden="true"
                class={cn('slider-nav__edge slider-nav__edge--right', {
                    'slider-nav__edge--visible': active,
                })}
            >
                <span class="slider-nav__edge-inner" />
            </span>
            <span
                aria-hidden="true"
                class={cn('slider-nav__edge slider-nav__edge--left', {
                    'slider-nav__edge--visible': active,
                })}
            >
                <span class="slider-nav__edge-inner" />
            </span>
        </li>
    );
};
