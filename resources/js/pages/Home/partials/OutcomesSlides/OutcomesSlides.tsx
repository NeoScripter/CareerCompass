import BgLoader from '@/components/ui/BgLoader/BgLoader';
import { OutcomeSlide, outcomeSlides } from '@/lib/data/outcomeSlides';
import { cn } from '@/lib/utils/cn';
import { range } from '@/lib/utils/range';
import { NodeProps } from '@/types/nodeProps';
import { FC, useEffect, useState } from 'preact/compat';
import SliderNav from '../SliderNav/SliderNav';

const SWIPE_THRESHOLD = 50;

const OutcomesSlides: FC<NodeProps> = ({ className }) => {
    const [activeSlide, setActiveSlide] = useState(0);

    const [touchStartX, setTouchStartX] = useState<number | null>(null);

    const handleDecrement = () =>
        setActiveSlide((prev) => Math.max(0, prev - 1));

    const handleIncrement = () =>
        setActiveSlide((prev) => Math.min(outcomeSlides.length - 1, prev + 1));

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

    return (
        <div
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            class={cn('outcomes-slides', className)}
        >
            <header class="outcomes-slides__header">
                <SliderLines activeSlide={activeSlide} />

                <SliderNav
                    activeSlide={activeSlide}
                    handleClick={setActiveSlide}
                    handleDecrement={handleDecrement}
                    handleIncrement={handleIncrement}
                />

                <SliderDisplay
                    outcome={outcomeSlides[activeSlide]}
                    activeSlide={activeSlide}
                />
            </header>
        </div>
    );
};

export default OutcomesSlides;

const SliderDisplay: FC<{ outcome: OutcomeSlide; activeSlide: number }> = ({
    outcome,
    activeSlide,
}) => {
    const [visibleSlides, setVisibleSlides] = useState(2);

    useEffect(() => {
        const handler = (e: Event) => {
            const custom = e as CustomEvent<{ slides: number }>;
            setVisibleSlides(custom.detail.slides);
        };

        document.addEventListener('visibleSlidesChange', handler);
        return () =>
            document.removeEventListener('visibleSlidesChange', handler);
    });

    const isLast = activeSlide === 3;
    let isFirst = activeSlide !== 3;

    if (visibleSlides === 3) isFirst = activeSlide <= 1;
    else if (visibleSlides === 4) isFirst = activeSlide === 0;

    return (
        <div
            key={`slide-${activeSlide}`}
            class={cn('outcomes-slides__card', {
                'outcomes-slides__card--no-right': isLast,
                'outcomes-slides__card--no-left': isFirst,
            })}
        >
            <div class="outcomes-slides__content">
                <h2>{outcome.title}</h2>
                <p>{outcome.description}</p>
            </div>

            <BgLoader
                desktop={outcome.desktop}
                desktopSm={outcome.desktopTiny}
                tablet={outcome.tablet}
                tabletSm={outcome.tabletTiny}
                mobile={outcome.mobile}
                mobileSm={outcome.mobileTiny}
                alt={outcome.alt}
                mbMinWidth={500}
                className="outcomes-slides__image"
            />
        </div>
    );
};

const SliderLine: FC<{ active: boolean }> = ({ active }) => (
    <div
        class={cn(
            'outcomes-slides__line',
            active && 'outcomes-slides__line--active',
        )}
    />
);

const SliderLines: FC<{ activeSlide: number }> = ({ activeSlide }) => (
    <div class="outcomes-slides__lines">
        {range(0, 3).map((slide) => (
            <SliderLine active={slide === activeSlide} />
        ))}
    </div>
);
