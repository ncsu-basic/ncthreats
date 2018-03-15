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

## AOI table

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
