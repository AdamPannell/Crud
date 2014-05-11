//Adam Pannell
//Login Slider Script

$(document).ready(function() {
	$('#openLoginForm').toggle(
		function() {
			$('#login form').slideDown(300);
			$(this).addClass('close');
		},
		function() {
			$('#login form').slideUp(300);
			$(this).removeClass('close');
		}
	); // end toggle
}); // end ready