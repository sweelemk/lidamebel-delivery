$(document).ready(function() {
	////slider delivery
	$('.slides_list').carouFredSel({
		prev: '.pagination .prev_btn',
		next: '.pagination .next_btn',
		items: 1,
		responsive: true,
		mousewheel: false,
		swipe: { 
			onMouse: true,
			onTouch: true
		},
		pagination: {
			container: '.pagin ul',
			anchorBuilder: false
		},
		auto: {
			timeoutDuration: 5000
		}
	});

	//map
	if ($('#map-canvas').length) {
        function initialize() {
            var mapOptions = {
                zoom: 12,
                disableDefaultUI: true,
                scrollwheel: false,
                panControl: false,
                zoomControl: true,
                zoomControlOptions: {
                    style: google.maps.ZoomControlStyle.SMALL,
                    position: google.maps.ControlPosition.RIGHT_CENTER
                },
                scaleControl: true,
                center: new google.maps.LatLng(53.645294, 23.848678)
            };

            map = new google.maps.Map(document.getElementById('map-canvas'),
              mapOptions);
            var image = 'images/marker.png';
            var myLatLng = new google.maps.LatLng(53.645294, 23.848678);
            var beachMarker = new google.maps.Marker({
                position: myLatLng,
                map: map,
                icon: image
            });
        }
        google.maps.event.addDomListener(window, 'load', initialize);
    };
	// tabs
	function tab() {
       $(".js-tab").each(function(){
         var tab_link = $(this).find("a");
         var tab_item = $(this).find("li");
         var tab_cont = $(this).parents(".js-tab-group").find(".js-tab-cont");
         tab_cont.hide();
         tab_item.first().addClass("is-active");
         $(this).parents(".js-tab-group").find(".js-tab1").show();
         tab_link.on("click", function() {
             var index = $(this).attr("href");
             tab_item.removeClass("is-active");
             $(this).parent().addClass("is-active");
             tab_cont.hide();
             $(this).parents(".js-tab-group").find("."+index).show();
             if ($(this).parents(".js-tab-group").find("."+index).find('.js-scroll').length) {
             	$(this).parents(".js-tab-group").find("."+index).find('.js-scroll').jScrollPane();
             }
             initialize();
             return false;
          });
       });
  	}
  	tab();

	var $popupTip = $('.popup-tip.by-css'), $popupWrapper = $('#popup-wrapper');
	$popupTip.click(function() {
		$popupWrapper.toggleClass('active');
	});

	$('.sort_nav ul li a').click(function() {
		$(this).toggleClass('up');
	});
				
	$('.left_nav  ul > li > a').click(function() {
		act = false;
		if ($(this).parent().hasClass("active")) {
			act = true;
		}
		;
		$(this).parent().parent().find('li.active').removeClass("active").find('>ul').slideUp();
		$(this).parent().addClass('active');
		if (!act) {
			$(this).parent().find('>ul').slideDown();
		}
		else {
			$(this).parent().removeClass("active")
		}
		;
		return false;
	});

    $('#article').jScrollPane();
	
	$('#about').jScrollPane();
	
	$('.article_slider .bxslider').bxSlider({
		auto: 'true',
		mode: 'fade',
		captions: true
	});
	
	$('.viewed_slider').bxSlider({
		auto: 'true',
		minSlides: 3,
		maxSlides: 3,
		slideWidth: 210,
		slideMargin: 0
	});
	
	$('.minus').click(function() {
		var $input = $(this).parent().find('input');
		var count = parseInt($input.val()) - 1;
		count = count < 1 ? 1 : count;
		$input.val(count);
		$input.change();
		return false;
	});

	$('.plus').click(function() {
		var $input = $(this).parent().find('input');
		$input.val(parseInt($input.val()) + 1);
		$input.change();
		return false;
	});
	
	$('.useful_slider').bxSlider({
		mode: 'fade',
		auto: 'true',
		captions: true
	});
	
	$('.product_gallery').bxSlider({
		auto: 'true',
		pagerCustom: '#bx-gallery-pager',
		mode: "fade"
	});

	$('.vertical_slider').bxSlider({
		auto: 'true',
		mode: 'vertical',
		slideWidth: 208,
		minSlides: 2,
		slideMargin: 12
	});
	
	$('.sidebar_slider .bxslider').bxSlider({
		pagerCustom: '#bx-pager',
		auto: 'true',
		mode: "fade"
	});
	
	$('.propose_slider').bxSlider({
		slideWidth: 207,
		auto: 'true',
		minSlides: 3,
		maxSlides: 4
	});
	
	$('.popup .close').click(function() {
		$('#overlay').fadeOut();
		$(this).parent().fadeOut('slow');
		return false;
	});
	
	$('#cart_popup .popup .close').click(function() {
		$('#overlay').fadeOut();
		$(this).parent().fadeOut('slow');
		return false;
	});
				
	$('.search input[type=text], .call_form input[type=text], .review_form input[type=text]')
			.bind('focus', Function("if(this.value==this.defaultValue) this.value=''"))
			.bind('blur', Function("if(this.value=='') this.value=this.defaultValue"));

	//// google map
	if ($('#gmap1, #gmap2').length) {
		mapInit();
	} 
	
	//// tabs
	$("#tabs").tabs({
		select: function(event, ui) {
			if (ui.index == 1) {
				map2Init();
			}
		}
	});
	
	//// slider
	if ($('.js-mainSlider').length) {
		$('.js-mainSlider li').each(function(i) {
			$(this).attr('rel', i)
		});
	
		$('.js-mainSlider').carouFredSel({
			prev: '.slide_pagination .prev_btn',
			next: '.slide_pagination .next_btn',
			items: 1,
			responsive: true,
			mousewheel: false,
			swipe: { 
				onMouse: true,
				onTouch: true
			},
			pagination: {
				container: '.pagination ul',
				anchorBuilder: false
			},
			scroll: {
				onBefore: function(data) {
					$('.text_wrapper .text:visible').fadeTo(500, 0, function() {
						$(this).hide();
					})
					$('.text_wrapper .text').eq(data.items.visible.attr('rel')).show().fadeTo(500, 1);
				}
			},
			auto: {
				timeoutDuration: 5000
			}
		});
	}

	

	//// rating
	var hoverTimeout;
	$('.js-rating li').hover(function() {
		if (!$(this).parents('.js-rating').hasClass('active')) {
			$(this).parents('.js-rating').find('li').removeClass('active');
			$(this).addClass('active');
			$(this).prevAll().addClass('active');
			
			clearTimeout(hoverTimeout);
		}
	}, function() {
		if (!$(this).parents('.js-rating').hasClass('active')) {
			var self = $(this);
			hoverTimeout = setTimeout(function() {
				self.parents('.js-rating').find('li').removeClass('active');
			}, 100);
		}
	});
	
	$('.js-rating li a').click(function() {
		clearTimeout(hoverTimeout);
	
		$(this).parents('.js-rating').toggleClass('active');
		
		$(this).parents('.js-rating').find('li').removeClass('active');
		$(this).parent().addClass('active');
		$(this).parent().prevAll().addClass('active');
		return false;
	});
	
	// fake ajax reviews
	$('.reviews .review').slice(1).hide();
	$('.view_all').click(function() {
		$('.reviews .review:not(:visible)').slice(0, 5).slideDown();
		return false;
	});
});

