/* cachen Vars */
var body				= jQuery('body');
var loader				= jQuery('#loader');
var mask_shape			= jQuery('#mask-shape');
var lightwindow			= jQuery('#lightwindow');
var lightwindow_content = jQuery('#lightwindow-content');
var contact_form_ajax	= jQuery('.contact_form_ajax');
var contact_form		= jQuery('.contact-form');
var newsletter			= jQuery('.newsletter_form');
var newsletter_form_ajax= jQuery('.newsletter_form_ajax');
var newsletter_form		= jQuery('#newsletter');
var newsletter_objects	= jQuery('#newsletter input, #newsletter button');
var message_wrapper		= jQuery('.message-wrapper');
var message_wrapper_ok	= jQuery('.message-wrapper-ok');
var div_social			= jQuery('.social');
var fb_social			= jQuery('.fb_social');
var slideshow			= jQuery("#slideshow");
var $container			= jQuery('section ul.isotope');
var $container_portfolio			= jQuery('.isotope-portfolio');
var temp = 0;
var pt_carousel;
var timeout_control;

jQuery(document).ready(function() {
	"use strict";

	/* Fullscreen background video */
	if (jQuery('.bg video').length)
	{
		jQuery('video, object').maximage('maxcover');
		jQuery('html, body').css({'overflow' : 'hidden'});
	}

	if (typeof pt_supersized_slides !== "undefined")
	{
		jQuery.supersized({
			slide_interval : 18000, // Length between transitions
			transition : 1, // 0-None, 1-Fade, 2-Slide Top, 3-Slide Right, 4-Slide Bottom, 5-Slide Left, 6-Carousel Right, 7-Carousel Left
			transition_speed : 1400, // Speed of transition
			slide_links : 0, // Individual links for each slide (Options: false, 'number', 'name', 'blank')
			slides : pt_supersized_slides
		});
	}


	mask_shape.switchClass( "unloaded", "loaded", 250, 'easeInOutQuint',  function() { 

		jQuery('header, section, footer').css({ 'opacity' : 1 });

		jQuery('header figure').addClass('animated delay01 fast fadeInUp').one('webkitAnimationEnd oanimationend msAnimationEnd animationend', function(e) {

			jQuery('.btn-navbar').addClass('animated delay04 fadeIn');

			jQuery('header nav ul.nav li a:not(header nav ul.nav ul li a)').each(function(i){ /* Menus */
				jQuery(this).addClass('animated fast delay0'+ i +' fadeInLeft');
				temp = i;
			});
			jQuery('header nav ul.nav ul li a').each(function(i){ /* Submenus */
				jQuery(this).addClass('animated fast delay0'+ (i+3) +' fadeInLeft');
			});

			temp++;
			temp++;
			jQuery('.copyright').addClass('animated delay0'+ temp +' fadeIn');

			jQuery('.social .social-icons li').each(function(i){
				jQuery(this).addClass('animated fast delay0'+ i +' fadeInDown');
				temp = i;
			});
			temp++;
			jQuery('.social .twitterfeed').addClass('animated delay0'+ temp +' fadeIn');
		});

		jQuery('section h1').addClass('animated delay10 fadeInUp');
		jQuery('section h2, .flexslider, section .phone-accordion').addClass('animated delay12 fadeInUp');
		jQuery('section .content').addClass('animated delay14 fadeInUp');

		jQuery('section .content h2').addClass('animated delay16 fadeInRight');
		jQuery('section .content .subtitle').addClass('animated delay18 fadeIn');
		jQuery('.categories-filter').addClass('animated delay16 fadeInRight');

		if(!Modernizr.csstransitions)
		{
			jQuery('nav li a, .copyright').css({'opacity':'1'});
		}
	});


	/* Sub nav*/
	var nav_width = 320;
	var nav_drop  = 0;
	
	jQuery('.pt-mainmenu').hoverIntent(function(){
		nav_drop = nav_width + jQuery(this).find('.dropdown-menu').width();
		jQuery('.subnav-layer').stop().animate({'width': nav_drop}, 600, 'easeOutQuart');
	}, function(){
		jQuery('.subnav-layer').animate({'width': 0}, 400, 'easeInQuart');
	});

	jQuery('.pt-submenu').hoverIntent(function(){
		var w = nav_drop + jQuery(this).find('.dropdown-menu').width();
		jQuery('.subnav-layer').animate({'width': w}, 600, 'easeOutQuart');
	}, function(){
		jQuery('.subnav-layer').animate({'width': nav_drop}, 400, 'easeInQuart');
	});

	/* Templates Portfolio Categoreis Filter */
	jQuery('.categories-filter').hoverIntent(function(){
		jQuery(this).addClass('active');
	}, function(){
		jQuery(this).removeClass('active');
	});



	/* Waypoints */
	jQuery('section').waypoint(function(direction) {
		div_social.removeClass('fadeOutUp fadeInDown');
		if (direction === 'down') {
			div_social.addClass('animated fast fadeOutUp');
			if( jQuery.browser.msie && jQuery.browser.version < 9 )
			{
				div_social.slideUp('fast');
			}
		}
		else {
			div_social.addClass('animated fast fadeInDown');
			if( jQuery.browser.msie && jQuery.browser.version < 9 )
			{
				div_social.slideDown('fast');
			}
		}
	}, {offset:200}
	);

	/* Remove fixed h1 on sidebar scroll */
	jQuery('.sidebar-blog, .no-sidebar, .portfolio-1 .portfolio-item-2, .portfolio-2 .portfolio-item-3, .portfolio-3 #portfolio-row-1').waypoint(function(direction)
	{
		jQuery('h1.fixed').removeClass('delay10 fadeInUp fadeIn fadeOut show hide');

		if (direction === 'down') {
			jQuery('h1.fixed').addClass('animated fadeOut').one('webkitAnimationEnd oanimationend msAnimationEnd animationend', function(e) {
				jQuery('h1.fixed').addClass('hide');
			});
			if( jQuery.browser.msie && jQuery.browser.version < 9 )
			{
				jQuery('h1.fixed').slideUp('fast');
			}
		}
		else {
			jQuery('h1.fixed').addClass('animated fadeIn show');
			if( jQuery.browser.msie && jQuery.browser.version < 9 )
			{
				jQuery('h1.fixed').slideDown('fast');
			}
		}
	}, {offset:320});


	/* Contact Form lightwindow button */
	jQuery('.contact_form').click(function() {
		body.addClass('no-scroll');
		lightwindow_content.append(contact_form_ajax);

		lightwindow_content.find('h1, h2').removeClass();
		lightwindow_content.find('h1').addClass('animated delay05 fadeInUp');
		lightwindow_content.find('h2').addClass('animated delay10 fadeInUp');
		lightwindow_content.find('form').addClass('animated delay15 fadeInUp');
	
		lightwindow.fadeIn();
		lightwindow_content.addClass('show');

		contact_form_ajax.addClass('show').addClass('ie-show');
		mask_shape.switchClass( "loaded", "loaded-window", 750, 'easeInOutQuint', function() { 
			contact_form_ajax.animate({ 'opacity' : 1 }, 500);
		});
	});


	/* Contact Form lightwindow Close button */
	jQuery(document).on('click', '.contact_form_ajax a.close', function(event){
		contact_form_ajax.animate({ 'opacity' : 0 }, 500, function() { 
			mask_shape.switchClass( "loaded-window", "loaded", 750, 'easeInOutQuint', function() {
				contact_form_ajax.removeClass('show');
				message_wrapper.hide().removeClass('animated bounceInLeft');
				message_wrapper_ok.hide().removeClass('animated bounceInLeft');
				lightwindow_content.removeClass('show');
				lightwindow_content.find('form').removeClass('animated fadeOutRight hide delay15 fadeInUp hide');
				lightwindow.hide('fade');				
				body.removeClass('no-scroll');
				lightwindow_content.empty();
			});
		});
		return false;
	});


	/* Contacts Form */
	jQuery(document).on("submit", ".contact-form", function(){
		var form_data = jQuery(this).serialize();
		var name = jQuery('.contact-form input.pt_contact_name').attr('value');
		var email = jQuery('.contact-form input.pt_contact_email').attr('value');
		var subject = jQuery('.contact-form input.pt_contact_subject').attr('value');
		var message = jQuery('.contact-form textarea.pt_contact_message').attr('value');

		var form = jQuery(this);
		var message_ok = jQuery(this).parents('.container').find('.message-wrapper-ok');
		var message_error = jQuery(this).parents('.container').find('.message-wrapper');

		form.removeClass('delay15 fadeInUp');

		form_data += '&action=pt-ajax-contact-form';

		if (validateEmail(email) && name!='' && subject!='' && message!='' )
		{
			jQuery.post(config.contact_form_submit, form_data, function(data) {
				if (data=="true") {
					form.addClass('bounceOutRight').one('webkitAnimationEnd oanimationend msAnimationEnd animationend', function(e) {
						form.addClass('hide');
						form.removeClass('bounceOutRight');
						message_ok.show().addClass('animated bounceInLeft');
					});
					
				} else {
					message_error.show().addClass('animated bounceInLeft');
				}
			});
		}
		else
		{
			message_error.show().addClass('animated bounceInLeft');
		}

		return false;
	});


	/* Mailing list lightwindow button*/
	newsletter.click(function() {
		newsletter_form_ajax.addClass('show').addClass('ie-show');
		mask_shape.switchClass( "loaded", "loaded-window", 750, 'easeInOutQuint', function() { 
			newsletter_form_ajax.animate({ 'opacity' : 1 }, 500);
		});
		return false;
	});

	/* Close Mailing list lightwindow button*/
	jQuery('.newsletter_form_ajax a.close').click(function() {
		newsletter_form_ajax.animate({ 'opacity' : 0 }, 500, function() { 
			mask_shape.switchClass( "loaded-window", "loaded", 750, 'easeInOutQuint', function() {
				newsletter_form_ajax.removeClass('show');
				message_wrapper.hide().removeClass('animated bounceInLeft');
			});
		});
	});


	/* Newsletter Form */
	newsletter_form.submit(function() {
		var form_data = jQuery(this).serialize();
		var email = jQuery('#newsletter input').prop('value');

		form_data += '&action=pt-ajax-newsletter-form';
		
		if (validateEmail(email)) {
			jQuery.post(config.newsletter_form_submit, form_data, function(data) {
				newsletter_objects.fadeOut( function() {
					message_wrapper.removeClass('animated bounceInLeft').hide();
					// jQuery('.newsletter_form_ajax h2').fadeOut('fast');
					// jQuery('.newsletter_form_ajax h1').text(data);
				});

				//close the newsletter lightwindow
				newsletter_form_ajax.delay(1000).animate({ 'opacity' : 0 }, 500, function() { 
					mask_shape.switchClass( "loaded-window", "loaded", 750, 'easeInOutQuint', function() {
						newsletter_form_ajax.removeClass('show');
						newsletter_objects.fadeIn();
					});
				});
			});
		} else {
			message_wrapper.show().addClass('animated bounceInLeft');
		}
		return false;
	});

	/* Validade */
	/* Blog Comment Form */
	jQuery("#commentform, .contact-form").validate({
		errorContainer: "#errorContainer",
		errorLabelContainer: "#errorContainer",
	});


	/* Language Menu */
	jQuery('a.language').hoverIntent(function(){
		jQuery('.language_list ul').slideDown();
	});

	jQuery('.language_list').hoverIntent(function(){
	}, function(){
		jQuery('.language_list ul').slideUp();
	});

	/* current language */
	var currentLanguage = jQuery('.language_list ul li.current-language').text();
	if (currentLanguage !== "") {
		jQuery('.language').text(currentLanguage);
	}


	/* Portfolio hover Animation  x/8*5 */
	if ( !jQuery('section.portfolio .content li a figure .gradient').is(':animated') ) {
		jQuery('section.portfolio .content li a').hoverIntent(function(){
			jQuery(this).find('figure .gradient').animate({transform: 'matrix(1, -0.5, 0, 1, 0, -235)'}, {queue: true, duration: 150}); // 
			jQuery(this).find('figure .gradient').animate({transform: 'matrix(1, 0, 0, 1, 0, -380)'}, {queue: true, duration: 150});
		}, function(){
			jQuery(this).find('figure .gradient').animate({transform: 'matrix(1, -0.5, 0, 1, 0, -270)'}, {queue: true, duration: 150});
			jQuery(this).find('figure .gradient').animate({transform: 'matrix(1, 0, 0, 1, 0, 0)'}, {queue: true, duration: 150});
		});
	}

	/* Portfolio hover Animation  x/8*5 */
	if ( !jQuery('.portfolio-page .gradient').is(':animated') ) {
		jQuery('.portfolio-1 .portfolio-item a, .portfolio-2 .portfolio-item a').hoverIntent(function(){
			jQuery(this).find('figure .gradient').animate({transform: 'matrix(1, -0.5, 0, 1, 0, -270)'}, {queue: true, duration: 150});
			jQuery(this).find('figure .gradient').animate({transform: 'matrix(1, 0, 0, 1, 0, 0)'}, {queue: true, duration: 150});

			
		}, function(){
			jQuery(this).find('figure .gradient').animate({transform: 'matrix(1, -0.5, 0, 1, 0, -235)'}, {queue: true, duration: 150}); // 
			jQuery(this).find('figure .gradient').animate({transform: 'matrix(1, 0, 0, 1, 0, -380)'}, {queue: true, duration: 150});
		});
	}

	/* Portfolio hover Animation  x/8*5 */
	if ( !jQuery('.portfolio-page .gradient').is(':animated') ) {
		jQuery('.portfolio-3 .portfolio-item a').hoverIntent(function(){
			jQuery(this).find('figure .gradient').animate({transform: 'matrix(1, -0.5, 0, 1, 0, -270)'}, {queue: true, duration: 150});
			jQuery(this).find('figure .gradient').animate({transform: 'matrix(1, 0, 0, 1, 0, 0)'}, {queue: true, duration: 150});

			
		}, function(){
			jQuery(this).find('figure .gradient').animate({transform: 'matrix(1, -0.5, 0, 1, 0, -555)'}, {queue: true, duration: 150}); // 
			jQuery(this).find('figure .gradient').animate({transform: 'matrix(1, 0, 0, 1, 0, -700)'}, {queue: true, duration: 150});
		});
	}

	/* Blog normal hover Animation  x/8*5 */
	if ( !jQuery('section.blog .content li a.blog-normal figure .gradient, .sc_recent_works li a figure .gradient').is(':animated') ) {
		jQuery('section.blog .content li a.blog-normal, .sc_recent_works li a').hoverIntent(function(){
			jQuery(this).find('figure .gradient').animate({transform: 'matrix(1, -0.5, 0, 1, 0, -175)'}, {queue: true, duration: 150});
			jQuery(this).find('figure .gradient').animate({transform: 'matrix(1, 0, 0, 1, 0, -280)'}, {queue: true, duration: 150});
		}, function(){
			jQuery(this).find('figure .gradient').animate({transform: 'matrix(1, -0.5, 0, 1, 0, -200)'}, {queue: true, duration: 150});
			jQuery(this).find('figure .gradient').animate({transform: 'matrix(1, 0, 0, 1, 0, 0)'}, {queue: true, duration: 150});
		});
	}

	/* Blog large hover Animation  x/8*5 */
	if ( !jQuery('section.blog .content li a.blog-large figure .gradient').is(':animated') ) {
		jQuery('section.blog .content li a.blog-large').hoverIntent(function(){
			jQuery(this).find('figure .gradient').animate({transform: 'matrix(1, -0.5, 0, 1, 0, -270)'}, {queue: true, duration: 150});
			jQuery(this).find('figure .gradient').animate({transform: 'matrix(1, 0, 0, 1, 0, -430)'}, {queue: true, duration: 150});
		}, function(){
			jQuery(this).find('figure .gradient').animate({transform: 'matrix(1, -0.5, 0, 1, 0, -305)'}, {queue: true, duration: 150});
			jQuery(this).find('figure .gradient').animate({transform: 'matrix(1, 0, 0, 1, 0, 0)'}, {queue: true, duration: 150});
		});
	}

	
	/* Our Team */
	jQuery('.our-team-picture').hover(function() {
		jQuery(this).find('ul li').each(function(i){
			jQuery(this).addClass('animated fast delay0'+ (i+1) +' fadeInUp');
		});
	}, function(){
		jQuery(this).find('ul li').each(function(i){
			jQuery(this).removeClass('fadeInUp');
		});
	});

	jQuery('.sc_recent_works ul li').hover(function() {
		jQuery(this).find('h2').removeClass('fadeInUp fadeInRight delay12 delay16').addClass('fadeOutUp');
	}, function(){
		jQuery(this).find('h2').removeClass('fadeOutUp').addClass('fadeInDown');
	});


	//initialize isotope
	$container.imagesLoaded( function( $images, $proper, $broken ) {
		$container.isotope({
			itemSelector : 'li'
		});		
	});

	jQuery('.categories-filter li a').click(function(){
		var selector = jQuery(this).attr('data-filter');
		$container.isotope({ filter: selector });
		return false;
	});

	$container_portfolio.imagesLoaded( function( $images, $proper, $broken ) {
		$container_portfolio.isotope({
			itemSelector : '.portfolio-item'
		});		
	});

	jQuery('.portfolio-page .categories-filter li a').click(function(){
		var selector = jQuery(this).attr('data-filter');
		$container_portfolio.isotope({ filter: selector });
		return false;
	});

	jQuery(window).resize(function(e){ 
    	if (jQuery('.portfolio-page.portfolio-2 .isotope-portfolio, .portfolio-page.portfolio-1 .isotope-portfolio').hasClass('isotope'))
    	{
    		$container_portfolio.isotope( 'reLayout' );
    	}
    });


	/* LightWindow */
	jQuery('.popup').magnificPopup({
		fixedContentPos: false,
		fixedBgPos: true,
		overflowY: 'auto',
		closeBtnInside: true,
		preloader: false,
		midClick: true,
		removalDelay: 300,
		mainClass: 'my-mfp-slide-bottom'
	});

	/* Placeholder */
	jQuery('input, textarea').placeholder();


	/* Flexslider */
	jQuery('.flexslider').flexslider({
		animationLoop: true,
		slideshow: true,
		directionNav: false,
		smoothHeight: true,
		animation: "slide",
		controlNav: "thumbnails"
	});

	jQuery('.pt_testimonial_wrapper > div').bxSlider({
		mode : 'fade',
		controls : false,
		slideSelector : 'div.pt_testimonial_slide',
		adaptiveHeight : true
	});


	if ( Modernizr.mq('(max-width: 320px)') )
	{
		pt_carousel('.sc_recent_works ul', 246, 1, 1, 16, false);
		pt_carousel('.sc_recent_posts ul', 246, 1, 1, 16, false);
	}

	else if ( Modernizr.mq('(max-width: 480px)') )
	{
		pt_carousel('.sc_recent_works ul', 246, 2, 2, 16, false);
		pt_carousel('.sc_recent_posts ul', 246, 2, 2, 16, false);
	}

	else
	{
		pt_carousel('.sc_recent_works ul', 246, 3, 3, 16, false);
		pt_carousel('.sc_recent_posts ul', 246, 3, 3, 16, false);
	}

	
	pt_carousel('.client-list ul', 115, 1, 6, 16, false);

	jQuery(".sc_recent_works .bx-wrapper .bx-pager").center(true);

	jQuery('.fold-button').origami();

	jQuery('.flexslider').hover(function(){
		jQuery(this).find('ol.flex-control-thumbs li').each(function(i){
			jQuery(this).addClass('animated fast delay0'+ (i) +' fadeInUp');
		});
	}, function(){
		jQuery(this).find('ol.flex-control-thumbs li').each(function(i){
			jQuery(this).removeClass('fadeInUp');
		});
	});


	var share_state=0;
	jQuery(document).on('click', '.nav-share a.share', function(event) {

		var fb_social = jQuery('.fb_social');
		share_state = !share_state; 

		if ( share_state ) {
			fb_social.removeClass('fadeOutUp').addClass('fadeInDown');
			if( jQuery.browser.msie && jQuery.browser.version < 9 )
			{
				fb_social.slideDown('fast');
			}
		}
		else{
			fb_social.removeClass('fadeInDown').addClass('fadeOutUp');
			if( jQuery.browser.msie && jQuery.browser.version < 9 )
			{
				fb_social.slideUp('fast');
			}
		}
		event.preventDefault();
	});


	jQuery(document).on('click', '.lightwindow', function(event){

		var file = jQuery(this).attr('href');

		lightwindow.fadeIn();
		
		lightwindow_content.addClass('show').fadeIn();
		body.addClass('no-scroll');
		
		jQuery.ajax({
			url: file
		}).done(function(data) {
			lightwindow_content.html(data);

			portfolio_slider();

			if( jQuery.browser.mozilla ) {
				if ( lightwindow.hasScrollBar() == true ) {
					jQuery('#lightwindow #mask-shape, #lightwindow .bg').css({'right': jQuery.scrollbarWidth()});
					lightwindow.css({'overflow-y':'scroll'})
				}
			 }

			try{
				FB.XFBML.parse();
			}catch(ex){}

		});
		return false;
	});

	jQuery(document).on('click', '.close-lightwindow', function(event){
		
		lightwindow_content.fadeOut('normal', function() {
			lightwindow.fadeOut('normal', function() {
				body.removeClass('no-scroll');
				lightwindow_content.html('').css({'margin-top' : 0});
				lightwindow.css({'height' : 'auto'});
				lightwindow_content.removeClass('show');
			});
		});
		return false;
	});


	portfolio_slider();

	//Init Google Maps
	if (jQuery('#contact_map').length)
	{
		startGmap();
	}

});

