For a given $deck variable `$deck = App\Models\Deck::first();`retrieve the attached cards`get()`through the cards function`cards()`defined by the Deck model function`function cards()`.

```sh tinker
$deck->cards()->get();
```
