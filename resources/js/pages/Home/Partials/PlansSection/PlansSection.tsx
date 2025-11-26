import AppSection from '@/layouts/Partials/AppSection/AppSection';
import Plans from '../Plans/Plans';

const PlansSection = () => {
    return (
        <AppSection id="plans" className="plans-section">
            <h2 className="plans-section__title">Выберите свой путь</h2>
            <p class="plans-section__text">
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
