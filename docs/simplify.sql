http://strk.keybit.net/blog/2012/04/13/simplifying-a-map-layer-using-postgis-topology/

SELECT CreateTopology('nchuc12_topo', find_srid('public', 'huc12nc', 'wkb_geometry'));

SELECT AddTopoGeometryColumn('nchuc12_topo', 'public', 'huc12nc', 'topogeom', 'MULTIPOLYGON');

UPDATE huc12nc SET topogeom = toTopoGeom(wkb_geometry, 'nchuc12_topo', 1);

\i simplify_edge_geom.sql

SELECT SimplifyEdgeGeom('nchuc12_topo', edge_id, .002) FROM nchuc12_topo.edge;

ALTER TABLE huc12nc ADD geomsimp GEOMETRY;
UPDATE huc12nc SET geomsimp = topogeom::geometry;