// ==UserScript==
// @name           GoComics - Next/Previous Vimium Helper.
// @description    Adds rel links so that Vimium can trigger next/previous comics.
// @version        1.0.0
// @author         TheQwerty
// @namespace      https://github.com/TheQwerty/Misc-UserScripts/raw/master/
// @homepage       https://github.com/TheQwerty/Misc-UserScripts
// @grant          none
//
// @match        *://*.gocomics.com/*
// ==/UserScript==

(function() {
    'use strict';
    var addRel = function(q,r) {
        var el = document.querySelector('div.item-comic-container a.fa-caret-' + q + ':not(.disabled):not([style*="display:none"])');
        if (el !== null) {
            el.rel = r;
            console.info("Added rel='%s'", r);
        }
    };

    console.groupCollapsed("GoComics NextPrev Vimium Helper running...");
    addRel('right', 'next');
    addRel('left', 'prev');
    console.info('All done!');
    console.groupEnd();
})();
