var map;
Ext.onReady(function() {
	var map_extent = new OpenLayers.Bounds(-9462455, 3963396, -8324634, 4405547);
	//var map_extent = new OpenLayers.Bounds(-76.652, 36.289, -75.7, 37.08);
	var proj_4326 = new OpenLayers.Projection('EPSG:4326');
	var proj_900913 = new OpenLayers.Projection('EPSG:900913');
	//map_extent = new OpenLayers.Bounds(85, 33, 75, 36);
	map = new OpenLayers.Map({
		//maxExtent: map_extent,
		projection : new OpenLayers.Projection("EPSG:900913"),
		displayProjection : new OpenLayers.Projection("EPSG:4326")
	});
	var ncelev = new OpenLayers.Layer.WMS("NC Elevation", "http://tecumseh.zo.ncsu.edu/geoserver/wms", {
		layers : "NC_Hill_3857_to",
		format : 'image/png'
	}, {
		isBaseLayer : true
	});

	var gphy = new OpenLayers.Layer.Google("Google Physical", {
		type : google.maps.MapTypeId.TERRAIN
	}, {
		isBaseLayer : true
	});

	var nchuc12 = new OpenLayers.Layer.WMS("NC HUC 12", "http://tecumseh.zo.ncsu.edu/geoserver/wms", {
		layers : "huc12nc_2",
		format : 'image/png',
		transparent : true
	}, {
		isBaseLayer : false,
		visibility : false
	});

	var nchuc8 = new OpenLayers.Layer.WMS("NC HUC 8", "http://tecumseh.zo.ncsu.edu/geoserver/wms", {
		layers : "huc8nc",
		format : 'image/png',
		transparent : true
	}, {
		isBaseLayer : false,
		visibility : false
	});

	var nchuc4 = new OpenLayers.Layer.WMS("NC HUC 4", "http://tecumseh.zo.ncsu.edu/geoserver/wms", {
		layers : "huc4nc",
		format : 'image/png',
		transparent : true
	}, {
		isBaseLayer : false,
		visibility : false
	});

	var counties = new OpenLayers.Layer.WMS("NC Counties", "http://tecumseh.zo.ncsu.edu/geoserver/wms", {
		layers : "counties",
		format : 'image/png',
		transparent : true
	}, {
		isBaseLayer : false,
		visibility : false
	});

	var ncbcr = new OpenLayers.Layer.WMS("NC BCR", "http://tecumseh.zo.ncsu.edu/geoserver/wms", {
		layers : "nc_bcr",
		format : 'image/png',
		transparent : true
	}, {
		isBaseLayer : false,
		visibility : false
	});

	var styleMap = new OpenLayers.StyleMap({
		strokeColor : "red",
		strokeWidth : 2,
		strokeOpacity : 0.5,
		fillOpacity : 0.2
	});

	var highlightLayer = new OpenLayers.Layer.Vector("Highlighted Features", {
		displayInLayerSwitcher : false,
		isBaseLayer : false,
		projection : proj_4326,
		styleMap : styleMap
	});

	map.addLayers([nchuc4, nchuc8, nchuc12, counties, ncbcr, gphy, highlightLayer]);

	map.addControl(new OpenLayers.Control.MousePosition());

	var featureinfo_format = new OpenLayers.Format.WMSGetFeatureInfo({
		externalProjection : proj_4326,
		internalProjection : proj_900913
	});

	var query_ctl = new OpenLayers.Control.WMSGetFeatureInfo({
		url : 'http://tecumseh.zo.ncsu.edu/geoserver/wms',
		title : 'Identify features by clicking',
		layers : [nchuc12],
		queryVisible : true,
		infoFormat : "application/vnd.ogc.gml",
		format : featureinfo_format
	});

	query_ctl.events.register("getfeatureinfo", this, showInfo);
	map.addControl(query_ctl);

	var selected_hucs = {};
	function showInfo(evt) {
		if (evt.features && evt.features.length) {
			for (var i = 0; i < evt.features.length; i++) {

				//if selected feature is on then remove it
				if (selected_hucs[evt.features[i].data.huc_12] == 'on') {
					selected_hucs[evt.features[i].data.huc_12] = 'off';
					var selected_features_drawn = map.getLayersByName("Highlighted Features")[0].features;
					for (var j = 0; j < selected_features_drawn.length; j++) {
						if (selected_features_drawn[j].data.huc_12 == evt.features[i].data.huc_12) {
							map.getLayersByName("Highlighted Features")[0].removeFeatures(selected_features_drawn[j]);
						}
					}

					// else add feature
				} else {
					selected_hucs[evt.features[i].data.huc_12] = 'on';
					highlightLayer.addFeatures(evt.features[i]);
				}
			}
			highlightLayer.redraw();
		}
	}


	query_ctl.activate();

	/////////////////////////////////////////
	// start GeoExt config
	///////////////////////////////////////////////

	var
	ctrl, toolbarItems = [], action, actions = {};
	ctrl = new OpenLayers.Control.NavigationHistory();
	map.addControl(ctrl);

	Ext.QuickTips.init();

	action = new GeoExt.Action({
		//text : "previous",
		control : ctrl.previous,
		disabled : true,
		tooltip : "previous in history",
		iconCls : "prev_action"
	});
	actions["previous"] = action;
	toolbarItems.push(action);

	action = new GeoExt.Action({
		//text : "next",
		control : ctrl.next,
		disabled : true,
		tooltip : "next in history",
		iconCls : "next_action"
	});
	actions["next"] = action;
	toolbarItems.push(action);

	var mapPanel = new GeoExt.MapPanel({
		region : "center",
		map : map,
		title : 'NC Map',
		extent : map_extent,
		tbar : toolbarItems
	});

	var layerList = new GeoExt.tree.LayerContainer({
		layerStore : mapPanel.layers,
		text : 'layers',
		leaf : false,
		expanded : true,
		rootVisible : false
	});

	var tree = new Ext.tree.TreePanel({
		region : 'west',
		width : 300,
		root : layerList,
		title : "NC layers"
	});

	new Ext.Viewport({
		layout : "border",
		items : [mapPanel, tree],
		defaults : {
			split : true
		}
	})

});
