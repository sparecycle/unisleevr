---
version: 1
createdtime: 2025-01-09T11:00:13.745Z
---

modified_time:: `=dateformat(this.file.mtime, "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'")`

## Classes

| Class     | Description                                   | Notes                            |
| --------- | --------------------------------------------- | -------------------------------- |
| Users     | User Accounts                                 |                                  |
| Decks     | Decks                                         |                                  |
| Cards     | MTG Cards, defined by Scryfall bulk imports   |                                  |
| Card_Deck | Many-to-many join between card_id and deck_id | Intermediate Table (Association) |

## Entity Relationship Diagram (ERD)

```mermaid
erDiagram

	%% Entities %%

    Users {
        integer id PK "primary key autoincrement"
        varchar name "not null"
        varchar email UK "not null"
        datetime email_verified_at
        varchar password "not null"
        varchar remember_token
        datetime created_at
        datetime updated_at
    }

    Decks {
        integer id PK "primary key autoincrement"
        varchar name "not null"
        integer user_id FK "not null"
		datetime created_at
        datetime updated_at
    }

    Cards {
        varchar id PK, UK "primary key, UUID"
        varchar name "not null"
        varchar scryfall_uri "not null"
        text image_uris "not null"
        datetime created_at
        datetime updated_at
        varchar type_line
        text oracle_text
        text color_identity
        varchar mana_cost
        varchar power
        varchar toughness
    }

    Card_Deck {
        integer id PK "primary key autoincrement"
        integer deck_id FK "not null"
        varchar card_id FK "not null"
        datetime created_at
        datetime updated_at
    }

	%% Relationships  %%

    Users ||--o{ Decks: "HAS MANY"
    Decks ||--o{ Card_Deck: "CONTAINS"
    Cards ||--o{ Card_Deck: "IS"

```

## Notes

- Syntax Reference: https://mermaid.js.org/syntax/entityRelationshipDiagram.html
- VS Code Mermaid Preview: https://marketplace.visualstudio.com/items?itemName=bierner.markdown-mermaid