function portfolio_slider() {

	var article = jQuery('article.single-portfolio');

	body.spin();

	article.imagesLoaded( function( ) {

		var sum = 0;
		jQuery('#slideshow img').each(function(){
			sum += jQuery(this).width()+15;
		});

		if( !jQuery.browser.msie && !jQuery.browser.version < 9 ) {
			sum=sum-14;
		}

		var container = jQuery('#slideshow').next('.container');

		if ( jQuery(window).width() >= sum ) {
			jQuery('#slideshow').css({'width': sum });
		}

		var lightwindow_content_height = lightwindow.height();
		if ( lightwindow_content.height() > lightwindow.height() ) {
			lightwindow_content_height = lightwindow_content.height();
		}

		if (jQuery.browser.webkit) {
			jQuery('#lightwindow #mask-shape, #lightwindow .bg').css({'height': lightwindow_content_height });
		}

		jQuery('#slideshow ul').css({'width':sum});

		jQuery('#slideshow').overscroll({
			scrollLeft: 0,
			scrollTop: 0,
			direction: "horizontal",
			wheelDirection: "horizontal",
			wheelDelta: 80,
			scrollDelta: 6
		});

		jQuery('.popup-gallery').magnificPopup({
			delegate: 'a',
			tLoading: 'Loading image #%curr%...',
			mainClass: 'my-mfp-slide-bottom',
			removalDelay: 200,
			gallery: {
				enabled: true,
				preload: [0,2],
				navigateByImgClick: true,
			},
			retina: {
				ratio: 1.5, // Increase this number to enable retina image support.
				replaceSrc: function(item, ratio) {
					return item.src.replace(/\.\w+$/, function(m) { return '@2x' + m; });
				} // function that changes image source
			}
		});

		body.spin(false);

		article.animate({'opacity': 1}, function(){
			var delay = 0;
			jQuery('#slideshow li').each(function(index) {
				jQuery(this).delay(delay).animate({'opacity' : 1}, 750);
				delay += 250;
			});
		});

	});
}

