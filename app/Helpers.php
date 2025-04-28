<?php
use App\Models\Deck;
use Illuminate\Support\Facades\Http;

function splitStringByHyphen($input)
{
    // Match words before and after the hyphen
    preg_match('/^(.+?)\s*—\s*(.+)$/', $input, $matches);

    // Check if the match was successful
    if (count($matches) === 3) {
        $beforeHyphen = preg_split('/\s+/', trim($matches[1]));
        $afterHyphen = preg_split('/\s+/', trim($matches[2]));
        return [$beforeHyphen, $afterHyphen];
    }

    // If no hyphen is found, return all strings in the first array
    $beforeHyphen = preg_split('/\s+/', trim($input));
    return [$beforeHyphen, []];
}

function turnManaCostIntoArray($manaCost)
{
    // Match all mana symbols in the string
    preg_match_all('/{(.+?)}/', $manaCost, $matches);

    // Check if the match was successful
    if (count($matches) === 2) {
        return $matches[1];
    }

    return [];
}

function getCardPoolAndDecksFromUserID($userID)
{
    $decks = Deck::query()->where('user_id', $userID)->get();

    $cardIdList = $decks
        ->flatMap(function ($deck) {
            return collect($deck->cards)->pluck('id');
        })
        ->unique()
        ->values()
        ->toArray();

    $allCards = [];

    // Split the identifiers array into chunks of 75
    $chunks = array_chunk($cardIdList, 75);

    // Iterate over each chunk and make an HTTP request
    foreach ($chunks as $chunk) {
        // Transform the chunk into the correct format
        $identifiers = array_map(fn($id) => ['id' => $id], $chunk);

        $scryfallResponse = Http::post(
            'https://api.scryfall.com/cards/collection',
            [
                'identifiers' => $identifiers, // Correctly formatted array
            ]
        );

        if ($scryfallResponse->successful()) {
            $cards = $scryfallResponse->json('data');
            $allCards = array_merge($allCards, $cards);
        } else {
            error_log(
                'Failed to fetch cards from Scryfall API. Status: ' .
                    $scryfallResponse->status()
            );
        }
    }

    return [$allCards, $decks];
}

