import Checkmark from '@/assets/svgs/question-btn-selected.svg';
import { Button } from '@/components/ui/Button/Button';
import ProgressBar from '@/components/ui/ProgressBar/ProgressBar';
import VisuallyHidden from '@/components/ui/VisuallyHidden/VisuallyHidden';
import TestLayout from '@/layouts/TestLayout/TestLayout';
import { capitalize } from '@/lib/utils/capitalize';
import { cn } from '@/lib/utils/cn';
import { Question as QuestionType } from '@/types/model';
import { router, usePage } from '@inertiajs/react';
import { ChevronLeft, ChevronRight } from 'lucide-preact';
import { useState } from 'preact/hooks';
import { FC } from 'react-dom/src';

const Question = () => {
    const { question, answers, total } = usePage<{
        question: QuestionType;
        answers: string[];
        total: number;
    }>().props;

    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

    const progress = Math.floor((30 / 100) * question.number);

    const handleSelect = (value: string) => {
        setSelectedAnswer(value);
    };

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

    // TODO - popup when trying to leave the page

    return (
        <TestLayout className="question__layout">
            <div class="question__body">
                <div class="question__progress">
                    <span className="question__current">{`${question.number} из ${total}`}</span>
                    <ProgressBar progress={progress} />
                </div>
                <h1 class="question__heading">{question.question}</h1>

                <div class="question__btn-wrapper">
                    <ul class="question__answers">
                        {answers.map((ans) => (
                            <li key={ans}>
                                <AnswerBtn
                                    onClick={() => handleSelect(ans)}
                                    selected={ans === selectedAnswer}
                                    label={ans}
                                />{' '}
                            </li>
                        ))}
                    </ul>
                </div>

                <nav class="question__nav">
                    <Button
                        onClick={handlePrevQuestion}
                        disabled={question.number === 1}
                        className="button primary question__nav-button"
                    >
                        <ChevronLeft class="question__nav-button--prev" />
                    </Button>

                    <Button
                        onClick={handleNextQuestion}
                        disabled={selectedAnswer == null}
                        className="button primary question__nav-button"
                    >
                        <ChevronRight class="question__nav-button--next" />
                    </Button>
                </nav>
            </div>
        </TestLayout>
    );
};

export default Question;

const AnswerBtn: FC<{
    label: string;
    selected?: boolean;
    onClick: () => void;
}> = ({ label, selected = false, onClick }) => {
    return (
        <button
            onClick={onClick}
            type="button"
            className={cn('answer-btn', selected && 'answer-btn--selected')}
        >
            {selected && (
                <>
                    <span aria-hidden="true">
                        <img src={Checkmark} alt="" class="answer-img" />
                    </span>
                    <VisuallyHidden>Выбранный ответ</VisuallyHidden>
                </>
            )}
            {capitalize(label)}
        </button>
    );
};
