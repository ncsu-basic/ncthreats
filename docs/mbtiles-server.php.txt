<?php
/*
    Code under : GNU AFFERO GENERAL PUBLIC LICENSE
    Full support of MBTiles feature from
    Frederic Rodrigo - 2013 - <frederic@carte-libre.fr>

    Original PHP PNG server from MBTiles from
    http://projects.bryanmcbride.com/ol_mbtiles/
*/
$db = $_GET['db'];
$zoom = $_GET['z'];
$column = $_GET['x'];
$row = $_GET['y'];
$callback = $_GET['callback'];

$file = $_SERVER['SCRIPT_NAME'];
$break = explode('/', $file);
$pfile = $break[count($break) - 1]; 

if( !isset($db) ) {
    echo "<html><body><pre>\n";
    echo "Usage:\n";
    echo "tiles $pfile?db=[file.mbtile]&z=[Z]&x=[X]&y=[Y]\n";
    echo "utfgrid metainfo: $pfile?db=[file.mbtile]&callback=grid\n";
    echo "utfgrid tiles: $pfile?db=[file.mbtile]&callback=grid&z=[Z]&x=[X]&y=[Y]\n";
    echo "</pre></body></html>\n";
    die();
}

try {
    $conn = new PDO('sqlite:'.$db);

    if( $callback && !isset($zoom) ) {
        // Serve metainfo

        $sql = "SELECT * FROM metadata";
        $q = $conn->prepare($sql);
        $q->execute();

        $q->bindColumn(1, $name);
        $q->bindColumn(2, $value);

        $meta = array(
            'grids' => array("$pfile?db=$db&z={z}&x={x}&y={y}"),
            'tiles' => array("$pfile?db=$db&z={z}&x={x}&y={y}"),
            'download' => $db,
            'basename' => $db,
            'scheme' => 'xyz',
            //'id' => $db,
            //'_id' => $db,
            //'center' => '[0,0,4]',
            //'_rev' => '1',
            //'filesize' => 123,
            //'webpage' => 'http://',
        );
        while($q->fetch()) {
            $meta[$name] = $value;
        }

        header('Cache-Control:public, max-age=31536000');
        header('Content-Type: application/json');
        echo $callback.'('.json_encode($meta).');';

    } else if( $callback ) {
        // Serve utfgrid tile

        $row = ((1 << $zoom) - $row - 1);

        $sql = "SELECT * FROM grids WHERE zoom_level = $zoom AND tile_column = $column AND tile_row = $row";
        $q = $conn->prepare($sql);
        $q->execute();

        //$q->bindColumn(1, $zoom_level);
        //$q->bindColumn(2, $tile_column);
        //$q->bindColumn(3, $tile_row);
        $q->bindColumn(4, $grid, PDO::PARAM_LOB);

        while($q->fetch()) {
            $json = gzinflate(substr($grid, 2));

            $sql_data = "SELECT * FROM grid_data WHERE zoom_level = $zoom AND tile_column = $column AND tile_row = $row";
            $q_data = $conn->prepare($sql_data);
            $q_data->execute();

            $q_data->bindColumn(4, $id_data, PDO::PARAM_LOB);
            $q_data->bindColumn(5, $data, PDO::PARAM_LOB);

            $datas = "";
            while($q_data->fetch()) {
                $datas .= "\"$id_data\":$data,";
            }

            $json = substr($json, 0, strlen($json)-1) . ',"data":{' . $datas . '}}';

            header('Cache-Control:public, max-age=31536000');
            header('Content-Type: application/json');
            echo $callback.'('.$json.');';
        }

    } else {
        // Serve bitmap tile

        $row = ((1 << $zoom) - $row - 1);

        $sql = "SELECT * FROM tiles WHERE zoom_level = $zoom AND tile_column = $column AND tile_row = $row";
        $q = $conn->prepare($sql);
        $q->execute();

        //$q->bindColumn(1, $zoom_level);
        //$q->bindColumn(2, $tile_column);
        //$q->bindColumn(3, $tile_row);
        $q->bindColumn(4, $tile_data, PDO::PARAM_LOB);

        while($q->fetch()) {
            header('Cache-Control:public, max-age=31536000');
            header('Content-Type: image/png');
            echo $tile_data;
        }

    }

}
catch(PDOException $e) {
    print 'Exception : '.$e->getMessage();
}
?>
