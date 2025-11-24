<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class ProcessPaymentController extends Controller
{
    /*
     * Show the payment page
     */
    public function show()
    {
        return Inertia::render('payment/payment');
    }
}
