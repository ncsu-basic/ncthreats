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

    if ($value['region'] == 'Sandhills' && $value['type'] == 'Aquatic') {
        // print_r($value);
        // print "<br>";
        // print "<br>";
        echo "<tr>";
        echo "<td class='coatables'>{$value['communityname']}</td>";
        echo "<td class='coatables'><input name='reg_com' type='radio' /></td>";
        echo "<td class='coatables'>{$value['nsppwrc_all']}</td>";
        echo "<td class='coatables'><input name='reg_com' type='radio' /></td>";
        echo "<td class='coatables'>{$value['nsppwrc_sgcn']}</td>";

        echo "</tr>";
    }
}
echo "</table>";
echo "<h4>Terrestrial</h4>";
echo "<table>";

foreach ($result as $key => $value) {
    // print $key;

    if ($value['region'] == 'Sandhills' && $value['type'] == 'Terrestrial') {
        echo "<tr>";
        echo "<td class='coatables'>{$value['communityname']}</td>";
        echo "<td class='coatables'><input name='reg_com' type='radio' /></td>";
        echo "<td class='coatables'>{$value['nsppwrc_all']}</td>";
        echo "<td class='coatables'><input name='reg_com' type='radio' /></td>";
        echo "<td class='coatables'>{$value['nsppwrc_sgcn']}</td>";

        echo "</tr>";
    }
}
echo "</table>";

echo "<h4>Wetland</h4>";
echo "<table>";

foreach ($result as $key => $value) {
    // print $key;

    if ($value['region'] == 'Sandhills' && $value['type'] == 'Wetland') {
        echo "<tr>";
        echo "<td class='coatables'>{$value['communityname']}</td>";
        echo "<td class='coatables'><input name='reg_com' type='radio' /></td>";
        echo "<td class='coatables'>{$value['nsppwrc_all']}</td>";
        echo "<td class='coatables'><input name='reg_com' type='radio' /></td>";
        echo "<td class='coatables'>{$value['nsppwrc_sgcn']}</td>";

        echo "</tr>";
    }
}
echo "</table>";
