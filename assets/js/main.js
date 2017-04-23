var map;
var st = 0, ap = 0, we = 0;
var locations = [], rent = [], traffic =[], cook = [], crimes = [], crimesassault = [],parks = [],parksLocations = [];
var siteA = {}
var siteB = {}
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
	function drawRecommended(){

			var markerA = new google.maps.Marker({
		    position: siteA,
		    icon: 'https://maps.google.com/mapfiles/kml/shapes/homegardenbusiness.png',
		    map:map
		  });
			var markerB = new google.maps.Marker({
		    position: siteB,
		    icon: 'https://maps.google.com/mapfiles/kml/shapes/homegardenbusiness.png',
		    map:map
		  });
		  var infowindowSiteA = new google.maps.InfoWindow({
		  	content: contentStringSiteA,
		    maxWidth: 300
		  });

			markerA.addListener('click', function() {
			infowindowSiteA.open(map, markerA);
		});

		  var infowindowSiteB = new google.maps.InfoWindow({
		  	content: contentStringSiteB,
		    maxWidth: 300
		  });

			markerB.addListener('click', function() {
			infowindowSiteB.open(map, markerB);
		});
	}

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
		var contentStringSites = [locations.length];
		var infowindowSites = [locations.length];


		for(i in locations){
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
		for( i in locations){
			infowindowSites[i] = new google.maps.InfoWindow({
									content: contentStringSites[i],
									maxWidth: 300
			});
		}
		for( i in locations){
		var markers = locations.map(function(location, i) {
			var marker = new google.maps.Marker({
				position: location,
			});
			marker.addListener('click', function() {
				infowindowSites[i].open(map, marker);
			});
		  return marker;
		});
		}
		// Add a marker clusterer to manage the markers.
		var markerCluster = new MarkerClusterer(map, markers,
				{imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});

	}

		function drawPaths(){
			/*Draw paths*/
			var directionsServiceA = new google.maps.DirectionsService;
			var directionsServiceB = new google.maps.DirectionsService;
			var directionsDisplayA = new google.maps.DirectionsRenderer;
			var directionsDisplayB = new google.maps.DirectionsRenderer;
			directionsDisplayA.setMap(map);
			directionsServiceA.route({
			          origin: siteA	,
			          destination: locationComputerEngineering,
			          travelMode: 'DRIVING'
			        }, function(response, status) {
			          if (status === 'OK') {
			            directionsDisplayA.setDirections(response);
			          } else {
			            window.alert('Directions request failed due to ' + status);
			          }
							});
			directionsDisplayB.setMap(map)
			directionsServiceB.route({
		  	origin: siteB,
			  destination: locationComputerEngineering,
			  travelMode: 'DRIVING'
			  }, function(response, status) {
			  if (status === 'OK') {
			  	directionsDisplayB.setDirections(response);
			    } else {
			    	window.alert('Directions request failed due to ' + status);
			    }
					});

				var service = new google.maps.DistanceMatrixService;
				service.getDistanceMatrix({
				origins: [siteA, siteB],
				destinations: [locationComputerEngineering,locationComputerEngineering],
				travelMode: 'DRIVING',
				unitSystem: google.maps.UnitSystem.METRIC,
				avoidHighways: false,
				avoidTolls: false
				}, function(response, status) {
				if (status !== 'OK') {
				alert('Error was: ' + status);
				} else {
				var originList = response.originAddresses;
				var destinationList = response.destinationAddresses;
				var results = [];
				for (var i = 0; i < originList.length; i++)
	      	results.push(response.rows[i].elements);
				var elements = []
				for (var j = 0; j < results.length; j++)
					elements.push(results[j]);
				document.getElementById("distanceA").innerHTML = "Distance to UIC = "+elements[0][0].distance.text;
				document.getElementById("durationA").innerHTML = "Duration to UIC = "+elements[0][0].duration.text;
				document.getElementById("typeA").innerHTML = "DRIVING";

				document.getElementById("distanceB").innerHTML = "Distance to UIC = "+elements[1][0].distance.text;
				document.getElementById("durationB").innerHTML = "Duration to UIC = "+elements[1][0].duration.text;
				document.getElementById("typeB").innerHTML = "DRIVING";
			}
		});
	}
	initMap.drawPaths = drawPaths;
	initMap.markersCluster = markersCluster;
	initMap.drawRecommended = drawRecommended;
	initMap.parksCluster = parksCluster;
}

