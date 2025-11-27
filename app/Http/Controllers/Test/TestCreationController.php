<?php

namespace App\Http\Controllers\Test;

use App\Enums\TestTiers;
use App\Http\Controllers\Controller;
use App\Models\Test;
use Illuminate\Http\Request;
use Illuminate\Validation\Rules\Enum;
use Inertia\Inertia;

class TestCreationController extends Controller
{
    /*
     * Show the test initial page
     */
    public function show()
    {
        return Inertia::render('Test/Test');
    }

    /**
     * Check the user's permissions and create a test
     */
    public function store(Request $request)
    {
        $user = $request->user();

        if (!$user) {
            return redirect()->route('home');
        }

        $validated = $request->validate([
            'tier' => ['required', new Enum(TestTiers::class)],
        ]);

        if (!$user->plans->pluck('tier')->contains($validated['tier'])) {
            return redirect()->route('home');
        }

        // if ($user->plans->count() === 1 && $user->plans->first()->tier === TestTiers::FREE->value) {
        //     $user->plans()->detach();
        // }

        $test = Test::create([
            'user_id' => $user->id,
            'tier' => $validated['tier'],
        ]);

        return redirect()->route('test.show', $test->id);
    }
}
