


drop table ea_pol;
drop table ea_h20;
drop table lcscen_a_ha;
drop table lcscen_b_ha;
drop table lcscen_c_ha;
drop table lcscen_d_ha;
drop table lcscen_e_ha;
drop table lcscen_x_ha;
drop table energy_dev;
drop table forest_health;
drop table transportation;
drop table urban_den;
drop table urban_ha;
drop table legend_data;
drop table wind_avg;
drop table slamm_lc_ha;
drop table slamm_up_ha;

drop table urban;
drop table fsupp;

create table urban(
HUC_12 char(12) primary key,
urb10ha numeric(10),
urb20ha numeric(10),
urb30ha numeric(10),
urb40ha numeric(10),
urb50ha numeric(10),
urb10dt numeric(10),
urb20dt numeric(10),
urb30dt numeric(10),
urb40dt numeric(10),
urb50dt numeric(10),
urb10ps numeric(10),
urb20ps numeric(10),
urb30ps numeric(10),
urb40ps numeric(10),
urb50ps numeric(10)
);

create table fsupp(
HUC_12 char(12) primary key,
fsupp10dt numeric(10),
fsupp20dt numeric(10),
fsupp30dt numeric(10),
fsupp40dt numeric(10),
fsupp50dt numeric(10),
fsupp10ps numeric(10),
fsupp20ps numeric(10),
fsupp30ps numeric(10),
fsupp40ps numeric(10),
fsupp50ps numeric(10)
);

create table legend_data(
layer_desc varchar(100),
layer_str varchar(100),
color1 varchar(100),
color2 varchar(100),
color3 varchar(100),
color4 varchar(100),
color5 varchar(100),
color6 varchar(100),
range1 varchar(100),
range2 varchar(100),
range3 varchar(100),
range4 varchar(100),
range5 varchar(100),
range6 varchar(100),
range1_low numeric(10,3),
range1_high numeric(10,3),
range2_low numeric(10,3),
range2_high numeric(10,3),
range3_low numeric(10,3),
range3_high numeric(10,3),
range4_low numeric(10,3),
range4_high numeric(10,3),
range5_low numeric(10,3),
range5_high numeric(10,3),
range6_low numeric(10,3),
range6_high numeric(10,3)
);

-- start indiv threats data
-- might be replaced later

create  table ea_pol(
HUC_12 char(12) primary key,
BNF numeric(10),
CBNF numeric(10),
MANU numeric(10),
FERT numeric(10),
TD_N_T numeric(10),
TD_S_T numeric(10)
);

create  table ea_h20(
HUC_12 char(12) primary key,
BioImpLen numeric(10),
MetImpLen numeric(10),
NutImpLen numeric(10),
FishImpLen numeric(10),
HabImpLen numeric(10),
TempImpLen numeric(10),
PolImpLen numeric(10),
OtherLen numeric(10),
TotImpLen numeric(10),
TotalLengt numeric(10),
StreamDens numeric(10),
NID numeric(10),
MGAL numeric(10)
);


create  table lcscen_a_ha(
HUC_12 char(12) primary key,
frst10ha numeric(10),
frst20ha numeric(10),
frst30ha numeric(10),
frst40ha numeric(10),
frst50ha numeric(10),
ftwt10ha numeric(10),
ftwt20ha numeric(10),
ftwt30ha numeric(10),
ftwt40ha numeric(10),
ftwt50ha numeric(10),
hbwt10ha numeric(10),
hbwt20ha numeric(10),
hbwt30ha numeric(10),
hbwt40ha numeric(10),
hbwt50ha numeric(10),
open10ha numeric(10),
open20ha numeric(10),
open30ha numeric(10),
open40ha numeric(10),
open50ha numeric(10),
shrb10ha numeric(10),
shrb20ha numeric(10),
shrb30ha numeric(10),
shrb40ha numeric(10),
shrb50ha numeric(10)
);

