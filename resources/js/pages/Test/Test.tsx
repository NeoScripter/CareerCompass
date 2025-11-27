import DesktopTiny from '@/assets/images/test/questions/test-bg-dk-tiny.webp';
import Desktop from '@/assets/images/test/questions/test-bg-dk.webp';
import MobileTiny from '@/assets/images/test/questions/test-bg-mb-tiny.webp';
import Mobile from '@/assets/images/test/questions/test-bg-mb.webp';
import TabletTiny from '@/assets/images/test/questions/test-bg-tablet-tiny.webp';
import Tablet from '@/assets/images/test/questions/test-bg-tablet.webp';
import BgLoader from '@/components/ui/BgLoader/BgLoader';
import { Button } from '@/components/ui/Button/Button';
import TestLayout from '@/layouts/TestLayout/TestLayout';

const Test = () => {
    return (
        <TestLayout>
            <BgLoader
                mobile={Mobile}
                mobileSm={MobileTiny}
                tablet={Tablet}
                tabletSm={TabletTiny}
                desktop={Desktop}
                desktopSm={DesktopTiny}
                mbMinWidth={570}
                className="test__bg-image"
                fit="test__bg-image--fit"
                pos="test__bg-image--pos"
            />
            <div class="test__body">
                <h1 class="test__heading">Тест на профориентацию</h1>
                <p class="test__description">
                    Отвечайте честно на вопросы — нет правильных или неправильных
                    ответов. Результат формируется с помощью искусственного
                    интеллекта и адаптируется под ваш тип личности. После
                    завершения вы получите подробный отчёт с анализом и
                    рекомендациями.
                </p>
                <Button className="button primary test__button">Начать тест</Button>
            </div>
        </TestLayout>
    );
};

export default Test;
