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
    echo "<tr><td colspan='2' class='coatables'>Include / Exclude Priority Subwatershed Type: </td></tr>";

echo "<tr><td class='coatables1'><input type='checkbox' checked=checked id='tier1_chk'></td><td class='coatables1'>Tier 1</td></tr>";
echo "<tr><td class='coatables1'><input type='checkbox'  id='tier2_chk'></td><td class='coatables1'>Tier 2</td></tr>";
echo "<tr><td class='coatables1'><input type='checkbox'  id='rivbuff_chk'></td><td class='coatables1'>1km River Buffer</td></tr>";
echo "</table>";
echo "<hr>";
echo "<table>";
echo "<tr><th><h4 class='coatables'>Select River Basin:</h4></th><th></th></tr>";
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
