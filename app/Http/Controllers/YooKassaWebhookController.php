<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use YooKassa\Client;
use App\Models\Plan;
use App\Models\Test;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class YooKassaWebhookController extends Controller
{
    private Client $yookassa;

    public function __construct()
    {
        $this->yookassa = new Client();
        $this->yookassa->setAuth(
            config('services.yookassa.shop_id'),
            config('services.yookassa.secret')
        );
    }

    public function handle(Request $request)
    {
        $paymentId = $request->get('object')['id'] ?? null;

        if (!$paymentId) {
            return response()->json(['error' => 'Платеж не удался'], 400);
        }

        // Get payment info from YooKassa
        $payment = $this->yookassa->getPaymentInfo($paymentId);

        if ($payment->getStatus() !== 'succeeded') {
            return response()->json(['error' => 'Платеж не удался'], 400);
        }

        $metadata = $payment->getMetadata();

        // Assign user based on metadata
        $userId = $metadata['user_id'];
        $user = User::findOrFail($userId);

        // Optional: log in the user if needed (only for return_url, not webhook)
        // Auth::login($user);

        $tier = $metadata['tier'];

        $plan = Plan::where('tier', $tier)->firstOrFail();

        if (!$user->plans()->where('plan_id', $plan->id)->exists()) {
            $user->plans()->attach($plan->id);
        }

        Test::firstOrCreate([
            'tier' => $tier,
            'user_id' => $user->id,
        ]);

        return response()->json(['status' => 'ok']);
    }
}