function generateRandomCommander()
{
    $mondoCommanderData = [[
        'cardSuperType' => ['Legendary', 'Creature'],
        'cardType' => ['Illusion'],
        'colorIdentity' => ['U'],
        'id' => 'ebdf2f50-f69a-47c4-a75f-ff55781bb0c8',
        'imgUris' => [
            'small' =>
                'https://cards.scryfall.io/small/front/e/b/ebdf2f50-f69a-47c4-a75f-ff55781bb0c8.jpg?1562942414',
            'normal' =>
                'https://cards.scryfall.io/normal/front/e/b/ebdf2f50-f69a-47c4-a75f-ff55781bb0c8.jpg?1562942414',
            'large' =>
                'https://cards.scryfall.io/large/front/e/b/ebdf2f50-f69a-47c4-a75f-ff55781bb0c8.jpg?1562942414',
            'png' =>
                'https://cards.scryfall.io/png/front/e/b/ebdf2f50-f69a-47c4-a75f-ff55781bb0c8.png?1562942414',
            'art_crop' =>
                'https://cards.scryfall.io/art_crop/front/e/b/ebdf2f50-f69a-47c4-a75f-ff55781bb0c8.jpg?1562942414',
        ],
        'manaCost' => ['{3}', '{U}'],
        'name' => 'Toothy, Imaginary Friend',
        'oracleText' =>
            "Partner with Pir, Imaginative Rascal (When this creature enters, target player may put Pir into their hand from their library, then shuffle.)\nWhenever you draw a card, put a +1/+1 counter on Toothy.\nWhen Toothy leaves the battlefield, draw a card for each +1/+1 counter on it.",
        'power' => '1',
        'toughness' => '1',
    ]];
    $partnerCommanderData = [
        [
            'cardSuperType' => ['Legendary', 'Creature'],
            'cardType' => ['Illusion'],
            'colorIdentity' => ['U'],
            'id' => 'ebdf2f50-f69a-47c4-a75f-ff55781bb0c8',
            'imgUris' => [
                'small' =>
                    'https://cards.scryfall.io/small/front/e/b/ebdf2f50-f69a-47c4-a75f-ff55781bb0c8.jpg?1562942414',
                'normal' =>
                    'https://cards.scryfall.io/normal/front/e/b/ebdf2f50-f69a-47c4-a75f-ff55781bb0c8.jpg?1562942414',
                'large' =>
                    'https://cards.scryfall.io/large/front/e/b/ebdf2f50-f69a-47c4-a75f-ff55781bb0c8.jpg?1562942414',
                'png' =>
                    'https://cards.scryfall.io/png/front/e/b/ebdf2f50-f69a-47c4-a75f-ff55781bb0c8.png?1562942414',
                'art_crop' =>
                    'https://cards.scryfall.io/art_crop/front/e/b/ebdf2f50-f69a-47c4-a75f-ff55781bb0c8.jpg?1562942414',
            ],
            'manaCost' => ['{3}', '{U}'],
            'name' => 'Pir, Imaginative Rascal',
            'oracleText' =>
                "Partner with Toothy, Imaginary Friend (When this creature enters, target player may put Toothy into their hand from their library, then shuffle.)\nWhenever you draw a card, put a +1/+1 counter on Pir.\nWhen Pir leaves the battlefield, draw a card for each +1/+1 counter on it.",
            'power' => '1',
            'toughness' => '1',
        ],
        [
            'cardSuperType' => ['Legendary', 'Creature'],
            'cardType' => ['Human'],
            'colorIdentity' => ['G'],
            'id' => '5a7241f5-4d69-47fe-b037-95037008184c',
            'imgUris' => [
                'art_crop' =>
                    'https://cards.scryfall.io/art_crop/front/5/a/5a7241f5-4d69-47fe-b037-95037008184c.jpg?1562913367',
                'border_crop' =>
                    'https://cards.scryfall.io/border_crop/front/5/a/5a7241f5-4d69-47fe-b037-95037008184c.jpg?1562913367',
                'large' =>
                    'https://cards.scryfall.io/large/front/5/a/5a7241f5-4d69-47fe-b037-95037008184c.jpg?1562913367',
                'normal' =>
                    'https://cards.scryfall.io/normal/front/5/a/5a7241f5-4d69-47fe-b037-95037008184c.jpg?1562913367',
                'png' =>
                    'https://cards.scryfall.io/png/front/5/a/5a7241f5-4d69-47fe-b037-95037008184c.png?1562913367',
                'small' =>
                    'https://cards.scryfall.io/small/front/5/a/5a7241f5-4d69-47fe-b037-95037008184c.jpg?1562913367',
            ],
            'manaCost' => ['{2}', '{G}'],
            'name' => 'Pir, Imaginative Rascal',
            'oracleText' =>
                "Partner with Toothy, Imaginary Friend (When this creature enters, target player may put Toothy into their hand from their library, then shuffle.)\nIf one or more counters would be put on a permanent your team controls, that many plus one of each of those kinds of counters are put on that permanent instead.",
            'power' => '1',
            'toughness' => '1',
        ],
    ];
    $multiColorCommanderData = [
        [
            'cardSuperType' => ['Legendary', 'Creature'],
            'cardType' => ['Elemental'],
            'colorIdentity' => ['G', 'R', 'U'],
            'id' => 'a3da57d0-1ae3-4f05-a52d-eb76ad56cae7',
            'imgUris' => [
                'art_crop' =>
                    'https://cards.scryfall.io/art_crop/front/a/3/a3da57d0-1ae3-4f05-a52d-eb76ad56cae7.jpg?1673148281',
                'border_crop' =>
                    'https://cards.scryfall.io/border_crop/front/a/3/a3da57d0-1ae3-4f05-a52d-eb76ad56cae7.jpg?1673148281',
                'large' =>
                    'https://cards.scryfall.io/large/front/a/3/a3da57d0-1ae3-4f05-a52d-eb76ad56cae7.jpg?1673148281',
                'normal' =>
                    'https://cards.scryfall.io/normal/front/a/3/a3da57d0-1ae3-4f05-a52d-eb76ad56cae7.jpg?1673148281',
                'png' =>
                    'https://cards.scryfall.io/png/front/a/3/a3da57d0-1ae3-4f05-a52d-eb76ad56cae7.png?1673148281',
                'small' =>
                    'https://cards.scryfall.io/small/front/a/3/a3da57d0-1ae3-4f05-a52d-eb76ad56cae7.jpg?1673148281',
            ],
            'manaCost' => ['{G}', '{U}', '{R}'],
            'name' => 'Animar, Soul of Elements',
            'oracleText' =>
                "Protection from white and from black\nWhenever you cast a creature spell, put a +1/+1 counter on Animar.\nCreature spells you cast cost {1} less to cast for each +1/+1 counter on Animar.",
            'power' => '1',
            'toughness' => '1',
        ],
    ];
    switch (rand(1, 3)) {
        case 1:
            return $mondoCommanderData;
        case 2:
            return $multiColorCommanderData;
        case 3:
            return $partnerCommanderData;
        default:
            return $mondoCommanderData;
    }
}
