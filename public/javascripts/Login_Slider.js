//Adam Pannell
//Login Slider Script

$(document).ready(function() 
{
	//Globals
	var clicked = false;
	var logoutReady = false;
	
	if(getCookie("username") !== "" && getCookie("fullname") !== "")
	{
		//Change login bar to logout bar
		$("#openLoginForm").html("Logout - " + getCookie("fullname"));
	}
	
	//Open and close the form
	$('#openLoginForm').click(function()
	{
		if(!logoutReady)
		{
			if(!clicked)
			{
				$('#login form').slideDown(300);
				$(this).addClass('close');
				clicked = true;
			}
			else
			{
				$('#login form').slideUp(300);
				$(this).removeClass('close');
				clicked = false;
			}//End if !clicked
		}
		else
		{
			$("#openLoginForm").html("Login - Not Secure");
			//delete cookies
			document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
			document.cookie = "fullname=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
			document.cookie = "rel=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
			logoutReady = false;
		}//End if !logoutReday
		
	}); // end login form click
	
	$("#loginButton").click(function(event)
	{
		//Prevent default click from occurring
		event.preventDefault();
		
		//Read username and password and put in a json for transmission
		var userLogin = {
							"username": $("#username").val(),
							"password": $("#password").val()
						}
		//Send json to server //Note not secured in any way
		$.ajax(
		{
			type: "POST",
			data: userLogin,
			url: "/users/userLogin",
			dataType: "JSON"
		}).done(function(response)
		{
			//Check if login succsessful
			if(response.status === 200)
			{
				//Change login bar to logout bar
				$("#openLoginForm").html("Logout - " + response.fullname);
				//Set a cookie to remember user
				setCookie("fullname", response.fullname, .5);
				setCookie("username", response.username, .5);
				setCookie("rel", response.rel, .5);
				logoutReady = true;
			}
			else
			{
				alert("login fail " + response.status);
			}
			
			//Clear input boxes
			$("#username").val("");
			$("#password").val("");
			
			//Close login form
			$('#login form').slideUp(300);
			$(this).removeClass('close');
			clicked = false;
			
		});
	});//End login button click
	
	function setCookie(cookieName, cookieValue, expiresInDays)
	{
		var d = new Date();
		d.setTime(d.getTime()+(expiresInDays*24*60*60*1000));
		var expires = "expires="+d.toGMTString();
		document.cookie = cookieName + "=" + cookieValue + "; " + expires;
	}
	
	function getCookie(cookieName)
	{
		var name = cookieName + "=";
		var ca = document.cookie.split(';');
		for(var i=0; i<ca.length; i++) 
		{
			var c = ca[i].trim();
			if (c.indexOf(name)==0) return c.substring(name.length,c.length);
		}
		return "";
	} 
	
}); // end ready


