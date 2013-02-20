/*global google:false  Ext:false GeoExt:false OpenLayers:false*/

var map;
var map_extent = new OpenLayers.Bounds(-9462455, 3963396, -8324634, 4405547);
var proj_4326 = new OpenLayers.Projection('EPSG:4326');
var proj_900913 = new OpenLayers.Projection('EPSG:900913');

Ext.onReady(function() {"use strict";
	map = new OpenLayers.Map({
		displayProjection : new OpenLayers.Projection("EPSG:4326"),
		maxExtent : map_extent,
		projection : new OpenLayers.Projection("EPSG:900913"),
		controls : [new OpenLayers.Control.Navigation({
			zoomWheel : true,
			mouseWheelOptions : {
				interval : 100
			},
			zoomBoxEnabled : true
		}), new OpenLayers.Control.PanZoomBar({})]
	});
	//var ncelev = new OpenLayers.Layer.WMS("NC Elevation", "http://tecumseh.zo.ncsu.edu/geoserver/wms", {
	//layers : "NC_Hill_3857_to",
	//	format : 'image/png'
	//}, {
	//	isBaseLayer : true
	//});

	var gphy = new OpenLayers.Layer.Google("Google Physical", {
		type : google.maps.MapTypeId.TERRAIN,
		MAX_ZOOM_LEVEL : 13,
		MIN_ZOOM_LEVEL : 6,
		displayInLayerSwitcher : false
	});

	var nchuc12 = new OpenLayers.Layer.WMS("NC HUC 12", "http://tecumseh.zo.ncsu.edu/tilecache-2.11/tilecache.cgi", {
		layers : "huc12nc",
		format : 'image/png',
		transparent : true
	}, {
		isBaseLayer : false,
		visibility : false
	});

	var nchuc8 = new OpenLayers.Layer.WMS("NC HUC 8", "http://tecumseh.zo.ncsu.edu/tilecache-2.11/tilecache.cgi", {
		layers : "huc8nc",
		format : 'image/png',
		transparent : true
	}, {
		isBaseLayer : false,
		visibility : false
	});

	var nchuc4 = new OpenLayers.Layer.WMS("NC HUC 4", "http://tecumseh.zo.ncsu.edu/tilecache-2.11/tilecache.cgi", {
		layers : "huc4nc",
		format : 'image/png',
		transparent : true
	}, {
		isBaseLayer : false,
		visibility : false
	});

	var nchuc2 = new OpenLayers.Layer.WMS("NC HUC 2", "http://tecumseh.zo.ncsu.edu/tilecache-2.11/tilecache.cgi", {
		layers : "huc2nc",
		format : 'image/png',
		transparent : true
	}, {
		isBaseLayer : false,
		visibility : false
	});

	var nchuc6 = new OpenLayers.Layer.WMS("NC HUC 6", "http://tecumseh.zo.ncsu.edu/tilecache-2.11/tilecache.cgi", {
		layers : "huc6nc",
		format : 'image/png',
		transparent : true
	}, {
		isBaseLayer : false,
		visibility : false
	});

	var nchuc10 = new OpenLayers.Layer.WMS("NC HUC 10", "http://tecumseh.zo.ncsu.edu/tilecache-2.11/tilecache.cgi", {
		layers : "huc10nc",
		format : 'image/png',
		transparent : true
	}, {
		isBaseLayer : false,
		visibility : false
	});

	var counties = new OpenLayers.Layer.WMS("NC Counties", "http://tecumseh.zo.ncsu.edu/tilecache-2.11/tilecache.cgi", {
		layers : "counties",
		format : 'image/png',
		transparent : true,
		tilesorigin : [map.maxExtent.left, map.maxExtent.bottom]
	}, {
		isBaseLayer : false,
		visibility : false,
		displayInLayerSwitcher : false
	});

	var counties_lbl = new OpenLayers.Layer.WMS("NC Counties Label", "http://tecumseh.zo.ncsu.edu/tilecache-2.11/tilecache.cgi", {
		layers : "counties_lbl",
		format : 'image/png',
		transparent : true,
		tilesorigin : [map.maxExtent.left, map.maxExtent.bottom]

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
		visibility : false,
		displayInLayerSwitcher : true
	});

	var nchuc2_lbl = new OpenLayers.Layer.WMS("NC HUC 2 Label", "http://tecumseh.zo.ncsu.edu/tilecache-2.11/tilecache.cgi", {
		layers : "huc2nc_lbl",
		format : 'image/png',
		transparent : true
	}, {
		isBaseLayer : false,
		visibility : false
	});

	var nchuc4_lbl = new OpenLayers.Layer.WMS("NC HUC 4 Label", "http://tecumseh.zo.ncsu.edu/tilecache-2.11/tilecache.cgi", {
		layers : "huc4nc_lbl",
		format : 'image/png',
		transparent : true
	}, {
		isBaseLayer : false,
		visibility : false
	});

	var nchuc6_lbl = new OpenLayers.Layer.WMS("NC HUC 6 Label", "http://tecumseh.zo.ncsu.edu/tilecache-2.11/tilecache.cgi", {
		layers : "huc6nc_lbl",
		format : 'image/png',
		transparent : true
	}, {
		isBaseLayer : false,
		visibility : false
	});

	var nchuc8_lbl = new OpenLayers.Layer.WMS("NC HUC 8 Label", "http://tecumseh.zo.ncsu.edu/tilecache-2.11/tilecache.cgi", {
		layers : "huc8nc_lbl",
		format : 'image/png',
		transparent : true
	}, {
		isBaseLayer : false,
		visibility : false
	});

	var nchuc10_lbl = new OpenLayers.Layer.WMS("NC HUC 10 Label", "http://tecumseh.zo.ncsu.edu/tilecache-2.11/tilecache.cgi", {
		layers : "huc10nc_lbl",
		format : 'image/png',
		transparent : true
	}, {
		isBaseLayer : false,
		visibility : false
	});

	var nchuc12_lbl = new OpenLayers.Layer.WMS("NC HUC 12 Label", "http://tecumseh.zo.ncsu.edu/tilecache-2.11/tilecache.cgi", {
		layers : "huc12nc_lbl",
		format : 'image/png',
		transparent : true,
		tilesorigin : [map.maxExtent.left, map.maxExtent.bottom]
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

	map.addLayers([counties, ncbcr, nchuc2, nchuc4, nchuc6, nchuc12, nchuc10, nchuc8, gphy, nchuc2_lbl, nchuc4_lbl, nchuc6_lbl, nchuc12_lbl, nchuc10_lbl, nchuc8_lbl, counties_lbl, highlightLayer]);

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
				if (selected_hucs[evt.features[i].data.huc_12] === 'on') {
					selected_hucs[evt.features[i].data.huc_12] = 'off';
					var selected_features_drawn = map.getLayersByName("Highlighted Features")[0].features;
					for (var j = 0; j < selected_features_drawn.length; j++) {
						if (selected_features_drawn[j].data.huc_12 === evt.features[i].data.huc_12) {
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
	actions.previous = action;
	toolbarItems.push(action);

	action = new GeoExt.Action({
		//text : "next",
		control : ctrl.next,
		disabled : true,
		tooltip : "next in history",
		iconCls : "next_action"
	});
	actions.next = action;
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
		text : 'HUC 2',
		leaf : false,
		expanded : true,
		loader : {
			filter : function(record) {
				return record.get("layer").name.indexOf("NC HUC 2") !== -1
			}
		}
	});
	var layerList2 = new GeoExt.tree.LayerContainer({
		layerStore : mapPanel.layers,
		text : 'HUC 4',
		leaf : false,
		expanded : true,
		loader : {
			filter : function(record) {
				return record.get("layer").name.indexOf("NC HUC 4") !== -1
			}
		}
	});
	var layerList3 = new GeoExt.tree.LayerContainer({
		layerStore : mapPanel.layers,
		text : 'HUC 6',
		leaf : false,
		expanded : true,
		loader : {
			filter : function(record) {
				return record.get("layer").name.indexOf("NC HUC 6") !== -1
			}
		}
	});
	var layerList4 = new GeoExt.tree.LayerContainer({
		layerStore : mapPanel.layers,
		text : 'HUC 8',
		leaf : false,
		expanded : true,
		loader : {
			filter : function(record) {
				return record.get("layer").name.indexOf("NC HUC 8") !== -1
			}
		}
	});
	var layerList5 = new GeoExt.tree.LayerContainer({
		layerStore : mapPanel.layers,
		text : 'HUC 10',
		leaf : false,
		expanded : true,
		loader : {
			filter : function(record) {
				return record.get("layer").name.indexOf("NC HUC 10") !== -1
			}
		}
	});
	var layerList6 = new GeoExt.tree.LayerContainer({
		layerStore : mapPanel.layers,
		text : 'HUC 12',
		leaf : false,
		expanded : true,
		loader : {
			filter : function(record) {
				return record.get("layer").name.indexOf("NC HUC 12") !== -1
			}
		}
	});
	var layerList7 = new GeoExt.tree.LayerContainer({
		layerStore : mapPanel.layers,
		text : 'NC Counties',
		leaf : false,
		expanded : true,
		loader : {
			filter : function(record) {
				return record.get("layer").name.indexOf("NC Counties") !== -1
			}
		}
	});
	var layerList8 = new GeoExt.tree.LayerContainer({
		layerStore : mapPanel.layers,
		text : 'NC BCR',
		leaf : false,
		expanded : true,
		loader : {
			filter : function(record) {
				return record.get("layer").name.indexOf("NC BCR") !== -1
			}
		}
	});

	var tree = new Ext.tree.TreePanel({
		region : 'west',
		width : 300,
		root : {
			nodeType : "async",
			children : [layerList, layerList2, layerList3, layerList4, layerList5, layerList6, layerList7, layerList8]
		},
		title : "NC layers",
		rootVisible : false
	});

	new Ext.Viewport({
		layout : "border",
		items : [mapPanel, tree],
		defaults : {
			split : true
		}
	});

});
