import SecondaryHeading from '@/components/ui/secondary-heading';
import AppSection from '@/layouts/partials/app-section';
import OutcomesSlides from './outcomes-slides';

const OutcomesSection = () => {
    return (
        <AppSection id='result'>
            <div class="mb-11 sm:mb-20 sm:flex sm:items-end sm:gap-4 xl:mb-21">
                <SecondaryHeading className="sm:max-w-[45%] sm:flex-1">
                    Что вы получите после прохождения теста
                </SecondaryHeading>

                <p class="sm:flex-1">
                    Каждый отчёт формируется с помощью ИИ-анализа, что делает
                    результат максимально точным и индивидуальным.
                </p>
            </div>

            <OutcomesSlides />
        </AppSection>
    );
};

export default OutcomesSection;
