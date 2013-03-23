CREATE or replace FUNCTION aoitohuc(aoi_ident text) RETURNS  text AS $$
<< outerblock >>
DECLARE
    	quantity integer := 30;
	huc12s char(12);
	aoipk integer;
	aoiarea real;
	
	results_geom geometry;
	result_code integer;
	
BEGIN
    	
	for huc12s in select  distinct huc_12 from huc12nc, aoi where  ST_intersects(huc12nc.wkb_geometry, aoi.the_geom) and aoi.identifier  = aoi_ident loop
	
		for aoipk in select pk from aoi where aoi.identifier  = aoi_ident loop
			--RAISE NOTICE 'aoi pk here is %', aoipk;  
			select into aoiarea st_area(geography(st_intersection(huc12nc.wkb_geometry, aoi.the_geom))) from aoi, huc12nc where aoi.pk = aoipk and huc12nc.huc_12 = huc12s;
			
			--RAISE NOTICE 'area here is %', aoiarea;
			if aoiarea > 100 then
				--select into huc12_geom ST_AsText(wkb_geometry) from huc12nc where huc_12 = huc12s;
				select into results_geom wkb_geometry from huc12nc where huc_12 = huc12s;
				insert into results (huc12, identifier,  the_geom) values (huc12s, aoi_ident, results_geom);
				--return next huc12s;
				--return next huc12_geom;
			end if;

		END LOOP;


	END LOOP;
 	return 'success';

	
    	
END;
$$ LANGUAGE plpgsql;