function distance(x2, x1, y2, y1 ) {
	return Math.sqrt(Math.pow((x2-x1), 2)+Math.pow((y2-y1), 2));
}

/*algorithm recommendation*/
function defaultRecommendation(allInformation, closeLocations){
	var siteinfor = [new Array(),new Array()], currentTotalRent = 0, currentTotalCrimes = 0;
	/*	area			Community area ,total rents, 	ilegal weapons, assault*/
	var area1 = [closeLocations[0],0,0,0], area2=[closeLocations[0], 0, 0,0];
	var lat = 41.8708 , lon = -87.6505;

	/* filter Community area */
	for(i in closeLocations){
		currentTotalRent = allInformation[closeLocations[i]]['rents'].length;
		currentTotalCrimesW = allInformation[closeLocations[i]]['crimes']['weaponsviolation'].length;
		currentTotalCrimesA = allInformation[closeLocations[i]]['crimes']['crimesassault'].length;
/*
		console.log(" Total rents to " + closeLocations[i] + " = "+allInformation[closeLocations[i]]['rents'].length);
		console.log(" Total crimes ts to " + closeLocations[i] + " = " +(
		allInformation[closeLocations[i]]['crimes']['weaponsviolation'].length+allInformation[closeLocations[i]]['crimes']['crimesassault'].length));
		console.log(" Traffic to " + closeLocations[i] + " = " +allInformation[closeLocations[i]]['traffic'][0]);
*/
		/*Initial values*/
		if(area1[1] == 0 && area2[1] == 0){
			area1[1] = currentTotalRent
			area2[1] = area1[1];
			area1[2] = currentTotalCrimesW;
			area2[2] = area1[2];
			area1[3] = currentTotalCrimesA;
			area2[3] = area1[3];
		}
		/* Update select area */
		if((area1[2]+area1[3]) > (currentTotalCrimesW+currentTotalCrimesA)){
			area1[0] = closeLocations[i];
			area1[1] = currentTotalRent;
			area1[2] = currentTotalCrimesW;
			area1[3] = currentTotalCrimesA;
		}
		/*It is more important the variable assault that weapons because the crime of weapos is considered when
		it is carried without documents, does not necessarily indicate danger*/
		else if(	(area1[2]+area1[3]) == (currentTotalCrimesW+currentTotalCrimesA)	){
			if(area1[3] > currentTotalCrimesA){
				area1[0] = closeLocations[i];
				area1[1] = currentTotalRent;
				area1[2] = currentTotalCrimesW;
				area1[3] = currentTotalCrimesA;
			}
		}
		if(currentTotalRent > 1)
			area2 = area1.slice(0);

	}
/*
	console.log("Area mas cercana recomendada " + area1[0]);
	console.log("Rentas " + area1[1]);
	console.log("Crimenes" + (area1[2]+area1[3]));
*/
	/*Filter the win sites*/
	var moreClose = [distance(allInformation[area1[0]]['rents'][0][3]  , lat, allInformation[area1[0]]['rents'][0][4], lon ),
										distance(allInformation[area1[0]]['rents'][1][3]  , lat, allInformation[area1[0]]['rents'][1][4], lon )];

	/*Default value for siteB*/
	siteinfor[1] = allInformation[area1[0]]['rents'][1].slice(0);
	for( i in allInformation[area1[0]]['rents']){
		if( moreClose[0] >  distance(allInformation[area1[0]]['rents'][i][3]  , lat, allInformation[area1[0]]['rents'][i][4], lon )){
				moreClose[0] = distance( allInformation[area1[0]]['rents'][i][3] , lat, allInformation[area1[0]]['rents'][i][4], lon );
				siteinfor[0] = allInformation[area1[0]]['rents'][i].slice(0);
			}
		else if( moreClose[1] >  distance(allInformation[area1[0]]['rents'][i][3]  , lat, allInformation[area1[0]]['rents'][i][4], lon )){
				moreClose[1] = distance( allInformation[area1[0]]['rents'][i][3] , lat, allInformation[area1[0]]['rents'][i][4], lon );
				siteinfor[1] = allInformation[area1[0]]['rents'][i].slice(0);
		}
	}

 	//siteA = new google.maps.LatLng(parseFloat(siteAinfor[3]), parseFloat(siteAinfor[4]));
	siteA = {lat: parseFloat(siteinfor[0][3]), lng: parseFloat(siteinfor[0][4])};
	siteB = {lat: parseFloat(siteinfor[1][3]), lng: parseFloat(siteinfor[1][4])};
	console.log(siteinfor);
	/*Build InfoWindows*/
	contentStringSiteA = '<div id="contentSiteA">'+
						'<div id="siteNoticeA">'+
						'</div>'+
						'<h2 id="firstHeading" class="firstHeading">Recommended site 1!!!</h2>'+
						'<div id="bodyContent">'+
						'<p>"This apartment has been chosen because it is the best option among all'+
						'the offers in chicaco, according to our algorithm of recommendation,which takes into account various types of crimes that occur throughout the city,'+
						 'and the distance of this with your university UIC, To be able to select the safest,affordable, comfortable and dry place to live while you study.'+
						 '<h3 >Basic information of this site:</h3>'+
						 '<h5 id="firstHeading" class="firstHeading">Crimes in 2017 in the Community area</h5>'+
						 (area1[2]+area1[3]) +
						 '<h5 id="firstHeading" class="firstHeading">Property:</h5>'+
						 siteinfor[0][0]+
						 '<h5 id="firstHeading" class="firstHeading">Address:</h5>'+
						 siteinfor[0][1]+
						 '<h5 id="firstHeading" class="firstHeading">Phone:</h5>'+
						 siteinfor[0][2]+
						'</div>'+
						'</div>';
	contentStringSiteB = '<div id="content">'+
					'<div id="siteNotice">'+
					'</div>'+
					'<h2 id="firstHeading" class="firstHeading">Recommended site 2!!!</h2>'+
					'<div id="bodyContent">'+
					'<p>"This apartment has been chosen because it is the best option among all'+
					'the offers in chicaco, according to our algorithm of recommendation,which takes into account various types of crimes that occur throughout the city,'+
					 'and the distance of this with your university UIC, To be able to select the safest,affordable, comfortable and dry place to live while you study.'+
					 '<h3 >Basic information of this site:</h3>'+
					 '<h5 id="firstHeading" class="firstHeading">Crimes in 2017 in the Community area:</h5>'+
					 (area1[2]+area1[3]) +
					 '<h5 id="firstHeading" class="firstHeading">Property:</h5>'+
					 siteinfor[1][0]+
					 '<h5 id="firstHeading" class="firstHeading">Address:</h5>'+
					 siteinfor[1][1]+
					 '<h5 id="firstHeading" class="firstHeading">Phone:</h5>'+
					 siteinfor[1][2]+
					'</div>'+
					'</div>';
	//initMap();
	initMap.drawPaths();
	initMap.drawRecommended();

}

