import { PersonalityItem } from '@/types/testResult';
import { FC } from 'preact/compat';

const ResultIntro: FC<{ summary: string; items: PersonalityItem[] | null }> = ({
    summary,
    items,
}) => {
    return (
        <section class="result-intro">
            <h2>Подробное описание характера</h2>
            <p class="result-intro__description">
                На основе ваших ответов можно выделить следующие черты:
            </p>

            <div class="result-intro__summary">{summary}</div>
        </section>
    );
};

export default ResultIntro;
