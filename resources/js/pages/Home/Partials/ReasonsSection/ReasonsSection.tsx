import AppSection from '@/layouts/Partials/AppSection/AppSection';
import Reasons from '../Reasons/Reasons';

const ReasonsSection = () => {
    return (
        <AppSection id="prof" className="reasons-section">
            <h2 className="reasons-section__title">
                Зачем проходить тест на профориентацию?
            </h2>
            <p class="reasons-section__text reasons-section__text--intro">
                Выбор профессии — одно из самых важных решений в жизни. ИИ-тест
                на профориентацию помогает:
            </p>
            <Reasons />
            <p class="reasons-section__text">
                Наш тест профориентации на основе искусственного интеллекта
                подходит школьникам, студентам и взрослым, которые хотят сменить
                профессию.
            </p>
        </AppSection>
    );
};

export default ReasonsSection;
