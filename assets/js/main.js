let map;
let communityAreas = {};
let locations = [], rent = [], crimes = [], crimesassault = [], parks = [], parksLocations = [];

/*variables que contendran la informacion en "infowindow" de google maps*/
let contentStringSiteA;
let contentStringSiteB;

function initMap() {
    const locationComputerEngineering = {lat: 41.8708, lng: -87.6505};
    map = new google.maps.Map(document.getElementById('map'), {
        center: locationComputerEngineering,
        zoom: 12
    });

    const marker = new google.maps.Marker({
        position: locationComputerEngineering,
        icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
        map: map
    });

    const contentString = '<div id="content">' +
        '<div id="siteNotice">' +
        '</div>' +
        '<h1 id="firstHeading" class="firstHeading">UIC</h1>' +
        '<div id="bodyContent">' +
        '<p><b>"The largest university in one of the world’s most vibrant cities</b>.' +
        'The University of Illinois at Chicago is an acclaimed research institution ' +
        ' with 15 colleges dedicated to the discovery and distribution of knowledge."' +
        '</div>' +
        '</div>';

    const infowindow = new google.maps.InfoWindow({
        content: contentString,
        maxWidth: 200
    });

    marker.addListener('click', function () {
        infowindow.close();
        infowindow.open(map, marker);
    });

    map.addListener('click', function () {
        infowindow.close();
    });

    function parksCluster() {
        let i;
        const maxParks = 2000;
        let contentStringParks = [maxParks];
        let infowindowParks = [maxParks];

        for (i = 0; i < maxParks; i++) {
            /*Create content for each site*/
            contentStringParks[i] = '<div id="contentSiteA">' +
                '<div id="siteNoticeA">' +
                '</div>' +
                '<h2 id="firstHeading" class="firstHeading">Park information</h2>' +
                '<div id="bodyContent">' +
                '<h5 id="firstHeading" class="firstHeading">Address:</h5>' +
                parks[i][1] +
                '</div>' +
                '</div>';
            /*Create new google InfoWindow for each site*/
        }


        for (i = 0; i < maxParks; i++) {
            infowindowParks[i] = new google.maps.InfoWindow({
                content: contentStringParks[i],
                maxWidth: 300
            });
        }

        let markers = [];
        for (i = 0; i < maxParks; i++) {
            markers.push(mapLocation(parksLocations[i], i, infowindowParks));
        }
        // Add a marker clusterer to manage the markers.
        var parksCluster = new MarkerClusterer(map, markers,
            {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});

    }

    function mapLocation(location, i, infowindowParks) {
        let marker = new google.maps.Marker({
            position: location,
        });
        marker.addListener('click', function () {
            infowindowParks[i].open(map, marker);
        });
        return marker;
    }

    function markersCluster() {
        var contentStringSites = [locations.length];
        var infowindowSites = [locations.length];
        for (i in locations) {
            /*Create content for each site*/
            contentStringSites[i] = '<div id="contentSiteA">' +
                '<div id="siteNoticeA">' +
                '</div>' +
                '<h2 id="firstHeading" class="firstHeading">Site information</h2>' +
                '<div id="bodyContent">' +
                '<h5 id="firstHeading" class="firstHeading">Community area:</h5>' +
                rent[i][0] + ' - ' + communityAreas[rent[i][0]] +
                '<h5 id="firstHeading" class="firstHeading">Property:</h5>' +
                rent[i][1] +
                '<h5 id="firstHeading" class="firstHeading">Address:</h5>' +
                rent[i][2] +
                '<h5 id="firstHeading" class="firstHeading">Phone:</h5>' +
                rent[i][3] +
                '</div>' +
                '</div>';
            /*Create new google InfoWindow for each site*/
        }
        for (i in locations) {
            infowindowSites[i] = new google.maps.InfoWindow({
                content: contentStringSites[i],
                maxWidth: 300
            });
        }
        for (i in locations) {
            var markers = locations.map(function (location, i) {
                var marker = new google.maps.Marker({
                    position: location,
                });
                marker.addListener('click', function () {
                    infowindowSites[i].open(map, marker);
                });
                return marker;
            });
        }

        // Add a marker clusterer to manage the markers.
        let markersCluster = new MarkerClusterer(map, markers,
            {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});

    }

    function drawbestNeighborhood( allInformation, bestNeighborhood ){
        console.log( "Best community area "+ bestNeighborhood  );
        console.log(" Informacion de bestComunity area "+ allInformation[bestNeighborhood]['rents'][0]);
        console.log("Tamaño de rentas en esa zona " + allInformation[bestNeighborhood]['rents'].length);

        var contentStringSites = [allInformation[bestNeighborhood]['rents'].length];
        var infowindowSites = [allInformation[bestNeighborhood]['rents'].length];
        let bestNeighborhoodLocations = [];
        let lat;
        let long;

        for (i in allInformation[bestNeighborhood]['rents']) {
            lat = allInformation[bestNeighborhood]['rents'][i][4];
            long = allInformation[bestNeighborhood]['rents'][i][3];
            console.log(" latitud y logitud " + lat + long);
            /* Get locations for rents in the choise community area*/
            bestNeighborhoodLocations.push(new google.maps.LatLng(lat, long));

            /*Create content for each site*/
            contentStringSites[i] = '<div id="contentSiteA">' +
                '<div id="siteNoticeA">' +
                '</div>' +
                '<h2 id="firstHeading" class="firstHeading">Site information</h2>' +
                '<div id="bodyContent">' +
                '<h5 id="firstHeading" class="firstHeading">Community area:</h5>' +
                bestNeighborhood + ' - ' + communityAreas[bestNeighborhood] +
                '<h5 id="firstHeading" class="firstHeading">Property:</h5>' +
                allInformation[bestNeighborhood]['rents'][i][0] +
                '<h5 id="firstHeading" class="firstHeading">Address:</h5>' +
                allInformation[bestNeighborhood]['rents'][i][1] +
                '<h5 id="firstHeading" class="firstHeading">Phone:</h5>' +
                allInformation[bestNeighborhood]['rents'][i][2] +
                '</div>' +
                '</div>';
            /*Create new google InfoWindow for each site*/
        }
        for (i in allInformation[bestNeighborhood]['rents']) {
            infowindowSites[i] = new google.maps.InfoWindow({
                content: contentStringSites[i],
                maxWidth: 300
            });
        }
        for (i in bestNeighborhoodLocations) {
            var markers = bestNeighborhoodLocations.map(function (location, i) {
                var marker = new google.maps.Marker({
                    position: location,
                });
                marker.addListener('click', function () {
                    infowindowSites[i].open(map, marker);
                });
                return marker;
            });
        }

        // Add a marker clusterer to manage the markers.
        let markersCluster = new MarkerClusterer(map, markers,
            {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});

    }

    initMap.markersCluster = markersCluster;
    initMap.parksCluster = parksCluster;
    initMap.drawbestNeighborhood = drawbestNeighborhood;
}

