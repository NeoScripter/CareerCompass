import DesktopTiny from '@/assets/images/home/intro/intro-dk-tiny.webp';
import Desktop from '@/assets/images/home/intro/intro-dk.webp';
import MobileTiny from '@/assets/images/home/intro/intro-mb-tiny.webp';
import Mobile from '@/assets/images/home/intro/intro-mb.webp';
import TabletTiny from '@/assets/images/home/intro/intro-tablet-tiny.webp';
import Tablet from '@/assets/images/home/intro/intro-tablet.webp';
import BgLoader from '@/components/ui/BgLoader/BgLoader';
import AppSection from '@/layouts/partials/AppSection/AppSection';
import { introSteps } from '@/lib/data/introSteps';
import { range } from '@/lib/utils/range';
import { useRef, useState } from 'preact/hooks';
import { FC } from 'react-dom/src';
import IntroStep from '../IntroStep/IntroStep';

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
        <AppSection id="about" className="intro-section">
            <h2>Как это работает?</h2>
            <div class="intro-section__container">
                <div class="intro-section__media">
                    <p class="intro-section__description">
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
                        mbMinWidth={570}
                        alt="Зелёная прозрачная извилистая дорога или путь, поднимающаяся сквозь облака"
                        className="intro-section__image"
                    />
                </div>
                <div class="intro-section__content">
                    <div aria-hidden="true" class="intro-section__progress-bar">
                        {range(0, 2).map((step) => (
                            <StepBar
                                key={`step-bar-${step}`}
                                active={step === activeStep}
                            />
                        ))}
                    </div>
                    <ul class="intro-section__steps-list">
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

const StepBar: FC<{ active: boolean }> = ({ active }) => {
    return (
        <div
            class={`intro-section__step-bar ${active ? 'intro-section__step-bar--active' : ''}`}
        />
    );
};
