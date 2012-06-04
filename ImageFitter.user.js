// ==UserScript==
// @name           Image Fitter
// @description    Attempts to replicate Firefox's image-in-frame scaling.
// @version        0.8.1
// @author         TheQwerty
// @namespace      https://github.com/TheQwerty/Misc-UserScripts/raw/master/
// @homepage       https://github.com/TheQwerty/Misc-UserScripts
// @icon           https://github.com/TheQwerty/Misc-UserScripts/raw/master/ImageFitter.png
// @courtesyOf     http://www.fatcow.com/free-icons
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
					'.width { max-width:95% }',
					'.height { max-height:95% }',
					'#fitbar { margin:5px; font-size:12px; }',
					'#fitbar .btn { margin:2px; padding:2px 5px; background:#866; color:#fff; cursor:pointer; -webkit-border-radius:4px; -moz-border-radius:4px; border-radius:4px; }',
					'#fitbar .btn:hover, #fitbar .btn:focus { background:#668; }',
					'#fitbar .btn.active { background:#686; }'
				];
				style = document.createElement('style');
				style.type = 'text/css';
				style.innerHTML = styles.join('\r\n');
				head.appendChild(style);

				// Creates a toolbar button with appropriate click action.
				var createButton = function(p, dim) {
					var btn = document.createElement('span');
					btn.classList.add('btn');
					btn.textContent = 'Fit to ' + dim;
					btn.addEventListener('click', function(evt) {
						// Toggle fitting dimension.
						var fitting = soleChild.classList.toggle(dim.toLowerCase());

						// Update button state and title.
						if (fitting) {
							this.title = 'Fitting by ' + dim + '.';
							if (!this.classList.contains('active')) {
								this.classList.add('active');
							}
						} else {
							this.title = 'Full ' + dim + '.';
							if (this.classList.contains('active')) {
								this.classList.remove('active');
							}
						}
					});

					// Append to parent.
					p.appendChild(btn);
					return btn;
				};

				// Creates and adds the fitting toolbar.
				var fitbar = document.createElement('div');
				fitbar.id = 'fitbar';
				var fitHeightBtn = createButton(fitbar, 'Height');
				var fitWidthBtn = createButton(fitbar, 'Width');
				var body = document.getElementsByTagName('body')[0];
				body.insertBefore(fitbar, body.firstChild);


				// TODO: Determine optimal fitting for default.
				// Maybe determine image aspect ratio and then decide which fitting to apply.
				// Default state
				fitWidthBtn.click();

				// On click cycle: Fit Both > None > Fit Width > Fit Height
				soleChild.addEventListener('click', function(evt) {
					if (this.classList.contains('width')) {
						fitHeightBtn.click();
					}
					fitWidthBtn.click();
				});
			}
		}
	}
})();