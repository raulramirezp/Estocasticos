$( document ).ready(function() {
  function dataFactory(url, type){
  	return $.getJSON(url, function (data) {
  		if( type == "rent"){
  			locations = [], labels =[], rent =[];
  			$.each( data.data, function( key, val ) {
  			if(val[19] != null && val[20] != null){
  				locations.push(new google.maps.LatLng(val[19], val[20]));
          /*Community Area, property, addres, phone, lat, lon*/
          rent.push([val[9],val[11],val[12],val[14], val[19], val[20]]);
  			}
  			});
        //console.log(data);
  		}
  		else if (type == "crimes" ) {
  			crimes = [];
  			$.each( data.data, function( key, val ) {
  				if( val[10] != null && ( val[13] != null && val[15] != null ) && (val[21] != null && val[27] != null && val[28] != null))
            /*Community area,Date,type, place, lat, lon  */
            crimes.push([val[21], val[10],val[13], val[15] ,val[27], val[28]]);
  			});
        //console.log(data);
  		}
  		else if (type == "crimesassault") {
  			crimesassault = [];
  			$.each( data.data, function( key, val ) {
          if( val[10] != null && ( val[13] != null && val[15] != null ) && (val[21] != null && val[27] != null && val[28] != null))
            /*Community area,Date,type, place, lat, lon  */
            crimesassault.push([ val[21] , val[10],val[13], val[15],val[27], val[28]]);
  			});
  		}
  		else if (type == "traffic") {
  			traffic = [];
  			$.each( data.data, function( key, val ) {
          /*Community Area and current speed*/
  					traffic.push([val[9],val[15]]);
  			});
        //console.log(data);
  		}
      else if (type == "parks") {
        parks = [], parksLocations =[];
        $.each( data.data, function( key, val ) {
          /*Park name, address, area, lat, lon  */
          if(val[82][1] != null && val[82][2] != null)
            parks.push([val[9],val[10]]);
            parksLocations.push(new google.maps.LatLng(val[82][1], val[82][2]));
        });
        console.log(parks);
      }
  	});
  }
/*
  function rentPlaces(){
  	 var data = {};
  	 $.ajax({url: 'http://www.zillow.com/webservice/GetSearchResults.htm?zws-id=X1-ZWz1fr0ox2to23_6v82r&address=3708%20W%20Lexington%20St&citystatezip=Chicagocallback=?',
  	 data: data,
  	 type: 'GET',
  	 dataType: 'xml',
  	 success: function(xmlResponse){
     	var parser = new DOMParser();
     	var xmlDoc = parser.parseFromString(data, "text/xml");
     	console.log(xmlDoc.getElementsByTagName("homedetails")[0].childNodes[0].nodeValue);
     }
  	 });
  }
*/
  dataFactory('https://data.cityofchicago.org/api/views/s6ha-ppgi/rows.json?accessType=DOWNLOAD','rent');
  dataFactory('https://data.cityofchicago.org/api/views/itbm-jtnw/rows.json?accessType=DOWNLOAD', 'crimes');
  dataFactory('https://data.cityofchicago.org/api/views/i5kt-jcf2/rows.json?accessType=DOWNLOAD', 'crimesassault');
  dataFactory('https://data.cityofchicago.org/api/views/t2qc-9pjd/rows.json?accessType=DOWNLOAD', 'traffic');
  dataFactory('https://data.cityofchicago.org/api/views/2eaw-bdhe/rows.json?accessType=DOWNLOAD', 'parks')
//  curl -H "token:<ztyBTaKSaXtwtAIHqbXAGdqOpNqjNVht>" "http://www.ncdc.noaa.gov/cdo-web/api/v2/data?datasetid=GHCND&locationid=ZIP:28801&startdate=2010-05-01&enddate=2010-05-01";
/*  var datas = {};
  $.ajax({
    url:'www.ncdc.noaa.gov/cdo-web/api/v2/locations?locationcategoryid=CITY&sortfield=name&sortorder=desc',
    data: datas,
    headers:{ token:'ztyBTaKSaXtwtAIHqbXAGdqOpNqjNVht' },
    type: 'GET',
    dataType: 'json',
  });
  console.log(datas);
  */
  $.ajax({
  	url: "http://api.openweathermap.org/data/2.5/weather?q=chicago&appid=6aa0bdb1f586c5630d60b6237dfce45c",
  	dataType: 'JSON',
  	type: "GET",

  	success: function(data){

  		var iconUrl = "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png";
  		var weatherIcon = "<img src='" + iconUrl + "'>";
  		$(document).ready(function(){
  			document.getElementById('weather').innerHTML= "<p>the weather is: <b>" + data.weather[0].description + "</b>" +"</p>";
        document.getElementById("imagen").src = iconUrl;
  		});
  	}
  });

});
