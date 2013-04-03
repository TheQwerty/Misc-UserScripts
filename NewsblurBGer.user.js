// ==UserScript==
// @name           Newsblur: v opens story in background
// @description    Adds v keybinding to open the active story in a background tab.
// @version        0.1.0
// @author         TheQwerty
// @namespace      https://github.com/TheQwerty/Misc-UserScripts/raw/master/
// @homepage       https://github.com/TheQwerty/Misc-UserScripts
//
//
// @require    https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @match      http*://*.newsblur.com/*
// ==/UserScript==

$(document).ready(function() {
	//bind 'v' to open story in a new background tab/window
	$(document).bind('keypress', 'v', function(e) {
		e.preventDefault();
		var story_id = unsafeWindow.NEWSBLUR.reader.active_story;
		if (!story_id) return;

		var story = unsafeWindow.NEWSBLUR.reader.model.get_story(story_id);
		if (!story) return;

		// NEWSBLUR.reader.model.story.story_view.open_story_in_new_tab() {
			story.mark_read({skip_delay:!0});
		// } NEWSBLUR.reader.model.story.story_view.open_story_in_new_tab()

		GM_openInTab(story.get("story_permalink"), {active:false, insert:false});
	});
});