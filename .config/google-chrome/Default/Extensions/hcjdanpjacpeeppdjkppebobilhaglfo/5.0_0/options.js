function save_options() {
  var checkedPreviews = document.getElementById("insertpreviews").checked;
  var checkedRanks = document.getElementById("insertranks").checked;
  chrome.storage.local.set({"insertpreviews" : checkedPreviews, "insertranks" : checkedRanks}, function() {
	  ;
  });	
  //console.log(checkedPreviews);
  //console.log(checkedRanks);
  chrome.tabs.query({}, function(tabs) {
	    for (var i=0; i<tabs.length; ++i) {
	        chrome.tabs.sendMessage(tabs[i].id, {method: "applyPrefs"});
	    }
  });
  
}

function restore_options() {
  //Texts
  document.getElementById("title").innerHTML = "SearchPreview";
  document.getElementById("options").innerHTML = chrome.i18n.getMessage("ex_options");
  document.getElementById("check_insertpreviews").innerHTML = chrome.i18n.getMessage("ex_insert_previews");
  document.getElementById("check_insertranks").innerHTML = chrome.i18n.getMessage("ex_insert_ranks") + "<img src='pop-rank.png'>" + chrome.i18n.getMessage("ex_insert_ranks_sec") + "<img src='not-so-pop-rank.png'>)";
    
  chrome.storage.local.get(["insertpreviews", "insertranks"], function(items) {
	  document.getElementById("insertpreviews").checked = items.insertpreviews;
	  document.getElementById("insertranks").checked = items.insertranks;
  });
}

restore_options();
document.querySelector('#insertpreviews').addEventListener('click', save_options);
document.querySelector('#insertranks').addEventListener('click', save_options);