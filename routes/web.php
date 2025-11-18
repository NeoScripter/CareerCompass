<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('home');
})->name('home');
Route::get('/test', function () {
    return Inertia::render('test');
})->name('test');
