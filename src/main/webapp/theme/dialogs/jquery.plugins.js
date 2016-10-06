/**
 * include:
 * jquery.drag.js
 * jquery.gradient.js
 * jquery.dropshadow.js
 */

//jquery.drag.js
(function($){
	$.fn.drag = function(options){
		var _self = this;
		options = $.extend({
			window : window,
			containment : null,
			handle : null,
			start : null
		}, options || {});
		
		var _handle = options.handle || this;
		_handle.css("cursor", "move");
		_handle.mousedown(function(event){
			var ox = _self.position().left;
			var oy = _self.position().top;
			var mx = event.clientX;
			var my = event.clientY;
			
			if(_self[0].setCapture){
				_self[0].setCapture();
			}
			
			$(options.window.document).mousemove(function(event){
				if(options.window.getSelection){
					options.window.getSelection().removeAllRanges();
				}
				else{
					options.window.document.selection.empty();
				}
				
				var left;
				var top;
				if(options.containment){
					left = Math.max(ox + event.clientX - mx, options.containment.position().left);
					top = Math.max(oy + event.clientY - my, options.containment.position().top);
					left = Math.min(left, options.containment.width() - _self.width());
					top = Math.min(top, options.containment.height() - _self.height());
				}
				else{
					left = ox + event.clientX - mx;
					top = oy + event.clientY - my;
				}
				
				_self.css({left : left, top : top});
			}).mouseup(function(event){
				if(_self[0].releaseCapture){
					_self[0].releaseCapture();
				}
				
				$(options.window.document).unbind("mousemove");
				$(options.window.document).unbind("mouseup");
			});
		});
	}
	
	$.fn.stopDrag = function(options){
		var _self = this;
		options = $.extend({
			window : window
		}, options || {});
			
		if(_self[0].releaseCapture){
			_self[0].releaseCapture();
		}
		
		$(options.window.document).unbind("mousemove");
		$(options.window.document).unbind("mouseup");
	}
})(jQuery);

//jquery.gradient.js
(function($) {
$.fn.gradient = function(options) {
	options = $.extend({ from: '000000', to: 'ffffff', direction: 'horizontal', position: 'top', length: null }, options || {});
	var createColorPath = function(startColor, endColor, distance) {
		var colorPath = [],
		    colorPercent = 1.0,
			distance = (distance < 100) ? distance : 100;
		do {
			colorPath[colorPath.length] = setColorHue(longHexToDec(startColor), colorPercent, longHexToDec(endColor));	
			colorPercent -= ((100/distance)*0.01);
		} while (colorPercent>0);
		return colorPath;
	},
	setColorHue = function(originColor, opacityPercent, maskRGB) {
		var returnColor = [];
		for (var i=0; i<originColor.length; i++)
			returnColor[i] = Math.round(originColor[i]*opacityPercent) + Math.round(maskRGB[i]*(1.0-opacityPercent));
		return returnColor;
	},
	longHexToDec = function(longHex) {
		return new Array(toDec(longHex.substring(0,2)),toDec(longHex.substring(2,4)),toDec(longHex.substring(4,6)));
	},
	toDec = function(hex) {
		return parseInt(hex,16);
	};
	return this.each(function() {
		var $this = $(this), width = $this.innerWidth(), height = $this.innerHeight(), x = 0, y = 0, w = 1, h = 1, html = [],
		    length = options.length || (options.direction == 'vertical' ? width : height),
		    position = (options.position == 'bottom' ? 'bottom:0;' : 'top:0;') + (options.position == 'right' ? 'right:0;' : 'left:0;'), 
		    colorArray = createColorPath(options.from, options.to, length);
		
		if (options.direction == 'horizontal') {
			h = Math.round(length/colorArray.length) || 1;
			w = width;
		} else {
			w = Math.round(length/colorArray.length) || 1;
			h = height;
		}
		
		html.push('<div class="gradient" style="position: absolute; ' + position + ' width: ' + (options.direction == 'vertical' ? length+"px" : "100%") +'; height: ' + (options.direction == 'vertical' ? "100%" : length+"px") + '; overflow: hidden; z-index: 0; background-color: #' + (options.position.indexOf('bottom') != -1 ? options.from : options.to) + '">');
		for(var i=0; i<colorArray.length; i++) {
			html.push('<div style="position:absolute;z-index:1;top:' + y + 'px;left:' + x + 'px;height:' + (options.direction == 'vertical' ? "100%" : h+"px") + ';width:' + (options.direction == 'vertical' ? w+"px" : "100%") + ';background-color:rgb(' + colorArray[i][0] + ',' + colorArray[i][1] + ',' + colorArray[i][2] + ');"></div>');
			options.direction == 'vertical' ? x+=w : y+=h;
			
			if ( y >= height || x >= width) break;
		}
		html.push('</div>');
		
		if ( $this.css('position') == 'static' )
			$this.css('position', 'relative');
		
		$this
			.html('<div style="display:' + $this.css("display") + '; position: relative; z-index: 2;">' + this.innerHTML + '</div>')
			.prepend(html.join(''));
	});
};

})(jQuery);

