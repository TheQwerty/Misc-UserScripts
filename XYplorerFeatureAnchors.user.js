// ==UserScript==
// @name           XYplorer Feature Anchors
// @description    Show anchors in XYplorer's feature list.
// @version        0.1.0
// @author         TheQwerty
// @namespace      https://github.com/TheQwerty/Misc-UserScripts/raw/master/
// @homepage       https://github.com/TheQwerty/Misc-UserScripts
// @grant          none
//
// @match        *://*.xyplorer.com/features.php
// ==/UserScript==

(function(){
    var featureTDs = document.getElementsByClassName('f');
    for (var idx in featureTDs) {
        var td = featureTDs[idx];
        if (td && td.getElementsByTagName) {
            var as = td.getElementsByTagName('a');
            if (as) {
                var a = as[0];
                a.textContent = '#';
                a.href = '#' + encodeURIComponent(a.name);
                a.style.fontSize = '.75em';
                a.style.color = '#AAA';
                a.style.paddingRight = '4';
            }
        }
    }
})();
