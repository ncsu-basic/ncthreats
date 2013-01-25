var map;
Ext.onReady(function() {
    var map_extent = new OpenLayers.Bounds(-9462455, 3963396, -8324634, 4405547);
    //map_extent = new OpenLayers.Bounds(85, 33, 75, 36);
    map = new OpenLayers.Map({
	maxExtent: map_extent,
	projection: new OpenLayers.Projection("EPSG:900913"),
	displayProjection: new OpenLayers.Projection("EPSG:4326")
    });
    var ncelev = new OpenLayers.Layer.WMS("NC Elevation", "http://tecumseh.zo.ncsu.edu:8080/geoserver/wms",
    // "http://maps.opengeo.org/geowebcache/service/wms",
    //{layers: "bluemarble"}
    {
	layers: "NC_Hill_3857_to",
	format: 'image/png'
    },{isBaseLayer: true});
    
    var nchuc = new OpenLayers.Layer.WMS("NC HUC 12", "http://tecumseh.zo.ncsu.edu:8080/geoserver/wms",
    // "http://maps.opengeo.org/geowebcache/service/wms",
    //{layers: "bluemarble"}
    {
	layers: "huc12nc_2",
	format: 'image/png',
	transparent: true
    },
    {isBaseLayer: false,
    visibility: false});
    
    

    map.addLayers([nchuc, ncelev]);
    map.zoomToMaxExtent();
    map.addControl(new OpenLayers.Control.MousePosition());

    var mapPanel = new GeoExt.MapPanel({
	region: "center",	
	map: map,
	title: 'NC Map'
    });
    
    var layerList = new GeoExt.tree.LayerContainer({
	layerStore: mapPanel.layers,
	text: 'layers',
	leaf: false,
	expanded: true,
	rootVisible: false
	});
    
    var tree = new Ext.tree.TreePanel({
	region: 'west',
	width: 300,
	root: layerList,
	title: "NC layers"
	});
    
    new Ext.Viewport({
	layout: "border",
	items: [mapPanel, tree],
	defaults: {
	    split: true
	}
    })
    
    
});