/* Youtube api */
if(typeof youtube_video_id!=="undefined"){var tag=document.createElement("script");tag.src="http://www.youtube.com/player_api";var firstScriptTag=document.getElementsByTagName("script")[0];firstScriptTag.parentNode.insertBefore(tag,firstScriptTag);var player;function onYouTubePlayerAPIReady(){player=new YT.Player("player",{playerVars:{playlist:youtube_video_id,autoplay:1,loop:1,showinfo:0,modestbranding:1,controls:1,autohide:1,iv_load_policy:3,rel:0,hd:1,wmode:"transparent"},videoId:youtube_video_id,events:{onReady:youtube_video_id}})}function onPlayerReady(b){b.target.mute()}}

/* Vimeo api */
//function vimeo_player_loaded(){moogaloop3=document.getElementById("player");moogaloop3.api_setVolume(0)}var flashvars={clip_id:vimeo_video_id,server:"vimeo.com",show_title:0,show_byline:0,show_portrait:0,fullscreen:0,autoplay:1,loop:1,js_api:1,js_onload:"vimeo_player_loaded"};var parObj={swliveconnect:true,fullscreen:1,allowscriptaccess:"always",allowfullscreen:true};var attObj={};attObj.id="player";Modernizr.load([{load:"http://ajax.googleapis.com/ajax/libs/swfobject/2.2/swfobject.js",complete:function(){swfobject.embedSWF("http://www.vimeo.com/moogaloop.swf","player","800","600","9.0.28","",flashvars,parObj,attObj)}}])}
if(typeof vimeo_video_id!=="undefined"){var iframe=jQuery("#player_vimeo")[0],player=$f(iframe);player.addEvent("ready",function(playerID){player.api("setVolume",0)});}

