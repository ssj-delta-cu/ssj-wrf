function lambert_from_spherical(xlon, ylat,opt) {
    /*
     * Code partially based on the TERRAIN preprocessor for MM5 v2.0,
     * developed by Yong-Run Guo and Sue Chen, National Center for
     * Atmospheric Research, and Pennsylvania State University
     * 10/21/1993
     */
    var sign, pole, xn, psi1, psi0, xc, yc, flp, r, psx, ylon;
    var xloc, yloc;
    var conv = 57.29578;
    var a = 6370.;

    // This part may be precomputed
    if (opt.MOAD_CEN_LAT < 0.) {
        sign = -1.;
    } else {
        sign = 1.;
    }
    pole = 90.;
    if (Math.abs(opt.TRUELAT1) > 90.) {
        opt.TRUELAT1 = 60.;
        opt.TRUELAT2 = 30.;
        opt.TRUELAT1 = sign * opt.TRUELAT1;
        opt.TRUELAT2 = sign * opt.TRUELAT2;
    }
    if (opt.TRUELAT1 == opt.TRUELAT2) {
        xn = Math.sin(opt.TRUELAT2 / conv);
    } else {
        xn = Math.log10(Math.cos(opt.TRUELAT1 / conv)) -
                Math.log10(Math.cos(opt.TRUELAT2 / conv));
        xn = xn / (Math.log10(Math.tan((45. - sign * opt.TRUELAT1 / 2.) / conv)) -
                Math.log10(Math.tan((45. - sign * opt.TRUELAT2 / 2.) / conv)));
    }
    psi1 = 90. - sign * opt.TRUELAT1;
    psi1 = psi1 / conv;
    if (opt.MOAD_CEN_LAT < 0.) {
        psi1 = -psi1;
        pole = -pole;
    }
    psi0 = (pole - opt.MOAD_CEN_LAT) / conv;
    xc = 0.;
    yc = -a / xn * Math.sin(psi1) * Math.pow(Math.tan(psi0 / 2.) /
            Math.tan(psi1 / 2.), xn);

    // Actual computation for the specified location
    ylon = xlon - opt.STAND_LON;
    if (ylon > 180.) ylon = ylon - 360.;
    if (ylon < -180.) ylon = ylon + 360.;
    flp = xn * ylon / conv;
    psx = (pole - ylat) / conv;
    r = -a / xn * Math.sin(psi1) * Math.pow(Math.tan(psx / 2.) /
            Math.tan(psi1 / 2.), xn);
    if (opt.MOAD_CEN_LAT < 0.) {
        xloc = r * Math.sin(flp);
        yloc = r * Math.cos(flp);
    } else {
        xloc =  -r * Math.sin(flp);
        yloc =  r * Math.cos(flp);
    }

    xloc = xloc - xc;
    yloc = yloc - yc;
    return [xloc, yloc];
}

var opt={
 MOAD_CEN_LAT:37.5,
 STAND_LON:-96,
 TRUELAT1:33,
 TRUELAT2:45
};
var xlon=-119;
var ylat=37.5;

console.log(lambert_from_spherical(xlon, ylat,opt));
