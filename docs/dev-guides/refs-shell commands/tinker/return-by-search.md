Return `Card` where `name` is like `Omnath`.

Example

```sh tinker
App\Models\Card::where('name', 'like', '%Omnath%')->get();
```

Template

```sh tinker
App\Models\{{MODEL}}::where('{{PROPERTY}}', 'like', '%{{STRING}}%')->get();
```
