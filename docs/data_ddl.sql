-- drop table lcscen_a_pct;
-- drop table lcscen_b_pct;
-- drop table lcscen_c_pct;
-- drop table lcscen_d_pct;
-- drop table lcscen_e_pct;
-- drop table lcscen_x_pct;
-- drop table urban_den;
-- drop table urban_ha;
-- drop table urban_pct;




drop table ea_pol;
drop table ea_h20;
drop table lcscen_a_ha;
drop table lcscen_b_ha;
drop table lcscen_c_ha;
drop table lcscen_d_ha;
drop table lcscen_e_ha;
drop table lcscen_x_ha;

drop table lcscen_a_rnk;
drop table lcscen_b_rnk;
drop table lcscen_c_rnk;
drop table lcscen_d_rnk;
drop table lcscen_e_rnk;
drop table lcscen_x_rnk;

drop table energy_dev;
drop table forest_health;
drop table transportation;

drop table urban_den;
drop table urban_den_rnk;
drop table urban_ha;
drop table urban_ha_rnk;

drop table transportation_rnk;
drop table static_rnk;

drop table legend_data;
drop table wind_avg;
drop table wind_rnk;
drop table slamm_lc_ha;
drop table slamm_lc_rnk;
drop table slamm_up_ha;
drop table slamm_up_rnk;


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

create  table lcscen_a_rnk(
HUC_12 char(12) primary key,
frst10rnk smallint,
frst20rnk smallint,
frst30rnk smallint,
frst40rnk smallint,
frst50rnk smallint,
ftwt10rnk smallint,
ftwt20rnk smallint,
ftwt30rnk smallint,
ftwt40rnk smallint,
ftwt50rnk smallint,
hbwt10rnk smallint,
hbwt20rnk smallint,
hbwt30rnk smallint,
hbwt40rnk smallint,
hbwt50rnk smallint,
open10rnk smallint,
open20rnk smallint,
open30rnk smallint,
open40rnk smallint,
open50rnk smallint,
shrb10rnk smallint,
shrb20rnk smallint,
shrb30rnk smallint,
shrb40rnk smallint,
shrb50rnk smallint
);

create  table lcscen_b_rnk(
HUC_12 char(12) primary key,
frst10rnk smallint,
frst20rnk smallint,
frst30rnk smallint,
frst40rnk smallint,
frst50rnk smallint,
ftwt10rnk smallint,
ftwt20rnk smallint,
ftwt30rnk smallint,
ftwt40rnk smallint,
ftwt50rnk smallint,
hbwt10rnk smallint,
hbwt20rnk smallint,
hbwt30rnk smallint,
hbwt40rnk smallint,
hbwt50rnk smallint,
open10rnk smallint,
open20rnk smallint,
open30rnk smallint,
open40rnk smallint,
open50rnk smallint,
shrb10rnk smallint,
shrb20rnk smallint,
shrb30rnk smallint,
shrb40rnk smallint,
shrb50rnk smallint
);

create  table lcscen_c_rnk(
HUC_12 char(12) primary key,
frst10rnk smallint,
frst20rnk smallint,
frst30rnk smallint,
frst40rnk smallint,
frst50rnk smallint,
ftwt10rnk smallint,
ftwt20rnk smallint,
ftwt30rnk smallint,
ftwt40rnk smallint,
ftwt50rnk smallint,
hbwt10rnk smallint,
hbwt20rnk smallint,
hbwt30rnk smallint,
hbwt40rnk smallint,
hbwt50rnk smallint,
open10rnk smallint,
open20rnk smallint,
open30rnk smallint,
open40rnk smallint,
open50rnk smallint,
shrb10rnk smallint,
shrb20rnk smallint,
shrb30rnk smallint,
shrb40rnk smallint,
shrb50rnk smallint
);

