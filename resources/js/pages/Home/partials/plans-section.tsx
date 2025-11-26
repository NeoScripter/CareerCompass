import AppSection from '@/layouts/partials/AppSection/AppSection';
import Plans from './plans';

const PlansSection = () => {
    return (
        <AppSection id="plans" className="mb-11 sm:mb-20 xl:mb-21">
            <h2 className="mx-auto text-center text-balance md:max-w-1/2">
                Выберите свой путь
            </h2>

            <p class="mx-auto mb-13 text-center sm:mb-15 md:max-w-2/3 lg:mb-20 lg:max-w-1/2 xl:mb-25">
                Каждый человек уникален — поэтому мы создали три формата теста,
                чтобы вы могли выбрать именно тот уровень анализа, который нужен
                вам. Наш ИИ-тест адаптируется под любую цель и глубину
                погружения.
            </p>

            <Plans />
        </AppSection>
    );
};

export default PlansSection;
