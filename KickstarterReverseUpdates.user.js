// ==UserScript==
// @name           Kickstarter Reverse Updates
// @description    Reverse the order of updates on Kickstarter projects, when called.
// @version        0.1.0
// @author         TheQwerty
// @namespace      https://github.com/TheQwerty/Misc-UserScripts/raw/master/
// @homepage       https://github.com/TheQwerty/Misc-UserScripts
//
//
// @include        http://www.kickstarter.com/projects/*/*/posts
// ==/UserScript==

(function() {
	var $;
	var jQuery;

	//Add jQuery (if needed) and then execute callback.
	function addJQuery(callback) {
		if (typeof unsafeWindow.jQuery == 'undefined') {
			//Add jQuery script node with callback on load.
			var script = document.createElement("script");
			script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.min.js");
			script.addEventListener('load', function() {
				var script = document.createElement("script");
				script.textContent = "(" + callback.toString() + ")();";
				document.body.appendChild(script);
			}, false);
			document.body.appendChild(script);
		} else {
			//jQuery was already loaded so let's hijack it from unsafeWindow.
			$ = unsafeWindow.jQuery.noConflict(true);
			jQuery = $;
			callback();
		}
	}

	//Main execution function.
	function main() {
        $('#main').append($('.post').get().reverse());
	}


	GM_registerMenuCommand("Reverse Kickstarter Updates", function () {
		addJQuery(main);
	});
})();