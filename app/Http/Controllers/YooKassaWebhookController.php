<?php

namespace App\Http\Controllers;

use App\Models\Plan;
use App\Models\Test;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class YooKassaWebhookController extends Controller
{
    public function handle(Request $request)
    {
        Log::info('webhook started', $request);
        // Accept only successful payments
        if ($request->input('event') !== 'payment.succeeded') {
            return response()->json(['ok' => true]);
        }

        $payment = $request->input('object');

        if (($payment['status'] ?? null) !== 'succeeded') {
            return response()->json(['ok' => true]);
        }

        $paymentId = $payment['id'] ?? null;
        $metadata  = $payment['metadata'] ?? [];

        $userId = $metadata['user_id'] ?? null;
        $tier   = $metadata['tier'] ?? null;

        if (!$paymentId || !$userId || !$tier) {
            return response()->json(['error' => 'Invalid payload'], 400);
        }

        // 🔒 Idempotency — REQUIRED
        if (Test::where('payment_id', $paymentId)->exists()) {
            return response()->json(['ok' => true]);
        }

        $user = User::findOrFail($userId);
        $plan = Plan::where('tier', $tier)->firstOrFail();

        // Attach plan safely
        if (!$user->plans()->where('plan_id', $plan->id)->exists()) {
            $user->plans()->attach($plan->id);
        }

        Test::create([
            'user_id'    => $user->id,
            'tier'       => $tier,
            'payment_id' => $paymentId,
        ]);

        return response()->json(['ok' => true]);
    }
}
