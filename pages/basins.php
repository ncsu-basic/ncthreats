<?php

// echo "<p>mountains in php</p>";
$dbname = "ncthreats";
$host = "localhost";
$dbuser = "postgres";

$dbh = new PDO("pgsql:dbname=$dbname;host=$host", $dbuser);

$query = "select distinct riverbasin from ncwrc_priorities where riverbasin != '' order by riverbasin";

$stmt = $dbh->prepare($query);
$stmt->execute();
$result = $stmt->fetchAll();

echo "<table>";
echo "<tr><th class='coatables'>NCWRC Basins</th><th></th></tr>";

// echo "</table>";
// echo "<h4>Terrestrial</h4>";
// echo "<table>";

foreach ($result as $key => $value) {
    // print $key;

        echo "<tr>";
        echo "<td class='coatables1'>{$value['riverbasin']}</td>";
        echo "<td class='coatables'><input name='ncwrc_basins' value='{$value['riverbasin']}' type='radio' /></td>";
        // echo "<td class='coatables'>{$value['nsppwrc_all']}</td>";
        // echo "<td class='coatables'><input name='reg_com' type='radio' /></td>";

        echo "</tr>";
}
echo "</table>";
