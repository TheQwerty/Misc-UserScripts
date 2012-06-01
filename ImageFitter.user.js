// ==UserScript==
// @name           Image Fitter
// @description    Attempts to replicate Firefox's image-in-frame scaling.
// @version        0.7.0
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
				// Add styles to head (failing back to body)
				var head, style;
				head = document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0];
				if (!head) { return; }
				var styles = [
					'img { cursor: -webkit-zoom-in !important; cursor: -moz-zoom-in !important; }',
					'.width, .height { cursor: -webkit-zoom-out !important; cursor : -moz-zoom-out !important; }',
					'.width { max-width:100% !important; }',
					'.height { max-height:100% !important; }'
				];
				style = document.createElement('style');
				style.type = 'text/css';
				style.innerHTML = styles.join('\r\n');
				head.appendChild(style);
				
				// TODO: Determine optimal fitting instead of defaulting to width.
				// Maybe determine image aspect ratio and then decide which fitting to apply.
				soleChild.classList.add('width');
				
				// On click cycle: Fit Width > Full Size > Fit Both > Fit Height
				soleChild.addEventListener('click', function(evt) {
					//TODO: Detect modifier and prompt user to select.
					var fitW = this.classList.contains('width');
					var fitH = this.classList.contains('height');

					if (fitW && fitH) {
						// Fit Both > Fit Height
						this.classList.remove('width');
					} else if (fitW) {
						// Fit Width > Full Size
						this.classList.remove('width');
					} else if (fitH) {
						// Fit Height > Fit Width
						this.classList.add('width');
						this.classList.remove('height');
					} else {
						// Full Size > Fit Both
						this.classList.add('width');
						this.classList.add('height');
					}
				});
			}
		}
	}
})();