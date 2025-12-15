<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Validation\Rules\Enum;
use YooKassa\Client;
use App\Models\Plan;
use App\Models\Test;
use App\Enums\TestTiers;
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
                'description' => 'Оплата теста: ' . $tier,
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
     */

    public function return(Request $request)
    {
        if (!$request->hasValidSignature()) {
            abort(403);
        }
        $paymentId = data_get($request->input('object'), 'id');

        if (!$paymentId) {
            return redirect('/')
                ->with('error', 'Оплата прошла успешно. Нажмите еще раз кнопку "Пройти тест" оплаченного теста.');
        }

        $test = Test::where('payment_id', $paymentId)->first();

        if (!$test) {
            return redirect('/')
                ->with('error', 'Оплата прошла успешно. Нажмите еще раз кнопку "Пройти тест" оплаченного теста.');
        }

        if (!Auth::check()) {
            Auth::loginUsingId($test->user_id);
        }

        return redirect()->route('test.show', [
            'testId' => $test->id,
        ]);
    }
}
