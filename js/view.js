$(document).ready(function() {
	var canvas = document.getElementById('viewcanvas');
	var scope = new paper.PaperScope();
	scope.setup(canvas);
	
	projects = {
		'nst':new paper.Project(),
		'map':new paper.Project(),
		'tml':new paper.Project(),
		'dpt':new paper.Project(),
		'lst':new paper.Project()
	}
	
	$('#navi-nst').click(function(){show_nst($.seismi.data);});
	$('#navi-map').click(function(){show_map($.seismi.data);});
	$('#navi-tml').click(function(){show_tml($.seismi.data);});
	$('#navi-dpt').click(function(){show_dpt($.seismi.data);});
	$('#navi-lst').click(function(){show_lst($.seismi.data);});
	
	function show_nst(data) {
		projects['nst'].activate();
		// CODE HERE // Do not delete upper and lower lines
		scope.view.draw();
	}
	
	function show_map(data) {
		projects['map'].activate();
		// CODE HERE // Do not delete upper and lower lines
		scope.view.draw();
	}
	
	function show_tml(data) {
		projects['tml'].activate();
		// CODE HERE // Do not delete upper and lower lines
		scope.view.draw();
	}
	
	function show_dpt(data) {
		projects['dpt'].activate();
		// CODE HERE // Do not delete upper and lower lines
		scope.view.draw();
	}
	
	function show_lst(data) {
		projects['lst'].activate();
		
		circle_size=10;
		posx=20;
		posy=20;
		// Canvas current width and height
		canvas_height=scope.view._viewSize._height
		canvas_width=scope.view._viewSize._width
		// Store previous day
		prev_day = ''
		// For each earthquake in data
		$.each(data.earthquakes, function(k, v) {
			//console.log(v);
			// Access to Eq Data:
			// v.day, v.depth, v.eqid, v.lat, v.lon, v.magnitude, v.region, v.src, v.time, v.timedate
			
			// Check if current earthquake is in a new day
			if (prev_day!=''){
				if (prev_day!=v.day) {
					// Move one line down if text would go out of bounds
					if (canvas_width-posx < 75) {
						posx=20;
						posy+=30;
					}
					var text = new paper.PointText(new paper.Point(posx+5, posy+6));
					text.characterStyle = {
						fontSize: 14,
						fillColor: 'white',
						font: 'extravaganzzaBold', //somehow not working
						//font: 'sans-serif',
					};
					text.content=v.day;
					posx+=100;
				}
			}
			// Move one line down if circle is out of bounds
			if (canvas_width-posx < circle_size) {
				posx=20;
				posy+=30;
			}
			// Draw Circle
			var eq_circle = new paper.Path.Circle(new paper.Point(posx, posy), circle_size);
			colors = ['#A3CC29','#FFE24D','#CC671F','#B30000']
			eq_circle.fillColor = colors[Math.floor(v.magnitude)-4];
			posx+=25;
			prev_day=v.day;
		});
		
		scope.view.draw();
	}
	
	projects['nst'].activate();
	scope.view.draw();
});