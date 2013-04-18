<?php
/*
created by Jim White
date 4/15/2013
for AJAX to return GML for shp file read as readAsDataURL from file API
*/
$shp = $_POST['shp'];
$shx = $_POST['shx'];
$prj = $_POST['prj'];

$fluff = "data:application/octet-stream;base64,";

$prj_noheaders = str_replace($fluff, '', $prj);
$prj_str = base64_decode($prj_noheaders);

$shp_noheaders = str_replace($fluff, '', $shp);
$shp_data = base64_decode($shp_noheaders);

$shx_noheaders = str_replace($fluff, '', $shx);
$shx_data = base64_decode($shx_noheaders);

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

$cmd = "/usr/bin/ogr2ogr -f GeoJSON -t_srs EPSG:900913  /tmp/{$base_file}.json /tmp/{$base_file}.shp";
exec($cmd);

$json = file_get_contents("/tmp/{$base_file}.json");
//$gml_header = "data:application/xml;base64,";
//$gml_data = $gml_header.base64_encode($gml);

echo json_encode(array("json"=>$json));

