<?php

namespace App\Http\Controllers;

use App\Enums\TestTiers;
use App\Models\Plan;
use App\Models\Test;
use Illuminate\Http\Request;
use Illuminate\Validation\Rules\Enum;
use Inertia\Inertia;

class ProcessPaymentController extends Controller
{
    /*
     * Show the payment page
     */
    public function show(string $tier)
    {
        validator(['tier' => $tier], [
            'tier' => ['required', new Enum(TestTiers::class)],
        ])->validate();

        return Inertia::render('Payment/Payment', [
            'tier' => $tier
        ]);
    }

    public function store(Request $request, string $tier)
    {
        validator(['tier' => $tier], [
            'tier' => ['required', new Enum(TestTiers::class)],
        ])->validate();

        $user = $request->user();
        $plan = Plan::where('tier', $tier)->firstOrFail();

        if (!$user->plans()->where('plan_id', $plan->id)->exists()) {
            $user->plans()->attach($plan->id);
        }
        $test = Test::create([
            'tier' => $tier,
            'user_id' => $user->id
        ]);

        return redirect()->route('test.show', ['testId' => $test->id]);
    }
}
