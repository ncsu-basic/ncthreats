<?php

// echo "<p>mountains in php</p>";
$dbname = "ncthreats";
$host = "localhost";
$dbuser = "postgres";

$dbh = new PDO("pgsql:dbname=$dbname;host=$host", $dbuser);

$query = "select * from coa_keylist";

$stmt = $dbh->prepare($query);
$stmt->execute();
$result = $stmt->fetchAll();

echo "<h4>Aquatic</h4>";
echo "<table>";

foreach ($result as $key => $value) {
    // print $key;

    if ($value['region'] == 'Coastal Plain' && $value['type'] == 'Aquatic') {
        // print_r($value);
        // print "<br>";
        // print "<br>";
        echo "<tr><td class='coatables'>{$value['communityname']}</td></tr>";
    }
}
echo "</table>";
echo "<h4>Terrestrial</h4>";
foreach ($result as $key => $value) {
    // print $key;

    if ($value['region'] == 'Coastal Plain' && $value['type'] == 'Terrestrial') {
        print_r($value);
        print "<br>";
        print "<br>";
    }
}
