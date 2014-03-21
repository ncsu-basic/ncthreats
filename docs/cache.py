import psycopg2
import psycopg2.extras

db = psycopg2.connect("dbname=ncthreats user=postgres")
cursor = db.cursor(cursor_factory=psycopg2.extras.DictCursor)

query = "select * from counties"
query = "select * from nc_bcr"
cursor.execute(query)
recs = cursor.fetchall()
for rec in recs:
    # print rec['co_num']
    query2 = "select * from huc12nc"
    query3 = "select ST_intersects(%s, %s)"
    query4 = "insert into cache_huc12(huc12, bcr) values(%s, %s)"
    cursor.execute(query2)
    recs2 = cursor.fetchall()
    for rec2 in recs2:
        # print rec2['huc_12']
        cursor.execute(query3, (rec2['wkb_geometry'], rec['wkb_geometry']))
        match = cursor.fetchone()
        if match[0]:
            print str(rec['bcr']) + ", " + rec2['huc_12']
            cursor.execute(query4, (rec2['huc_12'], rec['bcr']))

db.commit()
