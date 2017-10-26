// ==UserScript==
// @name           Arstechnica - Fix next/previous rel links.
// @description    Sets the rel links to point to the next/previous page instead of article.
// @version        1.0.0
// @author         TheQwerty
// @namespace      https://github.com/TheQwerty/Misc-UserScripts/raw/master/
// @homepage       https://github.com/TheQwerty/Misc-UserScripts
// @grant          none
//
// @match        *://*.arstechnica.com/*
// ==/UserScript==

(function() {
    'use strict';

    AddRel('next');
    AddRel('prev');

    function AddRel(s) {
        var l = document.querySelector('nav.page-numbers span.numbers a span.' + s);
        if (l && l.parentNode) { l.parentNode.rel = s; }
    }
})();
