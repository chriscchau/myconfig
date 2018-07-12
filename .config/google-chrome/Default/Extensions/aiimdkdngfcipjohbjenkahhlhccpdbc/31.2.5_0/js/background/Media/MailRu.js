(function(){
	
	var MailRu = function(){		

		var mediaDetectCallbacks = [];
	
		// --------------------------------------------------------------------------------
		function detectVimeoVideo( data, callback ){

			var url = data.url,
				tabUrl = data.tab.url,
				tabTitle = data.tab.title,
				videoId = null;

			var mediaFound = false;
			var parsedMediaList = [];


			if( /https?:\/\/my\.mail\.ru\/\+\/video\/meta\/.+?\?/.test(url.toLowerCase()) )  {
				
				
				getAJAX( url, null, function(content){

					if (content) {
				
	                    try {
	                        var info = JSON.parse(content);
	                    }                     
	                    catch(ex) {
	                        console.log(ex);
	                        return;
	                    }

						var par = {};
	                    par.videoId = fvdSingleDownloader.Utils.getJSON( info, 'meta/id' ).replace(/-/g,"");
	                    par.title = fvdSingleDownloader.Utils.getJSON( info, 'meta/title' );

	                    var videos = fvdSingleDownloader.Utils.getJSON( info, 'videos' );

	                    var parsedMedia = [];
	                    var foundMedia = false;

	                    for (var i=0; i<videos.length; i++) {

	                    	par.url = 'http:'+videos[i].url;
	                    	par.label = videos[i].key;
	                    	par.height = par.label.replace('p','');

							var m = media_add( par );

							parsedMediaList.push(m);
	                        mediaFound = true;
	                    }

	                    callback( parsedMediaList, videoId );
	                }    
				
				});
				
			}

			// --------------------------------------------------------------------------------
			function media_add( params ){

				var hash = params.videoId + "_" + params.height;
                var ext = "mp4";
				var ff = fvdSingleDownloader.Utils.extractPath( params.url );
				if (ff) {
					ext = ff.ext;
				}	

				var media = {
						videoId:		params.videoId,
						url:			params.url,
					
						title: 			params.title,
						displayName: 	params.title,
						downloadName: 	params.title,
						format: 		params.label,
						quality: 		params.label,
						ext: 			ext,
						
						status: 		"stop",
						hash: 			hash,
						
						filename: 		hash,
						size: 			0,
						type: 			"video",
						dwnl:			1 
				};
				
				return media;		
			}	
		}
		
		
		
		// --------------------------------------------------------------------------------
		function getAJAX( url, headers, callback ){
			
			var ajax = new XMLHttpRequest();
			ajax.open('GET', url, true);
			ajax.setRequestHeader('Cache-Control', 'no-cache');
			ajax.setRequestHeader('X-FVD-Extra', 'yes');
			
			if (headers) {
				for (var key in headers) {
					ajax.setRequestHeader(key, headers[key]);
				}
			}	
			
			ajax.onload = function(){
						var content = this.responseText;
						callback( content );
			}
			
			ajax.onerror = function(){
				callback( null );
			}
			
			ajax.send( null );
		
		}

		// -----------------------------------------------------------
		function storeMedia( media, data ){
			
			if (media)	{	
				if( media.length ) 	 {							
					media.forEach(function( item ){
											item.tabId = data.tabId;
											item.priority = 1;
											item.metod = "download";
											item.source = "MailRu";
											item.status = "stop";
										});
				}
				else	{							
					media.tabId = data.tabId;
					media.priority = 1;
					media.metod = "download";
					media.source = "MailRu";
				}						
			
				mediaDetectCallbacks.forEach( function( callback ){
									callback( media );
								} );
			
			}
		}
		
		
		// -----------------------------------------------------------
		this.onMediaDetect = {
			addListener: function( callback ){
				if( mediaDetectCallbacks.indexOf( callback ) == -1 )
				{
					mediaDetectCallbacks.push( callback );
				}
			}
		};
		
		// -----------------------------------------------------------
		this.isEqualItems = function( item1, item2 )		{
		
			if( item1.hash == item2.hash )	{
				return true;
			}
			return false;
		};
	
		// ------------------------------------------------------------------------
        chrome.webRequest.onResponseStarted.addListener(function(data){
			
			if( !data || data.tabId < 0 )		return false;
		
			chrome.tabs.get( data.tabId, function( tab ){
				
				if (chrome.runtime.lastError) {
					//console.log(chrome.runtime.lastError.message);
				} 
				else if ( !tab ) {
					console.log( data );
				}	
				else {
			
					var tabInfo = tab;
					data.tab = tabInfo;
					
					detectVimeoVideo( data, function( mediaToSave, videoId )  {
										if( mediaToSave )	{
											data.tab.streamId = videoId;
											storeMedia( mediaToSave, data );
										}
					});
					
				}	

			});
		}, {
			urls: ["<all_urls>"],
		}, ["responseHeaders"]);

	};
	
	this.MailRu = new MailRu();
	
}).apply( fvdSingleDownloader.Media );

