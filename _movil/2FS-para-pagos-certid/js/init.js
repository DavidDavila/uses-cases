$( document ).ready(function() {

	var img1 = document.getElementById('img1');
	var img2 = document.getElementById('img2');
	var containerImages = document.getElementById('containerImages');

	var gif = document.getElementById('taptopay');
	var finished = document.getElementById('finished');

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

	function start(){		
		gif.classList.add('toFront');
		window.scrollTo(0,0)
		
		animateGif();
		setTimeout(function() {
			animateGif();

			setTimeout(function() {
				animateGif();
				finished.classList.add('visible');

				containerImages.classList.add('none')
				gif.classList.add('none')
			}, 2000);
		}, 2000);
	}

	function animateGif(){
		let imgGif = gif.children[0];
		imgGif.setAttribute('src', imgGif.getAttribute('src'));
	}


	// Listeners
	$("#left").click(function(){
	    clickL();
	});
	$("#right").click(function(){
	    clickR();
	});
	$("#purchase").click(function(){
	    start();
	});

});
