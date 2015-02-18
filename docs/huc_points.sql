CREATE OR REPLACE FUNCTION public.huc_points()
 RETURNS integer
 LANGUAGE plpgsql
AS $function$
<< outerblock >>
DECLARE

        huc_row record;
        centroid geometry;
        centroidx real;
BEGIN


        FOR huc_row in SELECT huc_12, wkb_geometry from huc12nc LOOP
        RAISE NOTICE 'huc  is %', huc_row.huc_12;
         select into centroidx st_x(ST_Centroid(huc_row.wkb_geometry));
        insert into huc12nc_lbl(label, wkb_geometry) values (huc_row.huc_12, ST_Centroid(huc_row.wkb_geometry));
        RAISE NOTICE 'center  is %', centroidx;
        END LOOP;




    RETURN 0;
END;
$function$
