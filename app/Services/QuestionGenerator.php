<?php

namespace App\Services;

use App\Models\Question;
use App\Models\Test;

class QuestionGenerator
{
    public function generate(Test $test): void
    {
        $items = config('questions.' . $test->tier->value);

        foreach ($items as $number => $questionText) {
            Question::create([
                'question' => $questionText,
                'test_id'  => $test->id,
                'number'   => $number,
            ]);
        }
    }
}
