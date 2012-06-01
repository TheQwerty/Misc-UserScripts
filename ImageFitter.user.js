// ==UserScript==
// @name           Image Fitter
// @description    Attempts to replicate Firefox's image-in-frame scaling.
// @version        0.6
// @author         TheQwerty
// @namespace      https://github.com/TheQwerty/Misc-UserScripts/raw/master/
//
//
// @include        /^https?://.*\.(jpe?g|png|bmp|gif)$/
// ==/UserScript==

(function() {
	// Check if within a frame.
	if (window && window.top !== window.self) {
		// Ignore frames that contain more than one child element.
		if (window.document && window.document.body && window.document.body.childElementCount === 1) {
			// Ignore frames that contain a single element that isn't an image.
			var soleChild = window.document.body.children[0];
			if (soleChild && soleChild.tagName === 'IMG') {

				// Add styles to attempt to better fit image to client's view.
				//	.fitWidth { max-width:100% !important; }
				//	.fitHeight { max-height:100% !important; }
				// TODO: Add way to toggle fitWidth and fitHeight separately.
				// TODO: Determine which type of fitting is preferred for an image (when vscroll is acceptable, or hscroll preferred).

				var style = document.createElement('style');
				style.setAttribute('type', 'text\/css');
				style.appendChild(document.createTextNode('.fitted { max-width:100% !important; max-height:100% !important; }'));
				document.getElementsByTagName('head')[0].appendChild(style);

				soleChild.classList.add('fitted');
				
				// Add onclick to toggle fitting.
				soleChild.onclick = function() {
					if (this.classList.contains('fitted')) {
						this.classList.remove('fitted');
					} else {
						this.classList.add('fitted');
					}
				};
			}
		}
	}
})();