$( document ).ready(function() {

	init();

	/*** FUNCTIONS ***/
	function init(){	
		
	}	
	const config = {
	    server: {
	        url: 'https://server/v2/',
	        token: 'df843b77-443d-4241-a7dd-d92332e68383',
	        rauth: '9b1c576a-4f06-4d7c-aee3-be841a308f77'
	    },
	    sandbox: {
	        url: 'https://etrust-sandbox.electronicid.eu/v2/',
	        token: '01c7e2b0-f8e2-475d-a44b-2673c12ffff7',
	        rauth: '9b1c576a-4f06-4d7c-aee3-be841a308f77'
	    }
	}

	function requestAuthorization(payload) {
	    var settings = {
	        "url": config.sandbox.url + "/videoid.request",
	        "headers": {
	            "authorization": "Bearer " + config.sandbox.token,
	            "content-type": "application/json"
	        },
	        "async": true,
	        "crossDomain": true,
	        "method": "POST",
	        "processData": false,
	        "data": JSON.stringify(payload ? payload : {})
	    };

	    return new Promise(function(resolve, reject) {

	        doAjaxRequest(settings).then(function(response) {
	            resolve(response);
	        });
	    });
	}

	function doAjaxRequest(options) {

	    return new Promise(function(resolve, reject) {

	        var request = new XMLHttpRequest();
	        request.open(options.method, options.url, true);

	        if (options.method === "POST")
	            request.setRequestHeader('Content-Type', 'application/json');

	        if (options.headers)
	            Object.keys(options.headers).forEach(function(header) {
	                request.setRequestHeader('Authorization', options.headers[header]);
	            });

	        request.onload = function() {
	            if (request.status >= 200 && request.status < 400)
	                resolve(JSON.parse(request.responseText));

	            else
	                reject(request);
	        };

	        request.onerror = function() {
	            reject(request);
	        };

	        request.send(options.method === "POST" ? options.data : null);
	    });
	}

	function initVideoConference(){
		videoIdAttended = EID.videoIDAttended("#video", {
	        eidApi: config.sandbox.url,
	        lang: "en",
	        allowHttp: true,
	        forceAdhoc: true
	    });

	    videoIdAttended.turnOn();

	    requestAuthorization( 
	    	{process:'Attended', rauthorityId: config.sandbox.rauth} 
	    ).then(function(response) {

	        videoIdAttended.start({
	          idType:62,
	          authorization: response.authorization
	        })
	    });

	    videoIdAttended.on("completed", function(video) {
	        videoIdAttended.turnOff();
			document.getElementById('video').classList.add('hide');
	        $('#finish').show();
	    });

	    videoIdAttended.on("failed", function(reason) {
	        console.log(reason);
	        alert('Failed video');
	    });
	}

	
	$("#first").click(function(){
		document.getElementById('first').classList.add('hide');
		window.scrollTo(0,0);
	    initVideoConference();
	});



});