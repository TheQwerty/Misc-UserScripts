// ==UserScript==
// @name       Fit Images to Width
// @namespace  http://userscripts.org/users/TheQwerty
// @version    0.1
// @description  Adds "width=100%" style for any image that is the sole child of the body.
// @include    /^https?://.*\.(jpe?g|png|bmp|gif)$/
// ==/UserScript==

if (window && window.top !== window.self) {
    if (window.document && window.document.body && window.document.body.childElementCount === 1) {
        var soleChild = window.document.body.children[0];
        if (soleChild && soleChild.tagName === "IMG") {
            GM_addStyle(".fitted { max-width:100% !important; max-height:100% !important; }");
            soleChild.classList.add("fitted");
            soleChild.onclick = function() {
               if (this.classList.contains("fitted")) {
                    this.classList.remove("fitted");
                } else {
                    this.classList.add("fitted");
                }
            };
        }
    }
}