// (C) 2017 Prevoow UG & Co. KG, Edward Ackroyd, Paderborn, Germany
function init() {	
	console.log("SP init");
	
	chrome.storage.local.get(["insertpreviews", "insertranks"], function(items) {		
		if (items.insertpreviews == undefined) { //init if new install
			chrome.storage.local.set({'insertpreviews': true}, function() {});
		}
		if (items.insertranks == undefined) { //init if new install
			chrome.storage.local.set({'insertranks': true}, function() {});
		}
	});
	
	chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
		//console.log(request + "\n");
		if (request.command == "http-get") {
			var http = new XMLHttpRequest();
			http.open("GET", request.url, true);
			http.onreadystatechange = function() {
				if(http.readyState == 4 && http.status == 200) {
					sendResponse({xml: http.responseText});
				}
			}
			http.send(null);
			return true;
		}
		else if (request.command == "http-post") {
			var http = new XMLHttpRequest();
			http.overrideMimeType("text/plain");
			http.open("POST", request.url, true);
			http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			http.setRequestHeader("Accept", "text/plain");
			http.onreadystatechange = function() {
				if(http.readyState == 4 && http.status == 200) {
					sendResponse({xml: http.responseText});
				}
			}
			http.send(request.params);
			return true;
		}
		else
			sendResponse({}); // send back empty
	});
	
	chrome.contextMenus.create({"onclick" : contextMenuClick, "title": chrome.i18n.getMessage("ex_requestupdate"), "contexts": ["image"], "targetUrlPatterns" : ["http://*.searchpreview.de/preview*", "https://*.searchpreview.de/preview*", "http://*.searchpreview.de/x2*", "https://*.searchpreview.de/x2*"]}, function() {
		if (chrome.extension.lastError) {
			console.log("Error during context menu init: " + chrome.extension.lastError.message);
		}
	});	
	
}

function contextMenuClick(info, tab) {
	chrome.tabs.sendMessage(tab.id, {method: "updatePreview", sourceUrl: info.srcUrl}, function(response) {});
}

document.addEventListener('DOMContentLoaded', function () {
	init();
});