create  table lcscen_d_rnk(
HUC_12 char(12) primary key,
frst10rnk smallint,
frst20rnk smallint,
frst30rnk smallint,
frst40rnk smallint,
frst50rnk smallint,
ftwt10rnk smallint,
ftwt20rnk smallint,
ftwt30rnk smallint,
ftwt40rnk smallint,
ftwt50rnk smallint,
hbwt10rnk smallint,
hbwt20rnk smallint,
hbwt30rnk smallint,
hbwt40rnk smallint,
hbwt50rnk smallint,
open10rnk smallint,
open20rnk smallint,
open30rnk smallint,
open40rnk smallint,
open50rnk smallint,
shrb10rnk smallint,
shrb20rnk smallint,
shrb30rnk smallint,
shrb40rnk smallint,
shrb50rnk smallint
);

create  table lcscen_e_rnk(
HUC_12 char(12) primary key,
frst10rnk smallint,
frst20rnk smallint,
frst30rnk smallint,
frst40rnk smallint,
frst50rnk smallint,
ftwt10rnk smallint,
ftwt20rnk smallint,
ftwt30rnk smallint,
ftwt40rnk smallint,
ftwt50rnk smallint,
hbwt10rnk smallint,
hbwt20rnk smallint,
hbwt30rnk smallint,
hbwt40rnk smallint,
hbwt50rnk smallint,
open10rnk smallint,
open20rnk smallint,
open30rnk smallint,
open40rnk smallint,
open50rnk smallint,
shrb10rnk smallint,
shrb20rnk smallint,
shrb30rnk smallint,
shrb40rnk smallint,
shrb50rnk smallint
);

