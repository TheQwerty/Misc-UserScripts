// ==UserScript==
// @name           XYplorer Feature Anchors
// @description    Show anchors in XYplorer's feature list.
// @version        0.2
// @author         TheQwerty
// @namespace      https://github.com/TheQwerty/Misc-UserScripts/raw/master/
// @homepage       https://github.com/TheQwerty/Misc-UserScripts
// @grant          none
//
// @match        *://*.xyplorer.com/features.php
// @match        *://*.xyplorer.com/product.php
// ==/UserScript==

(function(){
    var featureTDs = document.getElementsByClassName('f');
    for (var idx=0, last=featureTDs.length; idx < last; idx++) {
        var td = featureTDs[idx];
        if (td && td.id) {
            var a = document.createElement('a');
            a.textContent = '#';
            a.href = '#' + encodeURIComponent(td.id);
            a.style.fontSize = '.75em';
            a.style.color = '#AAA';
            a.style.paddingRight = '4';
            td.insertBefore(a, td.firstChild);
        }
    }
})();
