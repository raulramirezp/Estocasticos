$( document ).ready(function() {

  function dataFactory(url, type){
  	return $.getJSON(url, function (data) {
  		if( type == "rent"){
  			locations = [], labels =[];
  			$.each( data.data, function( key, val ) {
  			if(val[19] != null && val[20] != null){
  				locations.push(new google.maps.LatLng(val[19], val[20]));
  				labels.push(val[14]);
  			}
  			});
  		}
  		else if (type == "crimes" ) {
  			crimes = [];
  			$.each( data.data, function( key, val ) {
  				if( val[10] != null && ( val[13] != null && val[15] != null ) && (val[27] != null && val[28] != null))
  					crimes.push([val[10],val[13], val[15],val[27], val[28]]);
  			});

  		}
  		else if (type == "crimesassault") {
  			crimesassault = [];
  			$.each( data.data, function( key, val ) {
  			if( val[10] != null && ( val[13] != null && val[15] != null ) && (val[27] != null && val[28] != null))
  				crimesassault.push([val[10],val[13], val[15],val[27], val[28]]);
  			});
  		}
  		else if (type == "traffic") {
  			traffic = [];
  			$.each( data.data, function( key, val ) {
  					traffic.push(key, val);
  			});

  		}

  		else if(type == "cook"){
  			cook	 = [];
  			$.each( data.data, function( key, val ) {
  					cook.push(key, val);
  			});

  		}
  	});
  }

  dataFactory('https://data.cityofchicago.org/api/views/s6ha-ppgi/rows.json?accessType=DOWNLOAD','rent');
  dataFactory('https://data.cityofchicago.org/api/views/itbm-jtnw/rows.json?accessType=DOWNLOAD', 'crimes');
  dataFactory('https://data.cityofchicago.org/api/views/i5kt-jcf2/rows.json?accessType=DOWNLOAD', 'crimesassault');
  dataFactory('https://data.cityofchicago.org/api/views/t2qc-9pjd/rows.json?accessType=DOWNLOAD', 'traffic');
  dataFactory('https://data.cityofchicago.org/api/views/ddxq-pdr6/rows.json?accessType=DOWNLOAD', 'cook');
});
