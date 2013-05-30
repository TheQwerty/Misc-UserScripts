// ==UserScript==
// @name           Newsblur: v opens story in background
// @description    Adds v keybinding to open the active story in a background tab.
// @version        0.1.5
// @author         TheQwerty
// @namespace      https://github.com/TheQwerty/Misc-UserScripts/raw/master/
// @homepage       https://github.com/TheQwerty/Misc-UserScripts
//
//
// @require    https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @match      http*://*.newsblur.com/*
// @match      http*://newsblur.com/*
// ==/UserScript==

function exec(fn) {
    var script = document.createElement('script');
    script.setAttribute('type', 'application/javascript');
    script.textContent = '(' + fn + ')();';
    document.body.appendChild(script);
    document.body.removeChild(script);
}

window.addEventListener("load", function() {
    // Maybe I'm in over my head but I cannot access NEWSBLUR with unsafeWindow
    // or add a custom function that is accessible by the rest of the script.
    // Thus, this function is added to the current page each time 'v' is pressed.
    // It sets the 'content' attribute of a 'meta' element in the head
    // (creating if needed) to the current story's permalink.
    // Then the rest of our v binding can use this element to retrieve the url.
    function updateStoryPermalink() {
        exec(function() {
            // Reuse the existing element if possible.
            var storyPerm = document.getElementById('TMNBV_permalink');
            if (!storyPerm) {
                storyPerm = document.createElement('meta');
                storyPerm.id = 'TMNBV_permalink';
                document.head.appendChild(storyPerm);
            }
            
            storyPerm.content = '#';
            
            var story_id = NEWSBLUR.reader.active_story;
            if (story_id) {
                var story = NEWSBLUR.reader.model.get_story(story_id);
                if (story) {
                    // NEWSBLUR.reader.model.story.story_view.open_story_in_new_tab() {
                    story.mark_read({skip_delay:!0});
                    // } NEWSBLUR.reader.model.story.story_view.open_story_in_new_tab()
                    storyPerm.content = story.get('story_permalink');
                }
            }
        });
    }
    
    $(document).ready(function() {
        //bind 'v' to open story in a new background tab/window
        $(document).bind('keypress', 'v', function(e) {
            e.preventDefault();
            
            updateStoryPermalink();
            var storyPerm = document.getElementById('TMNBV_permalink');
            if (storyPerm && storyPerm.content != '#') {
                GM_openInTab(storyPerm.content, {active:false, insert:false});
                storyPerm.content = '#';
            }
        });
        console.log("NewsblurV: v is bound to open story in new background tab.");
    });
}, false);
