<?php

namespace App\Models;

use App\Enums\TestTiers;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Support\Facades\Auth;

/**
 * @property int $id
 * @property string $title
 * @property int $duration
 * @property int $price
 * @property int|null $prevPrice
 * @property string $description
 * @property array<array-key, mixed> $perks
 * @property string $tier
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read mixed $taken
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\User> $users
 * @property-read int|null $users_count
 * @method static \Database\Factories\PlanFactory factory($count = null, $state = [])
 * @method static Builder<static>|Plan free()
 * @method static Builder<static>|Plan newModelQuery()
 * @method static Builder<static>|Plan newQuery()
 * @method static Builder<static>|Plan query()
 * @method static Builder<static>|Plan whereCreatedAt($value)
 * @method static Builder<static>|Plan whereDescription($value)
 * @method static Builder<static>|Plan whereDuration($value)
 * @method static Builder<static>|Plan whereId($value)
 * @method static Builder<static>|Plan wherePerks($value)
 * @method static Builder<static>|Plan wherePrevPrice($value)
 * @method static Builder<static>|Plan wherePrice($value)
 * @method static Builder<static>|Plan whereTier($value)
 * @method static Builder<static>|Plan whereTitle($value)
 * @method static Builder<static>|Plan whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class Plan extends Model
{
    /** @use HasFactory<\Database\Factories\PlanFactory> */
    use HasFactory;

    protected $casts = [
        'perks' => 'array',
    ];

    protected $appends = ['taken'];

    protected function taken(): Attribute
    {
        return Attribute::make(
            get: function () {
                /** @var \App\Models\User|null $user */
                $user = Auth::user();

                if (!$user) return false;

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
