import psycopg2
import json
"""
SELECT ST_Distance(
            ST_Transform((select wkb_geometry from huc6nc where huc6 = '030102'),32119),
            ST_Transform((select wkb_geometry from huc12nc where huc_12 = '030101020803'),32119)
        );

"""


query1 = "select huc10 from huc10nc order by huc10"
query2 = "select huc12 from huc12nc order by huc12"

query3 = """
SELECT ST_Distance(
            ST_Transform((select wkb_geometry from huc10nc where huc10 = %s),32119),
            ST_Transform((select wkb_geometry from huc12nc where huc_12 = %s),32119)
        );

"""

conn = psycopg2.connect("dbname=ncthreats user=postgres")
with conn.cursor() as cur:
    cur.execute(query1)
    res1 = cur.fetchall()

with conn.cursor() as cur:
    cur.execute(query2)
    res2 = cur.fetchall()

cache_5k = {}
cache_12k = {}
with conn.cursor() as cur:
    for row1 in res1:
        cache_5k[str(row1[0])] = []
        cache_12k[str(row1[0])] = []
        for row2 in res2:
            print "%s %s" % (row1[0], row2[0])
            cur.execute(query3, (row1[0], row2[0]))
            distance = cur.fetchone()[0]
            if distance < 5000 and distance > 0:
                cache_5k[str(row1[0])].append(row2[0])
            if distance < 12000 and distance > 0:
                cache_12k[str(row1[0])].append(row2[0])


json_str_5k = json.dumps(cache_5k)
with open("/var/www/wsgi/wps-server/data/huc10cache_5k.json", 'w')as fp:
    fp.write(json_str_5k)

json_str_12k = json.dumps(cache_12k)
with open("/var/www/wsgi/wps-server/data/huc10cache_12k.json", 'w')as fp:
    fp.write(json_str_12k)
