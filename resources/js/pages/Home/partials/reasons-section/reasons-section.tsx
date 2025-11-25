import SecondaryHeading from '@/components/ui/secondary-heading';
import AppSection from '@/layouts/partials/AppSection/AppSection';
import Reasons from '../reasons/reasons';

const ReasonsSection = () => {
    return (
        <AppSection id="prof" className="mb-11 sm:mb-20 xl:mb-21">
            <SecondaryHeading className="mx-auto text-center text-balance md:max-w-2/3">
                Зачем проходить тест на профориентацию?
            </SecondaryHeading>

            <p class="mx-auto text-center md:max-w-2/3 lg:max-w-1/2 test">
                Выбор профессии — одно из самых важных решений в жизни. ИИ-тест
                на профориентацию помогает:
            </p>

            <Reasons />

            <p class="mx-auto text-center md:max-w-2/3 lg:max-w-1/2">
                Наш тест профориентации на основе искусственного интеллекта
                подходит школьникам, студентам и взрослым, которые хотят сменить
                профессию.
            </p>
        </AppSection>
    );
};

export default ReasonsSection;
