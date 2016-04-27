#!/usr/local/pythonenvs/ncthreatsenv/bin/python

import psycopg2


qry = """
create view frst10dt_x as \
select lcscen_x.frst10dt as dt, huc12nc.* \
from lcscen_x, huc12nc \
WHERE lcscen_x.huc_12 = huc12nc.huc_12

"""

qry_tmpl = """
create view %s as \
select lcscen_%s.%s as dt, huc12nc.* \
from lcscen_%s, huc12nc \
WHERE lcscen_%s.huc_12 = huc12nc.huc_12

"""

print qry

conn = psycopg2.connect("dbname=ncthreats user=postgres")
cur = conn.cursor()
# frst:10:x

mymaps = ["frst", 'ftwt', 'hbwt', 'open', 'shrb']
years = [10, 20, 30, 40, 50]
scenarios = ['x', "a", "b", "c", "d", "e"]

for mymap in mymaps:
    for year in years:
        for scenario in scenarios:
            # print (mymap, year, scenario)
            view_name = "%s%sdt_%s" % (mymap, year, scenario)
            col_name = "%s%sdt" % (mymap, year)
            qry = qry_tmpl % (view_name, scenario, col_name, scenario, scenario)
            print qry
            cur.execute(qry)
# year = '10'
# scenario = 'x'

# query1 = "select huc_12, %s%sdt from lcscen_%s" % (
#     mymap, year, scenario
# )

# cur.execute(qry)

conn.commit()
