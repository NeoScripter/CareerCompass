<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Validation\Rules\Enum;
use Inertia\Inertia;
use YooKassa\Client;
use App\Models\Plan;
use App\Models\Test;
use App\Enums\TestTiers;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\URL;

class ProcessPaymentController extends Controller
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

    /*
     * Show the payment page
     */
    public function show(string $tier)
    {
        validator(['tier' => $tier], [
            'tier' => ['required', new Enum(TestTiers::class)],
        ])->validate();

        return Inertia::render('Payment/Payment', [
            'tier' => $tier,
        ]);
    }

    /*
     * Create YooKassa payment and redirect user
     */
    public function store(Request $request, string $tier)
    {
        validator(['tier' => $tier], [
            'tier' => ['required', new Enum(TestTiers::class)],
        ])->validate();

        $user = $request->user();

        $existingTest = Test::where('user_id', $user->id)
            ->where('tier', $tier)
            ->whereNull('result')
            ->first();

        if ($existingTest) {
            return redirect()->route('test.show', ['testId' => $existingTest->id]);
        }

        $plan = Plan::where('tier', $tier)->firstOrFail();

        $payment = $this->yookassa->createPayment(
            [
                'amount' => [
                    'value' => number_format($plan->price, 2, '.', ''),
                    'currency' => 'RUB',
                ],
                'confirmation' => [
                    'type' => 'redirect',
                    'return_url' => URL::signedRoute('payment.return'),
                ],
                'capture' => true,
                'description' => 'Test plan: ' . $tier,
                'metadata' => [
                    'user_id' => $user->id,
                    'tier' => $tier,
                ],
            ],
            uniqid('', true)
        );

        return redirect(
            $payment->getConfirmation()->getConfirmationUrl()
        );
    }

    /*
     * YooKassa redirects user here
     * TEST MODE: we query YooKassa directly
     */
    public function return(Request $request)
    {
        $paymentId = $request->get('payment_id');

        if (!$paymentId) {
            return redirect('/')
                ->with('error', 'Платеж не удался');
        }

        $payment = $this->yookassa->getPaymentInfo($paymentId);

        if ($payment->getStatus() !== 'succeeded') {
            return redirect('/')
                ->with('error', 'Платеж не удался');
        }

        $metadata = $payment->getMetadata();

        $userId = $metadata['user_id'];
        $user = User::findOrFail($userId);
        Auth::login($user);

        $tier = $metadata['tier'];

        $plan = Plan::where('tier', $tier)->firstOrFail();

        if (!$user->plans()->where('plan_id', $plan->id)->exists()) {
            $user->plans()->attach($plan->id);
        }

        $test = Test::create([
            'tier' => $tier,
            'user_id' => $user->id,
        ]);

        return redirect()->route('test.show', [
            'testId' => $test->id,
        ]);
    }
}
