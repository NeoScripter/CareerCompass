<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\Legal\ConsentController;
use App\Http\Controllers\Legal\PolicyController;
use Illuminate\Support\Facades\Route;

Route::get('/', HomeController::class)->name('home');

Route::name('legal.')->group(function () {
    Route::get('/consent', ConsentController::class)->name('consent');
    Route::get('/policy', PolicyController::class)->name('policy');
});


Route::middleware('guest')->group(function () {

    // Route::post('register', [RegisteredUserController::class, 'store'])->name('register');

    Route::post('login', [AuthenticatedSessionController::class, 'store'])
        ->name('login');
});

Route::middleware('auth')->group(function () {
    Route::post('logout', [AuthenticatedSessionController::class, 'destroy'])
        ->name('logout');
});
