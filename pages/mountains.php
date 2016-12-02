<?php

echo "<p>mountains in php</p>";
$dbname = "ncthreats";
$host = "localhost";
$dbuser = "postgres";

$dbh = new PDO("pgsql:dbname=$dbname;host=$host", $dbuser);

$query = "select * from coa_keylist";

$stmt = $dbh->prepare($query);
$stmt->execute();
$result = $stmt->fetchAll();

foreach ($result as $key => $value) {
    // print $key;

    if ($value['region'] == 'Coastal Plain' && $value['type'] == 'Aquatic') {
        print_r($value);
        print "<br>";
        print "<br>";
    }
}
