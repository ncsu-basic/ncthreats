import requests
import csv

"""
to change title delete layers in gui and rerun script with new title.
curl delete does not work, haven't figured out update.
all layers and styles in workspace basic

"""

legend_data = {}
with open("legend_data4.csv") as fp:
    reader = csv.reader(fp)
    for line in reader:
        legend_data[line[1]] = line[0]
# print legend_data



# requests.packages.urllib3.disable_warnings()

view_name = "bioimplendt"
title = "Impaired:  Biota"
style = "wms_water_bioimplen"


def create_layer(name, title, style):
    auth = ("admin", "geoserver")
    headers = {'Content-type': 'text/xml'}
    data = "<featureType><name>%s</name><title>%s</title></featureType>" % (view_name, title)

    url = "http://localhost/geoserver/rest/workspaces/basic/datastores/db/featuretypes"
    print requests.post(url, data=data, headers=headers, auth=auth)

    url = "http://localhost/geoserver/rest/layers/basic:%s" % view_name
    data = "<layer><defaultStyle><name>%s</name><workspace>wms</workspace></defaultStyle></layer>" % style
    print requests.put(url, data=data, headers=headers, auth=auth)

create_layer(view_name, title, style)

mymaps = ["frst", 'ftwt', 'hbwt', 'open', 'shrb']
years = [10, 20, 30, 40, 50]
scenarios = ['x', "a", "b", "c", "d", "e"]

for mymap in mymaps:
    for year in years:
        for scenario in scenarios:
            view_name = "%s%sdt_%s" % (mymap, year, scenario)
            title = legend_data[mymap] + " Loss Since 2000 (pct) 20%s" % year
            title = title.replace("pct", "%")
            style = "wms_%s" % mymap

            # print view_name
            # print title
            # print style
            # create_layer(view_name, title, style)

# for year in years:
#     view_name = "urb%sdt" % year
#     title = "Urban Land Cover (%)"
#     style = "wms_%s" % "urban"
#     print view_name
#     print title
#     print style
#     create_layer(view_name, title, style)

# for year in years:
#     view_name = "fsupp%sdt" % year
#     title = "Mean Urban Density w/in 500 mile radius"
#     style = "wms_%s" % "fire"
#     print view_name
#     print title
#     print style
#     create_layer(view_name, title, style)

for year in years:
    view_name = "rds%sdt" % year
    title = "Mean Length/Area of Major Highways (m/ha)"
    style = "wms_%s" % "trans"
    print view_name
    print title
    print style
    create_layer(view_name, title, style)

view_name = "manudt"
title = "Manure Application (kg/ha/yr)"
style = "wms_%s" % "nutrient_manu"
print view_name
print title
print style
create_layer(view_name, title, style)

view_name = "fertdt"
title = "Syn. Nitrogen Fertilizer Application (kg/ha/yr)"
style = "wms_%s" % "nutrient_fert"
print view_name
print title
print style
create_layer(view_name, title, style)

view_name = "tdntdt"
title = "Total Nitrogen Deposition (kg/ha/yr)"
style = "wms_%s" % "nutrient_td_n_t"
print view_name
print title
print style
create_layer(view_name, title, style)

view_name = "tdstdt"
title = "Total Sulfur Deposition (kg/ha/yr)"
style = "wms_%s" % "nutrient_td_s_t"
print view_name
print title
print style
create_layer(view_name, title, style)

view_name = "fhlthdt"
title = "Forest Insect/Disease Risk (%)"
style = "wms_%s" % "frsthlth"
print view_name
print title
print style
create_layer(view_name, title, style)

view_name = "triassicdt"
title = "Triassic Basin (%)"
style = "wms_%s" % "energydev"
print view_name
print title
print style
create_layer(view_name, title, style)


view_name = "niddt"
title = "Number of Dams (n)"
style = "wms_%s" % "water_NID"
print view_name
print title
print style
create_layer(view_name, title, style)

view_name = "wpcdt"
title = "Wind Power Class (mean)"
style = "wms_%s" % "wind"
print view_name
print title
print style
create_layer(view_name, title, style)

for year in years:
    view_name = "up%sdt" % year
    title = "Undeveloped Upland Loss Since 2000 (%)"
    style = "wms_%s" % "slr_up"
    print view_name
    print title
    print style
    create_layer(view_name, title, style)

for year in years:
    view_name = "lc%sdt" % year
    title = "Terrestrial Landcover Loss Since 2000 (%)"
    style = "wms_%s" % "slr_lc"
    print view_name
    print title
    print style
    create_layer(view_name, title, style)

view_name = "bioimplendt"
title = "Biota Impairments (km*stream density)"
style = "wms_%s" % "water_bioimplen"
print view_name
print title
print style
create_layer(view_name, title, style)

view_name = "metimplendt"
title = "Metal Impariments (km*stream density)"
style = "wms_%s" % "water_metimplen"
print view_name
print title
print style
create_layer(view_name, title, style)