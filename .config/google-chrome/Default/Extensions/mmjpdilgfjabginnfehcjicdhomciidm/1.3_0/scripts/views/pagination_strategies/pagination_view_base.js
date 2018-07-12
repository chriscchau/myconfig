Readium.Views.PaginationViewBase=Backbone.View.extend({el:"#readium-book-view-el",initialize:function(a){this.zoomer=a.zoomer;this.pages=new Readium.Models.ReadiumPagination({model:this.model});this.mediaOverlayController=this.model.get("media_overlay_controller");this.mediaOverlayController.setPages(this.pages);this.mediaOverlayController.setView(this);this.pages.on("change:current_page",this.showCurrentPages,this);this.model.on("change:font_size",this.setFontSize,this);this.model.on("change:two_up",
this.pages.toggleTwoUp,this.pages);this.mediaOverlayController.on("change:mo_text_id",this.highlightText,this);this.mediaOverlayController.on("change:active_mo",this.indicateMoIsPlaying,this);this.bindingTemplate=Handlebars.templates.binding_template},iframeLoadCallback:function(a){this.applyBindings($(a.srcElement).contents());this.applySwitches($(a.srcElement).contents());this.addSwipeHandlers($(a.srcElement).contents());this.injectMathJax(a.srcElement);this.injectLinkHandler(a.srcElement);var b=
this.parseTriggers(a.srcElement.contentDocument);this.applyTriggers(a.srcElement.contentDocument,b);this.mediaOverlayController.pagesLoaded()},activateEPubStyle:function(a){var b;this.model.get("current_theme")==="night-theme"?(b=new Readium.Models.AlternateStyleTagSelector,b.activateAlternateStyleSet(["night"],a)):(b=new Readium.Models.AlternateStyleTagSelector,b.activateAlternateStyleSet([""],a))},setUpMode:function(){var a=this.model.get("two_up");this.$el.toggleClass("two-up",a);this.$("#spine-divider").toggle(a)},
showCurrentPages:function(){var a=this,b=this.model.get("two_up");this.$(".page-wrap").each(function(c){b||(c+=1);$(this).toggleClass("hidden-page",!a.pages.isPageVisible(c))})},destruct:function(){this.pages.off("change:current_page",this.showCurrentPages);this.model.off("change:font_size",this.setFontSize);this.model.off("change:hash_fragment",this.goToHashFragment);this.mediaOverlayController.off("change:mo_text_id",this.highlightText);this.mediaOverlayController.off("change:active_mo",this.indicateMoIsPlaying);
this.resetEl()},linkClickHandler:function(a){a.preventDefault();a=a.srcElement.attributes.href.value;a.match(/^http(s)?:/)?chrome.tabs.create({url:a}):this.model.goToHref(a)},getBindings:function(){var a=this.model.epub.getPackageDocument();return a.get("bindings").map(function(b){b.selector='object[type="'+b.media_type+'"]';b.url=a.getManifestItemById(b.handler).get("href");b.url=a.resolveUri(b.url);return b})},applyBindings:function(a){for(var b=this,c=this.getBindings(),d=0,d=0;d<c.length;d++)$(c[d].selector,
a).each(function(){var a=[],f=$(this),e=f.attr("data");a.push("src="+b.model.packageDocument.resolveUri(e));a.push("type="+c[d].media_type);a=c[d].url+"?"+a.join("&");e=$(b.bindingTemplate({}));e.attr("src",a);f.html(e)})},applyTriggers:function(a,b){for(var c=0;c<b.length;c++)b[c].subscribe(a)},parseTriggers:function(a){var b=[];$("trigger",a).each(function(){b.push(new Readium.Models.Trigger(this))});return b},applySwitches:function(a){$("switch",a).each(function(){var a=!1;$("case",this).each(function(){var c;
if(c=!a)(c=this.attributes["required-namespace"])?c=_.include(["http://www.w3.org/1998/Math/MathML"],c):(console.log("Encountered a case statement with no required-namespace"),c=!1);c?a=!0:$(this).remove()});a&&$("default",this).remove()})},addSwipeHandlers:function(a){var b=this;$(a).on("swipeleft",function(a){a.preventDefault();b.pages.goRight()});$(a).on("swiperight",function(a){a.preventDefault();b.pages.goLeft()})},injectMathJax:function(a){var b;b=a.contentDocument;if(a=b.getElementsByTagName("head")[0])b=
b.createElement("script"),b.type="text/javascript",b.src=MathJax.Hub.config.root+"/MathJax.js?config=readium-iframe",a.appendChild(b)},injectLinkHandler:function(a){var b=this;$("a",a.contentDocument).click(function(a){b.linkClickHandler(a)})},resetEl:function(){$("body").removeClass("apple-fixed-layout");$("#readium-book-view-el").attr("style","");this.$el.toggleClass("two-up",!1);this.$("#spine-divider").toggle(!1);this.zoomer.reset();$("#page-wrap").css({position:"relative",right:"0px",top:"0px",
"-webkit-transform":"scale(1.0) translate(0px, 0px)"})}});
