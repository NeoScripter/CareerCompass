import DesktopTiny from '@/assets/images/test/questions/test-bg-dk-tiny.webp';
import Desktop from '@/assets/images/test/questions/test-bg-dk.webp';
import MobileTiny from '@/assets/images/test/questions/test-bg-mb-tiny.webp';
import Mobile from '@/assets/images/test/questions/test-bg-mb.webp';
import TabletTiny from '@/assets/images/test/questions/test-bg-tablet-tiny.webp';
import Tablet from '@/assets/images/test/questions/test-bg-tablet.webp';
import BgLoader from '@/components/ui/BgLoader/BgLoader';
import { Button } from '@/components/ui/Button/Button';
import TestLayout from '@/layouts/TestLayout/TestLayout';
import { cn } from '@/lib/utils/cn';
import { router } from '@inertiajs/react';
import css from './Test.module.scss';

const Test = () => {
    const { testId } = route().params;

    const handleClick = () => {
        router.visit(route('home'), { method: 'get', preserveScroll: true });
    };

    return (
        <TestLayout onClick={handleClick}>
            <BgLoader
                mobile={Mobile}
                mobileSm={MobileTiny}
                tablet={Tablet}
                tabletSm={TabletTiny}
                desktop={Desktop}
                desktopSm={DesktopTiny}
                mbMinWidth={570}
                className={css.bgImage}
                fit={css.bgImageFit}
                pos={css.bgImagePos}
            />
            <div class={css.body}>
                <h1 class={css.heading}>Тест на профориентацию</h1>
                <p class={css.description}>
                    Отвечайте честно на вопросы — нет правильных или
                    неправильных ответов. Результат формируется с помощью
                    искусственного интеллекта и адаптируется под ваш тип
                    личности. После завершения вы получите подробный отчёт с
                    анализом и рекомендациями.
                </p>
                <Button
                    as="link"
                    href={route('test.questions', testId)}
                    className={cn(css.button, 'button primary')}
                >
                    Начать тест
                </Button>
                {import.meta.env.DEV && (
                    <Button
                        as="link"
                        href={route('test.magic', testId)}
                        method="patch"
                        className={cn(css.button, 'button primary')}
                    >
                        Do in one click
                    </Button>
                )}
            </div>
        </TestLayout>
    );
};

export default Test;
