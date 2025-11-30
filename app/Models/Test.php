<?php

namespace App\Models;

use App\Enums\TestTiers;
use App\Services\QuestionGenerator;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Relations\HasMany;

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
            app(QuestionGenerator::class)->generate($test->id);
        });
    }
}
