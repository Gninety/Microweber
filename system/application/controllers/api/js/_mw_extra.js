

var css = document.createElement("link");
css.rel = "stylesheet";
css.type = "text/css";
css.href = "<? print ADMIN_STATIC_FILES_URL ?>css/api.css";

document.getElementsByTagName("head")[0].appendChild(css);



window.mw_forms = window.mw_forms ? window.mw_forms : {};
mw_forms = window.mw_forms;


mw_forms.make_fields = function(){
	
	$(".mw_option_field").not('.mw_option_field_parsed').each(function(){
		$(this).addClass('mw_option_field_parsed');
		 
		$(this).change(function() {
			 //alert('Handler for .change() called.');
			//<? print site_url('api/content/save_option') ?>
			//var refresh_modules11 =  $(this).attr('name');
		//	alert(refresh_modules11);
			
			
			
			
			
			 var refresh_modules11 =  this.getAttribute("refresh_modules");
			
			// alert(refresh_modules11);
			
			
			
			
			$.ajax({
				  
				  type: "POST",
				   url: "<? print site_url('api/content/save_option') ?>",
				   data: ({
					   
					   option_key : $(this).attr('name'),
					   option_group : $(this).attr('option_group'),
					   option_value : $(this).val()
					   
				   
				   }),


				  success: function(){
				
				if(refresh_modules11 != undefined && refresh_modules11 != ''){
					refresh_modules11 = refresh_modules11.toString()
					
//alert(refresh_modules11);
					if(window.mw.reload_module != undefined){
						window.mw.reload_module(refresh_modules11);
					}
					
					if(parent.mw.reload_module != undefined){
						parent.mw.reload_module(refresh_modules11);
					}

				/*		*/
					
					
					
					
				}
				
				  //  $(this).addClass("done");
				  }
				});
			
			
			
			});
		
		
	 		/*$(this).css({
	 			 'backgroud-color': 'pink',
        	    'width': 20,
        	    'height': 20   

        	    
        	});*/
		 
	});
	
	
}

$(document).ready(function(){
	mw_forms.make_fields();
    });

mw.ready(".mw_option_field", mw_forms.make_fields);



// used on editmode and in admin



