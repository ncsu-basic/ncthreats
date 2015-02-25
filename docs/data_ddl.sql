drop table ea_pol;
drop table ea_h20;
drop table lcscen_a_ha;
drop table lcscen_b_ha;
drop table lcscen_c_ha;
drop table lcscen_d_ha;
drop table lcscen_e_ha;
drop table lcscen_x_ha;
drop table lcscen_a_pct;
drop table lcscen_b_pct;
drop table lcscen_c_pct;
drop table lcscen_d_pct;
drop table lcscen_e_pct;
drop table lcscen_x_pct;
drop table urban_den;
drop table urban_ha;
drop table urban_pct;

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

create  table lcscen_a_pct(
HUC_12 char(12) primary key,
frst10pct numeric(10),
frst20pct numeric(10),
frst30pct numeric(10),
frst40pct numeric(10),
frst50pct numeric(10),
ftwt10pct numeric(10),
ftwt20pct numeric(10),
ftwt30pct numeric(10),
ftwt40pct numeric(10),
ftwt50pct numeric(10),
hbwt10pct numeric(10),
hbwt20pct numeric(10),
hbwt30pct numeric(10),
hbwt40pct numeric(10),
hbwt50pct numeric(10),
open10pct numeric(10),
open20pct numeric(10),
open30pct numeric(10),
open40pct numeric(10),
open50pct numeric(10),
shrb10pct numeric(10),
shrb20pct numeric(10),
shrb30pct numeric(10),
shrb40pct numeric(10),
shrb50pct numeric(10)
);



create  table lcscen_b_pct(
HUC_12 char(12) primary key,
frst10pct numeric(10),
frst20pct numeric(10),
frst30pct numeric(10),
frst40pct numeric(10),
frst50pct numeric(10),
ftwt10pct numeric(10),
ftwt20pct numeric(10),
ftwt30pct numeric(10),
ftwt40pct numeric(10),
ftwt50pct numeric(10),
hbwt10pct numeric(10),
hbwt20pct numeric(10),
hbwt30pct numeric(10),
hbwt40pct numeric(10),
hbwt50pct numeric(10),
open10pct numeric(10),
open20pct numeric(10),
open30pct numeric(10),
open40pct numeric(10),
open50pct numeric(10),
shrb10pct numeric(10),
shrb20pct numeric(10),
shrb30pct numeric(10),
shrb40pct numeric(10),
shrb50pct numeric(10)
);

create  table lcscen_c_pct(
HUC_12 char(12) primary key,
frst10pct numeric(10),
frst20pct numeric(10),
frst30pct numeric(10),
frst40pct numeric(10),
frst50pct numeric(10),
ftwt10pct numeric(10),
ftwt20pct numeric(10),
ftwt30pct numeric(10),
ftwt40pct numeric(10),
ftwt50pct numeric(10),
hbwt10pct numeric(10),
hbwt20pct numeric(10),
hbwt30pct numeric(10),
hbwt40pct numeric(10),
hbwt50pct numeric(10),
open10pct numeric(10),
open20pct numeric(10),
open30pct numeric(10),
open40pct numeric(10),
open50pct numeric(10),
shrb10pct numeric(10),
shrb20pct numeric(10),
shrb30pct numeric(10),
shrb40pct numeric(10),
shrb50pct numeric(10)
);

create  table lcscen_d_pct(
HUC_12 char(12) primary key,
frst10pct numeric(10),
frst20pct numeric(10),
frst30pct numeric(10),
frst40pct numeric(10),
frst50pct numeric(10),
ftwt10pct numeric(10),
ftwt20pct numeric(10),
ftwt30pct numeric(10),
ftwt40pct numeric(10),
ftwt50pct numeric(10),
hbwt10pct numeric(10),
hbwt20pct numeric(10),
hbwt30pct numeric(10),
hbwt40pct numeric(10),
hbwt50pct numeric(10),
open10pct numeric(10),
open20pct numeric(10),
open30pct numeric(10),
open40pct numeric(10),
open50pct numeric(10),
shrb10pct numeric(10),
shrb20pct numeric(10),
shrb30pct numeric(10),
shrb40pct numeric(10),
shrb50pct numeric(10)
);

