<?php

namespace App\Http\Controllers;

use App\Models\Deck;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;
use Inertia\Inertia;
use Inertia\Response;

class CardController extends Controller
{
    public function index(): Response 
    {
        // Sample array
        $cardList = [
                "86bf43b1-8d4e-4759-bb2d-0b2e03ba7012",
                "7050735c-b232-47a6-a342-01795bfd0d46",
                "e718b21b-46d1-4844-985c-52745657b1ac",
                "036ef8c9-72ac-46ce-af07-83b79d736538",
                "6010d06b-33b6-4631-9b3f-192d8c6b96e7",
                "b125d1e7-5d9b-4997-88b0-71bdfc19c6f2",
                "e0f83824-43c6-4101-88fd-9109958b23e2",
                "2cfd365e-34d1-4224-b925-119000311934",
                "feeee859-f64a-4cd8-be0b-ad60cff8812e",
                "3c97d419-6fee-4a32-9e64-8a827da59934",
                "0072bbbf-a695-47dd-9615-db2659f357db",
                "5c0a4e6e-cc4e-43d5-aece-f009e117366a",
                "5ab2ba75-e52e-46f5-8a34-3fe1e07446fd",
                "ada68b91-3379-483e-93a0-b6c7c675c1dc",
                "1ce91e38-4601-4354-ad1b-2c5c1c70da17",
                "ef772879-44aa-428d-8c12-50d38f8bac80",
                "bea12617-ebaa-45f6-a2e8-b71190708129",
                "8bbdc7c5-71a1-4db8-98b2-8883bf648dca",
                "aa686c34-1c11-469f-93c2-f9891aea521f",
                "ad806d67-4c98-438b-859f-b1358281e09d",
                "0b4cc234-f6b7-4801-a6d0-c98b72f446cf",
                "491a3dc5-d297-47e1-acf9-dda103136519",
                "55552a2b-1861-4235-a60d-ccabb4839d54",
                "740564ec-c473-45bc-ba94-288786bf28b9",
                "5fbfdc2a-7bf3-4461-bef7-fa499d29d1b8",
                "7d09f247-99c6-4038-9cd1-7c4ccc3d7005",
                "4cdfb468-e475-47e6-80f5-190c9b206e70",
                "f477e57d-e391-4732-88c9-aec6598231c7",
                "859aab70-8192-414c-839b-dd0fbcbd8bf1",
                "61edb39b-ff82-4568-971f-baf22e209c88",
                "a7a14b58-e0d9-4203-a9da-ad8e997a7936",
                "21afb029-9aef-4e6e-a646-3343605b4bb7",
                "97fde010-c75b-4e5f-82e2-6dc1c5dfe1a4",
                "5029bc71-29bf-47cf-a64b-7ab3d9af39ca",
                "1f75f7a3-b4d2-40e1-9721-cbe6a63971ba",
                "87aab031-4e44-44cd-89a7-6cffc7288cd1",
                "2399c6d7-57f9-4100-ad64-3c8897a438f7",
                "b0e90b22-6f43-4e9a-a236-f33191768813",
                "884c47fa-7060-48da-995c-e4037640a208",
                "91df110f-85d2-41cb-96b6-6c79cebfada7",
                "93ddde4f-d35e-4128-8f43-d0eadbd715de",
                "1a7cc43c-6e8c-41d2-a885-24604dfc7e7f",
                "179461b8-0a6b-48c5-9d1f-db8bcfecc6f9",
                "caf28377-d831-4100-9843-d9f5db019791",
                "f01f12e0-f354-43aa-9e2d-b59a99571a5f",
                "8d264ad1-10a3-41ba-9740-48f2c07a0ec3",
                "18fbfbc0-c55b-4e56-a3d2-5d09571c36c8",
                "b2c280c8-3471-4ae1-be96-0f392b095ce2",
                "1a9d4ff8-af35-413f-9aa2-f4c6e34fade2",
                "748e6a61-9c1f-4225-9f04-e54002f63ac3",
                "d5f108e7-7454-4c11-b1de-97d0bcc3c470",
                "2e0c6628-04f1-4800-baa8-bcaefe64f59f",
                "5b71c6bd-db67-46ca-9c96-119e89f8ef69",
                "d753c296-8cef-492d-ab41-e7ddb233d46e",
                "c086eb41-3524-4815-97c9-761ba86a30b2",
                "4849db5d-cd41-49f6-acd5-697cdc8263f6",
                "cba131bb-b8b3-4577-9f41-4700d9985134",
                "d3f990e7-54a3-4893-8510-645b2065447b",
                "5deaa491-d95b-481f-aa47-8e7219174cc5",
                "7d77ddcc-e66b-4036-8a55-ec42953918d1",
                "efc9db16-53d3-4d27-ba42-c3c445f2f92f",
                "364535a0-fa83-4e27-8cce-b38481b5eff1",
                "626c46a3-72b8-4e04-adf2-c9c7aaf94f04",
                "5aa9adcd-af58-4055-902c-806a2787c3bd",
                "0685afcb-06f6-4d18-b8c2-510764558dc1",
                "6ed84268-92f7-4790-99b2-f2982b6e0893",
                "8c05568e-fa50-46e9-aec4-1ba5e814029e",
                "5e1b65a7-d385-428b-986c-a0d9283a5f75",
                "9eac78a2-599f-4dba-aec7-982c5ae3f75a",
                "9091d908-456f-4127-857d-b22fdb4f2fd9",
                "99a2ed5f-62b8-4308-a656-f273f62f6ab8",
                "ef44324a-32bd-47e9-8fd9-258ba668de53",
                "2684f2e5-e3f9-4277-94a1-aba6913ac53b",
                "4063be5b-bfd9-43c5-bc39-09a40bc793bf",
                "099352e2-38c8-4fb4-a25f-6d928aa20f9e",
                "13a4c124-216b-44b1-b49a-3db3f033e4cd",
                "4123da54-9947-462e-9862-3eecc459a75b",
                "a8003786-6e2a-4e2d-a915-f23293c7273a",
                "49827a57-cf10-4a44-a1fd-ac611da39dc9",
                "28273a5b-57b3-4b7a-b017-5886c171c9c9",
                "bd17b2c1-c3dd-4f6f-a44c-dc81c6bc1c94",
                "b338e078-629c-4cac-bd1d-e1f0a132728d",
                "8f59b36f-d549-4a1e-940c-d0f20fc95576",
                "ae2998a1-1713-467e-a08e-0efd8720aa5b",
                "ddc770fd-d513-420b-94f8-f2d28d8ed8d1",
                "9e81806d-5d87-4032-ad94-c2cdeabecdbf",
                "5af01330-05c2-4c5b-9830-2886711b2b5d",
                "3002ccef-5322-4f99-9fce-3b4303347240",
                "b67e28b2-9d25-4873-8db2-1f0853ab0c47",
                "61d4899f-11a4-4a2c-a499-3a447b792f86",
                "e4a9051b-f964-43f9-877b-ea4f17620ecb",
                "07076412-18fe-4e15-bdb5-17111b4a66db",
                "77a43413-3ab0-4ef6-83de-192a11d48f00",
                "0382cb94-0836-4e23-99b7-034faa363203",
                "d82a4c78-d2fc-425a-8d0e-2e64509a08f1",
                "298f1ab2-4c66-4d91-8f6a-1bad230632df",
                "0e814e48-cd9d-428f-90e2-74d97cb9c8f1",
                "90489370-dac6-4e45-a837-d9cb6c8e66b2",
                "f7d6c117-0924-404a-9b06-5c28b830d316",
                "b9af422c-f4f6-4497-afcb-b914cdd1e800"
            // Add more IDs as needed
        ];

        // Transform cardList into identifiers array
        $identifiers = array_map(function($id) {
            return ['id' => $id];
        }, $cardList);

        // Initialize an empty array to store the combined responses
        $allCards = [];

        // Split the identifiers array into chunks of 75
        $chunks = array_chunk($identifiers, 75);

        // Iterate over each chunk and make an HTTP request
        foreach ($chunks as $chunk) {
            $scryfallResponse = Http::post('https://api.scryfall.com/cards/collection', [
                'identifiers' => $chunk
            ]);

            if ($scryfallResponse->successful()) {
                $cards = $scryfallResponse->json('data');
                $allCards = array_merge($allCards, $cards);
            } else {
                \Log::error('Failed to fetch cards from Scryfall API. Status: ' . $scryfallResponse->status());
            }
        }

        return Inertia::render('Cards/Index', [
            'cards' => $allCards
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Card $Card)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Card $Card)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Card $Card)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Card $Card)
    {
        //
    }
}
