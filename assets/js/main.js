/*
	Editorial by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/
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


var map;
var locations = [], traffic =[], cook = [], crimes = [], crimesassault = [];
var labels =[];

function initMap() {
	var locationComputerEngineering = {lat: 41.8708, lng: -87.6505};
  map = new google.maps.Map(document.getElementById('map'), {
  center: locationComputerEngineering,
  zoom: 12
  });

	var market = new google.maps.Marker({
    position: locationComputerEngineering,
    icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
    map:map
  });

	var markers = locations.map(function(location, i) {
		return new google.maps.Marker({
			position: location,
			label: {text: labels[i % labels.length], color: "black"}
		});
	});

	// Add a marker clusterer to manage the markers.
	var markerCluster = new MarkerClusterer(map, markers,
			{imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
}


function getData() {
		//Variables
		var st = 0, ap = 0, we = 0;

		/*Get data set for Nearby Independent Cook County Grocery Stores in Chicago City*/
		var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
				var json = JSON.parse(this.responseText);
				locations = [], labels = [];
				for(key = 0; key < json.data.length; key++) {
					if(json.data[key][19] != null && json.data[key][20] != null){
						locations.push(new google.maps.LatLng(json.data[key][19], json.data[key][20]));
						labels.push(json.data[key][14]);
					}
				}
				initMap(locations, labels);
				console.log("Rental data");
				console.log(locations);
			}
		};
		xhr.open('GET', 'https://data.cityofchicago.org/api/views/s6ha-ppgi/rows.json?accessType=DOWNLOAD', true);
		xhr.send();
			/*Get dataset for crimes in Chicago City*/
			$.getJSON('https://data.cityofchicago.org/api/views/itbm-jtnw/rows.json?accessType=DOWNLOAD', function (data) {
				crimes = [];
				$.each( data.data, function( key, val ) {
					if( val[10] != null && ( val[13] != null && val[15] != null ) && (val[27] != null && val[28] != null))
						crimes.push([val[10],val[13], val[15],val[27], val[28]]);
				});
				console.log("crimes weapon 2017");
				console.log(crimes);
				we = crimes.length;
			});

			$.getJSON('https://data.cityofchicago.org/api/views/i5kt-jcf2/rows.json?accessType=DOWNLOAD', function (data) {
					crimesassault = [];
					$.each( data.data, function( key, val ) {
					if( val[10] != null && ( val[13] != null && val[15] != null ) && (val[27] != null && val[28] != null))
						crimesassault.push([val[10],val[13], val[15],val[27], val[28]]);
				});
				for( elements in crimes){
					if(crimes[elements][2] == "STREET")
						st += 1;
					else{
						ap += 1;
					}
				}
				console.log("crimes assault 2017");
				console.log(crimesassault);
				if( st > 0 && ap > 0 && we > 0)
					chartsD3(st, ap, we);
			});

			/*Get dataset for Traffic Tracker-Congestion Estimates by Regions in Chicago City*/
			$.getJSON('https://data.cityofchicago.org/api/views/t2qc-9pjd/rows.json?accessType=DOWNLOAD', function (data){
				traffic = [];
				$.each( data.data, function( key, val ) {
						traffic.push(key, val);
				});
				console.log("Traffic");
				console.log(traffic);
			});

			$.getJSON('https://data.cityofchicago.org/api/views/ddxq-pdr6/rows.json?accessType=DOWNLOAD', function (data) {
				cook	 = [];
				$.each( data.data, function( key, val ) {
						cook.push(key, val);
				});
				console.log("Independent cook");
				console.log(cook);
			});

}

/*D3*/
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
	/*END D3*/

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
