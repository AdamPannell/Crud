//Adam Pannell
//Puts Time in a Time span

$(document).ready(function() 
{
	
	var date = new Date();
	
	var year = date.getFullYear(); //Gets 4 digit year
	var month = date.getMonth() + 1; //Gets month number //function returns 0-11 add one to make normal
	var dayOfMonth = date.getDate(); //Gets day of month
	var hour = date.getHours(); //Gets hour day
	var minutes = date.getMinutes(); //Get minute
	var amPm = "AM";
	
	if(hour > 12)  //Converts from 24 hour time to twelve hour time and sets am/pm
	{
		hour = hour - 12;
		amPm = "PM";
	}
	
	minutes = "0" + minutes; //Adds leading zero to minutes so time does not display as 10:5 AM
	
	$("#getDate").html(month + "/" + dayOfMonth + "/" + year);
	
	$("#getTime").html(hour + ":" + minutes.slice(-2) + " " + amPm); //.slice(-2) returns the last 2 characters of string so time does not display as 10:010 AM
	
});