function defaultRecommendation(allInformation, priceProbChoice, securityProbChoice, parksProbChoice) {
    let bestNeighborhood;
    let maxLikelihood = 0;

    function calculateLikelihood(communityRents, communityCrimes, communityParks, userRentsChoice, userCrimesChoice, userParksChoice) {
        return (communityRents * userRentsChoice) +
            ((1 - communityCrimes) * userCrimesChoice) +
            (communityParks * userParksChoice);
    }

    for (let key in allInformation) {
        if (allInformation.hasOwnProperty(key)) {
            let communityArea = allInformation[key];

            let likelyhood = calculateLikelihood(communityArea['percentage_rents'],
                communityArea['percentage_crimes'],
                communityArea['percentage_parks'],
                priceProbChoice,
                securityProbChoice,
                parksProbChoice);

            if (likelyhood > maxLikelihood) {
                maxLikelihood = likelyhood;
                bestNeighborhood = key;
            }

        }
    }

    const likelihoodPercentage = maxLikelihood * 100;
    alert("Tienes una afinidad del " + likelihoodPercentage.toFixed(2) + "% con la 'community area' " + bestNeighborhood + " - " + communityAreas[bestNeighborhood] + "");
    initMap.drawbestNeighborhood(allInformation, bestNeighborhood);
}

function RestartValues() {
    contentStringSiteA = "";
    contentStringSiteB = "";
    initMap();
}

