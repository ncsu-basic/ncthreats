<?php
// header("Content-Type: image/png");
// echo "test";

$conn = new PDO("sqlite:/home/jim/Documents/MapBox/export/huc6.mbtiles");
// echo "test";

    $sql = "SELECT  zoom_level , tile_column , tile_row from tiles";
// echo $sql;
    $q = $conn->prepare($sql);
    $q->execute();

// echo "test";

    while($row = $q->fetch()){
        echo $row[3] . "\n";
        die();
    }
echo "test";
