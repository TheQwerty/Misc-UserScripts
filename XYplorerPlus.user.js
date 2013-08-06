// ==UserScript==
// @name           XYplorer Plus
// @description    Changes the XYplorer Forum's icon to show state of unread messages and some quick links.
// @version        0.9.9
// @author         TheQwerty
// @namespace      https://github.com/TheQwerty/Misc-UserScripts/raw/master/
// @homepage       https://github.com/TheQwerty/Misc-UserScripts
//
// @include        /^https?://(?:www\.)?xyplorer\.com/xyfc/.*$/
// ==/UserScript==

(function() {
	// Search for the unread images.
	function hasUnread() {
		var bodyHTML = document.body.innerHTML;
		return	(	bodyHTML.indexOf('/topic_unread_') >= 0 ||					/*topic_read.gif*/
							bodyHTML.indexOf('/icon_topic_newest') >= 0 ||			/*icon_topic_latest.gif*/
							bodyHTML.indexOf('/icon_post_target_unread') >= 0		/*icon_post_target.gif*/
						);
	}

	// Toggle the favicon between a color and grayscale version.
	function toggleIcon(grayedOut) {
		var head = top.document.getElementsByTagName("head");
		if (head) {
			var icon = document.createElement('link');
			icon.type = 'image/x-icon';
			icon.rel = 'shortcut icon';

			if (grayedOut) {
				// Grayscale.
				icon.href = 'data:image/x-icon;base64,AAABAAQAICAAAAEACACoCAAARgAAABAQAAABAAgAaAUAAO4IAAAgIAAAAQAgAKgQAABWDgAAEBAAAAEAIABoBAAA/h4AACgAAAAgAAAAQAAAAAEACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQIBAAYEAwAAAgQABQUFAAkCAQAMBgMAAAYJAAkJCQAODAoADQ0OAAALEgAGDBEAAg4XAAAPGQAAEh4AEhISABQTEwAWFhYAGRkZAB4eHgAADiAAABQiAA0YIAAUHCIACSM0ACEhIQAkJCQAKSkpAC4uLgA2Mi8AMjIyADY2NgA5OTkAPT09AAAtSwAIMU0AADFRAAA4XQAAQGwAG0xsAABEcAAPSnIAAEx/AEFBQQBFRUUASEZFAElJSQBNTU0AUVFRAFVVVQBaWloAXV1dAGFiYgBlZWUAaWlpAG5ubgBxcXEAdXV1AHl5eQB9fX0AAE+FAABVjQAQVYMAGlyIAABYkwAOXZEACF2WAABdmwAAX58AGmOUAAZjoQARaqQAGWuhAAByvgAJeMIAAHvNABJ+xgAcf8MAAYHXAAeC1AAKg9UAAIbcABWV3gAAieMAAIrkAAiW8QAAl/gAAJf/AACZ/gAEmP8AAJ3/AAua+gAAof8ABaH/AASk/wAMo/8ACKT/AGbH/wB/zP8AgYGBAIWFhQCHiIgAiIiIAI2NjQCRkZEAlZWVAJmZmQCenp4AoaGhAKWlpQCoqKgAra2tAKyusACxsbIAtra2ALm5uQC9vb0AuOb/AMHBwQDGxsYAycnJAM/MywDPz88A0tLSANTU1ADZ2dkA3d3dAN/g4ADj4+MA6enpAPHx8QD09PQA+fn5AP7+/gDwwwAA/9IRAP/YMQD/3VEA/+RxAP/qkQD/8LEA//bRAP///wAAAAAALxQAAFAiAABwMAAAkD4AALBNAADPWwAA8GkAAP95EQD/ijEA/51RAP+vcQD/wZEA/9KxAP/l0QD///8AAAAAAC8DAABQBAAAcAYAAJAJAACwCgAAzwwAAPAOAAD/IBIA/z4xAP9cUQD/enEA/5eRAP+2sQD/1NEA////AAAAAAAvAA4AUAAXAHAAIQCQACsAsAA2AM8AQADwAEkA/xFaAP8xcAD/UYYA/3GcAP+RsgD/scgA/9HfAP///wAAAAAALwAgAFAANgBwAEwAkABiALAAeADPAI4A8ACkAP8RswD/Mb4A/1HHAP9x0QD/kdwA/7HlAP/R8AD///8AAAAAACwALwBLAFAAaQBwAIcAkAClALAAxADPAOEA8ADwEf8A8jH/APRR/wD2cf8A95H/APmx/wD70f8A////AAAAAAAbAC8ALQBQAD8AcABSAJAAYwCwAHYAzwCIAPAAmRH/AKYx/wC0Uf8AwnH/AM+R/wDcsf8A69H/AP///wAAAAAACAAvAA4AUAAVAHAAGwCQACEAsAAmAM8ALADwAD4R/wBYMf8AcVH/AIxx/wCmkf8Av7H/ANrR/wD///8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA8PAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADAaCAAAAAAAAAAACBswAAAAAAAAAAAAAAAAAAAALAgAAAAAAAAAAAAAAAAAAAAACCwAAAAAAAAAAAAAHQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAfAAAAAAAAMAAAAAAAAAAAAAAAADhkAAAAAAAAAAAAAAAAMAAAADAAAAAAAAAAAAAAAAAhhIUwAAAAAAAAAAAAAAAALwAAAAAAABQAAAAAAAAACnyPj34aAAAAAAAAAA8DAAAAADMBAAAhfzsEAAAAAABoj4+Pj2sAAAAAAAAnUiMAAAAyLAQACHiPj2wQAAAAMoaPj4+EMAAAAAAHQVtdTAsAACEsBAE8j4+Pj28IABqBj4+PjzkAAAAAA0RbW1lbPgMAISwDCniPj4+Pj2kKb4+Pj49wAgAAAAA9W1lZW19RDQAhLAQDE2qPj4+PhXeFj4+PfRIAAAAAKVtbWVthSBcBACEsBAAAADmGj4+Pj4+Pj4MgAAAAACVXW1lZXj8CAAAAIS8IAAAAADyPj4+Pj4+POQAAAAAWVVtYW15CAQAAAAAhMREKBAIAAGiPj4+Pj20DAAAAB0pbWVlbRwIAAAAAACEzGxMRCgQDaY+Pj4+PbQMAAABBXVlZWVtFAwAAAAAAITYfHBoTCWWPj4+Pj4+GOAAAJltbWVlZWVs+AAAAAAAhOS0hHRtlho+Pj4+Pj4+CHhVVW1lZW1tYW1krAwAAACE7My8ycI+Pj4+PeYaPj496TltZWVtNXFtZW1lFFgMAIWY3N3+Pj4+Pj3AcdI+Pj492WlhdSwpAYVlZW1tPDgAhaTw5dI+Pj494LRwwgo+Pj49jWVYZAAhJYVlZX0MBACFsamdkgI+PeTQvLyA8ho+Pj4ZiKgUEAAhGYF9QDAAAIXRvbGlvg3U6NzY0MS9wj4+Pj3ESERAIAgYoUyQAAAA2AHBybmxuaGVkOzg3MzWAj4+CLhsbFBMQCQYYBAAAAwAAeHR1cm9tbGpoZDs6NmaFj2QiIiAdHBoTEQkICAQ4AAAAfHR4d3Nxbm1raWdkOXJ0MzIxLywhHx0bGhMaZgAAAAAAAHl1eHd1c3BtbGpoZDw5ODUzMjAtLCAdZAAAAAAAAAAAAAB9d3V1dXRyb21raGdkOzk3NDI2bgAAAAAAAAAAAAAAAAAAAH55dXJycG5sa2hnaG13AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP///////n///4AB//wAAD/wAAAPwAAAA4AAAAGAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAAAGAAAABwAAAA/AAAA/8AAA//4AB////////////KAAAABAAAAAgAAAAAQAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQoABAcKAAAFDgAACA0ACAgIAAgKDAAPDw8AEhAOABQQDQAADhgAAhAZABAQEAAWEhAAEBQXABUVFQAZGRkAHx4dAAAYKAAMHywAJSUlACkpKQAvLy8AMjIyADY2NgA5OTkAPDw8AAArSAACOV4ABTteAAk+YgAAR3YAAEt9AAZPfwAKTnoAQEBAAEdHRwBMR0MASEhIAFJSUgBWVlYAWVlZAF1dXQBiYmIAZmZmAGpqagBycnIAdXV1AHl5eQABXp8AD2afAABkqAAAa7EAEHO0AEeDrAAAg9kAB4neAACb+wAAmf0ABZn8AAGd/gAAof8AAaX/AHLL/wCDg4MAh4eHAJGRkQCXl5cAmZmZAKGhoQCkpKQAqqelAK2trQCxsbEAtbW1ALq6ugDDw8MAycnJAM7OzgDV1dUA2traAN3d3QDk5OQA7OztAPLw7wD09PQA+vr6APj//wD+/v4APf8xAFv/UQB5/3EAmP+RALX/sQDU/9EA////AAAAAAAULwAAIlAAADBwAAA9kAAATLAAAFnPAABn8AAAeP8RAIr/MQCc/1EArv9xAMD/kQDS/7EA5P/RAP///wAAAAAAJi8AAEBQAABacAAAdJAAAI6wAACpzwAAwvAAANH/EQDY/zEA3v9RAOP/cQDp/5EA7/+xAPb/0QD///8AAAAAAC8mAABQQQAAcFsAAJB0AACwjgAAz6kAAPDDAAD/0hEA/9gxAP/dUQD/5HEA/+qRAP/wsQD/9tEA////AAAAAAAvFAAAUCIAAHAwAACQPgAAsE0AAM9bAADwaQAA/3kRAP+KMQD/nVEA/69xAP/BkQD/0rEA/+XRAP///wAAAAAALwMAAFAEAABwBgAAkAkAALAKAADPDAAA8A4AAP8gEgD/PjEA/1xRAP96cQD/l5EA/7axAP/U0QD///8AAAAAAC8ADgBQABcAcAAhAJAAKwCwADYAzwBAAPAASQD/EVoA/zFwAP9RhgD/cZwA/5GyAP+xyAD/0d8A////AAAAAAAvACAAUAA2AHAATACQAGIAsAB4AM8AjgDwAKQA/xGzAP8xvgD/UccA/3HRAP+R3AD/seUA/9HwAP///wAAAAAALAAvAEsAUABpAHAAhwCQAKUAsADEAM8A4QDwAPAR/wDyMf8A9FH/APZx/wD3kf8A+bH/APvR/wD///8AAAAAABsALwAtAFAAPwBwAFIAkABjALAAdgDPAIgA8ACZEf8ApjH/ALRR/wDCcf8Az5H/ANyx/wDr0f8A////AAAAAAAIAC8ADgBQABUAcAAbAJAAIQCwACYAzwAsAPAAPhH/AFgx/wBxUf8AjHH/AKaR/wC/sf8A2tH/AP///wAAAAAAADApJiYpMAAAAAAAAAAAFQAAAAAAAAAAFQAAAAAWAAAAAAAnKQAAAAAAFgApABQMAAAPUlMUAAABEgApFA9PSgwARF9VGAAENDcKFBQoX19GKV9fLQAAMz4+HRQVBS5YX1ZfSAAAID48IgIUGAIAMF9fURAAGzk9IQAAFCYQADBfX1ENAzc9PCAAABQrGkFWX1ZfRzE9Ozw5HwEUMENfX0svWF8/Oh4yPj4cFERCU1AqGUlfVzYABjU4CxRORkhCLywsU1QlEAgOEwAsAE5KSEVCMEZEJCMXEQkoAAAAAE5LSUZCQC8rKEAAAAAAAAAAAABQTkxNAAAAAAAA+B8AAOAHAACAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIABAADgBwAA/D8AACgAAAAgAAAAQAAAAAEAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWAAAAMgAAAFIAAABrAAAAfAAAAIEAAACBAAAAfAAAAGsAAABSAAAAMgAAABYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAADMAAAB2AAAAsQAAAN0AAAD4AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD4AAAA3QAAALEAAAB2AAAAMwAAAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAAAGcAAAC+AAAA9gAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD2AAAAvgAAAGcAAAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAFsAAADQAAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8BAQH/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAANAAAABbAAAABQAAAAAAAAAAAAAAAAAAABsAAACxAAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/bm5u/39/f/8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAACxAAAAGwAAAAAAAAAJAAAAtAAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/zo6Ov/09PT/+Pj4/0xMTP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAC0AAAACQAAAFkBAQH/AAAA/wAAAP8AAAD/Hx8f/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8PDw//z8/P////////////2dnZ/yAgIP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/ABIe/wACA/8AAAD/AAAA/wAAAP8AAABZBQUFqAMDA/8AAAD/AAAA/zk5Of/c3Nz/eHh4/wUFBf8AAAD/AAAA/wAAAP8AAAD/AAAA/4+Pj///////////////////////l5eX/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wBAbP8Ahtz/AC1L/wAAAP8AAAD/AAAA/wAAAKgKCgrGBAQE/wAAAP8JCQn/w8PD////////////n5+f/w8PD/8AAAD/AAAA/wAAAP9VVVX/+/v7//////////////////T09P9LS0v/AAAA/wAAAP8AAAD/AAAA/wAFCP8AWJP/AJz//wCh//8Ae83/AAsS/wAAAP8AAAD/AAAAxgoKCsUEBAT/AQEB/35+fv//////////////////////qKio/wkJCf8AAAD/ICAg/+Pj4///////////////////////cHBw/wAAAP8AAAD/AAAA/wAAAP8AAQH/AF2b/wCf//8Am///AJn//wCe//8AVY7/AAIE/wAAAP8AAADFCgoKxQICAv8MDAz/x8fH////////////////////////////kJCQ/w0NDf+np6f//////////////////////6ysrP8EBAT/AAAA/wAAAP8AAAD/AAAA/wBPhf8Anf//AJr//wCZ//8Amv//BKT//wqD1f8CDhf/AAAA/wAAAMUKCgrFBAQE/wEBAf8aGhr/lZWV///////////////////////6+vr/wcHB//r6+v/////////////////U1NT/FxcX/wAAAP8AAAD/AAAA/wAAAP8ARHD/AJz//wCb//8Amf//AJv//wai//8RaqT/DRgg/wIBAf8AAAD/AAAAxQsLC8UFBQX/AAAA/wAAAP8AAAD/cXFx//z8/P//////////////////////////////////////8fHx/zc3N/8AAAD/AAAA/wAAAP8AAAD/ADFR/wCX+P8AnP//AJn//wCa//8Gof//EFWD/wgDAv8AAAD/AAAA/wAAAP8AAADFExMTxQkJCf8BAQH/AAAA/wAAAP8AAAD/fX19//////////////////////////////////////9ycnL/AAAA/wAAAP8AAAD/AAAA/wAVI/8AieP/AJ7//wCZ//8Amv//BaL//w5dkf8GAQD/AAAA/wAAAP8AAAD/AAAA/wAAAMUeHh7GFBQU/wsLC/8GBgb/AwMD/wAAAP8AAAD/jY2N////////////////////////////o6Oj/wEBAf8AAAD/AAAA/wAAAP8ABwv/AHK+/wCf//8Amf//AJn//wCf//8GY6H/BgQD/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAAxSwsLMcjIyP/GBgY/xMTE/8ODg7/BgYG/wICAv+RkZH///////////////////////////+hoaH/AgIC/wAAAP8AAAD/AAAA/wBYk/8AoP//AJr//wCZ//8Amf//AJ7//wBfn/8AAgP/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAADFOjo6yDMzM/8oKCj/IiIi/xgYGP8LCwv/hYWF//////////////////////////////////39/f9ubm7/AAAA/wAAAP8AOF3/AJv+/wCb//8Amf//AJn//wCZ//8Amf//AJv//wBVjP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAMVJSUnIRERE/zk5Of8sLCz/JCQk/4WFhf/8/Pz//////////////////////////////////////+rq6v82Mi//AA4g/wCK5P8Anf//AJn//wCZ//8An///AJr//wCZ//8Am///AJn8/wBMf/8AAQL/AAAA/wAAAP8AAAD/AAAAxVlZWcpYWFj/S0tL/1RUVP+tra3////////////////////////////Ly8v//Pz8/////////////////8/My/8cf8P/AJv//wCZ//8Amf//A5z//xJ+xv8Lmvr/AJv//wCZ//8Am///AJr//wBfn/8AFCH/AAID/wAAAP8AAADFaGhoy2pqav9oaGj/3d3d////////////////////////////rq6u/ygoKP+4uLj//////////////////////7jm//8EmP//AJf//wCh//8JeML/Dg0P/xpciP8JpP//AJr//wCZ//8Am///AJ7//wGB1/8ADxn/AAAA/wAAAMV4eHjNfn5+/3BwcP+4uLj//////////////////////8fHx/9ERET/KSkp/01NTf/p6en//////////////////////3/M//8Amv//CJbx/wkjNP8AAAD/CwkJ/xlrof8Ipf//AJr//wCZ//8Co///CF2W/wICA/8AAAD/AAAAxoeHh8yUlJT/hoaG/4ODg//f39/////////////IyMj/Xl5e/0tLS/9ISEj/Nzc3/319ff/8/Pz//////////////////P7//2bH//8PSnL/CgEA/wQEBP8BAAD/CwkI/xpjlP8Mo///AKP//weC1P8GDBH/AAAA/wAAAP8AAADEkpKSpqioqP+cnJz/kJCQ/6ioqP/x8fH/vb29/3V1df9oaGj/ZWVl/1xcXP9TU1P/R0dH/66urv//////////////////////rK6w/xcXF/8UExP/EBAQ/wsLC/8FAwP/DAYD/xtMbP8Vld7/CDFN/wAAAP8AAAD/AAAA/wAAAJqwsLBQqqqq/7Kysv+mpqb/n5+f/6SkpP+MjIz/hoaG/4CAgP94eHj/b29v/2dnZ/9bW1v/YGFh/9/g4P///////////+jo6P9IRkX/JSUk/yQkJP8dHR3/GBgY/xISEv8LCgr/DQcD/xQcIv8FBQX/AAAA/wAAAP8AAAD+AAAAQenp6QWoqKiju7u7/7y8vP+xsbH/qKio/6Kiov+bm5v/k5OT/4uLi/+Dg4P/e3t7/3Nzc/9lZWX/h4iI//j5+f/+/v7/gYGB/zs7O/88PDz/NTU1/y4uLv8nJyf/ICAg/xoaGv8TExP/DgwK/woKCf8ICAj/BgYG/wMDA5MAAAABAAAAAOPj4w+0tLSXubm5+MTExP+/v7//tra2/6+vr/+np6f/oKCg/5iYmP+QkJD/iIiI/4CAgP9ycnL/srKz/7e3t/9aWlr/V1dX/1BQUP9ISEj/QUFB/zk5Of8yMjL/Kysr/yQkJP8hISH/Gxsb/xcXF/IeHh6HBgYGBwAAAAAAAAAAAAAAAAAAAADOzs49tLS0sry8vP/Gxsb/w8PD/7u7u/+zs7P/q6ur/6Ojo/+bm5v/lJSU/4yMjP+Dg4P/fHx8/3Jycv9ra2v/Y2Nj/1tbW/9TU1P/TU1N/0ZGRv8/Pz//Nzc3/ywsLPs6OjqkdXV1MAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADu7u4Dz8/PSLy8vKG6urrlvr6+/7+/v/+9vb3/uLi4/7CwsP+oqKj/oKCg/5eXl/+Pj4//iIiI/4GBgf95eXn/cXFx/2lpaf9eXl7/VFRU/1JSUt9mZmaWmZmZPAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOPj4xrOzs5Wv7+/kri4uMK1tbXmsrKy+a+vr/+srKz/pqam/5+fn/+YmJj/jo6O/4WFhfiAgIDjgYGBvY2NjYqqqqpNz8/PEwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA8fHxBebm5hja2towzs7OScbGxlrGxsZfwsLCXsDAwFjFxcVH0dHRLN/f3xXu7u4CAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA///////AA//8AAA/8AAAD8AAAAOAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAAB4AAAB/AAAB/+AAB//8AD//////8oAAAAEAAAACAAAAABACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAAAEsAAACEAAAApwAAALcAAAC3AAAApwAAAIQAAABLAAAADgAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAdQAAANYAAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAANYAAAB1AAAAEAAAAAAAAAApAAAA0AAAAP8AAAD/AAAA/wAAAP8AAAD/UlJS/1paWv8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAANAAAAApAQEBpgAAAP8mJib/Dw8P/wAAAP8AAAD/FhYW/+Tk5P/t7e3/JCQk/wAAAP8AAAD/AAYL/wAYKP8AAAD/AAAApgICAtoUFBT/1dXV/7e3t/8QEBD/AAAA/5qamv//////9PT0/zMzM/8AAAD/AAgN/wBrsf8Ag9r/AA4Y/wAAANoAAADbVVVV////////////pKSk/1paWv/+/v7//////2pqav8AAAD/AAID/wBkqP8Apf//A6X//wU7Xv8AAADbBQUF2ggICP9ycnL//Pz8///////6+vr//////66urv8CAgL/AAAA/wBLff8Aov//A57+/wpOev8EBwr/AAAA2hQUFNoDAwP/AAAA/3Z2dv///////////93d3f8XFxf/AAAA/wArSP8Am/v/AKH//wZPf/8CAAD/AAAA/wAAANotLS3cGRkZ/wMDA/94eHj////////////b29v/FhIQ/wAFDv8Ag9n/AKH//wCe//8AS33/AAAA/wAAAP8AAADaS0tL3Tw8PP+Hh4f/+/v7///////7+/v//////6qnpf8BXp//AKD//wWZ/P8Cnf//AJr8/wBHdv8ABQn/AAAA2mVlZd+Xl5f///////////+5ubn/dnZ2//39/f//////csv//wCY//8JPmL/D2af/wKm//8Aov//Ajle/wAAANuLi4vdkpKS/+zs7P/Y2Nj/XV1d/zk5Of+zs7P///////j///9Hg6z/AAAA/wgKDP8Qc7T/B4ne/wIQGf8AAADYsLCwoaampv+tra3/kJCQ/3Z2dv9lZWX/Z2dn/+3t7v/y8O//TEdD/xoaGf8SEA7/EBQX/wwfLP8AAAD/AAAAmefn5yK+vr7EtLS0/62trf+goKD/kJCQ/3h4eP+jo6P/mZmZ/0dHR/9AQED/MTEx/x8eHf8UEA3/GxsbvQMDAxwAAAAA9PT0CNbW1mPDw8PIurq6+7CwsP+kpKT/k5OT/4ODg/90dHT/YWFh/1RUVPpdXV3Dj4+PXHt7ewUAAAAAAAAAAAAAAAAAAAAA9vb2BePj4znS0tJzw8PDmbi4uKupqamxp6enm7KysnDNzc018/PzAwAAAAAAAAAAAAAAAOAHrEGAAaxBAACsQQAArEEAAKxBAACsQQAArEEAAKxBAACsQQAArEEAAKxBAACsQQAArEEAAKxBgAGsQeAHrEE=';
			} else {
				// Color.
				icon.href = 'data:image/x-icon;base64,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AP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/zo6Ov/09PT/+Pj4/0xMTP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAC0AAAACQAAAFkBAQH/AAAA/wAAAP8AAAD/Hx8f/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8PDw//z8/P////////////2dnZ/yAgIP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/ExMT/wICAv8AAAD/AAAA/wAAAP8AAABZBQUFqAMDA/8AAAD/AAAA/zk5Of/c3Nz/eHh4/wUFBf8AAAD/AAAA/wAAAP8AAAD/AAAA/4+Pj///////////////////////l5eX/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/0ZGRv+RkZH/MTEx/wAAAP8AAAD/AAAA/wAAAKgKCgrGBAQE/wAAAP8JCQn/w8PD////////////n5+f/w8PD/8AAAD/AAAA/wAAAP9VVVX/+/v7//////////////////T09P9LS0v/AAAA/wAAAP8AAAD/AAAA/wUFBf9gYGD/qKio/6urq/+Ghob/CwsL/wAAAP8AAAD/AAAAxgoKCsUEBAT/AQEB/35+fv//////////////////////qKio/wkJCf8AAAD/ICAg/+Pj4///////////////////////cHBw/wAAAP8AAAD/AAAA/wAAAP8AAAD/ZWVl/6qqqv+np6f/pqam/6mpqf9cXFz/AgIC/wAAAP8AAADFCgoKxQICAv8MDAz/x8fH////////////////////////////kJCQ/w0NDf+np6f//////////////////////6ysrP8EBAT/AAAA/wAAAP8AAAD/AAAA/1ZWVv+pqan/p6en/6ampv+np6f/ra2t/46Ojv8PDw//AAAA/wAAAMUKCgrFBAQE/wEBAf8aGhr/lZWV///////////////////////6+vr/wcHB//r6+v/////////////////U1NT/FxcX/wAAAP8AAAD/AAAA/wAAAP9JSUn/qKio/6enp/+mpqb/p6en/6ysrP9xcXH/GRkZ/wEBAf8AAAD/AAAAxQsLC8UFBQX/AAAA/wAAAP8AAAD/cXFx//z8/P//////////////////////////////////////8fHx/zc3N/8AAAD/AAAA/wAAAP8AAAD/NTU1/6Ojo/+oqKj/pqam/6enp/+srKz/W1tb/wMDA/8AAAD/AAAA/wAAAP8AAADFExMTxQkJCf8BAQH/AAAA/wAAAP8AAAD/fX19//////////////////////////////////////9ycnL/AAAA/wAAAP8AAAD/AAAA/xYWFv+UlJT/qamp/6ampv+np6f/rKys/2NjY/8BAQH/AAAA/wAAAP8AAAD/AAAA/wAAAMUeHh7GFBQU/wsLC/8GBgb/AwMD/wAAAP8AAAD/jY2N////////////////////////////o6Oj/wEBAf8AAAD/AAAA/wAAAP8HBwf/fHx8/6qqqv+mpqb/pqam/6qqqv9ra2v/AwMD/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAAxSwsLMcjIyP/GBgY/xMTE/8ODg7/BgYG/wICAv+RkZH///////////////////////////+hoaH/AgIC/wAAAP8AAAD/AAAA/2BgYP+qqqr/p6en/6ampv+mpqb/qamp/2dnZ/8CAgL/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAADFOjo6yDMzM/8oKCj/IiIi/xgYGP8LCwv/hYWF//////////////////////////////////39/f9ubm7/AAAA/wAAAP88PDz/p6en/6enp/+mpqb/pqam/6ampv+mpqb/p6en/1xcXP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAMVJSUnIRERE/zk5Of8sLCz/JCQk/4WFhf/8/Pz//////////////////////////////////////+rq6v8xMTH/ERER/5WVlf+pqan/pqam/6ampv+qqqr/p6en/6ampv+np6f/paWl/1JSUv8BAQH/AAAA/wAAAP8AAAD/AAAAxVlZWcpYWFj/S0tL/1RUVP+tra3////////////////////////////Ly8v//Pz8/////////////////8zMzP+IiIj/p6en/6ampv+mpqb/qKio/4eHh/+np6f/p6en/6ampv+np6f/p6en/2dnZ/8VFRX/AgIC/wAAAP8AAADFaGhoy2pqav9oaGj/3d3d////////////////////////////rq6u/ygoKP+4uLj//////////////////////+jo6P+mpqb/paWl/6urq/+BgYH/DQ0N/2FhYf+urq7/p6en/6ampv+np6f/qamp/4yMjP8QEBD/AAAA/wAAAMV4eHjNfn5+/3BwcP+4uLj//////////////////////8fHx/9ERET/KSkp/01NTf/p6en//////////////////////9LS0v+np6f/oaGh/yUlJf8AAAD/CQkJ/3Jycv+urq7/p6en/6ampv+srKz/ZGRk/wICAv8AAAD/AAAAxoeHh8yUlJT/hoaG/4ODg//f39/////////////IyMj/Xl5e/0tLS/9ISEj/Nzc3/319ff/8/Pz//////////////////v7+/83Nzf9PT0//AQEB/wQEBP8AAAD/CAgI/2lpaf+tra3/rKys/42Njf8MDAz/AAAA/wAAAP8AAADEkpKSpqioqP+cnJz/kJCQ/6ioqP/x8fH/vb29/3V1df9oaGj/ZWVl/1xcXP9TU1P/R0dH/66urv//////////////////////rq6u/xcXF/8TExP/EBAQ/wsLC/8DAwP/BQUF/1BQUP+cnJz/NDQ0/wAAAP8AAAD/AAAA/wAAAJqwsLBQqqqq/7Kysv+mpqb/n5+f/6SkpP+MjIz/hoaG/4CAgP94eHj/b29v/2dnZ/9bW1v/YGBg/9/f3////////////+jo6P9FRUX/JCQk/yQkJP8dHR3/GBgY/xISEv8KCgr/BgYG/xwcHP8FBQX/AAAA/wAAAP8AAAD+AAAAQenp6QWoqKiju7u7/7y8vP+xsbH/qKio/6Kiov+bm5v/k5OT/4uLi/+Dg4P/e3t7/3Nzc/9lZWX/h4eH//j4+P/+/v7/gYGB/zs7O/88PDz/NTU1/y4uLv8nJyf/ICAg/xoaGv8TExP/CwsL/wkJCf8ICAj/BgYG/wMDA5MAAAABAAAAAOPj4w+0tLSXubm5+MTExP+/v7//tra2/6+vr/+np6f/oKCg/5iYmP+QkJD/iIiI/4CAgP9ycnL/srKy/7e3t/9aWlr/V1dX/1BQUP9ISEj/QUFB/zk5Of8yMjL/Kysr/yQkJP8hISH/Gxsb/xcXF/IeHh6HBgYGBwAAAAAAAAAAAAAAAAAAAADOzs49tLS0sry8vP/Gxsb/w8PD/7u7u/+zs7P/q6ur/6Ojo/+bm5v/lJSU/4yMjP+Dg4P/fHx8/3Jycv9ra2v/Y2Nj/1tbW/9TU1P/TU1N/0ZGRv8/Pz//Nzc3/ywsLPs6OjqkdXV1MAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADu7u4Dz8/PSLy8vKG6urrlvr6+/7+/v/+9vb3/uLi4/7CwsP+oqKj/oKCg/5eXl/+Pj4//iIiI/4GBgf95eXn/cXFx/2lpaf9eXl7/VFRU/1JSUt9mZmaWmZmZPAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOPj4xrOzs5Wv7+/kri4uMK1tbXmsrKy+a+vr/+srKz/pqam/5+fn/+YmJj/jo6O/4WFhfiAgIDjgYGBvY2NjYqqqqpNz8/PEwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA8fHxBebm5hja2towzs7OScbGxlrGxsZfwsLCXsDAwFjFxcVH0dHRLN/f3xXu7u4CAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA///////AA//8AAA/8AAAD8AAAAOAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAAB4AAAB/AAAB/+AAB//8AD//////8oAAAAEAAAACAAAAABACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAAAEsAAACEAAAApwAAALcAAAC3AAAApwAAAIQAAABLAAAADgAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAdQAAANYAAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAANYAAAB1AAAAEAAAAAAAAAApAAAA0AAAAP8AAAD/AAAA/wAAAP8AAAD/UlJS/1paWv8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAANAAAAApAQEBpgAAAP8mJib/Dw8P/wAAAP8AAAD/FhYW/+Tk5P/t7e3/JCQk/wAAAP8AAAD/BgYG/xoaGv8AAAD/AAAApgICAtoUFBT/1dXV/7e3t/8QEBD/AAAA/5qamv//////9PT0/zMzM/8AAAD/CAgI/3R0dP+Ojo7/Dw8P/wAAANoAAADbVVVV////////////pKSk/1paWv/+/v7//////2pqav8AAAD/AgIC/21tbf+tra3/rq6u/z8/P/8AAADbBQUF2ggICP9ycnL//Pz8///////6+vr//////66urv8CAgL/AAAA/1FRUf+srKz/qamp/1NTU/8HBwf/AAAA2hQUFNoDAwP/AAAA/3Z2dv///////////93d3f8XFxf/AAAA/y4uLv+mpqb/q6ur/1VVVf8AAAD/AAAA/wAAANotLS3cGRkZ/wMDA/94eHj////////////b29v/ERER/wcHB/+Ojo7/q6ur/6mpqf9RUVH/AAAA/wAAAP8AAADaS0tL3Tw8PP+Hh4f/+/v7///////7+/v//////6ampv9nZ2f/qqqq/6ampv+pqan/pqam/01NTf8FBQX/AAAA2mVlZd+Xl5f///////////+5ubn/dnZ2//39/f//////0NDQ/6ampv9CQkL/bW1t/66urv+srKz/Pj4+/wAAANuLi4vdkpKS/+zs7P/Y2Nj/XV1d/zk5Of+zs7P///////7+/v+IiIj/AAAA/woKCv97e3v/lJSU/xEREf8AAADYsLCwoaampv+tra3/kJCQ/3Z2dv9lZWX/Z2dn/+3t7f/v7+//RkZG/xkZGf8PDw//FBQU/yAgIP8AAAD/AAAAmefn5yK+vr7EtLS0/62trf+goKD/kJCQ/3h4eP+jo6P/mZmZ/0dHR/9AQED/MTEx/x0dHf8PDw//GxsbvQMDAxwAAAAA9PT0CNbW1mPDw8PIurq6+7CwsP+kpKT/k5OT/4ODg/90dHT/YWFh/1RUVPpdXV3Dj4+PXHt7ewUAAAAAAAAAAAAAAAAAAAAA9vb2BePj4znS0tJzw8PDmbi4uKupqamxp6enm7KysnDNzc018/PzAwAAAAAAAAAAAAAAAOAHrEGAAaxBAACsQQAArEEAAKxBAACsQQAArEEAAKxBAACsQQAArEEAAKxBAACsQQAArEEAAKxBgAGsQeAHrEE=';
			}
			head[0].appendChild(icon);
		}

		head = top.document.getElementById("logodesc");
		if (head) {
			head.parentNode.removeChild(head);
		}
	}

	function addLinks() {
		var sp = document.evaluate("//*[@id='wrapcentre']/p/span[last()]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE);
		if (sp && sp.snapshotLength > 0) {
			var spa = sp.snapshotItem();
			while (spa.hasChildNodes()) { spa.removeChild(spa.firstChild); }

			var addendums = [
				[        "New", "./search.php?search_id=newposts"],
				[     "Unread", "./search.php?search_id=unreadposts"],
				[       "Mine", "./search.php?search_id=egosearch"],
				[     "Alerts", "./ucp.php?i=main&mode=subscribed"],
				[  "Bookmarks", "./ucp.php?i=main&mode=bookmarks"],
				["Attachments", "./ucp.php?i=attachments&mode=attachments&sk=f&sd=d"]
			];

			var sep = document.createTextNode(" | ");

			for (var i = 0; i < addendums.length; i++) {
				var newLink = document.createElement("a");
				newLink.href = addendums[i][1];
				newLink.innerHTML = addendums[i][0];

				if (i != 0) {
					spa.appendChild(sep.cloneNode());
				}
				spa.appendChild(newLink);
			}
		}
	}

	function autoReload() {
		// Reload the page every 10 minutes.
		if (-1 < document.URL.search(/(search|index|viewforum)\.php/)) {
			var minuteDelay = 10;

			var sp = document.evaluate("//*[@id='datebar']/table/tbody", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE);
			if (sp && sp.snapshotLength > 0) {
				var spa = sp.snapshotItem();

				var newTR = document.createElement('tr');
				var newTD = document.createElement('td');
				newTD.className = 'gensmall';
				newTD.align = 'right';
				newTD.colSpan = 2;
				newTD.innerHTML = 'Page will automatically reload every ' + minuteDelay + (minuteDelay == 1 ? 'minute' : 'minutes.');
				newTR.appendChild(newTD);
				spa.appendChild(newTR);
			}

			setTimeout(function() { document.location.reload(); } , minuteDelay*60*1000);
			console.log("XY Read Favicon: Added page reload after " + minuteDelay + " minutes.");
		}
	}


	toggleIcon(hasUnread());
	addLinks();
	autoReload();

})();


/*
Thoughts....
URLs...
(NEW POST)		http://www.xyplorer.com/xyfc/viewtopic.php?f=3&t=6563&view=unread#unread
(LATEST POST)	http://www.xyplorer.com/xyfc/viewtopic.php?f=3&t=6563&p=60551#p60551
(POST)			http://www.xyplorer.com/xyfc/viewtopic.php?f=3&t=6563

1.	Enumerate links containing view=unread#unread
2.	For each updateCount(1) and add onClick handler: openUnread(id).
3.	updateCount(v) { count += v; toggleIcon(count > 0); }
4.	openUnread(id) {
		updateCount(-1);
		get row/parent
		for all unread notifiers (icon/style) change to read versions.
	}


We could also make the big links/image a link to the post.
Add an open all unread button ("View new posts")
*/
