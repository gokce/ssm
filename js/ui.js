$(document).ready(function() {
	// hide in the beginnning
	$('#eqrawdata').animate({width:'hide'}, 0);
	$('#sidebar').animate({width:'hide'}, 0);
	
	if (typeof $.seismi === 'undefined') $.seismi = {};
	
	/*
	$('#help1').fadeOut(0);
	$('#help2').fadeOut(0);
	$('#help3').fadeOut(0);
	$('#help4').fadeOut(0);
	$('#help5').fadeOut(0);
	$('#help6').fadeOut(0);
	*/
	/*
	// show briefly in the beginning
	$('#help1').delay(100).fadeIn(500, function() {
		$('#help1').delay(1000).fadeOut(1500);
	});
	$('#help2').delay(200).fadeIn(500, function() {
		$('#help2').delay(1000).fadeOut(1500);
	});
	$('#help3').delay(300).fadeIn(500, function() {
		$('#help3').delay(1000).fadeOut(1500);
	});
	$('#help4').delay(400).fadeIn(500, function() {
		$('#help4').delay(1000).fadeOut(1500);
	});
	$('#help').delay(1900).fadeOut(1500);
	*/
	
	// toggle rawdata
	$('#butr').click(function() {
		$('#sidebar').animate({width:'hide'}, 200, function() {
			$('#eqrawdata').animate({width:'toggle'}, 200);
		});
	});
	
	// toggle help view
	$('.hlp').click(function() {
		$('#help').delay(100).fadeToggle(750);
		$('#help1').delay(100).fadeToggle(500);
		$('#help2').delay(150).fadeToggle(500);
		$('#help3').delay(200).fadeToggle(500);
		$('#help4').delay(250).fadeToggle(500);
		$('#help5').delay(300).fadeToggle(500);
		$('#help6').delay(350).fadeToggle(500);
	});

	// toggle sidebar from time info
	$('#tim1').click(function() {
		$('#eqrawdata').animate({width:'hide'}, 200, function() {
			$('#sidebar').animate({width:'toggle'}, 200);
		});
	});
	
	// quick bring of sidebar
	$("#bringsidebarhandle").mouseenter(function() {
		$('#sidebar').delay(100).animate({width:'show'}, 300);
		$('#bringsidebarhandle').delay(50).animate({width:'hide'}, 300);
	})
	$("#sidebar").mouseleave(function(){
		$('#sidebar').delay(300).animate({width:'hide'}, 300);
		$('#bringsidebarhandle').delay(150).animate({width:'show'}, 300);
	});
	
	
	$(document).keydown(function(e) {
		var code = (e.keyCode ? e.keyCode : e.which);
		if(code == 82) { //82 = r
			$('#eqrawdata').animate({width:'toggle'}, 200);
		}
		if(code == 70) { //70 = f
			$('#sidebar').animate({width:'hide'}, 300);
			$('#eqrawdata').animate({width:'hide'}, 300);
			$('#mainbar').fadeToggle(300, "linear");
		}
	});
	
	// Tooltip
	function ToolTip(){
		xOffset = -190;
		yOffset = 50;
		$(".tt").hover(function(e){
			this.t = this.title;
			this.title = "";
			$("body").append("<p id='tooltip'>"+ this.t +"</p>");
			$("#tooltip")
				.css("top",(e.pageY - yOffset) + "px")
				.css("left",(e.pageX + xOffset) + "px")
				.fadeIn("fast");
		},
		function(){
			this.title = this.t;
			$("#tooltip").remove();
		});
		$(".tt").mousemove(function(e){
			$("#tooltip")
				.css("top",(e.pageY - yOffset) + "px")
				.css("left",(e.pageX + xOffset) + "px");
		});
	};
	ToolTip();
});