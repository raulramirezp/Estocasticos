var map;
var st = 0, ap = 0, we = 0;
var locations = [], rent = [], traffic =[], cook = [], crimes = [], crimesassault = [];
var labels =[];
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

	var markerA = new google.maps.Marker({
    position: siteA,
    icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
    map:map
  });
	var markerB = new google.maps.Marker({
    position: siteB,
    icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
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


	/*
	var markers = locations.map(function(location, i) {
		return new google.maps.Marker({
			position: location,
			label: {text: labels[i % labels.length], color: "black"}
		});
	});

	// Add a marker clusterer to manage the markers.
	var markerCluster = new MarkerClusterer(map, markers,
			{imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
	*/
}

function distance(x2, x1, y2, y1 ) {
	return Math.sqrt(Math.pow((x2-x1), 2)+Math.pow((y2-y1), 2));
}

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

	console.log("Area mas cercana recomendad " + area1[0]);
	console.log("Rents " + area1[1]);
	console.log("Crimes" + (area1[2]+area1[3]));

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

	initMap(siteA, siteB);
}

function doMagic(){
		/*Restart values */
		document.getElementById('dashboard').innerHTML = "";
		st = 0, ap = 0, we = 0;
		var allInformation = {};
		var closeLocations = [28,32,33,8,24,27,31,29,30,23];
		contentStringSiteA;
		contentStringSiteB;
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

/********************   D3 taken from https://bl.ocks.org/mbostock ************************************/
function chartsD3(st, ap, we){
	function dashboard(id, fData){
	    var barColor = 'steelblue';
	    function segColor(c){ return {Street:"#807dba", Apartment:"#e08214",Weapons:"#41ab5d"}[c]; }

	    // compute total for each state.
	    fData.forEach(function(d){d.total=d.freq.Street+d.freq.Apartment+d.freq.Weapons;});

	    // function to handle histogram.
	    function histoGram(fD){
	        var hG={},    hGDim = {t: 60, r: 0, b: 30, l: 0};
	        hGDim.w = 500 - hGDim.l - hGDim.r,
	        hGDim.h = 300 - hGDim.t - hGDim.b;

	        //create svg for histogram.
	        var hGsvg = d3.select(id).append("svg")
	            .attr("width", hGDim.w + hGDim.l + hGDim.r)
	            .attr("height", hGDim.h + hGDim.t + hGDim.b).append("g")
	            .attr("transform", "translate(" + hGDim.l + "," + hGDim.t + ")");

	        // create function for x-axis mapping.
	        var x = d3.scale.ordinal().rangeRoundBands([0, hGDim.w], 0.1)
	                .domain(fD.map(function(d) { return d[0]; }));

	        // Add x-axis to the histogram svg.
	        hGsvg.append("g").attr("class", "x axis")
	            .attr("transform", "translate(0," + hGDim.h + ")")
	            .call(d3.svg.axis().scale(x).orient("bottom"));

	        // Create function for y-axis map.
	        var y = d3.scale.linear().range([hGDim.h, 0])
	                .domain([0, d3.max(fD, function(d) { return d[1]; })]);

	        // Create bars for histogram to contain rectangles and freq labels.
	        var bars = hGsvg.selectAll(".bar").data(fD).enter()
	                .append("g").attr("class", "bar");

	        //create the rectangles.
	        bars.append("rect")
	            .attr("x", function(d) { return x(d[0]); })
	            .attr("y", function(d) { return y(d[1]); })
	            .attr("width", x.rangeBand())
	            .attr("height", function(d) { return hGDim.h - y(d[1]); })
	            .attr('fill',barColor)
	            .on("mouseover",mouseover)// mouseover is defined below.
	            .on("mouseout",mouseout);// mouseout is defined below.

	        //Create the frequency labels above the rectangles.
	        bars.append("text").text(function(d){ return d3.format(",")(d[1])})
	            .attr("x", function(d) { return x(d[0])+x.rangeBand()/2; })
	            .attr("y", function(d) { return y(d[1])-5; })
	            .attr("text-anchor", "Apartmentdle");

	        function mouseover(d){  // utility function to be called on mouseover.
	            // filter for selected state.
	            var st = fData.filter(function(s){ return s.State == d[0];})[0],
	                nD = d3.keys(st.freq).map(function(s){ return {type:s, freq:st.freq[s]};});

	            // call update functions of pie-chart and legend.
	            pC.update(nD);
	            leg.update(nD);
	        }

	        function mouseout(d){    // utility function to be called on mouseout.
	            // reset the pie-chart and legend.
	            pC.update(tF);
	            leg.update(tF);
	        }

	        // create function to update the bars. This will be used by pie-chart.
	        hG.update = function(nD, color){
	            // update the domain of the y-axis map to reflect change in frequencies.
	            y.domain([0, d3.max(nD, function(d) { return d[1]; })]);

	            // Attach the new data to the bars.
	            var bars = hGsvg.selectAll(".bar").data(nD);

	            // transition the height and color of rectangles.
	            bars.select("rect").transition().duration(500)
	                .attr("y", function(d) {return y(d[1]); })
	                .attr("height", function(d) { return hGDim.h - y(d[1]); })
	                .attr("fill", color);

	            // transition the frequency labels location and change value.
	            bars.select("text").transition().duration(500)
	                .text(function(d){ return d3.format(",")(d[1])})
	                .attr("y", function(d) {return y(d[1])-5; });
	        }
	        return hG;
	    }

	    // function to handle pieChart.
	    function pieChart(pD){
	        var pC ={},    pieDim ={w:250, h: 250};
	        pieDim.r = Math.min(pieDim.w, pieDim.h) / 2;

	        // create svg for pie chart.
	        var piesvg = d3.select(id).append("svg")
	            .attr("width", pieDim.w).attr("height", pieDim.h).append("g")
	            .attr("transform", "translate("+pieDim.w/2+","+pieDim.h/2+")");

	        // create function to draw the arcs of the pie slices.
	        var arc = d3.svg.arc().outerRadius(pieDim.r - 10).innerRadius(0);

	        // create a function to compute the pie slice angles.
	        var pie = d3.layout.pie().sort(null).value(function(d) { return d.freq; });

	        // Draw the pie slices.
	        piesvg.selectAll("path").data(pie(pD)).enter().append("path").attr("d", arc)
	            .each(function(d) { this._current = d; })
	            .style("fill", function(d) { return segColor(d.data.type); })
	            .on("mouseover",mouseover).on("mouseout",mouseout);

	        // create function to update pie-chart. This will be used by histogram.
	        pC.update = function(nD){
	            piesvg.selectAll("path").data(pie(nD)).transition().duration(500)
	                .attrTween("d", arcTween);
	        }
	        // Utility function to be called on mouseover a pie slice.
	        function mouseover(d){
	            // call the update function of histogram with new data.
	            hG.update(fData.map(function(v){
	                return [v.State,v.freq[d.data.type]];}),segColor(d.data.type));
	        }
	        //Utility function to be called on mouseout a pie slice.
	        function mouseout(d){
	            // call the update function of histogram with all data.
	            hG.update(fData.map(function(v){
	                return [v.State,v.total];}), barColor);
	        }
	        // Animating the pie-slice requiring a custom function which specifies
	        // how the intermediate paths should be drawn.
	        function arcTween(a) {
	            var i = d3.interpolate(this._current, a);
	            this._current = i(0);
	            return function(t) { return arc(i(t));    };
	        }
	        return pC;
	    }

	    // function to handle legend.
	    function legend(lD){
	        var leg = {};

	        // create table for legend.
	        var legend = d3.select(id).append("table").attr('class','legend');

	        // create one row per segment.
	        var tr = legend.append("tbody").selectAll("tr").data(lD).enter().append("tr");

	        // create the first column for each segment.
	        tr.append("td").append("svg").attr("width", '16').attr("height", '16').append("rect")
	            .attr("width", '16').attr("height", '16')
				.attr("fill",function(d){ return segColor(d.type); });

	        // create the second column for each segment.
	        tr.append("td").text(function(d){ return d.type;});

	        // create the third column for each segment.
	        tr.append("td").attr("class",'legendFreq')
	            .text(function(d){ return d3.format(",")(d.freq);});

	        // create the fourth column for each segment.
	        tr.append("td").attr("class",'legendPerc')
	            .text(function(d){ return getLegend(d,lD);});

	        // Utility function to be used to update the legend.
	        leg.update = function(nD){
	            // update the data attached to the row elements.
	            var l = legend.select("tbody").selectAll("tr").data(nD);

	            // update the frequencies.
	            l.select(".legendFreq").text(function(d){ return d3.format(",")(d.freq);});

	            // update the percentage column.
	            l.select(".legendPerc").text(function(d){ return getLegend(d,nD);});
	        }

	        function getLegend(d,aD){ // Utility function to compute percentage.
	            return d3.format("%")(d.freq/d3.sum(aD.map(function(v){ return v.freq; })));
	        }

	        return leg;
	    }

	    // calculate total frequency by segment for all state.
	    var tF = ['Street','Apartment','Weapons'].map(function(d){
	        return {type:d, freq: d3.sum(fData.map(function(t){ return t.freq[d];}))};
	    });

	    // calculate total frequency by state for all segment.
	    var sF = fData.map(function(d){return [d.State,d.total];});

	    var hG = histoGram(sF), // create the histogram.
	        pC = pieChart(tF), // create the pie-chart.
	        leg= legend(tF);  // create the legend.
	}
	/*****************************   END D3  ***************************************/
	var freqData=[
	{State:'2017',freq:{Street:st, Apartment:ap, Weapons:we}}];
	/*
	,{State:'Febrero',freq:{Street:1101, Apartment:412, Weapons:674}}
	,{State:'Marzo',freq:{Street:932, Apartment:2149, Weapons:418}}
	,{State:'Abril',freq:{Street:832, Apartment:1152, Weapons:1862}}
	];
	*/

	dashboard('#dashboard',freqData);
}

/*
	Editorial by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/
/* Code for HTML taken from html5up.net*/
(function($) {

	skel.breakpoints({
		xlarge: '(max-width: 1680px)',
		large: '(max-width: 1280px)',
		medium: '(max-width: 980px)',
		small: '(max-width: 736px)',
		xsmall: '(max-width: 480px)',
		'xlarge-to-max': '(min-width: 1681px)',
		'small-to-xlarge': '(min-width: 481px) and (max-width: 1680px)'
	});

	$(function() {

		var	$window = $(window),
			$head = $('head'),
			$body = $('body');

		// Disable animations/transitions ...

			// ... until the page has loaded.
				$body.addClass('is-loading');

				$window.on('load', function() {
					setTimeout(function() {
						$body.removeClass('is-loading');
					}, 100);
				});

			// ... when resizing.
				var resizeTimeout;

				$window.on('resize', function() {

					// Mark as resizing.
						$body.addClass('is-resizing');

					// Unmark after delay.
						clearTimeout(resizeTimeout);

						resizeTimeout = setTimeout(function() {
							$body.removeClass('is-resizing');
						}, 100);

				});

		// Fix: Placeholder polyfill.
			$('form').placeholder();

		// Prioritize "important" elements on medium.
			skel.on('+medium -medium', function() {
				$.prioritize(
					'.important\\28 medium\\29',
					skel.breakpoint('medium').active
				);
			});

		// Fixes.

			// Object fit images.
				if (!skel.canUse('object-fit')
				||	skel.vars.browser == 'safari')
					$('.image.object').each(function() {

						var $this = $(this),
							$img = $this.children('img');

						// Hide original image.
							$img.css('opacity', '0');

						// Set background.
							$this
								.css('background-image', 'url("' + $img.attr('src') + '")')
								.css('background-size', $img.css('object-fit') ? $img.css('object-fit') : 'cover')
								.css('background-position', $img.css('object-position') ? $img.css('object-position') : 'center');

					});

		// Sidebar.
			var $sidebar = $('#sidebar'),
				$sidebar_inner = $sidebar.children('.inner');

			// Inactive by default on <= large.
				skel
					.on('+large', function() {
						$sidebar.addClass('inactive');
					})
					.on('-large !large', function() {
						$sidebar.removeClass('inactive');
					});

			// Hack: Workaround for Chrome/Android scrollbar position bug.
				if (skel.vars.os == 'android'
				&&	skel.vars.browser == 'chrome')
					$('<style>#sidebar .inner::-webkit-scrollbar { display: none; }</style>')
						.appendTo($head);

			// Toggle.
				if (skel.vars.IEVersion > 9) {

					$('<a href="#sidebar" class="toggle">Toggle</a>')
						.appendTo($sidebar)
						.on('click', function(event) {

							// Prevent default.
								event.preventDefault();
								event.stopPropagation();

							// Toggle.
								$sidebar.toggleClass('inactive');

						});

				}

			// Events.

				// Link clicks.
					$sidebar.on('click', 'a', function(event) {

						// >large? Bail.
							if (!skel.breakpoint('large').active)
								return;

						// Vars.
							var $a = $(this),
								href = $a.attr('href'),
								target = $a.attr('target');

						// Prevent default.
							event.preventDefault();
							event.stopPropagation();

						// Check URL.
							if (!href || href == '#' || href == '')
								return;

						// Hide sidebar.
							$sidebar.addClass('inactive');

						// Redirect to href.
							setTimeout(function() {

								if (target == '_blank')
									window.open(href);
								else
									window.location.href = href;

							}, 500);

					});

				// Prevent certain events inside the panel from bubbling.
					$sidebar.on('click touchend touchstart touchmove', function(event) {

						// >large? Bail.
							if (!skel.breakpoint('large').active)
								return;

						// Prevent propagation.
							event.stopPropagation();

					});

				// Hide panel on body click/tap.
					$body.on('click touchend', function(event) {

						// >large? Bail.
							if (!skel.breakpoint('large').active)
								return;

						// Deactivate.
							$sidebar.addClass('inactive');

					});

			// Scroll lock.
			// Note: If you do anything to change the height of the sidebar's content, be sure to
			// trigger 'resize.sidebar-lock' on $window so stuff doesn't get out of sync.

				$window.on('load.sidebar-lock', function() {

					var sh, wh, st;

					// Reset scroll position to 0 if it's 1.
						if ($window.scrollTop() == 1)
							$window.scrollTop(0);

					$window
						.on('scroll.sidebar-lock', function() {

							var x, y;

							// IE<10? Bail.
								if (skel.vars.IEVersion < 10)
									return;

							// <=large? Bail.
								if (skel.breakpoint('large').active) {

									$sidebar_inner
										.data('locked', 0)
										.css('position', '')
										.css('top', '');

									return;

								}

							// Calculate positions.
								x = Math.max(sh - wh, 0);
								y = Math.max(0, $window.scrollTop() - x);

							// Lock/unlock.
								if ($sidebar_inner.data('locked') == 1) {

									if (y <= 0)
										$sidebar_inner
											.data('locked', 0)
											.css('position', '')
											.css('top', '');
									else
										$sidebar_inner
											.css('top', -1 * x);

								}
								else {

									if (y > 0)
										$sidebar_inner
											.data('locked', 1)
											.css('position', 'fixed')
											.css('top', -1 * x);

								}

						})
						.on('resize.sidebar-lock', function() {

							// Calculate heights.
								wh = $window.height();
								sh = $sidebar_inner.outerHeight() + 30;

							// Trigger scroll.
								$window.trigger('scroll.sidebar-lock');

						})
						.trigger('resize.sidebar-lock');

					});

		// Menu.
			var $menu = $('#menu'),
				$menu_openers = $menu.children('ul').find('.opener');

			// Openers.
				$menu_openers.each(function() {

					var $this = $(this);

					$this.on('click', function(event) {

						// Prevent default.
							event.preventDefault();

						// Toggle.
							$menu_openers.not($this).removeClass('active');
							$this.toggleClass('active');

						// Trigger resize (sidebar lock).
							$window.triggerHandler('resize.sidebar-lock');

					});

				});

	});
})(jQuery);
