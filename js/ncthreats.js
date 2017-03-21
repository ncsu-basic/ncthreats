var map;

Ext.onReady(function() {
    "use strict";


    var HOST_NAME = "http://localhost/coa/";
    var SERVER_URI = "http://localhost/";

    var resource = SERVER_URI + "wps/0";
    var batch_aoi = false;
    var batch_resource = {};
    // keycode for coa community name
    var keycode;


    var lgd_text, lgd_title, lgd_title2, lgd_color;
    var legend_print = "none";

    ////////////////////////////////////////////
    //initialize map
    ///////////////////////////////////////////////////
    var map_extent = new OpenLayers.Bounds(-9406496, 4001978, -8382357, 4397372);
    //var map_extent = new OpenLayers.Bounds(-9406496, 3901978, -8382357, 4297372);
    var proj_4326 = new OpenLayers.Projection('EPSG:4326');
    var proj_900913 = new OpenLayers.Projection('EPSG:900913');

    map = new OpenLayers.Map({
        displayProjection: new OpenLayers.Projection("EPSG:4326"),
        maxExtent: map_extent,
        // baseLayer: osm,
        projection: new OpenLayers.Projection("EPSG:900913"),
        // resolutions: [2445.984, 1222.99, 611.496, 305.748, 152.874, 76.437, 38.218],
        // numZoomLevels: 7,
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

    var layeropts = {
        buffer: 0,
        displayOutsideMaxExtent: true,
        isBaseLayer: true
    };

    // var google_physical = new OpenLayers.Layer.Google("Google physical", {
    //     type: google.maps.MapTypeId.TERRAIN,
    //     sphericalMercator: true,
    //     visibility: false,

    //     // maxExtent: new OpenLayers.Bounds(-8515941.046, 4392656.005, -8478829.968, 4415896.359),
    //     wrapDateLine: false
    // }, layeropts);

    // var gphy = new OpenLayers.Layer.Google("Google Physical Map", {
    //     type: google.maps.MapTypeId.TERRAIN,

    //     displayInLayerSwitcher: false,
    //     visibility: false,
    //     buffer: 0,
    //     isBaseLayer: true
    // });

    var osm = new OpenLayers.Layer.OSM("Open Street Map", "", {
        // resolutions: [2445.984, 1222.99, 611.496, 305.748, 152.874, 76.437, 38.218],
        // serverResolutions: [156543.03390625, 78271.516953125, 39135.7584765625,
        //     19567.87923828125, 9783.939619140625, 4891.9698095703125,
        //     2445.9849047851562, 1222.9924523925781, 611.4962261962891,
        //     305.74811309814453, 152.87405654907226, 76.43702827453613,
        //     38.218514137268066, 19.109257068634033, 9.554628534317017,
        //     4.777314267158508, 2.388657133579254, 1.194328566789627,
        //     0.5971642833948135
        // ]
    });

    // var counties_base = new OpenLayers.Layer.TMS("None",
    //     SERVER_URI + "tilecache/", {
    //         layername: "counties",
    //         type: "png",
    //         tileOrigin: new OpenLayers.LonLat(-9462455, 3963396)
    //     }
    // );

    // var hillshade = new OpenLayers.Layer.TMS("NC Hillshade",
    //     SERVER_URI + "tilecache/", {
    //         layername: "hillshadenc",
    //         type: "png",
    //         tileOrigin: new OpenLayers.LonLat(-9462455, 3963396)
    //     }
    // );

    var bounds_base = new OpenLayers.Layer.XYZ(
        "No background", ["https://api.mapbox.com/v4/basic99.3lwn4pdl/${z}/${x}/${y}.png?access_token=pk.eyJ1IjoiYmFzaWM5OSIsImEiOiJjaWthM3g1anQwaTgwdnVrcHNoZHNyNndnIn0.cm4To1qxOS6-29lzWqhp5Q"], {
            sphericalMercator: true,
            wrapDateLine: true,
            visibility: false,
            // numZoomLevels: 10,
            isBaseLayer: true
        });


    ////////////////////////////////////////////////////////////
    /// TMS line layers overlays
    /////////////////////////////////////////////////////////



    // http://www.macwright.org/2012/01/12/openlayers.html
    // mapbox://styles/basic99/cikg7p7p3002qapm5zsom050p
    // https://api.mapbox.com/styles/v1/mapbox/streets-v8/tiles/1/1/0?access_token=access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpamVuY3cxbzAwMG12ZGx4cGljbGtqMGUifQ.vpDqms08MBqoRgp667Yz5Q
    var nchuc6 = new OpenLayers.Layer.XYZ(
        "River Basin Boundaries", ["https://api.mapbox.com/v4/basic99.bj2z0eie/${z}/${x}/${y}.png?access_token=pk.eyJ1IjoiYmFzaWM5OSIsImEiOiJjaWthM3g1anQwaTgwdnVrcHNoZHNyNndnIn0.cm4To1qxOS6-29lzWqhp5Q"], {
            sphericalMercator: true,
            wrapDateLine: true,
            visibility: false,
            // numZoomLevels: 10,
            isBaseLayer: false
        });

    var satellite = new OpenLayers.Layer.XYZ(
        "Satellite", ["https://api.mapbox.com/v4/mapbox.satellite/${z}/${x}/${y}.png?access_token=pk.eyJ1IjoiYmFzaWM5OSIsImEiOiJjaWthM3g1anQwaTgwdnVrcHNoZHNyNndnIn0.cm4To1qxOS6-29lzWqhp5Q"], {
            sphericalMercator: true,
            wrapDateLine: true,
            // numZoomLevels: 10,
            isBaseLayer: true
        });


    var nchuc8 = new OpenLayers.Layer.XYZ(
        "Subbasin Boundaries", ["https://api.mapbox.com/v4/basic99.a36g6y78/${z}/${x}/${y}.png?access_token=pk.eyJ1IjoiYmFzaWM5OSIsImEiOiJjaWthM3g1anQwaTgwdnVrcHNoZHNyNndnIn0.cm4To1qxOS6-29lzWqhp5Q"], {
            sphericalMercator: true,
            wrapDateLine: true,
            visibility: false,
            // numZoomLevels: 10,
            isBaseLayer: false
        });



    var nchuc10 = new OpenLayers.Layer.XYZ(
        "Watershed Boundaries", ["https://api.mapbox.com/v4/basic99.d06p9d7m/${z}/${x}/${y}.png?access_token=pk.eyJ1IjoiYmFzaWM5OSIsImEiOiJjaWthM3g1anQwaTgwdnVrcHNoZHNyNndnIn0.cm4To1qxOS6-29lzWqhp5Q"], {
            sphericalMercator: true,
            wrapDateLine: true,
            visibility: false,
            // numZoomLevels: 10,
            isBaseLayer: false
        });

    var counties = new OpenLayers.Layer.XYZ(
        "Counties", ["https://api.mapbox.com/v4/basic99.1y5ponyk/${z}/${x}/${y}.png?access_token=pk.eyJ1IjoiYmFzaWM5OSIsImEiOiJjaWthM3g1anQwaTgwdnVrcHNoZHNyNndnIn0.cm4To1qxOS6-29lzWqhp5Q"], {
            sphericalMercator: true,
            wrapDateLine: true,
            // numZoomLevels: 10,
            visibility: false,
            displayInLayerSwitcher: true,
            isBaseLayer: false
        });

    var ncbcr = new OpenLayers.Layer.XYZ(
        "Bird Conservation Region Boundaries", ["https://api.mapbox.com/v4/basic99.d1zhazaq/${z}/${x}/${y}.png?access_token=pk.eyJ1IjoiYmFzaWM5OSIsImEiOiJjaWthM3g1anQwaTgwdnVrcHNoZHNyNndnIn0.cm4To1qxOS6-29lzWqhp5Q"], {
            sphericalMercator: true,
            wrapDateLine: true,
            // numZoomLevels: 10,
            visibility: false,
            displayInLayerSwitcher: true,
            isBaseLayer: false
        });


    var ncbounds = new OpenLayers.Layer.XYZ(
        "State Boundary", ["https://api.mapbox.com/v4/basic99.andgjbjs/${z}/${x}/${y}.png?access_token=pk.eyJ1IjoiYmFzaWM5OSIsImEiOiJjaWthM3g1anQwaTgwdnVrcHNoZHNyNndnIn0.cm4To1qxOS6-29lzWqhp5Q"], {
            sphericalMercator: true,
            wrapDateLine: true,
            // numZoomLevels: 10,
            visibility: true,
            displayInLayerSwitcher: true,
            isBaseLayer: false
        });



    var ecoregions = new OpenLayers.Layer.XYZ(
        "Ecoegion Boundaries", ["https://api.mapbox.com/v4/basic99.52s4j5j4/${z}/${x}/${y}.png?access_token=pk.eyJ1IjoiYmFzaWM5OSIsImEiOiJjaWthM3g1anQwaTgwdnVrcHNoZHNyNndnIn0.cm4To1qxOS6-29lzWqhp5Q"], {
            sphericalMercator: true,
            wrapDateLine: true,
            // numZoomLevels: 10,
            visibility: false,
            displayInLayerSwitcher: true,
            isBaseLayer: false
        });
    var se_manage = new OpenLayers.Layer.XYZ(
        "Managed Areas", ["https://api.mapbox.com/v4/basic99.bcjtagmc/${z}/${x}/${y}.png?access_token=pk.eyJ1IjoiYmFzaWM5OSIsImEiOiJjaWthM3g1anQwaTgwdnVrcHNoZHNyNndnIn0.cm4To1qxOS6-29lzWqhp5Q"], {
            sphericalMercator: true,
            wrapDateLine: true,
            // numZoomLevels: 10,
            visibility: false,
            displayInLayerSwitcher: true,
            isBaseLayer: false
        });

    var ncwrc_priorities = new OpenLayers.Layer.XYZ(
        "NCWRC Priorities", ["https://api.mapbox.com/v4/basic99.6bmnbwet/${z}/${x}/${y}.png?access_token=pk.eyJ1IjoiYmFzaWM5OSIsImEiOiJjaWthM3g1anQwaTgwdnVrcHNoZHNyNndnIn0.cm4To1qxOS6-29lzWqhp5Q"], {
            sphericalMercator: true,
            wrapDateLine: true,
            // numZoomLevels: 10,
            visibility: false,
            displayInLayerSwitcher: true,
            isBaseLayer: false
        });

    var ncwrc_basins = new OpenLayers.Layer.XYZ(
        "NCWRC Basins", ["https://api.mapbox.com/v4/basic99.am2t2u4i/${z}/${x}/${y}.png?access_token=pk.eyJ1IjoiYmFzaWM5OSIsImEiOiJjaWthM3g1anQwaTgwdnVrcHNoZHNyNndnIn0.cm4To1qxOS6-29lzWqhp5Q"], {
            sphericalMercator: true,
            wrapDateLine: true,
            // numZoomLevels: 10,
            visibility: false,
            displayInLayerSwitcher: true,
            isBaseLayer: false
        });

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
    var resultsStyleMap_coa = new OpenLayers.StyleMap({});
    // ['f5f57a', 'e8b655', 'd68036', 'c3491a', 'a80000']

    //edit fillOpacity for inividual legend transparency
    var symbolsLookup = {
        0: {
            strokeColor: "#CCCCCC",
            fillColor: "#ffffff",
            strokeWidth: 1,
            strokeOpacity: 0.7,
            fillOpacity: 0
        },
        1: {
            strokeColor: "#CCCCCC",
            fillColor: "#ffffff",
            strokeWidth: 1,
            strokeOpacity: 0.7,
            fillOpacity: 0.7
        },
        2: {
            strokeColor: "#CCCCCC",
            fillColor: "#ffffff",
            strokeWidth: 1,
            strokeOpacity: 0.7,
            fillOpacity: 0.7
        },
        3: {
            strokeColor: "#CCCCCC",
            fillColor: "#ffffff",
            strokeWidth: 1,
            strokeOpacity: 0.7,
            fillOpacity: 0.7
        },
        4: {
            strokeColor: "#CCCCCC",
            fillColor: "#ffffff",
            strokeWidth: 1,
            strokeOpacity: 0.7,
            fillOpacity: 0.7
        },
        5: {
            strokeColor: "#CCCCCC",
            fillColor: "#ffffff",
            strokeWidth: 1,
            strokeOpacity: 0.7,
            fillOpacity: 0.7
        }
    };

    //edit fillOpacity for model legend transparency
    var symbolsLookup_model = {
        0: {
            strokeColor: "#CCCCCC",
            fillColor: "#ffffff",
            strokeWidth: 1,
            strokeOpacity: 1,
            fillOpacity: 0
        },
        1: {
            strokeColor: "#CCCCCC",
            fillColor: "#FFFF7F",
            strokeWidth: 1,
            strokeOpacity: 0.7,
            fillOpacity: 0.7
        },
        2: {
            strokeColor: "#CCCCCC",
            fillColor: "#C4F75D",
            strokeWidth: 1,
            strokeOpacity: 0.7,
            fillOpacity: 0.7
        },
        3: {
            strokeColor: "#CCCCCC",
            fillColor: "#86ED3D",
            strokeWidth: 1,
            strokeOpacity: 0.7,
            fillOpacity: 0.7
        },
        4: {
            strokeColor: "#CCCCCC",
            fillColor: "#44E214",
            strokeWidth: 1,
            strokeOpacity: 0.7,
            fillOpacity: 0.7
        },
        5: {
            strokeColor: "#CCCCCC",
            fillColor: "#3DCC41",
            strokeWidth: 1,
            strokeOpacity: 0.7,
            fillOpacity: 0.7
        },
        6: {
            strokeColor: "#CCCCCC",
            fillColor: "#3AB272",
            strokeWidth: 1,
            strokeOpacity: 0.7,
            fillOpacity: 0.7
        },
        7: {
            strokeColor: "#CCCCCC",
            fillColor: "#33A587",
            strokeWidth: 1,
            strokeOpacity: 0.7,
            fillOpacity: 0.7
        },
        8: {
            strokeColor: "#CCCCCC",
            fillColor: "#26999B",
            strokeWidth: 1,
            strokeOpacity: 0.7,
            fillOpacity: 0.7
        },
        9: {
            strokeColor: "#CCCCCC",
            fillColor: "#1A8CA8",
            strokeWidth: 1,
            strokeOpacity: 0.7,
            fillOpacity: 0.7
        },
        10: {
            strokeColor: "#CCCCCC",
            fillColor: "#2073A0",
            strokeWidth: 1,
            strokeOpacity: 0.7,
            fillOpacity: 0.7
        },
        11: {
            strokeColor: "#CCCCCC",
            fillColor: "#215D99",
            strokeWidth: 1,
            strokeOpacity: 0.7,
            fillOpacity: 0.7
        },
        12: {
            strokeColor: "#CCCCCC",
            fillColor: "#1F4991",
            strokeWidth: 1,
            strokeOpacity: 0.7,
            fillOpacity: 0.7
        },
        13: {
            strokeColor: "#CCCCCC",
            fillColor: "#1C3689",
            strokeWidth: 1,
            strokeOpacity: 0.7,
            fillOpacity: 0.7
        },
        14: {
            strokeColor: "#CCCCCC",
            fillColor: "#15227F",
            strokeWidth: 1,
            strokeOpacity: 0.7,
            fillOpacity: 0.7
        },
        15: {
            strokeColor: "#CCCCCC",
            fillColor: "#0D1077",
            strokeWidth: 1,
            strokeOpacity: 0.7,
            fillOpacity: 0.7
        }
    };

    var symbolsLookup_coa = {
        0: {
            strokeColor: "#CCCCCC",
            fillColor: "#ffffff",
            strokeWidth: 1,
            strokeOpacity: 1,
            fillOpacity: 0
        },
        1: {
            strokeColor: "#CCCCCC",
            fillColor: "#FFFFBF",
            strokeWidth: 1,
            strokeOpacity: 0.7,
            fillOpacity: 0.7
        },
        2: {
            strokeColor: "#CCCCCC",
            fillColor: "#E6EBAB",
            strokeWidth: 1,
            strokeOpacity: 0.7,
            fillOpacity: 0.7
        },
        3: {
            strokeColor: "#CCCCCC",
            fillColor: "#CDD898",
            strokeWidth: 1,
            strokeOpacity: 0.7,
            fillOpacity: 0.7
        },
        4: {
            strokeColor: "#CCCCCC",
            fillColor: "#B5C584",
            strokeWidth: 1,
            strokeOpacity: 0.7,
            fillOpacity: 0.7
        },
        5: {
            strokeColor: "#CCCCCC",
            fillColor: "#9CB171",
            strokeWidth: 1,
            strokeOpacity: 0.7,
            fillOpacity: 0.7
        },
        6: {
            strokeColor: "#CCCCCC",
            fillColor: "#849E5D",
            strokeWidth: 1,
            strokeOpacity: 0.7,
            fillOpacity: 0.7
        },
        7: {
            strokeColor: "#CCCCCC",
            fillColor: "#6B8B4A",
            strokeWidth: 1,
            strokeOpacity: 0.7,
            fillOpacity: 0.7
        },
        8: {
            strokeColor: "#CCCCCC",
            fillColor: "#537736",
            strokeWidth: 1,
            strokeOpacity: 0.7,
            fillOpacity: 0.7
        },
        9: {
            strokeColor: "#CCCCCC",
            fillColor: "#3A6423",
            strokeWidth: 1,
            strokeOpacity: 0.7,
            fillOpacity: 0.7
        },
        10: {
            strokeColor: "#CCCCCC",
            fillColor: "#225110",
            strokeWidth: 1,
            strokeOpacity: 0.7,
            fillOpacity: 0.7
        },
        11: {
            strokeColor: "#CCCCCC",
            fillColor: "#225110",
            strokeWidth: 1,
            strokeOpacity: 0.7,
            fillOpacity: 0.7
        }
    };



    symbolsLookup["0"].fillColor = "#ffffff";

    resultsStyleMap.addUniqueValueRules('default', 'threat', symbolsLookup);
    resultsStyleMap_model.addUniqueValueRules('default', 'threat', symbolsLookup_model);
    resultsStyleMap_coa.addUniqueValueRules('default', 'threat', symbolsLookup_coa);

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

    var coa_map = new OpenLayers.Layer.Vector("COA Map", {
        displayInLayerSwitcher: false,
        isBaseLayer: false,
        projection: proj_4326,
        styleMap: resultsStyleMap_coa,
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
    console.log(HOST_NAME + 'js/threat_sv2dt.csv');
    $.ajax({
        type: "GET",
        url: HOST_NAME + 'js/threat_sv2dt.csv',
        dataType: "text"
    }).done(function(data) {
        // console.log(data);
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
        coa_map.addFeatures(geojson_format.read(data));
        coa_map.setVisibility(false);
    });



    // map.addLayers([individual, composite, results, nonelayer, highlightLayer, ncbounds, ecoregions, counties, ncbcr, nchuc6, nchuc12,
    //     nchuc10, nchuc8, nchuc6_lbl,
    //     nchuc12_lbl, nchuc10_lbl, nchuc8_lbl, counties_lbl,
    //     osm, hillshade, counties_base
    // ]);

    map.addLayers([highlightLayer,individual, composite, coa_map, nonelayer,
        nchuc10, nchuc8, nchuc6, se_manage, ncwrc_priorities, ncwrc_basins, counties, ncbcr, ncbounds, ecoregions,
        osm, satellite, bounds_base, results
    ]);

    //////////////////////////////////////////////////////////////////////////
    // add controls
    //////////////////////////////////////////////////////////////////////////
    function console_on_zoom() {
        console.log("resolution is", map.getResolution());
        console.log("scale is", map.getScale());
        console.log("zoom is", map.getZoom());
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
        console.log(mode);
        console.log(button_toolbar1.pressed);
        console.log(combo.value);
        var form_vals = {};

        if (button_toolbar1.pressed) {
            if (combo.value === 2) {
                form_vals = get_model_selections();
                if (form_vals === false) {
                    return;
                }
            }
            console.log(form_vals);
            console.log("query");
            lonlat = map.getLonLatFromViewPortPx(e.xy);
            console.log(keycode);
            form_vals.pt_lon = lonlat.lon;
            form_vals.pt_lat = lonlat.lat;
            form_vals.qry = combo.value;
            form_vals.community = keycode;
            // var form_vals = {
            //     pt_lon: lonlat.lon,
            //     pt_lat: lonlat.lat,
            //     qry: combo.value,
            //     community: keycode
            // }
            var qry_str = $.param(form_vals);
            // var url = SERVER_URI + 'wps/report?' + qry_str;
            var url = SERVER_URI + "wps/qry_tool?" + qry_str;
            // if (true) {strWindowFeatures
            console.log(url);
            var strWindowFeatures = "menubar=no,location=no,width=700,height=500,scrollbars=yes,resizable=yes";
            var myWindow = window.open(url, "win1", strWindowFeatures);
            myWindow.focus();

            return;
        }

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
        } else if (mode.indexOf("ptbuffer") !== -1) {
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
        } else if (mode.indexOf("coa") !== -1) {
            console.log("coa");
            lonlat = map.getLonLatFromViewPortPx(e.xy);
            $.ajax({
                type: "GET",
                url: SERVER_URI + "wps/pttojson",
                data: {
                    pt_lon: lonlat.lon,
                    pt_lat: lonlat.lat,
                    qry_lyr: 'huc_12'
                },
                dataType: "json"
            }).done(function(data, textStatus, jqXHR) {
                if (jqXHR.status === 200) {
                    console.log(data);
                    showInfo2(data, "coa");
                }
            });

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
                    showInfo2(data, "aoi");
                }
            });

        }

    }

    var selected_hucs = {};

    //function to outline selected predefined areas of interest
    // if coa mode then use to create a batch aoi
    function showInfo2(evt, lyr) {
        if (evt.the_geom) {
            console.log(evt);
            // for (var i = 0; i < evt.features.length; i++) {
            //if selected feature is on then remove it
            if (lyr == 'aoi') {
                console.log(lyr);
                console.log(selected_hucs);
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
            } else {
                console.log(batch);
                console.log(evt.the_huc);
                var huc12list = Object.keys(batch);
                console.log(huc12list);
                var newkey = huc12list.indexOf(evt.the_huc);
                if (newkey != -1) {
                    huc12list.splice(newkey, 1);
                } else {
                    huc12list.push(evt.the_huc);
                }
                console.log(huc12list);
                var top_five_update = [];
                for (var i = 0; i < huc12list.length; i++) {
                    top_five_update.push([huc12list[i], 0]);

                }
                save_coa(top_five_update);



            }

        }
    }

    var click = new OpenLayers.Control.Click();
    map.addControl(click);
    // click.deactivate();



    var new_selection = function() {
        var mode = formPanel2.getComponent('rg1').getValue().inputValue;
        console.log(mode);
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
            click.activate();
            highlightLayer.destroyFeatures();
            selected_hucs = {};
        } else if (mode.indexOf("coa") !== -1) {
            click.activate();
            highlightLayer.destroyFeatures();
            selected_hucs = {};
        }

    };

    var remove_action = function() {
        resource = SERVER_URI + "wps/0";
        batch_aoi = false;
        batch_resource = {};
        new_selection();
        map.zoomToExtent(map_extent);
        var vis_lyrs = [counties, ncbcr, nchuc6,
            nchuc10, nchuc8, results
        ];
        for (var i = 0; i < vis_lyrs.length; i++) {
            vis_lyrs[i].setVisibility(false);
        }
        click.deactivate();
    };

    function getResource(url) {
        var handler = function() {
            window.open(url);
        };
        return handler;
    }

    var onExecuted = function(aoi) {
        console.log("on executed");
        var geojson_format = new OpenLayers.Format.GeoJSON({
            'internalProjection': new OpenLayers.Projection("EPSG:900913"),
            'externalProjection': new OpenLayers.Projection("EPSG:4326")
        });
        if (!batch_aoi) {
            results.removeAllFeatures();
        }
        // console.log(aoi);
        results.addFeatures(geojson_format.read(aoi));
        results.setVisibility(true);
    };

    ////////////////////////////////////////////////////////
    //if hash in url use to load AOI
    ///////////////////////////////////////////////////

    // if sinlge aoi
    if (window.location.hash.slice(1).length !== 0) {
        var hash = window.location.hash;
        if (hash.indexOf("_") == -1) {
            resource = SERVER_URI + 'wps/' + hash.slice(1);
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
            // if batch resource
        } else {
            resource = SERVER_URI + 'wps/' + hash.slice(1).replace("_", "/");
            $.ajax({
                type: "GET",
                url: resource + '/saved',
                dataType: "json"
            }).done(function(data) {
                console.log(data);
                var geojson_format = new OpenLayers.Format.GeoJSON({
                    'internalProjection': new OpenLayers.Projection("EPSG:900913"),
                    'externalProjection': new OpenLayers.Projection("EPSG:4326")
                });
                results.removeAllFeatures();
                for (var i = 0; i < data.geojson.length; i++) {
                    var aoi = data.geojson[i];
                    results.addFeatures(geojson_format.read(aoi));
                }
                results.setVisibility(true);
                batch_aoi = true;
                batch_resource = data.resource;
            });
        }

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
                var htmlseg_lgd = "<svg height=\"230\" width=\"220\">" + $('#lgnddiv').html() + "</svg>";
                var ht = $('#ncthreatsMapPanel .olMap').height();
                var wd = $('#ncthreatsMapPanel .olMap').width();
                var start_tag = '<div style="width: ' + wd +
                    'px; height: ' + ht + 'px;">';
                var end_tag = '</div>';
                var pdf_hdr = "<h3>" + form_vals.comment + "</h3>";
                // var is_composite = composite.getVisibility();
                // var is_indiv = individual.getVisibility();
                htmlseg = start_tag + htmlseg + end_tag;
                $.ajax({
                    type: "POST",
                    url: SERVER_URI + "wps/pdf",
                    data: {
                        htmlseg: pdf_hdr + htmlseg,
                        indiv_layer: indiv_layer,
                        text: form_vals.comment,
                        htmlseg_lgd: htmlseg_lgd,
                        legend_print: legend_print
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
                    // nchuc6_lbl.setVisibility(true);
                    break;
                case 'NC River Subbasins':
                    // query_ctl.layers = [nchuc8_qry];
                    col_name = "huc8";
                    nchuc8.setVisibility(true);
                    // nchuc8_lbl.setVisibility(true);
                    break;
                case 'NC Watersheds':
                    // query_ctl.layers = [nchuc10_qry];
                    col_name = "huc10";
                    nchuc10.setVisibility(true);
                    // nchuc10_lbl.setVisibility(true);
                    break;
                case 'NC Counties':
                    // query_ctl.layers = [counties_qry];
                    col_name = "co_num";
                    counties.setVisibility(true);
                    // counties_lbl.setVisibility(true);
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

    var save_action = function() {
        if (batch_aoi === false) {
            save_action_resource();
        } else {
            save_action_batch();
        }
    };

    var show_batch = function(resources) {
        console.log(resources);
        // var qry_str = $.param(resources);
        $.ajax({
            type: "POST",
            url: SERVER_URI + "wps/batch",
            data: resources,
            dataType: "json"
        }).done(function(data, textStatus, jqXHR) {
            resource = jqXHR.getResponseHeader('Location');
            aoi_to_file = getResource(resource);
            console.log(resource);
            Ext.getCmp("resource_btn").setHandler(aoi_to_file);
            // onExecuted(data.geojson);
            // var extent = new OpenLayers.Bounds(
            //     data.extent).transform(proj_4326, proj_900913);
            // map.zoomToExtent(extent);
        });
        batch_resource = resources;
        // Ext.Msg.alert("Batch file resources created.");
    };


    var save_action_batch = function() {
        console.log("save action batch");
        // var gml;
        batch = {};
        var aois_done = 0;
        console.log("code for batch ");
        console.log(highlightLayer.features.length);
        var gml_writer = new OpenLayers.Format.GML.v3({
            featureType: 'MultiPolygon',
            featureNS: 'http://jimserver.net/',
            geometryName: 'aoi',
            'internalProjection': new OpenLayers.Projection("EPSG:900913"),
            'externalProjection': new OpenLayers.Projection("EPSG:4326")
        });
        // function uses closure
        // adds to batch object
        var done_fn = function(aoi_name) {
            var handler = function(data, textStatus, jqXHR) {
                onExecuted(data.geojson);
                resource = jqXHR.getResponseHeader('Location');
                aoi_to_file = getResource(resource);
                // console.log(resource);
                batch[aoi_name] = resource;
                // console.log(batch);
                // console.log(++aois_done);
                if (++aois_done === highlightLayer.features.length) {
                    $('body').toggleClass('waiting');
                    show_batch(batch);
                } else {
                    batch_util_fn(highlightLayer.features[aois_done]);
                }
            };
            return handler;
        };

        var batch_util_fn = function(feature) {
            if (feature.attributes.Name) {
                var aoi_name = feature.attributes.Name;
            } else if (feature.attributes.name) {
                var aoi_name = feature.attributes.name;
            } else {
                var aoi_name = feature.attributes.NAME;
            }
            console.log(aoi_name);

            var gml = '';
            gml = gml_writer.write(feature);
            var aoi_list = [];
            // var selected_predef_new = 'na';
            // var point_buffer = {};
            var post_data = {
                gml: gml,
                // aoi_list: aoi_list.join(":"),
                aoi_list: '',
                predef_type: '',
                sel_type: 'custom',
                point_buffer: {}
            };
            console.log(post_data);

            // need to use closure to create batch dict

            $.ajax({
                type: "POST",
                url: SERVER_URI + "wps",
                data: post_data,
                dataType: "json"
            }).done(done_fn(aoi_name));
        };
        batch_util_fn(highlightLayer.features[0]);
        $('body').toggleClass('waiting');

    };

    //function to submit defined area
    var save_action_resource = function() {
        var selected_predef = formPanel2.getForm().getValues().predef_selection;
        var sel_type = formPanel2.getForm().getValues().aoi_type;
        var ptradius = formPanel2.getForm().getValues().bufferkm;
        console.log(ptradius);
        if (isNaN(ptradius)) {
            ptradius = 3;
        }
        if (parseFloat(ptradius) < 3.0) {
            ptradius = 3;
        }
        if (parseFloat(ptradius) > 50.0) {
            ptradius = 50;
        }

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
        console.log(post_data);

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
            console.log(data.extent);
            var extent = new OpenLayers.Bounds(
                data.extent).transform(proj_4326, proj_900913);
            map.zoomToExtent(extent);
        });
    };
    var threat_calcs_report;
    var threat_calcs_report_batch;
    var threat_calcs_report_indiv;
    var threat_calcs_report_indiv_batch;
    var indiv_layer;
    // new aoi panel
    var formPanel2 = new Ext.form.FormPanel({
        title: "AOI creation",
        width: 296,
        height: 600,
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
                    boxLabel: 'update COA subwatersheds<br>Click on map to select/deselect',
                    name: 'aoi_type',
                    inputValue: 'coa',
                    checked: false
                }, {
                    boxLabel: 'custom polygon<br>Click on map to create ' +
                        'polygon, then Submit:',
                    name: 'aoi_type',
                    inputValue: 'custom',
                    id: 'custom_radio_sel'
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
                        boxLabel: 'custom point buffer<br>Enter buffer radius in km (3-50),<br>click on map, then submit:',
                        name: 'aoi_type',
                        inputValue: 'ptbuffer'
                    }, {
                        xtype: 'textfield',
                        name: 'bufferkm',
                        width: 50,
                        value: '3'

                    }]
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
                height: 300,
                defaults: {
                    // margins: '10 0 10 0'
                    margins: '5 0 5 0'
                },
                items: [{
                        xtype: 'box',
                        width: 200,
                        autoEl: {
                            tag: 'hr'
                        },
                        margins: '0 0 20 0'
                    }, {
                        xtype: 'button',
                        width: 80,
                        text: 'Submit',
                        handler: save_action,


                    }, {
                        xtype: 'box',
                        width: 200,
                        autoEl: {
                            tag: 'hr'
                        }
                    }, {
                        // width: 2,
                        xtype: 'container',
                        // width: 200,
                        autoEl: 'div',
                        cls: 'mycontent',
                        html: "<p>View Report of AOI:<br><br></p>"
                    }, {
                        xtype: 'button',
                        text: 'Report',
                        width: 80,
                        handler: function() {
                            console.log(batch_resource);
                            console.log(Object.keys(batch_resource).length);
                            var is_composite = composite.getVisibility();
                            var is_indiv = individual.getVisibility();
                            // if (Object.keys(batch_resource).length > 0 && is_composite) {
                            //     threat_calcs_map();
                            //     threat_calcs_report_batch();

                            // } else if (Object.keys(batch_resource).length > 0) {
                            //     console.log(batch_resource);
                            //     threat_calcs_report_indiv_batch(indiv_layer);
                            if (is_composite) {
                                threat_calcs_map();
                                threat_calcs_report();
                            } else if (is_indiv) {
                                // console.log(indiv_layer);
                                threat_calcs_report_indiv(indiv_layer);

                            } else {
                                console.log("no map");
                                Ext.Msg.show({
                                    msg: "A threat model has not been submitted. Return to analyze tab to select and run a threat model.",
                                    width: 200
                                });
                            }
                        },
                    }, {
                        xtype: 'button',
                        width: 80,
                        text: 'Spreadsheet',
                        handler: function() {
                            console.log(batch_resource);
                            console.log(Object.keys(batch_resource).length);
                            var is_composite = composite.getVisibility();
                            var is_indiv = individual.getVisibility();
                            // if (Object.keys(batch_resource).length > 0 && is_composite) {
                            //     threat_calcs_map();
                            //     threat_calcs_report_batch();

                            // } else if (Object.keys(batch_resource).length > 0) {
                            //     console.log(batch_resource);
                            //     threat_calcs_report_indiv_batch(indiv_layer);
                            if (is_composite) {
                                // threat_calcs_map();
                                threat_calcs_report("ssheet1");
                                console.log("is_composite ss1");
                            } else if (is_indiv) {
                                // console.log(indiv_layer);
                                // threat_calcs_report_indiv(indiv_layer);
                                console.log("is_indiv ss1");

                            } else {
                                console.log("no map");
                                Ext.Msg.show({
                                    msg: "A threat model has not been submitted. Return to analyze tab to select and run a threat model.",
                                    width: 200
                                });
                            }
                        }
                    },
                    // {
                    //     xtype: 'button',
                    //     width: 80,
                    //     text: 'SS2',
                    //     handler: function() {
                    //         console.log(batch_resource);
                    //         console.log(Object.keys(batch_resource).length);
                    //         var is_composite = composite.getVisibility();
                    //         var is_indiv = individual.getVisibility();

                    //         if (is_composite) {
                    //             // threat_calcs_map();
                    //             // threat_calcs_report();
                    //             threat_calcs_report("ssheet2");
                    //             console.log("is_composite ss2");
                    //         } else if (is_indiv) {
                    //             // console.log(indiv_layer);
                    //             // threat_calcs_report_indiv(indiv_layer);
                    //             console.log("is_indiv ss2");


                    //         } else {
                    //             console.log("no map");
                    //         }
                    //     }
                    // },
                    {
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
        legend_print = "model";


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
            console.log(data);

            for (var key in data.res_arr) {
                thrt = data.res_arr[key][results_col];
                // console.log(thrt);
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
            coa_map.setVisibility(false);
            individual.setVisibility(false);
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
            $('#lgdimg').attr("src", "images/threat_legend.png");

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

    threat_calcs_report_indiv_batch = function(lyrdesc) {
        console.log(lyrdesc);

        var qry_str = $.param(lyrdesc);
        var url = resource + '/report_indiv?' + qry_str;
        console.log(url);
        window.open(url);
    };

    var get_model_selections = function() {
        console.log("running get_model_selections");
        var form_vals_paneltop = modelpaneltop.getForm().getValues();

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
            // console.log(includes_list[x]);
            if (includes_list[x] !== 'notinclude') {
                submit_form = true;
            }
        }

        if (submit_form === true) {
            console.log(form_vals);
            return form_vals;
        } else {
            console.log("testing");
            return false;
        }
    }

    // function to submit model report
    threat_calcs_report = function(report_form) {
        console.log(report_form);

        if (report_form !== 'ssheet1' && report_form !== 'ssheet2') {
            report_form = 'report'
        }

        console.log(report_form);
        // var form_vals_hab = habitat_panel.getForm().getValues();
        // var form_vals_year = modelpaneltop.getForm().getValues();
        // var form_vals_misc = modelpanelmid.getForm().getValues();

        var form_vals_paneltop = modelpaneltop.getForm().getValues();
        console.log(form_vals_paneltop);

        var form_vals = get_model_selections();


        if (form_vals !== false) {
            var reg_com = '';
            var region = "";
            var aoi_mode = formPanel2.getComponent('rg1').getValue().inputValue;

            reg_com = $("input[name=reg_com]:checked").val();
            console.log(reg_com);
            console.log(Number.isNaN(coastalpage.lastSize.height));
            if (coastalpage.lastSize.height !== undefined) {
                region = "Coastal_Plain";
            } else if (sandhillsspage.lastSize.height !== undefined) {
                region = "Sandhills";
            } else if (piedmontpage.lastSize.height !== undefined) {
                region = "Piedmont";
            } else if (mountainspage.lastSize.height !== undefined) {
                region = "Mountains";
            }

            form_vals['aoi_mode'] = aoi_mode;
            form_vals['reg_com'] = reg_com;
            form_vals['region'] = region;

            var qry_str = $.param(form_vals);
            // var url = SERVER_URI + 'wps/report?' + qry_str;
            var url = resource + '/' + report_form + '?' + qry_str;
            if (report_form === "report") {
                // if (true) {
                console.log(url);
                window.open(url);
            } else if (report_form.indexOf("ssheet" != -1)) {
                $.ajax({
                    url: url,
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
            }

        } else {
            // alert("no factors included");
            Ext.Msg.show({
                msg: "A threat model has not been submitted. Select  a threat model.",
                width: 200
            });
        }
        // var threat_calcs_ssheet = function() {

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

    };

    var limit_defaults = {
        frst: "10",
        ftwt: "10",
        open: "10",
        hbwt: "5",
        shrb: "10",
        urbangrth: "30",
        firesup: "50",
        hiway: "10",
        slr_up: "5",
        slr_lc: "1",
        triassic: "20",
        wind: "2.0",
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
        // var limit;
        // for (limit in limit_defaults) {
        //     console.log(limit);
        //     $("#" + limit + "_limit").val(limit_defaults[limit]);
        //     $("#" + limit + "_default").html(limit_defaults[limit]);
        //     // $("#" + limit + " option:selected").val(limit_defaults[limit]);

        // }
        $.get("js/thrt_limits.json", function(data) {
            console.log(data[0]);
            for (var i = 0; i < data.length; i++) {
                var thtname = data[i].ThreatName;
                var thtdt = data[i].DTLimit;
                var thtsv = data[i].SVLimit;
                var thtsv_sldr = thtsv * 10;
                $("#" + thtname + "_limit").val(thtdt);
                $("#" + thtname + "_limit_sv").val(thtsv);
                $("#" + thtname + "_limit_sv_sldr").val(thtsv_sldr);
            }
        });
    };

    // create lookup for slider to set dt values
    // in fn model_script
    var sv2dt_dict = {}
    $.get("js/threat_sv2dt.json", function(data) {
        for (var i = 0; i < data.length; i++) {
            var thrt = data[i].sv;
            sv2dt_dict[thrt] = {
                "0": data[i]['0'],
                "1": data[i]['0.1'],
                "2": data[i]['0.2'],
                "3": data[i]['0.3'],
                "4": data[i]['0.4'],
                "5": data[i]['0.5'],
                "6": data[i]['0.6'],
                "7": data[i]['0.7'],
                "8": data[i]['0.8'],
                "9": data[i]['0.9'],
                "10": data[i]['1']
            }
        }
    });

    var change_images = function() {

        var form_vals_paneltop = modelpaneltop.getForm().getValues();
        console.log(form_vals_paneltop);
        var year = form_vals_paneltop.year.substring(2, 4);
        console.log(year);
        console.log("images/HabFrstX" + year + "_360.png");
        $("#modelparams1 > img").attr("src", "images/HabFrstX" + year + "_360.png");
        console.log("images/HabFtwtX" + year + "_360.png");
        $("#modelparams2 > img").attr("src", "images/HabFtwtX" + year + "_360.png");
        console.log("images/HabOpenX" + year + "_360.png");
        $("#modelparams3 > img").attr("src", "images/HabOpenX" + year + "_360.png");
        console.log("images/HabHbwtX" + year + "_360.png");
        $("#modelparams4 > img").attr("src", "images/HabHbwtX" + year + "_360.png");
        console.log("images/HabShrbX" + year + "_360.png");
        $("#modelparams5 > img").attr("src", "images/HabShrbX" + year + "_360.png");
        console.log("images/Urb" + year + "_360.png");
        $("#modelparams6 > img").attr("src", "images/Urb" + year + "_360.png");
        console.log("images/FSupp" + year + "_360.png");
        $("#modelparams7 > img").attr("src", "images/FSupp" + year + "_360.png");
        console.log("images/DCLRds" + year + "_360.png");
        $("#modelparams8 > img").attr("src", "images/DCLRds" + year + "_360.png");
        console.log("images/SlammUP" + year + "_360.png");
        $("#modelparams9 > img").attr("src", "images/SlammUP" + year + "_360.png");
        console.log("images/SlammLC" + year + "_360.png");
        $("#modelparams10 > img").attr("src", "images/SlammLC" + year + "_360.png");

    }

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
            html: "<h2>Analyze Multiple Threats to Wildlife Habitat</h2><p>Set a target year. Include threat data for analysis. Set threat rank lower limit. Click submit button to view resultant maps and report (scroll down).</p>"
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
            itemId: "cmb2",
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
                'select': change_images
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
        border: false,
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
            text: "Submit",
            handler: threat_calcs_map
        }]

    });
    var modelpanelbot = new Ext.Panel({
        title: "",
        width: 280,
        height: 0,
        border: false,
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
            text: "Submit",
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
        energydev: "Triassic Basin (%)",
        "water:bioimplen": "Biota Impairments? (km*stream density)",
        "water:metimplen": "Metal Impariments? (km*stream density)",
        "water:NID": "Number of Dams (n)",
        wind: "Wind Power Class? (mean)",
        slr_lc: "Terrestrial Landcover Loss? Since 2000 (%)",
        slr_up: "Undeveloped Upland Loss? Since 2000 (%)"

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
            coa_map.setVisibility(false);
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
            coa_map.setVisibility(false);
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
    var batch;

    /*
    function takes list of form huc12, thrt
    creates batch resource and displays

    */

    var save_wrc_priorities = function(huc12s) {
        console.log(huc12s);
        batch = {};
        var huc12;
        var post_data;
        results.removeAllFeatures();

        // closure to catch correct huc12 name
        var done_fn = function(aoi_name, cnt) {
            var handler = function(data, textStatus, jqXHR) {
                batch_aoi = true;
                onExecuted(data.geojson);
                resource = jqXHR.getResponseHeader('Location');
                aoi_to_file = getResource(resource);
                batch[aoi_name] = resource;
                // console.log(batch);

            };
            return handler;
        };

        for (var cnt = 0; cnt < huc12s.length; cnt++) {
            huc12 = huc12s[cnt];
            console.log(huc12.length);
            post_data = {
                gml: '',
                aoi_list: huc12,
                predef_type: 'HUC',
                sel_type: 'predefined',
                ptradius: 3
            };
            // console.log(post_data);

            $.ajax({
                type: "POST",
                url: SERVER_URI + "wps",
                data: post_data,
                dataType: "json"
            }).done(done_fn(huc12, cnt));
        }

    }

    var save_coa = function(top_five) {
        console.log(top_five);
        // resource = jqXHR.getResponseHeader('Location');
        // aoi_to_file = getResource(resource);
        // // console.log(resource);
        // batch[aoi_name] = resource;
        batch = {};
        var huc12;
        var post_data;
        results.removeAllFeatures();

        // closure to catch correct huc12 name
        var done_fn = function(aoi_name, cnt) {
            var handler = function(data, textStatus, jqXHR) {
                batch_aoi = true;
                onExecuted(data.geojson);
                resource = jqXHR.getResponseHeader('Location');
                aoi_to_file = getResource(resource);
                // console.log(resource);
                batch[aoi_name] = resource;
                // console.log(batch);
                // if (cnt == 4) {
                //     show_batch(batch);
                // }

                // console.log(++aois_done);
                // if (++aois_done === highlightLayer.features.length) {
                //     $('body').toggleClass('waiting');
                //     show_batch(batch);
                // } else {
                //     batch_util_fn(highlightLayer.features[aois_done]);
                // }
            };
            return handler;
        };

        for (var cnt = 0; cnt < top_five.length; cnt++) {
            huc12 = top_five[cnt][0];
            console.log(huc12);
            post_data = {
                gml: '',
                aoi_list: huc12,
                predef_type: 'HUC',
                sel_type: 'predefined',
                ptradius: 3
            };
            // console.log(post_data);

            $.ajax({
                type: "POST",
                url: SERVER_URI + "wps",
                data: post_data,
                dataType: "json"
            }).done(done_fn(huc12, cnt));
        }
    }

    var coa_model = function() {
        console.log(batch);
        show_batch(batch);
        modelpaneltop.getComponent("cmb2").setValue("50");
        var data_extent;
        var tbl = 'coa';
        if (coastalpage.lastSize.height !== undefined) {
            data_extent = [-80.18, 33.68, -75.2, 36.67];
        } else if (sandhillsspage.lastSize.height !== undefined) {
            data_extent = [-80.21, 34.72, -78.71, 35.6];
        } else if (piedmontpage.lastSize.height !== undefined) {
            data_extent = [-82.44, 34.74, -77.53, 36.67];
        } else if (mountainspage.lastSize.height !== undefined) {
            data_extent = [-84.47, 34.88, -80.67, 36.67];
        }else if (basinspage.lastSize.height !== undefined) {
            data_extent = [-84.47, 33.7, -75.2, 36.67];
            tbl = 'basins';
        }
        console.log(data_extent);

        var extent = new OpenLayers.Bounds(
            data_extent).transform(proj_4326, proj_900913);
        map.zoomToExtent(extent);


        document.getElementById('frst_chk').checked = true;
        left.setActiveTab(2);

        var post_data = {
            keycode: keycode,
            tbl: tbl
        }
        $.ajax({
            type: "POST",
            url: SERVER_URI + "wps/coa_model",
            data: post_data,
            dataType: "json"
        }).done(function(data) {
            console.log(data.row);
            if (data.row.habfrst === 1) {
                document.getElementById('frst_chk').checked = true;
            } else {
                document.getElementById('frst_chk').checked = false;
            }
            if (data.row.habftwt === 1) {
                document.getElementById('ftwt_chk').checked = true;
            } else {
                document.getElementById('ftwt_chk').checked = false;
            }
            if (data.row.habhbwt === 1) {
                document.getElementById('hbwt_chk').checked = true;
            } else {
                document.getElementById('hbwt_chk').checked = false;
            }
            if (data.row.habopen === 1) {
                document.getElementById('open_chk').checked = true;
            } else {
                document.getElementById('open_chk').checked = false;
            }
            if (data.row.habshrb === 1) {
                document.getElementById('shrb_chk').checked = true;
            } else {
                document.getElementById('shrb_chk').checked = false;
            }
            if (data.row.urban === 1) {
                document.getElementById('urbangrth_chk').checked = true;
            } else {
                document.getElementById('urbangrth_chk').checked = false;
            }
            if (data.row.fsupp === 1) {
                document.getElementById('firesup_chk').checked = true;
            } else {
                document.getElementById('firesup_chk').checked = false;
            }
            if (data.row.dclrds === 1) {
                document.getElementById('hiway_chk').checked = true;
            } else {
                document.getElementById('hiway_chk').checked = false;
            }
            if (data.row.slrup === 1) {
                document.getElementById('slr_up_chk').checked = true;
            } else {
                document.getElementById('slr_up_chk').checked = false;
            }
            if (data.row.slrlc === 1) {
                document.getElementById('slr_lc_chk').checked = true;
            } else {
                document.getElementById('slr_lc_chk').checked = false;
            }
            if (data.row.triassic === 1) {
                document.getElementById('triassic_chk').checked = true;
            } else {
                document.getElementById('triassic_chk').checked = false;
            }
            if (data.row.wpc === 1) {
                document.getElementById('wind_chk').checked = true;
            } else {
                document.getElementById('wind_chk').checked = false;
            }
            if (data.row.manu === 1) {
                document.getElementById('manure_chk').checked = true;
            } else {
                document.getElementById('manure_chk').checked = false;
            }
            if (data.row.fert === 1) {
                document.getElementById('nitrofrt_chk').checked = true;
            } else {
                document.getElementById('nitrofrt_chk').checked = false;
            }
            if (data.row.tdnt === 1) {
                document.getElementById('totnitro_chk').checked = true;
            } else {
                document.getElementById('totnitro_chk').checked = false;
            }
            if (data.row.tdst === 1) {
                document.getElementById('totsulf_chk').checked = true;
            } else {
                document.getElementById('totsulf_chk').checked = false;
            }
            if (data.row.fhlth === 1) {
                document.getElementById('insectdisease_chk').checked = true;
            } else {
                document.getElementById('insectdisease_chk').checked = false;
            }
            if (data.row.nid === 1) {
                document.getElementById('ndams_chk').checked = true;
            } else {
                document.getElementById('ndams_chk').checked = false;
            }
            if (data.row.bio === 1) {
                document.getElementById('impairbiota_chk').checked = true;
            } else {
                document.getElementById('impairbiota_chk').checked = false;
            }
            if (data.row.met === 1) {
                document.getElementById('impairmetal_chk').checked = true;
            } else {
                document.getElementById('impairmetal_chk').checked = false;
            }

        });
    }



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

    action = new Ext.Action({
        handler: function() {
            // save_coa(top_five);
            coa_model();

        },
        tooltip: "create aois for coa",
        iconCls: "coa_aois",
        allowDepress: true
    });

    var select_qry_layer = function(evt) {
        console.log("testing");
        console.log(evt.value);
        // console.log(combo);
    }

    // create the combo instance
    var combo = new Ext.form.ComboBox({
        typeAhead: true,
        triggerAction: 'all',
        lazyRender: true,
        mode: 'local',
        // value: 1,
        store: new Ext.data.ArrayStore({
            id: 0,
            fields: [
                'myId',
                'displayText'
            ],
            data: [
                [1, 'COA data'],
                [2, 'threat info'],
                [3, 'managed area']
            ]
        }),
        valueField: 'myId',
        displayField: 'displayText',
        listeners: {
            'select': select_qry_layer
        }
    });

    // actions.next = action;
    toolbarItems.push(combo);

    action = new Ext.Action({
        handler: function() {
            // save_coa(top_five);
            action.addCls()
        },
        tooltip: "create aois for coa",
        iconCls: "qry_tool",
        allowDepress: true
    });

    var button_toolbar1 = new Ext.Button({
        // text: "query",
        enableToggle: true,
        iconCls: "qry_tool",
        handler: function() {
            var test = this.pressed;
            console.log(test);
            if (this.pressed) {
                click.activate();
            } else {
                // click.deactivate();
            }

        }


    });
    // // actions.next = action;
    toolbarItems.push(button_toolbar1);
    toolbarItems.push("-");



    /////////////////////////////////////////////////
    // legend config
    //////////////////////////////////////////////////////

    var legend_panel = new Ext.Panel({
        // title: 'legend panel',
        cls: 'pages',
        autoScroll: true,
        id: "legendpnlid",
        html: "<svg id='lgnddiv'></svg><img id='lgdimg' style='display: none;' src='images/threat_legend.png'><h3>Layer Opacity</h3><input type='range' value='7' min='0' max='10' id='legend_opac_sldr' >"

    });
    // $("#legend_opac_sldr").change(function(e) {
    //     var test = $("#legend_opac_sldr").val();
    //     console.log(test);

    // });
    var float_win = new Ext.Window({
        title: "Legend ",
        height: 330,
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

    var store = new GeoExt.data.LayerStore({
        // map: map,
        layers: [counties, nchuc6, nchuc8, nchuc10, ncbcr, ecoregions, se_manage, ncwrc_priorities, ncwrc_basins, ncbounds]
    });

    var layerList12 = new GeoExt.tree.LayerContainer({
        layerStore: mapPanel.layers,
        text: 'Boundaries',
        leaf: false,
        expanded: true,
        layerStore: store

    });

    var tree = new Ext.tree.TreePanel({
        region: 'west',
        bodyStyle: "padding:10px; margin: 10px;",
        root: {
            nodeType: "async",
            children: [layerList9, layerList11, layerList12, layerList10

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
    var infowindow;
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
                myhref: 'http://tecumseh.zo.ncsu.edu/threats/pages/info_habitat.html',
                // iconCls: 'tree_image'

                // defined in file functions.js
                children: habitats
                    // hrefTarget: "infowindow",
                    // cls: "infowindow"
            }, {
                text: 'Urban Growth',
                qtip: 'more info',
                children: urban_tree,
                myhref: 'http://tecumseh.zo.ncsu.edu/threats/pages/info_urban.html'
                    // hrefTarget: "infowindow",
                    // cls: "infowindow"
            }, {
                text: 'Fire Suppression',
                qtip: 'more info',
                myhref: 'http://tecumseh.zo.ncsu.edu/threats/pages/info_firesupp.html',
                children: fire_tree
                    // hrefTarget: "infowindow",
                    // cls: "infowindow"
            }, {
                text: 'Transportation Corridors',
                qtip: 'more info',
                myhref: 'http://tecumseh.zo.ncsu.edu/threats/pages/info_trans_dcl.html',
                children: trans_tree
                    // hrefTarget: "infowindow",
                    // cls: "infowindow"
            }, {
                text: 'Nutrient Loading',
                expanded: false,
                qtip: 'more info',
                myhref: 'http://tecumseh.zo.ncsu.edu/threats/pages/info_nl.html',
                // hrefTarget: "infowindow",
                // cls: "infowindow",

                children: [{
                    text: 'Manure Application (2006)',
                    qtip: 'view data',
                    leaf: true,
                    myvalue: "nutrient:manu"
                }, {
                    text: 'Synthetic Nitrogen Fertilizer (2006)',
                    qtip: 'view data',
                    leaf: true,
                    myvalue: "nutrient:fert"
                }]
            }, {
                text: 'Annual Atmospheric Deposition',
                expanded: false,
                qtip: 'more info',
                myhref: 'http://tecumseh.zo.ncsu.edu/threats/pages/info_aad.html',
                // hrefTarget: "infowindow",
                // cls: "infowindow",
                children: [{
                    text: 'Total Nitrogen Deposition (2003)',
                    qtip: 'view data',
                    leaf: true,
                    myvalue: "nutrient:td_n_t"
                }, {
                    text: 'Total Sulfur Deposition (2006)',
                    qtip: 'view data',
                    leaf: true,
                    myvalue: "nutrient:td_s_t"
                }]
            }, {
                text: 'Hydrologic Alteration',
                expanded: false,
                qtip: 'more info',
                myhref: 'http://tecumseh.zo.ncsu.edu/threats/pages/info_nid.html',
                // hrefTarget: "infowindow",
                // cls: "infowindow",
                children: [{
                    text: 'Number of Dams (2013)',
                    qtip: 'view data',
                    leaf: true,
                    myvalue: "water:NID"
                }]
            }, {
                text: 'Forest Health',
                expanded: false,
                qtip: 'more info',
                myhref: 'http://tecumseh.zo.ncsu.edu/threats/pages/info_forest_health.html',
                // hrefTarget: "infowindow",
                // cls: "infowindow",
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
                myhref: 'http://tecumseh.zo.ncsu.edu/threats/pages/info_energy.html',
                // hrefTarget: "infowindow",
                // cls: "infowindow",
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
                myhref: 'http://tecumseh.zo.ncsu.edu/threats/pages/info_slr.html',
                // hrefTarget: "infowindow",
                // cls: "infowindow",
                expanded: false,
                children: [{
                    text: 'Undeveloped Upland Change',
                    qtip: 'more info',
                    myhref: 'http://tecumseh.zo.ncsu.edu/threats/pages/info_slr.html',
                    // hrefTarget: "infowindow",
                    // cls: "infowindow",
                    children: slr_up
                }, {
                    text: 'Terrestrial Landcover Change',
                    qtip: 'more info',
                    myhref: 'http://tecumseh.zo.ncsu.edu/threats/pages/info_slr.html',
                    // hrefTarget: "infowindow",
                    // cls: "infowindow",
                    children: slr_lc
                }]
            }, {
                text: 'Impaired Waters - 303(d)',
                qtip: 'more info',
                myhref: 'http://tecumseh.zo.ncsu.edu/threats/pages/info_imp_h2o.html',
                // hrefTarget: "infowindow",
                // cls: "infowindow",
                expanded: false,
                children: [{
                    text: 'Biota Impairments (2012)',
                    qtip: 'view data',
                    leaf: true,
                    myvalue: "water:bioimplen"

                }, {
                    text: 'Metal Impairments (2012)',
                    qtip: 'view data',
                    leaf: true,
                    myvalue: "water:metimplen"

                }]
            }]
        }),
        listeners: {
            click: function(n) {
                console.log(n);
                if (n.attributes.myhref) {
                    var strWindowFeatures = "height=400,width=400,top=100,left=300";
                    try {
                        infowindow.close();
                    } catch (e) {}
                    infowindow = window.open(n.attributes.myhref, '', strWindowFeatures);
                }
                // console.log(formPanelhuc12maps.getForm().getValues(true));
                if (n.attributes.myvalue) {

                    console.log(n.attributes.myvalue);
                    indiv_layer = n.attributes.myvalue;
                    legend_print = "individual";

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
        collapseFirst: true,
        layoutConfig: {
            // layout-specific configs go here
            titleCollapse: false,
            animate: true,
            activeOnTop: false
        },
        // area_tab2, area_tab,
        items: [area_tab, area_tab2]
    });
    // Ext.getCmp('aoi_upload_id').expand();
    // Ext.getCmp('aoi_create_id').collapse();

    ///////////////////////////////////////////////////////////

    var process_tab = new Ext.Panel({
        title: 'Analyze',
        //html: "some content",
        //        items: [modelpaneltop, habitat_panel, modelpanelmid, modelpanelbot],
        items: [modelmsg_panel, modelpaneltop, modelpanelmid, modelpage, modelpanelbot],
        cls: 'help',
        autoScroll: true
    });

    var print_tab = new Ext.Container({
        autoEl: 'div',
        title: 'Print',
        items: [formPanel],
        autoScroll: true
    });

    var mountainspage = new Ext.Panel({
        title: 'Mountains',
        cls: 'pages',
        autoScroll: true,
        id: "mountainspage",
        width: 280
    });
    var piedmontpage = new Ext.Panel({
        title: 'Piedmont',
        cls: 'pages',
        autoScroll: true,
        id: "piedmontpage",
        width: 280
    });
    var sandhillsspage = new Ext.Panel({
        title: 'Sandhills',
        cls: 'pages',
        autoScroll: true,
        id: "sandhillsspage",
        width: 280
    });
    var coastalpage = new Ext.Panel({
        title: 'Coastal Plain',
        cls: 'pages',
        autoScroll: true,
        id: "coastalpage",
        width: 280
    });

    var basinspage = new Ext.Panel({
        title: 'River Basin Priorities',
        cls: 'pages',
        autoScroll: true,
        id: "basinspage",
        width: 280
    });

    var coa_tab = new Ext.Panel({
        // title: 'COA',
        layout: 'accordion',
        region: 'center',
        defaults: {
            // applied to each contained panel
            //bodyStyle : 'padding:15px'
        },
        collapseFirst: true,
        layoutConfig: {
            // layout-specific configs go here
            titleCollapse: false,
            animate: true,
            activeOnTop: false
        },
        // area_tab2, area_tab,
        items: [coastalpage, sandhillsspage, piedmontpage, mountainspage, basinspage]
    });

    var coasmsg_top = new Ext.form.FormPanel({
        width: 296,
        height: 150,
        border: false,
        // autoEl: 'div',
        autoEl: 'div',
        cls: 'mycontent',
        region: 'north',
        // cls: 'mycontent',
        html: "<h2>Identify COAs</h2><p>Select a community below to rank the unprotectedness of associated SGCN  species predicted habitat by subwatershed.</p>",
        // cls: 'help',
        autoScroll: true,
        buttons: [{
            text: "Submit COAs for threat analysis",
            handler: coa_model
        }]
    });

    // this not used, except for ts
    // http://docs.sencha.com/extjs/4.2.1/extjs-build/examples/layout-browser/layout-browser.html
    var coa_tab2 = new Ext.Panel({
        title: 'COA',
        layout: 'border',
        //html: "some content",
        //        items: [modelpaneltop, habitat_panel, modelpanelmid, modelpanelbot],
        items: [coa_tab, coasmsg_top],
        // cls: 'help',
        autoScroll: true
    });

    var left = new Ext.TabPanel({
        region: 'west',
        width: 300,
        activeTab: 0,
        // accordion
        items: [coa_tab2, maps_tab, process_tab, aoi_tab, print_tab, layers_tab],
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
    Ext.getCmp('aoi_upload_id').collapse();
    Ext.getCmp('aoi_create_id').expand();

    // var test = mapPanel.getTopToolbar();
    // console.log(test);

    var panelid1 = Ext.get(area_tab.getEl().dom.children[0]).id;
    var panelid2 = Ext.get(area_tab2.getEl().dom.children[0]).id;
    // var panelid3 = Ext.get(process_tab.getEl().dom.children[0]).id;
    Ext.get(panelid1).applyStyles("background-image: url(images/dark-green-hd.gif)");
    Ext.get(panelid1).applyStyles("color: white");
    Ext.get(panelid2).applyStyles("background-image: url(images/dark-red-hd.gif)");
    Ext.get(panelid2).applyStyles("color: white");

    // mountainspage, piedmontpage, sandhillsspage, coastalpage

    var panelid3 = Ext.get(mountainspage.getEl().dom.children[0]).id;
    var panelid4 = Ext.get(piedmontpage.getEl().dom.children[0]).id;
    var panelid5 = Ext.get(sandhillsspage.getEl().dom.children[0]).id;
    var panelid6 = Ext.get(coastalpage.getEl().dom.children[0]).id;
    // var panelid3 = Ext.get(process_tab.getEl().dom.children[0]).id;
    Ext.get(panelid3).applyStyles("background-image: url(images/brown-hd.gif)");
    Ext.get(panelid3).applyStyles("color: white");
    Ext.get(panelid4).applyStyles("background-image: url(images/dark-green-hd.gif)");
    Ext.get(panelid4).applyStyles("color: white");

    // var panelid3 = Ext.get(process_tab.getEl().dom.children[0]).id;
    Ext.get(panelid5).applyStyles("background-image: url(images/dark-blue-hd.gif)");
    Ext.get(panelid5).applyStyles("color: white");
    Ext.get(panelid6).applyStyles("background-image: url(images/dark-red-hd.gif)");
    Ext.get(panelid6).applyStyles("color: white");
    // Ext.get(panelid3).applyStyles("background-image: url(/images/dark-blue-hd.gif)");
    // Ext.get(panelid3).applyStyles("color: white");

    ////////////////////////////////////////////////////////////////////////
    //start scripting for panel html pages
    ///////////////////////////////////////////////////////////////////////



    var page_script = function() {

        var shpTonchuc12 = function(shp, prj, shx, dbf) {
            // console.log(btn_id);
            formPanel2.getComponent('rg1').setValue('custom');
            var data;
            if (dbf === undefined) {
                data = {
                    shp: shp,
                    shx: shx,
                    prj: prj
                };
            } else {
                data = {
                    shp: shp,
                    shx: shx,
                    prj: prj,
                    dbf: dbf
                };
            }

            $.ajax({
                type: "POST",
                url: SERVER_URI + "wps/shptojson",
                data: data,
                dataType: "json",
                success: function(data) {
                    var geojson_format = new OpenLayers.Format.GeoJSON();
                    var shpfeatures = geojson_format.read(data);
                    console.log(shpfeatures.length);
                    if (shpfeatures.length > 1 && dbf === undefined) {
                        Ext.Msg.alert("user uploaded multipolygon");
                    } else if (shpfeatures.length == 1 && dbf !== undefined) {
                        Ext.Msg.alert("user uploaded simple polygon for batch");
                    } else if (shpfeatures.length > 1 && dbf !== undefined) {
                        console.log("submit batch");
                        Ext.MessageBox.confirm('Confirm', 'This will create a batch AOI, continue?', function(e) {
                            console.log(e);
                            console.log(shpfeatures.length);
                            if (e == 'yes') {
                                // formPanel2.getComponent('rg1').setValue('custom');

                                highlightLayer.destroyFeatures();
                                results.removeAllFeatures();
                                map.zoomToExtent(map_extent);
                                highlightLayer.addFeatures(shpfeatures);
                                highlightLayer.setVisibility(true);
                                batch_aoi = true;
                                // document.getElementById('custom_radio_sel').checked = 'checked';

                                Ext.getCmp('aoi_upload_id').collapse();
                                Ext.getCmp('aoi_create_id').expand();
                            }
                        });

                    } else if (shpfeatures.length === 1 && dbf == undefined) {
                        console.log("submit simple");
                        Ext.MessageBox.confirm('Confirm', 'This will create a single AOI, continue?', function(e) {
                            if (e == 'yes') {
                                // formPanel2.getComponent('rg1').setValue('custom');

                                highlightLayer.destroyFeatures();
                                results.removeAllFeatures();
                                map.zoomToExtent(map_extent);
                                highlightLayer.addFeatures(shpfeatures);
                                highlightLayer.setVisibility(true);
                                batch_aoi = false;

                                // document.getElementById('custom_radio_sel').checked = 'checked';

                                Ext.getCmp('aoi_upload_id').collapse();
                                Ext.getCmp('aoi_create_id').expand();
                            }
                        });

                    } else {
                        // highlightLayer.destroyFeatures();
                        // results.removeAllFeatures();
                        // map.zoomToExtent(map_extent);
                        // highlightLayer.addFeatures(shpfeatures);
                        // highlightLayer.setVisibility(true);
                        // if (shpfeatures.length > 1) {
                        //     batch_aoi = true;
                        //     for (var a = 0; a < shpfeatures.length; a++) {
                        //         console.log(shpfeatures[a].attributes.Name);
                        //     }
                        // } else {
                        //     batch_aoi = false;
                        // }
                        // document.getElementById('custom_radio_sel').checked =
                        //     'checked';
                        // Ext.getCmp('aoi_upload_id').collapse();
                        // Ext.getCmp('aoi_create_id').expand();
                    }
                }
            });

        };

        function handleFileSelect(evt) {
            var files = evt.target.files; // FileList object
            $("#shp_input").val("");
            $("#shx_input").val("");
            $("#prj_input").val("");
            $("#dbf_input").val("");

            for (var i = 0, f; f = files[i]; i++) {
                if (f.name.indexOf(".shp") != -1) {
                    $("#shp_input").val(f.name);
                }
                if (f.name.indexOf(".shx") != -1) {
                    $("#shx_input").val(f.name);
                }
                if (f.name.indexOf(".prj") != -1) {
                    $("#prj_input").val(f.name);
                }
                if (f.name.indexOf(".dbf") != -1) {
                    $("#dbf_input").val(f.name);
                }
            }
        }
        document.getElementById('file2').addEventListener('change', handleFileSelect, false);
        var confirm_simple = function(e) {
            console.log(e);
            if (e == 'yes') {
                upload_shps("shp_btn");
            }
        }
        var confirm_batch = function(e) {
            console.log(e);
            if (e == 'yes') {
                upload_shps("batch_shp_btn");
            }
        }

        var check_upload = function() {
            var shp = $("#shp_input").val().length;
            var shx = $("#shx_input").val().length;
            var prj = $("#prj_input").val().length;
            var dbf = $("#dbf_input").val().length;

            if (shp === 0 || shx === 0 || prj === 0) {
                Ext.MessageBox.alert('Status', 'shp, shx, or prj is missing');
            } else if (dbf === 0) {
                // Ext.MessageBox.alert('Status', 'creating single polygon');
                // Ext.MessageBox.confirm('Confirm', 'This will create a single AOI, continue?', confirm_simple);
                upload_shps("shp_btn");
            } else {
                // Ext.MessageBox.confirm('Confirm', 'This will create a batch AOI, continue?', confirm_batch);
                upload_shps("batch_shp_btn");
            }

        }

        //this function processes shapefile upload
        var upload_shps = function(btn_id) {

            // console.log($(this).attr('id'));
            // var btn_id = $(this).attr('id');
            var files = document.getElementById('file2').files;
            var fileReader = [];
            var parse_filename, result;
            var shp, prj, shx, prjfile, shxfile, shpfile, dbf, dbffile;

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

            var create_handler2 = function(file) {
                var handler;
                switch (file) {
                    case 'shp':
                        handler = function(oFREvent) {
                            shp = oFREvent.target.result;
                            if (shx && prj && dbf) {
                                shpTonchuc12(shp, prj, shx, dbf);
                            }
                        };
                        break;
                    case 'shx':
                        handler = function(oFREvent) {
                            shx = oFREvent.target.result;
                            if (shp && prj && dbf) {
                                shpTonchuc12(shp, prj, shx, dbf);
                            }
                        };
                        break;
                    case 'prj':
                        handler = function(oFREvent) {
                            prj = oFREvent.target.result;
                            if (shx && shp && dbf) {
                                shpTonchuc12(shp, prj, shx, dbf);
                            }
                        };
                        break;
                    case 'dbf':
                        handler = function(oFREvent) {
                            dbf = oFREvent.target.result;
                            if (shx && shp && prj) {
                                shpTonchuc12(shp, prj, shx, dbf);
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
                    console.log(files[i].name);
                    parse_filename = /\.(shp|shx|prj|dbf)/;
                    result = parse_filename.exec(files[i].name);
                    if (result) {
                        switch (result[1]) {
                            case 'shp':
                                shpfile = true;
                                if (btn_id === 'shp_btn') {
                                    fileReader[i].onload = create_handler('shp');
                                } else {
                                    fileReader[i].onload = create_handler2('shp');
                                }
                                break;
                            case 'shx':
                                shxfile = true;
                                if (btn_id === 'shp_btn') {
                                    fileReader[i].onload = create_handler('shx');
                                } else {
                                    fileReader[i].onload = create_handler2('shx');
                                }
                                break;
                            case 'prj':
                                prjfile = true;
                                if (btn_id === 'shp_btn') {
                                    fileReader[i].onload = create_handler('prj');
                                } else {
                                    fileReader[i].onload = create_handler2('prj');
                                }
                                break;
                            case 'dbf':
                                dbffile = true;
                                fileReader[i].onload = create_handler2('dbf');
                                break;
                        }
                    }
                }
                if (!(prjfile && shxfile && shpfile)) {
                    //console.log("file shp, prj, or shx missing");
                    $("#upload_msg").html("file shp, prj, or shx missing");
                } else if ((btn_id === 'batch_shp_btn') && !(prjfile && shxfile && shpfile && dbffile)) {
                    $("#upload_msg").html("file shp, prj, shx or dbf missing");


                }
            }
        };

        // $("#shp_btn").click(upload_shps);
        // $("#batch_shp_btn").click(upload_shps);
        $("#check_shp_btn").click(check_upload);

    };

    var model_script = function() {
        // alert("test");
        console.log(window.location.pathname);
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
            // $("#legend_opac_sldr").change(function(e) {
            //     var test = $("#legend_opac_sldr").val();
            //     console.log(test);
            // });
            $("#legend_opac_sldr").change(function(e) {
                var opac = $("#legend_opac_sldr").val();
                set_layer_opacity(opac);
            });
            var set_layer_opacity = function(opac) {
                console.log(opac);
                symbolsLookup["0"].fillOpacity = 0;
                symbolsLookup["1"].fillOpacity = opac / 10.0;
                symbolsLookup["2"].fillOpacity = opac / 10.0;
                symbolsLookup["3"].fillOpacity = opac / 10.0;
                symbolsLookup["4"].fillOpacity = opac / 10.0;
                symbolsLookup["5"].fillOpacity = opac / 10.0;

                symbolsLookup_model["1"].fillOpacity = opac / 10.0;
                symbolsLookup_model["2"].fillOpacity = opac / 10.0;
                symbolsLookup_model["3"].fillOpacity = opac / 10.0;
                symbolsLookup_model["4"].fillOpacity = opac / 10.0;
                symbolsLookup_model["5"].fillOpacity = opac / 10.0;
                symbolsLookup_model["6"].fillOpacity = opac / 10.0;
                symbolsLookup_model["7"].fillOpacity = opac / 10.0;
                symbolsLookup_model["8"].fillOpacity = opac / 10.0;
                symbolsLookup_model["9"].fillOpacity = opac / 10.0;
                symbolsLookup_model["10"].fillOpacity = opac / 10.0;
                symbolsLookup_model["11"].fillOpacity = opac / 10.0;
                symbolsLookup_model["12"].fillOpacity = opac / 10.0;
                symbolsLookup_model["13"].fillOpacity = opac / 10.0;
                symbolsLookup_model["14"].fillOpacity = opac / 10.0;
                symbolsLookup_model["15"].fillOpacity = opac / 10.0;

                symbolsLookup_coa["1"].fillOpacity = opac / 10.0;
                symbolsLookup_coa["2"].fillOpacity = opac / 10.0;
                symbolsLookup_coa["3"].fillOpacity = opac / 10.0;
                symbolsLookup_coa["4"].fillOpacity = opac / 10.0;
                symbolsLookup_coa["5"].fillOpacity = opac / 10.0;
                symbolsLookup_coa["6"].fillOpacity = opac / 10.0;
                symbolsLookup_coa["7"].fillOpacity = opac / 10.0;
                symbolsLookup_coa["8"].fillOpacity = opac / 10.0;
                symbolsLookup_coa["9"].fillOpacity = opac / 10.0;
                symbolsLookup_coa["10"].fillOpacity = opac / 10.0;
                symbolsLookup_coa["11"].fillOpacity = opac / 10.0;

                map.getLayersByName("Individual Threats")[0].redraw();
                map.getLayersByName("Composite Threats")[0].redraw();
                map.getLayersByName("COA Map")[0].redraw();
                console.log(data);
            }
            $("input.range").change(function(e) {
                // console.log(this);
                // var test = $(this).attr("id");
                var thrt = e.target.id.slice(0, -14)
                console.log(e.target.value);
                console.log(thrt);
                $("#" + thrt + "_limit_sv").val(e.target.value / 10)
                $("#" + thrt + "_limit").val(sv2dt_dict[thrt][e.target.value]);
            })

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
                    max: 100
                },
                slr_lc_limit: {
                    min: 0.09,
                    max: 100
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
    var top_five;
    var coa_script = function() {
        click.activate();
        $("input[name='ncwrc_basins']").click(function(e) {
            console.log(e.currentTarget.value);
            var basin = e.currentTarget.value;
            keycode = basin;
            var tier1 = document.getElementById('tier1_chk').checked;
            var tier2 = document.getElementById('tier2_chk').checked;
            var rivbuff = document.getElementById('rivbuff_chk').checked;
            console.log(tier1);
            $.ajax({
                type: "POST",
                url: SERVER_URI + "wps/ncwrc_basins_map",
                data: {
                    basin: basin,
                    tier1: tier1,
                    tier2: tier2,
                    rivbuff: rivbuff
                },
                dataType: "json",
                success: function(data) {
                    console.log(data);
                    save_wrc_priorities(data.huc12s);
                    composite.setVisibility(false);
                    individual.setVisibility(false);
                    coa_map.setVisibility(false);
                    ncwrc_basins.setVisibility(true);
                    ncwrc_priorities.setVisibility(true);

                    $('#lgnddiv').css('display', 'none');
                    $('#lgdimg').css('display', 'block');
                    $('#lgdimg').attr("src", "images/RivBasinPriorityLegend.png");
                }
            });
        });

        $("input[name='reg_com']").click(function(e) {
            formPanel2.getComponent('rg1').setValue('coa');


            // var mystyle = {
            //     strokeColor: "black",
            //     strokeWidth: 2,
            //     strokeOpacity: 1,
            //     fillOpacity: 0.7
            // };
            // var thrt_clors = {
            //     1: "#FFFF7F",
            //     2: "#C4F75D",
            //     3: "#86ED3D",
            //     4: "#44E214",
            //     5: "#3DCC41",
            //     6: "#3AB272",
            //     7: "#33A587",
            //     8: "#26999B",
            //     9: "#1A8CA8",
            //     10: "#2073A0",
            //     11: "#215D99"
            // };
            // alert("clicked");
            ecoregions.setVisibility(true);
            console.log(e.currentTarget.value);
            keycode = e.currentTarget.value;
            var thrt;
            $.ajax({
                type: "POST",
                url: SERVER_URI + "wps/coa_map",
                data: {
                    keycode: keycode
                },
                dataType: "json",
                success: function(data) {
                    console.log(data);
                    top_five = data.top_five;
                    for (var key in data.huc12_cats) {
                        thrt = data.huc12_cats[key];
                        // console.log(thrt);


                        if (!symbolsLookup_model.hasOwnProperty(thrt)) {
                            console.log("not valid lever", thrt);
                        }
                        try {
                            map.getLayersByName("COA Map")[0].
                            getFeaturesByAttribute("huc12", key)[0].
                            attributes.threat = thrt;
                            // map.getLayersByName("COA Map")[0].
                            // getFeaturesByAttribute("huc12", key)[0].style = null;
                        } catch (err) {
                            // console.log(key);


                        }
                    }
                    save_coa(top_five);
                    // for (var cnt = 0; cnt < data.top_five.length; cnt++) {
                    //     // console.log(data.top_five[cnt]);
                    //     var key = data.top_five[cnt][0];
                    //     var thrt = data.top_five[cnt][1];
                    //     // console.log(thrt_clors[thrt]);
                    //     // var fillColor = thrt_clors[thrt];
                    //     // console.log(fillColor);

                    //     map.getLayersByName("Composite Threats")[0].
                    //     getFeaturesByAttribute("huc12", key)[0].style = {};

                    //     map.getLayersByName("Composite Threats")[0].
                    //     getFeaturesByAttribute("huc12", key)[0].style.
                    //     fillColor = thrt_clors[thrt];

                    //     map.getLayersByName("Composite Threats")[0].
                    //     getFeaturesByAttribute("huc12", key)[0].style.
                    //     strokeWidth = 2;

                    //     map.getLayersByName("Composite Threats")[0].
                    //     getFeaturesByAttribute("huc12", key)[0].style.
                    //     strokeColor = 'red';

                    //     map.getLayersByName("Composite Threats")[0].
                    //     getFeaturesByAttribute("huc12", key)[0].style.
                    //     strokeOpacity = 1;

                    //     map.getLayersByName("Composite Threats")[0].
                    //     getFeaturesByAttribute("huc12", key)[0].style.
                    //     fillOpacity = 0.7;

                    //     // var test = map.getLayersByName("Composite Threats")[0].
                    //     // getFeaturesByAttribute("huc12", key)[0].style;
                    //     // console.log(test);



                    // }
                    composite.setVisibility(false);
                    individual.setVisibility(false);
                    coa_map.setVisibility(true);
                    map.getLayersByName("COA Map")[0].redraw();

                    $('#lgnddiv').css('display', 'none');
                    $('#lgdimg').css('display', 'block');
                    $('#lgdimg').attr("src", "images/UnpRatio_legend.png");

                }

            });

            // console.log(this);
        });
    };
    // load header page with links and title
    var el = Ext.getCmp("infopage");
    var mgr = el.getUpdater();
    mgr.update({
        url: HOST_NAME + "pages/infopage.html"
    });

    // load shapefile upload page
    // var el2 = Ext.getCmp("aoi_upload_id");
    // mgr = el2.getUpdater();
    el = Ext.getCmp("aoi_upload_id");
    mgr = el.getUpdater();
    mgr.update({
        url: HOST_NAME + "pages/upload2.html"
    });
    mgr.on("update", page_script);

    el = Ext.getCmp("model_page");
    mgr = el.getUpdater();
    mgr.update({
        url: HOST_NAME + "pages/area.html"
    });
    mgr.on("update", model_script);

    el = Ext.getCmp("mountainspage");
    mgr = el.getUpdater();
    mgr.update({
        url: HOST_NAME + "pages/mountains.php"
    });
    // mgr.on("update", coa_script);

    el = Ext.getCmp("coastalpage");
    mgr = el.getUpdater();
    mgr.update({
        url: HOST_NAME + "pages/coastal.php"
    });
    // mgr.on("update", coa_script);
    el = Ext.getCmp("sandhillsspage");
    mgr = el.getUpdater();
    mgr.update({
        url: HOST_NAME + "pages/sandhills.php"
    });
    // mgr.on("update", coa_script);
    el = Ext.getCmp("piedmontpage");
    mgr = el.getUpdater();
    mgr.update({
        url: HOST_NAME + "pages/piedmont.php"
    });
    // mgr.on("update", coa_script);
    el = Ext.getCmp("basinspage");
    mgr = el.getUpdater();
    mgr.update({
        url: HOST_NAME + "pages/basins.php"
    });
    mgr.on("update", coa_script);

});
