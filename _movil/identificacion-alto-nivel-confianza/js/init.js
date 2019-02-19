$( document ).ready(function() {

	var gif = document.getElementById('gif');


	init();

	/*** FUNCTIONS ***/
	function init(){	
		
	}	

	function showGif(){
		$('#first').hide()
		$('#second').show()	
		window.scrollTo(0,0);
		animateGif();
		setTimeout(function() {
			animateGif();

			setTimeout(function() {
				$('#second').hide()
				$('#third').show()	
				animateGif();
				document.getElementsByTagName('body')[0].classList.remove('hideContent');
				showFinish();

			}, 2000);
		}, 2000);

	}
	function animateGif(){
		gif.setAttribute('src', gif.getAttribute('src'));
	}

	function showFinish(){
		document.getElementById('second').classList.add('hide');
	}

	$("#first").click(function(){
	    showGif();
	});

//first
//second
//third

});