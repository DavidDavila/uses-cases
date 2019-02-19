$( document ).ready(function() {

	var img1 = document.getElementById('img1');
	var img2 = document.getElementById('img2');
	var authorization;
	init();

	/*** FUNCTIONS ***/
	function init(){	
		img1.classList.add('fromL');
		img2.classList.add('toR');
	}	
	function clickR(){
		img1.classList.add('toL');
		img2.classList.add('fromR');
	}
	function clickL(){	
		img1.classList.remove('toL');
		img2.classList.remove('fromR');
	}	


	// Listeners
	$("#left").click(function(){
	    clickL();
	});
	$("#right").click(function(){
	    clickR();
	});

	$("#purchase").click(function(){
		console.log('statr')
	    smileId();
	});


	// SMILE ID
	function requestAuthorization(payload) {

	    return new Promise(function(resolve, reject) {
	        var options = {
	            "url": "https://etrust-sandbox.electronicid.eu/v2/smileid.request",
	            "headers": {
	                "authorization": "Bearer 01c7e2b0-f8e2-475d-a44b-2673c12ffff7",
	                "content-type": "application/json"
	            },
	            "async": true,
	            "crossDomain": true,
	            "method": "POST",
	            "processData": false,
	            "data": JSON.stringify(payload ? payload : {})
	        };
	        var request = new XMLHttpRequest();
	        request.open(options.method, options.url, true);

	        request.setRequestHeader('Content-Type', 'application/json');
	        request.setRequestHeader('Authorization', 'Bearer 01c7e2b0-f8e2-475d-a44b-2673c12ffff7');

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
	function smileId() {
	  

	    requestAuthorization({ /*process:'Attended', */ rauthorityId: 'ebfb5e54-16c9-424d-9cbf-f9b5f93dec27' }).then(function(response) {
	        $('.containerImages').hide();
    	    $('.menu').hide();
    	    $('#video').show();
	        console.log('authorization', response.authorization)
	        $.ajaxSetup({ headers: { authorization: response.authorization, "Content-Type": 'application/json' } });
	        var smileId = EID.smileId('#video', {
	            lang: 'en',
	            eidApi: 'https://etrust-sandbox.electronicid.eu/v2/',
	        })
	        smileId.turnOn() /*.then((res)=>{*/
	        smileId.start({ authorization: response.authorization })
	        /*});*/
	        smileId.on('completed', ((video) => {
	            
	   			 $('#video').hide();
	    		$('#finished').addClass('visible').show();
	        }).bind(this));
	    });


	}
});
