<?php

    echo "<p>mountains in php</p>";
    $dbname = "ncthreats";
    $host = "localhost";
    $dbuser = "postgres";

    $dbh = new PDO("pgsql:dbname=$dbname;host=$host", $dbuser);

    echo $dbh;

    $query = "select * from coa_keylist";

    $dbh->query($query);

    while($result = $sql-> fetch(PDO_FETCH_ASSOC)  ) {
               print_r($result);
    }