//jquery.dropshadow.js
(function($){

  var dropShadowZindex = 1;

  $.fn.dropShadow = function(options)
  {
    var opt = $.extend({
    	window : window,
      left: 4,
      top: 4,
      blur: 2,
      opacity: .5,
      color: "black",
      swap: false
      }, options);
    var jShadows = $([]);
    
    this.not(".dropShadow").each(function()
    {
      var jthis = $(this);
      var shadows = [];
      var blur = (opt.blur <= 0) ? 0 : opt.blur;
      var opacity = (blur == 0) ? opt.opacity : opt.opacity / (blur * 8);
      var zOriginal = (opt.swap) ? dropShadowZindex : dropShadowZindex + 1;
      var zShadow = (opt.swap) ? dropShadowZindex + 1 : dropShadowZindex;
      
      var shadowId;
      if (this.id) {
        shadowId = this.id + "_dropShadow";
      }
      else {
        shadowId = "ds" + (1 + Math.floor(9999 * Math.random()));
      }
			
      $.data(this, "shadowId", shadowId);
      $.data(this, "shadowOptions", options);
      jthis
        .attr("shadowId", shadowId)
        .css("zIndex", zOriginal);
      if (jthis.css("position") != "absolute") {
        jthis.css({
          position: "relative",
          zoom: 1
        });
      }
			
      bgColor = jthis.css("backgroundColor");
      if (bgColor == "rgba(0, 0, 0, 0)") bgColor = "transparent";
      if (bgColor != "transparent" || jthis.css("backgroundImage") != "none" 
          || this.nodeName == "SELECT" 
          || this.nodeName == "INPUT"
          || this.nodeName == "TEXTAREA") {   
        shadows[0] = $("<div></div>", opt.window.document)
          .css("background", opt.color);                
      }
      else {
        shadows[0] = jthis
          .clone()
          .removeAttr("id")
          .removeAttr("name")
          .removeAttr("shadowId")
          .css("color", opt.color);
      }
      shadows[0]
        .addClass("dropShadow")
        .css({
          height: jthis.outerHeight(),
          left: blur,
          opacity: opacity,
          position: "absolute",
          top: blur,
          width: jthis.outerWidth(),
          zIndex: zShadow
        });
      
      var layers = (8 * blur) + 1;
      for (i = 1; i < layers; i++) {
        shadows[i] = shadows[0].clone();
      }
			
      var i = 1;      
      var j = blur;
      while (j > 0) {
        shadows[i].css({left: j * 2, top: 0});
        shadows[i + 1].css({left: j * 4, top: j * 2});
        shadows[i + 2].css({left: j * 2, top: j * 4});
        shadows[i + 3].css({left: 0, top: j * 2});
        shadows[i + 4].css({left: j * 3, top: j});
        shadows[i + 5].css({left: j * 3, top: j * 3});
        shadows[i + 6].css({left: j, top: j * 3});
        shadows[i + 7].css({left: j, top: j});
        i += 8;
        j--;
      }
			
      var divShadow = $("<div></div>", opt.window.document)
        .attr("id", shadowId) 
        .addClass("dropShadow")
        .css({
          left: jthis.position().left + opt.left - blur,
          marginTop: jthis.css("marginTop"),
          marginRight: jthis.css("marginRight"),
          marginBottom: jthis.css("marginBottom"),
          marginLeft: jthis.css("marginLeft"),
          position: "absolute",
          top: jthis.position().top + opt.top - blur,
          zIndex: zShadow
        });
			
      for (i = 0; i < layers; i++) {
        divShadow.append(shadows[i]);
      }
      
      jthis.after(divShadow);
			
      jShadows = jShadows.add(divShadow);
			
      $(opt.window).resize(function()
      {
        try {
          divShadow.css({
            left: jthis.position().left + opt.left - blur,
            top: jthis.position().top + opt.top - blur
          });
        }
        catch(e){}
      });
      
      dropShadowZindex += 2;

    });
    
    return this.pushStack(jShadows);
  };


  $.fn.redrawShadow = function()
  {
    this.removeShadow();
    
    return this.each(function()
    {
      var shadowOptions = $.data(this, "shadowOptions");
      $(this).dropShadow(shadowOptions);
    });
  };


  $.fn.removeShadow = function()
  {
    return this.each(function()
    {
      var shadowId = $(this).shadowId();
      $("div#" + shadowId).remove();
    });
  };


  $.fn.shadowId = function()
  {
    return $.data(this[0], "shadowId");
  };


  $(function()  
  {
    var noPrint = "<style type='text/css' media='print'>";
    noPrint += ".dropShadow{visibility:hidden;}</style>";
    $("head").append(noPrint);
  });

})(jQuery);