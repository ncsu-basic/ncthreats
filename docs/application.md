# How the application works

COA (Conservation Opportutity Areas)

## Application run

First, `/huc12_state` loads big geojson HUC12 for drawing results of model.

COA tab uses large tables.

COA and Data tabs are using the HUC12 GeoJSON. (maybe)

All the MapBox layers are in Setup tab.

Setup tab:
* Data Layers are from Data tab and ???
* AOI Layers are from AOI tab
  * huc12s is selected HUC12s
  * Selection is a circle or polygon created by the user
* Boundaries from Mapbox
* Background from Mapbox

## COA tab

Radio buttons generated in PHP.

sgcn = species of greatest conservation need

Now only nsppwrc_sgcn column is used.

## Preview maps

User: Analyze tab > Details > Preview

Code: model.preview_map()

## AOI tab

### Creating AOI

AOI (Area of Interest)

### Shapefile upload

Uploaded in AOI tab > Shapefile upload, then it creates custom polygon.
If the Shapefile has more than one polygon and has a DBF which has
column named `name`, them it uses batch functions, so that the report
has more than one entry and uses that name.

### AOI table

Records for each user-selected AOI.

```
Table "aoi_results"
   Column    |      Type      |            Description
-------------+----------------+-----------------------------------------
 pk          | integer        | AOI identifier used in the application
 identifier  | character(32)  | hash?
 huc12s      | text           | comma separted list of HUC12s
 description | text           |
 date        | date           | day of creation
 x_max       | numeric(15,13) | bbox
 x_min       | numeric(15,13) |
 y_min       | numeric(15,13) |
 y_max       | numeric(15,13) |
 permalink   | character(100) | created at the beginning based on server URL and pk
 huc12s_5k   | text           | doughnut shape buffer without AOI
 huc12s_12k  | text           | doughnut shape buffer without AOI
```

## Analyze tab

### Map

After Submit button, /wps/map is called with GET parameters which
specify the threats. Server returns JSON with number of threats for each
HUC12 which is the last item in the list of each HUC12 and is set as an
attribute of GeoJSON. The colors are managed in `symbolsLookup_model`
variable.

On the server side, the number threats is counted all the way in
`siteutils.make_composite_threat_count()`.
