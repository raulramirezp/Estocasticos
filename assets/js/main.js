var map;
var st = 0, ap = 0, we = 0;
var locations = [], rent = [],  crimes = [], crimesassault = [],parks = [],parksLocations = [];

/*variables que contendran la informacion en "infowindow" de google maps*/
var contentStringSiteA;
var contentStringSiteB;

function initMap() {
	var locationComputerEngineering = {lat: 41.8708, lng: -87.6505};
  map = new google.maps.Map(document.getElementById('map'), {
  center: locationComputerEngineering,
  zoom: 12
  });

	var marker = new google.maps.Marker({
    position: locationComputerEngineering,
    icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
    map:map
  });

	var contentString = '<div id="content">'+
            '<div id="siteNotice">'+
            '</div>'+
            '<h1 id="firstHeading" class="firstHeading">UIC</h1>'+
            '<div id="bodyContent">'+
            '<p><b>"The largest university in one of the world’s most vibrant cities</b>.'+
						'The University of Illinois at Chicago is an acclaimed research institution ' +
						' with 15 colleges dedicated to the discovery and distribution of knowledge."'+
            '</div>'+
            '</div>';

  var infowindow = new google.maps.InfoWindow({
  	content: contentString,
    maxWidth: 200
  });

	marker.addListener('click', function() {
		infowindow.open(map, marker);
	});

	function parksCluster(){
		var contentStringParks = [parks.length];
		var infowindowParks = [parks.length];


		for(i in parks){
			/*Create content for each site*/
			contentStringParks[i] = '<div id="contentSiteA">'+
								'<div id="siteNoticeA">'+
								'</div>'+
								'<h2 id="firstHeading" class="firstHeading">Park information</h2>'+
								'<div id="bodyContent">'+
								'<h5 id="firstHeading" class="firstHeading">Park name:</h5>'+
								parks[i][0]+
								'<h5 id="firstHeading" class="firstHeading">Address:</h5>'+
								parks[i][1]+
								'</div>'+
								'</div>';
			/*Create new google InfoWindow for each site*/
		}

		for ( i in parks){
			infowindowParks[i] = new google.maps.InfoWindow({
									content: contentStringParks[i],
									maxWidth: 300
			});
		}
		for(i in parks){
		var markers = parksLocations.map(function(location, i) {
			var marker = new google.maps.Marker({
				position: location,
			});
			marker.addListener('click', function() {
				infowindowParks[i].open(map, marker);

			});
		  return marker;
		});
		}
		// Add a marker clusterer to manage the markers.
		var parksCluster = new MarkerClusterer(map, markers,
				{imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});

	}
	function markersCluster(){
		var contentStringSites = [rent.length];
		var infowindowSites = [rent.length];
		
		for(i in rent){
			/*Create content for each site*/
			contentStringSites[i] = '<div id="contentSiteA">'+
								'<div id="siteNoticeA">'+
								'</div>'+
								'<h2 id="firstHeading" class="firstHeading">Site information</h2>'+
								'<div id="bodyContent">'+
								'<h5 id="firstHeading" class="firstHeading">Community area:</h5>'+
								rent[i][0]+
								'<h5 id="firstHeading" class="firstHeading">Property:</h5>'+
								rent[i][1]+
								'<h5 id="firstHeading" class="firstHeading">Address:</h5>'+
								rent[i][2]+
								'<h5 id="firstHeading" class="firstHeading">Phone:</h5>'+
								rent[i][3]+
								'</div>'+
								'</div>';
			/*Create new google InfoWindow for each site*/
		}
		for( i in rent){
			infowindowSites[i] = new google.maps.InfoWindow({
									content: contentStringSites[i],
									maxWidth: 300
			});
		}
		for( i in rent){
		var lmarkers = locations.map(function(location, i) {
			var marker = new google.maps.Marker({
				position: location,
			});
			marker.addListener('click', function() {
				infowindowSites[i].open(map, marker);
			});
		  return marker;
		});
		}
		console.log("lmarkers "+ lmarkers);
		// Add a marker clusterer to manage the markers.
		var markerCluster = new MarkerClusterer(map, lmarkers,
			{imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});

	}

	initMap.markersCluster = markersCluster;
	initMap.parksCluster = parksCluster;
}


/*algorithm recommendation*/
function defaultRecommendation(allInformation, closeLocations){
	console.log("Teoría de la desición aquí");
}

function RestartValues(){
	st = 0, ap = 0, we = 0;
	contentStringSiteA = "";
	contentStringSiteB = "";
	initMap();
}
function findPlace(){
		/*Restart values */
		RestartValues();
		var allInformation = {};
		var closeLocations = [28,32,33,8,24,27,31,29,30,23];
	/*Solo se tendran en cuenta las "Community Areas" donde hayan lugares en arriendo
		Make links
	*/
	for( i in rent){
		if (!(rent[i][0] in allInformation))
			allInformation[rent[i][0]] = new Object({'rents':	new Array(),'crimes': new Object({'weaponsviolation':	new Array(),'crimesassault':	new Array()})});
		allInformation[rent[i][0]]['rents'].push([rent[i][1], rent[i][2], rent[i][3], rent[i][4], rent[i][5]]);
	}

	for( i in crimes){
		if ((crimes[i][0] in allInformation))
			allInformation[crimes[i][0]]['crimes']['weaponsviolation'].push([crimes[i][1], crimes[i][2], crimes[i][3], crimes[i][4], crimes[i][5]]);
		}

	for( i in crimesassault){
		if ((crimesassault[i][0] in allInformation))
			allInformation[crimesassault[i][0]]['crimes']['crimesassault'].push([crimesassault[i][1], crimesassault[i][2], crimesassault[i][3], crimesassault[i][4], crimesassault[i][5]]);
		}

	/*----Finish links----*/
	/* Estimate recommended places 
	 * Es esta función se implemente el algoritmo de toma de desición
	*/

	defaultRecommendation(allInformation, closeLocations);


}

function showAllParks(){
	RestartValues();
	initMap.parksCluster();
}

function showAllSites() {
		RestartValues();
		initMap.markersCluster();
}
