import DesktopBgSm from '@/assets/images/home/hero/hero-dk-tiny.webp';
import DesktopBg from '@/assets/images/home/hero/hero-dk.webp';
import MobileBgSm from '@/assets/images/home/hero/hero-mb-tiny.webp';
import MobileBg from '@/assets/images/home/hero/hero-mb.webp';
import TabletBgSm from '@/assets/images/home/hero/hero-tablet-tiny.webp';
import TabletBg from '@/assets/images/home/hero/hero-tablet.webp';
import BgLoader from '@/components/ui/BgLoader/BgLoader';
import { Button } from '@/components/ui/Button/Button';
import AppSection from '@/layouts/partials/AppSection/AppSection';
import scrollToSection from '@/lib/utils/scrollToSection';

const HeroSection = () => {
    return (
        <AppSection className="hero-section">
            <BgLoader
                desktop={DesktopBg}
                desktopSm={DesktopBgSm}
                tablet={TabletBg}
                tabletSm={TabletBgSm}
                mobile={MobileBg}
                mobileSm={MobileBgSm}
                className="background"
                mbMinWidth={570}
            />
            <div class="content">
                <h1 class="title">Найди свое призвание</h1>
                <p class="description">
                    Пройдите быстрый тест на профориентацию с искусственным
                    интеллектом и узнайте, кем вам действительно стоит стать.
                    ИИ-алгоритм анализирует ваши ответы, выявляет сильные
                    стороны личности и подбирует подходящие профессии.{' '}
                </p>
            </div>
            <div>
                <Button
                    onClick={() => scrollToSection('#plans')}
                    as="button"
                    type="button"
                    className="primary cta-button"
                >
                    Пройти тест
                </Button>
            </div>
        </AppSection>
    );
};

export default HeroSection;
