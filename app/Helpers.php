<?php    

function splitStringByHyphen($input) {
    // Match words before and after the hyphen
    preg_match('/^(.+?)\s*—\s*(.+)$/', $input, $matches);
    
    // Check if the match was successful
    if (count($matches) === 3) {
        $beforeHyphen = preg_split('/\s+/', trim($matches[1]));
        $afterHyphen  = preg_split('/\s+/', trim($matches[2]));
        return [$beforeHyphen, $afterHyphen];
    }
    
    // Return empty arrays if no match found
    return [[], []];
}
