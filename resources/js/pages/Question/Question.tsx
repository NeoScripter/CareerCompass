import Checkmark from '@/assets/svgs/question-btn-selected.svg';
import ProgressBar from '@/components/ui/ProgressBar/ProgressBar';
import VisuallyHidden from '@/components/ui/VisuallyHidden/VisuallyHidden';
import DialogLayout from '@/layouts/DialogLayout/DialogLayout';
import TestLayout from '@/layouts/TestLayout/TestLayout';
import { capitalize } from '@/lib/utils/capitalize';
import { cn } from '@/lib/utils/cn';
import { Question as QuestionType } from '@/types/model';
import { usePage } from '@inertiajs/react';
import { useState } from 'preact/hooks';
import { FC } from 'react-dom/src';
import QuestionDialog from './partials/QuestionDialog/QuestionDialog';
import QuestionNav from './partials/QuestionNav/QuestionNav';
import PageLoader from '@/components/ui/PageLoader/PageLoader';

const Question = () => {
    const { question, answers, total } = usePage<{
        question: QuestionType;
        answers: string[];
        total: number;
    }>().props;

    const [showLoader, setShowLoader] = useState(false);
    const [showDialog, setShowDialog] = useState<boolean>(false);
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

    const progress = Math.floor((question.number / total) * 100);

    const handleSelect = (value: string) => {
        setSelectedAnswer(value);
    };

    const handleDialogClick = () => {
        setShowDialog(true);
    };

    return (
        <TestLayout onClick={handleDialogClick} className="question__layout">
            {showLoader && <PageLoader />}
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

                <QuestionNav
                    selectedAnswer={selectedAnswer}
                    question={question}
                    cb={() => setShowLoader(true)}
                />
            </div>

            <DialogLayout
                show={showDialog}
                onClose={() => setShowDialog(false)}
                className="question__dialog"
            >
                <QuestionDialog
                    onClick={() => setShowDialog(false)}
                    progress={progress}
                />
            </DialogLayout>
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
