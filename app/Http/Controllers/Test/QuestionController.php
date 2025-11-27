<?php

namespace App\Http\Controllers\Test;

use App\Http\Controllers\Controller;
use App\Models\Test;
use Illuminate\Http\Request;
use Inertia\Inertia;

class QuestionController extends Controller
{
    public function index(Request $request)
    {
        $testId = $request->route('testId');
        $test = Test::find($testId);
        $questions = $test->questions;

        return Inertia::render('Question/Question');
    }
}
