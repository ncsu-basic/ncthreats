var map;

Ext.onReady(function() {
    "use strict";

    var resource;

    var HOST_NAME = "http://tecumseh.zo.ncsu.edu/";
    var SERVER_URI = "http://tecumseh.zo.ncsu.edu/";

    var lgd_text, lgd_title, lgd_title2, lgd_color;

    ////////////////////////////////////////////
    //initialize map
    ///////////////////////////////////////////////////
    var map_extent = new OpenLayers.Bounds(-9406496, 4001978, -8382357, 4397372);
    var proj_4326 = new OpenLayers.Projection('EPSG:4326');
    var proj_900913 = new OpenLayers.Projection('EPSG:900913');

    map = new OpenLayers.Map({
        displayProjection: new OpenLayers.Projection("EPSG:4326"),
        maxExtent: map_extent,
        baseLayer: osm,
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
    var nchuc6 = new OpenLayers.Layer.TMS("River Basin Boundaries",
        SERVER_URI + "tilecache/", {
            layername: "huc6nc",
            type: "png",
            isBaseLayer: false,
            visibility: false,
            tileOrigin: new OpenLayers.LonLat(-9462455, 3963396)
        }
    );
    var nchuc8 = new OpenLayers.Layer.TMS("Subbasin Boundaries",
        SERVER_URI + "tilecache/", {
            layername: "huc8nc",
            type: "png",
            isBaseLayer: false,
            visibility: false,
            tileOrigin: new OpenLayers.LonLat(-9462455, 3963396)
        }
    );
    var nchuc10 = new OpenLayers.Layer.TMS("Watershed Boundaries",
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
    var counties = new OpenLayers.Layer.TMS("County Boundaries",
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
    var nchuc6_lbl = new OpenLayers.Layer.TMS("River Basin Labels",
        SERVER_URI + "tilecache/", {
            layername: "huc6nc_lbl",
            type: "png",
            isBaseLayer: false,
            visibility: false,
            tileOrigin: new OpenLayers.LonLat(-9462455, 3963396)
        }
    );
    var nchuc8_lbl = new OpenLayers.Layer.TMS("Subbasin Labels",
        SERVER_URI + "tilecache/", {
            layername: "huc8nc_lbl",
            type: "png",
            isBaseLayer: false,
            visibility: false,
            tileOrigin: new OpenLayers.LonLat(-9462455, 3963396)
        }
    );
    var nchuc10_lbl = new OpenLayers.Layer.TMS("Watershed Labels",
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
    var counties_lbl = new OpenLayers.Layer.TMS("County Labels",
        SERVER_URI + "tilecache/", {
            layername: "counties_lbl",
            type: "png",
            isBaseLayer: false,
            visibility: false,
            tileOrigin: new OpenLayers.LonLat(-9462455, 3963396)
        }
    );

    var ncbcr = new OpenLayers.Layer.TMS("Bird Conservation Region Boundaries",
        SERVER_URI + "tilecache/", {
            layername: "ncbcr",
            type: "png",
            isBaseLayer: false,
            visibility: false,
            tileOrigin: new OpenLayers.LonLat(-9462455, 3963396)
        }
    );

    var ncbounds = new OpenLayers.Layer.TMS("State Boundary",
        SERVER_URI + "tilecache/", {
            layername: "ncbounds",
            type: "png",
            isBaseLayer: false,
            visibility: true,
            tileOrigin: new OpenLayers.LonLat(-9462455, 3963396)
        }
    );

    var ecoregions = new OpenLayers.Layer.TMS("Ecoegion Boundaries",
        SERVER_URI + "tilecache/", {
            layername: "ecoregions",
            type: "png",
            isBaseLayer: false,
            visibility: false,
            tileOrigin: new OpenLayers.LonLat(-9462455, 3963396)
        }
    );


    ///////////////////////////////////////////////////////////
    ////////////analysis layers

    var styleMap = new OpenLayers.StyleMap({
        strokeColor: "red",
        strokeWidth: 2,
        strokeOpacity: 0.5,
        fillOpacity: 0.2
    });

    var resultsStyleMap = new OpenLayers.StyleMap({});
    var resultsStyleMap_model = new OpenLayers.StyleMap({});
    // ['f5f57a', 'e8b655', 'd68036', 'c3491a', 'a80000']
    var symbolsLookup = {
        0: {
            strokeColor: "black",
            fillColor: "#ffffff",
            strokeWidth: 1,
            strokeOpacity: 1,
            fillOpacity: 1
        },
        1: {
            strokeColor: "black",
            fillColor: "#ffffff",
            strokeWidth: 1,
            strokeOpacity: 1,
            fillOpacity: 1
        },
        2: {
            strokeColor: "black",
            fillColor: "#ffffff",
            strokeWidth: 1,
            strokeOpacity: 1,
            fillOpacity: 1
        },
        3: {
            strokeColor: "black",
            fillColor: "#ffffff",
            strokeWidth: 1,
            strokeOpacity: 1,
            fillOpacity: 1
        },
        4: {
            strokeColor: "black",
            fillColor: "#ffffff",
            strokeWidth: 1,
            strokeOpacity: 1,
            fillOpacity: 1
        },
        5: {
            strokeColor: "black",
            fillColor: "#ffffff",
            strokeWidth: 1,
            strokeOpacity: 1,
            fillOpacity: 1
        }
    };

    var symbolsLookup_model = {
        0: {
            strokeColor: "black",
            fillColor: "#006100",
            strokeWidth: 1,
            strokeOpacity: 1,
            fillOpacity: 1
        },
        1: {
            strokeColor: "black",
            fillColor: "#367D00",
            strokeWidth: 1,
            strokeOpacity: 1,
            fillOpacity: 1
        },
        2: {
            strokeColor: "black",
            fillColor: "#619A00",
            strokeWidth: 1,
            strokeOpacity: 1,
            fillOpacity: 1
        },
        3: {
            strokeColor: "black",
            fillColor: "#8FBB00",
            strokeWidth: 1,
            strokeOpacity: 1,
            fillOpacity: 1
        },
        4: {
            strokeColor: "black",
            fillColor: "#C6DC00",
            strokeWidth: 1,
            strokeOpacity: 1,
            fillOpacity: 1
        },
        5: {
            strokeColor: "black",
            fillColor: "#FFFF00",
            strokeWidth: 1,
            strokeOpacity: 1,
            fillOpacity: 1
        },
        6: {
            strokeColor: "black",
            fillColor: "#FFDA00",
            strokeWidth: 1,
            strokeOpacity: 1,
            fillOpacity: 1
        },
        7: {
            strokeColor: "black",
            fillColor: "#FFAF00",
            strokeWidth: 1,
            strokeOpacity: 1,
            fillOpacity: 1
        },
        8: {
            strokeColor: "black",
            fillColor: "#FF8400",
            strokeWidth: 1,
            strokeOpacity: 1,
            fillOpacity: 1
        },
        9: {
            strokeColor: "black",
            fillColor: "#FF5A00",
            strokeWidth: 1,
            strokeOpacity: 1,
            fillOpacity: 1
        },
        10: {
            strokeColor: "black",
            fillColor: "#FF2200",
            strokeWidth: 1,
            strokeOpacity: 1,
            fillOpacity: 1
        }
    };

    symbolsLookup["0"].fillColor = "#ffffff";

    resultsStyleMap.addUniqueValueRules('default', 'threat', symbolsLookup);
    resultsStyleMap_model.addUniqueValueRules('default', 'threat', symbolsLookup_model);

    var highlightLayer = new OpenLayers.Layer.Vector("AOI Selection", {
        displayInLayerSwitcher: false,
        isBaseLayer: false,
        projection: proj_4326,
        styleMap: styleMap,
    });

    // old layer name Results
    var results = new OpenLayers.Layer.Vector("Composite Threats", {
        displayInLayerSwitcher: false,
        isBaseLayer: false,
        projection: proj_4326,
        styleMap: resultsStyleMap_model,
        renderers: ["SVG"]
    });

    var huc12_state = new OpenLayers.Layer.Vector("Individual Threats", {
        displayInLayerSwitcher: false,
        isBaseLayer: false,
        projection: proj_4326,
        styleMap: resultsStyleMap,
        renderers: ["SVG"]
    });

    $.ajax({
        type: "GET",
        url: SERVER_URI + 'wps/huc12_state',
        dataType: "json"
    }).done(function(data) {
        var geojson_format = new OpenLayers.Format.GeoJSON({
            'internalProjection': new OpenLayers.Projection("EPSG:900913"),
            'externalProjection': new OpenLayers.Projection("EPSG:4326")
        });
        huc12_state.addFeatures(geojson_format.read(data));
        huc12_state.setVisibility(false);
    });

    $.ajax({
        type: "GET",
        url: SERVER_URI + 'wps/huc12_state',
        dataType: "json"
    }).done(function(data) {
        var geojson_format = new OpenLayers.Format.GeoJSON({
            'internalProjection': new OpenLayers.Projection("EPSG:900913"),
            'externalProjection': new OpenLayers.Projection("EPSG:4326")
        });
        results.addFeatures(geojson_format.read(data));
        results.setVisibility(true);
    });

    map.addLayers([huc12_state, ncbounds, ecoregions, counties, ncbcr, nchuc2, nchuc4, nchuc6, nchuc12,
        nchuc10, nchuc8, nchuc2_lbl, nchuc4_lbl, nchuc6_lbl,
        nchuc12_lbl, nchuc10_lbl, nchuc8_lbl, counties_lbl,
        results, gphy, osm, counties_base
    ]);

    //////////////////////////////////////////////////////////////////////////
    // add controls
    //////////////////////////////////////////////////////////////////////////
    function console_on_zoom() {
        console.log("resolution is", map.getResolution());
        console.log("scale is", map.getScale());
    }
    map.events.register('zoomend', map, console_on_zoom);

    // create click control to read lat/lon
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
    var col_name;


    function add_point(e) {
        var mode = formPanel2.getComponent('rg1').getValue().inputValue;
        if (mode.indexOf("custom") !== -1) {
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
        } else {
            var lonlat = map.getLonLatFromViewPortPx(e.xy);
            $.ajax({
                type: "GET",
                url: SERVER_URI + "wps/pttojson",
                data: {
                    pt_lon: lonlat.lon,
                    pt_lat: lonlat.lat,
                    qry_lyr: col_name
                },
                dataType: "json"
            }).done(function(data, textStatus, jqXHR) {
                if (jqXHR.status === 200) {
                    // console.log(data.msg);
                    showInfo2(data);
                }

            });

        }

    }

    // var featureinfo_format = new OpenLayers.Format.WMSGetFeatureInfo({
    //     externalProjection: proj_4326,
    //     internalProjection: proj_900913
    // });

    // var query_ctl = new OpenLayers.Control.WMSGetFeatureInfo({
    //     url: SERVER_URI + 'geoserver/wms',
    //     title: 'Identify features by clicking',
    //     //layers : [nchuc12],
    //     queryVisible: false,
    //     infoFormat: "application/vnd.ogc.gml",
    //     format: featureinfo_format
    // });

    // query_ctl.layers = [];

    // // query_ctl.events.register("getfeatureinfo", this, showInfo);
    // map.addControl(query_ctl);

    var selected_hucs = {};

    //function to outline selected predefined areas of interest
    // function showInfo(evt) {
    //     console.log(selected_hucs);
    //     if (evt.features && evt.features.length) {
    //         for (var i = 0; i < evt.features.length; i++) {
    //             //if selected feature is on then remove it
    //             if (selected_hucs[evt.features[i].data[col_name]] === 'on') {
    //                 selected_hucs[evt.features[i].data[col_name]] = 'off';
    //                 var selected_features_drawn =
    //                     map.getLayersByName("AOI Selection")[0].features;
    //                 console.log(selected_features_drawn);
    //                 for (var j = 0; j < selected_features_drawn.length; j++) {
    //                     if (selected_features_drawn[j].data[col_name] ===
    //                         evt.features[i].data[col_name]) {
    //                         map.getLayersByName(
    //                             "AOI Selection"
    //                         )[0].removeFeatures(selected_features_drawn[j]);
    //                     }
    //                 }
    //                 // else add feature
    //             } else {
    //                 selected_hucs[evt.features[i].data[col_name]] = 'on';
    //                 highlightLayer.addFeatures(evt.features[i]);
    //             }
    //         }
    //         highlightLayer.redraw();
    //     }
    // }

    //function to outline selected predefined areas of interest
    function showInfo2(evt) {
        if (evt.the_geom) {
            // for (var i = 0; i < evt.features.length; i++) {
            //if selected feature is on then remove it
            if (selected_hucs[evt.the_huc] === 'on') {
                selected_hucs[evt.the_huc] = 'off';
                var selected_features_drawn =
                    map.getLayersByName("AOI Selection")[0].features;
                for (var j = 0; j < selected_features_drawn.length; j++) {
                    if (selected_features_drawn[j].data.name ===
                        evt.the_huc) {
                        map.getLayersByName(
                            "AOI Selection"
                        )[0].removeFeatures(selected_features_drawn[j]);
                    }
                }
                // else add feature
            } else {
                selected_hucs[evt.the_huc] = 'on';
                var format = new OpenLayers.Format.GeoJSON({
                    'internalProjection': new OpenLayers.Projection("EPSG:900913"),
                    'externalProjection': new OpenLayers.Projection("EPSG:4326")
                });
                highlightLayer.addFeatures(format.read(evt.the_geom));
            }
            // }
            highlightLayer.redraw();
        }
    }

    var click = new OpenLayers.Control.Click();
    map.addControl(click);

    // query_ctl.activate();

    var new_selection = function() {
        var mode = formPanel2.getComponent('rg1').getValue().inputValue;
        if (mode.indexOf("custom") !== -1) {
            click.activate();
            // query_ctl.deactivate();
            highlightLayer.destroyFeatures();
            pts = [];
        } else if (mode.indexOf("predefined") !== -1) {
            // click.deactivate();
            // query_ctl.activate();
            click.activate();
            // query_ctl.deactivate();
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

    ////////////////////////////////////////////////////////
    //if hash in url use to load AOI
    ///////////////////////////////////////////////////
    if (window.location.hash.slice(1).length !== 0) {
        resource = SERVER_URI + 'wps/' + window.location.hash.slice(1);
        $.ajax({
            type: "GET",
            url: resource + '/saved',
            dataType: "json"
        }).done(function(data) {
            aoi_to_file = getResource(resource);
            Ext.getCmp("resource_btn").setHandler(aoi_to_file);
            onExecuted(data.geojson);
            var extent = new OpenLayers.Bounds(
                data.extent).transform(proj_4326, proj_900913);
            map.zoomToExtent(extent);
        });

    }

    console.log(resource);


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
    var comboStorelayers = new Ext.data.ArrayStore({
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
    comboStorelayers.loadData(comboData);

    // called creating new aoi
    var form2_chng = function() {
        remove_action();
        var selected_predef = formPanel2.getForm().getValues().predef_selection;
        var sel_type = formPanel2.getForm().getValues().aoi_type;
        if (sel_type === 'predefined') {
            switch (selected_predef) {
                case 'NC HUC 2':
                    // query_ctl.layers = [nchuc2_qry];
                    col_name = "huc2";
                    nchuc2.setVisibility(true);
                    nchuc2_lbl.setVisibility(true);
                    break;
                case 'NC HUC 4':
                    // query_ctl.layers = [nchuc4_qry];
                    col_name = "huc4";
                    nchuc4.setVisibility(true);
                    nchuc4_lbl.setVisibility(true);
                    break;
                case 'NC HUC 6':
                    // query_ctl.layers = [nchuc6_qry];
                    col_name = "huc6";
                    nchuc6.setVisibility(true);
                    nchuc6_lbl.setVisibility(true);
                    break;
                case 'NC HUC 8':
                    // query_ctl.layers = [nchuc8_qry];
                    col_name = "huc8";
                    nchuc8.setVisibility(true);
                    nchuc8_lbl.setVisibility(true);
                    break;
                case 'NC HUC 10':
                    // query_ctl.layers = [nchuc10_qry];
                    col_name = "huc10";
                    nchuc10.setVisibility(true);
                    nchuc10_lbl.setVisibility(true);
                    break;
                case 'NC HUC 12':
                    // query_ctl.layers = [nchuc12_qry];
                    col_name = "huc_12";
                    nchuc12.setVisibility(true);
                    nchuc12_lbl.setVisibility(true);
                    break;
                case 'NC Counties':
                    // query_ctl.layers = [counties_qry];
                    col_name = "co_num";
                    counties.setVisibility(true);
                    counties_lbl.setVisibility(true);
                    break;
                case 'NC BCR':
                    // query_ctl.layers = [ncbcr];
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
                    selected_features_drawn[j].data.name);
            }
            console.log(aoi_list);

        }

        $.ajax({
            type: "POST",
            url: SERVER_URI + "wps",
            data: {
                gml: gml,
                aoi_list: aoi_list.join(":"),
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
    };

    // new aoi panel
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
            store: comboStorelayers,
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
            text: "Save",
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
    var comboStoreyears = new Ext.data.ArrayStore({
        fields: ['layerName', 'layerId']
    });
    var comboData2 = [
        ["2010", '10'],
        ["2020", '20'],
        ["2030", '30'],
        ["2040", '40'],
        ["2050", '50']
    ];
    comboStoreyears.loadData(comboData2);

    var comboStorescenarios = new Ext.data.ArrayStore({
        fields: ['layerName', 'layerId']
    });
    var comboData3 = [
        ["Baseline", 'x'],
        ["Biofuel Production A", 'a'],
        ["Biofuel Production B", 'b'],
        ["Biofuel Production C", 'c'],
        ["Biofuel Production D", 'd'],
        ["Biofuel Production E", 'e'],
    ];
    comboStorescenarios.loadData(comboData3);

    var comboStoreweights = new Ext.data.ArrayStore({
        fields: ['layerName', 'layerId']
    });
    var comboData4 = [
        ["do not include", "notinclude"],
        ["include: 0.12 weight", '0.12'],
        ["include: 0.25 weight", '0.25'],
        ["include: 0.50 weight", '0.50'],
        ["include: 1.00 weight", '1.00'],
        ["include: 1.50 weight", '1.50'],
        ["include: 3.00 weight", '3.00'],
        ["include: 6.00 weight", '6.00']
    ];
    comboStoreweights.loadData(comboData4);



    // var checkGroupx = {
    //     xtype: 'fieldset',
    //     title: 'Habitat',
    //     autoHeight: true,
    //     layout: 'form',
    //     // collapsed: true, // initially collapse the group
    //     //  collapsible: true,
    //     items: [{
    //         // Use the default, automatic layout to distribute the controls evenly
    //         // across a single row
    //         xtype: 'checkboxgroup',
    //         fieldLabel: 'select habitat',
    //         id: 'cbgrp1',
    //         columns: 1,
    //         items: [{
    //             boxLabel: 'Pollution 1',
    //             name: 'polu1'
    //         }, {
    //             boxLabel: 'Pollution 2',
    //             name: 'polu2',
    //             checked: false
    //         }, {
    //             boxLabel: 'Disease 1',
    //             name: 'dise1'
    //         }, {
    //             boxLabel: 'Disease 2',
    //             name: 'dise2'
    //         }, {
    //             boxLabel: 'Sea Level Rise',
    //             name: 'slr'
    //         }, {
    //             boxLabel: 'Fire Probability',
    //             name: 'firp'
    //         }, {
    //             boxLabel: 'Fire Suppresion',
    //             name: 'firs'
    //         }, {
    //             boxLabel: 'Transportation Corridors',
    //             name: 'tran'
    //         }, {
    //             boxLabel: 'Fragmentaion Index',
    //             name: 'frag'
    //         }, {
    //             boxLabel: 'Urban Percentage',
    //             name: 'urb'
    //         }]
    //     }]
    // };



    var threat_calcs_map = function() {
        var form_vals_hab = habitat_panel.getForm().getValues();
        // console.log(form_vals_hab);
        var form_vals_year = modelpaneltop.getForm().getValues();
        // console.log(form_vals_year);
        var form_vals_misc = modelpanelmid.getForm().getValues();
        console.log(form_vals_misc);
        var form_vals_water = modelpanelbot.getForm().getValues();
        // console.log(form_vals_water);
        $.ajax({
            url: SERVER_URI + 'wps/map',
            type: 'GET',
            data: {
                impaired: form_vals_water.impaired,
                impairall: form_vals_water.impairall,
                impairbioata: form_vals_water.impairbioata,
                impairmetal: form_vals_water.impairmetal,
                impairnutr: form_vals_water.impairnutr,
                impairother: form_vals_water.impairother,
                impairpolu: form_vals_water.impairpolu,
                impairhab: form_vals_water.impairhab,
                impairtemp: form_vals_water.impairnutr,
                scenario: form_vals_hab.scenario,
                habitat: form_vals_hab.habitat,
                habitat_weight: form_vals_hab.habitat_weight,
                year: form_vals_year.year,
                firesup: form_vals_misc.firesup,
                hiway: form_vals_misc.hiway,
                insectdisease: form_vals_misc.insectdisease,
                manure: form_vals_misc.manure,
                ndams: form_vals_misc.ndams,
                nitrofrt: form_vals_misc.nitrofrt,
                totnitro: form_vals_misc.totnitro,
                totsulf: form_vals_misc.totsulf,
                triassic: form_vals_misc.triassic,
                urbangrth: form_vals_misc.urbangrth
            },
            dataType: 'json'
        }).done(function(data) {
            console.log(data.res_arr);
            console.log(data.col_hdrs.length);
            var results_col = data.col_hdrs.length;


            for (var key in data.res_arr) {
                var thrt = data.res_arr[key][results_col];
                thrt = Math.round(thrt);
                if (!symbolsLookup_model.hasOwnProperty(thrt)){
                    console.log("not valid lever", thrt);
                }
                try {
                    map.getLayersByName("Composite Threats")[0].
                    getFeaturesByAttribute("huc12", key)[0].
                    attributes.threat = thrt;
                } catch (err) {
                    console.log(key);
                }
            }
            map.getLayersByName("Composite Threats")[0].redraw();

            // onExecuted(data.results);
        });
    };

    var threat_calcs_report = function() {
        var form_vals_hab = habitat_panel.getForm().getValues();
        var form_vals_year = modelpaneltop.getForm().getValues();
        var form_vals_misc = modelpanelmid.getForm().getValues();
        var form_vals_water = modelpanelbot.getForm().getValues();
        var form_vals = {
            impaired: form_vals_water.impaired,
            impairall: form_vals_water.impairall,
            impairbioata: form_vals_water.impairbioata,
            impairmetal: form_vals_water.impairmetal,
            impairnutr: form_vals_water.impairnutr,
            impairother: form_vals_water.impairother,
            impairpolu: form_vals_water.impairpolu,
            impairhab: form_vals_water.impairhab,
            impairtemp: form_vals_water.impairnutr,
            scenario: form_vals_hab.scenario,
            habitat: form_vals_hab.habitat,
            habitat_weight: form_vals_hab.habitat_weight,
            year: form_vals_year.year,
            firesup: form_vals_misc.firesup,
            hiway: form_vals_misc.hiway,
            insectdisease: form_vals_misc.insectdisease,
            manure: form_vals_misc.manure,
            ndams: form_vals_misc.ndams,
            nitrofrt: form_vals_misc.nitrofrt,
            totnitro: form_vals_misc.totnitro,
            totsulf: form_vals_misc.totsulf,
            triassic: form_vals_misc.triassic,
            urbangrth: form_vals_misc.urbangrth
        };
        var qry_str = $.param(form_vals);
        var url = SERVER_URI + 'wps/report?' + qry_str;
        console.log(url);
        window.open(url);
    };

    var threat_calcs_ssheet = function() {
        var form_vals_hab = habitat_panel.getForm().getValues();
        var form_vals_year = modelpaneltop.getForm().getValues();
        var form_vals_misc = modelpanelmid.getForm().getValues();
        var form_vals_water = modelpanelbot.getForm().getValues();
        var form_vals = {
            impaired: form_vals_water.impaired,
            impairall: form_vals_water.impairall,
            impairbioata: form_vals_water.impairbioata,
            impairmetal: form_vals_water.impairmetal,
            impairnutr: form_vals_water.impairnutr,
            impairother: form_vals_water.impairother,
            impairpolu: form_vals_water.impairpolu,
            impairhab: form_vals_water.impairhab,
            impairtemp: form_vals_water.impairnutr,
            scenario: form_vals_hab.scenario,
            habitat: form_vals_hab.habitat,
            habitat_weight: form_vals_hab.habitat_weight,
            year: form_vals_year.year,
            firesup: form_vals_misc.firesup,
            hiway: form_vals_misc.hiway,
            insectdisease: form_vals_misc.insectdisease,
            manure: form_vals_misc.manure,
            ndams: form_vals_misc.ndams,
            nitrofrt: form_vals_misc.nitrofrt,
            totnitro: form_vals_misc.totnitro,
            totsulf: form_vals_misc.totsulf,
            triassic: form_vals_misc.triassic,
            urbangrth: form_vals_misc.urbangrth
        };
        var qry_str = $.param(form_vals);
        $.ajax({
            url: SERVER_URI + 'wps/ssheet?' + qry_str,
            type: 'GET'
        }).done(function(data, textStatus, jqXHR) {
            if (jqXHR.status === 201) {
                var csvresource = jqXHR.getResponseHeader('Location');
                $('#dnlds').attr('action', csvresource);
                $('#dnlds').submit();
            } else {
                console.log("error" + jqXHR.status);
            }
        });
    };

    var show_legend_flag = true;
    // console.log(habitats);
    var tree_huc12maps = new Ext.tree.TreePanel({
        // renderTo: 'tree-div',
        useArrows: true,
        autoScroll: true,
        animate: true,
        enableDD: true,
        containerScroll: true,
        border: true,
        rootVisible: false,
        root: new Ext.tree.AsyncTreeNode({
            expanded: true,
            children: [{
                text: 'Habitats',
                expanded: false,
                qtip: 'click for documentation',
                href: 'http://google.com',
                hrefTarget: "_blank",
                // iconCls: 'tree_image'

                // defined in file functions.js
                children: habitats,
            }, {
                text: 'Urban Growth',
                children: urban_tree
            }, {
                text: 'Fire Suppression',
                children: fire_tree
            }, {
                text: 'Transportation',
                children: trans_tree
            }, {
                text: 'Nutrient Loading',
                expanded: false,
                children: [{
                    text: 'Manure Application',
                    leaf: true,
                    myvalue: "nutrient:manu"
                }, {
                    text: 'Synthetic Nitrogen Fertilizer Application',
                    leaf: true,
                    myvalue: "nutrient:fert"
                }]
            }, {
                text: 'Annual Atmospheric Deposition',
                expanded: false,
                children: [{
                    text: 'Total Nitrogen Deposition',
                    leaf: true,
                    myvalue: "nutrient:td_n_t"
                }, {
                    text: 'Total Sulfur Deposition',
                    leaf: true,
                    myvalue: "nutrient:td_s_t"
                }]
            }, {
                text: 'Hydrologic Alteration',
                expanded: false,
                children: [{
                    text: 'Number of dams',
                    leaf: true,
                    myvalue: "water:NID"
                }]
            }, {
                text: 'Forest Health',
                expanded: false,
                children: [{
                    text: 'Forest Insect/Disease Risk ',
                    leaf: true,
                    myvalue: "frsthlth"
                }]
            }, {
                text: 'Energy Development',
                expanded: false,
                children: [{
                    text: 'Triassic Basin',
                    leaf: true,
                    myvalue: "energydev"
                }, {
                    text: 'Wind Resource',
                    leaf: true,
                    myvalue: "wind"
                }]
            }, {
                text: 'Sea Level Rise',
                expanded: false,
                children: [{
                    text: 'Undeveloped Upland Change',
                    children: slr_up
                }, {
                    text: 'Terrestrial Landcover Change',
                    children: slr_lc
                }]
            }, {
                text: 'Impaired Waters',
                expanded: false,
                children: [{
                    text: 'Impaired: All',
                    leaf: true,
                    myvalue: "water:totimplen"
                }, {
                    text: 'Impaired: Biota',
                    leaf: true,
                    myvalue: "water:bioimplen"
                }, {
                    text: 'Impaired: Metals',
                    leaf: true,
                    myvalue: "water:metimplen"
                }, {
                    text: 'Impaired: Nutrients',
                    leaf: true,
                    myvalue: "water:nutimplen"
                }, {
                    text: 'Impaired: Habitat',
                    leaf: true,
                    myvalue: "water:habimplen"
                }, {
                    text: 'Impaired: Temperature',
                    leaf: true,
                    myvalue: "water:tempimplen"
                }, {
                    text: 'Impaired: Pollution',
                    leaf: true,
                    myvalue: "water:polimplen"
                }, {
                    text: 'Impaired: Other',
                    leaf: true,
                    myvalue: "water:otherlen"
                }]
            }]
        }),
        listeners: {
            click: function(n) {
                console.log(n.attributes.myvalue);
                // console.log(formPanelhuc12maps.getForm().getValues(true));
                if (n.attributes.myvalue) {
                    console.log(n.attributes.myvalue);
                    formhuc12maps_chng(n.attributes.myvalue);
                    huc12_state.setVisibility(true);
                    if (show_legend_flag) {
                        float_win.show();
                        show_legend_flag = false;
                    }

                }
            }
        }
    });
    // tree_huc12maps.getRootNode().expand();

    var checkGrouphabitat = {
        xtype: 'radiogroup',
        fieldLabel: 'Habitat ',
        columns: 1,
        items: [{
            boxLabel: 'forest',
            name: 'habitat',
            inputValue: 'frst',
            checked: true
        }, {
            boxLabel: 'wet forest',
            name: 'habitat',
            inputValue: 'ftwt'
        }, {
            boxLabel: 'open',
            name: 'habitat',
            inputValue: 'open'
        }, {
            boxLabel: 'scrub',
            name: 'habitat',
            inputValue: 'shrb'
        }, {
            boxLabel: 'wet herbaceous',
            name: 'habitat',
            inputValue: 'hbwt'
        }]
    };

    var habitat_panel = new Ext.form.FormPanel({
        title: "",
        width: 280,
        // height: 500,
        bodyStyle: "padding:20px;  margin-top: 5px;",
        border: true,
        // labelAlign: "top",
        defaults: {
            anchor: "100%"
        },
        items: [{
            xtype: "combo",
            // itemId: "cmb2",
            store: comboStorescenarios,
            name: 'misc',
            fieldLabel: "Biofuels Scenario",
            value: "x",
            typeAhead: true,
            mode: "local",
            triggerAction: "all",
            valueField: 'layerId',
            displayField: 'layerName',
            submitValue: true,
            hiddenName: 'scenario',
            listeners: {
                //'select': form2_chng
            }
        }, checkGrouphabitat, {
            xtype: "combo",
            // itemId: "cmb2",
            store: comboStoreweights,
            name: 'hab_wts',
            fieldLabel: "Habitat",
            value: "notinclude",
            typeAhead: true,
            mode: "local",
            triggerAction: "all",
            valueField: 'layerId',
            displayField: 'layerName',
            submitValue: true,
            hiddenName: 'habitat_weight',
            listeners: {
                //'select': form2_chng
            }
        }]
    });

    var modelpaneltop = new Ext.form.FormPanel({
        title: "",
        width: 280,
        // height: 500,
        bodyStyle: "padding:20px; margin-top: 5px;",
        // labelAlign: "top",
        defaults: {
            anchor: "100%"
        },
        items: [{
                xtype: "combo",
                // itemId: "cmb2",
                store: comboStoreyears,
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
            }



        ]
    });

    var modelpanelmid = new Ext.form.FormPanel({
        title: "",
        width: 280,
        // height: 500,
        bodyStyle: "padding:20px; margin-top: 5px;",
        // labelAlign: "top",
        defaults: {
            anchor: "100%"
        },
        items: [{
            xtype: "combo",
            // itemId: "cmb2",
            store: comboStoreweights,
            name: 'miscdata',
            fieldLabel: "Urban Growth",
            value: "notinclude",
            typeAhead: true,
            mode: "local",
            triggerAction: "all",
            valueField: 'layerId',
            displayField: 'layerName',
            submitValue: true,
            hiddenName: 'urbangrth',
            listeners: {
                //'select': form2_chng
            }

        }, {
            xtype: "combo",
            // itemId: "cmb2",
            store: comboStoreweights,
            name: 'miscdata',
            fieldLabel: "Fire Suppression",
            value: "notinclude",
            typeAhead: true,
            mode: "local",
            triggerAction: "all",
            valueField: 'layerId',
            displayField: 'layerName',
            submitValue: true,
            hiddenName: 'firesup'

        }, {
            xtype: "combo",
            // itemId: "cmb2",
            store: comboStoreweights,
            name: 'miscdata',
            fieldLabel: "Transportation / Div. Highways",
            value: "notinclude",
            typeAhead: true,
            mode: "local",
            triggerAction: "all",
            valueField: 'layerId',
            displayField: 'layerName',
            submitValue: true,
            hiddenName: 'hiway'

        }, {
            xtype: "combo",
            // itemId: "cmb2",
            store: comboStoreweights,
            name: 'miscdata',
            fieldLabel: "SLR / Undeveloped Upland Change",
            value: "notinclude",
            typeAhead: true,
            mode: "local",
            triggerAction: "all",
            valueField: 'layerId',
            displayField: 'layerName',
            submitValue: true,
            hiddenName: 'slr_up'

        }, {
            xtype: "combo",
            // itemId: "cmb2",
            store: comboStoreweights,
            name: 'miscdata',
            fieldLabel: "SLR / Terrestrial Landcover Change",
            value: "notinclude",
            typeAhead: true,
            mode: "local",
            triggerAction: "all",
            valueField: 'layerId',
            displayField: 'layerName',
            submitValue: true,
            hiddenName: 'slr_lc'

        }, {
            xtype: "combo",
            // itemId: "cmb2",
            store: comboStoreweights,
            name: 'miscdata',
            fieldLabel: "Energy Dev. / Triassic Basin",
            value: "notinclude",
            typeAhead: true,
            mode: "local",
            triggerAction: "all",
            valueField: 'layerId',
            displayField: 'layerName',
            submitValue: true,
            hiddenName: 'triassic'
        }, {
            xtype: "combo",
            // itemId: "cmb2",
            store: comboStoreweights,
            name: 'miscdata',
            fieldLabel: "Energy Dev. / Wind Power",
            value: "notinclude",
            typeAhead: true,
            mode: "local",
            triggerAction: "all",
            valueField: 'layerId',
            displayField: 'layerName',
            submitValue: true,
            hiddenName: 'wind'
        }, {
            xtype: "combo",
            // itemId: "cmb2",
            store: comboStoreweights,
            name: 'miscdata',
            fieldLabel: "Nutrient Loading / Manure Application",
            value: "notinclude",
            typeAhead: true,
            mode: "local",
            triggerAction: "all",
            valueField: 'layerId',
            displayField: 'layerName',
            submitValue: true,
            hiddenName: 'manure'

        }, {
            xtype: "combo",
            // itemId: "cmb2",
            store: comboStoreweights,
            name: 'miscdata',
            fieldLabel: "Nutrient Loading / Synthetic Nitrogen",
            value: "notinclude",
            typeAhead: true,
            mode: "local",
            triggerAction: "all",
            valueField: 'layerId',
            displayField: 'layerName',
            submitValue: true,
            hiddenName: 'nitrofrt'

        }, {
            xtype: "combo",
            // itemId: "cmb2",
            store: comboStoreweights,
            name: 'miscdata',
            fieldLabel: "Atmospheric Dep. / Total Nitrogen",
            value: "notinclude",
            typeAhead: true,
            mode: "local",
            triggerAction: "all",
            valueField: 'layerId',
            displayField: 'layerName',
            submitValue: true,
            hiddenName: 'totnitro'

        }, {
            xtype: "combo",
            // itemId: "cmb2",
            store: comboStoreweights,
            name: 'miscdata',
            fieldLabel: "Atmospheric Dep. / Total Sulfur",
            value: "notinclude",
            typeAhead: true,
            mode: "local",
            triggerAction: "all",
            valueField: 'layerId',
            displayField: 'layerName',
            submitValue: true,
            hiddenName: 'totsulf'

        }, {
            xtype: "combo",
            // itemId: "cmb2",
            store: comboStoreweights,
            name: 'miscdata',
            fieldLabel: "Forest Hlth / Insect & Disease Risk",
            value: "notinclude",
            typeAhead: true,
            mode: "local",
            triggerAction: "all",
            valueField: 'layerId',
            displayField: 'layerName',
            submitValue: true,
            hiddenName: 'insectdisease'

        }, {
            xtype: "combo",
            // itemId: "cmb2",
            store: comboStoreweights,
            name: 'miscdata',
            fieldLabel: "Hydro Alteration / # of Dams",
            value: "notinclude",
            typeAhead: true,
            mode: "local",
            triggerAction: "all",
            valueField: 'layerId',
            displayField: 'layerName',
            submitValue: true,
            hiddenName: 'ndams'

        }]
    });

    var checkGroupimpaired = {
        xtype: 'radiogroup',
        fieldLabel: 'Impaired Waters',
        columns: 1,
        items: [{
            boxLabel: 'Impaired: All',
            name: 'impaired',
            inputValue: 'all',
            checked: true
        }, {
            boxLabel: 'Impaired: Individual',
            name: 'impaired',
            inputValue: 'indiv'
        }]
    };

    var modelpanelbot = new Ext.form.FormPanel({
        title: "",
        width: 280,
        // height: 500,
        bodyStyle: "padding:20px; margin-top: 5px;",
        // labelAlign: "top",
        defaults: {
            anchor: "100%"
        },
        items: [
            // checkGroupimpaired
            {
                fieldLabel: 'Impaired Waters',
                xtype: 'radio',
                boxLabel: 'Impaired: All',
                name: 'impaired',
                inputValue: 'all',
                checked: true

            }, {
                xtype: "combo",
                // itemId: "cmb2",
                store: comboStoreweights,
                name: 'miscdata',
                fieldLabel: "Impaired: All",
                value: "notinclude",
                typeAhead: true,
                mode: "local",
                triggerAction: "all",
                valueField: 'layerId',
                displayField: 'layerName',
                submitValue: true,
                hiddenName: 'impairall'

            }, {
                xtype: 'radio',
                boxLabel: 'Impaired: Individual',
                name: 'impaired',
                inputValue: 'indiv'

            }, {
                xtype: "combo",
                // itemId: "cmb2",
                store: comboStoreweights,
                name: 'miscdata',
                fieldLabel: "Impaired: Biota",
                value: "notinclude",
                typeAhead: true,
                mode: "local",
                triggerAction: "all",
                valueField: 'layerId',
                displayField: 'layerName',
                submitValue: true,
                hiddenName: 'impairbiota'

            }, {
                xtype: "combo",
                // itemId: "cmb2",
                store: comboStoreweights,
                name: 'miscdata',
                fieldLabel: "Impaired: Metals",
                value: "notinclude",
                typeAhead: true,
                mode: "local",
                triggerAction: "all",
                valueField: 'layerId',
                displayField: 'layerName',
                submitValue: true,
                hiddenName: 'impairmetal'

            }, {
                xtype: "combo",
                // itemId: "cmb2",
                store: comboStoreweights,
                name: 'miscdata',
                fieldLabel: "Impaired: Nutrients",
                value: "notinclude",
                typeAhead: true,
                mode: "local",
                triggerAction: "all",
                valueField: 'layerId',
                displayField: 'layerName',
                submitValue: true,
                hiddenName: 'impairnutr'

            }, {
                xtype: "combo",
                // itemId: "cmb2",
                store: comboStoreweights,
                name: 'miscdata',
                fieldLabel: "Impaired: Habitat",
                value: "notinclude",
                typeAhead: true,
                mode: "local",
                triggerAction: "all",
                valueField: 'layerId',
                displayField: 'layerName',
                submitValue: true,
                hiddenName: 'impairhab'

            }, {
                xtype: "combo",
                // itemId: "cmb2",
                store: comboStoreweights,
                name: 'miscdata',
                fieldLabel: "Impaired: Temperature",
                value: "notinclude",
                typeAhead: true,
                mode: "local",
                triggerAction: "all",
                valueField: 'layerId',
                displayField: 'layerName',
                submitValue: true,
                hiddenName: 'impairtemp'

            }, {
                xtype: "combo",
                // itemId: "cmb2",
                store: comboStoreweights,
                name: 'miscdata',
                fieldLabel: "Impaired: Pollution",
                value: "notinclude",
                typeAhead: true,
                mode: "local",
                triggerAction: "all",
                valueField: 'layerId',
                displayField: 'layerName',
                submitValue: true,
                hiddenName: 'impairpolu'

            }, {
                xtype: "combo",
                // itemId: "cmb2",
                store: comboStoreweights,
                name: 'miscdata',
                fieldLabel: "Impaired: Other",
                value: "notinclude",
                typeAhead: true,
                mode: "local",
                triggerAction: "all",
                valueField: 'layerId',
                displayField: 'layerName',
                submitValue: true,
                hiddenName: 'impairother'

            }
        ],
        buttons: [{
            text: "Spreadsheet",
            handler: threat_calcs_ssheet
        }, {
            text: "Report",
            handler: threat_calcs_report
        }, {
            text: "Show map",
            handler: threat_calcs_map
        }]
    });

    var legend_titles1 = {
        frst: 'Forest Habitat (ha)',
        ftwt: 'Wet Forest Habitat (ha)',
        hbwt: 'Wet Herbaceous Habitat (ha)',
        open: 'Open Habitat (ha)',
        shrb: 'Scrub/Shrub Habitat (ha)',
        urban: 'Urban (ha)',
        fire: 'urban density w/in? 5 mile radius',
        trans: 'length (m) of divided? center line roads',
        "nutrient:manu": "Manure Application? kg/ha/yr",
        "nutrient:fert": "Synthetic Nitrogen? Fertilizer Application kg/ha/yr",
        "nutrient:td_n_t": "Total Nitrogen? Deposition   kg/ha",
        "nutrient:td_s_t": "Total Sulfur? Deposition kg/ha",
        frsthlth: "Forest Insect?Disease Risk",
        energydev: "Triassic Basin",
        "water:totimplen": "Impaired: All km",
        "water:bioimplen": "Impaired: Biota km",
        "water:metimplen": "Impaired: Metals km",
        "water:nutimplen": "Impaired: Nutrients km",
        "water:habimplen": "Impaired: Habitat   km",
        "water:tempimplen": "Impaired: Temperature  km",
        "water:polimplen": "Impaired: Pollution km",
        "water:otherlen": "Impaired: Other  km",
        "water:NID": "Number of dams n",
        wind: "Wind Power Class? (mean)",
        slr_lc: "Terrestrial Landcover? Change (ha)",
        slr_up: "Undeveloped Upland? Change (ha)"

    };


    var formhuc12maps_chng = function(radclick) {
        var qry_str = "&map=" + radclick;
        console.log(qry_str);
        $.ajax({
            type: "GET",
            url: SERVER_URI + 'wps/huc12_map?' + qry_str,
            dataType: "json"
        }).done(function(data) {
            for (var key in data.res) {
                var thrt = data.res[key];
                try {
                    map.getLayersByName("Individual Threats")[0].
                    getFeaturesByAttribute("huc12", key)[0].
                    attributes.threat = thrt;
                } catch (err) {
                    // console.log(key);
                }
            }
            if (legend_titles1[data.map]) {
                lgd_title.text(legend_titles1[data.map].split('?')[0]);
                lgd_title2.text(legend_titles1[data.map].split('?')[1]);
            } else {
                lgd_title.text("not set");
                lgd_title2.text("not set");
                console.log(data.map);
            }
            symbolsLookup["1"].fillColor = "#" + data.colors[1];
            symbolsLookup["2"].fillColor = "#" + data.colors[2];
            symbolsLookup["3"].fillColor = "#" + data.colors[3];
            symbolsLookup["4"].fillColor = "#" + data.colors[4];
            symbolsLookup["5"].fillColor = "#" + data.colors[5];
            console.log(symbolsLookup["5"].fillColor);
            map.getLayersByName("Individual Threats")[0].redraw();
            console.log(data);

            lgd_text.text(function(d, i) {
                return data.lgd_text[i];
            });

            lgd_color.style("fill", function(d, i) {
                return "#" + data.colors[i];
            });



        });

    };


    var formPanelhuc12maps = new Ext.form.FormPanel({
        title: "",
        width: 296,
        // height: 500,
        bodyStyle: "padding:20px; ",
        labelAlign: "top",
        defaults: {
            anchor: "100%"
        },
        items: [tree_huc12maps],
        buttons: []
    });

    var open_user_tab = function(firstname, username) {
        console.log(username);
        console.log(firstname);
        var loginmsg = "<p>Hello " + firstname + "</p>";
        loginmsg += "<p> You are logged in as " + username + "</p>";
        loginmsg += "<p>Open my <a target='_blank' href='" +
            SERVER_URI + "wps/user/" + username + "'>page</a>.</p>";
        $("#login-msg").html(loginmsg);
        Ext.getCmp('userpanel').expand();
    };

    var login_form = new Ext.FormPanel({
        labelWidth: 80,
        // url: SERVER_URI + "wps/login",
        frame: true,
        title: 'Please Login',
        defaultType: 'textfield',
        monitorValid: true,
        items: [{
            fieldLabel: 'Username',
            name: 'loginUsername'
                // allowBlank: false
        }, {
            fieldLabel: 'Password',
            name: 'loginPassword',
            inputType: 'password'
                // allowBlank: false
        }],
        buttons: [{
            text: 'Login',
            handler: function() {
                console.log(login_form.getForm().getValues());
                var username = login_form.getForm().getValues().loginUsername;
                var passwd = login_form.getForm().getValues().loginPassword;
                $.ajax({
                    type: "POST",
                    url: SERVER_URI + "wps/login",
                    data: {
                        loginUsername: username,
                        loginPassword: passwd
                    },
                    dataType: "json",
                    success: function(data) {
                        if (data.success) {
                            Ext.Msg.alert('Status',
                                'Login Successful!',
                                function(btn) {
                                    if (btn == 'ok') {}
                                });
                            open_user_tab(data.firstname, data.username);

                        }
                    }
                });
            }
        }]
    });

    var passwdreset = function() {
        var email = passwdresetPanel.getForm().getValues().email;
        console.log(email);
        $.ajax({
            type: "POST",
            url: SERVER_URI + "wps/reset",
            data: {
                email: email
            },
            dataType: "json",
            success: function(data) {
                if (data.success) {
                    Ext.Msg.alert('Status',
                        data.msg,
                        function(btn) {
                            if (btn == 'ok') {}
                        });
                }
            }
        });
    };

    var passwdresetPanel = new Ext.FormPanel({
        labelWidth: 80, // label settings here cascade unless overridden
        frame: true,
        title: 'Password reset',
        // bodyStyle: 'padding:5px 15px 0',
        // width: 296,
        defaults: {
            width: 200
        },
        defaultType: 'textfield',

        items: [{
            fieldLabel: 'email',
            name: 'email',
            width: 180
        }],

        buttons: [{
            text: 'Submit',
            handler: passwdreset
        }]
    });

    var passwdchng = function() {
        console.log('changing passwd');
        var newpasswd = passwdchngPanel.getForm().getValues().passwd;
        console.log(newpasswd);
        $.ajax({
            url: SERVER_URI + "wps/passwdchng",
            type: "POST",
            data: {
                'newpasswd': newpasswd
            },
            dataType: "json",
            success: function(data) {
                console.log(data);
                if (data.success) {
                    Ext.Msg.alert('Status',
                        'Password changed.',
                        function(btn) {
                            if (btn == 'ok') {}
                        });

                }
            }
        });
    };

    var passwdchngPanel = new Ext.FormPanel({
        labelWidth: 120, // label settings here cascade unless overridden
        frame: true,
        title: 'Password change',
        // bodyStyle: 'padding:5px 15px 0',
        // width: 296,
        defaults: {
            width: 200
        },
        defaultType: 'textfield',

        items: [{
            fieldLabel: 'new password',
            name: 'passwd',
            width: 150
        }],

        buttons: [{
            text: 'Submit',
            handler: passwdchng
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


    var legend_panel = new Ext.Panel({
        // title: 'legend panel',
        cls: 'pages',
        autoScroll: true,
        id: "legendpnlid",
        html: "<svg id='lgnddiv'></svg>"

    });



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
    var float_win = new Ext.Window({
        title: "Legend ",
        height: 270,
        width: 260,
        layout: "fit",
        x: 320,
        y: 550,
        closeAction: 'hide',
        items: [legend_panel]
    }).show();

    var data = ['dddddd', 'dddddd', 'dddddd', 'dddddd', 'dddddd', 'dddddd'];
    var width = 420,
        barHeight = 25;

    var lgd = d3.select("#lgnddiv")
        .attr("height", 220)
        .attr("width", 220)
        .style("background-color", "#fefefe");

    lgd_title = lgd.append('text')
        .text("")
        .attr("x", 30)
        .attr("y", 30)
        .style("font", "16px sans-serif")
        .style("text-anchor", "start");

    lgd_title2 = lgd.append('text')
        .text("")
        .attr("x", 30)
        .attr("y", 50)
        .style("font", "16px sans-serif")
        .style("text-anchor", "start");


    var bar = lgd.selectAll("g")
        .data(data)
        .enter().append("g")
        .attr("transform", function(d, i) {
            return "translate(10," + (i * barHeight + 70) + ")";
        });

    lgd_color = bar.append("rect")
        .attr("width", 25)
        .attr("height", barHeight - 1)
        .style("fill", function(d) {
            return "#" + d;
        });

    lgd_text = bar.append("text")
        .attr("y", barHeight / 2)
        .attr("x", 60)
        .attr("dy", ".35em")
        .style("font", "13px sans-serif")
        .style("text-anchor", "start")
        .text(function() {
            return "0 - 0";
        });

    float_win.hide();

    action = new Ext.Action({
        handler: function() {
            // map.zoomToExtent(map_extent);
            // console.log(float_win);
            // float_win.open();
            console.log(float_win);

            float_win.show();
            // legend_panel.body.update("hello world");

        },
        tooltip: "show legend window",
        iconCls: "legend_win",
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
        expanded: false,
        loader: {
            filter: function(record) {
                return record.get("layer").name.indexOf("NC HUC 2") !== -1;
            }
        }
    });
    var layerList2 = new GeoExt.tree.LayerContainer({
        layerStore: mapPanel.layers,
        text: 'NC State',
        leaf: false,
        expanded: true,
        loader: {
            filter: function(record) {
                return record.get("layer").name.indexOf("State Boundary") !== -1;
            }
        }
    });
    var layerList3 = new GeoExt.tree.LayerContainer({
        layerStore: mapPanel.layers,
        text: 'NC River Basins',
        leaf: false,
        expanded: false,
        loader: {
            filter: function(record) {
                return record.get("layer").name.indexOf("River Basin") !== -1;
            }
        }
    });
    var layerList4 = new GeoExt.tree.LayerContainer({
        layerStore: mapPanel.layers,
        text: 'NC River Subbasins',
        leaf: false,
        expanded: false,
        loader: {
            filter: function(record) {
                return record.get("layer").name.indexOf("Subbasin") !== -1;
            }
        }
    });
    var layerList5 = new GeoExt.tree.LayerContainer({
        layerStore: mapPanel.layers,
        text: 'NC Watersheds',
        leaf: false,
        expanded: false,
        loader: {
            filter: function(record) {
                return record.get("layer").name.indexOf("Watershed") !== -1;
            }
        }
    });
    var layerList6 = new GeoExt.tree.LayerContainer({
        layerStore: mapPanel.layers,
        text: 'NC Ecoregions',
        leaf: false,
        expanded: false,
        loader: {
            filter: function(record) {
                return record.get("layer").name.indexOf("Ecoegion") !== -1;
            }
        }
    });
    var layerList7 = new GeoExt.tree.LayerContainer({
        layerStore: mapPanel.layers,
        text: 'NC Counties',
        leaf: false,
        expanded: false,
        loader: {
            filter: function(record) {
                return record.get("layer").name.indexOf("County") !== -1;
            }
        }
    });
    var layerList8 = new GeoExt.tree.LayerContainer({
        layerStore: mapPanel.layers,
        text: 'NC Bird Conservation Regions',
        leaf: false,
        expanded: false,
        loader: {
            filter: function(record) {
                return record.get("layer").name.indexOf("Bird Conservation") !== -1;
            }
        }
    });

    var layerList9 = new GeoExt.tree.LayerContainer({
        layerStore: mapPanel.layers,
        text: 'Data Layers',
        leaf: false,
        expanded: false,
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
            children: [layerList2, layerList7, layerList6, layerList8,
                layerList3, layerList4, layerList5, layerList9, layerList10

            ]
        },
        title: "Setup",
        rootVisible: false
    });

    var process_tab = new Ext.Panel({
        title: 'Model',
        //html: "some content",
        items: [modelpaneltop, habitat_panel, modelpanelmid, modelpanelbot],
        cls: 'help',
        autoScroll: true
    });

    var mapsmsg_panel = new Ext.Panel({
        width: 296,
        items: [{
            // width: 2,
            xtype: 'container',
            autoEl: 'div',
            cls: 'mycontent',
            html: "<p>Click links for documentation. More text to see wrapping.</p>"
        }],
        // cls: 'help',
        autoScroll: true
    });

    var maps_tab = new Ext.Panel({
        title: 'Maps',
        //html: "some content",
        items: [mapsmsg_panel, formPanelhuc12maps],
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

    var login_html = ["<h2>Registration</h2>",
        "<p>If you have not registered please visit the",
        "<a href='",
        SERVER_URI + 'wps/register',
        "' target='_blank'> registration</a> page.</p>"
    ];

    var login_panel = new Ext.Panel({
        title: 'Login',
        items: [login_form, {
                xtype: 'container',
                autoEl: 'div',
                cls: 'mycontent',
                html: login_html.join('')
            },
            passwdresetPanel
            // {
            //     xtype: 'button',
            //     text: 'MyPage'
            // }
        ],
        // cls: 'help',
        autoScroll: true
    });

    var user_panel = new Ext.Panel({
        title: 'User',
        id: 'userpanel',
        items: [{
                xtype: 'spacer',
                height: 60,
                cls: 'mycontent',
                id: 'login-msg'
            },
            passwdchngPanel
        ]
    });


    var accordion = new Ext.Panel({
        title: 'AOI',
        layout: 'accordion',
        defaults: {
            // applied to each contained panel
            //bodyStyle : 'padding:15px'
        },
        // area_tab2, area_tab,
        items: [process_tab]
    });

    function handleActivate(tab) {
        console.log(tab.title + ' was activated.');
        $.ajax({
            url: SERVER_URI + "wps/loginchk",
            data: {},
            dataType: "json",
            success: function(data) {
                if (data.loggedin) {
                    console.log(data.username);
                    open_user_tab(data.firstname, data.username);
                } else {
                    console.log('not logged in');
                }
            }
        });
    }

    var login_accordion = new Ext.Panel({
        title: 'User',
        layout: 'accordion',
        defaults: {
            // applied to each contained panel
            //bodyStyle : 'padding:15px'
        },
        items: [login_panel, user_panel],
        listeners: {
            activate: handleActivate
        }
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
        activeTab: 2,
        // accordion
        items: [tree, maps_tab, process_tab, print_tab, login_accordion],
        deferredRender: false
    });

    // left.getItem('login_accordion').on('activate', function() {
    //     console.log('tabe opened');
    // });

    // });

    new Ext.Viewport({
        layout: "border",
        items: [mapPanel, left],
        defaults: {
            split: true
        }
    });

    // var panelid1 = Ext.get(area_tab.getEl().dom.children[0]).id;
    // var panelid2 = Ext.get(area_tab2.getEl().dom.children[0]).id;
    // var panelid3 = Ext.get(process_tab.getEl().dom.children[0]).id;
    // Ext.get(panelid1).applyStyles("background-image: url(/images/dark-green-hd.gif)");
    // Ext.get(panelid1).applyStyles("color: white");
    // Ext.get(panelid2).applyStyles("background-image: url(/images/dark-red-hd.gif)");
    // Ext.get(panelid2).applyStyles("color: white");
    // Ext.get(panelid3).applyStyles("background-image: url(/images/dark-blue-hd.gif)");
    // Ext.get(panelid3).applyStyles("color: white");

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

