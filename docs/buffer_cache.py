import psycopg2
"""
SELECT ST_Distance(
            ST_Transform((select wkb_geometry from huc6nc where huc6 = '030102'),32119),
            ST_Transform((select wkb_geometry from huc12nc where huc_12 = '030101020803'),32119)
        );

"""


query1 = "select * from huc6nc"
query2 = "select * from huc12nc"

conn = psycopg2.connect("dbname=ncthreats user=postgres")
with conn.cursor() as cur:
    cur.execute(query1)
    print cur.fetchone()

