<?php

namespace App\Models;

use App\Enums\TestTiers;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Support\Facades\Auth;

class Plan extends Model
{
    /** @use HasFactory<\Database\Factories\PlanFactory> */
    use HasFactory;

    protected $casts = [
        'perks' => 'array',
    ];

    protected function taken(): Attribute
    {
        return Attribute::make(
            get: function () {
                /** @var \App\Models\User|null $user */
                $user = Auth::user();

                if (!$user) return null;

                return $user->tests()
                    ->where('tier', $this->tier)
                    ->get()
                    ->contains(fn($test) => $test->hasResults());
            }
        );
    }

    public function users(): BelongsToMany
    {
        return $this->belongsToMany(User::class);
    }

    public function scopeFree(Builder $query): Builder
    {
        return $query->where('tier', TestTiers::FREE->value);
    }
}
