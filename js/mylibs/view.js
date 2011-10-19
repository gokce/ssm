$(document).ready(function() {
	paper.install(window);
	$.data_loaded = false;
	$.seismi.currentzoom = 0;
	$.seismi.currentzoom = 0;
	$.seismi.moveview = false;
	$.seismi.eqsmoving = true;
	$.seismi.altkey = false;
	
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
	$('#navi').find('.'+current_view).addClass('selected');
	var current_selection;
	var eq_count;
	
	// init Map
	$("#mapcontainer").mapbox({
    pan: false,
    callAfter: function(l, x, y, v) {project.activeLayer.translate(new Point(x,y));}
  });
	var map_size = {};
	map_size['0'] = {'width':1000,'height':503};
	map_size['1'] = {'width':$("#map-2000").width(),'height':$("#map-2000").height()};
	map_size['2'] = {'width':$("#map-4000").width(),'height':$("#map-4000").height()};
	map_size['3'] = {'width':$("#map-16000").width(),'height':$("#map-16000").height()};
	var draggingAllowed = true;
	var defaultSpeed = 4;
	var speed = defaultSpeed;
	
	var controlbuttons = {};
	controlbuttons['dpt'] = ['b-left','b-right'];
	controlbuttons['tml'] = ['b-left','b-right'];
	controlbuttons['lst'] = ['b-up','b-down'];
	controlbuttons['map'] = ['b-zoom-in','b-zoom-out'];
	controlbuttons['nst'] = [];
	
	$(window).resize(function() {
		show(current_view);
	});
	var mapcontainer = $("#mapcontainer");
	$("#b-zoom-in").click(function(){zoom(2)});
	$("#b-zoom-out").click(function(){zoom(0)});
	$("#b-left").click(function(){move('right',canvas.width/2)});
	$("#b-right").click(function(){move('left',canvas.width/2)});
	$("#b-up").click(function(){move('up',canvas.width/2)});
	$("#b-down").click(function(){move('down',canvas.width/2)});
	
	$('.nst').click(function(){show('nst');});
	$('.map').click(function(){$.seismi.currentzoom = 0; show('map');});
	$('.dpt').click(function(){show('dpt');});
	$('.lst').click(function(){show('lst');});
	$('.tml').click(function(){show('tml');});
	
	$('#tectonic').click(function(){$("#tectonic span").toggle();});
	$('#volcanoes').click(function(){$("#volcanoes span").toggle();});
	
	// Shortcuts
	$(document).keydown(function(e) {
	  if ($.seismi.moveview) { return; }
		var code = (e.keyCode ? e.keyCode : e.which);
		if (e.altKey) { $.seismi.altkey = true;} 
		//if(code == 49 || code == 78) { show('nst'); } // 1 or n = NST
		if(code == 49 || code == 97  || code == 77) { show('map'); } // 1 or m = MAP
		if(code == 50 || code == 98  || code == 84) { show('tml'); } // 2 or t = TML
		if(code == 51 || code == 99  || code == 68) { show('dpt'); } // 3 or d = DPT
		if(code == 52 || code == 100 || code == 76) { show('lst'); } // 4 or l = LST
		if(code == 48 || code == 96) { selectNewestEarthquake();  } // 0 or 0numba = Select newest earthquake
		if(code == 37 && $.seismi.altkey == false) { selectNextEarthquake(); }    // left arrow = select next earthquake
		if(code == 39 && $.seismi.altkey == false) { selectPreviousEarthquake(); }// right arrow = select prev earthquake
		if ($.seismi.data_loaded == false) { return; }
		if ($.seismi.eqsmoving) { return; }
		if(code == 37 && e.altKey && (current_view == 'dpt' || current_view == 'tml')) { move('right',canvas.width-100); } // move left
		if(code == 39 && e.altKey && (current_view == 'dpt' || current_view == 'tml')) { move('left',canvas.width-100); } // move right
		if(code == 40 && e.altKey && current_view == 'lst') { move('up',100); } // move up
		if(code == 38 && e.altKey && current_view == 'lst') { move('down',100); } // move down
		if((code == 107 || code == 61 || code == 187 ) && current_view == 'map') { zoom(2) } // + = zoom in
		if((code == 109 || code == 189) && current_view == 'map') { zoom(0) } // - = zoom out
		if(code == 37 && e.altKey && current_view == 'map') { $("#mapcontainer").mapbox("left",40); }
		if(code == 38 && e.altKey && current_view == 'map') { $("#mapcontainer").mapbox("up",40); }
		if(code == 39 && e.altKey && current_view == 'map') { $("#mapcontainer").mapbox("left",-40); }
		if(code == 40 && e.altKey && current_view == 'map') { $("#mapcontainer").mapbox("up",-40); }
		if(code == 82) { $('#eqrawdata').animate({width:'toggle'}, 200); } // 82 = r = show raw data
		if(code == 70) { //70 = f = show/hide mainbar
			$('#sidebar').animate({width:'hide'}, 300);
			$('#eqrawdata').animate({width:'hide'}, 300);
			$('#mainbar').fadeToggle(300, "linear");
		}
	});
	$(document).keyup(function(e) {
	  if (e.altKey) { $.seismi.altkey = false;} // make alt state false
	});
	zoom = function(level) {
	  if ($.seismi.eqsmoving) { return; }
		speed = 1;
		//mapcontainer.mapbox("right",300);
		mapcontainer.mapbox("zoomTo",level);
		$.seismi.currentzoom=level;
		show(current_view);
	}
	
	move = function(direction, amount) {
	  if ($.seismi.eqsmoving) { return; }
	  var x=0;
	  var y=0;
	  var bounds = project.activeLayer.bounds;
	  switch(direction) {
    case 'left':
      x = amount;
      if (bounds.x+bounds.width<=canvas.width+100) { x = 0; }
      break;
    case 'right':
      x = -amount;
      if (bounds.x>=0) { x = 0; }
      break;
    case 'up':
      y = -amount;
      if (bounds.y>=0) { y = 0; }
      break;
    case 'down':
      y = amount;
      if (bounds.y+bounds.height<=100) { y = 0; }
      break;
    }
    $.seismi.moveview = true;
    $.seismi.destination = new Point(project.activeLayer.position.x-x,project.activeLayer.position.y-y)
    //project.activeLayer.translate(new Point(x,y));
	}
	
	show = function(view_name) {
	  if ($.seismi.moveview) { return; }
	  $.seismi.eqsmoving = true;
		canvas = {'width':view._viewSize._width, 'height':view._viewSize._height};
		$('#navi').find('.'+current_view).removeClass('selected');
		$('#navi').find('.'+view_name).addClass('selected');
		if (current_view != 'hlp'){ // remove help overlay, if entering some other view
		  $('#help').delay(100).fadeOut(500);
		}
		current_view = view_name;
		$.each($.seismi.data.earthquakes, function(k, v) {
			$.each(views, function(k2, v2) {
				if (v[v2] != null) v[v2].disable();
			});
		});
		
		// Enable/Disable tectonic & volcanoes buttons and change their state
		if (view_name == 'map' || view_name == 'nst') {
			$('#mapcontainer').fadeIn(400);
		  // $('#tec2').find('.tt').removeClass('disable'); // enable tectonic controls
  	  // $('#vol2').find('.tt').removeClass('disable'); // enable volcano controls
		} else {
		$('#mapcontainer').fadeOut(400);
			$('#tec2').find('.tt').addClass('disable'); // disable tectonic controls
			$('#vol2').find('.tt').addClass('disable'); // disable volcano controls
		}
		window['show_'+current_view]($.seismi.data.earthquakes);
		$('#controlbuttons').children().hide();
		$.each(controlbuttons[view_name], function(k, v){ $('#controlbuttons').find('#'+v).show()});
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
	var holderTimebar = $('#sidebar');
	var holderIndicator = {}
	holderIndicator['4'] = $('#mag2').find('.i4');
	holderIndicator['5'] = $('#mag2').find('.i5');
	holderIndicator['6'] = $('#mag2').find('.i6');
	holderIndicator['7'] = $('#mag2').find('.i7');
	
	$.visualizations = {
		refresh: function() {
			canvas = {'width':view._viewSize._width, 'height':view._viewSize._height};
			project.activeLayer.removeChildren()
			eq_count = $.seismi.data.earthquakes.length;
			$.each($.seismi.data.earthquakes, function(k, v) {
				initx = Math.random()*view._viewSize._width;
				inity = Math.random()*-100;
				initsize = 6;
				
				// Circle
				var eq_circle = new Path.Circle(new Point(initx, inity), initsize);
				colors = ['#A3CC29','#FFE24D','#CC671F','#B30000','#B30000'] //with eq-colors
				//colors = ['#0044cc','#0044cc','#0044cc','#0044cc'] // only blue
				//eq_circle.fillColor = colors[Math.floor(v.magnitude)-4];
				eq_circle.fillColor = '#0044cc';
				eq_circle.opacity = ((v.magnitude / 15) + 0.3);
				eq_circle.name = 'fill';

				// Selection Stroke
				var eq_stroke = new Path.Circle(new Point(initx, inity), initsize);
				eq_stroke.strokeWidth = 3;
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
					current_selection = k;
					v['raw_line_select']();
					refreshInfobar(v);
				}
				// Unselect
				eq_visual['unselect'] = function() {
					eq_stroke.strokeColor = null;
				}
				// Return Eq data
				eq_visual['data'] = function() {
					return v;
				}
				
				v['nst'] = setup_extra(v);
				v['map'] = setup_extra(v);
				v['tml'] = setup_extra(v);
				v['dpt'] = setup_extra(v);
				v['lst'] = setup_extra(v);
				
				v['eq_visual'] = eq_visual;
				v['move'] = false;
				v['resize'] = false;
				v['destination'] = -1;
				v['size'] = initsize;
				v['destination_size'] = initsize;
				$.data_loaded = true;
			});
			view.draw();
			show(current_view);
		}
	}
	setup_extra = function(data) {
		var extra_group = new Group();
		extra_group['enable'] = function() {}
		extra_group['disable'] = function() {extra_group.removeChildren();}
		extra_group['select'] = function() {}
		extra_group['unselect'] = function() {}
		extra_group['data'] = function() {}
		return extra_group;
	}
	
	// NEWEST VIEW //
	show_nst = function(data) {
    $.each(data, function(k, v) {
			map_w = map_size['3'].width;
			map_h =map_size['3'].height;
			$("#mapcontainer").mapbox("zoomTo",3);
			xoffset = (canvas.width-map_w)/2;
			yoffset = (canvas.height-map_h)/2;
			x = mapValues(v.lon, -180, 180, xoffset, xoffset+map_w);
			y = mapValues(v.lat, 90, -90, yoffset, yoffset+map_h);
			var point = new Point(x,y);
			v['destination'] = point;
			v['destination_size'] = mapValues(v.magnitude, 4, 9, 10, 80);
			v['resize'] = true;
			v['move'] = true;
		});
		//project.activeLayer.translate(project.activeLayer.position - $.seismi.data.earthquakes[0].eq_visual.position);
	}
	
	// MAP VIEW //
	show_map = function(data) {
		$.each(data, function(k, v) {
			currentzoom = $.seismi.currentzoom;
			mapcontainer.mapbox("zoomTo",currentzoom);
			map_w = map_size[currentzoom].width;
			map_h =map_size[currentzoom].height;
			xoffset = (canvas.width-map_w)/2;
			yoffset = (canvas.height-map_h)/2;
			x = mapValues(v.lon, -180, 180, xoffset, xoffset+map_w);
			y = mapValues(v.lat, 90, -90, yoffset, yoffset+map_h);
			var point = new Point(x,y);
			v['destination'] = point;
			//console.log(v.lat);
			v['destination_size'] = mapValues(v.magnitude, 4, 9, 2, 2);
			v['resize'] = true;
			v['move'] = true;
		});
	}
	
	// TIMELINE VIEW //
	show_tml = function(data) {
		barwidth=300;
		posx=50;
		posy=(canvas.height - 106);
		prev_day = '';
		$.each(data, function(k, v) {
			// Check if current earthquake is in a new day
			if (prev_day=='') {
			  prev_day=v.day;
			}
			if (prev_day!=v.day || k==data.length-1){
			  if (prev_day==v.day && k==data.length-1) {posx+=-barwidth-20;}
				// add box
				var daybox = new Path.Line(new Point(newx,posy),new Point(newx-barwidth,posy));
				daybox.strokeColor = 'white';
				daybox.strokeWidth = 4;
				v['tml'].addChild(daybox);
				
				// add text
				var text = new paper.PointText(new paper.Point(newx-64, posy+26));
				text.characterStyle = {
					fontSize: 14,
					fillColor: 'white',
					font: 'extravaganzzaBold',
				};
				text.content=prev_day;
				v['tml'].addChild(text);
  		  prev_day=v.day;
  		  // move barwidth + pixels left to new day
  			posx += barwidth+20;
			}
			newx = canvas.width-posx;
			newy = mapValues(v.magnitude, 4, 9, (posy-20), -50);
		  minutes = parseInt(v.time.split(":")[0]*60)+parseInt(v.time.split(":")[1])
		  xoffset = mapValues(minutes, 0, 24*60, barwidth, 0);
			v['destination'] = new Point(newx-xoffset,newy);
			v['destination_size'] = mapValues(v.magnitude, 4, 9, 10, 100);
			v['resize'] = true;
			v['move'] = true;
		});
	}
	
	// DEPTH VIEW //
	show_dpt = function(data) {
		posx=100;
		barwidth=0;
		posy=75;
		prev_day = '';
		$.each(data, function(k, v) {
			newx = canvas.width-posx;
			newy = posy+(Math.floor(v.depth)/1.2);
			v['destination'] = new Point(newx,newy);
			v['destination_size'] = mapValues(v.magnitude, 4, 9, 10, 180);
			v['resize'] = true;
			v['move'] = true;
			
			// add white depthlines
			var depthline = new Path.Line(new Point(newx,posy-10), new Point(newx,newy));
			depthline.strokeColor = 'white';
			depthline.strokeWidth = 4;
			v['dpt'].addChild(depthline);
      
			// Check if current earthquake is in a new day
			
			if (prev_day=='') {
			  prev_day = v.day;
			}
			if (prev_day!=v.day || k==data.length-1){
			  if (prev_day==v.day && k==data.length-1) {newx-=50;barwidth+=1;}
				// add daybox
				var daybox = new Path.Line(new Point(newx+48,posy-18), new Point(newx+2+(barwidth*50),posy-18));
				daybox.strokeColor = 'white';
				daybox.strokeWidth = 16;
				v['dpt'].addChild(daybox);
				
				// add text
				if (barwidth>1) {
  				var text = new paper.PointText(new paper.Point(newx-63+(barwidth*50), posy-38));
  				text.characterStyle = {
  					fontSize: 14,
  					fillColor: 'white',
  					font: 'extravaganzzaBold',
  				};
  				text.content=prev_day;
  				v['dpt'].addChild(text);
				}
				
				barwidth=0;
  		  prev_day=v.day;
			}
			
			// move next eq 50 pixels left
			posx+=50;
			barwidth+=1;
		});
	}
	
	// LIST VIEW //
	show_lst = function(data) {
		posx=20;
		posy=20;
		// Store previous day
		prev_day = ''
		// For each earthquake in data
		$.each(reverse(data), function(k, v) {
			// v.day, v.depth, v.eqid, v.lat, v.lon, v.magnitude, v.region, v.src, v.time, v.timedate
			// Check if current earthquake is in a new day
			if (prev_day!='' && prev_day!=v.day){
				// Move one line down if text would go out of bounds
				if (canvas.width-posx < 120) {
					posx=20;
					posy+=30;
				}
				var text = new paper.PointText(new paper.Point(posx+5, posy+6));
				text.characterStyle = {
					fontSize: 14,
					fillColor: 'white',
					font: 'extravaganzzaBold',
				};
				text.content=v.day;
				v['lst'].addChild(text);
				posx+=100;
			}
			// Move one line down if circle is out of bounds
			if (canvas.width-posx < 55) {
				posx=20;
				posy+=30;
			}
			v['destination'] = new Point(posx, posy);
			v['destination_size'] = mapValues(v.magnitude, 4, 9, 2, 20);
			v['resize'] = true;
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
				  draggingAllowed = false;
					var obj = v['eq_visual'];
					var vd = vectorDiff(v['destination'], obj.position, speed);
					obj.position = vd.new_pos;
					if (vd.dist < 1) {
						v['move'] = false;
						if (k == eq_count-1) {
						  draggingAllowed = true;
    				  speed = defaultSpeed;
    				  $.seismi.eqsmoving = false;
						}
					}
					if (v['resize']) {
					  var diff_size = v['destination_size']-v['size'];
					  var dest_size = v['size']+(diff_size/speed);
					  obj.scale(dest_size/v['size']);
					  v['size'] = dest_size;
            if (Math.abs(diff_size) <= 0.3) {
              v['resize'] = false;
            }
  			  }
				}
			});
			if ($.seismi.moveview) {
			  var pos = project.activeLayer.position;
			  var view_vd = vectorDiff($.seismi.destination,pos,2);
			  project.activeLayer.position = view_vd.new_pos;
			  if (view_vd.dist < 1) {
			    $.seismi.moveview = false; 
			  }
			}
		}
	}
	//tool.distanceThreshold = 50;
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
		}
		//$("#mapcontainer").mapbox("zoomTo",4);
	}
	tool.onMouseDrag = function(event) {
	  if ($.seismi.eqsmoving) { return; }
    var vector = event.delta;
    var direction;
    if (vector.x != 0) {
      direction = 'left';
      if (vector.x < 0) { direction = 'right';}
      $("#mapcontainer").mapbox(direction,Math.abs(vector.x));
    }
  	if (vector.y != 0) {
  	  direction = 'up';
  	  if (vector.y < 0) { direction = 'down'; }
  	  $("#mapcontainer").mapbox(direction,Math.abs(vector.y)); 
  	}
	}
	
	selectNewestEarthquake = function() {
	  $.selectEarthquake(0);
	  show(current_view);
	}
	selectNextEarthquake = function() {$.selectEarthquake(current_selection+1);}
	selectPreviousEarthquake = function() {$.selectEarthquake(current_selection-1);}
	
	$.selectEarthquake = function(key) {
	  if ((key>=0) && (key<eq_count)) {
  	  $.each(project.activeLayer.children, function(k, v) {
  			v.unselect();
  		});
  		$.seismi.data.earthquakes[key].eq_visual.select();
		}
	}
	
	refreshInfobar = function(data) {
		//data.day, data.depth, data.eqid, data.lat, data.lon, data.magnitude, data.region, data.src, data.time, data.timedate
		$(holderMagnitude).html(data.magnitude);
		$(holderDepth).html(Math.round(data.depth));
		$(holderTime).html('<span id="utc">UTC</span>'+data.time);
		$(holderDate).html(data.day);
		$(holderRegion).html(truncate(data.region,35));
		$(holderLatlon).html(data.lat+'&deg;&nbsp;&nbsp;'+data.lon+'&deg;');
		$.each(holderIndicator, function(k, v) { v.removeClass('isel'); });
		$(holderIndicator[Math.floor(data.magnitude)]).addClass('isel');
	}
	mapValues = function(value, istart, istop, ostart, ostop) {
		return ostart + (ostop - ostart) * ((value - istart) / (istop - istart));
	}
	// String Truncate
	truncate = function (str, limit) {
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
	reverse = function(a) {
	  var temp = [];
    var len = a.length;
    for (var i = (len - 1); i >= 0; i--) {
      temp.push(a[i]);
    }
    return temp;
  }
});