$(window).load(function() {
	$('.preloader').hide();
});

function OpenWin(id) {
	$('#overlay').fadeIn(400);
	$('#' + id).fadeIn(400);
}

function mapInit() {
	var latlng = new google.maps.LatLng(55.77582,37.541294); 
	var mapOptions = {
		zoom: 15,  
		center: latlng,
		mapTypeId: google.maps.MapTypeId.ROADMAP, 
		panControl:false,
		streetViewControl:false,
		mapTypeControl:false, 
		scaleControl: false,
		scrollwheel: false,
		zoomControl: true,
		zoomControlOptions: {
			style: google.maps.ZoomControlStyle.LARGE,
			position: google.maps.ControlPosition.LEFT_CENTER
		}
	}; 
	var map = new google.maps.Map(document.getElementById('gmap1'), mapOptions); 
	var image = new google.maps.MarkerImage('images/pin.png', 
		new google.maps.Size(65, 71), 
		new google.maps.Point(0,0), 
		new google.maps.Point(28, 92)
	); 
	var marker1 = new google.maps.Marker({
		position: new google.maps.LatLng(55.77582,37.541294),
		map: map,
		icon: image  
	});   
}

var map2inited = false;
function map2Init() {
	if (!map2inited) {
		map2inited = true;
	
		setTimeout(function() {
			var latlng2 = new google.maps.LatLng(56.77582,137.541294); 
			var mapOptions2 = {
				zoom: 15,  
				center: latlng2,
				mapTypeId: google.maps.MapTypeId.ROADMAP, 
				panControl:false,
				streetViewControl:false,
				mapTypeControl:false, 
				scaleControl: false,
				scrollwheel: false,
				zoomControl: true,
				zoomControlOptions: {
					style: google.maps.ZoomControlStyle.LARGE,
					position: google.maps.ControlPosition.LEFT_CENTER
				}
			}; 
			var map2 = new google.maps.Map(document.getElementById('gmap2'), mapOptions2); 
			var image = new google.maps.MarkerImage('images/pin.png', 
				new google.maps.Size(65, 71), 
				new google.maps.Point(0,0), 
				new google.maps.Point(28, 92)
			); 
			var marker2 = new google.maps.Marker({
				position: new google.maps.LatLng(56.77582,37.541294),
				map: map2,
				icon: image  
			});
		}, 300);
	}				
}
