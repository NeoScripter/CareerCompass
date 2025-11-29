import { Button } from '@/components/ui/Button/Button';
import { Question as QuestionType } from '@/types/model';
import { router } from '@inertiajs/react';
import { ChevronLeft, ChevronRight } from 'lucide-preact';
import { FC } from 'react-dom/src';

const QuestionNav: FC<{
    question: QuestionType;
    selectedAnswer: string | null;
}> = ({ question, selectedAnswer }) => {
    const handleNextQuestion = () => {
        if (selectedAnswer == null) return;

        router.visit(route('questions.update', question.id), {
            method: 'patch',
            data: { answer: selectedAnswer },
            preserveScroll: true,
        });
    };

    const handlePrevQuestion = () => {
        if (question.number === 1) return;

        router.visit(route('questions.destroy', question.id), {
            method: 'delete',
            preserveScroll: true,
        });
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

            <Button
                onClick={handleNextQuestion}
                disabled={selectedAnswer == null}
                className="button primary question-nav__button"
            >
                <ChevronRight class="question-nav__button--next" />
            </Button>
        </nav>
    );
};

export default QuestionNav;
