import DesktopBgSm from '@/assets/images/home/hero/hero-dk-tiny.webp';
import DesktopBg from '@/assets/images/home/hero/hero-dk.webp';
import MobileBgSm from '@/assets/images/home/hero/hero-mb-tiny.webp';
import MobileBg from '@/assets/images/home/hero/hero-mb.webp';
import TabletBgSm from '@/assets/images/home/hero/hero-tablet-tiny.webp';
import TabletBg from '@/assets/images/home/hero/hero-tablet.webp';
import BgLoader from '@/components/ui/BgLoader/BgLoader';
import { Button } from '@/components/ui/Button/Button';
import AppSection from '@/layouts/partials/AppSection/AppSection';
import { cn } from '@/lib/utils/cn';
import scrollToSection from '@/lib/utils/scrollToSection';
import { Test } from '@/types/model';
import { router, usePage } from '@inertiajs/react';
import css from './HeroSection.module.scss';

const HeroSection = () => {
    const { auth } = usePage<{
        auth: {
            latestIncompleteTest: Test | null;
        };
    }>().props;

    const handleClick = () => {
        if (auth.latestIncompleteTest != null) {
            router.visit(route('test.show', auth.latestIncompleteTest.id));
        } else {
            scrollToSection('#plans');
        }
    };

    return (
        <AppSection className={css.heroSection}>
            <BgLoader
                desktop={DesktopBg}
                desktopSm={DesktopBgSm}
                tablet={TabletBg}
                tabletSm={TabletBgSm}
                mobile={MobileBg}
                mobileSm={MobileBgSm}
                className={css.background}
                fit={css.backgroundFit}
                pos={css.backgroundPos}
                mbMinWidth={570}
            />
            <div class={css.content}>
                <h1 class={css.title}>Найди свое призвание</h1>
                <p class={css.description}>
                    Пройдите быстрый тест на профориентацию, а ИИ-алгоритм
                    подберет для вас самые подходящие профессии и расскажет о
                    вас все!
                </p>
            </div>
            <div>
                <Button
                    onClick={handleClick}
                    as="button"
                    type="button"
                    className={cn(css.ctaButton, 'button primary')}
                >
                    Пройти тест
                </Button>
            </div>
        </AppSection>
    );
};

export default HeroSection;
