import requests

# help(requests)

# requests.packages.urllib3.disable_warnings()

url = "http://localhost/geoserver/rest/workspaces/basic/datastores/threats_db/featuretypes"

auth = ("admin", "geoserver")

data = "<featureType><name>bioimplendt</name> <title>theNewTitle</title></featureType>"

headers = {'Content-type': 'text/xml'}

requests.post(url, data=data, headers=headers, auth=auth)
