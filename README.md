<p align="center"><a href="https://laravel.com" target="_blank"><img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="400" alt="Laravel Logo"></a></p>

<p align="center">
<a href="https://github.com/laravel/framework/actions"><img src="https://github.com/laravel/framework/workflows/tests/badge.svg" alt="Build Status"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/dt/laravel/framework" alt="Total Downloads"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/v/laravel/framework" alt="Latest Stable Version"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/l/laravel/framework" alt="License"></a>
</p>

## useful commands

```
generate dummy decks - php artisan deck:seedmany {userId} {count}
generate paired-commanders.json - php artisan scryfall:fetch-paired-commanders

Testing: 

php artisan test PATH/TO/TESTFILE
php artisan test tests/Feature/DeckControllerTest.php
```

## Pre-Installation

If you don't have PHP, Composer, or the Laravel installer, run this:

```
/bin/bash -c "$(curl -fsSL https://php.new/install/mac/8.3)"
```

## Installation

1. Now that you have Composer, install your dependencies:

```
composer install
npm install
```

2. Set up your environment file:

```
cp .env.example .env
```

3. Generate your app key:

```
php artisan key:generate
```

4. Create database migrations:

```
php artisan migrate
```

[See more info](https://laravel.com/docs/11.x/installation)

## Running the project

Once you have followed the Installation instructions, run the following to start the app:

```
composer run dev
```

---

## Learning Laravel

- Laravel Documentation [documentation](https://laravel.com/docs)
- [Laravel Bootcamp](https://bootcamp.laravel.com)
- Laracasts video library: [Laracasts](https://laracasts.com)

## Contributing

Comming soon!

## Code of Conduct

Comming soon!

## License

Comming soon!

The Laravel framework is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).

## Docs

For common command references and guides see [/docs/](/docs/)
