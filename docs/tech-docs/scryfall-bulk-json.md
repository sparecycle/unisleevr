Documentation: https://scryfall.com/docs/api/bulk-data

## Identifying Active Bulk JSON File

Documentation: https://scryfall.com/docs/api/bulk-data/all

Returns a List of all Bulk Data items on Scryfall.

```
https://api.scryfall.com/bulk-data
```

## Bulk JSON

Bulk JSON once retrieved can be used to populate the database.

### Layouts and Faces

Documentation: https://scryfall.com/docs/api/layouts

> The `layout` property categorizes the arrangement of card parts, faces, and other bounded regions on cards. The layout can be used to programmatically determine which other properties on a card you can expect.
>
> Specifically:
>
> - Cards with the layouts `split`, `flip`, `transform`, and `double_faced_token` will always have a `card_faces` property describing the distinct faces.
> - Cards with the layout `meld` will always have an `all_parts` property pointing to the other meld parts.

#### Single Sided Example

Bulk JSON sources may differ, the following examples are from the `oracle-cards` bulk data set.

"Sakura-Tribe Elder"

```json
{
    "object": "card",
    "id": "7a0dd468-9317-42bd-946d-ef96805fc6a4",
    "oracle_id": "e3afc704-220f-498f-9eaa-0821b17dc24c",
    "multiverse_ids": [676067],
    "mtgo_id": 131013,
    "tcgplayer_id": 577827,
    "cardmarket_id": 788897,
    "name": "Sakura-Tribe Elder",
    "lang": "en",
    "released_at": "2024-09-27",
    "uri": "https://api.scryfall.com/cards/7a0dd468-9317-42bd-946d-ef96805fc6a4",
    "scryfall_uri": "https://scryfall.com/card/dsc/194/sakura-tribe-elder?utm_source=api",
    "layout": "normal",
    "highres_image": true,
    "image_status": "highres_scan",
    "image_uris": {
        "small": "https://cards.scryfall.io/small/front/7/a/7a0dd468-9317-42bd-946d-ef96805fc6a4.jpg?1726285103",
        "normal": "https://cards.scryfall.io/normal/front/7/a/7a0dd468-9317-42bd-946d-ef96805fc6a4.jpg?1726285103",
        "large": "https://cards.scryfall.io/large/front/7/a/7a0dd468-9317-42bd-946d-ef96805fc6a4.jpg?1726285103",
        "png": "https://cards.scryfall.io/png/front/7/a/7a0dd468-9317-42bd-946d-ef96805fc6a4.png?1726285103",
        "art_crop": "https://cards.scryfall.io/art_crop/front/7/a/7a0dd468-9317-42bd-946d-ef96805fc6a4.jpg?1726285103",
        "border_crop": "https://cards.scryfall.io/border_crop/front/7/a/7a0dd468-9317-42bd-946d-ef96805fc6a4.jpg?1726285103"
    },
    "mana_cost": "{1}{G}",
    "cmc": 2.0,
    "type_line": "Creature — Snake Shaman",
    "oracle_text": "Sacrifice Sakura-Tribe Elder: Search your library for a basic land card, put that card onto the battlefield tapped, then shuffle.",
    "power": "1",
    "toughness": "1",
    "colors": ["G"],
    "color_identity": ["G"],
    "keywords": [],
    "legalities": {
        "standard": "not_legal",
        "future": "not_legal",
        "historic": "not_legal",
        "timeless": "not_legal",
        "gladiator": "not_legal",
        "pioneer": "not_legal",
        "explorer": "not_legal",
        "modern": "legal",
        "legacy": "legal",
        "pauper": "legal",
        "vintage": "legal",
        "penny": "not_legal",
        "commander": "legal",
        "oathbreaker": "legal",
        "standardbrawl": "not_legal",
        "brawl": "not_legal",
        "alchemy": "not_legal",
        "paupercommander": "legal",
        "duel": "legal",
        "oldschool": "not_legal",
        "premodern": "not_legal",
        "predh": "legal"
    },
    "games": ["paper", "mtgo"],
    "reserved": false,
    "foil": false,
    "nonfoil": true,
    "finishes": ["nonfoil"],
    "oversized": false,
    "promo": false,
    "reprint": true,
    "variation": false,
    "set_id": "4c822528-83c3-42c7-8708-dd1d37166819",
    "set": "dsc",
    "set_name": "Duskmourn: House of Horror Commander",
    "set_type": "commander",
    "set_uri": "https://api.scryfall.com/sets/4c822528-83c3-42c7-8708-dd1d37166819",
    "set_search_uri": "https://api.scryfall.com/cards/search?order=set&q=e%3Adsc&unique=prints",
    "scryfall_set_uri": "https://scryfall.com/sets/dsc?utm_source=api",
    "rulings_uri": "https://api.scryfall.com/cards/7a0dd468-9317-42bd-946d-ef96805fc6a4/rulings",
    "prints_search_uri": "https://api.scryfall.com/cards/search?order=released&q=oracleid%3Ae3afc704-220f-498f-9eaa-0821b17dc24c&unique=prints",
    "collector_number": "194",
    "digital": false,
    "rarity": "common",
    "flavor_text": "He'd chosen a sunlit clearing with open skies and an ample brook. All that remained was to find a worthy sapling.",
    "card_back_id": "0aeebaf5-8c7d-4636-9e82-8c27447861f7",
    "artist": "Anastasia Ovchinnikova",
    "artist_ids": ["3605d81f-5c97-4958-9dcc-d44a85e10305"],
    "illustration_id": "99e2407a-0d49-4e05-a8cf-5f90363ed46c",
    "border_color": "black",
    "frame": "2015",
    "full_art": false,
    "textless": false,
    "booster": false,
    "story_spotlight": false,
    "edhrec_rank": 85,
    "prices": {
        "usd": "0.41",
        "usd_foil": null,
        "usd_etched": null,
        "eur": "0.37",
        "eur_foil": null,
        "tix": "0.01"
    },
    "related_uris": {
        "gatherer": "https://gatherer.wizards.com/Pages/Card/Details.aspx?multiverseid=676067&printed=false",
        "tcgplayer_infinite_articles": "https://partner.tcgplayer.com/c/4931599/1830156/21018?subId1=api&trafcat=infinite&u=https%3A%2F%2Finfinite.tcgplayer.com%2Fsearch%3FcontentMode%3Darticle%26game%3Dmagic%26partner%3Dscryfall%26q%3DSakura-Tribe%2BElder",
        "tcgplayer_infinite_decks": "https://partner.tcgplayer.com/c/4931599/1830156/21018?subId1=api&trafcat=infinite&u=https%3A%2F%2Finfinite.tcgplayer.com%2Fsearch%3FcontentMode%3Ddeck%26game%3Dmagic%26partner%3Dscryfall%26q%3DSakura-Tribe%2BElder",
        "edhrec": "https://edhrec.com/route/?cc=Sakura-Tribe+Elder"
    },
    "purchase_uris": {
        "tcgplayer": "https://partner.tcgplayer.com/c/4931599/1830156/21018?subId1=api&u=https%3A%2F%2Fwww.tcgplayer.com%2Fproduct%2F577827%3Fpage%3D1",
        "cardmarket": "https://www.cardmarket.com/en/Magic/Products/Singles/Commander-Duskmourn-House-of-Horror/Sakura-Tribe-Elder?referrer=scryfall&utm_campaign=card_prices&utm_medium=text&utm_source=scryfall",
        "cardhoarder": "https://www.cardhoarder.com/cards/131013?affiliate_id=scryfall&ref=card-profile&utm_campaign=affiliate&utm_medium=card&utm_source=scryfall"
    }
}
```

