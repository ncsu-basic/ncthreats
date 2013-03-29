/*global google:false,  Ext:false, GeoExt:false, OpenLayers:false, printCapabilities:false*/

var map, wps;

Ext.onReady(function() {"use strict";

	////////////////////////////////////////////
	//initialize map
	///////////////////////////////////////////////////
	var map_extent = new OpenLayers.Bounds(-9462455, 3963396, -8324634, 4405547);
	var proj_4326 = new OpenLayers.Projection('EPSG:4326');
	var proj_900913 = new OpenLayers.Projection('EPSG:900913');

	map = new OpenLayers.Map({
		displayProjection : new OpenLayers.Projection("EPSG:4326"),
		maxExtent : map_extent,
		projection : new OpenLayers.Projection("EPSG:900913"),
		//numZoomLevels: 7,
		//maxResolution: 2445.984,
		//minResolution: 4.777,
		controls : [new OpenLayers.Control.Navigation({
			zoomWheel : true,
			mouseWheelOptions : {
				interval : 100
			},
			zoomBoxEnabled : true
		}), new OpenLayers.Control.PanZoomBar({}), new OpenLayers.Control.MousePosition()]
	});

	var nav = map.getControlsByClass("OpenLayers.Control.Navigation")[0];
	nav.handlers.wheel.cumulative = false;

	///////////////////////////////////////////////////////////////////////////
	//define and add layers
	////////////////////////////////////////////////////////////////////////////

	//////Base Layers
	var gphy = new OpenLayers.Layer.Google("Base Google Physical", {
		type : google.maps.MapTypeId.TERRAIN,
		MAX_ZOOM_LEVEL : 12,
		MIN_ZOOM_LEVEL : 6,
		displayInLayerSwitcher : false,
		visibility : false
	});

	var osm = new OpenLayers.Layer.OSM("Base OSM (for printing)");

	//////////WMS layers
	var nchuc12 = new OpenLayers.Layer.WMS("NC HUC 12", "http://tecumseh.zo.ncsu.edu/geoserver/wms", {
		layers : "huc12nc",
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

	var nchuc2 = new OpenLayers.Layer.WMS("NC HUC 2", "http://tecumseh.zo.ncsu.edu/geoserver/wms", {
		layers : "huc2nc",
		format : 'image/png',
		transparent : true
	}, {
		isBaseLayer : false,
		visibility : false
	});

	var nchuc6 = new OpenLayers.Layer.WMS("NC HUC 6", "http://tecumseh.zo.ncsu.edu/geoserver/wms", {
		layers : "huc6nc",
		format : 'image/png',
		transparent : true
	}, {
		isBaseLayer : false,
		visibility : false
	});

	var nchuc10 = new OpenLayers.Layer.WMS("NC HUC 10", "http://tecumseh.zo.ncsu.edu/geoserver/wms", {
		layers : "huc10nc",
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
		visibility : false,
		displayInLayerSwitcher : false
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

	//////////cached layers
	var counties_lbl = new OpenLayers.Layer.WMS("NC Counties Label", "http://tecumseh.zo.ncsu.edu/tilecache-2.11/tilecache.cgi", {
		layers : "counties_lbl",
		format : 'image/png',
		transparent : true,
		tilesorigin : [map.maxExtent.left, map.maxExtent.bottom]

	}, {
		isBaseLayer : false,
		visibility : false
	});

	var nchuc2_lbl = new OpenLayers.Layer.WMS("NC HUC 2 Label", "http://tecumseh.zo.ncsu.edu/tilecache-2.11/tilecache.cgi", {
		layers : "huc2nc_lbl",
		format : 'image/png',
		transparent : true,
		tilesorigin : [map.maxExtent.left, map.maxExtent.bottom]
	}, {
		isBaseLayer : false,
		visibility : false
	});

	var nchuc4_lbl = new OpenLayers.Layer.WMS("NC HUC 4 Label", "http://tecumseh.zo.ncsu.edu/tilecache-2.11/tilecache.cgi", {
		layers : "huc4nc_lbl",
		format : 'image/png',
		transparent : true,
		tilesorigin : [map.maxExtent.left, map.maxExtent.bottom]
	}, {
		isBaseLayer : false,
		visibility : false
	});

	var nchuc6_lbl = new OpenLayers.Layer.WMS("NC HUC 6 Label", "http://tecumseh.zo.ncsu.edu/tilecache-2.11/tilecache.cgi", {
		layers : "huc6nc_lbl",
		format : 'image/png',
		transparent : true,
		tilesorigin : [map.maxExtent.left, map.maxExtent.bottom]
	}, {
		isBaseLayer : false,
		visibility : false
	});

	var nchuc8_lbl = new OpenLayers.Layer.WMS("NC HUC 8 Label", "http://tecumseh.zo.ncsu.edu/tilecache-2.11/tilecache.cgi", {
		layers : "huc8nc_lbl",
		format : 'image/png',
		transparent : true,
		tilesorigin : [map.maxExtent.left, map.maxExtent.bottom]
	}, {
		isBaseLayer : false,
		visibility : false
	});

	var nchuc10_lbl = new OpenLayers.Layer.WMS("NC HUC 10 Label", "http://tecumseh.zo.ncsu.edu/tilecache-2.11/tilecache.cgi", {
		layers : "huc10nc_lbl",
		format : 'image/png',
		transparent : true,
		tilesorigin : [map.maxExtent.left, map.maxExtent.bottom]
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

	////////////analysis layers
	var highlightLayer = new OpenLayers.Layer.Vector("AOI Selection", {
		displayInLayerSwitcher : false,
		isBaseLayer : false,
		projection : proj_4326,
		styleMap : styleMap
	});

	var results = new OpenLayers.Layer.WMS("AOI Results", "http://tecumseh.zo.ncsu.edu/geoserver/wms", {
		layers : "results",
		format : 'image/png',
		transparent : true
	}, {
		isBaseLayer : false,
		visibility : false,
		displayInLayerSwitcher : true
	});

	map.addLayers([counties, ncbcr, nchuc2, nchuc4, nchuc6, nchuc12, nchuc10, nchuc8, gphy, osm, nchuc2_lbl, nchuc4_lbl, nchuc6_lbl, nchuc12_lbl, nchuc10_lbl, nchuc8_lbl, counties_lbl, highlightLayer, results]);

	//////////////////////////////////////////////////////////////////////////
	// add controls
	//////////////////////////////////////////////////////////////////////////

	OpenLayers.Control.Click = OpenLayers.Class(OpenLayers.Control, {
		defaultHandlerOptions : {
			'single' : true,
			'double' : false,
			'pixelTolerance' : 0,
			'stopSingle' : false,
			'stopDouble' : false
		},

		initialize : function() {
			this.handlerOptions = OpenLayers.Util.extend({}, this.defaultHandlerOptions);
			OpenLayers.Control.prototype.initialize.apply(this, arguments);
			this.handler = new OpenLayers.Handler.Click(this, {
				'click' : this.trigger
			}, this.handlerOptions);
		},

		trigger : add_point
	});
	var pts = [];
	function add_point(e) {
		var lonlat = map.getLonLatFromViewPortPx(e.xy);
		var pt = new OpenLayers.Geometry.Point(lonlat.lon, lonlat.lat);
		pts.push(pt);
		var linearRing = new OpenLayers.Geometry.LinearRing(pts);
		highlightLayer.destroyFeatures();
		var polygonFeature = new OpenLayers.Feature.Vector(new OpenLayers.Geometry.Polygon([linearRing]));
		highlightLayer.addFeatures([polygonFeature]);
		highlightLayer.redraw();

	}

	var featureinfo_format = new OpenLayers.Format.WMSGetFeatureInfo({
		externalProjection : proj_4326,
		internalProjection : proj_900913
	});

	var query_ctl = new OpenLayers.Control.WMSGetFeatureInfo({
		url : 'http://tecumseh.zo.ncsu.edu/geoserver/wms',
		title : 'Identify features by clicking',
		//layers : [nchuc12],
		queryVisible : false,
		infoFormat : "application/vnd.ogc.gml",
		format : featureinfo_format
	});

	query_ctl.layers = [];

	query_ctl.events.register("getfeatureinfo", this, showInfo);
	map.addControl(query_ctl);

	var selected_hucs = {};
	var col_name;
	function showInfo(evt) {
		console.log(query_ctl.layers[0].name);
		if (evt.features && evt.features.length) {
			for (var i = 0; i < evt.features.length; i++) {
				//if selected feature is on then remove it
				if (selected_hucs[evt.features[i].data[col_name]] === 'on') {
					selected_hucs[evt.features[i].data[col_name]] = 'off';
					var selected_features_drawn = map.getLayersByName("AOI Selection")[0].features;
					for (var j = 0; j < selected_features_drawn.length; j++) {
						if (selected_features_drawn[j].data[col_name] === evt.features[i].data[col_name]) {
							map.getLayersByName("AOI Selection")[0].removeFeatures(selected_features_drawn[j]);
						}
					}
					// else add feature
				} else {
					selected_hucs[evt.features[i].data[col_name]] = 'on';
					highlightLayer.addFeatures(evt.features[i]);
				}
			}
			highlightLayer.redraw();
		}
	}

	var click = new OpenLayers.Control.Click();
	map.addControl(click);

	query_ctl.activate();

	var draw_action = function() {
		console.log("draw");
	};

	var nav_action = function() {
		console.log("nav");
	};

	var new_selection = function() {
		var mode = $("#input_div input:checked").val();
		if (mode.indexOf("custom") !== -1) {
			click.activate();
			query_ctl.deactivate();
			highlightLayer.destroyFeatures();
			pts = [];
			results.setVisibility(false);
		} else if (mode.indexOf("predefined") !== -1) {
			click.deactivate();
			query_ctl.activate();
			highlightLayer.destroyFeatures();
			selected_hucs = {};
			results.setVisibility(false);
		}

	};

	var remove_action = function() {
		console.log("remove... tell me more");
		new_selection();
	};

	var printProvider = new GeoExt.data.PrintProvider({
		method : "GET", // "POST" recommended for production use
		capabilities : printCapabilities, // from the info.json script in the html
		customParams : {
			mapTitle : "Printing Demo"
			//comment : "This is a simple map printed from GeoExt."
		}
	});

	var printPage = new GeoExt.data.PrintPage({
		printProvider : printProvider
	});

	var print_action = function() {
		console.log(printCapabilities);
		console.log("print");
		printCapabilities.createURL = "http://tecumseh.zo.ncsu.edu/geoserver/pdf/create.json";
		printCapabilities.printURL = "http://tecumseh.zo.ncsu.edu/geoserver/pdf/print.pdf";
		highlightLayer.setVisibility(false);

		printPage.fit(mapPanel, true);
		// print the page, optionally including the legend
		printProvider.print(mapPanel, printPage);

	};
	// The form with fields controlling the print output
	var formPanel = new Ext.form.FormPanel({
		title : "Print config",
		width : 275,
		height : 300,
		bodyStyle : "padding:15px;",
		labelAlign : "top",
		defaults : {
			anchor : "100%"
		},
		items : [{
			xtype : "textarea",
			name : "comment",
			value : "",
			fieldLabel : "Comment",
			plugins : new GeoExt.plugins.PrintPageField({
				printPage : printPage
			})
		}, {
			xtype : "combo",
			store : printProvider.layouts,
			displayField : "name",
			fieldLabel : "Layout",
			typeAhead : true,
			mode : "local",
			triggerAction : "all",
			plugins : new GeoExt.plugins.PrintProviderField({
				printProvider : printProvider
			})
		}, {
			xtype : "combo",
			store : printProvider.dpis,
			displayField : "name",
			fieldLabel : "Resolution",
			tpl : '<tpl for="."><div class="x-combo-list-item">{name} dpi</div></tpl>',
			typeAhead : true,
			mode : "local",
			triggerAction : "all",
			plugins : new GeoExt.plugins.PrintProviderField({
				printProvider : printProvider
			}),
			// the plugin will work even if we modify a combo value
			setValue : function(v) {
				v = parseInt(v, 10) + " dpi";
				Ext.form.ComboBox.prototype.setValue.apply(this, arguments);
			}
		}],
		buttons : [{
			text : "Create PDF",
			//cls : "pr_btn",
			handler : function() {
				//printProvider.print(mapPanel, printPage);
				console.log(printCapabilities);
				console.log("print");
				printCapabilities.createURL = "http://tecumseh.zo.ncsu.edu/geoserver/pdf/create.json";
				printCapabilities.printURL = "http://tecumseh.zo.ncsu.edu/geoserver/pdf/print.pdf";
				highlightLayer.setVisibility(false);

				printPage.fit(mapPanel, true);
				// print the page, optionally including the legend
				printProvider.print(mapPanel, printPage);
			}
		}]
	});

	//gml_template = '<?xml version="1.0" encoding="ISO-8859-1"?><wfs:FeatureCollection xmlns:ms="http://mapserver.gis.umn.edu/mapserver" xmlns:wfs="http://www.opengis.net/wfs" xmlns:gml="http://www.opengis.net/gml" xmlns:ogc="http://www.opengis.net/ogc" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.opengis.net/wfs http://schemas.opengis.net/wfs/1.0.0/WFS-basic.xsd                         http://mapserver.gis.umn.edu/mapserver http://aneto.oco/cgi-bin/worldwfs?SERVICE=WFS&amp;VERSION=1.0.0&amp;REQUEST=DescribeFeatureType&amp;TYPENAME=multipolygon&amp;OUTPUTFORMAT=XMLSCHEMA">' + "$FEATURE_MEMBERS$" + '</wfs:FeatureCollection>';

	var save_action = function() {
		//console.log("remove... tell me more");
		var gml_writer = new OpenLayers.Format.GML.v3({
			featureType : 'MultiPolygon',
			featureNS : 'http://jimserver.net/',
			geometryName : 'aoi',
			'internalProjection' : new OpenLayers.Projection("EPSG:900913"),
			'externalProjection' : new OpenLayers.Projection("EPSG:4326")
		});

		var gml = gml_writer.write(highlightLayer.features);
		//console.log(gml);
		//var gml_final = gml_template.replace("$FEATURE_MEMBERS$", gml);

		var url = "http://tecumseh.zo.ncsu.edu/cgi-bin/pywps.cgi";
		// init the client
		wps = new OpenLayers.WPS(url, {
			onSucceeded : onExecuted
		});
		// define inputs of the 'dummyprocess'
		var input1 = new OpenLayers.WPS.ComplexPut({
			identifier : "input1",
			value : gml

		});
		var output1 = new OpenLayers.WPS.LiteralPut({
			identifier : "output1",
			asReference : true
		});

		var myprocess = new OpenLayers.WPS.Process({
			identifier : "nchuc12",
			inputs : [input1],
			outputs : [output1]
		});

		wps.addProcess(myprocess);
		// run Execute
		wps.execute("nchuc12");

		//var format = new OpenLayers.Format.CQL();

		function onExecuted(process) {
			//console.log("process executed")
			var aoi = process.outputs[0].getValue();
			var cql = "identifier = '" + aoi + "'";
			console.log(cql);
			delete results.params.CQL_FILTER;
			results.mergeNewParams({
				'CQL_FILTER' : cql
			});
			results.setVisibility(true);
		}

	};

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
		iconCls : "prev_action",
		allowDepress : true
	});
	actions.previous = action;
	toolbarItems.push(action);

	action = new GeoExt.Action({
		//text : "next",
		control : ctrl.next,
		disabled : true,
		tooltip : "next in history",
		iconCls : "next_action",
		allowDepress : true
	});
	actions.next = action;
	toolbarItems.push(action);

	toolbarItems.push("-");

	action = new Ext.Action({
		toggleGroup : "edit",
		handler : draw_action,
		iconCls : "draw_action",
		tooltip : "enable drawing or selecting AOI"
	});
	//toolbarItems.push(action);

	action = new Ext.Action({
		toggleGroup : "edit",
		handler : nav_action,
		iconCls : "nav_action",
		pressed : true,
		tooltip : "disable drawing or selecting AOI"
	});
	//toolbarItems.push(action);
	//toolbarItems.push("-");

	action = new Ext.Action({
		handler : remove_action,
		iconCls : "remove_action",
		tooltip : "remove all drawn or selected AOI",
		allowDepress : true
	});
	toolbarItems.push(action);

	action = new Ext.Action({
		handler : save_action,
		iconCls : "save_action",
		tooltip : "save AOI",
		allowDepress : true
	});
	toolbarItems.push(action);
	toolbarItems.push("-");
	action = new Ext.Action({
		handler : print_action,
		iconCls : "print_action",
		tooltip : "print map",
		allowDepress : true
	});
	//toolbarItems.push(action);

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
				return record.get("layer").name.indexOf("NC HUC 2") !== -1;
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
				return record.get("layer").name.indexOf("NC HUC 4") !== -1;
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
				return record.get("layer").name.indexOf("NC HUC 6") !== -1;
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
				return record.get("layer").name.indexOf("NC HUC 8") !== -1;
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
				return record.get("layer").name.indexOf("NC HUC 10") !== -1;
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
				return record.get("layer").name.indexOf("NC HUC 12") !== -1;
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
				return record.get("layer").name.indexOf("NC Counties") !== -1;
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
				return record.get("layer").name.indexOf("NC BCR") !== -1;
			}
		}
	});

	var layerList9 = new GeoExt.tree.LayerContainer({
		layerStore : mapPanel.layers,
		text : 'Analysis',
		leaf : false,
		expanded : true,
		loader : {
			filter : function(record) {
				return record.get("layer").name.indexOf("AOI") !== -1;
			}
		}
	});

	var layerList10 = new GeoExt.tree.LayerContainer({
		layerStore : mapPanel.layers,
		text : 'Base layer',
		leaf : false,
		expanded : true,
		loader : {
			filter : function(record) {
				return record.get("layer").name.indexOf("Base") !== -1;
			}
		}
	});

	var tree = new Ext.tree.TreePanel({
		region : 'west',
		width : 300,
		root : {
			nodeType : "async",
			children : [layerList10, layerList9, layerList, layerList2, layerList3, layerList4, layerList5, layerList6, layerList7, layerList8]
		},
		title : "NC layers",
		rootVisible : false
	});

	var process_tab = new Ext.Panel({
		title : 'Processing',
		html : "some content",
		cls : 'help',
		autoScroll : true
	});

	var area_tab = new Ext.Panel({
		title : 'Area',
		cls : 'pages',
		autoScroll : true,
		id : "area_tab_id"
	});

	var print_tab = new Ext.Panel({
		title : 'print',
		cls : 'pages',
		autoScroll : true,
		id : "print_tab_id",
		items : [formPanel]
	});

	var left = new Ext.TabPanel({
		region : 'west',
		width : 300,
		activeTab : 0,
		items : [tree, area_tab, process_tab, print_tab],
		deferredRender : false
	});

	new Ext.Viewport({
		layout : "border",
		items : [mapPanel, left],
		defaults : {
			split : true
		}
	});

	////////////////////////////////////////////////////////////////////////
	//start scripting for panel pages
	///////////////////////////////////////////////////////////////////////
	var page_script = function() {
		$("#area_select").change(function() {
			var text = $("#area_select option:selected").attr("value");
			//console.log(text);
			switch(text) {
				case 'nchuc2':
					query_ctl.layers = [nchuc2];
					col_name = "huc2";
					nchuc2.setVisibility(true);
					nchuc2_lbl.setVisibility(true);
					break;
				case 'nchuc4':
					query_ctl.layers = [nchuc4];
					col_name = "huc4";
					nchuc4.setVisibility(true);
					nchuc4_lbl.setVisibility(true);
					break;
				case 'nchuc6':
					query_ctl.layers = [nchuc6];
					col_name = "huc6";
					nchuc6.setVisibility(true);
					nchuc6_lbl.setVisibility(true);
					break;
				case 'nchuc8':
					query_ctl.layers = [nchuc8];
					col_name = "huc8";
					nchuc8.setVisibility(true);
					nchuc8_lbl.setVisibility(true);
					break;
				case 'nchuc10':
					query_ctl.layers = [nchuc10];
					col_name = "huc10";
					nchuc10.setVisibility(true);
					nchuc10_lbl.setVisibility(true);
					break;
				case 'nchuc12':
					query_ctl.layers = [nchuc12];
					col_name = "huc_12";
					nchuc12.setVisibility(true);
					nchuc12_lbl.setVisibility(true);
					break;
				case 'counties':
					query_ctl.layers = [counties];
					col_name = "co_num";
					counties.setVisibility(true);
					counties_lbl.setVisibility(true);
					break;
				case 'ncbcr':
					query_ctl.layers = [ncbcr];
					col_name = "bcr";
					ncbcr.setVisibility(true);
					break;
			}
		});
		$("#input_div input").on("click", new_selection);
	};

	var el = Ext.getCmp("area_tab_id");
	var mgr = el.getUpdater();
	mgr.update({
		url : "/pages/area.html"
	});
	mgr.on("update", page_script);

});