/* Detect Scroll */
jQuery.fn.hasScrollBar = function() { "use strict"; return this.get(0).scrollHeight > this.innerHeight(); }

/* Returns Scroll size */
jQuery.scrollbarWidth=function(){"use strict"; var a,b,c;if(c===undefined){a=jQuery('<div style="width:50px;height:50px;overflow:auto"><div/></div>').appendTo('body');b=a.children();c=b.innerWidth()-b.height(99).innerWidth();a.remove();}return c;};

/* Twitter Callback */
function tweet_callback(){ "use strict"; jQuery('.tweet_list').cycle({ fx: 'custom', cssBefore: { top:50, height: 100, opacity: 0, display: 'block' }, animIn: { top: 0, opacity: 1 }, animOut: { opacity: 0, top: -50 }, cssAfter: { zIndex: 0, display: 'none' }, speed: 1750, sync: false, easeIn: 'easeOutBack', easeOut: 'easeInBack' }); }

/* Convert Number */
function convertAnimated(num){"use strict"; return num.toString().split('.').join("");}

/* Google Maps */
function startGmap(){ var c={zoom:parseInt(config.google_maps_zoom),center:new google.maps.LatLng(config.pt_google_maps_latitude_1,config.pt_google_maps_longitude_1),navigationControlOptions:{style:google.maps.NavigationControlStyle.NORMAL,position:google.maps.ControlPosition.RIGHT_TOP},streetViewControl:false,scrollwheel:false,zoomControl:true,zoomControlOptions:{style:google.maps.ZoomControlStyle.DEFAULT,position:google.maps.ControlPosition.RIGHT_TOP},mapTypeControl:false,mapTypeControlOptions:{style:google.maps.MapTypeControlStyle.DROPDOWN_MENU,position:google.maps.ControlPosition.TOP_RIGHT,mapTypeIds:["ptMap"]}};map=new google.maps.Map(document.getElementById("contact_map"),c);var f=[{featureType:"administrative",elementType:"all",stylers:[{visibility:"off"}]},{featureType:"landscape",elementType:"all",stylers:[{color:config.google_maps_landscape_color},{visibility:"on"}]},{featureType:"poi",elementType:"all",stylers:[{visibility:"off"}]},{featureType:"road",elementType:"all",stylers:[{visibility:"on"},{lightness:-30}]},{featureType:"transit",elementType:"all",stylers:[{visibility:"off"}]},{featureType:"water",elementType:"all",stylers:[{color:config.google_maps_water_color}]}];var d={name:"Map"};var e=new google.maps.StyledMapType(f,d);map.mapTypes.set("ptMap",e);map.setMapTypeId("ptMap");if(config.pt_google_maps_latitude_1&&config.pt_google_maps_longitude_1){var p=parseFloat(config.pt_google_maps_latitude_1);var a=parseFloat(config.pt_google_maps_longitude_1);var g={path:google.maps.SymbolPath.CIRCLE,fillOpacity:0.75,fillColor:config.google_maps_circle_color,strokeOpacity:1,strokeColor:config.google_maps_circle_color,strokeWeight:1,scale:5};var k=new google.maps.LatLng(p,a);var b=new google.maps.Marker({position:k,map:map,zIndex:99999,optimized:false,icon:g})}if(config.pt_google_maps_latitude_2&&config.pt_google_maps_longitude_2){var p=parseFloat(config.pt_google_maps_latitude_2);var a=parseFloat(config.pt_google_maps_longitude_2);var g={path:google.maps.SymbolPath.CIRCLE,fillOpacity:0.75,fillColor:config.google_maps_circle_color,strokeOpacity:1,strokeColor:config.google_maps_circle_color,strokeWeight:1,scale:5};var k=new google.maps.LatLng(p,a);var b=new google.maps.Marker({position:k,map:map,zIndex:99999,optimized:false,icon:g})}if(config.pt_google_maps_latitude_3&&config.pt_google_maps_longitude_3){var p=parseFloat(config.pt_google_maps_latitude_3);var a=parseFloat(config.pt_google_maps_longitude_3);var g={path:google.maps.SymbolPath.CIRCLE,fillOpacity:0.75,fillColor:config.google_maps_circle_color,strokeOpacity:1,strokeColor:config.google_maps_circle_color,strokeWeight:1,scale:5};var k=new google.maps.LatLng(p,a);var b=new google.maps.Marker({position:k,map:map,zIndex:99999,optimized:false,icon:g})}if(config.pt_google_maps_latitude_4&&config.pt_google_maps_longitude_4){var p=parseFloat(config.pt_google_maps_latitude_4);var a=parseFloat(config.pt_google_maps_longitude_4);var g={path:google.maps.SymbolPath.CIRCLE,fillOpacity:0.75,fillColor:config.google_maps_circle_color,strokeOpacity:1,strokeColor:config.google_maps_circle_color,strokeWeight:1,scale:5};var k=new google.maps.LatLng(p,a);var b=new google.maps.Marker({position:k,map:map,zIndex:99999,optimized:false,icon:g})}};

/* validate email */ 
function validateEmail(a){ var b=/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; return b.test(a); }

/* Vertical Align */
jQuery.fn.center = function(parent) {      
	if (parent) {
		parent = this.parent();
	} else {
		parent = window;
	}
	this.css({
		"position": "absolute",
		"top": (((( this.outerHeight()) ) + jQuery(parent).scrollTop())   + "px")
	});

	return this;
}

function pt_carousel(selector, slideWidth, minSlides, maxSlides, slideMargin, controls)
{
	var parent = jQuery(selector).parent();

	if (parent.hasClass('sc_recent_posts_vertical'))
	{
		carousel_mode = 'vertical';
		minSlides = 2;
		maxSlides = 2;
	}

	else
	{
		carousel_mode = 'horizontal';
	}

	jQuery(selector).bxSlider({
		slideWidth: slideWidth,
		minSlides: minSlides,
		maxSlides: maxSlides,
		slideMargin: slideMargin,
		controls : controls,
		mode : carousel_mode
	});
}

