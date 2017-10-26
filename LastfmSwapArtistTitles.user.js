// ==UserScript==
// @name           Last.fm - Swap Artists and Titles
// @description    Swaps the artists and titles within the charts.
// @version        1.0.0
// @author         TheQwerty
// @namespace      https://github.com/TheQwerty/Misc-UserScripts/raw/master/
// @homepage       https://github.com/TheQwerty/Misc-UserScripts
// @grant          GM_registerMenuCommand
//
// @match        *://*.last.fm/*
// ==/UserScript==

(function() {
    if(GM_registerMenuCommand){
        GM_registerMenuCommand('Swap Artists and Titles', function(){
            var tracks = document.querySelectorAll('td.chartlist-name span.chartlist-ellipsis-wrap');
            for (var i = 0; i < tracks.length; i++) {
                tracks[i].appendChild(tracks[i].replaceChild(tracks[i].lastElementChild, tracks[i].firstElementChild));
            }
        });
    }
})();
