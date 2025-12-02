<?php

namespace App\Http\Controllers;

use App\Enums\TestTiers;
use App\Models\Plan;
use Inertia\Inertia;

class HomeController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke()
    {
        $plans = Plan::orderBy('price', 'asc')->get()
            ->filter(fn($plan) => !($plan->tier === TestTiers::FREE->value && $plan->taken));

        return Inertia::render('Home/Home', [
            'plans' => $plans->values()
        ]);
    }
}
