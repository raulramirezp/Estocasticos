# Purdue-UNAL Gold IronHacks 2017
### Introduction   
#Raul Alfonso Ramirez Penagos - Universidad Nacional de Colombia-sede Bogotá

1.	Planning the solution to the proposed problem for IRONHACKS

2.	For the solution i consider this topics: Security, site for housing,transportation convenience,  traffic and restaurants or similars; in this order of importance. On the other hand, the weather will also be considered and shown to the user according to the location

3.	Description of the datasets and function design

	* 	[Crimes_-_2001_to_present] [https://data.cityofchicago.org/api/views/ijzp-q8t2/rows.csv?accessType=DOWNLOAD] [cvs] [year 2016 info, district, location]
		Description:	This data set contains information on the crimes of the city of chicago from 2001 to today
	
	*	[Affordable_Rental_Housing_Developments] [https://data.cityofchicago.org/api/views/s6ha-ppgi/rows.csv?accessType=DOWNLOAD] [cvs] [Community area, property, address, phone number, location]
		Description:	This data set contains information about housing in chicago
		
	*	[Chicago_Traffic_Tracker_-_Congestion_Estimates_by_Regions]	[Traffic https://data.cityofchicago.org/api/views/t2qc-9pjd/rows.csv?accessType=DOWNLOAD] [cvs] [Region, West, East, South, north, current speed]
		Description:	This data set contains information about average speed traffic in the principal streets of chicago
		
	*	[Nearby_Independent_Cook_County_Grocery_Stores]	[https://catalog.data.gov/dataset/nearby-independent-cook-county-grocery-stores-180c9] [cvs] [store name, address, location]
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

So far only has been used npm to install a local http server and to test, the application is still under development and this first iteration is little usable for the proposed purpose.

6.	Test Case

They have been made using the Firefox web browser

7.	I had never worked with web development, I had wanted to learn before but for academic and personal reasons I had not been able to do it, so there are many new concepts for me, which I really enjoyed learning, but that there is still a lot to work on, like CC3, JavaScript, JQuery and use of AJAX, I hope to learn a lot in this short time of IronHacks, because, not only is something that I like, it is also very useful for the professional environment of my academic program