function RestartValues(){
	document.getElementById('dashboard').innerHTML = "";
	st = 0, ap = 0, we = 0;
	contentStringSiteA = "";
	contentStringSiteB = "";
	initMap();
}
function doMagic(){
		/*Restart values */
		RestartValues();
		var allInformation = {};
		var closeLocations = [28,32,33,8,24,27,31,29,30,23];
	/*Solo se tendran en cuenta las "Community Areas" donde hayan lugares en arriendo
		Make links
	*/
	for( i in rent){
		if (!(rent[i][0] in allInformation))
			allInformation[rent[i][0]] = new Object({'rents':	new Array(),
																								'crimes': new Object({
																																			'weaponsviolation':	new Array(),
																																		  'crimesassault':	new Array()}),
																								'traffic': new Array()});
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

	for( i in traffic){
		if ((traffic[i][0] in allInformation))
			allInformation[traffic[i][0]]['traffic'].push([traffic[i][1]]);
	}

	/*----Finish links----*/
	/* Estimate recommended places */
	defaultRecommendation(allInformation, closeLocations);
	makeD3Graphs();


}

function showAllParks(){
	RestartValues();
	initMap.parksCluster();
}
function makeD3Graphs(){
	for( elements in crimes){
		if(crimes[elements][3] == "STREET")
			st += 1;
		else{
			ap += 1;
		}
	}

	we = crimes.length;
	//initMap(locations, labels);
	chartsD3(st, ap, we);
}

function showAllSites() {
		RestartValues();
		initMap.markersCluster();
		makeD3Graphs();
}
