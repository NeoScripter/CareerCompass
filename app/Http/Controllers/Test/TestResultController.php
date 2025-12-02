<?php

namespace App\Http\Controllers\Test;

use App\Enums\TestTiers;
use App\Http\Controllers\Controller;
use App\Models\Plan;
use App\Models\Test;
use Inertia\Inertia;

class TestResultController extends Controller
{

    public function show($testId)
    {
        $test = Test::findOrFail($testId);

        if (!$test || !$test->isCompleted()) {
            return redirect()
                ->route('home');
        }

        $plans = Plan::whereNot('tier',  TestTiers::FREE->value)
            ->orderBy('price', 'asc')
            ->get();

        return Inertia::render('Result/Result', [
            'result' => $test->result,
            'plans' => $plans,
        ]);
    }
}
