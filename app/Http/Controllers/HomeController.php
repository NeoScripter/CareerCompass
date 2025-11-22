<?php

namespace App\Http\Controllers;

use App\Models\Plan;
use Inertia\Inertia;

class HomeController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke()
    {
        $plans = Plan::orderBy('price', 'asc')->get();

        return Inertia::render('home/home', [
            'plans' => $plans
        ]);
    }
}
