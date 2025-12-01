import AppFooter from '@/layouts/partials/AppFooter/AppFooter';
import { TestResult } from '@/types/testResult';
import { usePage } from '@inertiajs/react';
import BestJob from './partials/BestJob/BestJob';
import ChartList from './partials/ChartList/ChartList';
import ResultCards from './partials/ResultCards/ResultCards';
import ResultHero from './partials/ResultHero/ResultHero';
import ResultIntro from './partials/ResultIntro/ResultIntro';
import ResultJobs from './partials/ResultJobs/ResultJobs';
import ResultList from './partials/ResultList/ResultList';
import Summary from './partials/Summary/Summary';
import css from './Result.module.scss';

const Result = () => {
    const { result } = usePage<{ result: TestResult }>().props;

    console.log(result);
    return (
        <div class={css.layout}>
            <ResultHero />
            <ResultIntro
                summary={result.personalityDescription}
                items={result.personalityItems}
            />

            <ResultJobs jobs={result.jobs} />

            <ChartList
                heading="Характеристики личности"
                charts={result.charts}
            />
            <ChartList heading="Сильные стороны" charts={result.strengths} />
            <ChartList heading="Слабые стороны" charts={result.weaknesses} />
            <Summary summary={result.summary} />

            <BestJob job={result.bestJob} />

            <ResultList
                title="Рекомендации для достижения выбранной профессии"
                items={result.jobAdvice}
            />

            <ResultList
                title="Рекомендации по личностному росту и усилению слабых сторон"
                items={result.improvementAdvice}
            />

            <ResultCards />

            <AppFooter />
        </div>
    );
};

export default Result;
