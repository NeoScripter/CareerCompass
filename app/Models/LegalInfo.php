<?php

namespace App\Models;

use App\Models\Concerns\ConvertsMarkdownToHtml;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @property int $id
 * @property string $key
 * @property string $title
 * @property string $body
 * @property string $html
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Database\Factories\LegalInfoFactory factory($count = null, $state = [])
 * @method static \Illuminate\Database\Eloquent\Builder<static>|LegalInfo newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|LegalInfo newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|LegalInfo query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|LegalInfo whereBody($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|LegalInfo whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|LegalInfo whereHtml($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|LegalInfo whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|LegalInfo whereKey($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|LegalInfo whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|LegalInfo whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class LegalInfo extends Model
{
    use HasFactory, ConvertsMarkdownToHtml;
}
