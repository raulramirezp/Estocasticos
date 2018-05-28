$(document).ready(function () {
    function dataFactory(url, type) {
        return $.getJSON(url, function (data) {
            if (type === "rent") {
                locations = [];
                labels = [];
                rent = [];
                $.each(data.data, function (key, val) {
                    /*Community Area, property, address, phone, lat, lng*/
                    if (val[19] != null && val[20] != null) {
                        locations.push(new google.maps.LatLng(val[20], val[19]));
                        rent.push([val[9], val[11], val[12], val[14], val[19], val[20]]);
                    }
                });
                //console.log(data);
            }
            else if (type === "crimes") {
                crimes = [];
                $.each(data.data, function (key, val) {
                    /*Community area, Date, type, place, lat, lng  */
                    if (val[10] != null && (val[13] != null && val[15] != null) && (val[21] != null && val[27] != null && val[28] != null)) {
                        crimes.push([val[21], val[10], val[13], val[15], val[27], val[28]]);
                    }
                });
                //console.log(data);
            }
            else if (type === "crimesassault") {
                crimesassault = [];
                $.each(data.data, function (key, val) {
                    /*Community area, Date, type, place, lat, lng  */
                    if (val[10] != null && (val[13] != null && val[15] != null) && (val[21] != null && val[27] != null && val[28] != null)) {
                        crimesassault.push([val[21], val[10], val[13], val[15], val[27], val[28]]);
                    }
                });
            }
            else if (type === "parks") {
                parks = [];
                parksLocations = [];
                $.each(data.data, function (key, val) {
                    /*Park name, address, area, lat, lng  */
                    if (val[9] != null && val[10] != null && val[82][1] != null && val[82][2] != null) {
                        parks.push([val[9], val[10]]);
                        parksLocations.push(new google.maps.LatLng(val[82][1], val[82][2]));
                    }
                });
            }
        });
    }

    dataFactory('https://data.cityofchicago.org/api/views/s6ha-ppgi/rows.json?accessType=DOWNLOAD', 'rent');
    dataFactory('https://data.cityofchicago.org/api/views/itbm-jtnw/rows.json?accessType=DOWNLOAD', 'crimes');
    dataFactory('https://data.cityofchicago.org/api/views/i5kt-jcf2/rows.json?accessType=DOWNLOAD', 'crimesassault');
    dataFactory('https://data.cityofchicago.org/api/views/2eaw-bdhe/rows.json?accessType=DOWNLOAD', 'parks')

});