#### Double Sided Example

Bulk JSON sources may differ, the following examples are from the `oracle-cards` bulk data set.

"Westvale Abbey // Ormendahl, Profane Prince"

```json
{
    "object": "card",
    "id": "c1f53d7a-9dad-46e8-b686-cd1362867445",
    "oracle_id": "04eeb9ad-5c59-411b-8809-db8349838588",
    "multiverse_ids": [410049, 410050],
    "mtgo_id": 59810,
    "mtgo_foil_id": 59811,
    "tcgplayer_id": 115917,
    "cardmarket_id": 288984,
    "name": "Westvale Abbey // Ormendahl, Profane Prince",
    "lang": "en",
    "released_at": "2016-04-08",
    "uri": "https://api.scryfall.com/cards/c1f53d7a-9dad-46e8-b686-cd1362867445",
    "scryfall_uri": "https://scryfall.com/card/soi/281/westvale-abbey-ormendahl-profane-prince?utm_source=api",
    "layout": "transform",
    "highres_image": true,
    "image_status": "highres_scan",
    "cmc": 0.0,
    "type_line": "Land // Legendary Creature — Demon",
    "color_identity": ["B"],
    "keywords": ["Flying", "Lifelink", "Indestructible", "Transform", "Haste"],
    "produced_mana": ["C"],
    "card_faces": [
        {
            "object": "card_face",
            "name": "Westvale Abbey",
            "mana_cost": "",
            "type_line": "Land",
            "oracle_text": "{T}: Add {C}.\n{5}, {T}, Pay 1 life: Create a 1/1 white and black Human Cleric creature token.\n{5}, {T}, Sacrifice five creatures: Transform Westvale Abbey, then untap it.",
            "colors": [],
            "artist": "Min Yum",
            "artist_id": "9cb65d6f-8851-4d56-9add-9eefa274bd1b",
            "illustration_id": "6a0d5174-5a4d-406e-acd2-6c191f2a5cae",
            "image_uris": {
                "small": "https://cards.scryfall.io/small/front/c/1/c1f53d7a-9dad-46e8-b686-cd1362867445.jpg?1576385590",
                "normal": "https://cards.scryfall.io/normal/front/c/1/c1f53d7a-9dad-46e8-b686-cd1362867445.jpg?1576385590",
                "large": "https://cards.scryfall.io/large/front/c/1/c1f53d7a-9dad-46e8-b686-cd1362867445.jpg?1576385590",
                "png": "https://cards.scryfall.io/png/front/c/1/c1f53d7a-9dad-46e8-b686-cd1362867445.png?1576385590",
                "art_crop": "https://cards.scryfall.io/art_crop/front/c/1/c1f53d7a-9dad-46e8-b686-cd1362867445.jpg?1576385590",
                "border_crop": "https://cards.scryfall.io/border_crop/front/c/1/c1f53d7a-9dad-46e8-b686-cd1362867445.jpg?1576385590"
            }
        },
        {
            "object": "card_face",
            "name": "Ormendahl, Profane Prince",
            "mana_cost": "",
            "type_line": "Legendary Creature — Demon",
            "oracle_text": "Flying, lifelink, indestructible, haste",
            "colors": ["B"],
            "color_indicator": ["B"],
            "power": "9",
            "toughness": "7",
            "flavor_text": "With Griselbrand gone, the Skirsdag eagerly awaited another demon to claim their devotion. Ormendahl did not make them wait long.",
            "artist": "Min Yum",
            "artist_id": "9cb65d6f-8851-4d56-9add-9eefa274bd1b",
            "illustration_id": "e576c60b-6928-4684-994f-ad80e127234b",
            "image_uris": {
                "small": "https://cards.scryfall.io/small/back/c/1/c1f53d7a-9dad-46e8-b686-cd1362867445.jpg?1576385590",
                "normal": "https://cards.scryfall.io/normal/back/c/1/c1f53d7a-9dad-46e8-b686-cd1362867445.jpg?1576385590",
                "large": "https://cards.scryfall.io/large/back/c/1/c1f53d7a-9dad-46e8-b686-cd1362867445.jpg?1576385590",
                "png": "https://cards.scryfall.io/png/back/c/1/c1f53d7a-9dad-46e8-b686-cd1362867445.png?1576385590",
                "art_crop": "https://cards.scryfall.io/art_crop/back/c/1/c1f53d7a-9dad-46e8-b686-cd1362867445.jpg?1576385590",
                "border_crop": "https://cards.scryfall.io/border_crop/back/c/1/c1f53d7a-9dad-46e8-b686-cd1362867445.jpg?1576385590"
            }
        }
    ],
    "all_parts": [
        {
            "object": "related_card",
            "id": "c1f53d7a-9dad-46e8-b686-cd1362867445",
            "component": "combo_piece",
            "name": "Westvale Abbey // Ormendahl, Profane Prince",
            "type_line": "Land // Legendary Creature — Demon",
            "uri": "https://api.scryfall.com/cards/c1f53d7a-9dad-46e8-b686-cd1362867445"
        },
        {
            "object": "related_card",
            "id": "4825c59d-9e27-4a12-ba84-642b8540e573",
            "component": "combo_piece",
            "name": "Shadows Over Innistrad Checklist 2",
            "type_line": "Card",
            "uri": "https://api.scryfall.com/cards/4825c59d-9e27-4a12-ba84-642b8540e573"
        },
        {
            "object": "related_card",
            "id": "94ed2eca-1579-411d-af6f-c7359c65de30",
            "component": "token",
            "name": "Human Cleric",
            "type_line": "Token Creature — Human Cleric",
            "uri": "https://api.scryfall.com/cards/94ed2eca-1579-411d-af6f-c7359c65de30"
        }
    ],
    "legalities": {
        "standard": "not_legal",
        "future": "not_legal",
        "historic": "legal",
        "timeless": "legal",
        "gladiator": "legal",
        "pioneer": "legal",
        "explorer": "legal",
        "modern": "legal",
        "legacy": "legal",
        "pauper": "not_legal",
        "vintage": "legal",
        "penny": "legal",
        "commander": "legal",
        "oathbreaker": "legal",
        "standardbrawl": "not_legal",
        "brawl": "legal",
        "alchemy": "not_legal",
        "paupercommander": "not_legal",
        "duel": "legal",
        "oldschool": "not_legal",
        "premodern": "not_legal",
        "predh": "not_legal"
    },
    "games": ["paper", "mtgo"],
    "reserved": false,
    "foil": true,
    "nonfoil": true,
    "finishes": ["nonfoil", "foil"],
    "oversized": false,
    "promo": false,
    "reprint": false,
    "variation": false,
    "set_id": "5e914d7e-c1e9-446c-a33d-d093c02b2743",
    "set": "soi",
    "set_name": "Shadows over Innistrad",
    "set_type": "expansion",
    "set_uri": "https://api.scryfall.com/sets/5e914d7e-c1e9-446c-a33d-d093c02b2743",
    "set_search_uri": "https://api.scryfall.com/cards/search?order=set&q=e%3Asoi&unique=prints",
    "scryfall_set_uri": "https://scryfall.com/sets/soi?utm_source=api",
    "rulings_uri": "https://api.scryfall.com/cards/c1f53d7a-9dad-46e8-b686-cd1362867445/rulings",
    "prints_search_uri": "https://api.scryfall.com/cards/search?order=released&q=oracleid%3A04eeb9ad-5c59-411b-8809-db8349838588&unique=prints",
    "collector_number": "281",
    "digital": false,
    "rarity": "rare",
    "artist": "Min Yum",
    "artist_ids": ["9cb65d6f-8851-4d56-9add-9eefa274bd1b"],
    "border_color": "black",
    "frame": "2015",
    "frame_effects": ["sunmoondfc"],
    "security_stamp": "oval",
    "full_art": false,
    "textless": false,
    "booster": true,
    "story_spotlight": false,
    "edhrec_rank": 1409,
    "penny_rank": 953,
    "prices": {
        "usd": "7.56",
        "usd_foil": "11.23",
        "usd_etched": null,
        "eur": "5.16",
        "eur_foil": "8.26",
        "tix": "0.02"
    },
    "related_uris": {
        "gatherer": "https://gatherer.wizards.com/Pages/Card/Details.aspx?multiverseid=410049&printed=false",
        "tcgplayer_infinite_articles": "https://partner.tcgplayer.com/c/4931599/1830156/21018?subId1=api&trafcat=infinite&u=https%3A%2F%2Finfinite.tcgplayer.com%2Fsearch%3FcontentMode%3Darticle%26game%3Dmagic%26partner%3Dscryfall%26q%3DWestvale%2BAbbey%2B%252F%252F%2BOrmendahl%252C%2BProfane%2BPrince",
        "tcgplayer_infinite_decks": "https://partner.tcgplayer.com/c/4931599/1830156/21018?subId1=api&trafcat=infinite&u=https%3A%2F%2Finfinite.tcgplayer.com%2Fsearch%3FcontentMode%3Ddeck%26game%3Dmagic%26partner%3Dscryfall%26q%3DWestvale%2BAbbey%2B%252F%252F%2BOrmendahl%252C%2BProfane%2BPrince",
        "edhrec": "https://edhrec.com/route/?cc=Westvale+Abbey"
    },
    "purchase_uris": {
        "tcgplayer": "https://partner.tcgplayer.com/c/4931599/1830156/21018?subId1=api&u=https%3A%2F%2Fwww.tcgplayer.com%2Fproduct%2F115917%3Fpage%3D1",
        "cardmarket": "https://www.cardmarket.com/en/Magic/Products/Singles/Shadows-over-Innistrad/Westvale-Abbey-Ormendahl-Profane-Prince?referrer=scryfall&utm_campaign=card_prices&utm_medium=text&utm_source=scryfall",
        "cardhoarder": "https://www.cardhoarder.com/cards/59810?affiliate_id=scryfall&ref=card-profile&utm_campaign=affiliate&utm_medium=card&utm_source=scryfall"
    }
}
```
