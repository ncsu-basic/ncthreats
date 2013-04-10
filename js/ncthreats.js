/*global google:false,  Ext:false, GeoExt:false, OpenLayers:false, printCapabilities:false, ActiveXObject:false*/

var map, wps, save_link, saveaoi_form;

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
		//var mode = $("#input_div input:checked").val();
		var mode = formPanel2.getComponent('rg1').getValue().inputValue;
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
			})
			// the plugin will work even if we modify a combo value
			//setValue : function(v) {
			//	v = parseInt(v, 10) + " dpi";
			//	Ext.form.ComboBox.prototype.setValue.apply(this, arguments);
			//}
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

	var comboStore = new Ext.data.ArrayStore({
		fields : ['layerName', 'layerId']
	});
	var comboData = [["NC HUC 2", 'nchuc2'], ["NC HUC 4", 'nchuc4'], ["NC HUC 6", 'nchuc6'], ["NC HUC 8", 'nchuc8'], ["NC HUC 10", 'nchuc10'], ["NC HUC 12", 'nchuc12'], ["NC Counties", 'counties'], ["NC BCR", 'ncbcr']];
	comboStore.loadData(comboData);

	var form2_chng = function() {
		//console.log(records.data.layerId);
		//var selected_type = formPanel2.getComponent('rg1').getValue().inputValue;
		var predef_idx, selected_predef;
		try {
			predef_idx = formPanel2.getComponent('cmb1').selectedIndex;
			selected_predef = comboStore.getAt(predef_idx).json["1"];
		} catch(e) {
			selected_predef = 'none';
		}

		switch(selected_predef) {
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
		new_selection();
	};

	var save_action = function() {
		//console.log("remove... tell me more");
		var text = formPanel2.getComponent('desc_txt').getValue();
		if (text.length === 0) {
			text = "no description provided";
		}
		console.log(text);
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

		var input1 = new OpenLayers.WPS.ComplexPut({
			identifier : "input1",
			value : gml
		});
		var input2 = new OpenLayers.WPS.LiteralPut({
			identifier : "input2",
			value : text
		});

		var output1 = new OpenLayers.WPS.LiteralPut({
			identifier : "output1"
		});
		var output2 = new OpenLayers.WPS.ComplexPut({
			identifier : "output2",
			asReference : true
		});

		var myprocess = new OpenLayers.WPS.Process({
			identifier : "nchuc12",
			inputs : [input1, input2],
			outputs : [output1, output2]
		});

		wps.addProcess(myprocess);
		// run Execute
		wps.execute("nchuc12");

		//var format = new OpenLayers.Format.CQL();

		function onExecuted(process) {
			//console.log("process executed")
			var aoi = process.outputs[0].getValue();
			var cql = "identifier = '" + aoi + "'";

			save_link = process.outputs[1].getValue();
			//console.log(save_link);
			//var respDOM = wps.responseDOM;
			//var wpsns = "http://www.opengis.net/wps/1.0.0";
			//var xlinkns = "http://www.w3.org/1999/xlink";
			//var test = OpenLayers.Format.XML.prototype.getElementsByTagNameNS(respDOM, wpsns, "Reference")[0];
			//var link = OpenLayers.Format.XML.prototype.getAttributeNS(test, wpsns, "encoding");
			//var link = OpenLayers.Format.XML.prototype.getAttributeNS(test, "", "href");
			//var xmlreader = new OpenLayers.Format.XML();
			//var link = xmlreader.getAttributeNS(test, "http://www.w3.org/1999/xlink", "href");
			//console.log(test.attributes);
			//console.log(link);
			delete results.params.CQL_FILTER;
			results.mergeNewParams({
				'CQL_FILTER' : cql
			});
			results.setVisibility(true);
		}

		//create domelements for download of saved aoi to iframe
		var body = Ext.getBody();
		body.createChild({
			tag : 'iframe',
			cls : 'x-hidden',
			id : 'iframe',
			name : 'iframe'
		});
		saveaoi_form = body.createChild({
			tag : 'form',
			cls : 'x-hidden',
			id : 'form',
			target : 'iframe'
		});

	};

	//downoad of save aoi, add to httpd.conf
	//<Files *.nctml>
	//Header set Content-Disposition attachment
	//</Files>

	var aoi_to_file = function() {
		saveaoi_form.dom.action = save_link;
		saveaoi_form.dom.submit();
	};
	var formPanel2 = new Ext.form.FormPanel({
		title : "AOI creation",
		width : 296,
		height : 350,
		bodyStyle : "padding:20px; ",
		labelAlign : "top",
		defaults : {
			anchor : "100%"
		},
		items : [{
			xtype : "combo",
			itemId : "cmb1",
			store : comboStore,
			fieldLabel : "Predefined selections",
			typeAhead : true,
			mode : "local",
			triggerAction : "all",
			valueField : 'layerId',
			displayField : 'layerName',
			listeners : {
				'select' : form2_chng
			}
		}, {
			xtype : 'radiogroup',
			fieldLabel : 'AOI type',
			name : 'aoiType',
			columns : 1,
			itemId : "rg1",
			items : [{
				boxLabel : 'predefined',
				name : 'aoi_type',
				inputValue : 'predefined',
				checked : true
			}, {
				boxLabel : 'custom',
				name : 'aoi_type',
				inputValue : 'custom'
			}],
			listeners : {
				change : form2_chng
			}
		}, {
			xtype : "textarea",
			value : "",
			fieldLabel : "Description - optional",
			itemId : "desc_txt"
		}],
		buttons : [{
			text : "Save AOI",
			handler : aoi_to_file
		}, {
			text : "Remove AOI",
			handler : remove_action
		}, {
			text : "Create AOI",
			handler : save_action
		}]
	});

	//gml_template = '<?xml version="1.0" encoding="ISO-8859-1"?><wfs:FeatureCollection xmlns:ms="http://mapserver.gis.umn.edu/mapserver" xmlns:wfs="http://www.opengis.net/wfs" xmlns:gml="http://www.opengis.net/gml" xmlns:ogc="http://www.opengis.net/ogc" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.opengis.net/wfs http://schemas.opengis.net/wfs/1.0.0/WFS-basic.xsd                         http://mapserver.gis.umn.edu/mapserver http://aneto.oco/cgi-bin/worldwfs?SERVICE=WFS&amp;VERSION=1.0.0&amp;REQUEST=DescribeFeatureType&amp;TYPENAME=multipolygon&amp;OUTPUTFORMAT=XMLSCHEMA">' + "$FEATURE_MEMBERS$" + '</wfs:FeatureCollection>';

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
	//toolbarItems.push(action);

	action = new Ext.Action({
		handler : save_action,
		iconCls : "save_action",
		tooltip : "save AOI",
		allowDepress : true
	});
	//toolbarItems.push(action);
	//toolbarItems.push("-");
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
		title : 'AOI Upload',
		cls : 'pages',
		autoScroll : true,
		id : "aoi_upload_id"
	});

	var area_tab2 = new Ext.Panel({
		title : 'New AOI',
		//cls : 'pages',
		autoScroll : true,
		items : [formPanel2]
	});

	var accordion = new Ext.Panel({
		title : 'Area',
		layout : 'accordion',
		defaults : {
			// applied to each contained panel
			//bodyStyle : 'padding:15px'
		},
		items : [area_tab2, area_tab]
	});

	var print_tab = new Ext.Panel({
		title : 'Print',
		cls : 'pages',
		autoScroll : true,
		id : "print_tab_id",
		items : [formPanel]
	});

	var left = new Ext.TabPanel({
		region : 'west',
		width : 300,
		activeTab : 0,
		items : [tree, accordion, process_tab, print_tab],
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
	//start scripting for panel html pages
	///////////////////////////////////////////////////////////////////////

	//don't know why I am torturing myself by not using jQuery
	var submit_saved = function(txt) {
		var parser, xmlDoc;
		if (window.DOMParser) {
			parser = new DOMParser();
			xmlDoc = parser.parseFromString(txt, "text/xml");
		} else// Internet Explorer
		{
			xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
			xmlDoc.async = false;
			xmlDoc.loadXML(txt);
		}
		//res is aoiname
		var res = xmlDoc.getElementsByTagName("aoiName")[0].childNodes[0].nodeValue;
		console.log(res);
	};

	var onExecuted2 = function(process) {
		console.log("process run");
	};

	var page_script = function() {
		//button for saved aoi upload, compliant browsers
		var el = document.getElementById('aoi_btn');
		// button for create saved aoi for non compliant browsers
		var el2 = document.getElementById('aoi_btn_copy');
		//button for shapefile upload
		var el3 = document.getElementById('shp_btn');

		//this function gets saved aoi xml sting for file upload method
		var func = function() {
			var file = document.getElementById('file').files[0];
			if (file) {
				var blob = file.slice();
				console.log(blob.size);
				//var url = window.URL || window.webkitURL;
				//var blobURLref = url.createObjectURL(file);
				var fileReader = new FileReader();
				fileReader.readAsText(file);
				fileReader.onload = function(oFREvent) {
					submit_saved(oFREvent.target.result);
				};
			}
		};
		//this function gets saved aoi xml string for paste into textarea
		var func2 = function() {
			var text = document.getElementById("aoi_copy").value.trim();
			submit_saved(text);
		};

		//this function processes shapefile upload
		var func3 = function() {
			var files = document.getElementById('file2').files;
			var fileReader = new Array();
			var shp, prj, shx, blob, parse_filename, result;
			//console.log(file);
			if (files) {
				for (var i = 0; i < files.length; i++) {
					//blob = files[i].slice();
					//console.log(blob.size);
					//console.log(files[i].name);

					//fileReader.readAsDataURL(blobURLref);
					fileReader[i] = new FileReader();
					fileReader[i].readAsDataURL(files[i]);
					fileReader[i].onload = function(oFREvent) {
						//console.log(oFREvent.target.result);
						blob = oFREvent.target.result;
						console.log(blob.length);
					
					};
					parse_filename = /\.(shp|shx|prj)/;
					result = parse_filename.exec(files[i].name);
					if (!result) {
						//console.log("error, file not used " + files[i].name);
					} else {
						//console.log(result[1]);
						switch(result[1]) {
							case 'shp':
								shp = blob;
								console.log("shp.....");
								break;
							case 'shx':
								console.log("shx.....");
								shx = blob;
								break;
							case 'prj':
								console.log("prj.....");
								prj = blob;
								console.log(blob);
								break;
						}
					}
				}
				if (!prj || !shx || !shp) {
					console.log("file shp, prj, or shx missing");
				} else {
					var oMyForm = new FormData();
					//oMyForm.append('shp', shp);
					// oMyForm.append('shx', shx);
					oMyForm.append('prj', prj);
					var url = "http://tecumseh.zo.ncsu.edu/cgi-bin/pywps.cgi";
					// init the client
					wps = new OpenLayers.WPS(url, {
						onSucceeded : onExecuted2
					});

					var input_shp = new OpenLayers.WPS.ComplexPut({
						identifier : "input_shp",
						value : shp
					});
					var input_shx = new OpenLayers.WPS.ComplexPut({
						identifier : "input_shx",
						value : shx
					});
					var input_prj = new OpenLayers.WPS.ComplexPut({
						identifier : "input_prj",
						value : oMyForm
					});

					var myprocess2 = new OpenLayers.WPS.Process({
						identifier : "shpTonchuc12",
						inputs : [input_shp, input_shx, input_prj],
						outputs : []
					});

					wps.addProcess(myprocess2);
					// run Execute
					wps.execute("shpTonchuc12");

				}
			}
		}
		//event listeners for buttons on html page
		if (el.addEventListener) {
			el.addEventListener("click", func, false);
			el2.addEventListener("click", func2, false);
			el3.addEventListener("click", func3, false);
		} else if (el.attachEvent) {
			el.attachEvent('onclick', func);
			el2.attachEvent('onclick', func2);
			el3.attachEvent('onclick', func3);
		}

	};
	var el = Ext.getCmp("aoi_upload_id");
	var mgr = el.getUpdater();
	mgr.update({
		url : "/pages/upload.html"
	});
	mgr.on("update", page_script);

});
