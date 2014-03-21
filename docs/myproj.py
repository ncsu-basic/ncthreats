#workon threatsenv

import pyproj


geod = pyproj.Geod( ellps='WGS84')
sph_merc = pyproj.Proj(init="epsg:3785")
lon_lat = pyproj.Proj(init='epsg:4326')

# pts = pyproj.transform(lon_lat, sph_merc, -75.3, 36.7, 0)
# rev_pts = pyproj.transform(sph_merc, lon_lat, -9462455, 3963396,0)
# print pts
# print rev_pts

angle = 270
distance = 100

lat = 36
lon = -79

long2,lat2, invangle = geod.fwd(lon, lat, angle,distance)

print "%0.5f, %0.5f is 100m N of %0.4f, %0.4f" % (lat2, long2, lat, lon)

