// ==UserScript==
// @name           Image Fitter
// @description    Provides ability to fit framed-images to the window's size.
// @version        0.8.5
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

				// Determine if fitting is even needed.
				var aH = document.body.clientHeight;
				var aW = document.body.clientWidth;
				
				if (soleChild.width <= aW && soleChild.height <= aH)
					return;

				// Add styles to head (failing back to body)
				var head, style;
				head = document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0];
				if (!head) { return; }
				var styles = [
					// Fitting: 95% to account for fitbar.
					'.width { max-width:95% }',
					'.height { max-height:95% }',
					// Toolbar
					'#fitbar { margin:5px; font-size:12px; }',
					'#fitbar .btn { margin:2px; padding:2px 5px; background:#866; color:#fff; cursor:pointer; -webkit-border-radius:4px; -moz-border-radius:4px; border-radius:4px; }',
					'#fitbar .btn:hover, #fitbar .btn:focus { background:#668; }',
					'#fitbar .btn.active { background:#686; }',
					'#fitbar #fitMsgs { margin:0px; float:right; text-align:right; }'
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
						// Toggle fitting dimension then update button.
						if (soleChild.classList.toggle(dim.toLowerCase())) {
							this.title = 'Fitting by ' + dim + '.';
							this.classList.add('active');
						} else {
							this.title = 'Full ' + dim + '.';
							this.classList.remove('active');
						}
						
						// Calculate ratio and display new dimension data.
						var r = Math.max(soleChild.height, soleChild.width) / Math.min(soleChild.height, soleChild.width);
						cmsg.textContent = 'Current [View: ' + document.body.clientWidth + 'x' + document.body.clientHeight + '  Image: ' + soleChild.width + 'x' + soleChild.height + ' (' + r.toFixed(2) + ')]';                        
					});

					// Append to parent.
					p.appendChild(btn);
					return btn;
				};

				// Creates the fitting toolbar.
				var fitbar = document.createElement('div');
				fitbar.id = 'fitbar';
				var fitHeightBtn = createButton(fitbar, 'Height');
				var fitWidthBtn = createButton(fitbar, 'Width');
				
				// Add dimension messages to toolbar.
				var msgSpan = document.createElement('span');
				msgSpan.id = 'fitMsgs';
				var msg = document.createElement('div');
				msgSpan.appendChild(msg);
				var cmsg = document.createElement('div');
				msgSpan.appendChild(cmsg);
				fitbar.appendChild(msgSpan);
				
				// Insert toolbar.
				var body = document.getElementsByTagName('body')[0];
				body.insertBefore(fitbar, body.firstChild);


				// Adjust visible space to account for toolbar's computed height.
				var fbCS = document.defaultView.getComputedStyle(fitbar, null);
				var missingHeight = ['margin-top', 'margin-bottom', 'border-top-width', 'border-bottom-width'];
				for (i in missingHeight) {
					aH -= parseInt(fbCS.getPropertyValue(missingHeight[i]));
				}
				
				// Calculate ratio and display original dimension data.
				var r = Math.max(soleChild.height, soleChild.width) / Math.min(soleChild.height, soleChild.width);
				msg.textContent = 'Original [View: ' + aW + 'x' + aH + '  Image: ' + soleChild.width + 'x' + soleChild.height + ' (' + r.toFixed(2) + ')]';

				// Take a stab at guessing the optimal default fitting.
				var maxFactor = 3;
				if (soleChild.height >= aH && soleChild.height < maxFactor*aH)
					fitHeightBtn.click();
				
				if (soleChild.width >= aW && soleChild.width < maxFactor*aW)
					fitWidthBtn.click();

				// Add cycling on image click: Fit Both > None > Fit Width > Fit Height
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