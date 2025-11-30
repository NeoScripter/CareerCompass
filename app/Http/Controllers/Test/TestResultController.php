<?php

namespace App\Http\Controllers\Test;

use App\Http\Controllers\Controller;
use App\Models\Test;
use Inertia\Inertia;

class TestResultController extends Controller
{

    public function show(Test $test)
    {
        if (!$test || !$test->isCompleted()) {
            return redirect()
                ->route('home');
        }

        return Inertia::render('Result/Result', [
            'result' => $test->result
        ]);
    }
}
