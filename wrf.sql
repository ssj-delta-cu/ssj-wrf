-- http://www.pkrc.net/wrf-lambert.html

create table moad (
moad integer primary key,
parent_moad integer,
parent_grid_ratio integer,
i_parent_start integer,
j_parent_start integer,
dx integer,
dy integer,
e_we integer,
e_sn integer);

insert into moad (VALUES (
(1,1,1,1,1,12000,12000,110,152),
(2,1,3,24,24,4000,4000,190,313)
);

create view center 
as with p as (
 select st_transform(st_setsrid(st_makepoint(-119,37.5),98523),98521) as p 
)
select 
st_x(p) as x,
st_y(p) as y
from p;

-- with w as (select moad,dx*e_we as width,dy*e_sn as height from moad) 
--select moad,c.x-w.width/2 as ulx,c.y+w.height/2 as uly,c.x+w.width/2 as lrx,c.y-w.height/2 as lry from w,center c;
