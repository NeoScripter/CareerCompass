import AppSection from '@/layouts/Partials/AppSection/AppSection';
import OutcomesSlides from '../OutcomesSlides/OutcomesSlides';

const OutcomesSection = () => {
    return (
        <AppSection id="result" className="outcomes-section">
            <div class="outcomes-section__header">
                <h2 className="outcomes-section__heading">
                    Что вы получите после прохождения теста
                </h2>

                <p class="outcomes-section__description">
                    Каждый отчёт формируется с помощью ИИ-анализа, что делает
                    результат максимально точным и индивидуальным.
                </p>
            </div>

            <OutcomesSlides />
        </AppSection>
    );
};

export default OutcomesSection;
