import Desktop1Tiny from '@/assets/images/home/outcomes/outcomes-1-dk-tiny.webp';
import Desktop1 from '@/assets/images/home/outcomes/outcomes-1-dk.webp';
import Mobile1Tiny from '@/assets/images/home/outcomes/outcomes-1-mb-tiny.webp';
import Mobile1 from '@/assets/images/home/outcomes/outcomes-1-mb.webp';
import Tablet1Tiny from '@/assets/images/home/outcomes/outcomes-1-tablet-tiny.webp';
import Tablet1 from '@/assets/images/home/outcomes/outcomes-1-tablet.webp';

import Desktop2Tiny from '@/assets/images/home/outcomes/outcomes-2-dk-tiny.webp';
import Desktop2 from '@/assets/images/home/outcomes/outcomes-2-dk.webp';
import Mobile2Tiny from '@/assets/images/home/outcomes/outcomes-2-mb-tiny.webp';
import Mobile2 from '@/assets/images/home/outcomes/outcomes-2-mb.webp';
import Tablet2Tiny from '@/assets/images/home/outcomes/outcomes-2-tablet-tiny.webp';
import Tablet2 from '@/assets/images/home/outcomes/outcomes-2-tablet.webp';

import Desktop3Tiny from '@/assets/images/home/outcomes/outcomes-3-dk-tiny.webp';
import Desktop3 from '@/assets/images/home/outcomes/outcomes-3-dk.webp';
import Mobile3Tiny from '@/assets/images/home/outcomes/outcomes-3-mb-tiny.webp';
import Mobile3 from '@/assets/images/home/outcomes/outcomes-3-mb.webp';
import Tablet3Tiny from '@/assets/images/home/outcomes/outcomes-3-tablet-tiny.webp';
import Tablet3 from '@/assets/images/home/outcomes/outcomes-3-tablet.webp';

import Desktop4Tiny from '@/assets/images/home/outcomes/outcomes-4-dk-tiny.webp';
import Desktop4 from '@/assets/images/home/outcomes/outcomes-4-dk.webp';
import Mobile4Tiny from '@/assets/images/home/outcomes/outcomes-4-mb-tiny.webp';
import Mobile4 from '@/assets/images/home/outcomes/outcomes-4-mb.webp';
import Tablet4Tiny from '@/assets/images/home/outcomes/outcomes-4-tablet-tiny.webp';
import Tablet4 from '@/assets/images/home/outcomes/outcomes-4-tablet.webp';

export type OutcomeSlide = {
    id: string;
    label: string;
    title: string;
    description: string;
    desktop: string;
    tablet: string;
    mobile: string;
    desktopTiny: string;
    tabletTiny: string;
    mobileTiny: string;
    alt: string;
};

export const outcomeSlides: OutcomeSlide[] = [
    {
        id: crypto.randomUUID(),
        label: 'Подборка профессий',
        title: 'Подборку профессий',
        desktop: Desktop1,
        tablet: Tablet1,
        mobile: Mobile1,
        desktopTiny: Desktop1Tiny,
        tabletTiny: Tablet1Tiny,
        mobileTiny: Mobile1Tiny,
        description: 'идеально соответствующих твоим личностным качествам.',
        alt: 'Таблица с тремя рекомендованными профессиями: Разработчик программного обеспечения, Аналитик больших данных и Аналитик социальных сетей. Для каждой указан процент соответствия (72%, 70%, 65%), уровень зарплаты (высокая, от 80 000 руб.) и спрос на рынке (высокий).',
    },

    {
        id: crypto.randomUUID(),
        label: 'Подробный анализ',
        title: 'Подробный анализ',
        desktop: Desktop2,
        tablet: Tablet2,
        mobile: Mobile2,
        desktopTiny: Desktop2Tiny,
        tabletTiny: Tablet2Tiny,
        mobileTiny: Mobile2Tiny,
        description: 'ваших сильных и слабых сторон.',
        alt: 'Карточки с графиками сильных и слабых сторон: полосы-индикаторы с процентами, расположенные на ярком зелёном фоне.',
    },
    {
        id: crypto.randomUUID(),
        label: 'Расшифровка характеристик',
        title: 'Расшифровку',
        desktop: Desktop3,
        tablet: Tablet3,
        mobile: Mobile3,
        desktopTiny: Desktop3Tiny,
        tabletTiny: Tablet3Tiny,
        mobileTiny: Mobile3Tiny,
        description: 'ключевых характеристик личности и интеллект-профиля.',
        alt: 'Ноутбук с открытым отчётом: таблица с характеристиками личности, такими как активность, ответственность, саморазвитие и общительность.',
    },
    {
        id: crypto.randomUUID(),
        label: 'Персональные рекомендации',
        title: 'Персональные рекомендации',
        desktop: Desktop4,
        tablet: Tablet4,
        mobile: Mobile4,
        desktopTiny: Desktop4Tiny,
        tabletTiny: Tablet4Tiny,
        mobileTiny: Mobile4Tiny,
        description: 'по развитию и карьерному росту.',
        alt: 'Отчёт о профессиональных рекомендациях: графики, текстовые блоки, круговая диаграмма с результатом 72% и описание подходящей профессии — программист/разработчик.',
    },
];
