import requests
import csv

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

    url = "http://localhost/geoserver/rest/workspaces/basic/datastores/threats_db/featuretypes"
    requests.post(url, data=data, headers=headers, auth=auth)

    url = "http://localhost/geoserver/rest/layers/basic:%s" % view_name
    data = "<layer><defaultStyle><name>%s</name><workspace>wms</workspace></defaultStyle></layer>" % style
    requests.put(url, data=data, headers=headers, auth=auth)

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

            print view_name
            print title
            print style
            create_layer(view_name, title, style)