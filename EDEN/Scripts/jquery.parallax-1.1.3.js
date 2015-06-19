/*
Plugin: jQuery Parallax
Version 1.1.3
Author: Ian Lunn
Twitter: @IanLunn
Author URL: http://www.ianlunn.co.uk/
Plugin URL: http://www.ianlunn.co.uk/plugins/jquery-parallax/

Dual licensed under the MIT and GPL licenses:
http://www.opensource.org/licenses/mit-license.php
http://www.gnu.org/licenses/gpl.html
*/

(function( $ ){
	var $window = $(window);
	var windowHeight = $window.height();

	$window.resize(function () {
		windowHeight = $window.height();
	});

	$.fn.parallax = function(xpos, speedFactor, outerHeight, yMax) {
		var $this = $(this);
		var getHeight;
		var firstTop;
		var paddingTop = 0;
		var backgroundPositionY = $this.css('backgroundPosition').split(' ')[1].replace('px', '');
		var limited = yMax;
		var haveUpdate = false;
	
		//get the starting position of each element to have parallax applied to it		
		$this.each(function(){
		    firstTop = $this.offset().top;
		});

		if (outerHeight) {
			getHeight = function(jqo) {
				return jqo.outerHeight(true);
			};
		} else {
		    getHeight = function (jqo) {
				return jqo.height();
			};
		}
			
		// setup defaults if arguments aren't specified
		if (arguments.length < 1 || xpos === null) xpos = "50%";
		if (arguments.length < 2 || speedFactor === null) speedFactor = 0.1;
		if (arguments.length < 3 || outerHeight === null) outerHeight = true;
		
		// function to be called whenever the window is scrolled or resized
		function update() {

			var pos = $window.scrollTop();				

			$this.each(function(){
				var $element = $(this);
				var top = $element.offset().top;
				var height = getHeight($element);

				// Check if totally above or totally below viewport
				if (top + height < pos || top > pos + windowHeight) {
					return;
				}
			    //change it using orginal backgroundPosition
			    //set a limited value to create a end value
				if (haveUpdate == false)
				{
				    $this.css('backgroundPosition', xpos + " " + (Math.round((firstTop - pos) * speedFactor) + parseInt(backgroundPositionY)) + "px");
				    haveUpdate = true;
				}
				else
				{
				    var yPositionNow = parseInt($this.css('backgroundPosition').split(' ')[1].replace('px', ''));
				    if (limited != '' && limited != null && limited != undefined) {
				        var resultY = (Math.round((firstTop - pos) * speedFactor) + parseInt(backgroundPositionY));
				        if (speedFactor > 0) {
				            if (resultY > limited) {
				                $this.css('backgroundPosition', xpos + " " + resultY + "px");
				            }
				            else {
				                $this.css('backgroundPosition', xpos + " " + limited + "px");
				            }
				        }
				        else {
				            if (resultY < limited) {
				                $this.css('backgroundPosition', xpos + " " + resultY + "px");
				            }
				            else {
				                $this.css('backgroundPosition', xpos + " " + limited + "px");
				            }
				        }
				    }
				    else {
				        $this.css('backgroundPosition', xpos + " " + (Math.round((firstTop - pos) * speedFactor) + parseInt(backgroundPositionY)) + "px");
				    }
				}			
			});
		}

		$window.bind('scroll', update).resize(update);
		update();	
	};
})(jQuery);
