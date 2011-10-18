$(document).ready(function() {
	// hide in the beginnning
	$('#eqrawdata').animate({width:'hide'}, 0);
	$('#sidebar').animate({width:'hide'}, 0);
	
	if (typeof $.seismi === 'undefined') $.seismi = {};
	
	// bring mainbarinfo
	$(".nst").mouseenter(function() {
	  $('#mainbarinfo').html('NST actively shows the latest earthquake happened on a map.');
	});
	$(".map").mouseenter(function() {
	  $('#mainbarinfo').html('MAP visualizes earthquakes on a worldmap. You can zoom in/out (+/-) and pan around');
	});
	$(".tml").mouseenter(function() {
	  $('#mainbarinfo').html('In TML view you see earthquakes distributed horizontally on a even timeline, where vertical axis represents magnitude.');
	});
	$(".dpt").mouseenter(function() {
	  $('#mainbarinfo').html('In DPT view earthquakes are visualized on a timeline where vertical height represents depth, size of circle the magnitude level.');
	});
	$(".lst").mouseenter(function() {
	  $('#mainbarinfo').html('LST visualizes earthquakes on time grid.');
	});
	$(".hlp").mouseenter(function() {
	  $('#mainbarinfo').html('? gives you some tips about the user interface elements.');
	});
	$("#navi").mouseenter(function(){ $('#mainbarinfo').delay(600).animate({height:'show'}, 300); }); // hide when leaving menu
	$("#navi").mouseleave(function(){ $('#mainbarinfo').delay(400).animate({height:'hide'}, 200); }); // hide when leaving menu
	
	
	// toggle rawdata
	$('#butr').click(function() {
		$('#sidebar').animate({width:'hide'}, 200, function() {
			$('#eqrawdata').animate({width:'toggle'}, 200);
		});
	});
	
	// toggle help view
	$('.hlp').click(function() {
		$('#help').delay(100).fadeToggle(500);
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
		$('#bringsidebarhandle').delay(300).animate({width:'show'}, 300);
	});
	$("#viewcanvas").click(function(){
		$('#sidebar').delay(300).animate({width:'hide'}, 300);
		$('#bringsidebarhandle').delay(300).animate({width:'show'}, 300);
	});
	
	$(document).keydown(function(e) {
		var code = (e.keyCode ? e.keyCode : e.which);
		if(code == 82) { //82 = r = show raw data
			$('#eqrawdata').animate({width:'toggle'}, 200);
		}
		if(code == 70) { //70 = f = show/hide mainbar
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