#!/usr/local/pythonenvs/ncthreatsenv/bin/python

import psycopg2
import psycopg2.extras

conn = psycopg2.connect("dbname=ncthreats user=postgres")
cur = conn.cursor(cursor_factory=psycopg2.extras.DictCursor)


query = "select * from legend_data"

cur.execute(query)
# for x in cur:
#     print x['layer_desc']

template_file = "/home/jim/Desktop/styles/style.xml"
with open(template_file)as fp:
    template_empty = fp.read()


for row in cur:
    template = template_empty
    template = template.replace("layer_str", row["layer_str"])
    template = template.replace("layer_desc", row["layer_desc"])
    template = template.replace("color1", row["color1"])
    template = template.replace("color2", row["color2"])
    template = template.replace("color3", row["color3"])
    template = template.replace("color4", row["color4"])
    template = template.replace("color5", row["color5"])
    template = template.replace("color6", row["color6"])
    template = template.replace("range1_title", row["range1"])
    template = template.replace("range1_high", str(row["range1_high"]))
    template = template.replace("range1_low", str(row["range1_low"]))
    template = template.replace("range2_title", row["range2"])
    template = template.replace("range2_high", str(row["range2_high"]))
    template = template.replace("range2_low", str(row["range2_low"]))
    template = template.replace("range3_title", row["range3"])
    template = template.replace("range3_high", str(row["range3_high"]))
    template = template.replace("range3_low", str(row["range3_low"]))
    template = template.replace("range4_title", row["range4"])
    template = template.replace("range4_high", str(row["range4_high"]))
    template = template.replace("range4_low", str(row["range4_low"]))
    template = template.replace("range5_title", row["range5"])
    template = template.replace("range5_high", str(row["range5_high"]))
    template = template.replace("range5_low", str(row["range5_low"]))
    template = template.replace("range6_title", row["range6"])
    template = template.replace("range6_high", str(row["range6_high"]))
    template = template.replace("range6_low", str(row["range6_low"]))

    save_name = "/home/jim/Desktop/styles/wms_%s.xml" % row["layer_str"].replace(":", "_")
    with open(save_name, "wb") as fp:
        fp.write(template)


