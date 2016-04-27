#!/usr/local/pythonenvs/ncthreatsenv/bin/python

import psycopg2

conn = psycopg2.connect("dbname=ncthreats user=postgres")
cur = conn.cursor()
# frst:10:x

mymap = 'frst'
year = '10'
scenario = 'x'

query1 = "select huc_12, %s%sdt from lcscen_%s" % (
    mymap, year, scenario
)

cur.execute(query1)

a = cur.fetchone()
print a
