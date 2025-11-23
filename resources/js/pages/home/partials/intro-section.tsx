import DesktopTiny from '@/assets/images/home/intro/intro-dk-tiny.webp';
import Desktop from '@/assets/images/home/intro/intro-dk.webp';
import MobileTiny from '@/assets/images/home/intro/intro-mb-tiny.webp';
import Mobile from '@/assets/images/home/intro/intro-mb.webp';
import TabletTiny from '@/assets/images/home/intro/intro-tablet-tiny.webp';
import Tablet from '@/assets/images/home/intro/intro-tablet.webp';
import BgLoader from '@/components/ui/bg-loader';
import SecondaryHeading from '@/components/ui/secondary-heading';
import AppSection from '@/layouts/partials/app-section';
import { introSteps } from '@/lib/data/introSteps';
import { cn } from '@/lib/utils/cn';
import { range } from '@/lib/utils/range';
import { useRef, useState } from 'preact/hooks';
import { FC } from 'react-dom/src';

const IntroSection = () => {
    const [activeStep, setActiveStep] = useState(0);
    const timeoutRef = useRef<number | null>(null);

    const handleMouseEnter = (idx: number) => {
        if (timeoutRef.current != null) {
            clearTimeout(timeoutRef.current);
        }
        setActiveStep(idx);
    };

    const handleMouseLeave = () => {
        timeoutRef.current = setTimeout(() => setActiveStep(0), 400);
    };

    return (
        <AppSection id='about'>
            <SecondaryHeading>Как это работает?</SecondaryHeading>

            <div class="sm:flex sm:items-start sm:gap-5 lg:gap-11 xl:gap-25">
                <div class="mb-10 sm:flex-1">
                    <p class="mb-7.5 sm:mb-9.5 lg:mb-14 xl:mb-12.5">
                        Быстрый онлайн-тест на профориентацию поможет понять,
                        кем стать и куда двигаться.
                    </p>

                    <BgLoader
                        mobile={Mobile}
                        mobileSm={MobileTiny}
                        tablet={Tablet}
                        tabletSm={TabletTiny}
                        desktop={Desktop}
                        desktopSm={DesktopTiny}
                        alt='Зелёная прозрачная извилистая дорога или путь, поднимающаяся сквозь облака'
                        className="static max-h-100 rounded-[2rem] sm:max-h-full"
                    />
                </div>

                <div class="flex items-start sm:max-w-[45%] sm:flex-1">
                    <div
                        aria-hidden="true"
                        class="mt-2 flex h-80 w-0.5 shrink-0 flex-col lg:h-120 lg:w-[3px]"
                    >
                        {range(0, 2).map((step) => (
                            <StepBar
                                key={`step-bar-${step}`}
                                active={step === activeStep}
                            />
                        ))}
                    </div>
                    <ul class="space-y-10 lg:space-y-20">
                        {introSteps.map((step, idx) => (
                            <IntroStep
                                onMouseEnter={() => handleMouseEnter(idx)}
                                onMouseLeave={handleMouseLeave}
                                active={idx === activeStep}
                                key={step.id}
                                title={step.title}
                                order={idx + 1}
                                description={step.description}
                            />
                        ))}
                    </ul>
                </div>
            </div>
        </AppSection>
    );
};

export default IntroSection;

const IntroStep: FC<{
    onMouseEnter: () => void;
    onMouseLeave: () => void;
    title: string;
    active: boolean;
    description: string;
    order: number;
}> = ({ title, active, description, order, onMouseEnter, onMouseLeave }) => {
    return (
        <li onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
            <h4 class="mb-3.5 text-lg font-bold lg:mb-7.5 lg:text-2xl xl:text-3xl">
                <span
                    aria-hidden="true"
                    class={cn(
                        'ease relative mr-3 mb-1.5 inline-block h-0.5 w-5 transition-colors duration-300 lg:h-[3px]',
                        active ? 'bg-primary' : 'bg-foreground',
                    )}
                >
                    {order === 1 && (
                        <span class="absolute -top-0 right-0 -left-4 h-20 -translate-y-full bg-white" />
                    )}
                    {order === 3 && (
                        <span class="absolute right-0 -bottom-0 -left-4 h-20 translate-y-full bg-white" />
                    )}
                </span>
                <span class="mr-3 lg:mr-5">{`0${order}`}</span>
                {title}
            </h4>
            <p class="ml-16 lg:ml-22">{description}</p>
        </li>
    );
};

const StepBar: FC<{ active: boolean }> = ({ active }) => {
    return (
        <div
            class={cn(
                'ease w-full flex-1 transition-colors duration-300',
                active ? 'bg-primary' : 'bg-foreground',
            )}
        />
    );
};
