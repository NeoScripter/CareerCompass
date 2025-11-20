import BgLoader from '@/components/ui/bg-loader';
import SecondaryHeading from '@/components/ui/secondary-heading';
import { OutcomeSlide, outcomeSlides } from '@/lib/data/outcomeSlides';
import { cn } from '@/lib/utils/cn';
import { range } from '@/lib/utils/range';
import { NodeProps } from '@/types/nodeProps';
import { FC, useState } from 'preact/compat';
import SliderNav from './slider-nav';

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

                <SliderDisplay outcome={outcomeSlides[activeSlide]} />
            </header>
        </div>
    );
};

export default OutcomesSlides;

const SliderDisplay: FC<{ outcome: OutcomeSlide }> = ({ outcome }) => {
    return (
        <div class="bg-muted rounded-b-[2rem] px-5 py-7.5 md:flex md:items-start md:gap-6 justify-between lg:gap-10 md:px-7.5 md:pt-15 lg:px-15 lg:pb-15 xl:gap-14 lg:pt-20 xl:px-13 xl:pt-25">
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
                className="static z-5 rounded-[2rem] max-h-150 sm:basis-[60%] sm:shrink-0"
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
