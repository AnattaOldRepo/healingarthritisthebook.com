(function($){
	var form = $("form#mc-embedded-subscribe-form");

	/**
	 * Check if text has email or not
	 */
	function mc_is_has_email( text ) {
		return ( text.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi) ? true : false )
	}

	/**
	 * Show popup on resources.html page if user did not subscribe to mailchimp
	 */
	if(
		( '/resources.html' === document.location.pathname )
		&& -1 == document.cookie.indexOf('user_can_access_resource')
	) {
		$('#resources_popup').show();
		$('body').addClass('overflowhidden');
	}

	/**
	 * Add event to thank you bar on resources.html page
	 */
	if( '/resources.html' === document.location.pathname ) {
		$( '.close-bar', '.thank-you-bar' ).click(function(e){
			e.preventDefault();
			$(this).parent().slideUp();
		});
	}

	/**
	 * Generate redirect url on basis of form
	 * @returns {string}
	 */
	var getReDirectUrl = function(){
		var redirect_url = '';

		if( $( 'form.step2', '#mc_embed_signup').length ) {

			redirect_url = '/step-5-upsell.html';
			
			// change fredirect url on basis of book count
			// if book <=2 then redirect url will remain same other wise it will change to another url
			if( 2 < parseInt( $( 'input[name="MMERGE4"]', $( 'form.step2', '#mc_embed_signup' ) ).val() ) ) {
				redirect_url = '/step-5-upsell.html';
			}
			
		} else if( $( 'form.step1', '#mc_embed_signup').length ) {
			redirect_url = '/step-2-book-purchase.html';
		}

		// Reset field values.
		$('#mc-embedded-subscribe-form').each(function() {
			this.reset();
		});

		return redirect_url;
	};

	/**
	 * Overriding mailchip ajax form submission handler
	 * -----------------------------------------------------------------------
	 * Handle the error/success message after successful form submission.
	 * Success messages are appended to #mce-success-response
	 * Error messages are displayed with the invalid input when possible, or appended to #mce-error-response
	 */
	window.mc.mce_success_cb_2 = function(resp) {
		var redirect_url = '';

		$('#mce-success-response').hide();
		$('#mce-error-response').hide();

		// On successful form submission, display a success message and reset the form
		if (resp.result == "success") {
			$('#mce-' + resp.result + '-response').show();
			$('#mce-' + resp.result + '-response').html(resp.msg);

			// On successfully form submission drop cookie for user
			// which stop popup to appear on resourses.html page
			if( '/resources.html' === document.location.pathname ) {
				document.cookie = "user_can_access_resource=1; expires=expires=Sun, 16 Jul 3567 06:23:41 00:00:00 GMT";
				$('body').removeClass('overflowhidden');
				$('#resources_popup').hide();

				$('.thank-you-bar').slideDown();
				window.setTimeout(
					function() {
						$('.thank-you-bar').slideUp()
					},
					2000
				);
			}


			//redirect to step-2 book purchase form
			if( redirect_url = getReDirectUrl() ) {
				if( $( 'form.step2', '#mc_embed_signup').length ) {
					$('#thank-you-message').fadeIn();
					$('#book-form').fadeOut();
					window.setTimeout(
						function() {
							$('#thank-you-message').fadeOut();
							$('#book-form').fadeIn();
							$('#mce-success-response').css('display' , 'none');
						},
						8000
					);
				}
				else if( $( 'form.step1', '#mc_embed_signup').length ) {
					window.location.assign( redirect_url );	
				}
			}

			// If the form has errors, display them, inline if possible, or appended to #mce-error-response
		} else {

			// Example errors - Note: You only get one back at a time even if you submit several that are bad.
			// Error structure - number indicates the index of the merge field that was invalid, then details
			// Object {result: "error", msg: "6 - Please enter the date"}
			// Object {result: "error", msg: "4 - Please enter a value"}
			// Object {result: "error", msg: "9 - Please enter a complete address"}

			// Try to parse the error into a field index and a message.
			// On failure, just put the dump thing into in the msg variable.
			var index = -1;
			var msg;
			try {
				var parts = resp.msg.split(' - ', 2);
				if (parts[1] == undefined) {
					msg = resp.msg;
				} else {
					i = parseInt(parts[0]);
					if (i.toString() == parts[0]) {
						index = parts[0];
						msg = parts[1];
					} else {
						index = -1;
						msg = resp.msg;
					}
				}
			} catch (e) {
				index = -1;
				msg = resp.msg;
			}

			/**
			 * Edit message for resources.html page
			 */
			if( ( '/resources.html' == document.location.pathname ) && mc_is_has_email( msg ) ) {
				msg = 'Thanks, you\'re already on our newsletter.';
				window.setTimeout(
					function(){
						$('#resources_popup').fadeOut();
						$('body').removeClass('overflowhidden');
					},
					2000
				);
			}

			try {
				// If index is -1 if means we don't have data on specifically which field was invalid.
				// Just lump the error message into the generic response div.
				if (index == -1) {
					$('#mce-' + resp.result + '-response').show();
					$('#mce-' + resp.result + '-response').html(msg);

				} else {
					var fieldName = $("input[name*='" + fnames[index] + "']").attr('name'); // Make sure this exists (they haven't deleted the fnames array lookup)
					var data = {};
					data[fieldName] = msg;
					mc.mce_validator.showErrors(data);
				}
			} catch (e) {
				$('#mce-' + resp.result + '-response').show();
				$('#mce-' + resp.result + '-response').html(msg);
			}
		}
	};


	/**
	 * Overriding succes function in ajax options
	 * @type {mc.mce_success_cb_2|*}
	 */
	window.mc.ajaxOptions.success = window.mc.mce_success_cb_2;
})($mcj);
