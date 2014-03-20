<?php
/*
created by Jim White
date 4/15/2013
for AJAX to return GML for shp file read as readAsDataURL from file API
*/
$shp = $_POST['shp'];
$shx = $_POST['shx'];
$prj = $_POST['prj'];

$fluff = "data:application/octet-stream;base64,";//for firefox
$fluff2 = "data:;base64,";//for chrome
$fluff3 = urlencode($fluff2);//for ie

$prj = str_replace($fluff, '', $prj);
$prj = str_replace($fluff2, '', $prj);
$prj = str_replace($fluff3, '', $prj);
$prj_str = base64_decode($prj);

$shp = str_replace($fluff, '', $shp);
$shp = str_replace($fluff2, '', $shp);
$shp = str_replace($fluff3, '', $shp);
$shp_data = base64_decode($shp);

$shx = str_replace($fluff, '', $shx);
$shx = str_replace($fluff2, '', $shx);
$shx = str_replace($fluff3, '', $shx);
$shx_data = base64_decode($shx);

$base_file = "upload".rand(1000000, 9999999);

$fp1 = fopen("/tmp/{$base_file}.shp", "wb");
fwrite($fp1, $shp_data );
fclose($fp1);

$fp1 = fopen("/tmp/{$base_file}.shx", "wb");
fwrite($fp1, $shx_data );
fclose($fp1);

$fp1 = fopen("/tmp/{$base_file}.prj", "wb");
fwrite($fp1, $prj_str);
fclose($fp1);

$cmd = "/usr/local/bin/ogr2ogr -f GeoJSON -t_srs EPSG:900913  /tmp/{$base_file}.json /tmp/{$base_file}.shp";
exec($cmd);

$json = file_get_contents("/tmp/{$base_file}.json");


echo json_encode(array("json"=>$json));

