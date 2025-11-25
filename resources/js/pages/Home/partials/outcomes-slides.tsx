import BgLoader from '@/components/ui/BgLoader/BgLoader';
import SecondaryHeading from '@/components/ui/secondary-heading';
import { OutcomeSlide, outcomeSlides } from '@/lib/data/outcomeSlides';
import { cn } from '@/lib/utils/cn';
import { range } from '@/lib/utils/range';
import { NodeProps } from '@/types/nodeProps';
import { FC, useEffect, useState } from 'preact/compat';
import SliderNav from './SliderNav/SliderNav';

const OutcomesSlides: FC<NodeProps> = ({ className }) => {
    const [activeSlide, setActiveSlide] = useState(0);

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

    return (
        <div class={className}>
            <header>
                <SliderLines activeSlide={activeSlide} />

                <SliderNav
                    activeSlide={activeSlide}
                    handleClick={handleClick}
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
        const handleVisibleSlidesChange = (e: Event) => {
            const custom = e as CustomEvent<{ slides: number }>;
            setVisibleSlides(custom.detail.slides);
        };
        document.addEventListener(
            'visibleSlidesChange',
            handleVisibleSlidesChange,
        );

        return () =>
            document.removeEventListener(
                'visibleSlidesChange',
                handleVisibleSlidesChange,
            );
    });

    let isLast = activeSlide === 3,
        isFirst = activeSlide !== 3;

    if (visibleSlides === 3) {
        isFirst = activeSlide === 0 || activeSlide === 1;
    } else if (visibleSlides === 4) {
        isFirst = activeSlide === 0;
    }

    return (
        <div
            key={`slide-${activeSlide}`}
            class={cn(
                'bg-muted justify-between rounded-[2rem] px-5 py-7.5 md:flex md:items-start md:gap-6 md:px-7.5 display-card md:pt-15 lg:gap-10 lg:px-15 lg:pt-20 lg:pb-15 xl:gap-14 xl:px-13 xl:pt-25',
                {
                    'rounded-tr-none': isLast,
                    'rounded-tl-none': isFirst,
                },
            )}
        >
            <div class="mb-8">
                <SecondaryHeading> {outcome.title} </SecondaryHeading>
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
                className="static z-5 max-h-150 rounded-[2rem] sm:shrink-0 sm:basis-[55%]"
            />
        </div>
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

const SliderLines: FC<{ activeSlide: number }> = ({ activeSlide }) => (
    <div class="mb-5 flex items-center justify-between gap-1 sm:hidden">
        {range(0, 3).map((slide) => (
            <SliderLine active={slide === activeSlide} />
        ))}
    </div>
);
