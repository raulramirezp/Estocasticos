# Purdue-UNAL Gold IronHacks 2017
### Introduction   
#Raul Alfonso Ramirez Penagos - Universidad Nacional de Colombia-sede Bogotá

1.	Planning the solution to the proposed problem for IRONHACKS

2.	For the solution i consider this topics: Security, site for housing,transportation convenience,  traffic and restaurants or similars; in this order of importance. On the other hand, the weather will also be considered and shown to the user according to the location

3.	Description of the datasets and function design

	* 	[Crimes_-_2017_weapons] [https://data.cityofchicago.org/api/views/ijzp-q8t2/rows.json?accessType=DOWNLOAD] [json] [year 2017 info, district, location]
		Description:	This data set contains information on the crimes of the city of chicago since 2017

	* 	[Crimes_-_2017_assault] [https://data.cityofchicago.org/api/views/i5kt-jcf2/rows.json?accessType=DOWNLOAD'] [json] [year 2017 info, district, location]
		Description:	This data set contains information on the crimes of the city of chicago since 2017

	*	[Affordable_Rental_Housing_Developments] [https://data.cityofchicago.org/api/views/s6ha-ppgi/rows.json?accessType=DOWNLOAD] [json] [Community area, property, address, phone number, location]
		Description:	This data set contains information about housing in chicago

	*	[Chicago_Traffic_Tracker_-_Congestion_Estimates_by_Regions]	[Traffic https://data.cityofchicago.org/api/views/t2qc-9pjd/rows.json?accessType=DOWNLOAD] [json] [Region, West, East, South, north, current speed]
		Description:	This data set contains information about average speed traffic in the principal streets of chicago

	*	[Nearby_Independent_Cook_County_Grocery_Stores]	[https://catalog.data.gov/dataset/nearby-independent-cook-county-grocery-stores-180c9] [json] [store name, address, location]
		Description:	This data set contains information about some restaurants in city of chicago

	[Y] I  will use the primary dataset ”online climate data” from data.gov
	[Y]

4.	Brief Description

	We want to be able to give a correct suggestion for the student who wishes to reside in the city of Chicago to study, the variables that will be present are: The security of the area, available rents, traffic in the area and food areas, Since they are considered the most relevant (keeping in mind the dataset available). The main idea is to use weights for the variables described above, and based on them and their locations, can give an appropriate suggestion to the user


	* MAP VIEW:

	1.	[Y] Basic Map with specific location (your map is located in a meaningful place, city of west lafayette for example)
	2.	[Y] Markers for location of markets
	3.	[Y] Labels for markets' names
	4.	[Y] InfoWindow to show detail information of a market
	5.	[N] [describe] Any other cover on the map (for example, cloud cover to show the weather effect)


	* DATA VISUALIZATION:

	1.	[Y] It is expected to implement a pie chart to show information like: crimes for zones, available rents for zones, etc.
	2.	[N] Interaction in the graph

	* INTERACTION FORM:

	1.	[Y] information output (text field, text area, label, plain HTML ...)
			-	List of the first two recommended sites, according to the criteria already described
			-	Option to show more that two recommended sites if is possible

	2.	[Y] Filters (It is expected to implement)
			- Filter by rental
			- Filter for security
	3.	[N] Any information input?
	4.	[N]
	5.	[N]

5.	Build case

	1.	search proyect directory and open terminal, enter this command: python3 -m http.server
	2.	Open web browser and enter the address: http://localhost:8000/
	3.	Have fun!

6.	Test Case

They have been made using the Firefox web browser, using "python3 -m http.server" for start http server and run mashup application

7.
