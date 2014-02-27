// Avoid `console` errors in browsers that lack a console.
( function() {
		var method;
		var noop = function() {
		};
		var methods = ['assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error', 'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log', 'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd', 'timeStamp', 'trace', 'warn'];
		var length = methods.length;
		var console = (window.console = window.console || {});

		while (length--) {
			method = methods[length];

			// Only stub undefined methods.
			if (!console[method]) {
				console[method] = noop;
			}
		}
	}());

//copied from deprecated.js, used for pywps
/*
OpenLayers.parseXMLString = function(text) {

	//MS sucks, if the server is bad it dies
	var index = text.indexOf('<');
	if (index > 0) {
		text = text.substring(index);
	}

	var ajaxResponse = OpenLayers.Util.Try(function() {
		var xmldom = new ActiveXObject('Microsoft.XMLDOM');
		xmldom.loadXML(text);
		return xmldom;
	}, function() {
		return new DOMParser().parseFromString(text, 'text/xml');
	}, function() {
		var req = new XMLHttpRequest();
		req.open("GET", "data:" + "text/xml" + ";charset=utf-8," + encodeURIComponent(text), false);
		if (req.overrideMimeType) {
			req.overrideMimeType("text/xml");
		}
		req.send(null);
		return req.responseXML;
	});

	return ajaxResponse;
};*/
