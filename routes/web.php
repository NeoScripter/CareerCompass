<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\Legal\ConsentController;
use App\Http\Controllers\Legal\PolicyController;
use App\Http\Controllers\ProcessPaymentController;
use App\Http\Controllers\Test\TestCreationController;
use Illuminate\Support\Facades\Route;

Route::get('/', HomeController::class)->name('home');

Route::name('legal.')->group(function () {
    Route::get('/consent', ConsentController::class)->name('consent');
    Route::get('/policy', PolicyController::class)->name('policy');
});


Route::middleware('guest')->group(function () {
    Route::post('register', [RegisteredUserController::class, 'store'])
        ->name('register');

    Route::post('login', [AuthenticatedSessionController::class, 'store'])
        ->name('login');
});

Route::middleware('auth')->group(function () {
    Route::post('logout', [AuthenticatedSessionController::class, 'destroy'])
        ->name('logout');
});
Route::middleware('auth')->name('payment.')->group(function () {
    Route::get('/payment', [ProcessPaymentController::class, 'show'])->name('show');
});
Route::middleware('auth')->name('test.')->group(function () {
    Route::post('/test', [TestCreationController::class, 'store'])->name('store');

    Route::middleware('test.access')->group(function () {
    });
});
Route::get('/test/{testId}', [TestCreationController::class, 'show'])->name('show');
