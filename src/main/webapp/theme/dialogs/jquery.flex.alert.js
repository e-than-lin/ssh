//jquery.flex.alert.js
(function($){	
	function flexalert(){
		
	}
	
	flexalert.prototype = {
		show : function(text, options){
			new FlexAlert(text, options);
		}
	}
	
	function FlexAlert(text, options){
	
		var _self = this;
		this._text = text || "";
		this._window = null;
		this._timeoutID = 0;
		
		options = $.extend({
			parent : "self",
			title : "提示",
			okLabel : "确定",
			cancelLabel : "取消",
			type : "alert",
			onok : null,
			oncancel : null,
			onclose : null,
			draggable : true,
			timeout : 0,
			zIndex : 999
		}, options || {});
		
		this.initOptions = function(){
			var _timeout = parseFloat(options.timeout);
			options.timeout = isNaN(_timeout) ? 0 : _timeout;
			
		};
		
		this.initWindow = function(){
			switch(options.parent){
				case "self" : 
					_self._window = window;
					break;
				case "parent" : 
					_self._window = window.parent;
					break;
				case "top" : 
					_self._window = window.top;
					break;
				default : 
					_self._window = window;
			}
		};
		
		this.initOptions();
		this.initWindow();
	
		this._dialog_mask = $("<div></div>", _self._window.document);
		this._dialog_content = $("<div></div>", _self._window.document);
		this._dialog_body = $("<div></div>", _self._window.document);
		this._dialog_header = $("<div></div>", _self._window.document);
		this._dialog_message = $("<div></div>", _self._window.document);
		this._dialog_button_content = $("<div></div>", _self._window.document);
		this._dialog_button_ok;
		this._dialog_button_cancel;
		
		this.maskCss = {
			"background-color" : "#CCCCCC",
			"position" : "absolute",
			"overflow" : "hidden",
			"left" : 0,
			"top" : 0,
			"z-index" : options.zIndex,
			"opacity" : 0.5
		};
		
		this.contentCss = {
			"position" : "absolute",
			"z-index" : options.zIndex + 1
		
		};
		
		this.bodyCss = {
			"background-color" : "#FFFFFF",
			"position" : "relative",
			"overflow" : "hidden",
			"border-width" : 1,
			"border-style" : "solid",
			"border-color" : "#6699CC"
		};
		
		this.headerCss = {
			"position" : "relative",
			"padding-top" : 5,
			"padding-bottom" : 5,
			"font-size" : "12px"
		};
		
		this.messageCss = {
			"position" : "relative",
			"text-align" : "center",
			"padding" : 5,
			"font-size" : "12px"
		};
		
		this.buttonContentCss = {
			"position" : "relative",
			"text-align" : "center",
			"padding" : 5
		};
		
		this.buttonBodyCss = {
			"margin" : "auto",
			"width" : 71,
			"height" : 22
		};
		
		this.buttonCss = {
			"background-image" : "url('/oa/theme/dialogs/images/dialog/button_out.png')",
			"background-repeat" : "no-repeat",
			"float" : "left",
			"text-align" : "center",
			"font-size" : "14px",
			"width" : 71,
			"height" : 22,
			"line-height" : 2,
			"cursor" : "pointer",
			"font-size" : "12px"
		};
		
		this.initMask = function(){
			_self._dialog_mask.css(_self.maskCss);
			//_self._dialog_mask.appendTo(_self._window.document.body);
			hasP(_self._window,_self);
			_self._dialog_mask.focus();
		};
		
		function hasP(_win,obj)
		{
			if (hasParentWin(_win)) {
		        hasP(_win.parent,obj);
		    }
			else
			{
				obj._dialog_mask.appendTo(_win.document.body);
			}
		}
		 
		
		function hasParentWin(_win) {
			return _win.parent != _win;
		}
		
		this.initContent = function(){
			_self._dialog_content.css(_self.contentCss);
			//_self._dialog_content.appendTo(_self._window.document.body);
			hasPD(_self._window,_self);
		};
		
		function hasPD(_win,obj)
		{
			if (hasParentWin(_win)) {
		        hasPD(_win.parent,obj);
		    }
			else
			{
				obj._dialog_content.appendTo(_win.document.body);
			}
		}
		
		this.initBody = function(){
			_self._dialog_body.css(_self.bodyCss);
			_self._dialog_body.appendTo(_self._dialog_content);
		};
		
		this.initHeader = function(){
			_self._dialog_header.css(_self.headerCss);
			_self._dialog_header.appendTo(_self._dialog_body);
			
			_self._dialog_header.html("<span style='padding-left:5px'>" + options.title + "</span>");
		};
		
		this.initMessage = function(){
			_self._dialog_message.css(_self.messageCss);
			_self._dialog_message.appendTo(_self._dialog_body);
			_self._dialog_message.html("<span>" + _self._text + "</span>");
		};
		
		
		this.initButtonContent = function(){
			_self._dialog_button_content.css(_self.buttonContentCss);
			_self._dialog_button_content.appendTo(_self._dialog_body);
		};
		
		this.initButton = function(){
			var dialog_button_body = $("<div></div>", _self._window.document);
			dialog_button_body.css(_self.buttonBodyCss);
			dialog_button_body.appendTo(_self._dialog_button_content);
			
			_self.dialog_button_ok = $("<div></div>", _self._window.document);
			_self.dialog_button_ok.css(_self.buttonCss);
			_self.dialog_button_ok.appendTo(dialog_button_body);
			
			_self.dialog_button_ok.html(options.okLabel);
			
			_self.dialog_button_ok.mouseover(function(){
				_self.dialog_button_ok.css("background-image", "url('/oa/theme/dialogs/images/dialog/button_over.png')");
			});
			
			_self.dialog_button_ok.mouseout(function(){
				_self.dialog_button_ok.css("background-image", "url('/oa/theme/dialogs/images/dialog/button_out.png')");
			});
			
			_self.dialog_button_ok.click(function(){
				if(typeof(options.onok) == "function"){
					options.onok();
				}
				_self._close();
			});
			
			if(options.type == "confirm"){
				dialog_button_body.css("width", 150);
				
				_self.dialog_button_cancel = $("<div></div>", _self._window.document);
				_self.dialog_button_cancel.css(_self.buttonCss);
				_self.dialog_button_cancel.css("float", "right");
				_self.dialog_button_cancel.appendTo(dialog_button_body);
			
				_self.dialog_button_cancel.html(options.cancelLabel);
				
				_self.dialog_button_cancel.mouseover(function(){
					_self.dialog_button_cancel.css("background-image", "url('/oa/theme/dialogs/images/dialog/button_over.png')");
				});
				
				_self.dialog_button_cancel.mouseout(function(){
					_self.dialog_button_cancel.css("background-image", "url('/oa/theme/dialogs/images/dialog/button_out.png')");
				});
				
				_self.dialog_button_cancel.click(function(){
					if(typeof(options.oncancel) == "function"){
						options.oncancel();
					}
					_self._close();
				});
			}
		};
		
		this._close = function(){
			_self._window.clearTimeout(_self._timeoutID);
			if(options.draggable){
				_self._dialog_content.stopDrag({window : _self._window});
			}
			_self.dialog_button_ok.unbind("mouseover").unbind("mouseout").unbind("click");
			if(_self.dialog_button_cancel){
				_self.dialog_button_cancel.unbind("mouseover").unbind("mouseout").unbind("click");
			}
			_self._dialog_mask.remove();
			_self._dialog_content.remove();
			
			if(typeof(options.onclose) == "function"){
				options.onclose();
			}
		};
		
		this.init = function(){
			//_self._dialog_mask.width(_self.bwidth());
			//_self._dialog_mask.height(_self.bheight());
			_self._dialog_mask.width("100%");
			_self._dialog_mask.height("100%");
			$(this._window).resize(function(){
				_self._dialog_mask.width(_self.bwidth());
				_self._dialog_mask.height(_self.bheight());
			});
			
			var w = _self._dialog_body.width();
			w = w < 200 ? 200 : w;
			w = w > 500 ? 500 : w;
			w = w + 5;
			_self._dialog_body.width(w);
			
			var h = _self._dialog_body.height();
			h = h < 90 ? 90 : h;
			_self._dialog_body.height(h);
			
			_self._dialog_body.dropShadow({window : _self._window, left: 3, top: 3, opacity: 0.25});
			
			_self._dialog_header.gradient({from:'D9D9D9',to:'6699CC'});
			
			var l = $(_self._window.document).scrollLeft() + ($(_self._window).width() - w) / 2;
			
			//var t = $(_self._window.document).scrollTop() + ($(_self._window).height() - h) / 2;
			var t = 200;
			if(options.draggable){
				_self._dialog_content.drag({window : _self._window, containment : _self._dialog_mask, handle : _self._dialog_header});
			}
			
			var _width = _self._dialog_content.width();
			var _height = _self._dialog_content.height();
			_self._dialog_content.css({overflow : "hidden"});
			_self._dialog_content.width(1);
			_self._dialog_content.height(1);
			_self._dialog_content.css({left : l + _width / 2, top : t + _height / 2});
			
			_self._dialog_body.css({left : - w / 2, top : - h / 2});
			
			getW(_self._window,_self,w,_width,_height,options);
		//	_self._dialog_content.animate({width : _width, height : _height, left : l, top : t}, 300, "linear", function(){
			//	_self._dialog_content.css("overflow", "visible");
			//	if(options.timeout > 0){
				//	_self._timeoutID = _self._window.setTimeout(_self._close, options.timeout * 1000);
				//}
			//});
			
			_self._dialog_body.animate({left : 0, top : 0}, 300, "linear");
		};
		
		//var dleft=0;
		function getW(_win,obj,wi,wth,h,opt)
		{
			if (hasParentWin(_win)) {
				getW(_win.parent,obj,wi,wth,h,opt);
		    }
			else
			{
				var l =  (_win.document.body.clientWidth)/2-wi/2; 
				
				obj._dialog_content.animate({width : wth, height : h, left : l, top : 200}, 300, "linear", function(){
					obj._dialog_content.css("overflow", "visible");
						if(opt.timeout > 0){
							obj._timeoutID = obj._window.setTimeout(obj._close, opt.timeout * 1000);
						}
					});
			}
		}
		
		this.bwidth = function(){
			if($.browser.msie){
				var scrollWidth = Math.max(_self._window.document.documentElement.scrollWidth, _self._window.document.body.scrollWidth);
				var offsetWidth = Math.max(_self._window.document.documentElement.offsetWidth, _self._window.document.body.offsetWidth);
				if(scrollWidth <= offsetWidth){
					return $(_self._window).width();
				}
				else{
					return scrollWidth;
				}
			}
			else{
				return $(_self._window.document).width();
			}
		};
		
		this.bheight = function(){
			if($.browser.msie){
				var scrollHeight = Math.max(_self._window.document.documentElement.scrollHeight, _self._window.document.body.scrollHeight);
				var offsetHeight = Math.max(_self._window.document.documentElement.offsetHeight, _self._window.document.body.offsetHeight);
				if(scrollHeight <= offsetHeight){
					return $(_self._window).height();
				}
				else{
					return scrollHeight;
				}
			}
			else{
				return $(_self._window.document).height();
			}
		};
		
		this.initMask();
		this.initContent();
		this.initBody();
		this.initHeader();
		this.initMessage();
		this.initButtonContent();
		this.initButton();
		this.init();
		
	}
	
	$.extend({flexalert : new flexalert()});
})(jQuery);