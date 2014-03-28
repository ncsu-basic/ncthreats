/*global google:false,  Ext:false, GeoExt:false, OpenLayers:false  */


var map;
Ext.onReady(function() {
    "use strict";


    var resource;

    //var , wps, save_link, saveaoi_form;
    var SERVER_URI = "http://localhost/";
    var HOST_NAME = "http://localhost/ncthreats/";
    // var HOST_NAME  = "http://tecumseh.zo.ncsu.edu/"
    // var SERVER_URI = "http://tecumseh.zo.ncsu.edu/";

    ////////////////////////////////////////////
    //initialize map
    ///////////////////////////////////////////////////
    var map_extent = new OpenLayers.Bounds(-9406496, 4001978, -8382357, 4397372);
    var proj_4326 = new OpenLayers.Projection('EPSG:4326');
    var proj_900913 = new OpenLayers.Projection('EPSG:900913');

    map = new OpenLayers.Map({
        displayProjection: new OpenLayers.Projection("EPSG:4326"),
        maxExtent: map_extent,
        projection: new OpenLayers.Projection("EPSG:900913"),
        resolutions: [2445.984, 1222.99, 611.496, 305.748, 152.874, 76.437, 38.218],
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
    var gphy = new OpenLayers.Layer.Google("Google Physical", {
        type: google.maps.MapTypeId.TERRAIN,
        MAX_ZOOM_LEVEL: 12,
        MIN_ZOOM_LEVEL: 6,
        displayInLayerSwitcher: false,
        visibility: false,
        buffer: 0
    });

    var osm = new OpenLayers.Layer.OSM("Open Street Map", "", {
        resolutions: [2445.984, 1222.99, 611.496, 305.748, 152.874, 76.437, 38.218],
        serverResolutions: [156543.03390625, 78271.516953125, 39135.7584765625,
            19567.87923828125, 9783.939619140625, 4891.9698095703125,
            2445.9849047851562, 1222.9924523925781, 611.4962261962891,
            305.74811309814453, 152.87405654907226, 76.43702827453613,
            38.218514137268066, 19.109257068634033, 9.554628534317017,
            4.777314267158508, 2.388657133579254, 1.194328566789627,
            0.5971642833948135
        ]
    });

    var counties_base = new OpenLayers.Layer.TMS("None",
        SERVER_URI + "tilecache/", {
            layername: "counties",
            type: "png",
            tileOrigin: new OpenLayers.LonLat(-9462455, 3963396)
        }
    );

    var hillshade = new OpenLayers.Layer.TMS("NC Hillshade",
        SERVER_URI + "tilecache/", {
            layername: "hillshadenc",
            type: "png",
            tileOrigin: new OpenLayers.LonLat(-9462455, 3963396)
        }
    );


    ////////////////////////////////////////////////////////////
    /// TMS line layers overlays
    /////////////////////////////////////////////////////////


    var nchuc2 = new OpenLayers.Layer.TMS("NC HUC 2",
        SERVER_URI + "tilecache/", {
            layername: "huc2nc",
            type: "png",
            isBaseLayer: false,
            visibility: false,
            tileOrigin: new OpenLayers.LonLat(-9462455, 3963396)
        }
    );
    var nchuc4 = new OpenLayers.Layer.TMS("NC HUC 4",
        SERVER_URI + "tilecache/", {
            layername: "huc4nc",
            type: "png",
            isBaseLayer: false,
            visibility: false,
            tileOrigin: new OpenLayers.LonLat(-9462455, 3963396)
        }
    );
    var nchuc6 = new OpenLayers.Layer.TMS("NC HUC 6",
        SERVER_URI + "tilecache/", {
            layername: "huc6nc",
            type: "png",
            isBaseLayer: false,
            visibility: false,
            tileOrigin: new OpenLayers.LonLat(-9462455, 3963396)
        }
    );
    var nchuc8 = new OpenLayers.Layer.TMS("NC HUC 8",
        SERVER_URI + "tilecache/", {
            layername: "huc8nc",
            type: "png",
            isBaseLayer: false,
            visibility: false,
            tileOrigin: new OpenLayers.LonLat(-9462455, 3963396)
        }
    );
    var nchuc10 = new OpenLayers.Layer.TMS("NC HUC 10",
        SERVER_URI + "tilecache/", {
            layername: "huc10nc",
            type: "png",
            isBaseLayer: false,
            visibility: false,
            tileOrigin: new OpenLayers.LonLat(-9462455, 3963396)
        }
    );
    var nchuc12 = new OpenLayers.Layer.TMS("NC HUC 12",
        SERVER_URI + "tilecache/", {
            layername: "huc12nc",
            type: "png",
            isBaseLayer: false,
            visibility: false,
            tileOrigin: new OpenLayers.LonLat(-9462455, 3963396)
        }
    );
    var counties = new OpenLayers.Layer.TMS("NC Counties",
        SERVER_URI + "tilecache/", {
            layername: "counties",
            type: "png",
            isBaseLayer: false,
            visibility: false,
            tileOrigin: new OpenLayers.LonLat(-9462455, 3963396)
        }
    );
    /////////////////////////////////////////////////////////////////////
    ////TMS label layers overlays
    /////////////////////////////////////////////////////////////////
    var nchuc2_lbl = new OpenLayers.Layer.TMS("NC HUC 2 Label",
        SERVER_URI + "tilecache/", {
            layername: "huc2nc_lbl",
            type: "png",
            isBaseLayer: false,
            visibility: false,
            tileOrigin: new OpenLayers.LonLat(-9462455, 3963396)
        }
    );
    var nchuc4_lbl = new OpenLayers.Layer.TMS("NC HUC 4 Label",
        SERVER_URI + "tilecache/", {
            layername: "huc4nc_lbl",
            type: "png",
            isBaseLayer: false,
            visibility: false,
            tileOrigin: new OpenLayers.LonLat(-9462455, 3963396)
        }
    );
    var nchuc6_lbl = new OpenLayers.Layer.TMS("NC HUC 6 Label",
        SERVER_URI + "tilecache/", {
            layername: "huc6nc_lbl",
            type: "png",
            isBaseLayer: false,
            visibility: false,
            tileOrigin: new OpenLayers.LonLat(-9462455, 3963396)
        }
    );
    var nchuc8_lbl = new OpenLayers.Layer.TMS("NC HUC 8 Label",
        SERVER_URI + "tilecache/", {
            layername: "huc8nc_lbl",
            type: "png",
            isBaseLayer: false,
            visibility: false,
            tileOrigin: new OpenLayers.LonLat(-9462455, 3963396)
        }
    );
    var nchuc10_lbl = new OpenLayers.Layer.TMS("NC HUC 10 Label",
        SERVER_URI + "tilecache/", {
            layername: "huc10nc_lbl",
            type: "png",
            isBaseLayer: false,
            visibility: false,
            tileOrigin: new OpenLayers.LonLat(-9462455, 3963396)
        }
    );
    var nchuc12_lbl = new OpenLayers.Layer.TMS("NC HUC 12 Label",
        SERVER_URI + "tilecache/", {
            layername: "huc12nc_lbl",
            type: "png",
            isBaseLayer: false,
            visibility: false,
            tileOrigin: new OpenLayers.LonLat(-9462455, 3963396)
        }
    );
    var counties_lbl = new OpenLayers.Layer.TMS("NC Counties Label",
        SERVER_URI + "tilecache/", {
            layername: "counties_lbl",
            type: "png",
            isBaseLayer: false,
            visibility: false,
            tileOrigin: new OpenLayers.LonLat(-9462455, 3963396)
        }
    );

    //////////////////////////////////////////////////////////////
    ////bcr layer, no label no cache

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

    ///////////////////////////////////////////////////////////////////
    ///////vector layers for query select tool
    var nchuc12_qry = new OpenLayers.Layer.WMS("query geoserver, h12",
        SERVER_URI + "geoserver/wms", {
            layers: "huc12nc",
            format: 'image/png',
            transparent: true
        }, {
            isBaseLayer: false,
            visibility: false
        });

    var nchuc8_qry = new OpenLayers.Layer.WMS("query geoserver, h8",
        SERVER_URI + "geoserver/wms", {
            layers: "huc8nc",
            format: 'image/png',
            transparent: true
        }, {
            isBaseLayer: false,
            visibility: false
        });

    var nchuc4_qry = new OpenLayers.Layer.WMS("query geoserver, h4",
        SERVER_URI + "geoserver/wms", {
            layers: "huc4nc",
            format: 'image/png',
            transparent: true
        }, {
            isBaseLayer: false,
            visibility: false
        });

    var nchuc2_qry = new OpenLayers.Layer.WMS("query geoserver, h2",
        SERVER_URI + "geoserver/wms", {
            layers: "huc2nc",
            format: 'image/png',
            transparent: true
        }, {
            isBaseLayer: false,
            visibility: false
        });

    var nchuc6_qry = new OpenLayers.Layer.WMS("query geoserver, h6",
        SERVER_URI + "geoserver/wms", {
            layers: "huc6nc",
            format: 'image/png',
            transparent: true
        }, {
            isBaseLayer: false,
            visibility: false
        });

    var nchuc10_qry = new OpenLayers.Layer.WMS("query geoserver, h10",
        SERVER_URI + "geoserver/wms", {
            layers: "huc10nc",
            format: 'image/png',
            transparent: true
        }, {
            isBaseLayer: false,
            visibility: false
        });

    var counties_qry = new OpenLayers.Layer.WMS("query geoserver, counties",
        SERVER_URI + "geoserver/wms", {
            layers: "counties",
            format: 'image/png',
            transparent: true
        }, {
            isBaseLayer: false,
            visibility: false,
            displayInLayerSwitcher: false
        });
    ///////////////////////////////////////////////////////////
    ////////////analysis layers

    var styleMap = new OpenLayers.StyleMap({
        strokeColor: "red",
        strokeWidth: 2,
        strokeOpacity: 0.5,
        fillOpacity: 0.2
    });

    var resultsStyleMap = new OpenLayers.StyleMap({});

    var symbolsLookup = {
        1: {
            strokeColor: "black",
            fillColor: "#008000",
            strokeWidth: 1,
            strokeOpacity: 1,
            fillOpacity: 0.3
        },
        2: {
            strokeColor: "black",
            fillColor: "#C05600",
            strokeWidth: 1,
            strokeOpacity: 1,
            fillOpacity: 0.3
        },
        3: {
            strokeColor: "black",
            fillColor: "#FFFF00",
            strokeWidth: 1,
            strokeOpacity: 1,
            fillOpacity: 0.3
        },
        4: {
            strokeColor: "black",
            fillColor: "#FF8000",
            strokeWidth: 1,
            strokeOpacity: 1,
            fillOpacity: 0.3
        },
        5: {
            strokeColor: "black",
            fillColor: "#FF0000",
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

    var results = new OpenLayers.Layer.Vector("Results", {
        displayInLayerSwitcher: false,
        isBaseLayer: false,
        projection: proj_4326,
        styleMap: resultsStyleMap,
        renderers: ["SVG"]
    });

    map.addLayers([counties, ncbcr, nchuc2, nchuc4, nchuc6, nchuc12,
        nchuc10, nchuc8, nchuc2_lbl, nchuc4_lbl, nchuc6_lbl,
        nchuc12_lbl, nchuc10_lbl, nchuc8_lbl, counties_lbl, highlightLayer,
        results, counties_qry,
        nchuc2_qry, nchuc4_qry, nchuc6_qry, nchuc8_qry, nchuc10_qry,
        nchuc12_qry, gphy, osm, counties_base, hillshade
    ]);

    //////////////////////////////////////////////////////////////////////////
    // add controls
    //////////////////////////////////////////////////////////////////////////
    function console_on_zoom() {
        console.log("resolution is", map.getResolution());
        console.log("scale is", map.getScale());
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
        var mode = formPanel2.getComponent('rg1').getValue().inputValue;
        if (mode.indexOf("custom") !== -1) {
            click.activate();
            query_ctl.deactivate();
            highlightLayer.destroyFeatures();
            pts = [];
        } else if (mode.indexOf("predefined") !== -1) {
            click.deactivate();
            query_ctl.activate();
            highlightLayer.destroyFeatures();
            selected_hucs = {};
        }

    };

    var remove_action = function() {
        new_selection();
        map.zoomToExtent(map_extent);
        var vis_lyrs = [counties, ncbcr, nchuc2, nchuc4, nchuc6, nchuc12,
            nchuc10, nchuc8, nchuc2_lbl, nchuc4_lbl, nchuc6_lbl,
            nchuc12_lbl, nchuc10_lbl, nchuc8_lbl, counties_lbl, results
        ];
        for (var i = 0; i < vis_lyrs.length; i++) {
            vis_lyrs[i].setVisibility(false);
        }
    };



    ////////////////////////////////////////////////////////////////////
    ////start panels config
    ///////////////////////////////////////////////////////////

    ///print panel
    var formPanel = new Ext.form.FormPanel({
        title: "Print config",
        width: 296,
        height: 250,
        bodyStyle: "padding:20px; ",
        labelAlign: "top",
        defaults: {
            anchor: "100%"
        },
        items: [{
            xtype: "textarea",
            name: "comment",
            value: "North Carolina Threats analysis tool",
            fieldLabel: "Comment"
        }, {
            xtype: "container",
            id: "pdf_error_msg",
            height: 30
            // html: "some error message, longer ddd longer still longer"
        }],
        buttons: [{
            text: "Create PDF",
            handler: function() {
                var form_vals = formPanel.getForm().getValues();
                var htmlseg = $('#ncthreatsMapPanel .olMap').html();
                var ht = $('#ncthreatsMapPanel .olMap').height();
                var wd = $('#ncthreatsMapPanel .olMap').width();
                var start_tag = '<div style="width: ' + wd +
                    'px; height: ' + ht + 'px;">';
                var end_tag = '</div>';
                var pdf_hdr = "<h3>" + form_vals.comment + "</h3>";
                htmlseg = start_tag + htmlseg + end_tag;
                $.ajax({
                    type: "POST",
                    url: SERVER_URI + "wps/pdf",
                    data: {
                        htmlseg: pdf_hdr + htmlseg,
                        text: form_vals.comment
                    }
                }).done(function(data, textStatus, jqXHR) {
                    if (jqXHR.status === 201) {
                        $('#pdf_error_msg').html('');
                        var pdfresource = jqXHR.getResponseHeader('Location');
                        $('#dnlds').attr('action', pdfresource);
                        $('#dnlds').submit();
                    } else {
                        console.log("error" + jqXHR.status);
                        $('#pdf_error_msg').html(jqXHR.statusText +
                            " Please try again.");
                    }

                }).fail(function(jqXHR) {
                    console.log(jqXHR.statusText + " Please try again.");
                    $('#pdf_error_msg').html(jqXHR.statusText +
                        " Please try again.");
                });
            }
        }]
    });

    /////////////create area panel
    var comboStore = new Ext.data.ArrayStore({
        fields: ['layerName', 'layerId']
    });
    var comboData = [
        ["NC HUC 2", 'huc1'],
        ["NC HUC 4", 'huc2'],
        ["NC HUC 6", 'huc3'],
        ["NC HUC 8", 'huc4'],
        ["NC HUC 10", 'huc5'],
        ["NC HUC 12", 'huc6'],
        ["NC Counties", 'cnt7'],
        ["NC BCR", 'bcr8']
    ];
    comboStore.loadData(comboData);

    var form2_chng = function() {
        remove_action();
        var selected_predef = formPanel2.getForm().getValues().predef_selection;
        var sel_type = formPanel2.getForm().getValues().aoi_type;
        if (sel_type === 'predefined') {
            switch (selected_predef) {
                case 'NC HUC 2':
                    query_ctl.layers = [nchuc2_qry];
                    col_name = "huc2";
                    nchuc2.setVisibility(true);
                    nchuc2_lbl.setVisibility(true);
                    break;
                case 'NC HUC 4':
                    query_ctl.layers = [nchuc4_qry];
                    col_name = "huc4";
                    nchuc4.setVisibility(true);
                    nchuc4_lbl.setVisibility(true);
                    break;
                case 'NC HUC 6':
                    query_ctl.layers = [nchuc6_qry];
                    col_name = "huc6";
                    nchuc6.setVisibility(true);
                    nchuc6_lbl.setVisibility(true);
                    break;
                case 'NC HUC 8':
                    query_ctl.layers = [nchuc8_qry];
                    col_name = "huc8";
                    nchuc8.setVisibility(true);
                    nchuc8_lbl.setVisibility(true);
                    break;
                case 'NC HUC 10':
                    query_ctl.layers = [nchuc10_qry];
                    col_name = "huc10";
                    nchuc10.setVisibility(true);
                    nchuc10_lbl.setVisibility(true);
                    break;
                case 'NC HUC 12':
                    query_ctl.layers = [nchuc12_qry];
                    col_name = "huc_12";
                    nchuc12.setVisibility(true);
                    nchuc12_lbl.setVisibility(true);
                    break;
                case 'NC Counties':
                    query_ctl.layers = [counties_qry];
                    col_name = "co_num";
                    counties.setVisibility(true);
                    counties_lbl.setVisibility(true);
                    break;
                case 'NC BCR':
                    query_ctl.layers = [ncbcr];
                    col_name = "bcr";
                    ncbcr.setVisibility(true);
                    break;
            }
        }
        new_selection();
    };
    var aoi_to_file, onExecuted;
    //function to submit defined area
    var save_action = function() {
        var selected_predef = formPanel2.getForm().getValues().predef_selection;
        var sel_type = formPanel2.getForm().getValues().aoi_type;
        var gml = '';
        var aoi_list = [];
        if (sel_type !== 'predefined') {
            var gml_writer = new OpenLayers.Format.GML.v3({
                featureType: 'MultiPolygon',
                featureNS: 'http://jimserver.net/',
                geometryName: 'aoi',
                'internalProjection': new OpenLayers.Projection("EPSG:900913"),
                'externalProjection': new OpenLayers.Projection("EPSG:4326")
            });

            gml = gml_writer.write(highlightLayer.features);

        } else {
            gml = '';
            console.log(selected_predef);
            switch (selected_predef) {
                case 'NC HUC 2':
                    col_name = "huc2";
                    break;
                case 'NC HUC 4':
                    col_name = "huc4";
                    break;
                case 'NC HUC 6':
                    col_name = "huc6";
                    break;
                case 'NC HUC 8':
                    col_name = "huc8";
                    break;
                case 'NC HUC 10':
                    col_name = "huc10";
                    break;
                case 'NC HUC 12':
                    col_name = "huc_12";
                    break;
                case 'NC Counties':
                    col_name = "co_num";
                    break;
                case 'NC BCR':
                    col_name = "bcr";
                    break;
            }
            var selected_features_drawn =
                map.getLayersByName("AOI Selection")[0].features;
            for (var j = 0; j < selected_features_drawn.length; j++) {
                aoi_list.push(
                    selected_features_drawn[j].data[col_name]);
            }
            console.log(aoi_list);

        }

        $.ajax({
            type: "POST",
            url: SERVER_URI + "wps",
            data: {
                gml: gml,
                aoi_list: aoi_list,
                predef_type: selected_predef,
                sel_type: sel_type
            },
            dataType: "json"
        }).done(function(data, textStatus, jqXHR) {
            resource = jqXHR.getResponseHeader('Location');
            aoi_to_file = getResource(resource);
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

        onExecuted = function(aoi) {
            var geojson_format = new OpenLayers.Format.GeoJSON({
                'internalProjection': new OpenLayers.Projection("EPSG:900913"),
                'externalProjection': new OpenLayers.Projection("EPSG:4326")
            });
            results.removeAllFeatures();
            results.addFeatures(geojson_format.read(aoi));
            results.setVisibility(true);
        };


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
            name: "predef_selection",
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
            fieldLabel: 'Area Of Interest (AOI) type',
            name: 'aoiType',
            columns: 1,
            itemId: "rg1",
            items: [{
                boxLabel: 'predefined<br>Click on map to select/deselect',
                name: 'aoi_type',
                inputValue: 'predefined',
                checked: true
            }, {
                boxLabel: 'custom<br>Click on map to create polygon,' +
                    'or open shapefile panel.',
                name: 'aoi_type',
                inputValue: 'custom',
                id: 'custom_radio_sel'
            }, {
                boxLabel: 'statewide',
                name: 'aoi_type',
                inputValue: 'statewide'
            }],
            listeners: {
                change: form2_chng
            }
        }],
        buttons: [{
            text: "AOI info",
            handler: aoi_to_file,
            //itemId: "resource_btn",
            id: "resource_btn"
        }, {
            text: "Reset",
            handler: remove_action
        }, {
            text: "Submit",
            handler: save_action
        }]
    });

    //////////////////////////processing panel
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
        ["2100", '2100'],
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
            id: 'cbgrp1',
            columns: 1,
            items: [{
                boxLabel: 'Pollution 1',
                name: 'polu1'
            }, {
                boxLabel: 'Pollution 2',
                name: 'polu2',
                checked: false
            }, {
                boxLabel: 'Disease 1',
                name: 'dise1'
            }, {
                boxLabel: 'Disease 2',
                name: 'dise2'
            }, {
                boxLabel: 'Sea Level Rise',
                name: 'slr'
            }, {
                boxLabel: 'Fire Probability',
                name: 'firp'
            }, {
                boxLabel: 'Fire Suppresion',
                name: 'firs'
            }, {
                boxLabel: 'Transportation Corridors',
                name: 'tran'
            }, {
                boxLabel: 'Fragmentaion Index',
                name: 'frag'
            }, {
                boxLabel: 'Urban Percentage',
                name: 'urb'
            }]
        }]
    };


    var threat_calcs_map = function() {
        var form_vals = formPanel3.getForm().getValues(true);
        $.ajax({
            url: resource + '/map?' + form_vals,
            type: 'GET',
            dataType: 'json'
        }).done(function(data) {
            onExecuted(data.results);
        });
    };

    var threat_calcs_report = function() {
        var form_vals = formPanel3.getForm().getValues(true);
        var url = resource + '/report?' + escape(form_vals);
        console.log(url);
        window.open(url);
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
            name: 'year',
            fieldLabel: "Target year",
            value: "2010",
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
            text: "Report",
            handler: threat_calcs_report
        }, {
            text: "Show map",
            handler: threat_calcs_map
        }]
    });

    /////////////////////////////////////////
    // start GeoExt config
    ///////////////////////////////////////////////

    var ctrl, toolbarItems = [],
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
        tbar: toolbarItems,
        id: 'ncthreatsMapPanel'
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
                return record.get("layer").CLASS_NAME ===
                    'OpenLayers.Layer.Vector';
            }
        }
    });

    var layerList10 = new GeoExt.tree.LayerContainer({
        layerStore: mapPanel.layers,
        text: 'Background',
        leaf: false,
        expanded: true,
        loader: {
            filter: function(record) {
                return record.get("layer").isBaseLayer;
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
        title: 'Shapefile Upload',
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



    var page_script = function() {

        var shpTonchuc12 = function(shp, prj, shx) {

            $.ajax({
                type: "POST",
                url: SERVER_URI + "wps/shptojson",
                data: {
                    shp: shp,
                    shx: shx,
                    prj: prj
                },
                dataType: "json",
                success: function(data) {

                    var geojson_format = new OpenLayers.Format.GeoJSON();
                    var shpfeatures = geojson_format.read(data);
                    highlightLayer.destroyFeatures();
                    results.removeAllFeatures();
                    map.zoomToExtent(map_extent);
                    console.log('hello browser');
                    highlightLayer.addFeatures(shpfeatures);
                    //console.log(shpfeatures);
                    document.getElementById('custom_radio_sel').checked =
                        'checked';
                    Ext.getCmp('aoi_upload_id').collapse();
                    Ext.getCmp('aoi_create_id').expand();
                }
            });

        };

        //this function processes shapefile upload
        var upload_shps = function() {
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
                    // $("#upload_msg").html("");

                }
            }
        };

        $("#shp_btn").click(upload_shps);

    };
    var el = Ext.getCmp("aoi_upload_id");
    var mgr = el.getUpdater();
    mgr.update({
        url: HOST_NAME + "pages/upload.html"
    });
    mgr.on("update", page_script);

});