create  table lcscen_b_ha(
HUC_12 char(12) primary key,
frst10ha numeric(10),
frst20ha numeric(10),
frst30ha numeric(10),
frst40ha numeric(10),
frst50ha numeric(10),
ftwt10ha numeric(10),
ftwt20ha numeric(10),
ftwt30ha numeric(10),
ftwt40ha numeric(10),
ftwt50ha numeric(10),
hbwt10ha numeric(10),
hbwt20ha numeric(10),
hbwt30ha numeric(10),
hbwt40ha numeric(10),
hbwt50ha numeric(10),
open10ha numeric(10),
open20ha numeric(10),
open30ha numeric(10),
open40ha numeric(10),
open50ha numeric(10),
shrb10ha numeric(10),
shrb20ha numeric(10),
shrb30ha numeric(10),
shrb40ha numeric(10),
shrb50ha numeric(10)
);

create  table lcscen_c_ha(
HUC_12 char(12) primary key,
frst10ha numeric(10),
frst20ha numeric(10),
frst30ha numeric(10),
frst40ha numeric(10),
frst50ha numeric(10),
ftwt10ha numeric(10),
ftwt20ha numeric(10),
ftwt30ha numeric(10),
ftwt40ha numeric(10),
ftwt50ha numeric(10),
hbwt10ha numeric(10),
hbwt20ha numeric(10),
hbwt30ha numeric(10),
hbwt40ha numeric(10),
hbwt50ha numeric(10),
open10ha numeric(10),
open20ha numeric(10),
open30ha numeric(10),
open40ha numeric(10),
open50ha numeric(10),
shrb10ha numeric(10),
shrb20ha numeric(10),
shrb30ha numeric(10),
shrb40ha numeric(10),
shrb50ha numeric(10)
);

create  table lcscen_d_ha(
HUC_12 char(12) primary key,
frst10ha numeric(10),
frst20ha numeric(10),
frst30ha numeric(10),
frst40ha numeric(10),
frst50ha numeric(10),
ftwt10ha numeric(10),
ftwt20ha numeric(10),
ftwt30ha numeric(10),
ftwt40ha numeric(10),
ftwt50ha numeric(10),
hbwt10ha numeric(10),
hbwt20ha numeric(10),
hbwt30ha numeric(10),
hbwt40ha numeric(10),
hbwt50ha numeric(10),
open10ha numeric(10),
open20ha numeric(10),
open30ha numeric(10),
open40ha numeric(10),
open50ha numeric(10),
shrb10ha numeric(10),
shrb20ha numeric(10),
shrb30ha numeric(10),
shrb40ha numeric(10),
shrb50ha numeric(10)
);

create  table lcscen_e_ha(
HUC_12 char(12) primary key,
frst10ha numeric(10),
frst20ha numeric(10),
frst30ha numeric(10),
frst40ha numeric(10),
frst50ha numeric(10),
ftwt10ha numeric(10),
ftwt20ha numeric(10),
ftwt30ha numeric(10),
ftwt40ha numeric(10),
ftwt50ha numeric(10),
hbwt10ha numeric(10),
hbwt20ha numeric(10),
hbwt30ha numeric(10),
hbwt40ha numeric(10),
hbwt50ha numeric(10),
open10ha numeric(10),
open20ha numeric(10),
open30ha numeric(10),
open40ha numeric(10),
open50ha numeric(10),
shrb10ha numeric(10),
shrb20ha numeric(10),
shrb30ha numeric(10),
shrb40ha numeric(10),
shrb50ha numeric(10)
);

create  table lcscen_x_ha(
HUC_12 char(12) primary key,
frst10ha numeric(10),
frst20ha numeric(10),
frst30ha numeric(10),
frst40ha numeric(10),
frst50ha numeric(10),
ftwt10ha numeric(10),
ftwt20ha numeric(10),
ftwt30ha numeric(10),
ftwt40ha numeric(10),
ftwt50ha numeric(10),
hbwt10ha numeric(10),
hbwt20ha numeric(10),
hbwt30ha numeric(10),
hbwt40ha numeric(10),
hbwt50ha numeric(10),
open10ha numeric(10),
open20ha numeric(10),
open30ha numeric(10),
open40ha numeric(10),
open50ha numeric(10),
shrb10ha numeric(10),
shrb20ha numeric(10),
shrb30ha numeric(10),
shrb40ha numeric(10),
shrb50ha numeric(10)
);

