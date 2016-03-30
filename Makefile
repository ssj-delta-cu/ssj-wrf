#!/usr/bin/make -f 
PG:=psql -d quinn 
wrf_srid:=98521
wrf_gcs:=98523

insert:
	curl http://spatialreference.org/ref/sr-org/8521/postgis/ | ${PG} 
	curl http://spatialreference.org/ref/sr-org/8523/postgis/ | ${PG}
