<?php

namespace App\Http\Controllers\Test;

use App\Enums\Answers;
use App\Http\Controllers\Controller;
use App\Models\Question;
use App\Models\Test;
use App\Services\TestResultGenerator;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class QuestionController extends Controller
{
    public function index(Request $request)
    {
        $testId = $request->route('testId');

        $question = Question::where('test_id', $testId)
            ->whereNull('answer')
            ->orderBy('number')
            ->first();

        if (!$question) {
            $test = Test::findOrFail($testId);

            if (!$test->hasResults()) {
                $questions = $test->questions()
                    ->select(['question', 'answer', 'number'])
                    ->get();

                $results = app(TestResultGenerator::class)
                    ->generate($questions, $test->tier);
                $test->update(['result' => $results]);
            }

            return redirect()->route('test.result.show', ['testId' => $test->id]);
        }

        $total = Question::where('test_id', $testId)->count();

        return Inertia::render('Question/Question', [
            'question' => $question,
            'total' => $total,
            'answers' => array_column(Answers::cases(), 'value'),
        ]);
    }


    public function update(Request $request, string $testId, Question $question)
    {
        $validated = $request->validate([
            'answer' => ['required', Rule::enum(Answers::class)]
        ]);

        $question->update([
            'answer' => $validated['answer']
        ]);

        return redirect()->back();
    }

    public function destroy(string $testId, Question $question)
    {
        if ($question->number <= 1) {
            return redirect()->back();
        }

        Question::where('test_id', $question->test_id)
            ->where('number', $question->number - 1)
            ->update(['answer' => null]);

        return redirect()->back();
    }
}