create  table urban_den(
HUC_12 char(12) primary key,
urb10den numeric(10),
urb20den numeric(10),
urb30den numeric(10),
urb40den numeric(10),
urb50den numeric(10)
);

create  table urban_ha(
HUC_12 char(12) primary key,
urb10ha numeric(10),
urb20ha numeric(10),
urb30ha numeric(10),
urb40ha numeric(10),
urb50ha numeric(10)
);

create table energy_dev(
HUC_12 char(12) primary key,
triassic_ha numeric(10),
triassic_perc numeric(10)
);

create table forest_health(
HUC_12 char(12) primary key,
FHlth_Ha numeric(10),
FHlth_Per numeric(10)
);

create table transportation(
HUC_12 char(12) primary key,
rds10mha numeric(10),
rds20mha numeric(10),
rds30mha numeric(10),
rds40mha numeric(10),
rds50mha numeric(10)
);

create table wind_avg(
HUC_12 char(12) primary key,
WPC_avg numeric(6,3)
);

create table slamm_lc_ha(
HUC_12 char(12) primary key,
lc0010ha smallint,
lc0020ha smallint,
lc0030ha smallint,
lc0040ha smallint,
lc0050ha smallint
);

create table slamm_up_ha(
HUC_12 char(12) primary key,
up0010ha smallint,
up0020ha smallint,
up0030ha smallint,
up0040ha smallint,
up0050ha smallint
);


copy ea_pol from '/home/jim/Desktop/ncthreats_tables/tblEA_Pol.txt' with csv header;
copy ea_h20 from '/home/jim/Desktop/ncthreats_tables/tblEA_h2o_SD.txt' with csv header;
copy lcscen_a_ha from '/home/jim/Desktop/ncthreats_tables/tblLCScen_A_ha.txt' with csv header;
copy lcscen_b_ha from '/home/jim/Desktop/ncthreats_tables/tblLCScen_B_ha.txt' with csv header;
copy lcscen_c_ha from '/home/jim/Desktop/ncthreats_tables/tblLCScen_C_ha.txt' with csv header;
copy lcscen_d_ha from '/home/jim/Desktop/ncthreats_tables/tblLCScen_D_ha.txt' with csv header;
copy lcscen_e_ha from '/home/jim/Desktop/ncthreats_tables/tblLCScen_E_ha.txt' with csv header;
copy lcscen_x_ha from '/home/jim/Desktop/ncthreats_tables/tblLCScen_X_ha.txt' with csv header;
copy urban_den from '/home/jim/Desktop/ncthreats_tables/tblUrban_den.txt' with csv header;
copy urban_ha from '/home/jim/Desktop/ncthreats_tables/tblUrban_ha.txt' with csv header;
copy wind_avg from '/home/jim/Desktop/ncthreats_tables/tblWPC_avg.txt' with csv header;
copy energy_dev from '/home/jim/Desktop/ncthreats_tables/tblTriassic_data.txt' with csv header;
copy forest_health from '/home/jim/Desktop/ncthreats_tables/tblFHlth_data2.txt' with csv header;
copy transportation from '/home/jim/Desktop/ncthreats_tables/tblDCLRds_mha.txt' with csv header;
copy slamm_lc_ha from '/home/jim/Desktop/ncthreats_tables/tblSlamm_lc_ha.txt' with csv header;
copy slamm_up_ha from '/home/jim/Desktop/ncthreats_tables/tblSlamm_up_ha.txt' with csv header;

copy urban from '/home/jim/Desktop/ncthreats_tables/tblUrban.txt' with csv header;
copy fsupp from '/home/jim/Desktop/ncthreats_tables/tblFSupp.txt' with csv header;

copy legend_data from '/home/jim/Desktop/ncthreats_tables/legend_data3.csv' with csv header;