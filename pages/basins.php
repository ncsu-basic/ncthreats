<?php

// echo "<p>mountains in php</p>";
$dbname = "ncthreats";
$host = "localhost";
$dbuser = "postgres";

$dbh = new PDO("pgsql:dbname=$dbname;host=$host", $dbuser);

$query = "select label from huc6nc_lbl";

$stmt = $dbh->prepare($query);
$stmt->execute();
$result = $stmt->fetchAll();

echo "<table>";
echo "<tr><th class='coatables'>Basin Name</th><th></th></tr>";

// echo "</table>";
// echo "<h4>Terrestrial</h4>";
// echo "<table>";

foreach ($result as $key => $value) {
    // print $key;

        echo "<tr>";
        echo "<td class='coatables1'>{$value['label']}</td>";
        echo "<td class='coatables'><input name='basin' value='{$value['label']}' type='radio' /></td>";
        // echo "<td class='coatables'>{$value['nsppwrc_all']}</td>";
        // echo "<td class='coatables'><input name='reg_com' type='radio' /></td>";

        echo "</tr>";
}
echo "</table>";
