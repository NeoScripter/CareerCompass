import SecondaryHeading from '@/components/ui/secondary-heading';
import AppSection from '@/layouts/partials/app-section';

const PlansSection = () => {
    return (
        <AppSection className="mb-11 sm:mb-20 xl:mb-21">
            <SecondaryHeading className="mx-auto text-center text-balance md:max-w-1/2">
                Выберите свой путь
            </SecondaryHeading>

            <p class="mx-auto text-center text-balance md:max-w-1/2">
                Каждый человек уникален — поэтому мы создали три формата теста,
                чтобы вы могли выбрать именно тот уровень анализа, который нужен
                вам. Наш ИИ-тест адаптируется под любую цель и глубину
                погружения.
            </p>
        </AppSection>
    );
};

export default PlansSection;
