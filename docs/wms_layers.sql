-- Urban Growth

SELECT urban.urb10dt as dt, huc12nc.*
FROM urban, huc12nc
WHERE urban.huc_12 = huc12nc.huc_12

-- habitat loss forest

select lcscen_x.frst10dt as dt, huc12nc.*
from lcscen_x, huc12nc
WHERE lcscen_x.huc_12 = huc12nc.huc_12

select lcscen_x.ftwt10dt as dt, huc12nc.*
from lcscen_x, huc12nc
WHERE lcscen_x.huc_12 = huc12nc.huc_12
