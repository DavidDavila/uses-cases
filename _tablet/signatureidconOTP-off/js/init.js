var sid= {
	init: function() {
		this.getEvents();
	},
	getEvents: function() {
	$('.step1 button').click((function() {			
			this.otp();
		}).bind(this))
	},
	finish: function() {
		$('.step3').hide();
		$('.step4').show();
	},
	otp: function() {
		$('.step1').hide();
		$('.step2').css('display','flex');
		$('.step2 button').click((function() {			
			this.verify();
		}).bind(this));
	},
	verify: function() {
		$('.step2').hide();
		$('.step3').css('display','flex');
		$('.step3 button').click((function() {			
			this.finish();
		}).bind(this));
	},
	
}
$( document ).ready(function() {
	sid.init();
});