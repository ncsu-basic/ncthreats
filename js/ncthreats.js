/*global google:false,  Ext:false, GeoExt:false, OpenLayers:false,
printCapabilities:false  */


var map;
Ext.onReady(function() {
    "use strict";


    //var , wps, save_link, saveaoi_form;
    var SERVER_URI = "http://localhost/";
    //var SERVER_URI = "http://tecumseh.zo.ncsu.edu/";

    ////////////////////////////////////////////
    //initialize map
    ///////////////////////////////////////////////////
    var map_extent = new OpenLayers.Bounds(-9462455, 3963396, -8324634, 4405547);
    var proj_4326 = new OpenLayers.Projection('EPSG:4326');
    var proj_900913 = new OpenLayers.Projection('EPSG:900913');

    map = new OpenLayers.Map({
        displayProjection: new OpenLayers.Projection("EPSG:4326"),
        maxExtent: map_extent,
        projection: new OpenLayers.Projection("EPSG:900913"),
        //numZoomLevels: 7,
        //maxResolution: 2445.984,
        //minResolution: 4.777,
        controls: [new OpenLayers.Control.Navigation({
                zoomWheel: true,
                mouseWheelOptions: {
                    interval: 100
                },
                zoomBoxEnabled: true
            }), new OpenLayers.Control.PanZoomBar({}),
            new OpenLayers.Control.MousePosition()
        ]
    });

    var nav = map.getControlsByClass("OpenLayers.Control.Navigation")[0];
    nav.handlers.wheel.cumulative = false;

    ///////////////////////////////////////////////////////////////////////////
    //define and add layers
    ////////////////////////////////////////////////////////////////////////////

    //////Base Layers
    var gphy = new OpenLayers.Layer.Google("Base Google Physical", {
        type: google.maps.MapTypeId.TERRAIN,
        MAX_ZOOM_LEVEL: 12,
        MIN_ZOOM_LEVEL: 6,
        displayInLayerSwitcher: false,
        visibility: false
    });

    var osm = new OpenLayers.Layer.OSM("Base OSM (for printing)");

    //////////WMS layers
    var nchuc12 = new OpenLayers.Layer.WMS("NC HUC 12",
        SERVER_URI + "tilecache", {
            layers: "huc12nc",
            format: 'image/png',
            transparent: true
        }, {
            isBaseLayer: false,
            visibility: false
        });

    var nchuc8 = new OpenLayers.Layer.WMS("NC HUC 8",
        SERVER_URI + "tilecache", {
            layers: "huc8nc",
            format: 'image/png',
            transparent: true
        }, {
            isBaseLayer: false,
            visibility: false
        });

    var nchuc4 = new OpenLayers.Layer.WMS("NC HUC 4",
        SERVER_URI + "tilecache", {
            layers: "huc4nc",
            format: 'image/png',
            transparent: true
        }, {
            isBaseLayer: false,
            visibility: false
        });

    var nchuc2 = new OpenLayers.Layer.WMS("NC HUC 2",
        SERVER_URI + "tilecache", {
            layers: "huc2nc",
            format: 'image/png',
            transparent: true
        }, {
            isBaseLayer: false,
            visibility: false
        });

    var nchuc6 = new OpenLayers.Layer.WMS("NC HUC 6",
        SERVER_URI + "tilecache", {
            layers: "huc6nc",
            format: 'image/png',
            transparent: true
        }, {
            isBaseLayer: false,
            visibility: false
        });

    var nchuc10 = new OpenLayers.Layer.WMS("NC HUC 10",
        SERVER_URI + "tilecache", {
            layers: "huc10nc",
            format: 'image/png',
            transparent: true
        }, {
            isBaseLayer: false,
            visibility: false
        });

    var counties = new OpenLayers.Layer.WMS("NC Counties",
        SERVER_URI + "tilecache", {
            layers: "counties",
            format: 'image/png',
            transparent: true
        }, {
            isBaseLayer: false,
            visibility: false,
            displayInLayerSwitcher: false
        });

    var ncbcr = new OpenLayers.Layer.WMS("NC BCR",
        SERVER_URI + "geoserver/wms", {
            layers: "nc_bcr",
            format: 'image/png',
            transparent: true
        }, {
            isBaseLayer: false,
            visibility: false,
            displayInLayerSwitcher: true
        });

    //////////label layers for web from tilecache
    var counties_lbl = new OpenLayers.Layer.WMS("NC Counties Label",
        SERVER_URI + "tilecache", {
            layers: "counties_lbl",
            format: 'image/png',
            transparent: true,
            tilesorigin: [map.maxExtent.left, map.maxExtent.bottom]

        }, {
            isBaseLayer: false,
            visibility: false
        });

    var nchuc2_lbl = new OpenLayers.Layer.WMS("NC HUC 2 Label",
        SERVER_URI + "tilecache", {
            layers: "huc2nc_lbl",
            format: 'image/png',
            transparent: true,
            tilesorigin: [map.maxExtent.left, map.maxExtent.bottom]
        }, {
            isBaseLayer: false,
            visibility: false
        });

    var nchuc4_lbl = new OpenLayers.Layer.WMS("NC HUC 4 Label",
        SERVER_URI + "tilecache", {
            layers: "huc4nc_lbl",
            format: 'image/png',
            transparent: true,
            tilesorigin: [map.maxExtent.left, map.maxExtent.bottom]
        }, {
            isBaseLayer: false,
            visibility: false
        });

    var nchuc6_lbl = new OpenLayers.Layer.WMS("NC HUC 6 Label",
        SERVER_URI + "tilecache", {
            layers: "huc6nc_lbl",
            format: 'image/png',
            transparent: true,
            tilesorigin: [map.maxExtent.left, map.maxExtent.bottom]
        }, {
            isBaseLayer: false,
            visibility: false
        });

    var nchuc8_lbl = new OpenLayers.Layer.WMS("NC HUC 8 Label",
        SERVER_URI + "tilecache", {
            layers: "huc8nc_lbl",
            format: 'image/png',
            transparent: true,
            tilesorigin: [map.maxExtent.left, map.maxExtent.bottom]
        }, {
            isBaseLayer: false,
            visibility: false
        });

    var nchuc10_lbl = new OpenLayers.Layer.WMS("NC HUC 10 Label",
        SERVER_URI + "tilecache", {
            layers: "huc10nc_lbl",
            format: 'image/png',
            transparent: true,
            tilesorigin: [map.maxExtent.left, map.maxExtent.bottom]
        }, {
            isBaseLayer: false,
            visibility: false
        });

    var nchuc12_lbl = new OpenLayers.Layer.WMS("NC HUC 12 Label",
        SERVER_URI + "tilecache", {
            layers: "huc12nc_lbl",
            format: 'image/png',
            transparent: true,
            tilesorigin: [map.maxExtent.left, map.maxExtent.bottom]
        }, {
            isBaseLayer: false,
            visibility: false
        });



    ///////////////////// label layers from geoserver for pdf
    var counties_lbl_gs = new OpenLayers.Layer.WMS("label for pdf, county",
        SERVER_URI + "geoserver/wms", {
            layers: "counties_lbl",
            format: 'image/png',
            transparent: true
            //tilesorigin : [map.maxExtent.left, map.maxExtent.bottom]

        }, {
            isBaseLayer: false,
            visibility: false
        });

    var nchuc2_lbl_gs = new OpenLayers.Layer.WMS("label for pdf, h2",
        SERVER_URI + "geoserver/wms", {
            layers: "huc2nc_lbl",
            format: 'image/png',
            transparent: true
        }, {
            isBaseLayer: false,
            visibility: false
        });

    var nchuc4_lbl_gs = new OpenLayers.Layer.WMS("label for pdf, h4",
        SERVER_URI + "geoserver/wms", {
            layers: "huc4nc_lbl",
            format: 'image/png',
            transparent: true
        }, {
            isBaseLayer: false,
            visibility: false
        });

    var nchuc6_lbl_gs = new OpenLayers.Layer.WMS("label for pdf, h6",
        SERVER_URI + "geoserver/wms", {
            layers: "huc6nc_lbl",
            format: 'image/png',
            transparent: true
        }, {
            isBaseLayer: false,
            visibility: false
        });

    var nchuc8_lbl_gs = new OpenLayers.Layer.WMS("label for pdf, h8",
        SERVER_URI + "geoserver/wms", {
            layers: "huc8nc_lbl",
            format: 'image/png',
            transparent: true
        }, {
            isBaseLayer: false,
            visibility: false
        });

    var nchuc10_lbl_gs = new OpenLayers.Layer.WMS("label for pdf, h10",
        SERVER_URI + "geoserver/wms", {
            layers: "huc10nc_lbl",
            format: 'image/png',
            transparent: true
        }, {
            isBaseLayer: false,
            visibility: false
        });

    var nchuc12_lbl_gs = new OpenLayers.Layer.WMS("label for pdf, h12",
        SERVER_URI + "geoserver/wms", {
            layers: "huc12nc_lbl",
            format: 'image/png',
            transparent: true
        }, {
            isBaseLayer: false,
            visibility: false
        });

    ///////vector layers for query select tool
    //////////WMS layers
    var nchuc12_qry = new OpenLayers.Layer.WMS("query layer",
        SERVER_URI + "geoserver/wms", {
            layers: "huc12nc",
            format: 'image/png',
            transparent: true
        }, {
            isBaseLayer: false,
            visibility: false
        });

    var nchuc8_qry = new OpenLayers.Layer.WMS("query layer",
        SERVER_URI + "geoserver/wms", {
            layers: "huc8nc",
            format: 'image/png',
            transparent: true
        }, {
            isBaseLayer: false,
            visibility: false
        });

    var nchuc4_qry = new OpenLayers.Layer.WMS("query layer",
        SERVER_URI + "geoserver/wms", {
            layers: "huc4nc",
            format: 'image/png',
            transparent: true
        }, {
            isBaseLayer: false,
            visibility: false
        });

    var nchuc2_qry = new OpenLayers.Layer.WMS("query layer",
        SERVER_URI + "geoserver/wms", {
            layers: "huc2nc",
            format: 'image/png',
            transparent: true
        }, {
            isBaseLayer: false,
            visibility: false
        });

    var nchuc6_qry = new OpenLayers.Layer.WMS("query layer",
        SERVER_URI + "geoserver/wms", {
            layers: "huc6nc",
            format: 'image/png',
            transparent: true
        }, {
            isBaseLayer: false,
            visibility: false
        });

    var nchuc10_qry = new OpenLayers.Layer.WMS("query layer",
        SERVER_URI + "geoserver/wms", {
            layers: "huc10nc",
            format: 'image/png',
            transparent: true
        }, {
            isBaseLayer: false,
            visibility: false
        });

    var counties_qry = new OpenLayers.Layer.WMS("query layer",
        SERVER_URI + "geoserver/wms", {
            layers: "counties",
            format: 'image/png',
            transparent: true
        }, {
            isBaseLayer: false,
            visibility: false,
            displayInLayerSwitcher: false
        });

    ////////////analysis layers

    var styleMap = new OpenLayers.StyleMap({
        strokeColor: "red",
        strokeWidth: 2,
        strokeOpacity: 0.5,
        fillOpacity: 0.2
    });

    var resultsStyleMap = new OpenLayers.StyleMap({});

    var symbolsLookup = {
        2: {
            strokeColor: "black",
            fillColor: "green",
            strokeWidth: 1,
            strokeOpacity: 1,
            fillOpacity: 0.3
        }
    };

    resultsStyleMap.addUniqueValueRules('default', 'threat', symbolsLookup);


    var highlightLayer = new OpenLayers.Layer.Vector("AOI Selection", {
        displayInLayerSwitcher: false,
        isBaseLayer: false,
        projection: proj_4326,
        styleMap: styleMap,

    });

    var results = new OpenLayers.Layer.Vector("AOI Results", {
        displayInLayerSwitcher: false,
        isBaseLayer: false,
        projection: proj_4326,
        styleMap: resultsStyleMap
    });

    /*    var results = new OpenLayers.Layer.WMS("AOI Results",
        SERVER_URI + "geoserver/wms", {
            layers: "results",
            format: 'image/png',
            transparent: true
        }, {
            isBaseLayer: false,
            visibility: false,
            displayInLayerSwitcher: true
        });*/

    map.addLayers([counties, ncbcr, nchuc2, nchuc4, nchuc6, nchuc12,
        nchuc10, nchuc8, gphy, osm, nchuc2_lbl, nchuc4_lbl, nchuc6_lbl,
        nchuc12_lbl, nchuc10_lbl, nchuc8_lbl, counties_lbl, counties_lbl_gs,
        nchuc12_lbl_gs, nchuc10_lbl_gs, nchuc8_lbl_gs, nchuc6_lbl_gs,
        nchuc4_lbl_gs, nchuc2_lbl_gs, highlightLayer, results, counties_qry,
        nchuc2_qry, nchuc4_qry, nchuc6_qry, nchuc8_qry, nchuc10_qry,
        nchuc12_qry
    ]);

    //////////////////////////////////////////////////////////////////////////
    // add controls
    //////////////////////////////////////////////////////////////////////////
    function console_on_zoom() {
        console.log("resolution is", map.getResolution());
    }
    map.events.register('zoomend', map, console_on_zoom);

    OpenLayers.Control.Click = OpenLayers.Class(OpenLayers.Control, {
        defaultHandlerOptions: {
            'single': true,
            'double': false,
            'pixelTolerance': 0,
            'stopSingle': false,
            'stopDouble': false
        },

        initialize: function() {
            this.handlerOptions = OpenLayers.Util.extend({},
                this.defaultHandlerOptions);
            OpenLayers.Control.prototype.initialize.apply(this, arguments);
            this.handler = new OpenLayers.Handler.Click(this, {
                'click': this.trigger
            }, this.handlerOptions);
        },

        trigger: add_point
    });
    var pts = [];

    function add_point(e) {
        var lonlat = map.getLonLatFromViewPortPx(e.xy);
        var pt = new OpenLayers.Geometry.Point(lonlat.lon, lonlat.lat);
        pts.push(pt);
        var linearRing = new OpenLayers.Geometry.LinearRing(pts);
        highlightLayer.destroyFeatures();
        var polygonFeature =
            new OpenLayers.Feature.Vector(
                new OpenLayers.Geometry.Polygon([linearRing]));
        highlightLayer.addFeatures([polygonFeature]);
        highlightLayer.redraw();

    }

    var featureinfo_format = new OpenLayers.Format.WMSGetFeatureInfo({
        externalProjection: proj_4326,
        internalProjection: proj_900913
    });

    var query_ctl = new OpenLayers.Control.WMSGetFeatureInfo({
        url: SERVER_URI + 'geoserver/wms',
        title: 'Identify features by clicking',
        //layers : [nchuc12],
        queryVisible: false,
        infoFormat: "application/vnd.ogc.gml",
        format: featureinfo_format
    });

    query_ctl.layers = [];

    query_ctl.events.register("getfeatureinfo", this, showInfo);
    map.addControl(query_ctl);

    var selected_hucs = {};
    var col_name;

    //function to outline selected predefined areas of interest

    function showInfo(evt) {
        //console.log(query_ctl.layers[0].name);
        //console.log(evt);
        if (evt.features && evt.features.length) {
            for (var i = 0; i < evt.features.length; i++) {
                //if selected feature is on then remove it
                if (selected_hucs[evt.features[i].data[col_name]] === 'on') {
                    selected_hucs[evt.features[i].data[col_name]] = 'off';
                    var selected_features_drawn =
                        map.getLayersByName("AOI Selection")[0].features;
                    for (var j = 0; j < selected_features_drawn.length; j++) {
                        if (selected_features_drawn[j].data[col_name] ===
                            evt.features[i].data[col_name]) {
                            map.getLayersByName(
                                "AOI Selection"
                            )[0].removeFeatures(selected_features_drawn[j]);
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
        method: "POST", // "POST" recommended for production use
        capabilities: printCapabilities, // from the info.json script in html
        customParams: {
            mapTitle: "Printing Demo"
            //comment : "This is a simple map printed from GeoExt."
        }
    });

    var printPage = new GeoExt.data.PrintPage({
        printProvider: printProvider
    });

    // The form with fields controlling the print output
    var formPanel = new Ext.form.FormPanel({
        title: "Print config",
        width: 296,
        height: 350,
        bodyStyle: "padding:20px; ",
        labelAlign: "top",
        defaults: {
            anchor: "100%"
        },
        items: [{
            xtype: "textarea",
            name: "comment",
            value: "",
            fieldLabel: "Comment",
            plugins: new GeoExt.plugins.PrintPageField({
                printPage: printPage
            })
        }, {
            xtype: "combo",
            store: printProvider.layouts,
            displayField: "name",
            fieldLabel: "Layout",
            typeAhead: true,
            mode: "local",
            triggerAction: "all",
            itemId: "printcmb1",
            plugins: new GeoExt.plugins.PrintProviderField({
                printProvider: printProvider
            })
        }, {
            xtype: "combo",
            store: printProvider.dpis,
            displayField: "name",
            fieldLabel: "Resolution",
            tpl: '<tpl for="."><div class="x-combo-list-item">{name}' +
                ' dpi</div></tpl>',
            typeAhead: true,
            mode: "local",
            triggerAction: "all",
            itemId: "printcmb2",
            plugins: new GeoExt.plugins.PrintProviderField({
                printProvider: printProvider
            })

        }],
        buttons: [{
            text: "Create PDF",
            //cls : "pr_btn",
            handler: function() {
                //printProvider.print(mapPanel, printPage);
                //console.log(printCapabilities);
                printCapabilities.createURL = SERVER_URI +
                    "geoserver/pdf/create.json";
                printCapabilities.printURL = SERVER_URI +
                    "geoserver/pdf/print.pdf";

                //code to use label layers from geoserver for pdf and
                //then turn tilecache back on for web map
                var label_lyr_name, label_lyr, label_lyr_pdf;
                var label_lyrs = {
                    "NC Counties Label": "label for pdf, county",
                    "NC HUC 2 Label": "label for pdf, h2",
                    "NC HUC 4 Label": "label for pdf, h4",
                    "NC HUC 6 Label": "label for pdf, h6",
                    "NC HUC 8 Label": "label for pdf, h8",
                    "NC HUC 10 Label": "label for pdf, h10",
                    "NC HUC 12 Label": "label for pdf, h12"
                };
                for (label_lyr_name in label_lyrs) {
                    label_lyr = map.getLayersByName(label_lyr_name)[0];
                    label_lyr_pdf = map.getLayersByName(
                        label_lyrs[label_lyr_name])[0];
                    if (label_lyr.getVisibility()) {
                        label_lyr.setVisibility(false);
                        label_lyr_pdf.setVisibility(true);
                    }
                }
                var show_highlight = highlightLayer.getVisibility();
                highlightLayer.setVisibility(false);

                printPage.fit(mapPanel, true);
                // print the page, optionally including the legend
                printProvider.print(mapPanel, printPage);
                if (show_highlight) {
                    highlightLayer.setVisibility(true);
                }
                for (label_lyr_name in label_lyrs) {
                    label_lyr = map.getLayersByName(label_lyr_name)[0];
                    label_lyr_pdf = map.getLayersByName(
                        label_lyrs[label_lyr_name])[0];
                    if (label_lyr_pdf.getVisibility()) {
                        label_lyr.setVisibility(true);
                        label_lyr_pdf.setVisibility(false);
                    }
                }
            }
        }]
    });
    //formPanel.getComponent('printcmb1').setWidth(200);
    var comboStore = new Ext.data.ArrayStore({
        fields: ['layerName', 'layerId']
    });
    var comboData = [
        ["NC HUC 2", 'nchuc2'],
        ["NC HUC 4", 'nchuc4'],
        ["NC HUC 6", 'nchuc6'],
        ["NC HUC 8", 'nchuc8'],
        ["NC HUC 10", 'nchuc10'],
        ["NC HUC 12", 'nchuc12'],
        ["NC Counties", 'counties'],
        ["NC BCR", 'ncbcr']
    ];
    comboStore.loadData(comboData);

    var form2_chng = function() {
        //console.log(records.data.layerId);
        //var selected_type = formPanel2.getComponent('rg1').
        //getValue().inputValue;
        var predef_idx, selected_predef;
        try {
            predef_idx = formPanel2.getComponent('cmb1').selectedIndex;
            selected_predef = comboStore.getAt(predef_idx).json["1"];
        } catch (e) {
            selected_predef = 'none';
        }

        switch (selected_predef) {
            case 'nchuc2':
                query_ctl.layers = [nchuc2_qry];
                col_name = "huc2";
                nchuc2.setVisibility(true);
                nchuc2_lbl.setVisibility(true);
                break;
            case 'nchuc4':
                query_ctl.layers = [nchuc4_qry];
                col_name = "huc4";
                nchuc4.setVisibility(true);
                nchuc4_lbl.setVisibility(true);
                break;
            case 'nchuc6':
                query_ctl.layers = [nchuc6_qry];
                col_name = "huc6";
                nchuc6.setVisibility(true);
                nchuc6_lbl.setVisibility(true);
                break;
            case 'nchuc8':
                query_ctl.layers = [nchuc8_qry];
                col_name = "huc8";
                nchuc8.setVisibility(true);
                nchuc8_lbl.setVisibility(true);
                break;
            case 'nchuc10':
                query_ctl.layers = [nchuc10_qry];
                col_name = "huc10";
                nchuc10.setVisibility(true);
                nchuc10_lbl.setVisibility(true);
                break;
            case 'nchuc12':
                query_ctl.layers = [nchuc12_qry];
                col_name = "huc_12";
                nchuc12.setVisibility(true);
                nchuc12_lbl.setVisibility(true);
                break;
            case 'counties':
                query_ctl.layers = [counties_qry];
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
    var aoi_to_file;
    //function to submit defined area to pywps
    var save_action = function() {
        //console.log("remove... tell me more");
        var text = formPanel2.getComponent('desc_txt').getValue();
        if (text.length === 0) {
            text = "no description provided";
        }
        //console.log(text);
        var gml_writer = new OpenLayers.Format.GML.v3({
            featureType: 'MultiPolygon',
            featureNS: 'http://jimserver.net/',
            geometryName: 'aoi',
            'internalProjection': new OpenLayers.Projection("EPSG:900913"),
            'externalProjection': new OpenLayers.Projection("EPSG:4326")
        });

        var gml = gml_writer.write(highlightLayer.features);


        $.ajax({
            type: "POST",
            url: SERVER_URI + "wps",
            data: {
                gml: gml,
                text: text
            },
            dataType: "json"
        }).done(function(data, textStatus, jqXHR) {
            aoi_to_file = getResource(jqXHR.getResponseHeader('Location'));
            Ext.getCmp("resource_btn").setHandler(aoi_to_file);
            onExecuted(data.geojson);
            var extent = new OpenLayers.Bounds(
                data.extent).transform(proj_4326, proj_900913);
            map.zoomToExtent(extent);
        });

        function getResource(url) {
            var handler = function() {
                window.open(url);
            };
            return handler;
        }

        function onExecuted(aoi) {
            var geojson_format = new OpenLayers.Format.GeoJSON({
                'internalProjection': new OpenLayers.Projection("EPSG:900913"),
                'externalProjection': new OpenLayers.Projection("EPSG:4326")
            });
            results.addFeatures(geojson_format.read(aoi));
            results.setVisibility(true);
        }

        /*function onExecuted(aoi) {
            var cql = "identifier = '" + aoi + "'";
            delete results.params.CQL_FILTER;
            results.mergeNewParams({
                'CQL_FILTER': cql
            });
            results.setVisibility(true);
        }*/
    };

    var formPanel2 = new Ext.form.FormPanel({
        title: "AOI creation",
        width: 296,
        height: 350,
        bodyStyle: "padding:20px; ",
        labelAlign: "top",
        defaults: {
            anchor: "100%"
        },
        items: [{
            xtype: "combo",
            itemId: "cmb1",
            store: comboStore,
            fieldLabel: "Predefined selections",
            typeAhead: true,
            mode: "local",
            triggerAction: "all",
            valueField: 'layerId',
            displayField: 'layerName',
            listeners: {
                'select': form2_chng
            }
        }, {
            xtype: 'radiogroup',
            fieldLabel: 'AOI type',
            name: 'aoiType',
            columns: 1,
            itemId: "rg1",
            items: [{
                boxLabel: 'predefined',
                name: 'aoi_type',
                inputValue: 'predefined',
                checked: true
            }, {
                boxLabel: 'custom',
                name: 'aoi_type',
                inputValue: 'custom'
            }],
            listeners: {
                change: form2_chng
            }
        }, {
            xtype: "textarea",
            value: "",
            fieldLabel: "Description - optional, use when creating HUCs" +
                " for a description in saved AOI",
            itemId: "desc_txt"
        }],
        buttons: [{
            text: "Get Resource",
            handler: aoi_to_file,
            //itemId: "resource_btn",
            id: "resource_btn"
        }, {
            text: "Remove AOI",
            handler: remove_action
        }, {
            text: "Get HUC12s",
            handler: save_action
        }]
    });

    var comboStore2 = new Ext.data.ArrayStore({
        fields: ['layerName', 'layerId']
    });
    var comboData2 = [
        ["2010", '2010'],
        ["2020", '2020'],
        ["2030", '2030'],
        ["2040", '2040'],
        ["2050", '2050'],
        ["2060", '2060'],
        ["2070", '2070'],
        ["2080", '2080'],
        ["2090", '2090'],
        ["2200", '2200'],
    ];
    comboStore2.loadData(comboData2);



    var checkGroup = {
        xtype: 'fieldset',
        title: 'Factors in calculation',
        autoHeight: true,
        layout: 'form',
        // collapsed: true, // initially collapse the group
        //  collapsible: true,
        items: [{
            // Use the default, automatic layout to distribute the controls evenly
            // across a single row
            xtype: 'checkboxgroup',
            fieldLabel: 'select factors to include',
            columns: 1,
            items: [{
                boxLabel: 'Pollution 1',
                name: 'cb-auto-1'
            }, {
                boxLabel: 'Pollution 2',
                name: 'cb-auto-2',
                checked: false
            }, {
                boxLabel: 'Disease 1',
                name: 'cb-auto-3'
            }, {
                boxLabel: 'Disease 2',
                name: 'cb-auto-4'
            }, {
                boxLabel: 'Sea Level Rise',
                name: 'cb-auto-6'
            }, {
                boxLabel: 'Fire Probability',
                name: 'cb-auto-7'
            }, {
                boxLabel: 'Fire Suppresion',
                name: 'cb-auto-8'
            }, {
                boxLabel: 'Transportation Corridors',
                name: 'cb-auto-9'
            }, {
                boxLabel: 'Fragmentaion Index',
                name: 'cb-auto-10'
            }, {
                boxLabel: 'Urban Percentage',
                name: 'cb-auto-11'
            }]
        }]
    };

    var formPanel3 = new Ext.form.FormPanel({
        title: "Calculations",
        width: 296,
        height: 500,
        bodyStyle: "padding:20px; ",
        labelAlign: "top",
        defaults: {
            anchor: "100%"
        },
        items: [checkGroup, {
            xtype: "combo",
            itemId: "cmb2",
            store: comboStore2,
            fieldLabel: "Target year",
            typeAhead: true,
            mode: "local",
            triggerAction: "all",
            valueField: 'layerId',
            displayField: 'layerName',
            listeners: {
                //'select': form2_chng
            }
        }],
        buttons: [{
            text: "Calculate"
            //handler: remove_action
        }]
    });

    /////////////////////////////////////////
    // start GeoExt config
    ///////////////////////////////////////////////

    var
    ctrl, toolbarItems = [],
        action, actions = {};
    ctrl = new OpenLayers.Control.NavigationHistory();
    map.addControl(ctrl);

    Ext.QuickTips.init();

    action = new GeoExt.Action({
        control: ctrl.previous,
        disabled: true,
        tooltip: "previous in history",
        iconCls: "prev_action",
        allowDepress: true
    });
    actions.previous = action;
    toolbarItems.push(action);

    action = new GeoExt.Action({
        control: ctrl.next,
        disabled: true,
        tooltip: "next in history",
        iconCls: "next_action",
        allowDepress: true
    });
    actions.next = action;
    toolbarItems.push(action);

    toolbarItems.push("-");

    action = new Ext.Action({
        handler: function() {
            map.zoomToExtent(map_extent);
        },
        tooltip: "zoom full extent",
        iconCls: "nc_zoom",
        allowDepress: true
    });
    actions.next = action;
    toolbarItems.push(action);

    var mapPanel = new GeoExt.MapPanel({
        region: "center",
        map: map,
        title: 'NC Map',
        extent: map_extent,
        tbar: toolbarItems
    });

    var layerList = new GeoExt.tree.LayerContainer({
        layerStore: mapPanel.layers,
        text: 'HUC 2',
        leaf: false,
        expanded: true,
        loader: {
            filter: function(record) {
                return record.get("layer").name.indexOf("NC HUC 2") !== -1;
            }
        }
    });
    var layerList2 = new GeoExt.tree.LayerContainer({
        layerStore: mapPanel.layers,
        text: 'HUC 4',
        leaf: false,
        expanded: true,
        loader: {
            filter: function(record) {
                return record.get("layer").name.indexOf("NC HUC 4") !== -1;
            }
        }
    });
    var layerList3 = new GeoExt.tree.LayerContainer({
        layerStore: mapPanel.layers,
        text: 'HUC 6',
        leaf: false,
        expanded: true,
        loader: {
            filter: function(record) {
                return record.get("layer").name.indexOf("NC HUC 6") !== -1;
            }
        }
    });
    var layerList4 = new GeoExt.tree.LayerContainer({
        layerStore: mapPanel.layers,
        text: 'HUC 8',
        leaf: false,
        expanded: true,
        loader: {
            filter: function(record) {
                return record.get("layer").name.indexOf("NC HUC 8") !== -1;
            }
        }
    });
    var layerList5 = new GeoExt.tree.LayerContainer({
        layerStore: mapPanel.layers,
        text: 'HUC 10',
        leaf: false,
        expanded: true,
        loader: {
            filter: function(record) {
                return record.get("layer").name.indexOf("NC HUC 10") !== -1;
            }
        }
    });
    var layerList6 = new GeoExt.tree.LayerContainer({
        layerStore: mapPanel.layers,
        text: 'HUC 12',
        leaf: false,
        expanded: true,
        loader: {
            filter: function(record) {
                return record.get("layer").name.indexOf("NC HUC 12") !== -1;
            }
        }
    });
    var layerList7 = new GeoExt.tree.LayerContainer({
        layerStore: mapPanel.layers,
        text: 'NC Counties',
        leaf: false,
        expanded: true,
        loader: {
            filter: function(record) {
                return record.get("layer").name.indexOf("NC Counties") !== -1;
            }
        }
    });
    var layerList8 = new GeoExt.tree.LayerContainer({
        layerStore: mapPanel.layers,
        text: 'NC BCR',
        leaf: false,
        expanded: true,
        loader: {
            filter: function(record) {
                return record.get("layer").name.indexOf("NC BCR") !== -1;
            }
        }
    });

    var layerList9 = new GeoExt.tree.LayerContainer({
        layerStore: mapPanel.layers,
        text: 'Analysis',
        leaf: false,
        expanded: true,
        loader: {
            filter: function(record) {
                return record.get("layer").name.indexOf("AOI") !== -1;
            }
        }
    });

    var layerList10 = new GeoExt.tree.LayerContainer({
        layerStore: mapPanel.layers,
        text: 'Base layer',
        leaf: false,
        expanded: true,
        loader: {
            filter: function(record) {
                return record.get("layer").name.indexOf("Base") !== -1;
            }
        }
    });

    var tree = new Ext.tree.TreePanel({
        region: 'west',
        width: 300,
        root: {
            nodeType: "async",
            children: [layerList10, layerList9, layerList, layerList2,
                layerList3, layerList4, layerList5, layerList6,
                layerList7, layerList8
            ]
        },
        title: "NC layers",
        rootVisible: false
    });

    var process_tab = new Ext.Panel({
        title: 'Processing',
        //html: "some content",
        items: [formPanel3],
        cls: 'help',
        autoScroll: true
    });

    var area_tab = new Ext.Panel({
        title: 'AOI Upload',
        cls: 'pages',
        autoScroll: true,
        id: "aoi_upload_id"
    });

    var area_tab2 = new Ext.Panel({
        title: 'New AOI',
        autoScroll: true,
        items: [formPanel2],
        id: "aoi_create_id"
    });

    var accordion = new Ext.Panel({
        title: 'Area',
        layout: 'accordion',
        defaults: {
            // applied to each contained panel
            //bodyStyle : 'padding:15px'
        },
        items: [area_tab2, area_tab]
    });

    var print_tab = new Ext.Panel({
        title: 'Print',
        autoScroll: true,
        id: "print_tab_id",
        items: [formPanel]
    });

    var left = new Ext.TabPanel({
        region: 'west',
        width: 300,
        activeTab: 0,
        items: [tree, accordion, process_tab, print_tab],
        deferredRender: false
    });

    new Ext.Viewport({
        layout: "border",
        items: [mapPanel, left],
        defaults: {
            split: true
        }
    });

    ////////////////////////////////////////////////////////////////////////
    //start scripting for panel html pages
    ///////////////////////////////////////////////////////////////////////

    var submit_saved = function(txt) {
        /*
        var parser, xmlDoc;
        if (window.DOMParser) {
            parser = new DOMParser();
            xmlDoc = parser.parseFromString(txt, "text/xml");
        } else // Internet Explorer
        {
            xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
            xmlDoc.async = false;
            xmlDoc.loadXML(txt);
        }
        //res is aoiname
        //var res = xmlDoc.getElementsByTagName("aoiName")[0].
        //childNodes[0].nodeValue;
        var res = xmlDoc.getElementsByTagName("html")[0];
        console.log(res);
        console.log(txt);*/
        var res;


        //see for ref http://api.jquery.com/jQuery.parseHTML
        //spent too f'n long figuring this out
        //see also Flanagan 4th ed, p. 812
        var test = $.parseHTML(txt);
        $.each(test, function(i, el) {
            //nodeNames[i] = "<li>" + el.nodeName + "</li>";
            if (el.firstChild && el.hasAttributes()) {
                console.log(el.firstChild.nodeValue);
                res = el.firstChild.nodeValue;
            }
        });
        console.log(res);

        var cql = "identifier = '" + res + "'";
        delete results.params.CQL_FILTER;
        results.mergeNewParams({
            'CQL_FILTER': cql
        });
        results.setVisibility(true);
    };

    var page_script = function() {

        //button for saved aoi upload, compliant browsers
        var el = document.getElementById('aoi_btn');

        //button for shapefile upload
        var el3 = document.getElementById('shp_btn');

        //this function gets saved aoi xml string for file upload method
        var func = function() {
            var file = document.getElementById('file').files[0];
            //console.log(file);
            if (file) {
                var blob = file.slice();
                console.log(blob.size);
                //var url = window.URL || window.webkitURL;
                //var blobURLref = url.createObjectURL(file);
                var fileReader = new FileReader();
                fileReader.readAsText(file);
                fileReader.onload = function(oFREvent) {
                    submit_saved(oFREvent.target.result);
                    //console.log(oFREvent.target.result);
                };
            }
        };
        //this function gets saved aoi xml string for paste into textarea
        //var func2 = function() {
        //  var text = document.getElementById("aoi_copy").value.trim();
        //  submit_saved(text);
        //};

        var shpTonchuc12 = function(shp, prj, shx) {

            $.ajax({
                type: "POST",
                url: "pages/shptogml.php",
                data: {
                    shp: shp,
                    shx: shx,
                    prj: prj
                },
                dataType: "json",
                success: function(data) {

                    var geojson_format = new OpenLayers.Format.GeoJSON();
                    var shpfeatures = geojson_format.read(data.json);
                    highlightLayer.addFeatures(shpfeatures);
                    //console.log(shpfeatures);
                    Ext.getCmp('aoi_upload_id').collapse();
                    Ext.getCmp('aoi_create_id').expand();
                }
            });

        };

        //this function processes shapefile upload
        var func3 = function() {
            var files = document.getElementById('file2').files;
            var fileReader = [];
            var parse_filename, result;
            var shp, prj, shx, prjfile, shxfile, shpfile;

            //try to use closure to create handler, for jshint?
            var create_handler = function(file) {
                var handler;
                switch (file) {
                    case 'shp':
                        handler = function(oFREvent) {
                            shp = oFREvent.target.result;
                            if (shx && prj) {
                                shpTonchuc12(shp, prj, shx);
                            }
                        };
                        break;
                    case 'shx':
                        handler = function(oFREvent) {
                            shx = oFREvent.target.result;
                            if (shp && prj) {
                                shpTonchuc12(shp, prj, shx);
                            }
                        };
                        break;
                    case 'prj':
                        handler = function(oFREvent) {
                            prj = oFREvent.target.result;
                            if (shx && shp) {
                                shpTonchuc12(shp, prj, shx);
                            }
                        };
                        break;
                }
                return handler;
            };

            if (files) {
                for (var i = 0; i < files.length; i++) {

                    fileReader[i] = new FileReader();
                    fileReader[i].readAsDataURL(files[i]);
                    parse_filename = /\.(shp|shx|prj)/;
                    result = parse_filename.exec(files[i].name);
                    if (result) {
                        switch (result[1]) {
                            case 'shp':
                                shpfile = true;
                                fileReader[i].onload = create_handler('shp');
                                break;
                            case 'shx':
                                shxfile = true;
                                fileReader[i].onload = create_handler('shx');
                                break;
                            case 'prj':
                                prjfile = true;
                                fileReader[i].onload = create_handler('prj');
                                break;
                        }
                    }
                }
                if (!(prjfile && shxfile && shpfile)) {
                    //console.log("file shp, prj, or shx missing");
                    $("#upload_msg").html("file shp, prj, or shx missing");
                } else {
                    $("#upload_msg").html("");

                }
            }
        };
        //event listeners for buttons on html page
        if (el.addEventListener) {
            el.addEventListener("click", func, false);
            //el2.addEventListener("click", func2, false);
            el3.addEventListener("click", func3, false);
        } else if (el.attachEvent) {
            el.attachEvent('onclick', func);
            //el2.attachEvent('onclick', func2);
            el3.attachEvent('onclick', func3);
        }

    };
    var el = Ext.getCmp("aoi_upload_id");
    var mgr = el.getUpdater();
    mgr.update({
        //update this for differing servers - JBW
        url: "/pages/upload.html"
    });
    mgr.on("update", page_script);

});