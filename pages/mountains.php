<?php

include 'connect.php';

// echo "<p>mountains in php</p>";
$dbname = "ncthreats";
$host = "localhost";
$dbuser = "postgres";

$dbh = new PDO($connect_string);

$query = "select * from coa_keylist";

$stmt = $dbh->prepare($query);
$stmt->execute();
$result = $stmt->fetchAll();

echo "<table>";
echo "<tr><th class='coatables'>Community Name</th><th></th><th class='coatables'>SGCN Spp</th></tr>";

// echo "</table>";
// echo "<h4>Terrestrial</h4>";
// echo "<table>";
echo "<tr><td><h4 class='coatables'>Terrestrial</h4></td></tr>";

foreach ($result as $key => $value) {
    // print $key;

    if ($value['region'] == 'Mountains' && $value['type'] == 'Terrestrial') {
        echo "<tr>";
        echo "<td class='coatables1'>{$value['communityname']}</td>";
        if ($value['nsppwrc_sgcn'] > 0) {
            echo "<td class='coatables'><input name='reg_com' value='{$value['keycode']}' type='radio' /></td>";
        }
        else {
            echo "<td class='coatables'>-</td>";
        }
        // echo "<td class='coatables'>{$value['nsppwrc_all']}</td>";
        // echo "<td class='coatables'><input name='reg_com' type='radio' /></td>";
        echo "<td class='coatables'>{$value['nsppwrc_sgcn']}</td>";

        echo "</tr>";
    }
}
// echo "</table>";
echo "<tr><td><h4 class='coatables'>Wetland</h4></td></tr>";

// echo "<h4>Wetland</h4>";
// echo "<table>";

foreach ($result as $key => $value) {
    // print $key;

    if ($value['region'] == 'Mountains' && $value['type'] == 'Wetland') {
        echo "<tr>";
        echo "<td class='coatables1'>{$value['communityname']}</td>";
        if ($value['nsppwrc_sgcn'] > 0) {
            echo "<td class='coatables'><input name='reg_com' value='{$value['keycode']}' type='radio' /></td>";
        }
        else {
            echo "<td class='coatables'>-</td>";
        }
        // echo "<td class='coatables'>{$value['nsppwrc_all']}</td>";
        // echo "<td class='coatables'><input name='reg_com' type='radio' /></td>";
        echo "<td class='coatables'>{$value['nsppwrc_sgcn']}</td>";

        echo "</tr>";
    }
}
echo "<tr><td><h4 class='coatables'>Aquatic</h4></td></tr>";

foreach ($result as $key => $value) {
    // print $key;

    if ($value['region'] == 'Mountains' && $value['type'] == 'Aquatic') {
        // print_r($value);
        // print "<br>";
        // print "<br>";
        echo "<tr>";
        echo "<td class='coatables1'>{$value['communityname']}</td>";
        if ($value['nsppwrc_sgcn'] > 0) {
            echo "<td class='coatables'><input name='reg_com' value='{$value['keycode']}' type='radio' /></td>";
        }
        else {
            echo "<td class='coatables'>-</td>";
        }
        // echo "<td class='coatables'>{$value['nsppwrc_all']}</td>";
        // echo "<td class='coatables'><input name='reg_com' type='radio' /></td>";
        echo "<td class='coatables'>{$value['nsppwrc_sgcn']}</td>";

        echo "</tr>";
    }
}
echo "</table>";
