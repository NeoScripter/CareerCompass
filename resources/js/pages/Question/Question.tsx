import { Button } from '@/components/ui/Button/Button';
import TestLayout from '@/layouts/TestLayout/TestLayout';
import { ChevronLeft, ChevronRight } from 'lucide-preact';
import { FC } from 'react-dom/src';

const Question = () => {
    return (
        <TestLayout className="question__layout">
            <div class="question__body">
                <h1 class="question__heading">
                    Мне нравится работать с техникой и механизмами.
                </h1>

                <div class="question__btn-wrapper"></div>

                <nav class="question__nav">
                    <Button className="button primary question__nav-button">
                        <ChevronLeft />
                    </Button>

                    <Button className="button primary question__nav-button">
                        <ChevronRight />
                    </Button>
                </nav>
            </div>
        </TestLayout>
    );
};

export default Question;

const AnswerBtn: FC<{ label: string }> = ({ label }) => {
    return (
        <button type="button" className="answer-btn">
            {label}
        </button>
    );
};
