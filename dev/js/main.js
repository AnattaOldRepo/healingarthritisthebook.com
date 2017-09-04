/* 
* @Author: ajain
* @Date:   2016-01-28 14:30:14
* @Last Modified by:   ajain
* @Last Modified time: 2016-02-09 18:35:50
*/

'use strict';
jQuery.noConflict();
(function( $ ) {
  $(function() {

  	// Required Slick plugin to make the testimonial slider
    if($('.testimonials__slider').length) {
	    $('.testimonials__slider').slick({
			dots: true,
			infinite: false,
			speed: 300,
			arrows: false,
			fade: true,
			autoplay: true,
			adaptiveHeight: true,
			autoplaySpeed: 5000,
			responsive: [
			    {
			      breakpoint: 767,
			      settings: {
			        adaptiveHeight: true,
			        autoplay: false
			      }
			    }
		    ]
	    });
	};	
    // Smooth scroll to section
    $('.scroll-to-section').click(function() {
        if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
          var target = $(this.hash);
          target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
          if (target.length) {
            $('html,body').animate({
              scrollTop: target.offset().top
            }, 1000);
            return false;
          }
        }
      });           

    $( function () {

			var allSlideUp = $( '.js-accordion .js-accordion-target' ).addClass( 'u-hide' );
			$( '.js-accordion  .js-accordion-click' ).click( function () {
				allSlideUp.slideUp();
				if ( $( this ).parent().next().is( ':visible' ) ) {
					$( this ).parent().next().slideUp();
				} else {
					$( this ).parent().next().slideDown();
				}
				return false;
			} );
		} );

    // Tabs
    if($('.tabs').length) {
	    var $tabMenuLink = $('.tabs .tab-nav a');

		$tabMenuLink.on('touchstart click', function(e){
			e.preventDefault();
			var $self = $(this),
				$parent = $self.closest( '.tabs'),
				$target = $self.attr('href');

			var $elem = $($target);

			// var isTabOpen = $elem.hasClass('is-open') ? 1 : 0;

			$parent.find( '> .tab-nav li' ).removeClass('is-open');

			$parent.find( '> .tab-container > .tab-item' ).fadeOut("fast").removeClass('is-open');

			$self.closest('li').addClass('is-open');
			$elem.fadeIn().addClass('is-open');

			e.stopPropagation();
			return false;
		});
	};
	
	$('.js-tabs  a').click(function(event) {

            event.preventDefault(); //stop browser to take action for clicked anchor

            //get displaying tab content jQuery selector
            var active_tab_selector = $('.js-tabs   a.active').attr('href');

            //find actived navigation and remove 'active' css
            var actived_nav = $('.js-tabs  a.active');
            actived_nav.removeClass('active');

            //add 'active' css into clicked navigation
            $(this).addClass('active');

            //hide displaying tab content
            $(active_tab_selector).removeClass('active');
            $(active_tab_selector).addClass('hide');

            //show target tab content
            var target_tab_selector = $(this).attr('href');
            $(target_tab_selector).removeClass('hide');
            $(target_tab_selector).addClass('active');

        });
	// Accordion
	if ($('.accordion').length) {
		$(document).on('click', '.accordion .accordion--title', function (e) {
			e.preventDefault();

			if($('.video').length) {
				$('.video iframe').each(function(){
					$(this)[0].contentWindow.postMessage('{"event":"command","func":"' + 'stopVideo' + '","args":""}', '*');
				});
			}

			// cache current object
			var $this = $(this);

			// current accordian item
			var accordian_item = $(this).next();

			// scroll to current accordian
			// $( 'html,body' ).animate({
			// 	scrollTop: $this.offset().top
			// }, 500 );

			// open/close current accordian
			accordian_item.slideToggle().toggleClass('is-open');
			$this.toggleClass('is-open');
			if( $(this).hasClass('is-open') )
			  $(this).find('.view').text('Close');
			else
			  $(this).find('.view').text('View');
		})
	};
	// Modal
	if($('.modal-link').length) {

		$(document).on('click', '.modal-link', function (e) {
			e.preventDefault();

			var $self = $(this),
				$target = $self.attr('href');

			var $elem = $($target);

			$elem.fadeIn().addClass('is-open');
		});
		$(document).on('click', '.close-modal', function (e) {
			e.preventDefault();
			$('.modal').fadeOut().removeClass('is-open');
		})
	}
	// ===================================
	// Make parent div clickable
	// ===================================
	$(document).on('click', '.clickable-box', function(event) {
	    var url = $(this).find("a.clickable-box-target-link").get(0).href;
	    var $target = $(event.target);	        
	    if (($target.is("a") || ($target.parent().is("a")))) {} else {
	        window.open(url, '_blank', '', '');
	        return false;
	    }
	});

	// pause vidoe
	if($(window).height() > 900) {
		var headerHeight = $('.header').outerHeight(),
			footerHeight = $('.footer').outerHeight(),
			footerCopyHeight = $('.footer--copy').outerHeight(),
			windowHeight = $(window).height(),
			totalHeight = windowHeight - (headerHeight + footerHeight+footerCopyHeight);
			console.log(totalHeight);
		$('.efgt-optin.sneak-peek').height(totalHeight);
	}

	$('.buybtn').click(function() {
		$('#bookbuypopup').fadeIn();
		$('body').addClass('overflowhidden');
		return false;
	});	
	$('.bookbuy__popup .bookbuy__close').click(function() {
		$('#bookbuypopup').fadeOut();
		$('body').removeClass('overflowhidden');
		return false;
	});	

	$('.resources__popup__close').click(function() {
		$('#resources_popup').fadeOut();
		$('body').removeClass('overflowhidden');
		return false;
	});	

	$('.cookbook__close').click(function() {
		$('.js-popup').fadeOut();
		$('body').removeClass('overflowhidden');
		return false;
	});	
	$('.js-gift-one').click(function() {
		$('#jsgift-one').fadeIn();
		$('body').addClass('overflowhidden');
		return false;
	});	
	$('.js-gift-two').click(function() {
		$('#js-gift-two').fadeIn();
		$('body').addClass('overflowhidden');
		return false;
	});	
	$('.js-gift-three').click(function() {
		$('#js-gift-three').fadeIn();
		$('body').addClass('overflowhidden');
		return false;
	});	
	$('.js-gift-four').click(function() {
		$('#js-gift-four').fadeIn();
		$('body').addClass('overflowhidden');
		return false;
	});	
	
	

  });
})(jQuery);