create  table lcscen_e_pct(
HUC_12 char(12) primary key,
frst10pct numeric(10),
frst20pct numeric(10),
frst30pct numeric(10),
frst40pct numeric(10),
frst50pct numeric(10),
ftwt10pct numeric(10),
ftwt20pct numeric(10),
ftwt30pct numeric(10),
ftwt40pct numeric(10),
ftwt50pct numeric(10),
hbwt10pct numeric(10),
hbwt20pct numeric(10),
hbwt30pct numeric(10),
hbwt40pct numeric(10),
hbwt50pct numeric(10),
open10pct numeric(10),
open20pct numeric(10),
open30pct numeric(10),
open40pct numeric(10),
open50pct numeric(10),
shrb10pct numeric(10),
shrb20pct numeric(10),
shrb30pct numeric(10),
shrb40pct numeric(10),
shrb50pct numeric(10)
);

create  table lcscen_x_pct(
HUC_12 char(12) primary key,
frst10pct numeric(10),
frst20pct numeric(10),
frst30pct numeric(10),
frst40pct numeric(10),
frst50pct numeric(10),
ftwt10pct numeric(10),
ftwt20pct numeric(10),
ftwt30pct numeric(10),
ftwt40pct numeric(10),
ftwt50pct numeric(10),
hbwt10pct numeric(10),
hbwt20pct numeric(10),
hbwt30pct numeric(10),
hbwt40pct numeric(10),
hbwt50pct numeric(10),
open10pct numeric(10),
open20pct numeric(10),
open30pct numeric(10),
open40pct numeric(10),
open50pct numeric(10),
shrb10pct numeric(10),
shrb20pct numeric(10),
shrb30pct numeric(10),
shrb40pct numeric(10),
shrb50pct numeric(10)
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

create  table urban_pct(
HUC_12 char(12) primary key,
urb10pct numeric(10),
urb20pct numeric(10),
urb30pct numeric(10),
urb40pct numeric(10),
urb50pct numeric(10)
);



copy ea_pol from '/home/jim/Desktop/ncthreats_tables/tblEA_Pol.txt' with csv header;
copy ea_h20 from '/home/jim/Desktop/ncthreats_tables/tblEA_h2o.txt' with csv header;
copy lcscen_a_ha from '/home/jim/Desktop/ncthreats_tables/tblLCScen_A_ha.txt' with csv header;
copy lcscen_b_ha from '/home/jim/Desktop/ncthreats_tables/tblLCScen_B_ha.txt' with csv header;
copy lcscen_c_ha from '/home/jim/Desktop/ncthreats_tables/tblLCScen_C_ha.txt' with csv header;
copy lcscen_d_ha from '/home/jim/Desktop/ncthreats_tables/tblLCScen_D_ha.txt' with csv header;
copy lcscen_e_ha from '/home/jim/Desktop/ncthreats_tables/tblLCScen_E_ha.txt' with csv header;
copy lcscen_x_ha from '/home/jim/Desktop/ncthreats_tables/tblLCScen_X_ha.txt' with csv header;
copy lcscen_a_pct from '/home/jim/Desktop/ncthreats_tables/tblLCScen_A_pct.txt' with csv header;
copy lcscen_b_pct from '/home/jim/Desktop/ncthreats_tables/tblLCScen_B_pct.txt' with csv header;
copy lcscen_c_pct from '/home/jim/Desktop/ncthreats_tables/tblLCScen_C_pct.txt' with csv header;
copy lcscen_d_pct from '/home/jim/Desktop/ncthreats_tables/tblLCScen_D_pct.txt' with csv header;
copy lcscen_e_pct from '/home/jim/Desktop/ncthreats_tables/tblLCScen_E_pct.txt' with csv header;
copy lcscen_x_pct from '/home/jim/Desktop/ncthreats_tables/tblLCScen_X_pct.txt' with csv header;
copy urban_den from '/home/jim/Desktop/ncthreats_tables/tblUrban_den.txt' with csv header;
copy urban_ha from '/home/jim/Desktop/ncthreats_tables/tblUrban_ha.txt' with csv header;
copy urban_pct from '/home/jim/Desktop/ncthreats_tables/tblUrban_pct.txt' with csv header;


