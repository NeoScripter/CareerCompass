import { TestResult } from '@/types/testResult';
import { usePage } from '@inertiajs/react';
import ResultHero from './partials/ResultHero/ResultHero';
import ResultIntro from './partials/ResultIntro/ResultIntro';

const Result = () => {
    const { result } = usePage<{ result: TestResult }>().props;

    console.log(result);
    return (
        <div class="result__layout">
            <ResultHero />
            <ResultIntro
                summary={result.personalityDescription}
                items={result.personalityItems}
            />
        </div>
    );
};

export default Result;
