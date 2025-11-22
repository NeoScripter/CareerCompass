import Reason1 from '@/assets/images/home/reasons/reason-1.webp';
import Reason1Tiny from '@/assets/images/home/reasons/reason-1-tiny.webp';
import Reason2 from '@/assets/images/home/reasons/reason-2.webp';
import Reason2Tiny from '@/assets/images/home/reasons/reason-2-tiny.webp';
import Reason3 from '@/assets/images/home/reasons/reason-3.webp';
import Reason3Tiny from '@/assets/images/home/reasons/reason-3-tiny.webp';
import Reason4 from '@/assets/images/home/reasons/reason-4.webp';
import Reason4Tiny from '@/assets/images/home/reasons/reason-4-tiny.webp';

export type ReasonType = {
    id: string;
    description: string;
    img: string;
    tinyImg: string;
    alt: string;
}

export const reasons: ReasonType[] = [
    {
        id: crypto.randomUUID(),
        description: 'Определить, какие профессии подходят именно вам',
        img: Reason1,
        tinyImg: Reason1Tiny,
        alt: 'Зелёная прозрачная волшебная шляпа на тёмном фоне'
    },
    {
        id: crypto.randomUUID(),
        description: 'Понять свои личностные особенности и сильные стороны',
        img: Reason2,
        tinyImg: Reason2Tiny,
        alt: 'прозрачные зелёные детали пазла'
    },
    {
        id: crypto.randomUUID(),
        description: 'Избежать ошибок при выборе направления обучения или смене карьеры',
        img: Reason3,
        tinyImg: Reason3Tiny,
        alt: 'прозрачная зелёная клавиша delete с стрелкой'
    },
    {
        id: crypto.randomUUID(),
        description: 'Построить осознанный карьерный путь, соответствующий вашим интересам и потенциалу',
        img: Reason4,
        tinyImg: Reason4Tiny,
        alt: 'прозрачные зелёные ступени из стеклоподобного материала'
    },
]
