<?php

namespace App\Models;

use App\Enums\TestTiers;
use App\Services\QuestionGenerator;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * @property int $id
 * @property TestTiers $tier
 * @property int $user_id
 * @property array<array-key, mixed>|null $result
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Question> $questions
 * @property-read int|null $questions_count
 * @property-read \App\Models\User $user
 * @method static Builder<static>|Test completed()
 * @method static \Database\Factories\TestFactory factory($count = null, $state = [])
 * @method static Builder<static>|Test newModelQuery()
 * @method static Builder<static>|Test newQuery()
 * @method static Builder<static>|Test query()
 * @method static Builder<static>|Test whereCreatedAt($value)
 * @method static Builder<static>|Test whereId($value)
 * @method static Builder<static>|Test whereResult($value)
 * @method static Builder<static>|Test whereTier($value)
 * @method static Builder<static>|Test whereUpdatedAt($value)
 * @method static Builder<static>|Test whereUserId($value)
 * @mixin \Eloquent
 */
class Test extends Model
{
    /** @use HasFactory<\Database\Factories\TestFactory> */
    use HasFactory;

    protected $casts = [
        'tier' => TestTiers::class,
        'result' => 'array',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function questions(): HasMany
    {
        return $this->hasMany(Question::class);
    }

    public function isCompleted(): bool
    {
        return $this->questions()
            ->whereNull('answer')
            ->doesntExist();
    }

    public function hasResults(): bool
    {
        return !is_null($this->result);
    }

    public function scopeCompleted(Builder $query): Builder
    {
        return $query->whereNotNull('result');
    }

    protected static function booted(): void
    {
        static::created(function (Test $test) {
            app(QuestionGenerator::class)->generate($test);
        });
    }
}
