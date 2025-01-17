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
