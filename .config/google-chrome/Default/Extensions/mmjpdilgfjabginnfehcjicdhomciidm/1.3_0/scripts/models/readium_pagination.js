Readium.Models.ReadiumPagination=Backbone.Model.extend({defaults:{num_pages:0},initialize:function(){this.epubController=this.get("model");this.set("current_page",[this.epubController.get("spine_position")+1]);this.pageNumberDisplayLogic=new Readium.Models.PageNumberDisplayLogic;this.on("change:num_pages",this.adjustCurrentPage,this)},toggleTwoUp:function(){this.epubController.get("can_two_up")&&this.set({current_page:this.pageNumberDisplayLogic.getPageNumbersForTwoUp(this.epubController.get("two_up"),
this.get("current_page"),this.epubController.epub.get("page_prog_dir"),this.epubController.getCurrentSection().isFixedLayout())})},goRight:function(){this.epubController.epub.get("page_prog_dir")==="rtl"?this.prevPage():this.nextPage()},goLeft:function(){this.epubController.epub.get("page_prog_dir")==="rtl"?this.nextPage():this.prevPage()},goToPage:function(a){this.set("current_page",this.pageNumberDisplayLogic.getGotoPageNumsToDisplay(a,this.epubController.get("two_up"),this.epubController.getCurrentSection().isFixedLayout(),
this.epubController.epub.get("page_prog_dir")))},isPageVisible:function(a){return this.get("current_page").indexOf(a)!==-1},prevPage:function(){var a=this.get("current_page"),b=a[0]-1;a[0]<=1?this.epubController.goToPrevSection():this.epubController.paginator.shouldScroll()&&!this.epubController.getCurrentSection().isFixedLayout()?this.epubController.goToPrevSection():this.epubController.get("two_up")?(this.set("current_page",this.pageNumberDisplayLogic.getPrevPageNumsToDisplay(b,this.epubController.getCurrentSection().isFixedLayout(),
this.epubController.epub.get("page_prog_dir"))),this.epubController.get("rendered_spine_items").length>1&&(a=this.epubController.get("rendered_spine_items")[b>1?b-2:0],this.epubController.set("spine_position",a))):(this.set("current_page",[b]),this.epubController.get("rendered_spine_items").length>1&&(a=this.epubController.get("rendered_spine_items")[b-1],this.epubController.set("spine_position",a)))},nextPage:function(){var a=this.get("current_page"),b=a[a.length-1]+1;a[a.length-1]>=this.get("num_pages")?
this.epubController.goToNextSection():(this.epubController.get("two_up")?this.set("current_page",this.pageNumberDisplayLogic.getNextPageNumsToDisplay(b,this.epubController.getCurrentSection().isFixedLayout(),this.epubController.epub.get("page_prog_dir"))):this.set("current_page",[b]),this.epubController.get("rendered_spine_items").length>1&&(a=this.epubController.get("rendered_spine_items")[b-1],this.epubController.set("spine_position",a)))},adjustCurrentPage:function(){var a=this.get("current_page"),
b=this.get("num_pages");this.epubController.get("two_up");a[a.length-1]>b&&this.goToLastPage()},goToLastPage:function(){this.goToPage(this.get("num_pages"))}});
