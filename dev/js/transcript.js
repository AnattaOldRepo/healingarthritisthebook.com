// Login for submit button event.
jQuery(document).ready(function($){
	$('#login-form').submit(function(){
		console.log('working');
		// Cache jquery objects.
		var password_field = $( 'input[type="password"]', $(this) );
		var error_field    = 	$( '.error', $(this) );
		var password = 'publictv',
			redirect_to = '/transcripts/download.html';

		// hide error field.
		error_field.hide();

		// check user password.
		if( password_field.val() === password ) {
			// Set cookie on succesful login
			//docCookies.setItem( cookie_name, '1', 0, '/' );
			window.location.assign( redirect_to );

			//open download link in new page.
			//window.open( '/downloads/fat-summit-transcripts.zip' );

			return false;
		}

		// show inout field error
		password_field.addClass('errorinput');

		// show error.
		error_field.show();

		return false;
	});
});
