<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Http;

class FetchPairedCommanders extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'scryfall:fetch-paired-commanders';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Fetch all paired commander mechanic cards from Scryfall';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('Fetching paired commander mechanics from Scryfall...');

        // Define our queries with proper Scryfall syntax
        $queries = [
            'originalPartner' => 'oracle:partner -oracle:with',
            'partnerWith' => 'oracle:"partner with"',
            'friendsForever' => 'oracle:"friends forever"',
            'chooseBackground' => 'oracle:"choose a background"',
            'doctorsCompanion' => 'oracle:"doctor\'s companion"',
            'companion' => 'oracle:companion keyword:companion',
            'backgrounds' => 'type:background type:enchantment type:legendary',
            'timeLordDoctors' =>
                'type:legendary type:creature t:doctor t:"time lord"',
        ];

        // Create URLs with properly encoded query parameters
        $urls = [];
        foreach ($queries as $key => $query) {
            // Use rawurlencode for each query component
            $encodedQuery = str_replace(
                ['%20', '%3A', '%22', '%27'],
                ['+', ':', '"', "'"],
                rawurlencode($query)
            );
            $urls[$key] =
                'https://api.scryfall.com/cards/search?q=' . $encodedQuery;
        }

        // Fetch all data
        $results = [];
        $this->output->progressStart(count($urls));

        // Fetch each category of cards
        foreach ($urls as $key => $url) {
            $this->newLine();
            $this->info("Fetching {$key}...");
            $this->line("URL: {$url}");

            try {
                $results[$key] = $this->fetchAllPages($url);
            } catch (\Exception $e) {
                $this->error("Error fetching {$key}: " . $e->getMessage());
                $results[$key] = [];
            }

            // Progress bar
            $this->output->progressAdvance();

            // Be nice to Scryfall API
            sleep(1);
        }

        $this->output->progressFinish();
        $this->newLine();

        // Display summary counts
        $this->info('Results fetched successfully!');
        $this->newLine();

        $this->info('Summary:');
        foreach ($results as $category => $cards) {
            $this->line("{$category}: " . count($cards) . ' cards found');
        }

        $this->newLine();

        // Display card names for each category
        foreach ($results as $category => $cards) {
            $this->info("{$category} Cards:");

            if (empty($cards)) {
                $this->warn('No cards found for this category');
                $this->newLine();
                continue;
            }

            $table = [];
            foreach ($cards as $card) {
                $table[] = [$card['name']];
            }

            $this->table(['Card Name'], $table);
            $this->newLine();
        }

        // Process data for JSON output
        $allCards = [];
        $categories = [];

        foreach ($results as $category => $cards) {
            // Add cards to the flattened array
            foreach ($cards as $card) {
                $allCards[$card['id']] = $card; // Use card ID as the key to avoid duplicates
            }

            // Add category with card IDs
            $categories[] = [
                'name' => $category,
                'cards' => array_map(fn($card) => $card['id'], $cards),
            ];
        }

        // Convert the flattened array to a simple indexed array
        $allCards = array_values($allCards);

        // Prepare the final JSON structure
        $output = [
            'allCards' => $allCards,
            'categories' => $categories,
        ];

        // Save results to a JSON file
        $filePath = base_path('database/seeders/paired_commanders.json');
        $this->info("Saving results to: {$filePath}");
        file_put_contents($filePath, json_encode($output, JSON_PRETTY_PRINT));

        $this->info('JSON file saved successfully!');
        return Command::SUCCESS;
    }

    /**
     * Fetch all pages of results for a query
     *
     * @param string $url
     * @return array
     */
    private function fetchAllPages($url)
    {
        $allCards = [];

        while ($url) {
            $response = Http::withHeaders([
                'Accept' => 'application/json',
                'User-Agent' => 'UnisleevR/1.0', // Replace with your app name
            ])->get($url);

            if (!$response->successful()) {
                $data = $response->json();
                if (isset($data['code']) && $data['code'] === 'not_found') {
                    $this->warn('No cards found for this query.');
                    return [];
                }

                throw new \Exception(
                    "HTTP error! Status: {$response->status()}, Details: " .
                        $response->body()
                );
            }

            $data = $response->json();

            if (!isset($data['data'])) {
                throw new \Exception('No data found in response');
            }

            $allCards = array_merge($allCards, $data['data']);

            // Check if there are more pages
            $url =
                isset($data['has_more']) && $data['has_more']
                    ? $data['next_page']
                    : null;

            // Be nice to Scryfall API - add delay between requests
            if ($url) {
                $this->line('Fetching next page...');
                usleep(100000); // 100ms delay
            }
        }

        return $allCards;
    }
}
