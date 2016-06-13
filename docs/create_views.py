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
            cur.execute("drop view  if exists %s" % view_name)
            col_name = "%s%sdt" % (mymap, year)
            qry = qry_tmpl % (
                view_name, scenario, col_name, scenario, scenario
            )
            print qry
            cur.execute(qry)

qry_tmpl = """
create view urb%sdt as \
select urban.urb%sdt as dt, huc12nc.* \
from urban, huc12nc \
WHERE urban.huc_12 = huc12nc.huc_12
"""
for year in years:
    qry = qry_tmpl % (year, year)
    cur.execute("drop view if exists urb%sdt" % year)
    print qry
    cur.execute(qry)

qry_tmpl = """
create view fsupp%sdt as \
select fsupp.fsupp%sdt as dt, huc12nc.* \
from fsupp, huc12nc \
WHERE fsupp.huc_12 = huc12nc.huc_12
"""
for year in years:
    qry = qry_tmpl % (year, year)
    cur.execute("drop view if exists fsupp%sdt" % year)
    print qry
    cur.execute(qry)

qry_tmpl = """
create view rds%sdt as \
select dclrds.rds%sdt as dt, huc12nc.* \
from dclrds, huc12nc \
WHERE dclrds.huc_12 = huc12nc.huc_12
"""
for year in years:
    qry = qry_tmpl % (year, year)
    cur.execute("drop view if exists rds%sdt" % year)
    print qry
    cur.execute(qry)

qry = """
create view fertdt as \
select fert.fert_dt as dt, huc12nc.* \
from fert, huc12nc \
WHERE fert.huc_12 = huc12nc.huc_12
"""
cur.execute("drop view if exists fertdt")
print qry
cur.execute(qry)

qry = """
create view manudt as \
select manu.manu_dt as dt, huc12nc.* \
from manu, huc12nc \
WHERE manu.huc_12 = huc12nc.huc_12
"""
cur.execute("drop view if exists manudt")
print qry
cur.execute(qry)

qry = """
create view tdntdt as \
select tdnt.tdnt_dt as dt, huc12nc.* \
from tdnt, huc12nc \
WHERE tdnt.huc_12 = huc12nc.huc_12
"""
cur.execute("drop view if exists tdntdt")
print qry
cur.execute(qry)

qry = """
create view tdstdt as \
select tdst.tdst_dt as dt, huc12nc.* \
from tdst, huc12nc \
WHERE tdst.huc_12 = huc12nc.huc_12
"""
cur.execute("drop view if exists tdstdt")
print qry
cur.execute(qry)

qry = """
create view fhlthdt as \
select fhlth.fhlth_dt as dt, huc12nc.* \
from fhlth, huc12nc \
WHERE fhlth.huc_12 = huc12nc.huc_12
"""
cur.execute("drop view if exists fhlthdt")
print qry
cur.execute(qry)

qry = """
create view triassicdt as \
select triassic.triassic_dt as dt, huc12nc.* \
from triassic, huc12nc \
WHERE triassic.huc_12 = huc12nc.huc_12
"""
cur.execute("drop view if exists triassicdt")
print qry
cur.execute(qry)

qry = """
create view wpcdt as \
select wpc.wpc_dt as dt, huc12nc.* \
from wpc, huc12nc \
WHERE wpc.huc_12 = huc12nc.huc_12
"""
cur.execute("drop view if exists wpcdt")
print qry
cur.execute(qry)

qry_tmpl = """
create view up%sdt as \
select slrup.up%sdt as dt, huc12nc.* \
from slrup, huc12nc \
WHERE slrup.huc_12 = huc12nc.huc_12
"""
for year in years:
    qry = qry_tmpl % (year, year)
    cur.execute("drop view if exists up%sdt" % year)
    print qry
    cur.execute(qry)

qry_tmpl = """
create view lc%sdt as \
select slrlc.lc%sdt as dt, huc12nc.* \
from slrlc, huc12nc \
WHERE slrlc.huc_12 = huc12nc.huc_12
"""
for year in years:
    qry = qry_tmpl % (year, year)
    cur.execute("drop view if exists lc%sdt" % year)
    print qry
    cur.execute(qry)

qry = """
create view bioimplendt as \
select bioimplen.bioimplen_dt as dt, huc12nc.* \
from bioimplen, huc12nc \
WHERE bioimplen.huc_12 = huc12nc.huc_12
"""
cur.execute("drop view if exists bioimplendt")
print qry
cur.execute(qry)

qry = """
create view metimplendt as \
select metimplen.metimplen_dt as dt, huc12nc.* \
from metimplen, huc12nc \
WHERE metimplen.huc_12 = huc12nc.huc_12
"""
cur.execute("drop view if exists metimplendt")
print qry
cur.execute(qry)

cur.execute("drop view if exists niddt ")
qry = """
create view niddt as \
select nid.nid_dt as dt, huc12nc.* \
from nid, huc12nc \
WHERE nid.huc_12 = huc12nc.huc_12
"""
print qry
cur.execute(qry)

conn.commit()
