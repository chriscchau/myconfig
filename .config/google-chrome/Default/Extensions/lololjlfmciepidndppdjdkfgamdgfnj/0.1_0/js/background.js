function checkForValidUrl(e,a,n){var t=n.url;isFlickrUrl(t)&&("complete"==a.status&&trackVisit(t,n.title),chrome.pageAction.show(e))}onReady(),chrome.tabs.onUpdated.addListener(checkForValidUrl),chrome.runtime.onMessage.addListener(function(e){if(isDefined(e.tracking))try{isDefined(e.tracking.param)&&isDefined(e.tracking.param2)?window[e.tracking.fce](e.tracking.param,e.tracking.param2):isDefined(e.tracking.param)?window[e.tracking.fce](e.tracking.param):window[e.tracking.fce]()}catch(a){}"download"===e.action?getOptions({filenameFormat:config.defaultFilenameFormat,askBeforeDownloading:"yes",defaultLocation:""},function(a){getTodayDownloaded(function(n){if(canDownload(n)){0==n&&trackStatsFirstDailyDownload(getDateInfo("CUR_DATE")),incrementDownloadCounter();var t=a.filenameFormat,i="yes"==a.askBeforeDownloading?!0:!1,o=a.defaultLocation;chrome.downloads.download({url:e.src,filename:getResultFileName(e.data,t,o)+".jpg",saveAs:i})}else trackDailyLimitExceeded(n),chrome.tabs.query({active:!0,currentWindow:!0},function(e){chrome.tabs.sendMessage(e[0].id,{action:"showPopupOnPage",data:{popupType:"limitExceeded"}})})})}):"openNewTab"===e.action&&chrome.tabs.getSelected(null,function(a){chrome.tabs.create({url:e.src,active:e.active,openerTabId:a.id,index:a.index+1})})});