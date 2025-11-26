import SecondaryHeading from '@/components/ui/secondary-heading';
import AppSection from '@/layouts/partials/AppSection/AppSection';
import OutcomesSlides from '../OutcomesSlides/OutcomesSlides';

const OutcomesSection = () => {
    return (
        <AppSection id="result" className="outcomes-section">
            <div class="outcomes-section__header">
                <SecondaryHeading className="outcomes-section__heading">
                    Что вы получите после прохождения теста
                </SecondaryHeading>

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
