<?php

namespace App\Services;

use App\Models\Question;

class QuestionGenerator
{
    public function generate(int $testId): void
    {
        $items = config('questions.items');

        foreach ($items as $number => $questionText) {
            Question::create([
                'question' => $questionText,
                'test_id'  => $testId,
                'number'   => $number,
            ]);
        }
    }
}
