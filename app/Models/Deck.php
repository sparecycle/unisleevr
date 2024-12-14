<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Deck extends Model
{
    protected $fillable = ['name']; 

    public function commanders() {
        return $this->belongsToMany(Card::class, 'deck_commander');
    }
    
    /**
     * @param array<int> $cardIds
     */
    public function setCommanders(array $cardIds) {

        if(count($cardIds)>2) {
            throw new \Exception('A deck can have at most 2 commanders');
        }

        if(count($cardIds) === 0) {
            // we should probably have sound validation to make sure the parners are valid   
        }

        $this->commanders()->sync($cardIds);
        
    }
}
