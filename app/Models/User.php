<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;

use App\Enums\TestTiers;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function latestIncompletePaidTest(): ?Test
    {
        return $this->tests()
            ->paid()
            ->incomplete()
            ->latest()
            ->first();
    }

    public function lastTest(): ?Test
    {
        return $this->tests()->completed()->latest()->first();
    }

    public function highestTierTaken(): ?Plan
    {
        $tiersTaken = $this->tests()->pluck('tier')->unique()->map->value;

        if ($tiersTaken->isEmpty()) {
            return null;
        }

        foreach ([TestTiers::PREMIUM, TestTiers::TOP, TestTiers::FREE] as $tier) {
            if ($tiersTaken->contains($tier->value)) {
                $plan = Plan::select(['title', 'tier'])->where('tier', $tier->value)->firstOrFail();
                return $plan;
            }
        }

        return null;
    }

    public function tests(): HasMany
    {
        return $this->hasMany(Test::class);
    }

    public function plans(): BelongsToMany
    {
        return $this->belongsToMany(Plan::class);
    }

    public function hasTest(int $testId): bool
    {
        return $this->tests()
            ->where('tests.id', $testId)
            ->exists();
    }

    // protected static function booted(): void
    // {
    //     static::created(function (User $user) {
    //         if ($user->plans()->count() === 0) {
    //             $freePlanId = Plan::free()->value('id');
    //             $user->plans()->attach($freePlanId);
    //         }
    //     });
    // }
}