create  table lcscen_x_rnk(
HUC_12 char(12) primary key,
frst10rnk smallint,
frst20rnk smallint,
frst30rnk smallint,
frst40rnk smallint,
frst50rnk smallint,
ftwt10rnk smallint,
ftwt20rnk smallint,
ftwt30rnk smallint,
ftwt40rnk smallint,
ftwt50rnk smallint,
hbwt10rnk smallint,
hbwt20rnk smallint,
hbwt30rnk smallint,
hbwt40rnk smallint,
hbwt50rnk smallint,
open10rnk smallint,
open20rnk smallint,
open30rnk smallint,
open40rnk smallint,
open50rnk smallint,
shrb10rnk smallint,
shrb20rnk smallint,
shrb30rnk smallint,
shrb40rnk smallint,
shrb50rnk smallint
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


create  table urban_den_rnk(
HUC_12 char(12) primary key,
urb10den_rnk smallint,
urb20den_rnk smallint,
urb30den_rnk smallint,
urb40den_rnk smallint,
urb50den_rnk smallint
);

create  table urban_ha_rnk(
HUC_12 char(12) primary key,
urb10ha_rnk smallint,
urb20ha_rnk smallint,
urb30ha_rnk smallint,
urb40ha_rnk smallint,
urb50ha_rnk smallint
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

create table transportation_rnk(
HUC_12 char(12) primary key,
rds10rnk numeric(10),
rds20rnk numeric(10),
rds30rnk numeric(10),
rds40rnk numeric(10),
rds50rnk numeric(10)
);

create table static_rnk(
HUC_12 char(12) primary key,
MANU_rnk smallint,
FERT_rnk smallint,
TD_N_T_rnk smallint,
TD_S_T_rnk smallint,
BioImpLen_rnk smallint,
MetImpLen_rnk smallint,
NutImpLen_rnk smallint,
HabImpLen_rnk smallint,
TempImpLen_rnk smallint,
PolImpLen_rnk smallint,
OtherLen_rnk smallint,
TotImpLen_rnk smallint,
NID_rnk smallint,
triassic_rnk smallint,
FHlth_Rnk smallint
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

create table wind_avg(
HUC_12 char(12) primary key,
WPC_avg numeric(6,3)
);

create table wind_rnk(
HUC_12 char(12) primary key,
WPC_rnk smallint
);

create table slamm_lc_ha(
HUC_12 char(12) primary key,
lc0010ha smallint,
lc0020ha smallint,
lc0030ha smallint,
lc0040ha smallint,
lc0050ha smallint
);

create table slamm_lc_rnk(
HUC_12 char(12) primary key,
lc0010rnk smallint,
lc0020rnk smallint,
lc0030rnk smallint,
lc0040rnk smallint,
lc0050rnk smallint
);

create table slamm_up_ha(
HUC_12 char(12) primary key,
up0010ha smallint,
up0020ha smallint,
up0030ha smallint,
up0040ha smallint,
up0050ha smallint
);

create table slamm_up_rnk(
HUC_12 char(12) primary key,
up0010rnk smallint,
up0020rnk smallint,
up0030rnk smallint,
up0040rnk smallint,
up0050rnk smallint
);


copy ea_pol from '/home/jim/Desktop/ncthreats_tables/tblEA_Pol.txt' with csv header;
copy ea_h20 from '/home/jim/Desktop/ncthreats_tables/tblEA_h2o_SD.txt' with csv header;
copy lcscen_a_ha from '/home/jim/Desktop/ncthreats_tables/tblLCScen_A_ha.txt' with csv header;
copy lcscen_b_ha from '/home/jim/Desktop/ncthreats_tables/tblLCScen_B_ha.txt' with csv header;
copy lcscen_c_ha from '/home/jim/Desktop/ncthreats_tables/tblLCScen_C_ha.txt' with csv header;
copy lcscen_d_ha from '/home/jim/Desktop/ncthreats_tables/tblLCScen_D_ha.txt' with csv header;
copy lcscen_e_ha from '/home/jim/Desktop/ncthreats_tables/tblLCScen_E_ha.txt' with csv header;
copy lcscen_x_ha from '/home/jim/Desktop/ncthreats_tables/tblLCScen_X_ha.txt' with csv header;

copy lcscen_a_rnk from '/home/jim/Desktop/ncthreats_tables/tblLCScen_A_rnk3.txt' with csv header;
copy lcscen_b_rnk from '/home/jim/Desktop/ncthreats_tables/tblLCScen_B_rnk3.txt' with csv header;
copy lcscen_c_rnk from '/home/jim/Desktop/ncthreats_tables/tblLCScen_C_rnk3.txt' with csv header;
copy lcscen_d_rnk from '/home/jim/Desktop/ncthreats_tables/tblLCScen_D_rnk3.txt' with csv header;
copy lcscen_e_rnk from '/home/jim/Desktop/ncthreats_tables/tblLCScen_E_rnk3.txt' with csv header;
copy lcscen_x_rnk from '/home/jim/Desktop/ncthreats_tables/tblLCScen_X_rnk3.txt' with csv header;

copy urban_den from '/home/jim/Desktop/ncthreats_tables/tblUrban_den.txt' with csv header;
copy urban_ha from '/home/jim/Desktop/ncthreats_tables/tblUrban_ha.txt' with csv header;
copy urban_den_rnk from '/home/jim/Desktop/ncthreats_tables/tblUrban_den_rnk.txt' with csv header;
copy urban_ha_rnk from '/home/jim/Desktop/ncthreats_tables/tblUrban_ha_rnk.txt' with csv header;
copy transportation_rnk from '/home/jim/Desktop/ncthreats_tables/tblDCLRds_rnk.txt' with csv header;
copy static_rnk from '/home/jim/Desktop/ncthreats_tables/tblStatic_rnk.txt' with csv header;
copy wind_avg from '/home/jim/Desktop/ncthreats_tables/tblWPC_avg.txt' with csv header;
copy wind_rnk from '/home/jim/Desktop/ncthreats_tables/tblWPC_rnk.txt' with csv header;


copy energy_dev from '/home/jim/Desktop/ncthreats_tables/tblTriassic_data.txt' with csv header;
copy forest_health from '/home/jim/Desktop/ncthreats_tables/tblFHlth_data.txt' with csv header;
copy transportation from '/home/jim/Desktop/ncthreats_tables/tblDCLRds_mha.txt' with csv header;
copy slamm_lc_ha from '/home/jim/Desktop/ncthreats_tables/tblSlamm_lc_ha.txt' with csv header;
copy slamm_lc_rnk from '/home/jim/Desktop/ncthreats_tables/tblSlamm_lc_rnk.txt' with csv header;
copy slamm_up_ha from '/home/jim/Desktop/ncthreats_tables/tblSlamm_up_ha.txt' with csv header;
copy slamm_up_rnk from '/home/jim/Desktop/ncthreats_tables/tblSlamm_up_rnk.txt' with csv header;

copy legend_data from '/home/jim/Desktop/ncthreats_tables/legend_data.csv' with csv header;



