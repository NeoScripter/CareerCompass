<?php

namespace App\Http\Controllers\Test;

use App\Http\Controllers\Controller;
use App\Models\Question;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TestResultController extends Controller
{
    public function show(Request $request)
    {
        $testId = $request->route('testId');
        $questions = Question::where('test_id', $testId)->get();

        // TODO redirect from the page if there is at least one question that is not answered
        return Inertia::render('Result/Result');
    }
}
