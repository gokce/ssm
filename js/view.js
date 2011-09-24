paper.install(window);
$(document).ready(function() {
	$.data_loaded = false;
	
	paper.setup('viewcanvas');
	
	projects = {
		'nst':new paper.Project(),
		'map':new paper.Project(),
		'tml':new paper.Project(),
		'dpt':new paper.Project(),
		'lst':new paper.Project()
	}
	
	$('#navi-nst').click(function(){show_nst();});
	$('#navi-map').click(function(){show_map();});
	$('#navi-tml').click(function(){show_tml();});
	$('#navi-dpt').click(function(){show_dpt();});
	$('#navi-lst').click(function(){show_lst();});
	
	$.visualizations = {
      refresh: function() {
        $.each($.seismi.data.earthquakes, function(k, v) {
          var eq_circle = new Path.Circle(new Point(100, 100), 10);
          colors = ['#A3CC29','#FFE24D','#CC671F','#B30000']
    			eq_circle.fillColor = colors[Math.floor(v.magnitude)-4];
    		  v["eq_visual"] = eq_circle;
    		  v['move'] = false;
    		  v['destination'] = -1;
    		  $.data_loaded = true;
        });
        view.draw();
      }
  }
  function show_nst() {
  }
  function show_map() {
    $.each($.seismi.data.earthquakes, function(k, v) {
      var point = randomPoint();
      v['destination'] = point;
      v['move'] = true;
    });
  }
	
	function show_tml() {
	  $.each($.seismi.data.earthquakes, function(k, v) {
	    v['eq_visual'].position = randomPoint();
    });
	}
	
	show_lst = function() {
		posx=20;
		posy=20;
		// Canvas current width and height
		canvas_height=view._viewSize._height
		canvas_width=view._viewSize._width
		console.log(canvas_height, canvas_width);
		// Store previous day
		prev_day = ''
		// For each earthquake in data
		$.each($.seismi.data.earthquakes, function(k, v) {
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
					/*
					var text = new paper.PointText(new paper.Point(posx+5, posy+6));
					text.characterStyle = {
						fontSize: 14,
						fillColor: 'white',
						font: 'extravaganzzaBold', //somehow not working
						//font: 'sans-serif',
					};
					text.content=v.day;
					*/
					posx+=100;
				}
			}
			// Move one line down if circle is out of bounds
			if (canvas_width-posx < 10) {
				posx=20;
				posy+=30;
			}
			v['destination'] = new Point(posx, posy);
			v['move'] = true;
			posx+=25;
			prev_day=v.day;
			/*
			// Draw Circle
			var eq_circle = new paper.Path.Circle(new paper.Point(posx, posy), circle_size);
			colors = ['#A3CC29','#FFE24D','#CC671F','#B30000']
			eq_circle.fillColor = colors[Math.floor(v.magnitude)-4];
			posx+=25;
			prev_day=v.day;
			*/
		});
	}
		
	randomPoint = function() {
	  var point = new Point(0, 0);
    //var point = Point.random() * view.size; //NaN
    point.x = Math.random() * view.size.width;
    point.y = Math.random() * view.size.height;
	  return point
	}
	vectorDiff = function(dest, src, speed) {
	  var new_pos = new Point(0,0);
	  var diff_x = dest.x - src.x;
	  var diff_y = dest.y - src.y;
	  new_pos.x = src.x + (diff_x/speed);
	  new_pos.y = src.y + (diff_y/speed);
	  dist = Math.sqrt(Math.pow(diff_x,2) + Math.pow(diff_y,2));
	  return {dist : dist, new_pos : new_pos};
	}
	view.onFrame = function(event) {
	  if ($.data_loaded) {
      $.each($.seismi.data.earthquakes, function(k, v) {
        if (v['move']) {
          var vector = v['destination'] - v['eq_visual'].position;
          var vd = vectorDiff(v['destination'], v['eq_visual'].position, 4);
          v['eq_visual'].position = vd.new_pos;
          if (vd.dist < 1) {
            v['move'] = false;
            }
          }
      });
    }
  }
});