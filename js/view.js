paper.install(window);
$(document).ready(function() {
	$.data_loaded = false;
	
	paper.setup('viewcanvas');
	var tool = new Tool();
	
	var hitOptions = {
		segments: true,
		stroke: true,
		fill: true,
		tolerance: 5
	};
	
	var views = ['nst','map','tml','dpt','lst'];
	
	var current_view = 'dpt';
	var canvas;
	
	$(window).resize(function() {
		show(current_view);
	});
	
	$('#navi-nst').click(function(){show('nst');});
	$('#navi-map').click(function(){show('map');});
	$('#navi-tml').click(function(){show('tml');});
	$('#navi-dpt').click(function(){show('dpt');});
	$('#navi-lst').click(function(){show('lst');});
	
	show = function(view_name) {
		canvas = {'width':view._viewSize._width, 'height':view._viewSize._height};
		current_view = view_name;
		$.each($.seismi.data.earthquakes, function(k, v) {
		    $.each(views, function(k2, v2) {
		        //console.log(v2);
		        if (v[v2] != null) v[v2].disable();
	        });
	    });
		window['show_'+current_view]($.seismi.data.earthquakes);
	}
	
	// Placeholders for Infobar
	var holderMagnitude = $('#magnitude');
	var holderDepth = $('#depth');
	var holderTime = $('#time');
	var holderDate = $('#date');
	var holderRegion = $('#region');
	var holderLatlon = $('#latlon');
	var holderTectonic = $('#tectonic');
	var holderVolcanoes = $('#volcanoes');
	var holderTimebar = $('#timebar');
	var holderIndicator = {}
	holderIndicator['4'] = $('#mag2').find('.i4');
	holderIndicator['5'] = $('#mag2').find('.i5');
	holderIndicator['6'] = $('#mag2').find('.i6');
	holderIndicator['7'] = $('#mag2').find('.i7');
	
	$.visualizations = {
		refresh: function() {
		  canvas = {'width':view._viewSize._width, 'height':view._viewSize._height};
		  project.activeLayer.removeChildren()
			$.each($.seismi.data.earthquakes, function(k, v) {
				initx = Math.random()*view._viewSize._width;
				inity = Math.random()*-100;
				initsize = 6;
				
				// Circle
				var eq_circle = new Path.Circle(new Point(initx, inity), initsize);
				//colors = ['#A3CC29','#FFE24D','#CC671F','#B30000'] //with eq-colors
				colors = ['#0044cc','#0044cc','#0044cc','#0044cc'] // only blue
				eq_circle.fillColor = colors[Math.floor(v.magnitude)-4];
				eq_circle.opacity = ((v.magnitude / 15) + 0.3);
				eq_circle.name = 'fill';

				// Selection Stroke
				var eq_stroke = new Path.Circle(new Point(initx, inity), initsize);
				eq_stroke.strokeWidth = 2;
				//eq_stroke.originalColor = colors[Math.floor(v.magnitude)-4];
				eq_stroke.originalColor = '#ffffff';
				eq_stroke.strokeColor = null;
				eq_stroke.name = 'stroke';

				var eq_visual = new Group();
				
				eq_visual.addChild(eq_circle);
				eq_visual.addChild(eq_stroke);

				// Select
				eq_visual['select'] = function() {
					eq_stroke.strokeColor = eq_stroke.originalColor;
				}
				// Unselect
				eq_visual['unselect'] = function() {
					eq_stroke.strokeColor = null;
				}
				// Return Eq data
				eq_visual['data'] = function() {
					return v;
				}
				
				v['dpt'] = setup_dpt(v);
				v['dpt_redraw'] = false;
				
				v['eq_visual'] = eq_visual;
				v['move'] = false;
				v['destination'] = -1;
				v['size'] = initsize;
				v['destination_size'] = initsize;
				$.data_loaded = true;
			});
			view.draw();
			show(current_view);
		}
	}
	setup_dpt = function(data) {
    	var dpt_group = new Group();
    	dpt_group['redraw'] = function(posx) {
    	    if (posx == null) posx=100;
    	    dpt_group.removeChildren();
        	posy=75;
        	console.log(posx);
        	newx = posx;
        	newy = posy+(Math.floor(data.depth)/1.2);
            // add white depthlines
    	    var depthline = new Path.Line(new Point(newx,posy), new Point(newx,newy));
        	depthline.strokeColor = 'white';
        	depthline.strokeWidth = 3;    	
        	dpt_group.addChild(depthline);
    	}
    	dpt_group['enable'] = function() {dpt_group.strokeColor = 'white';}
    	dpt_group['disable'] = function() {dpt_group.strokeColor = null;}
    	dpt_group['select'] = function() {}
    	dpt_group['unselect'] = function() {}
    	dpt_group['data'] = function() {}
    	dpt_group.redraw();
    	return dpt_group;
	}
	
	show_nst = function(data) {

	}
	show_map = function(data) {
		$.each(data, function(k, v) {
			var point = randomPoint();
			v['destination'] = point;
			v['destination_size'] = 10;
			v['move'] = true;
		});
	}
	
	show_tml = function(data) {
		$.each(data, function(k, v) {
			v['eq_visual'].position = randomPoint();
		});
	}
	
	show_dpt = function(data) {
		posx=100;
		posy=75;
		$.each(data, function(k, v) {
			newx = canvas.width-posx;
			newy = posy+(Math.floor(v.depth)/1.2);
			v['destination'] = new Point(newx,newy);
			v['destination_size'] = ((v.magnitude*20)-70);
			v['move'] = true;
			v['dpt_redraw'] = true;
			// move next eq 50 pixels left
			posx+=50;
		  //v[current_view].strokeColor = 'white';
		});
	}
	
	show_lst = function(data) {
		posx=20;
		posy=20;
		// Store previous day
		prev_day = ''
		// For each earthquake in data
		$.each(data, function(k, v) {
			// Access to Eq Data:
			// v.day, v.depth, v.eqid, v.lat, v.lon, v.magnitude, v.region, v.src, v.time, v.timedate
			
			// Check if current earthquake is in a new day
			if (prev_day!=''){
				if (prev_day!=v.day) {
					// Move one line down if text would go out of bounds
					if (canvas.width-posx < 75) {
						posx=20;
						posy+=30;
					}
					/*
					var text = new paper.PointText(new paper.Point(posx+5, posy+6));
					text.characterStyle = {
						fontSize: 14,
						fillColor: 'white',
						font: 'extravaganzzaBold',
					};
					text.content=v.day;
					*/
					posx+=100;
				}
			}
			// Move one line down if circle is out of bounds
			if (canvas.width-posx < 10) {
				posx=20;
				posy+=30;
			}
			v['destination'] = new Point(posx, posy);
			v['destination_size'] = ((v.magnitude * 2.5) - 5);
			v['move'] = true;
			posx+=25;
			prev_day=v.day;
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
			        if (v['dpt_redraw']) {
			            //console.log(v['destination'].x);
    				    v['dpt'].redraw(v['destination'].x);
    				    v['dpt_redraw'] = false;
				    }
				}
				if (v['move']) {
					var obj = v['eq_visual'];
					var vector = v['destination'] - obj.position;
					var vd = vectorDiff(v['destination'], obj.position, 4);
					obj.position = vd.new_pos;
					if (vd.dist < 1) {
						v['move'] = false;
						v['cleanup'] = true;
					}
					if (v['destination_size'] != v['size']) {
						obj.scale(v['destination_size']/v['size']);
						v['size'] = v['destination_size'];
					}
				}
				if (v['cleanup']) {
				  //console.log("cleanup");
				  v['cleanup'] = false;
				}
			});
		}
	}
	tool.onMouseDown = function(event) {
		var hitResult = project.hitTest(event.point, hitOptions);
		// Clear selected
		$.each(project.activeLayer.children, function(k, v) {
			v.unselect();
		});
		// Show selected
		if (hitResult && hitResult.item) {
			hitResult.item.parent.select();
			// Put selected data into Infobar
			refreshInfobar(hitResult.item.parent.data());
		}
	}
	refreshInfobar = function(data) {
		//data.day, data.depth, data.eqid, data.lat, data.lon, data.magnitude, data.region, data.src, data.time, data.timedate
		$(holderMagnitude).html(data.magnitude);
		$(holderDepth).html(Math.round(data.depth));
		$(holderTime).html(data.time);
		$(holderDate).html(data.day);
		$(holderRegion).html(truncate(data.region,35));
		$(holderLatlon).html(data.lat+'&deg;&nbsp;&nbsp;'+data.lon+'&deg;');
		$.each(holderIndicator, function(k, v) { v.removeClass('isel'); });
		$(holderIndicator[Math.floor(data.magnitude)]).addClass('isel');
	}
	// String Truncate
	var truncate = function (str, limit) {
		var bits, i;
		bits = str.split('');
		if (bits.length > limit) {
			for (i = bits.length - 1; i > -1; --i) {
				if (i > limit) { bits.length = i; }
				else if (' ' === bits[i]) { bits.length = i; break; }
			}
			bits.push('...');
		}
		return bits.join('');
	};
});