function findPlace() {
    /*Restart values */
    RestartValues();
    const allInformation = {};
    /*
    Solo se tendran en cuenta las "Community Areas" donde hayan lugares en arriendo
            allInformation es un arreglo de diccionarios, donde cada posición corresponde a una community area
            y cada una tiene un diccionario con las llaves: 'rents', 'crimes' y a su vez 'crimes' contiene
            'weaponsviolation' y 'crimesassault'
    */
    let sumRents = 0;
    let sumCrimes = 0;
    let sumParks = 0;


    for (let i in rent) {
        // rent[i][0] = Community Area
        if (!(rent[i][0] in allInformation)) {
            allInformation[rent[i][0]] = new Object({
                'rents': [],
                'crimes': new Object({'weaponsviolation': [], 'crimesassault': []}),
                'parks': [],
                'percentage_rents': 0,
                'percentage_crimes': 0,
                'percentage_parks': 0
            });
        }
        allInformation[rent[i][0]]['rents'].push([rent[i][1], rent[i][2], rent[i][3], rent[i][4], rent[i][5]]);
        sumRents++;
    }

    for (let i in crimes) {
        // crimes[i][0] =  Community Area
        if ((crimes[i][0] in allInformation)) {
            allInformation[crimes[i][0]]['crimes']['weaponsviolation'].push([crimes[i][1], crimes[i][2], crimes[i][3], crimes[i][4], crimes[i][5]]);
            sumCrimes++;
        }
    }

    for (let i in crimesassault) {
        // crimesassault[i][0] =  Community Area
        if ((crimesassault[i][0] in allInformation)) {
            allInformation[crimesassault[i][0]]['crimes']['crimesassault'].push([crimesassault[i][1], crimesassault[i][2], crimesassault[i][3], crimesassault[i][4], crimesassault[i][5]]);
            sumCrimes++;
        }
    }

    for (let i in parks) {
        // parks[i][0] =  Community Area
        if ((parks[i][0] in allInformation)) {
            allInformation[parks[i][0]]['parks'].push(parks[i]);
            sumParks++;
        }
    }


    let sumPercentageRents = 0;
    let sumPercentageCrimes = 0;
    let sumPercentageParks = 0;

    for (let key in allInformation) {
        if (allInformation.hasOwnProperty(key)) {
            let communityArea = allInformation[key];
            communityArea['percentage_rents'] = communityArea['rents'].length / sumRents;
            communityArea['percentage_crimes'] = (communityArea['crimes']['weaponsviolation'].length + communityArea['crimes']['crimesassault'].length) / sumCrimes;
            communityArea['percentage_parks'] = communityArea['parks'].length / sumParks;

            sumPercentageRents += communityArea['percentage_rents'];
            sumPercentageCrimes += communityArea['percentage_crimes'];
            sumPercentageParks += communityArea['percentage_parks'];
        }
    }

    console.log("Validation Percentage Rents " + " : " + sumPercentageRents);
    console.log("Validation Percentage Crimes " + " : " + sumPercentageCrimes);
    console.log("Validation Percentage Parks " + " : " + sumPercentageParks);


    let priceProbChoice = parseFloat(document.getElementById("price").value);
    let securityProbChoice = parseFloat(document.getElementById("security").value);
    let parksProbChoice = parseFloat(document.getElementById("parks").value);
    let sumProbability = parseFloat(priceProbChoice) + parseFloat(securityProbChoice) + parseFloat(parksProbChoice);
    console.log("prob " + sumProbability);

    if (sumProbability !== 1.0) {
        alert("Recuerda que la suma de las probabilidades debe ser 1.0!");
    }
    else {
        defaultRecommendation(allInformation, priceProbChoice, securityProbChoice, parksProbChoice);
    }

    console.log("Probabilidad de elegir por precio precio " + priceProbChoice);
    console.log("Probabilidad de elegir por precio seguridad " + securityProbChoice);
    console.log("Probabilidad de elegir por precio parques " + parksProbChoice);


}

function showAllParks() {
    RestartValues();
    initMap.parksCluster();
}

function showAllSites() {
    RestartValues();
    initMap.markersCluster();
}
