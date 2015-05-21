var map;

Ext.onReady(function() {
    "use strict";


    var HOST_NAME = "http://tecumseh.zo.ncsu.edu/";
    var SERVER_URI = "http://tecumseh.zo.ncsu.edu/";

    var resource = SERVER_URI + "wps/0";


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
    var gphy = new OpenLayers.Layer.Google("Google Physical Map", {
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

    // var hillshade = new OpenLayers.Layer.TMS("NC Hillshade",
    //     SERVER_URI + "tilecache/", {
    //         layername: "hillshadenc",
    //         type: "png",
    //         tileOrigin: new OpenLayers.LonLat(-9462455, 3963396)
    //     }
    // );


    ////////////////////////////////////////////////////////////
    /// TMS line layers overlays
    /////////////////////////////////////////////////////////


    // var nchuc2 = new OpenLayers.Layer.TMS("NC HUC 2",
    //     SERVER_URI + "tilecache/", {
    //         layername: "huc2nc",
    //         type: "png",
    //         isBaseLayer: false,
    //         visibility: false,
    //         tileOrigin: new OpenLayers.LonLat(-9462455, 3963396)
    //     }
    // );
    // var nchuc4 = new OpenLayers.Layer.TMS("NC HUC 4",
    //     SERVER_URI + "tilecache/", {
    //         layername: "huc4nc",
    //         type: "png",
    //         isBaseLayer: false,
    //         visibility: false,
    //         tileOrigin: new OpenLayers.LonLat(-9462455, 3963396)
    //     }
    // );
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

    var styleMaphuc12s = new OpenLayers.StyleMap({
        strokeColor: "red",
        strokeWidth: 2,
        strokeOpacity: 1,
        fillOpacity: 0
    });
    var styleMapselection = new OpenLayers.StyleMap({
        strokeColor: "black",
        strokeWidth: 4,
        strokeOpacity: 1,
        fillOpacity: 0
    });

    var resultsStyleMap = new OpenLayers.StyleMap({});
    var resultsStyleMap_model = new OpenLayers.StyleMap({});
    // ['f5f57a', 'e8b655', 'd68036', 'c3491a', 'a80000']
    var symbolsLookup = {
        0: {
            strokeColor: "#CCCCCC",
            fillColor: "#ffffff",
            strokeWidth: 1,
            strokeOpacity: 1,
            fillOpacity: 1
        },
        1: {
            strokeColor: "#CCCCCC",
            fillColor: "#ffffff",
            strokeWidth: 1,
            strokeOpacity: 1,
            fillOpacity: 1
        },
        2: {
            strokeColor: "#CCCCCC",
            fillColor: "#ffffff",
            strokeWidth: 1,
            strokeOpacity: 1,
            fillOpacity: 1
        },
        3: {
            strokeColor: "#CCCCCC",
            fillColor: "#ffffff",
            strokeWidth: 1,
            strokeOpacity: 1,
            fillOpacity: 1
        },
        4: {
            strokeColor: "#CCCCCC",
            fillColor: "#ffffff",
            strokeWidth: 1,
            strokeOpacity: 1,
            fillOpacity: 1
        },
        5: {
            strokeColor: "#CCCCCC",
            fillColor: "#ffffff",
            strokeWidth: 1,
            strokeOpacity: 1,
            fillOpacity: 1
        }
    };

    var symbolsLookup_model = {
        0: {
            strokeColor: "#CCCCCC",
            fillColor: "#ffffff",
            strokeWidth: 1,
            strokeOpacity: 1,
            fillOpacity: 1
        },
        1: {
            strokeColor: "#CCCCCC",
            fillColor: "#FFFF7F",
            strokeWidth: 1,
            strokeOpacity: 1,
            fillOpacity: 1
        },
        2: {
            strokeColor: "#CCCCCC",
            fillColor: "#C4F75D",
            strokeWidth: 1,
            strokeOpacity: 1,
            fillOpacity: 1
        },
        3: {
            strokeColor: "#CCCCCC",
            fillColor: "#86ED3D",
            strokeWidth: 1,
            strokeOpacity: 1,
            fillOpacity: 1
        },
        4: {
            strokeColor: "#CCCCCC",
            fillColor: "#44E214",
            strokeWidth: 1,
            strokeOpacity: 1,
            fillOpacity: 1
        },
        5: {
            strokeColor: "#CCCCCC",
            fillColor: "#3DCC41",
            strokeWidth: 1,
            strokeOpacity: 1,
            fillOpacity: 1
        },
        6: {
            strokeColor: "#CCCCCC",
            fillColor: "#3AB272",
            strokeWidth: 1,
            strokeOpacity: 1,
            fillOpacity: 1
        },
        7: {
            strokeColor: "#CCCCCC",
            fillColor: "#33A587",
            strokeWidth: 1,
            strokeOpacity: 1,
            fillOpacity: 1
        },
        8: {
            strokeColor: "#CCCCCC",
            fillColor: "#26999B",
            strokeWidth: 1,
            strokeOpacity: 1,
            fillOpacity: 1
        },
        9: {
            strokeColor: "#CCCCCC",
            fillColor: "#1A8CA8",
            strokeWidth: 1,
            strokeOpacity: 1,
            fillOpacity: 1
        },
        10: {
            strokeColor: "#CCCCCC",
            fillColor: "#2073A0",
            strokeWidth: 1,
            strokeOpacity: 1,
            fillOpacity: 1
        },
        11: {
            strokeColor: "#CCCCCC",
            fillColor: "#215D99",
            strokeWidth: 1,
            strokeOpacity: 1,
            fillOpacity: 1
        },
        12: {
            strokeColor: "#CCCCCC",
            fillColor: "#1F4991",
            strokeWidth: 1,
            strokeOpacity: 1,
            fillOpacity: 1
        },
        13: {
            strokeColor: "#CCCCCC",
            fillColor: "#1C3689",
            strokeWidth: 1,
            strokeOpacity: 1,
            fillOpacity: 1
        },
        14: {
            strokeColor: "#CCCCCC",
            fillColor: "#15227F",
            strokeWidth: 1,
            strokeOpacity: 1,
            fillOpacity: 1
        },
        15: {
            strokeColor: "#CCCCCC",
            fillColor: "#0D1077",
            strokeWidth: 1,
            strokeOpacity: 1,
            fillOpacity: 1
        }
    };



    symbolsLookup["0"].fillColor = "#ffffff";

    resultsStyleMap.addUniqueValueRules('default', 'threat', symbolsLookup);
    resultsStyleMap_model.addUniqueValueRules('default', 'threat', symbolsLookup_model);

    var nonelayer = new OpenLayers.Layer.Vector("None", {
        displayInLayerSwitcher: false,
        isBaseLayer: false,
        projection: proj_4326
    });



    // old layer name Results
    var composite = new OpenLayers.Layer.Vector("Composite Threats", {
        displayInLayerSwitcher: false,
        isBaseLayer: false,
        projection: proj_4326,
        styleMap: resultsStyleMap_model,
        renderers: ["SVG"]
    });



    var individual = new OpenLayers.Layer.Vector("Individual Threats", {
        displayInLayerSwitcher: false,
        isBaseLayer: false,
        projection: proj_4326,
        styleMap: resultsStyleMap,
        renderers: ["SVG"]
    });

    var highlightLayer = new OpenLayers.Layer.Vector("AOI Selection", {
        displayInLayerSwitcher: false,
        isBaseLayer: false,
        projection: proj_4326,
        styleMap: styleMapselection,
        visibility: false
    });

    var results = new OpenLayers.Layer.Vector("AOI huc12s", {
        displayInLayerSwitcher: false,
        isBaseLayer: false,
        projection: proj_4326,
        styleMap: styleMaphuc12s,
        renderers: ["SVG"],
        visibility: false
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
        individual.addFeatures(geojson_format.read(data));
        individual.setVisibility(false);
        composite.addFeatures(geojson_format.read(data));
        composite.setVisibility(false);
    });

    // $.ajax({
    //     type: "GET",
    //     url: SERVER_URI + 'wps/individual',
    //     dataType: "json"
    // }).done(function(data) {
    //     var geojson_format = new OpenLayers.Format.GeoJSON({
    //         'internalProjection': new OpenLayers.Projection("EPSG:900913"),
    //         'externalProjection': new OpenLayers.Projection("EPSG:4326")
    //     });
    //     results.addFeatures(geojson_format.read(data));
    //     results.setVisibility(true);
    // });

    map.addLayers([individual, composite, results, nonelayer, highlightLayer, ncbounds, ecoregions, counties, ncbcr, nchuc6, nchuc12,
        nchuc10, nchuc8, nchuc2_lbl, nchuc4_lbl, nchuc6_lbl,
        nchuc12_lbl, nchuc10_lbl, nchuc8_lbl, counties_lbl,
        gphy, osm, counties_base
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
    var lonlat;



    function add_point(e) {
        var mode = formPanel2.getComponent('rg1').getValue().inputValue;
        if (mode.indexOf("custom") !== -1) {
            lonlat = map.getLonLatFromViewPortPx(e.xy);
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
            lonlat = map.getLonLatFromViewPortPx(e.xy);

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
                    console.log(data);
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
        resource = SERVER_URI + "wps/0";
        new_selection();
        map.zoomToExtent(map_extent);
        var vis_lyrs = [counties, ncbcr, nchuc6, nchuc12,
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

    var onExecuted = function(aoi) {
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
            value: "North Carolina Wildlife Habitat Threats Analysis Tool",
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
        // ["NC HUC 2", 'huc1'],
        // ["NC HUC 4", 'huc2'],
        ["NC River Basins", 'huc3'],
        ["NC River Subbasins", 'huc4'],
        ["NC Watersheds", 'huc5'],
        // ["NC HUC 12", 'huc6'],
        ["NC Counties", 'cnt7'],
        ["NC BCR", 'bcr8']
    ];
    comboStorelayers.loadData(comboData);

    // called creating new aoi
    var form2_chng = function() {
        remove_action();
        var selected_predef = formPanel2.getForm().getValues().predef_selection;
        var sel_type = formPanel2.getForm().getValues().aoi_type;
        highlightLayer.setVisibility(true);
        if (sel_type === 'predefined') {
            switch (selected_predef) {
                // case 'NC HUC 2':
                //     // query_ctl.layers = [nchuc2_qry];
                //     col_name = "huc2";
                //     nchuc2.setVisibility(true);
                //     nchuc2_lbl.setVisibility(true);
                //     break;
                // case 'NC HUC 4':
                //     // query_ctl.layers = [nchuc4_qry];
                //     col_name = "huc4";
                //     nchuc4.setVisibility(true);
                //     nchuc4_lbl.setVisibility(true);
                //     break;
                case 'NC River Basins':
                    // query_ctl.layers = [nchuc6_qry];
                    col_name = "huc6";
                    nchuc6.setVisibility(true);
                    nchuc6_lbl.setVisibility(true);
                    break;
                case 'NC River Subbasins':
                    // query_ctl.layers = [nchuc8_qry];
                    col_name = "huc8";
                    nchuc8.setVisibility(true);
                    nchuc8_lbl.setVisibility(true);
                    break;
                case 'NC Watersheds':
                    // query_ctl.layers = [nchuc10_qry];
                    col_name = "huc10";
                    nchuc10.setVisibility(true);
                    nchuc10_lbl.setVisibility(true);
                    break;
                    // case 'NC HUC 12':
                    //     // query_ctl.layers = [nchuc12_qry];
                    //     col_name = "huc_12";
                    //     nchuc12.setVisibility(true);
                    //     nchuc12_lbl.setVisibility(true);
                    //     break;
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
    var aoi_to_file;

    //function to submit defined area
    var save_action = function() {
        var selected_predef = formPanel2.getForm().getValues().predef_selection;
        var sel_type = formPanel2.getForm().getValues().aoi_type;
        var gml = '';
        var aoi_list = [];
        var selected_predef_new = 'na';
        var point_buffer = {};
        console.log(pts.length);



        if (sel_type !== 'predefined') {
            if (pts.length === 1) {
                sel_type = 'point_buffer';
                var lonlatdegrees = lonlat.transform(proj_900913, proj_4326);
                // console.log(lonlatdegrees);
                point_buffer = {
                    lon: lonlatdegrees.lon,
                    lat: lonlatdegrees.lat
                };
                console.log(lonlat);
                lonlat = {};
            }
            var gml_writer = new OpenLayers.Format.GML.v3({
                featureType: 'MultiPolygon',
                featureNS: 'http://jimserver.net/',
                geometryName: 'aoi',
                'internalProjection': new OpenLayers.Projection("EPSG:900913"),
                'externalProjection': new OpenLayers.Projection("EPSG:4326")
            });

            gml = gml_writer.write(highlightLayer.features);
            // console.log(gml);

        } else {
            gml = '';
            console.log(selected_predef);
            switch (selected_predef) {
                case 'NC River Basins':
                    // col_name = "huc6";
                    selected_predef_new = 'HUC';
                    break;
                case 'NC River Subbasins':
                    // col_name = "huc8";
                    selected_predef_new = 'HUC';
                    break;
                case 'NC Watersheds':
                    // col_name = "huc10";
                    selected_predef_new = 'HUC';
                    break;
                case 'NC Counties':
                    // col_name = "co_num";
                    selected_predef_new = 'Counties';
                    break;
                case 'NC BCR':
                    // col_name = "bcr";
                    selected_predef_new = 'BCR';
                    break;
            }
            console.log(selected_predef_new);
            var selected_features_drawn =
                map.getLayersByName("AOI Selection")[0].features;
            for (var j = 0; j < selected_features_drawn.length; j++) {
                aoi_list.push(
                    selected_features_drawn[j].data.name);
            }
            console.log(aoi_list);
        }

        var post_data = {
            gml: gml,
            aoi_list: aoi_list.join(":"),
            predef_type: selected_predef_new,
            sel_type: sel_type,
            point_buffer: point_buffer
        };
        // console.log(post_data);

        $.ajax({
            type: "POST",
            url: SERVER_URI + "wps",
            data: post_data,
            dataType: "json"
        }).done(function(data, textStatus, jqXHR) {
            resource = jqXHR.getResponseHeader('Location');
            aoi_to_file = getResource(resource);
            console.log(resource);
            Ext.getCmp("resource_btn").setHandler(aoi_to_file);
            onExecuted(data.geojson);
            var extent = new OpenLayers.Bounds(
                data.extent).transform(proj_4326, proj_900913);
            map.zoomToExtent(extent);
        });
    };
    var threat_calcs_report;
    var threat_calcs_report_indiv;
    var indiv_layer;
    // new aoi panel
    var formPanel2 = new Ext.form.FormPanel({
        title: "AOI creation",
        width: 296,
        height: 400,
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
                    boxLabel: 'custom<br>Click on map to create analysis point' +
                        ' or polygon, then Submit:',
                    name: 'aoi_type',
                    inputValue: 'custom',
                    id: 'custom_radio_sel'
                }],
                listeners: {
                    change: form2_chng
                }
            }, {
                xtype: 'container',
                layout: {
                    type: 'vbox',
                    // padding: '10',
                    align: 'center'
                },
                // width: 200,
                height: 200,
                defaults: {
                    margins: '0 0 10 0'
                },
                items: [{
                        xtype: 'button',
                        width: 80,
                        text: 'Submit',
                        handler: save_action
                    }, {
                        // width: 2,
                        xtype: 'container',
                        autoEl: 'div',
                        cls: 'mycontent',
                        html: "<p>View Report of AOI:<br><br></p>"
                    },

                    {
                        xtype: 'button',
                        text: 'Report',
                        width: 80,
                        handler: function() {
                            var is_composite = composite.getVisibility();
                            var is_indiv = individual.getVisibility();
                            if (is_composite) {
                                threat_calcs_map();
                                threat_calcs_report();
                            } else if (is_indiv) {
                                // console.log(indiv_layer);
                                threat_calcs_report_indiv(indiv_layer);

                            } else {
                                console.log("no map");
                            }
                        },
                    }, {
                        xtype: 'button',
                        width: 80,
                        text: 'Reset',
                        handler: remove_action
                    }, {
                        xtype: 'button',
                        width: 80,
                        text: 'Save',
                        id: "resource_btn",
                        handler: aoi_to_file
                    }
                ]

            }]
            // buttons: [{
            //     text: "report",
            //     // handler: aoi_to_file,
            //     //itemId: "resource_btn",
            //     // id: "resource_btn"
            // },{
            //     text: "Save",
            //     handler: aoi_to_file,
            //     //itemId: "resource_btn",
            //     id: "resource_btn"
            // }, {
            //     text: "Reset",
            //     handler: remove_action
            // }, {
            //     text: "Submit",
            //     handler: save_action
            // }]
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
        ["none", 'x'],
        ["Conventional", 'a'],
        ["Conv. + Marginal Ag.", 'b'],
        ["Conv. + M.Ag.&Forest", 'c'],
        ["Marginal Agriculture", 'd'],
        ["Marg. Ag. & Forests", 'e'],
    ];
    comboStorescenarios.loadData(comboData3);

    var comboStoreweights = new Ext.data.ArrayStore({
        fields: ['layerName', 'layerId']
    });
    var comboData4 = [
        ["do not include", "notinclude"],
        ["INCLUDE: no limit", '0'],
        ["INCLUDE: >1 limit", '1'],
        ["INCLUDE: >2 limit", '2'],
        ["INCLUDE: >3 limit", '3'],
        ["INCLUDE: >4 limit", '4'],
        ["INCLUDE: >5 limit", '5']
        //        ["INCLUDE: 6.00 weight", '6.00']
    ];
    comboStoreweights.loadData(comboData4);



    var threat_calcs_map = function() {
        var form_vals_hab = habitat_panel.getForm().getValues();
        var form_vals_year = modelpaneltop.getForm().getValues();
        var form_vals_misc = modelpanelmid.getForm().getValues();
        console.log(form_vals_misc);

        $.ajax({
            url: SERVER_URI + 'wps/map',
            type: 'GET',
            data: {
                impairbiota: form_vals_misc.impairbiota,
                impairmetal: form_vals_misc.impairmetal,
                scenario: form_vals_hab.scenario,
                frst: form_vals_hab.frst,
                ftwt: form_vals_hab.ftwt,
                hbwt: form_vals_hab.hbwt,
                open: form_vals_hab.open,
                shrb: form_vals_hab.shrb,
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
                urbangrth: form_vals_misc.urbangrth,
                slr_up: form_vals_misc.slr_up,
                slr_lc: form_vals_misc.slr_lc,
                wind: form_vals_misc.wind,
                mode: 'model'
            },
            dataType: 'json'
        }).done(function(data) {
            console.log(data.col_hdrs);
            console.log(data.col_hdrs.length);
            var results_col = data.col_hdrs.length;
            var thrt;

            for (var key in data.res_arr) {
                thrt = data.res_arr[key][results_col];
                console.log(thrt);
                // thrt = Math.ceil(thrt / 2) ;
                // if (thrt_raw <= 1.66) {
                //     thrt = 0;
                // } else if (thrt_raw <= 3.22) {
                //     thrt = 1;
                // } else if (thrt_raw <= 4.99) {
                //     thrt = 2;
                // } else if (thrt_raw <= 6.66) {
                //     thrt = 3;
                // } else if (thrt_raw <= 8.32) {
                //     thrt = 4;
                // } else {
                //     thrt = 5;
                // }

                if (!symbolsLookup_model.hasOwnProperty(thrt)) {
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
            composite.setVisibility(true);
            map.getLayersByName("Composite Threats")[0].redraw();

            var composite_colors = ["ffffff", "ffffbe", "ffdb59", "e69b00", "cc3d00", "730000"];
            var composite_labels = ['0.00 - 1.66', '1.67 - 3.32', '3.33 - 4.99', '5.00 - 6.66', '6.67 - 8.32', '8.33 - 10.00'];

            lgd_color.style("fill", function(d, i) {
                return "#" + composite_colors[i];
            });

            lgd_text.text(function(d, i) {
                return composite_labels[i];
            });

            lgd_title.text("Threat Rank");

            if (show_legend_flag) {
                float_win.show();
                show_legend_flag = false;
            }
            $('#lgnddiv').css('display', 'none');
            $('#lgdimg').css('display', 'block');

            // onExecuted(data.results);
            // "<svg id='lgnddiv'></svg><img id='lgdimg' style='display: none;' src='images/threat_legend.png'>"
        });
    };

    threat_calcs_report_indiv = function(lyrdesc) {
        console.log(lyrdesc);
        var frmvals = lyrdesc.split(":");
        var form_vals = {};
        console.log(frmvals.length);
        var habthrts = ['frst', 'ftwt', "hbwt", "open", "shrb"];
        var yearthrts = ['urban', 'fire', 'trans', 'slr_up', 'slr_lc'];
        if (habthrts.indexOf(frmvals[0]) !== -1) {
            console.log(frmvals[0]);
            console.log(frmvals[1]);
            console.log(frmvals[2]);
            form_vals = {
                scenario: frmvals[2],
                year: "20" + frmvals[1],
            };
            form_vals[frmvals[0]] = '1.0';
        } else if (yearthrts.indexOf(frmvals[0]) !== -1) {
            console.log(frmvals[0]);
            console.log(frmvals[1]);
            form_vals = {
                year: "20" + frmvals[1],
            };
            if (frmvals[0] === 'urban') {
                form_vals.urbangrth = "1.0";
            } else if (frmvals[0] === 'fire') {
                form_vals.firesup = "1.0";
            } else if (frmvals[0] === 'trans') {
                form_vals.hiway = "1.0";
            } else if (frmvals[0] === 'slr_up') {
                form_vals.slr_up = "1.0";
            } else if (frmvals[0] === 'slr_lc') {
                form_vals.slr_lc = "1.0";
            }
        } else if (frmvals.length === 2) {
            if (frmvals[1] === 'manu') {
                form_vals.manure = "1.0";
            } else if (frmvals[1] === 'fert') {
                form_vals.nitrofrt = "1.0";
            } else if (frmvals[1] === 'td_s_t') {
                form_vals.totsulf = "1.0";
            } else if (frmvals[1] === 'td_n_t') {
                form_vals.totnitro = "1.0";
            } else if (frmvals[1] === 'NID') {
                form_vals.ndams = "1.0";
            } else if (frmvals[1] === 'bioimplen') {
                form_vals.impairbiota = "1.0";
            } else if (frmvals[1] === 'metimplen') {
                form_vals.impairmetal = "1.0";
            }

        } else {
            if (frmvals[0] === 'frsthlth') {
                form_vals.insectdisease = "1.0";
            } else if (frmvals[0] === 'energydev') {
                form_vals.triassic = "1.0";
            } else if (frmvals[0] === 'wind') {
                form_vals.wind = "1.0";
            }
        }
        form_vals.mode = 'single';


        if (!$.isEmptyObject(form_vals)) {
            var qry_str = $.param(form_vals);
            // var url = SERVER_URI + 'wps/report?' + qry_str;
            var url = resource + '/report?' + qry_str;
            console.log(url);
            window.open(url);
        }
    };

    threat_calcs_report = function() {
        var form_vals_hab = habitat_panel.getForm().getValues();
        var form_vals_year = modelpaneltop.getForm().getValues();
        var form_vals_misc = modelpanelmid.getForm().getValues();
        //        var form_vals_water = modelpanelbot.getForm().getValues();
        var form_vals = {
            impairbiota: form_vals_misc.impairbiota,
            impairmetal: form_vals_misc.impairmetal,
            scenario: form_vals_hab.scenario,
            frst: form_vals_hab.frst,
            ftwt: form_vals_hab.ftwt,
            hbwt: form_vals_hab.hbwt,
            open: form_vals_hab.open,
            shrb: form_vals_hab.shrb,
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
            urbangrth: form_vals_misc.urbangrth,
            slr_up: form_vals_misc.slr_up,
            slr_lc: form_vals_misc.slr_lc,
            wind: form_vals_misc.wind,
            mode: 'model'
        };

        var includes_list = {
            impairbiota: form_vals_misc.impairbiota,
            impairmetal: form_vals_misc.impairmetal,
            // scenario: form_vals_hab.scenario,
            frst: form_vals_hab.frst,
            ftwt: form_vals_hab.ftwt,
            hbwt: form_vals_hab.hbwt,
            open: form_vals_hab.open,
            shrb: form_vals_hab.shrb,
            // year: form_vals_year.year,
            firesup: form_vals_misc.firesup,
            hiway: form_vals_misc.hiway,
            insectdisease: form_vals_misc.insectdisease,
            manure: form_vals_misc.manure,
            ndams: form_vals_misc.ndams,
            nitrofrt: form_vals_misc.nitrofrt,
            totnitro: form_vals_misc.totnitro,
            totsulf: form_vals_misc.totsulf,
            triassic: form_vals_misc.triassic,
            urbangrth: form_vals_misc.urbangrth,
            slr_up: form_vals_misc.slr_up,
            slr_lc: form_vals_misc.slr_lc,
            wind: form_vals_misc.wind
        };

        // do not submit form if not factors included
        var submit_form = false;
        for (var x in includes_list) {
            console.log(includes_list[x]);
            if (includes_list[x] !== 'notinclude') {
                submit_form = true;
            }
        }
        if (submit_form) {
            var qry_str = $.param(form_vals);
            // var url = SERVER_URI + 'wps/report?' + qry_str;
            var url = resource + '/report?' + qry_str;
            console.log(url);
            window.open(url);
        } else {
            alert("no factors included");
        }

    };

    // var threat_calcs_ssheet = function() {
    //     var form_vals_hab = habitat_panel.getForm().getValues();
    //     var form_vals_year = modelpaneltop.getForm().getValues();
    //     var form_vals_misc = modelpanelmid.getForm().getValues();
    //     //        var form_vals_water = modelpanelbot.getForm().getValues();
    //     var form_vals = {
    //         impairall: form_vals_misc.impairall,
    //         scenario: form_vals_hab.scenario,
    //         habitat: form_vals_hab.habitat,
    //         habitat_weight: form_vals_hab.habitat_weight,
    //         year: form_vals_year.year,
    //         firesup: form_vals_misc.firesup,
    //         hiway: form_vals_misc.hiway,
    //         insectdisease: form_vals_misc.insectdisease,
    //         manure: form_vals_misc.manure,
    //         ndams: form_vals_misc.ndams,
    //         nitrofrt: form_vals_misc.nitrofrt,
    //         totnitro: form_vals_misc.totnitro,
    //         totsulf: form_vals_misc.totsulf,
    //         triassic: form_vals_misc.triassic,
    //         urbangrth: form_vals_misc.urbangrth,
    //         slr_up: form_vals_misc.slr_up,
    //         slr_lc: form_vals_misc.slr_lc,
    //         wind: form_vals_misc.wind
    //     };
    //     var qry_str = $.param(form_vals);
    //     $.ajax({
    //         url: SERVER_URI + 'wps/ssheet?' + qry_str,
    //         type: 'GET'
    //     }).done(function(data, textStatus, jqXHR) {
    //         if (jqXHR.status === 201) {
    //             var csvresource = jqXHR.getResponseHeader('Location');
    //             $('#dnlds').attr('action', csvresource);
    //             $('#dnlds').submit();
    //         } else {
    //             console.log("error" + jqXHR.status);
    //         }
    //     });
    // };

    var show_legend_flag = true;
    // console.log(habitats);

    // tree_huc12maps.getRootNode().expand();

    var checkGrouphabitat = {
        xtype: 'radiogroup',
        fieldLabel: 'Habitat Type',
        columns: 1,
        items: [{
            boxLabel: 'upland forest',
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
            boxLabel: 'wet herbaceous',
            name: 'habitat',
            inputValue: 'hbwt'
        }, {
            boxLabel: 'scrub-shrub',
            name: 'habitat',
            inputValue: 'shrb'
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
            // width: 2,
            xtype: 'container',
            autoEl: 'div',
            cls: 'mycontent',
            html: "<p><b>Projected habitat loss since 2000</b></p>"
        }, {
            xtype: "combo",
            // itemId: "cmb2",
            store: comboStoreweights,
            name: 'misc',
            fieldLabel: "Upland Forest",
            value: "notinclude",
            typeAhead: true,
            mode: "local",
            triggerAction: "all",
            valueField: 'layerId',
            displayField: 'layerName',
            submitValue: true,
            hiddenName: 'frst',
            listeners: {
                //'select': form2_chng
            }
        }, {
            xtype: "combo",
            // itemId: "cmb2",
            store: comboStoreweights,
            name: 'misc',
            fieldLabel: "Wet Forest",
            value: "notinclude",
            typeAhead: true,
            mode: "local",
            triggerAction: "all",
            valueField: 'layerId',
            displayField: 'layerName',
            submitValue: true,
            hiddenName: 'ftwt',
            listeners: {
                //'select': form2_chng
            }
        }, {
            xtype: "combo",
            // itemId: "cmb2",
            store: comboStoreweights,
            name: 'misc',
            fieldLabel: "Open",
            value: "notinclude",
            typeAhead: true,
            mode: "local",
            triggerAction: "all",
            valueField: 'layerId',
            displayField: 'layerName',
            submitValue: true,
            hiddenName: 'open',
            listeners: {
                //'select': form2_chng
            }
        }, {
            xtype: "combo",
            // itemId: "cmb2",
            store: comboStoreweights,
            name: 'misc',
            fieldLabel: "Wet Herbaceous",
            value: "notinclude",
            typeAhead: true,
            mode: "local",
            triggerAction: "all",
            valueField: 'layerId',
            displayField: 'layerName',
            submitValue: true,
            hiddenName: 'hbwt',
            listeners: {
                //'select': form2_chng
            }
        }, {
            xtype: "combo",
            // itemId: "cmb2",
            store: comboStoreweights,
            name: 'misc',
            fieldLabel: "Scrub-shrub",
            value: "notinclude",
            typeAhead: true,
            mode: "local",
            triggerAction: "all",
            valueField: 'layerId',
            displayField: 'layerName',
            submitValue: true,
            hiddenName: 'shrb',
            listeners: {
                //'select': form2_chng
            }
        }, {
            // width: 2,
            xtype: 'container',
            autoEl: 'div',
            cls: 'mycontent',
            html: "<p><b>Set bioenergy scenario (optional)</b></p>"
        }, {
            xtype: "combo",
            // itemId: "cmb2",
            store: comboStorescenarios,
            name: 'misc',
            fieldLabel: "Bioenergy Scenario",
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
        }]
    });

    var modelmsg_panel = new Ext.Panel({
        width: 280,
        items: [{
            // width: 2,
            xtype: 'container',
            autoEl: 'div',
            cls: 'mycontent',
            html: "<h2>Analyze Threats</h2><p>Set a target year. Include threat data for analysis. Set threat rank lower limit. Click submit button to view resultant maps and report (scroll down).</p>"
        }],
        // cls: 'help',
        autoScroll: true
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
        }]
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
            fieldLabel: "Trans. / Div. Hwys",
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
            fieldLabel: "SLR / Undevelop. Upland Change",
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
            fieldLabel: "SLR / Terrest. Landcover Chg",
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
            fieldLabel: "Energy Develop. / Triassic Basin",
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
            fieldLabel: "Energy Develop. / Wind Power",
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
            fieldLabel: "Nutri. Loading / Manure Appl.",
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
            fieldLabel: "Nutri. Loading / Syn. Nitrogen",
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
            fieldLabel: "Atmosph. Dep. / Total Nitrogen",
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
            fieldLabel: "Atmosph. Dep. / Total Sulfur",
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
            fieldLabel: "Forest Hlth / Insect & Dis. Risk",
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

        }, {
            xtype: "combo",
            // itemId: "cmb2",
            store: comboStoreweights,
            name: 'miscdata',
            fieldLabel: "Impaired Waters - Biota",
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
            fieldLabel: "Impaired Waters - Metal",
            value: "notinclude",
            typeAhead: true,
            mode: "local",
            triggerAction: "all",
            valueField: 'layerId',
            displayField: 'layerName',
            submitValue: true,
            hiddenName: 'impairmetal'

        }],

        buttons: [
            // {
            //     text: "Spreadsheet",
            //     handler: threat_calcs_ssheet
            // },
            {
                text: "Report",
                handler: threat_calcs_report
            }, {
                text: "Show map",
                handler: threat_calcs_map
            }
        ]

    });


    var legend_titles1 = {
        frst: 'Forest Habitat (ha)',
        ftwt: 'Wet Forest Habitat (ha)',
        hbwt: 'Wet Herbaceous? Habitat (ha)',
        open: 'Open Habitat (ha)',
        shrb: 'Scrub/Shrub Habitat (ha)',
        urban: 'Urban Land Cover (ha)',
        fire: 'Mean Urban Density? w/in 5 mile radius',
        trans: 'Mean Length/Area of? Major Highways (m/ha)',
        "nutrient:manu": "Manure Application? (kg/ha/yr)",
        "nutrient:fert": "Syn. Nitrogen Fertilizer? Application (kg/ha/yr)",
        "nutrient:td_n_t": "Total Nitrogen Deposition? (kg/ha/yr)",
        "nutrient:td_s_t": "Total Sulfur Deposition? (kg/ha/yr)",
        frsthlth: "Forest Insect/Disease Risk? (ha)",
        energydev: "Triassic basin (ha)",
        "water:bioimplen": "Biota Impairments? (km*stream density)",
        "water:metimplen": "Metal Impariments? (km*stream density)",
        "water:NID": "Number of Dams (n)",
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
            composite.setVisibility(false);
            individual.setVisibility(true);
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
            symbolsLookup["0"].fillColor = "#" + data.colors[0];
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

            $('#lgnddiv').css('display', 'block');
            $('#lgdimg').css('display', 'none');



        });

    };



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

    //////////////////////////////////////////////////
    // toolbar
    /////////////////////////////////////////////////////

    var ctrl, toolbarItems = [],
        action, actions = {};
    ctrl = new OpenLayers.Control.NavigationHistory();
    map.addControl(ctrl);

    Ext.QuickTips.init();

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
    toolbarItems.push("-");


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



    /////////////////////////////////////////////////
    // legend config
    //////////////////////////////////////////////////////
    var legend_panel = new Ext.Panel({
        // title: 'legend panel',
        cls: 'pages',
        autoScroll: true,
        id: "legendpnlid",
        html: "<svg id='lgnddiv'></svg><img id='lgdimg' style='display: none;' src='images/threat_legend.png'>"

    });
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

    //////////////////////////////////////////////////////////////////////
    // setup  tab
    /////////////////////////////////////////////////////////////////////

    var mapPanel = new GeoExt.MapPanel({
        region: "center",
        map: map,
        //        title: 'NC Map',
        extent: map_extent,
        tbar: toolbarItems,
        id: 'ncthreatsMapPanel'
    });



    // var layerList = new GeoExt.tree.LayerContainer({
    //     layerStore: mapPanel.layers,
    //     text: 'HUC 2',
    //     leaf: false,
    //     expanded: false,
    //     loader: {
    //         filter: function(record) {
    //             return record.get("layer").name.indexOf("NC HUC 2") !== -1;
    //         }
    //     }
    // });
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
                var test1 = record.get("layer").CLASS_NAME ===
                    'OpenLayers.Layer.Vector';
                var test2 = record.get("layer").name.indexOf("AOI") === -1;
                console.log(test1 && test2);
                return test1 && test2;
                // return record.get("layer").CLASS_NAME ===
                //     'OpenLayers.Layer.Vector';
            },
            baseAttrs: {
                checkedGroup: "foobar"
            }
        }
    });

    var layerList11 = new GeoExt.tree.LayerContainer({
        layerStore: mapPanel.layers,
        text: 'AOI Layers',
        leaf: false,
        expanded: false,
        loader: {
            filter: function(record) {
                var test1 = record.get("layer").CLASS_NAME ===
                    'OpenLayers.Layer.Vector';
                var test2 = record.get("layer").name.indexOf("AOI") !== -1;
                console.log(test1 && test2);
                return test1 && test2;
                // return record.get("layer").CLASS_NAME ===
                //     'OpenLayers.Layer.Vector';
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
        bodyStyle: "padding:10px; margin: 10px;",
        root: {
            nodeType: "async",
            children: [layerList2, layerList7, layerList6, layerList8,
                layerList3, layerList4, layerList5, layerList9, layerList11, layerList10

            ]
        },
        rootVisible: false
    });

    var setup_msg_top = new Ext.Container({
        width: 296,
        autoEl: 'div',
        items: [{
            xtype: 'container',
            autoEl: 'div',
            cls: 'mycontent',
            html: "<h2>Select Layers to View on Map</h2>"
        }],
        autoScroll: true
    });

    //    var setup_msg_bot = new Ext.Container({
    //        width: 296,
    //        autoEl: 'div',
    //        items: [{
    //            xtype: 'container',
    //            autoEl: 'div',
    //            cls: 'mycontent',
    //            html: "<p>bottom message</p>"
    //        }],
    //        autoScroll: true
    //    });


    var layers_tab = new Ext.Container({
        title: 'Setup',
        autoEl: 'div',
        // items: new Ext.Container({
        //     autoEl: 'div',
        bodyStyle: "padding:10px; ",
        width: 296,
        //        items: [setup_msg_top, tree, setup_msg_bot]
        items: [setup_msg_top, tree]
            // })
    });

    function tree_listener() {
        console.log("test");
    }

    ///////////////////////////////////////////////////////////////
    // data tab
    ////////////////////////////////////////////////////////////////

    var tree_huc12maps = new Ext.tree.TreePanel({
        bodyStyle: "padding:10px; margin: 10px;",
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
                text: 'Habitat Loss',
                expanded: false,
                qtip: 'more info',
                href: 'http://tecumseh.zo.ncsu.edu/pages/info_habitat.html',
                // iconCls: 'tree_image'

                // defined in file functions.js
                children: habitats,
                hrefTarget: "infowindow",
                cls: "infowindow"
            }, {
                text: 'Urban Growth',
                qtip: 'more info',
                children: urban_tree,
                href: 'http://tecumseh.zo.ncsu.edu/pages/info_urban.html',
                hrefTarget: "infowindow",
                cls: "infowindow"
            }, {
                text: 'Fire Suppression',
                qtip: 'more info',
                href: 'http://tecumseh.zo.ncsu.edu/pages/info_firesupp.html',
                children: fire_tree,
                hrefTarget: "infowindow",
                cls: "infowindow"
            }, {
                text: 'Transportation Corridors',
                qtip: 'more info',
                href: 'http://tecumseh.zo.ncsu.edu/pages/info_trans_dcl.html',
                children: trans_tree,
                hrefTarget: "infowindow",
                cls: "infowindow"
            }, {
                text: 'Nutrient Loading',
                expanded: false,
                qtip: 'more info',
                href: 'http://tecumseh.zo.ncsu.edu/pages/info_nl.html',
                hrefTarget: "infowindow",
                cls: "infowindow",

                children: [{
                    text: 'Manure Application',
                    qtip: 'view data',
                    leaf: true,
                    myvalue: "nutrient:manu"
                }, {
                    text: 'Synthetic Nitrogen Fertilizer',
                    qtip: 'view data',
                    leaf: true,
                    myvalue: "nutrient:fert"
                }]
            }, {
                text: 'Annual Atmospheric Deposition',
                expanded: false,
                qtip: 'more info',
                href: 'http://tecumseh.zo.ncsu.edu/pages/info_aad.html',
                hrefTarget: "infowindow",
                cls: "infowindow",
                children: [{
                    text: 'Total Nitrogen Deposition',
                    qtip: 'view data',
                    leaf: true,
                    myvalue: "nutrient:td_n_t"
                }, {
                    text: 'Total Sulfur Deposition',
                    qtip: 'view data',
                    leaf: true,
                    myvalue: "nutrient:td_s_t"
                }]
            }, {
                text: 'Hydrologic Alteration',
                expanded: false,
                qtip: 'more info',
                href: 'http://tecumseh.zo.ncsu.edu/pages/info_nid.html',
                hrefTarget: "infowindow",
                cls: "infowindow",
                children: [{
                    text: 'Number of Dams',
                    qtip: 'view data',
                    leaf: true,
                    myvalue: "water:NID"
                }]
            }, {
                text: 'Forest Health',
                expanded: false,
                qtip: 'more info',
                href: 'http://tecumseh.zo.ncsu.edu/pages/info_forest_health.html',
                hrefTarget: "infowindow",
                cls: "infowindow",
                children: [{
                    text: 'Forest Insect/Disease Risk ',
                    qtip: 'view data',
                    leaf: true,
                    myvalue: "frsthlth"
                }]
            }, {
                text: 'Energy Development',
                expanded: false,
                qtip: 'more info',
                href: 'http://tecumseh.zo.ncsu.edu/pages/info_energy.html',
                hrefTarget: "infowindow",
                cls: "infowindow",
                children: [{
                    text: 'Triassic Basin',
                    qtip: 'view data',
                    leaf: true,
                    myvalue: "energydev"
                }, {
                    text: 'Wind Resource',
                    qtip: 'view data',
                    leaf: true,
                    myvalue: "wind"
                }]
            }, {
                text: 'Sea Level Rise',
                qtip: 'more info',
                href: 'http://tecumseh.zo.ncsu.edu/pages/info_slr.html',
                hrefTarget: "infowindow",
                cls: "infowindow",
                expanded: false,
                children: [{
                    text: 'Undeveloped Upland Change',
                    qtip: 'more info',
                    href: 'http://tecumseh.zo.ncsu.edu/pages/info_slr.html',
                    hrefTarget: "infowindow",
                    cls: "infowindow",
                    children: slr_up
                }, {
                    text: 'Terrestrial Landcover Change',
                    qtip: 'more info',
                    href: 'http://tecumseh.zo.ncsu.edu/pages/info_slr.html',
                    hrefTarget: "infowindow",
                    cls: "infowindow",
                    children: slr_lc
                }]
            }, {
                text: 'Impaired Waters - 303(d)',
                qtip: 'more info',
                href: 'http://tecumseh.zo.ncsu.edu/pages/info_imp_h2o.html',
                hrefTarget: "infowindow",
                cls: "infowindow",
                expanded: false,
                children: [{
                    text: 'Biota Impairments',
                    qtip: 'view data',
                    leaf: true,
                    myvalue: "water:bioimplen"

                }, {
                    text: 'Metal Impairments',
                    qtip: 'view data',
                    leaf: true,
                    myvalue: "water:metimplen"

                }]
            }]
        }),
        listeners: {
            click: function(n) {
                console.log(n.attributes.cls);
                if (n.attributes.cls && n.attributes.cls === 'infowindow') {
                    var strWindowFeatures = "height=400,width=400,top=100,left=100";
                    window.open("", 'infowindow', strWindowFeatures);
                }
                // console.log(formPanelhuc12maps.getForm().getValues(true));
                if (n.attributes.myvalue) {

                    console.log(n.attributes.myvalue);
                    indiv_layer = n.attributes.myvalue;

                    formhuc12maps_chng(n.attributes.myvalue);
                    individual.setVisibility(true);
                    if (show_legend_flag) {
                        float_win.show();
                        show_legend_flag = false;
                    }

                }
            }
        }
    });



    var mapsmsg_top = new Ext.Container({
        width: 296,
        autoEl: 'div',
        cls: 'mycontent',
        html: "<h2>Explore Individual Threats to Wildlife Habitat</h2><p>Click threat data layer name to view on map.</p><p>Click folder name for more data information.</p>",
        // cls: 'help',
        autoScroll: true
    });

    //   var msg = "<p>Click threat data layer to view on map.</p>";
    //   msg += "<p>Click folder for more data information.</p>";
    //   var mapsmsg_bot = new Ext.Container({
    //        width: 296,
    //        autoEl: 'div',
    //        cls: 'mycontent',
    //        html: msg,
    //        autoScroll: true
    //    });


    var maps_tab = new Ext.Container({
        autoEl: 'div',
        title: 'Data',
        //html: "some content",
        //        items: [mapsmsg_top, tree_huc12maps, mapsmsg_bot],
        items: [mapsmsg_top, tree_huc12maps],
        // cls: 'help',
        autoScroll: true
    });

    /////////////////////////////////////////////////////////////
    // aoi tab
    ////////////////////////////////////////////////////////////

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

    var aoi_tab = new Ext.Panel({
        title: 'AOI',
        layout: 'accordion',
        defaults: {
            // applied to each contained panel
            //bodyStyle : 'padding:15px'
        },
        // area_tab2, area_tab,
        items: [area_tab2, area_tab]
    });

    ///////////////////////////////////////////////////////////

    var process_tab = new Ext.Panel({
        title: 'Analyze',
        //html: "some content",
        //        items: [modelpaneltop, habitat_panel, modelpanelmid, modelpanelbot],
        items: [modelmsg_panel, modelpaneltop, habitat_panel, modelpanelmid],
        cls: 'help',
        autoScroll: true
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
        activeTab: 1,
        // accordion
        items: [layers_tab, maps_tab, process_tab, print_tab, aoi_tab],
        deferredRender: false
    });

    var infopanel = new Ext.Panel({
        region: 'north',
        height: 100,
        // accordion
        // html: "<h4>NWRC  Web site</h4>",
        id: "infopage",
        deferredRender: false
    });

    // left.getItem('login_accordion').on('activate', function() {
    //     console.log('tabe opened');
    // });

    // });

    new Ext.Viewport({
        layout: "border",
        defaults: {
            split: true
        },
        items: [mapPanel, left, infopanel]

    });

    // var test = mapPanel.getTopToolbar();
    // console.log(test);

    var panelid1 = Ext.get(area_tab.getEl().dom.children[0]).id;
    var panelid2 = Ext.get(area_tab2.getEl().dom.children[0]).id;
    // var panelid3 = Ext.get(process_tab.getEl().dom.children[0]).id;
    Ext.get(panelid1).applyStyles("background-image: url(/images/dark-green-hd.gif)");
    Ext.get(panelid1).applyStyles("color: white");
    Ext.get(panelid2).applyStyles("background-image: url(/images/dark-red-hd.gif)");
    Ext.get(panelid2).applyStyles("color: white");
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
    // load header page with links and title
    var el = Ext.getCmp("infopage");
    var mgr = el.getUpdater();
    mgr.update({
        url: HOST_NAME + "pages/infopage.html"
    });

    // load shapefile upload page
    var el2 = Ext.getCmp("aoi_upload_id");
    var mgr2 = el2.getUpdater();
    mgr2.update({
        url: HOST_NAME + "pages/upload.html"
    });
    mgr2.on("update", page_script);


});
