CREATE OR REPLACE FUNCTION public.huc_points()
 RETURNS integer
 LANGUAGE plpgsql
AS $function$
<< outerblock >>
DECLARE

        huc_row record;
        centroid geometry;
        centroidx real;
        huc_label varchar;
BEGIN


        FOR huc_row in SELECT huc_8, wkb_geometry from huc8nc LOOP
        RAISE NOTICE 'huc  is %', huc_row.huc_8;
        select into huc_label subbasin from huc_names where huc8 = huc_row.huc_8;
         select into centroidx st_x(ST_Centroid(huc_row.wkb_geometry));
        insert into huc8nc_lbl(label, wkb_geometry) values (huc_label, ST_Centroid(huc_row.wkb_geometry));
        RAISE NOTICE 'center  is %', centroidx;
        END LOOP;

    RETURN 0;
END;
$function$
