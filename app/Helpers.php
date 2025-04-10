<?php    
use App\Models\Deck;
use Illuminate\Support\Facades\Http;

function splitStringByHyphen($input) {
    // Match words before and after the hyphen
    preg_match('/^(.+?)\s*—\s*(.+)$/', $input, $matches);
    
    // Check if the match was successful
    if (count($matches) === 3) {
        $beforeHyphen = preg_split('/\s+/', trim($matches[1]));
        $afterHyphen  = preg_split('/\s+/', trim($matches[2]));
        return [$beforeHyphen, $afterHyphen];
    }
    
    // If no hyphen is found, return all strings in the first array
    $beforeHyphen = preg_split('/\s+/', trim($input));
    return [$beforeHyphen, []];
}

function turnManaCostIntoArray($manaCost) {
    // Match all mana symbols in the string
    preg_match_all('/{(.+?)}/', $manaCost, $matches);
    
    // Check if the match was successful
    if (count($matches) === 2) {
        return $matches[1];
    }
    
    return [];
}

function getCardPoolAndDecksFromUserID ($userID) {
    $decks = Deck::query()
        ->where('user_id', $userID)
        ->get();

    $cardIdList = $decks->flatMap(function ($deck) {
        return collect($deck->cards)->pluck('id');
    })->unique()->values()->toArray();

    $allCards = [];
    
    // Split the identifiers array into chunks of 75
    $chunks = array_chunk($cardIdList, 75);

    // Iterate over each chunk and make an HTTP request
    foreach ($chunks as $chunk) {
        // Transform the chunk into the correct format
        $identifiers = array_map(fn($id) => ['id' => $id], $chunk);

        $scryfallResponse = Http::post('https://api.scryfall.com/cards/collection', [
            'identifiers' => $identifiers // Correctly formatted array
        ]);

        if ($scryfallResponse->successful()) {
            $cards = $scryfallResponse->json('data');
            $allCards = array_merge($allCards, $cards);
        } else {
            error_log('Failed to fetch cards from Scryfall API. Status: ' . $scryfallResponse->status());
        }
    }

    return [$allCards, $decks];
}
