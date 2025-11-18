import DesktopBgSm from '@/assets/images/home/hero-dk-tiny.webp';
import DesktopBg from '@/assets/images/home/hero-dk.webp';
import MobileBgSm from '@/assets/images/home/hero-mb-tiny.webp';
import MobileBg from '@/assets/images/home/hero-mb.webp';
import TabletBgSm from '@/assets/images/home/hero-tablet-tiny.webp';
import TabletBg from '@/assets/images/home/hero-tablet.webp';
import BgLoader from '@/components/ui/bg-loader';
import { Button } from '@/components/ui/button';
import AppSection from '@/layouts/partials/app-section';

const HeroSection = () => {
    return (
        <AppSection className="relative isolate min-h-183 p-5 pt-35 md:flex md:aspect-[16/7] md:min-h-0 md:items-end md:justify-between md:pt-0 lg:p-8 xl:p-12">
            <BgLoader
                desktop={DesktopBg}
                desktopSm={DesktopBgSm}
                tablet={TabletBg}
                tabletSm={TabletBgSm}
                mobile={MobileBg}
                mobileSm={MobileBgSm}
                className="bg-muted absolute -inset-6 lg:-inset-10"
                pos="object-bottom-left md:object-bottom"
                fit="object-contain"
            />

            <div class="mx-auto mb-8 max-w-100 md:mx-0 md:mb-0 md:max-w-1/2 xl:max-w-175">
                <h1 class="mb-5 text-5xl font-medium lg:mb-8 lg:text-6xl xl:mb-9 xl:text-7xl">
                    Найди свое призвание
                </h1>
                <p>
                    Пройдите быстрый тест на профориентацию с искусственным
                    интеллектом и узнайте, кем вам действительно стоит стать.
                    ИИ-алгоритм анализирует ваши ответы, выявляет сильные
                    стороны личности и подбирает подходящие профессии.{' '}
                </p>
            </div>

            <div class="mx-auto max-w-100 md:mx-0 md:max-w-full">
                <Button
                    as="button"
                    variant="primary"
                    type="button"
                    class="text-sm lg:text-base xl:text-xl"
                >
                    Пройти тест
                </Button>
            </div>
        </AppSection>
    );
};

export default HeroSection;
