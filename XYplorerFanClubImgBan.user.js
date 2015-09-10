// ==UserScript==
// @name           Ban Images
// @description    Replace annoying images.
// @version        1.0.0
// @author         TheQwerty
// @namespace      https://github.com/TheQwerty/Misc-UserScripts/raw/master/
// @homepage       https://github.com/TheQwerty/Misc-UserScripts
// @grant          none
//
// @match        *://*.xyplorer.com/xyfc/*
// ==/UserScript==

(function() {
	// Replace images.
	function ReplaceImages() {
        var imgSrcs = [ "http://i.imgur.com/vK31xId.gif" ];
        
        for (var i = 0; i < imgSrcs.length; i++) {
            var badImg = imgSrcs[i];
            var xpr = document.evaluate('//img[@src="' + badImg + '"]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
            for (var j = 0; j < xpr.snapshotLength; j++) {
                var img = xpr.snapshotItem(j);
                img.src = 'http://placekitten.com/' + img.width + '/' + img.height;
                // img.style.display = "none";
             }
        }
	}

	ReplaceImages();
})();