function isEmpty(obj) {
    for(var prop in obj) {
        if(obj.hasOwnProperty(prop))
            return false;
    }

    return true;
}
$.fn.insertAtCaret = function (myValue) {
	  return this.each(function(){
	  //IE support
	  if (document.selection) {
	    this.focus();
	    sel = document.selection.createRange();
	    sel.text = myValue;
	    this.focus();
	  }
	  //MOZILLA / NETSCAPE support
	  else if (this.selectionStart || this.selectionStart == '0') {
	    var startPos = this.selectionStart;
	    var endPos = this.selectionEnd;
	    var scrollTop = this.scrollTop;
	    this.value = this.value.substring(0, startPos)+ myValue+ this.value.substring(endPos,this.value.length);
	    this.focus();
	    this.selectionStart = startPos + myValue.length;
	    this.selectionEnd = startPos + myValue.length;
	    this.scrollTop = scrollTop;
	  } else {
	    this.value += myValue;
	    this.focus();
	  }
	  });
	};
	
	$.fn.insertAtCaret = function (myValue) {
		return this.each(function(){
				//IE support
				if (document.selection) {
						this.focus();
						sel = document.selection.createRange();
						sel.text = myValue;
						this.focus();
				}
				//MOZILLA / NETSCAPE support
				else if (this.selectionStart || this.selectionStart == '0') {
						var startPos = this.selectionStart;
						var endPos = this.selectionEnd;
						var scrollTop = this.scrollTop;
						this.value = this.value.substring(0, startPos)+ myValue+ this.value.substring(endPos,this.value.length);
						this.focus();
						this.selectionStart = startPos + myValue.length;
						this.selectionEnd = startPos + myValue.length;
						this.scrollTop = scrollTop;
				} else {
						this.value += myValue;
						this.focus();
				}
		});
	};
	
	
	function mw_insertHtmlAtCursor(html) {
	    var range, node;
	    if (window.getSelection && window.getSelection().getRangeAt) {
	        range = window.getSelection().getRangeAt(0);
	        node = range.createContextualFragment(html);
	        range.insertNode(node);
	    } else if (document.selection && document.selection.createRange) {
	        document.selection.createRange().pasteHTML(html);
	    }
	}
	
	
	function mw_insertNodeAtCursor(node) {
	    var range, html;
	    if (window.getSelection && window.getSelection().getRangeAt) {
	        range = window.getSelection().getRangeAt(0);
	        range.insertNode(node);
	    } else if (document.selection && document.selection.createRange) {
	        range = document.selection.createRange();
	        html = (node.nodeType == 3) ? node.data : node.innerHTML;
	        range.pasteHTML(html);
	    }
	}
	
	
	jQuery.expr[':'].parents = function(a,i,m){
	    return jQuery(a).parents(m[3]).length < 1;
	};

	
	$.fn.hasAncestor = function(a) {
	    return this.filter(function() {
	        return !!$(this).closest(a).length;
	    });
	};


	
	
	/*
	 * jQuery outside events - v1.1 - 3/16/2010
	 * http://benalman.com/projects/jquery-outside-events-plugin/
	 * 
	 * Copyright (c) 2010 "Cowboy" Ben Alman
	 * Dual licensed under the MIT and GPL licenses.
	 * http://benalman.com/about/license/
	 */
	(function($,c,b){$.map("click dblclick mousemove mousedown mouseup mouseover mouseout change select submit keydown keypress keyup".split(" "),function(d){a(d)});a("focusin","focus"+b);a("focusout","blur"+b);$.addOutsideEvent=a;function a(g,e){e=e||g+b;var d=$(),h=g+"."+e+"-special-event";$.event.special[e]={setup:function(){d=d.add(this);if(d.length===1){$(c).bind(h,f)}},teardown:function(){d=d.not(this);if(d.length===0){$(c).unbind(h)}},add:function(i){var j=i.handler;i.handler=function(l,k){l.target=k;j.apply(this,arguments)}}};function f(i){$(d).each(function(){var j=$(this);if(this!==i.target&&!j.has(i.target).length){j.triggerHandler(e,[i.target])}})}}})(jQuery,document,"outside");
	
	$.event.special.tripleclick = {

		    setup: function(data, namespaces) {
		        var elem = this, $elem = jQuery(elem);
		        $elem.bind('click', jQuery.event.special.tripleclick.handler);
		    },

		    teardown: function(namespaces) {
		        var elem = this, $elem = jQuery(elem);
		        $elem.unbind('click', jQuery.event.special.tripleclick.handler)
		    },

		    handler: function(event) {
		        var elem = this, $elem = jQuery(elem), clicks = $elem.data('clicks') || 0;
		        clicks += 1;
		        if ( clicks === 3 ) {
		            clicks = 0;

		            // set event type to "tripleclick"
		            event.type = "tripleclick";

		            // let jQuery handle the triggering of "tripleclick" event handlers
		            jQuery.event.handle.apply(this, arguments)
		        }
		        $elem.data('clicks', clicks);
		    }

		};


	(function($) {
	    $.fn.getAttributes = function() {
	        var attributes = {}; 

	        if(!this.length)
	            return this;

	        $.each(this[0].attributes, function(index, attr) {
	            attributes[attr.name] = attr.value;
	        }); 

	        return attributes;
	    }
	})(jQuery);
	
	
	
	
	
 
	
	
	
	/**
	* hoverIntent is similar to jQuery's built-in "hover" function except that
	* instead of firing the onMouseOver event immediately, hoverIntent checks
	* to see if the user's mouse has slowed down (beneath the sensitivity
	* threshold) before firing the onMouseOver event.
	* 
	* hoverIntent r6 // 2011.02.26 // jQuery 1.5.1+
	* <http://cherne.net/brian/resources/jquery.hoverIntent.html>
	* 
	* hoverIntent is currently available for use in all personal or commercial 
	* projects under both MIT and GPL licenses. This means that you can choose 
	* the license that best suits your project, and use it accordingly.
	* 
	* // basic usage (just like .hover) receives onMouseOver and onMouseOut functions
	* $("ul li").hoverIntent( showNav , hideNav );
	* 
	* // advanced usage receives configuration object only
	* $("ul li").hoverIntent({
	*	sensitivity: 7, // number = sensitivity threshold (must be 1 or higher)
	*	interval: 100,   // number = milliseconds of polling interval
	*	over: showNav,  // function = onMouseOver callback (required)
	*	timeout: 0,   // number = milliseconds delay before onMouseOut function call
	*	out: hideNav    // function = onMouseOut callback (required)
	* });
	* 
	* @param  f  onMouseOver function || An object with configuration options
	* @param  g  onMouseOut function  || Nothing (use configuration options object)
	* @author    Brian Cherne brian(at)cherne(dot)net
	*/
	(function($) {
		$.fn.hoverIntent = function(f,g) {
			// default configuration options
			var cfg = {
				sensitivity: 7,
				interval: 100,
				timeout: 0
			};
			// override configuration options with user supplied object
			cfg = $.extend(cfg, g ? { over: f, out: g } : f );

			// instantiate variables
			// cX, cY = current X and Y position of mouse, updated by mousemove event
			// pX, pY = previous X and Y position of mouse, set by mouseover and polling interval
			var cX, cY, pX, pY;

			// A private function for getting mouse position
			var track = function(ev) {
				cX = ev.pageX;
				cY = ev.pageY;
			};

			// A private function for comparing current and previous mouse position
			var compare = function(ev,ob) {
				ob.hoverIntent_t = clearTimeout(ob.hoverIntent_t);
				// compare mouse positions to see if they've crossed the threshold
				if ( ( Math.abs(pX-cX) + Math.abs(pY-cY) ) < cfg.sensitivity ) {
					$(ob).unbind("mousemove",track);
					// set hoverIntent state to true (so mouseOut can be called)
					ob.hoverIntent_s = 1;
					return cfg.over.apply(ob,[ev]);
				} else {
					// set previous coordinates for next time
					pX = cX; pY = cY;
					// use self-calling timeout, guarantees intervals are spaced out properly (avoids JavaScript timer bugs)
					ob.hoverIntent_t = setTimeout( function(){compare(ev, ob);} , cfg.interval );
				}
			};

			// A private function for delaying the mouseOut function
			var delay = function(ev,ob) {
				ob.hoverIntent_t = clearTimeout(ob.hoverIntent_t);
				ob.hoverIntent_s = 0;
				return cfg.out.apply(ob,[ev]);
			};

			// A private function for handling mouse 'hovering'
			var handleHover = function(e) {
				// copy objects to be passed into t (required for event object to be passed in IE)
				var ev = jQuery.extend({},e);
				var ob = this;

				// cancel hoverIntent timer if it exists
				if (ob.hoverIntent_t) { ob.hoverIntent_t = clearTimeout(ob.hoverIntent_t); }

				// if e.type == "mouseenter"
				if (e.type == "mouseenter") {
					// set "previous" X and Y position based on initial entry point
					pX = ev.pageX; pY = ev.pageY;
					// update "current" X and Y position based on mousemove
					$(ob).bind("mousemove",track);
					// start polling interval (self-calling timeout) to compare mouse coordinates over time
					if (ob.hoverIntent_s != 1) { ob.hoverIntent_t = setTimeout( function(){compare(ev,ob);} , cfg.interval );}

				// else e.type == "mouseleave"
				} else {
					// unbind expensive mousemove event
					$(ob).unbind("mousemove",track);
					// if hoverIntent state is true, then call the mouseOut function after the specified delay
					if (ob.hoverIntent_s == 1) { ob.hoverIntent_t = setTimeout( function(){delay(ev,ob);} , cfg.timeout );}
				}
			};

			// bind the function to the two event listeners
			return this.bind('mouseenter',handleHover).bind('mouseleave',handleHover);
		};
	})(jQuery);
	
	 
	
	
	
	
	
	
	
	
	
	/*
	 * jQuery Hotkeys Plugin
	 * Copyright 2010, John Resig
	 * Dual licensed under the MIT or GPL Version 2 licenses.
	 *
	 * Based upon the plugin by Tzury Bar Yochay:
	 * http://github.com/tzuryby/hotkeys
	 *
	 * Original idea by:
	 * Binny V A, http://www.openjs.com/scripts/events/keyboard_shortcuts/
	*/

	(function(jQuery){
		
		jQuery.hotkeys = {
			version: "0.8",

			specialKeys: {
				8: "backspace", 9: "tab", 13: "return", 16: "shift", 17: "ctrl", 18: "alt", 19: "pause",
				20: "capslock", 27: "esc", 32: "space", 33: "pageup", 34: "pagedown", 35: "end", 36: "home",
				37: "left", 38: "up", 39: "right", 40: "down", 45: "insert", 46: "del", 
				96: "0", 97: "1", 98: "2", 99: "3", 100: "4", 101: "5", 102: "6", 103: "7",
				104: "8", 105: "9", 106: "*", 107: "+", 109: "-", 110: ".", 111 : "/", 
				112: "f1", 113: "f2", 114: "f3", 115: "f4", 116: "f5", 117: "f6", 118: "f7", 119: "f8", 
				120: "f9", 121: "f10", 122: "f11", 123: "f12", 144: "numlock", 145: "scroll", 191: "/", 224: "meta"
			},
		
			shiftNums: {
				"`": "~", "1": "!", "2": "@", "3": "#", "4": "$", "5": "%", "6": "^", "7": "&", 
				"8": "*", "9": "(", "0": ")", "-": "_", "=": "+", ";": ": ", "'": "\"", ",": "<", 
				".": ">",  "/": "?",  "\\": "|"
			}
		};

		function keyHandler( handleObj ) {
			// Only care when a possible input has been specified
			if ( typeof handleObj.data !== "string" ) {
				return;
			}
			
			var origHandler = handleObj.handler,
				keys = handleObj.data.toLowerCase().split(" ");
		
			handleObj.handler = function( event ) {
				// Don't fire in text-accepting inputs that we didn't directly bind to
				if ( this !== event.target && (/textarea|select/i.test( event.target.nodeName ) ||
					 event.target.type === "text") ) {
					return;
				}
				
				// Keypress represents characters, not special keys
				var special = event.type !== "keypress" && jQuery.hotkeys.specialKeys[ event.which ],
					character = String.fromCharCode( event.which ).toLowerCase(),
					key, modif = "", possible = {};

				// check combinations (alt|ctrl|shift+anything)
				if ( event.altKey && special !== "alt" ) {
					modif += "alt+";
				}

				if ( event.ctrlKey && special !== "ctrl" ) {
					modif += "ctrl+";
				}
				
				// TODO: Need to make sure this works consistently across platforms
				if ( event.metaKey && !event.ctrlKey && special !== "meta" ) {
					modif += "meta+";
				}

				if ( event.shiftKey && special !== "shift" ) {
					modif += "shift+";
				}

				if ( special ) {
					possible[ modif + special ] = true;

				} else {
					possible[ modif + character ] = true;
					possible[ modif + jQuery.hotkeys.shiftNums[ character ] ] = true;

					// "$" can be triggered as "Shift+4" or "Shift+$" or just "$"
					if ( modif === "shift+" ) {
						possible[ jQuery.hotkeys.shiftNums[ character ] ] = true;
					}
				}

				for ( var i = 0, l = keys.length; i < l; i++ ) {
					if ( possible[ keys[i] ] ) {
						return origHandler.apply( this, arguments );
					}
				}
			};
		}

		jQuery.each([ "keydown", "keyup", "keypress" ], function() {
			jQuery.event.special[ this ] = { add: keyHandler };
		});

	})( jQuery );
 
	