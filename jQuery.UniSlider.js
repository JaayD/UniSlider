/******************************************
 *
 * @author          JaayD
 * @copyright       Copyright (c) 2014 JaayD.
 * @Date            2014 April 27
 * @license         Free to use
 * @link            http://jon.lifesetter.de/UniSlider
 * @version         1.0
 * @description   	Universal Slider - Design your own slider - like you want - jQuery Plugin
 *  
 ******************************************/

(function($){
	$.fn.UniSlider = function(options){

		//Default settings
		var settings = $.extend({
			class: 'UniImage', // Class of each image
			height: '300px', // Height of slider
			padding: '0px', // Padding of slider
			width: 500, // Width of slider
			background: 'black', // Background
			opacity: 1, // Opacity of each image
			speed:50, // Speed if set handler to 'auto'
			margin: 0, // Margin-left of each image
			slidername: 'UniSlider', //Name(id) of slider
			caption: true, // Set caption: True or false (false: no caption)
			handler: 'click', // Set handler: Available values: 'click' and 'auto'. Auto will move the images constantly without interaction with user.
			border: 'none', // Set border of slider - Available values: normal css values, to example: '1px solid black'
			displaybuttons: 'block' // Show or not buttons. Normal css values, to example: 'none','block'
		},options);

		return this.each(function(){

//CHECK IF SLIDER ALREADY EXISTS IN DOCUMENT
var elem = $(this);
elem.addClass(settings.slidername);
if($('div').hasClass(settings.slidername)){

var elemLength = $('.'+settings.slidername).length;

for(s=0;s<elemLength;s++){
	settings.class = settings.class+'-'+s;
	console.log(settings.class);
}
}
//END
			
			var elemIMG = $(this).find('img');
			var length = elemIMG.length;
			var arrSrc = elemIMG.map(function(){return $(this).attr('src')});
			var arrAlt = elemIMG.map(function(){return $(this).attr('alt')});
			var arrTitle = elemIMG.map(function(){return $(this).attr('data-title')});
			var imgClass = '.'+settings.class;
			var totalleft = 0;


//LOAD IMAGE WIDTH AND CALCULATE POSITION LEFT

				$(window).on('load', function() {  
  					var img_widths = [];  
    				elemIMG.each(function() {
      					img_widths.push($(this).width());
    				});

      				for(n=0;n<length;n++){  
					$(imgClass+'_'+n).css({
						width:img_widths[n],
						maxWidth:$(window).width()});
					}

   					 $(imgClass).each(function() {
       					 $(this).css({left: totalleft});
       					 totalleft += $(this).width()+settings.margin
    				});

				});

				elemIMG.hide();
//END
		
//APPEND FOCUS DIV
			elem.append('<div class="focus-out'+settings.class+'"></div>');
			
			
//CSS OF MAIN DIV		
			elem.css({
				height:settings.height,
				padding:settings.padding,
				overflow: 'hidden',
				position: 'relative',
				width: settings.width,
				background: settings.background,
				border: settings.border
			});
//END
//CSS OF FOCUS DIV

			var windowWidth = elem.outerWidth();
			var elemWidth = windowWidth / length;
				console.log(windowWidth);

				$('.focus-out'+settings.class).css({
				width: Math.ceil(windowWidth/2),
				position: 'absolute',
				left: Math.ceil(windowWidth/4),
				height:settings.height
			});
			
//END
//IMAGES LOOP +CSS

			for(i=0;i<length;i++){

			elem.append('<div class="'+settings.class+' '+settings.class+'_'+i+'"></div>');
			
			
				$(imgClass+'_'+i).css({
					opacity: settings.opacity,
					position:'absolute',
					backgroundImage: 'url('+arrSrc[i]+')',
					backgroundRepeat: 'no-repeat',
					backgroundPosition: 'center center'
					
					 });
			}
			
			$(imgClass).css({height:settings.height});
//END

// START SLIDER AFTER TIME OUT
			
			//START INTERVAL

		if(settings.handler != 'click'){
			setTimeout(function(){
			var timer = setInterval(focuInterval,settings.speed);
			},1000);
		}

//END
//APPEND CAPTION 
console.log($(window).outerWidth());
			if(settings.caption == true) {

			for(i=0;i<length;i++){
				$(imgClass+'_'+i).append('<div id="caption-'+i+'" class="caption-'+settings.class+'"><div class="header-'+settings.class+'">'+arrTitle[i]+'</div><div class="text-'+settings.class+'">'+arrAlt[i]+'</div></div>');
				$('.caption-'+settings.class).hide();

				$('.caption-'+settings.class).css({
					width:'100%',
					color: 'white',
					background: 'rgba(0,0,0,0.5)',
					bottom: 0,
					right:0,
					position: 'absolute'
				});
				$('.header-'+settings.class).css({
					fontFamily: 'arial',
					fontSize:'18px',
					marginTop:'5px',
					marginLeft:'10px'
				});
				$('.text-'+settings.class).css({
					fontFamily: 'verdana',
					fontSize:'12px',
					padding:'5px',
					marginLeft:'10px'
				});
			}

			}

//HANDLER CLICK 
			var focusOffset = $('.focus-out'+settings.class).position().left;

			if(settings.handler == 'click'){
				
				elem.append('<div class="focuButton-'+settings.class+' leftfocuButton-'+settings.class+'"><</div>');
				elem.append('<div class="focuButton-'+settings.class+' rightfocuButton-'+settings.class+'">></div>');

				$('.focuButton-'+settings.class).css({
					position: 'absolute',
					background: 'rgba(0,0,0,0.5)',
					padding:'8px',
					top:'50%',
					borderRadius:'20px',
					fontSize: '12px',
					fontFamily: 'verdana',
					color: 'white',
					border: '1px solid rgba(255,255,255,0.5)',
					cursor:'pointer',
					display: settings.displaybuttons
				});

				$('.leftfocuButton-'+settings.class).css({
					left:0
				});
				$('.rightfocuButton-'+settings.class).css({
					right:0
				});

				var timeoutClick;
				var activeClass = 'active-'+settings.class;			
			$('.'+settings.class+':first').next(imgClass).addClass(activeClass);

				timeoutClick = setTimeout(function(){$('.rightfocuButton-'+settings.class).trigger('click');},5000);
//NEXT IMG
				$('.rightfocuButton-'+settings.class).click(function leftMove(){
					$(this).off('click');
					
					clearTimeout(timeoutClick);
					middleLeftIMG = (windowWidth - $('.active-'+settings.class).width())/2;
		
					$('.active-'+settings.class).prevAll(imgClass).each(function(){
						var goLeft = -1 - $(this).width();
						$(this).animate({left: goLeft},500,function(){
							$('.caption-'+settings.class, this).fadeOut(100);
							$(this).css({left:totalleft});
							$(this).insertAfter('.'+settings.class+':last');
						});

					});



					$('.active-'+settings.class).animate({left:middleLeftIMG},500,function(){
						$('.caption-'+settings.class, this).slideToggle(500);
						$(this).removeClass(activeClass).next(imgClass).addClass(activeClass);
						$('.rightfocuButton-'+settings.class).on('click',leftMove);

						timeoutClick = setTimeout(function(){$('.rightfocuButton-'+settings.class).trigger('click');},5000);	
					});
				});
//PREV IMG
				$('.leftfocuButton-'+settings.class).click(function rightMove(){
					$(this).off('click');
					clearTimeout(timeoutClick);
					$('.caption-'+settings.class).fadeOut(100);
					$(imgClass).removeClass(activeClass);
					$(imgClass).last().insertBefore('.'+settings.class+':first').addClass(activeClass).css({left:-totalleft});
					$(imgClass).not('.active-'+settings.class).each(function(){
						$(this).animate({left:totalleft});
						});
					middleLeftIMG = (windowWidth - $('.active-'+settings.class).width())/2;
					$('.active-'+settings.class).animate({left:middleLeftIMG},500,function(){
						$('.caption-'+settings.class, this).slideToggle(500);
						$(this).removeClass(activeClass).next(imgClass).addClass(activeClass);
						$('.leftfocuButton-'+settings.class).on('click',rightMove);
						timeoutClick = setTimeout(function(){$('.rightfocuButton-'+settings.class).trigger('click');},5000);
					});
					});
				
				}
			




			function focuInterval() {
				//SLIDING FUNCTION
				$(imgClass).each(function(){
					animateToIMG = $(this).position().left;
					$(this).css({left:animateToIMG-1});
					imagethis = $(this);

					if(imagethis.position().left == -1){
						imagethis.clone().css({left:totalleft-1}).prependTo(elem);
					}
			
					if(imagethis.position().left <= -imagethis.width){
					imagethis.remove();
					}
				//ANIMATIONS
				
					if(imagethis.position().left == Math.ceil(focusOffset+windowWidth/2)){
						imagethis.animate({opacity:1},1000);
						$('.caption-'+settings.class, this).slideToggle(500);
					}

					if(imagethis.position().left == Math.ceil(focusOffset)){
						imagethis.animate({opacity:settings.opacity},500);
						$('.caption-'+settings.class, this).fadeOut(1000);
					}
				});
				
			}

			

});
	}
}(jQuery));
