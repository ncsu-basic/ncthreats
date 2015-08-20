var map;

Ext.onReady(function() {
    "use strict";


    var HOST_NAME = "http://localhost/";
    var SERVER_URI = "http://localhost/";

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
            }),
            new OpenLayers.Control.PanZoomBar({}),
            new OpenLayers.Control.MousePosition(),
            new OpenLayers.Control.ScaleLine({
                geodesic: true
            })
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



    map.addLayers([individual, composite, results, nonelayer, highlightLayer, ncbounds, ecoregions, counties, ncbcr, nchuc6, nchuc12,
        nchuc10, nchuc8, nchuc6_lbl,
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
        if (mode.indexOf("custom") !== -1 ) {
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
        }  else if (mode.indexOf("ptbuffer") !== -1 ) {
            lonlat = map.getLonLatFromViewPortPx(e.xy);
            var pt = new OpenLayers.Geometry.Point(lonlat.lon, lonlat.lat);
            pts = [];
            pts.push(pt);
            var linearRing = new OpenLayers.Geometry.LinearRing(pts);
            highlightLayer.destroyFeatures();
            var polygonFeature =
                new OpenLayers.Feature.Vector(
                    new OpenLayers.Geometry.Polygon([linearRing]));
            highlightLayer.addFeatures([polygonFeature]);
            highlightLayer.redraw();
        }else {
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

    var selected_hucs = {};

    //function to outline selected predefined areas of interest
    function showInfo2(evt) {
        if (evt.the_geom) {
            console.log(evt);
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
        } else if (mode.indexOf("ptbuffer") !== -1) {
        console.log(mode);

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
            nchuc10, nchuc8, nchuc6_lbl,
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
        // title: "Print config",
        width: 296,
        height: 200,
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
        console.log(sel_type);
        highlightLayer.setVisibility(true);
        if (sel_type === 'predefined') {
            switch (selected_predef) {

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
        var ptradius = formPanel2.getForm().getValues().bufferkm;
        console.log(ptradius);
        console.log(sel_type);
        var gml = '';
        var aoi_list = [];
        var selected_predef_new = 'na';
        var point_buffer = {};
        console.log(pts.length);

        if (sel_type !== 'predefined') {
            if (pts.length === 1 && sel_type === 'ptbuffer') {
                sel_type = 'point_buffer';
                var lonlatdegrees = lonlat.transform(proj_900913, proj_4326);
                // console.log(lonlatdegrees);
                point_buffer = {
                    lon: lonlatdegrees.lon,
                    lat: lonlatdegrees.lat,
                    ptradius: ptradius
                };
                console.log(lonlat);
                lonlat = {};
                $.ajax({
                    type: "GET",
                    url: SERVER_URI + "wps/ptbufferjson",
                    data: point_buffer,
                    dataType: "json"
                }).done(function(data, textStatus, jqXHR) {
                    if (jqXHR.status === 200) {
                        console.log(data);
                        // showInfo2(data);
                        var format = new OpenLayers.Format.GeoJSON({
                            'internalProjection': new OpenLayers.Projection("EPSG:900913"),
                            'externalProjection': new OpenLayers.Projection("EPSG:4326")
                        });
                        highlightLayer.addFeatures(format.read(data.the_geom));
                        highlightLayer.redraw();
                    }
                });

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
            point_buffer: point_buffer,
            ptradius: ptradius
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
        height: 500,
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
                    boxLabel: 'custom polygon<br>Click on map to create ' +
                        'polygon, then Submit:',
                    name: 'aoi_type',
                    inputValue: 'custom'
                    // id: 'custom_radio_sel'
                }, {
                    xtype: 'container',
                    bodyPadding: 20,
                    layout: 'hbox',
                    style: {
                        // padding: '10px'
                        width: '95%',
                        marginBottom: '10px',
                        marginTop: '10px',
                    },
                    items: [{
                            xtype: 'radio',
                            boxLabel: 'custom point buffer<br>Enter buffer radius in km,<br>click on map, then submit:',
                            name: 'aoi_type',
                            inputValue: 'ptbuffer'
                        },
                        {
                            xtype: 'textfield',
                            name: 'bufferkm',
                            width: 50,
                            value: '3'

                        }
                    ]
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



    var threat_calcs_map = function() {
        var form_vals_paneltop = modelpaneltop.getForm().getValues();
        console.log(form_vals_paneltop);

        var form_vals_new = {};
        form_vals_new.year = form_vals_paneltop.year;
        form_vals_new.scenario = form_vals_paneltop.scenario;
        if (document.getElementById('frst_chk').checked) {
            form_vals_new.frst = $("#frst_limit").val();
        } else {
            form_vals_new.frst = 'notinclude';
        }

        if (document.getElementById('ftwt_chk').checked) {
            form_vals_new.ftwt = $("#ftwt_limit").val();
        } else {
            form_vals_new.ftwt = 'notinclude';
        }
        if (document.getElementById('open_chk').checked) {
            form_vals_new.open = $("#open_limit").val();
        } else {
            form_vals_new.open = 'notinclude';
        }
        if (document.getElementById('hbwt_chk').checked) {
            form_vals_new.hbwt = $("#hbwt_limit").val();
        } else {
            form_vals_new.hbwt = 'notinclude';
        }
        if (document.getElementById('shrb_chk').checked) {
            form_vals_new.shrb = $("#shrb_limit").val();
        } else {
            form_vals_new.shrb = 'notinclude';
        }
        if (document.getElementById('urbangrth_chk').checked) {
            form_vals_new.urbangrth = $("#urbangrth_limit").val();
        } else {
            form_vals_new.urbangrth = 'notinclude';
        }
        if (document.getElementById('firesup_chk').checked) {
            form_vals_new.firesup = $("#firesup_limit").val();
        } else {
            form_vals_new.firesup = 'notinclude';
        }
        if (document.getElementById('hiway_chk').checked) {
            form_vals_new.hiway = $("#hiway_limit").val();
        } else {
            form_vals_new.hiway = 'notinclude';
        }
        if (document.getElementById('slr_up_chk').checked) {
            form_vals_new.slr_up = $("#slr_up_limit").val();
        } else {
            form_vals_new.slr_up = 'notinclude';
        }
        if (document.getElementById('slr_lc_chk').checked) {
            form_vals_new.slr_lc = $("#slr_lc_limit").val();
        } else {
            form_vals_new.slr_lc = 'notinclude';
        }
        if (document.getElementById('triassic_chk').checked) {
            form_vals_new.triassic = $("#triassic_limit").val();
        } else {
            form_vals_new.triassic = 'notinclude';
        }
        if (document.getElementById('wind_chk').checked) {
            form_vals_new.wind = $("#wind_limit").val();
        } else {
            form_vals_new.wind = 'notinclude';
        }
        if (document.getElementById('manure_chk').checked) {
            form_vals_new.manure = $("#manure_limit").val();
        } else {
            form_vals_new.manure = 'notinclude';
        }
        if (document.getElementById('nitrofrt_chk').checked) {
            form_vals_new.nitrofrt = $("#nitrofrt_limit").val();
        } else {
            form_vals_new.nitrofrt = 'notinclude';
        }
        if (document.getElementById('totnitro_chk').checked) {
            form_vals_new.totnitro = $("#totnitro_limit").val();
        } else {
            form_vals_new.totnitro = 'notinclude';
        }
        if (document.getElementById('totsulf_chk').checked) {
            form_vals_new.totsulf = $("#totsulf_limit").val();
        } else {
            form_vals_new.totsulf = 'notinclude';
        }
        if (document.getElementById('insectdisease_chk').checked) {
            form_vals_new.insectdisease = $("#insectdisease_limit").val();
        } else {
            form_vals_new.insectdisease = 'notinclude';
        }
        if (document.getElementById('ndams_chk').checked) {
            form_vals_new.ndams = $("#ndams_limit").val();
        } else {
            form_vals_new.ndams = 'notinclude';
        }
        if (document.getElementById('impairbiota_chk').checked) {
            form_vals_new.impairbiota = $("#impairbiota_limit").val();
        } else {
            form_vals_new.impairbiota = 'notinclude';
        }
        if (document.getElementById('impairmetal_chk').checked) {
            form_vals_new.impairmetal = $("#impairmetal_limit").val();
        } else {
            form_vals_new.impairmetal = 'notinclude';
        }
        if (document.getElementById('frst_chk').checked) {
            form_vals_new.frst = $("#frst_limit").val();
        } else {
            form_vals_new.frst = 'notinclude';
        }
        console.log(form_vals_new);

        $.ajax({
            url: SERVER_URI + 'wps/map',
            type: 'GET',
            data: {
                impairbiota: form_vals_new.impairbiota,
                impairmetal: form_vals_new.impairmetal,
                scenario: form_vals_new.scenario,
                frst: form_vals_new.frst,
                ftwt: form_vals_new.ftwt,
                hbwt: form_vals_new.hbwt,
                open: form_vals_new.open,
                shrb: form_vals_new.shrb,
                year: form_vals_new.year,
                firesup: form_vals_new.firesup,
                hiway: form_vals_new.hiway,
                insectdisease: form_vals_new.insectdisease,
                manure: form_vals_new.manure,
                ndams: form_vals_new.ndams,
                nitrofrt: form_vals_new.nitrofrt,
                totnitro: form_vals_new.totnitro,
                totsulf: form_vals_new.totsulf,
                triassic: form_vals_new.triassic,
                urbangrth: form_vals_new.urbangrth,
                slr_up: form_vals_new.slr_up,
                slr_lc: form_vals_new.slr_lc,
                wind: form_vals_new.wind,
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
        // var habthrts = ['frst', 'ftwt', "hbwt", "open", "shrb"];
        // var yearthrts = ['urban', 'fire', 'trans', 'slr_up', 'slr_lc'];

        form_vals.mode = 'single';
        form_vals = {
            'map': lyrdesc
        };


        if (!$.isEmptyObject(form_vals)) {
            var qry_str = $.param(form_vals);
            // var url = SERVER_URI + 'wps/report?' + qry_str;
            var url = resource + '/report_indiv?' + qry_str;
            console.log(url);
            window.open(url);
        }
    };

    threat_calcs_report = function() {
        // var form_vals_hab = habitat_panel.getForm().getValues();
        // var form_vals_year = modelpaneltop.getForm().getValues();
        // var form_vals_misc = modelpanelmid.getForm().getValues();

        var form_vals_paneltop = modelpaneltop.getForm().getValues();
        console.log(form_vals_paneltop);

        var form_vals_new = {};
        form_vals_new.year = form_vals_paneltop.year;
        form_vals_new.scenario = form_vals_paneltop.scenario;
        if (document.getElementById('frst_chk').checked) {
            form_vals_new.frst = $("#frst_limit").val();
        } else {
            form_vals_new.frst = 'notinclude';
        }

        if (document.getElementById('ftwt_chk').checked) {
            form_vals_new.ftwt = $("#ftwt_limit").val();
        } else {
            form_vals_new.ftwt = 'notinclude';
        }
        if (document.getElementById('open_chk').checked) {
            form_vals_new.open = $("#open_limit").val();
        } else {
            form_vals_new.open = 'notinclude';
        }
        if (document.getElementById('hbwt_chk').checked) {
            form_vals_new.hbwt = $("#hbwt_limit").val();
        } else {
            form_vals_new.hbwt = 'notinclude';
        }
        if (document.getElementById('shrb_chk').checked) {
            form_vals_new.shrb = $("#shrb_limit").val();
        } else {
            form_vals_new.shrb = 'notinclude';
        }
        if (document.getElementById('urbangrth_chk').checked) {
            form_vals_new.urbangrth = $("#urbangrth_limit").val();
        } else {
            form_vals_new.urbangrth = 'notinclude';
        }
        if (document.getElementById('firesup_chk').checked) {
            form_vals_new.firesup = $("#firesup_limit").val();
        } else {
            form_vals_new.firesup = 'notinclude';
        }
        if (document.getElementById('hiway_chk').checked) {
            form_vals_new.hiway = $("#hiway_limit").val();
        } else {
            form_vals_new.hiway = 'notinclude';
        }
        if (document.getElementById('slr_up_chk').checked) {
            form_vals_new.slr_up = $("#slr_up_limit").val();
        } else {
            form_vals_new.slr_up = 'notinclude';
        }
        if (document.getElementById('slr_lc_chk').checked) {
            form_vals_new.slr_lc = $("#slr_lc_limit").val();
        } else {
            form_vals_new.slr_lc = 'notinclude';
        }
        if (document.getElementById('triassic_chk').checked) {
            form_vals_new.triassic = $("#triassic_limit").val();
        } else {
            form_vals_new.triassic = 'notinclude';
        }
        if (document.getElementById('wind_chk').checked) {
            form_vals_new.wind = $("#wind_limit").val();
        } else {
            form_vals_new.wind = 'notinclude';
        }
        if (document.getElementById('manure_chk').checked) {
            form_vals_new.manure = $("#manure_limit").val();
        } else {
            form_vals_new.manure = 'notinclude';
        }
        if (document.getElementById('nitrofrt_chk').checked) {
            form_vals_new.nitrofrt = $("#nitrofrt_limit").val();
        } else {
            form_vals_new.nitrofrt = 'notinclude';
        }
        if (document.getElementById('totnitro_chk').checked) {
            form_vals_new.totnitro = $("#totnitro_limit").val();
        } else {
            form_vals_new.totnitro = 'notinclude';
        }
        if (document.getElementById('totsulf_chk').checked) {
            form_vals_new.totsulf = $("#totsulf_limit").val();
        } else {
            form_vals_new.totsulf = 'notinclude';
        }
        if (document.getElementById('insectdisease_chk').checked) {
            form_vals_new.insectdisease = $("#insectdisease_limit").val();
        } else {
            form_vals_new.insectdisease = 'notinclude';
        }
        if (document.getElementById('ndams_chk').checked) {
            form_vals_new.ndams = $("#ndams_limit").val();
        } else {
            form_vals_new.ndams = 'notinclude';
        }
        if (document.getElementById('impairbiota_chk').checked) {
            form_vals_new.impairbiota = $("#impairbiota_limit").val();
        } else {
            form_vals_new.impairbiota = 'notinclude';
        }
        if (document.getElementById('impairmetal_chk').checked) {
            form_vals_new.impairmetal = $("#impairmetal_limit").val();
        } else {
            form_vals_new.impairmetal = 'notinclude';
        }
        if (document.getElementById('frst_chk').checked) {
            form_vals_new.frst = $("#frst_limit").val();
        } else {
            form_vals_new.frst = 'notinclude';
        }



        console.log(form_vals_new);

        //        var form_vals_water = modelpanelbot.getForm().getValues();
        var form_vals = {
            impairbiota: form_vals_new.impairbiota,
            impairmetal: form_vals_new.impairmetal,
            scenario: form_vals_new.scenario,
            frst: form_vals_new.frst,
            ftwt: form_vals_new.ftwt,
            hbwt: form_vals_new.hbwt,
            open: form_vals_new.open,
            shrb: form_vals_new.shrb,
            year: form_vals_new.year,
            firesup: form_vals_new.firesup,
            hiway: form_vals_new.hiway,
            insectdisease: form_vals_new.insectdisease,
            manure: form_vals_new.manure,
            ndams: form_vals_new.ndams,
            nitrofrt: form_vals_new.nitrofrt,
            totnitro: form_vals_new.totnitro,
            totsulf: form_vals_new.totsulf,
            triassic: form_vals_new.triassic,
            urbangrth: form_vals_new.urbangrth,
            slr_up: form_vals_new.slr_up,
            slr_lc: form_vals_new.slr_lc,
            wind: form_vals_new.wind,
            mode: 'model'
        };

        var includes_list = {
            impairbiota: form_vals_new.impairbiota,
            impairmetal: form_vals_new.impairmetal,
            // scenario: form_vals_hab.scenario,
            frst: form_vals_new.frst,
            ftwt: form_vals_new.ftwt,
            hbwt: form_vals_new.hbwt,
            open: form_vals_new.open,
            shrb: form_vals_new.shrb,
            // year: form_vals_year.year,
            firesup: form_vals_new.firesup,
            hiway: form_vals_new.hiway,
            insectdisease: form_vals_new.insectdisease,
            manure: form_vals_new.manure,
            ndams: form_vals_new.ndams,
            nitrofrt: form_vals_new.nitrofrt,
            totnitro: form_vals_new.totnitro,
            totsulf: form_vals_new.totsulf,
            triassic: form_vals_new.triassic,
            urbangrth: form_vals_new.urbangrth,
            slr_up: form_vals_new.slr_up,
            slr_lc: form_vals_new.slr_lc,
            wind: form_vals_new.wind
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

    var limit_defaults = {
        frst: "0.10",
        ftwt: "0.10",
        open: "0.10",
        hbwt: "0.05",
        shrb: "0.10",
        urbangrth: "0.30",
        firesup: "50",
        hiway: "10",
        slr_up: "400",
        slr_lc: "250",
        triassic: "0.20",
        wind: "3.0",
        manure: "20",
        nitrofrt: "15",
        totnitro: "12",
        totsulf: "12",
        insectdisease: "25",
        ndams: "8",
        impairbiota: "3.5",
        impairmetal: "2.0"
    };

    var threat_calcs_reset = function() {
        var limit;
        for (limit in limit_defaults) {
            // console.log(limit);
            $("#" + limit + "_limit").val(limit_defaults[limit]);
            $("#" + limit + "_default").html(limit_defaults[limit]);
            // $("#" + limit + " option:selected").val(limit_defaults[limit]);

        }
    };


    var show_legend_flag = true;
    // console.log(habitats);

    // tree_huc12maps.getRootNode().expand();


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
        }, {
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

    var modelpanelmid = new Ext.Panel({
        title: "",
        width: 280,
        height: 0,
        // bodyStyle: "padding:20px; margin-top: 5px;",
        // labelAlign: "top",
        defaults: {
            anchor: "100%"
        },

        buttons: [{
            text: "Reset",
            handler: threat_calcs_reset
        }, {
            text: "Report",
            handler: threat_calcs_report
        }, {
            text: "Show map",
            handler: threat_calcs_map
        }]

    });


    var legend_titles1 = {
        frst: 'Forest Habitat Loss? Since 2000 (%)',
        ftwt: 'Wet Forest Habitat Loss? Since 2000 (%)',
        hbwt: 'Wet Herbaceous Habitat? Loss Since 2000 (%)',
        open: 'Open Habitat Loss? Since 2000 (%)',
        shrb: 'Scrub/Shrub Habitat ?Loss Since 2000 (%)',
        urban: 'Urban Land Cover (%)',
        fire: 'Mean Urban Density? w/in 5 mile radius',
        trans: 'Mean Length/Area of? Major Highways (m/ha)',
        "nutrient:manu": "Manure Application? (kg/ha/yr)",
        "nutrient:fert": "Syn. Nitrogen Fertilizer? Application (kg/ha/yr)",
        "nutrient:td_n_t": "Total Nitrogen Deposition? (kg/ha/yr)",
        "nutrient:td_s_t": "Total Sulfur Deposition? (kg/ha/yr)",
        frsthlth: "Forest Insect/Disease Risk? (%)",
        energydev: "Triassic basin (ha)",
        "water:bioimplen": "Biota Impairments? (km*stream density)",
        "water:metimplen": "Metal Impariments? (km*stream density)",
        "water:NID": "Number of Dams (n)",
        wind: "Wind Power Class? (mean)",
        slr_lc: "Terrestrial Landcover Loss? Since 2000 (ha)",
        slr_up: "Undeveloped Upland Loss? Since 2000 (ha)"

    };

    // function to draw individual thrt maps
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

    // function called to preview effect of limit setting on threats
    var preview_map = function(mymap, limit) {
        // console.log(map, limit);
        var form_vals_paneltop = modelpaneltop.getForm().getValues();
        // console.log(form_vals_paneltop);

        // var form_vals_new = {};
        // form_vals_new.year = form_vals_paneltop.year;
        // form_vals_new.scenario = form_vals_paneltop.scenario;

        $.ajax({
            type: "POST",
            url: SERVER_URI + 'wps/preview_map',
            data: {
                map: mymap,
                limit: limit,
                scenario: form_vals_paneltop.scenario,
                year: form_vals_paneltop.year
            },
            dataType: "json"
        }).done(function(data) {
            composite.setVisibility(false);
            individual.setVisibility(true);
            console.log(data);
            for (var key in data.res) {
                var thrt = data.res[key];

                try {
                    map.getLayersByName("Individual Threats")[0].
                    getFeaturesByAttribute("huc12", key)[0].
                    attributes.threat = thrt;
                } catch (err) {
                    console.log(key);
                    console.log(thrt);

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
    // var width = 420,
    var barHeight = 25;

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

    // function tree_listener() {
    //     console.log("test");
    // }

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

    var modelpage = new Ext.Panel({
        // title: 'model',
        cls: 'pages',
        autoScroll: true,
        id: "model_page",
        width: 280
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
        items: [modelmsg_panel, modelpaneltop, modelpage, modelpanelmid],
        cls: 'help',
        autoScroll: true
    });



    var print_tab = new Ext.Container({
        autoEl: 'div',
        title: 'Print',
        items: [formPanel],
        autoScroll: true
    });

    var left = new Ext.TabPanel({
        region: 'west',
        width: 300,
        activeTab: 4,
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
                    console.log(shpfeatures.length);
                    if (shpfeatures.length > 1) {
                        Ext.Msg.alert("user uploaded multipolygon");
                    } else {
                        highlightLayer.destroyFeatures();
                        results.removeAllFeatures();
                        map.zoomToExtent(map_extent);
                        highlightLayer.addFeatures(shpfeatures);
                        highlightLayer.setVisibility(true);
                        console.log(shpfeatures);
                        document.getElementById('custom_radio_sel').checked =
                            'checked';
                        Ext.getCmp('aoi_upload_id').collapse();
                        Ext.getCmp('aoi_create_id').expand();
                    }

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

    var model_script = function() {
        // alert("test");
        $(document).ready(function() {
            $("#modellink1").click(function(e) {
                e.preventDefault();
                $("#modelparams1").toggle(500);
            });
            $("#modellink2").click(function(e) {
                e.preventDefault();
                $("#modelparams2").toggle(500);
            });
            $("#modellink3").click(function(e) {
                e.preventDefault();
                $("#modelparams3").toggle(500);
            });
            $("#modellink4").click(function(e) {
                e.preventDefault();
                $("#modelparams4").toggle(500);
            });
            $("#modellink5").click(function(e) {
                e.preventDefault();
                $("#modelparams5").toggle(500);
            });
            $("#modellink6").click(function(e) {
                e.preventDefault();
                $("#modelparams6").toggle(500);
            });
            $("#modellink7").click(function(e) {
                e.preventDefault();
                $("#modelparams7").toggle(500);
            });
            $("#modellink8").click(function(e) {
                e.preventDefault();
                $("#modelparams8").toggle(500);
            });
            $("#modellink9").click(function(e) {
                e.preventDefault();
                $("#modelparams9").toggle(500);
            });
            $("#modellink10").click(function(e) {
                e.preventDefault();
                $("#modelparams10").toggle(500);
            });
            $("#modellink11").click(function(e) {
                e.preventDefault();
                $("#modelparams11").toggle(500);
            });
            $("#modellink12").click(function(e) {
                e.preventDefault();
                $("#modelparams12").toggle(500);
            });
            $("#modellink13").click(function(e) {
                e.preventDefault();
                $("#modelparams13").toggle(500);
            });
            $("#modellink14").click(function(e) {
                e.preventDefault();
                $("#modelparams14").toggle(500);
            });
            $("#modellink15").click(function(e) {
                e.preventDefault();
                $("#modelparams15").toggle(500);
            });
            $("#modellink16").click(function(e) {
                e.preventDefault();
                $("#modelparams16").toggle(500);
            });
            $("#modellink17").click(function(e) {
                e.preventDefault();
                $("#modelparams17").toggle(500);
            });
            $("#modellink18").click(function(e) {
                e.preventDefault();
                $("#modelparams18").toggle(500);
            });
            $("#modellink19").click(function(e) {
                e.preventDefault();
                $("#modelparams19").toggle(500);
            });

            $("#modellink20").click(function(e) {
                e.preventDefault();
                console.log("test");
                $("#modelparams20").toggle(500);
            });
            $(".preview").click(function(e) {
                e.preventDefault();
                var limit_val_id = e.currentTarget.name;
                var max = dt_limits[limit_val_id].max;
                var min = dt_limits[limit_val_id].min;
                var limit_val = $("#" + limit_val_id).val();
                if (parseFloat(limit_val) > max) {
                    Ext.MessageBox.alert('Status', 'Input above max.');
                } else if (parseFloat(limit_val) < min) {
                    Ext.MessageBox.alert('Status', 'Input below min.');
                } else {
                    preview_map(limit_val_id, limit_val);
                }


            });

            // var prob_vals = [
            //     "0.00", "0.10", "0.20", "0.30", "0.40", "0.50",
            //     "0.60", "0.70", "0.80", "0.90", "0.95"
            // ];
            // // console.log(prob_vals);
            // prob_vals.forEach(function(val){
            //     console.log(val);
            //     $("select").append("<option val='" + val +"'>" + val + "<option")
            // });

            var dt_limits = {
                frst_limit: {
                    min: 0,
                    max: 97.94
                },
                ftwt_limit: {
                    min: 0,
                    max: 52.01
                },
                open_limit: {
                    min: 0,
                    max: 46.75
                },
                hbwt_limit: {
                    min: 0,
                    max: 26.78
                },
                shrb_limit: {
                    min: 0,
                    max: 46.89
                },
                urbangrth_limit: {
                    min: 0.01,
                    max: 99.84
                },
                firesup_limit: {
                    min: 0.01,
                    max: 274.34
                },
                hiway_limit: {
                    min: 0,
                    max: 40.14
                },
                slr_up_limit: {
                    min: 0.09,
                    max: 7313.58
                },
                slr_lc_limit: {
                    min: 0.09,
                    max: 1466.73
                },
                triassic_limit: {
                    min: 0.01,
                    max: 100
                },
                wind_limit: {
                    min: 1,
                    max: 7
                },
                manure_limit: {
                    min: 0.01,
                    max: 121.08
                },
                nitrofrt_limit: {
                    min: 0.04,
                    max: 69.86
                },
                totnitro_limit: {
                    min: 6.1,
                    max: 26.91
                },
                totsulf_limit: {
                    min: 7.9,
                    max: 25.3
                },
                insectdisease_limit: {
                    min: 0.1,
                    max: 100
                },
                ndams_limit: {
                    min: 1,
                    max: 33
                },
                impairbiota_limit: {
                    min: 0,
                    max: 49.3
                },
                impairmetal_limit: {
                    min: 0,
                    max: 93.22
                }
            };
            threat_calcs_reset();
            $(".default_params").css("display", "none");



        });
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

    var el3 = Ext.getCmp("model_page");
    var mgr3 = el3.getUpdater();
    mgr3.update({
        url: HOST_NAME + "pages/area.html"
    });
    mgr3.on("update", model_script);

});