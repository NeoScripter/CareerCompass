import { Button } from '@/components/ui/Button/Button';
import { Question as QuestionType } from '@/types/model';
import { router, usePage } from '@inertiajs/react';
import { ChevronLeft } from 'lucide-preact';
import { FC } from 'preact/compat';

const QuestionNav: FC<{
    question: QuestionType;
    selectedAnswer: string | null;
    showDialog: () => void;
}> = ({ question, selectedAnswer, showDialog }) => {
    const { testId } = route().params;

    const { total } = usePage<{
        total: number;
    }>().props;

    const showFinishBtn = question.number === total;

    const handlePrevQuestion = () => {
        if (question.number === 1) return;

        router.visit(
            route('test.questions.destroy', {
                testId: testId,
                question: question.id,
            }),
            {
                method: 'delete',
                preserveScroll: true,
            },
        );
    };

    return (
        <nav class="question-nav">
            <Button
                onClick={handlePrevQuestion}
                disabled={question.number === 1}
                className="button primary question-nav__button"
            >
                <ChevronLeft class="question-nav__button--prev" />
            </Button>

            {showFinishBtn && (
                <Button
                    onClick={showDialog}
                    disabled={selectedAnswer == null}
                    className="button primary"
                >
                    Завершить
                </Button>
            )}
        </nav>
    );
};

export default QuestionNav;
