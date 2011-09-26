$(document).ready(function() {
	var start_time = +new Date();
	
	$.seismi = {
		min_magnitude : 4,
		data : new Object(),
		modified : '',
		timefilter : ''
	};
	
	callAPI();
	
	function callAPI(resources,parameters) {
	  resources = (typeof resources == 'undefined') ? '' : resources;
		parameters = (typeof parameters == 'undefined') ? '' : parameters;
		// Call API
		$.getJSON('call_api.php?r=eqs/'+resources+'&p='+parameters, function(data) {
			$.seismi.data = data;
			refreshData($.seismi.data);
		});
	}
	
	function refreshData(data) {
		// Reformat data
		$.each(data.earthquakes, function(key, val) {
			var timedateSplit = val.timedate.split(' ');
			var dateSplit = timedateSplit[0].split('-');
			var printDate = dateSplit[2]+"."+dateSplit[1]+"."+dateSplit[0].slice(2,4);
			val.day = printDate;
			val.time = timedateSplit[1].slice(0,5);
			val.region = val.region.capitalize();
		});
		
		// Clear selected info area
		
		// Refresh raw data
		var holder_rawdata = $('#eqrawdata').find('ul');
		holder_rawdata.empty();
		holder_rawdata.append('<li># raw earthquake data<br /> # number of earthquakes: '+data.count+'</li>');
		$.each(data.earthquakes, function(key, val) {
			//console.log(val.magnitude);
			holder_rawdata.append('<li><em class="day">'+val.day+'</em> - <em class="time">'+val.time+'</em>&nbsp;&nbsp;[&nbsp;&nbsp;<em class="magnitude">'+val.magnitude+'</em>&nbsp;&nbsp;]&nbsp;&nbsp;&nbsp;[&nbsp;&nbsp;<em class="location">'+val.lat+'&deg; '+val.lon+'&deg;</em>&nbsp;&nbsp;]&nbsp;&nbsp;Near: <em class="near">'+val.region+'</em></li>');
		});
		
		// Refresh filter button counts - magnitude
		if ($.seismi.modified != 'magnitude') {
			/*
			counts = countFilters(data.earthquakes);
			//console.log(counts);
			var holder_filters_magnitude = $('#timebar').find('.ulmagnitude').find('li').next();
			holder_filters_magnitude.each(function(i){
				min_mag = $(this).find('em.var').html();
				count = counts.magnitude[min_mag] ? counts.magnitude[min_mag] : 0;
				$(this).find('.count').html(count);
			});
			*/
			
			$.getJSON('call_api.php?r=totals/magnitude/'+$.seismi.timefilter, function(data) {
				var counts = new Object();
				var i=9;
				while (i--) {
					counts[i] = 0;
				}
				jQuery.each(data, function(i, val) {
					while (i) {
						//console.log(i-1);
						counts[String(i)] += parseInt(val);
						i--;
					}
				});
				
				var holder_filters_magnitude = $('#timebar').find('.ulmagnitude').find('li').next();
				holder_filters_magnitude.each(function(i){
					min_mag = $(this).find('em.var').html();
					count = counts[min_mag] ? counts[min_mag] : 0;
					$(this).find('.count').html(count);
				});
				
			});
		}
		if ($.seismi.modified != 'time') {
			$.getJSON('call_api.php?r=totals&p=min_magnitude='+$.seismi.min_magnitude, function(data) {
				//console.log(data);
				var holder_filters_magnitude = $('#timebar').find('.ultime').find('li').next();
				holder_filters_magnitude.each(function(i){
					time_str = $(this).find('em.var').first().html();
					time_str = time_str.replace("/", ".");
					//console.log(data);
					count = data[time_str] ? data[time_str] : 0;
					$(this).find('.count').html(count);
				});
			});
		}
		$.seismi.modified = '';
		
		// Everything is loaded. Refresh visualization
		elapsed = (+new Date()-start_time);
		if (elapsed >= 3000) {
		  $.init_vis.refresh();
		} else {
		  var t = setTimeout("$.init_vis.refresh()", 3000-elapsed);
		}
	}
	$.init_vis = {
	  refresh: function() {
	    $.visualizations.refresh();
  	  $('#intro').fadeOut(200);
    }
  }
	
	// Filters
	setFilterButtons('.ulmagnitude');
	setFilterButtons('.ultime');
	function setFilterButtons(listName) {
		var holder_filters_magnitude = $('#timebar').find(listName).find('li').next();
		holder_filters_magnitude.each(function(i){
			$(this).bind("click", function(){
				holder_filters_magnitude.each(function(i){
					$(this).removeClass("selected");
				});
				$(this).addClass("selected");
				// Refresh Data
				var varr = $(this).find('.var').html();
				var type = $(this).find('.type').html();
				
				$.seismi.modified = type;
				if (type == 'magnitude') {
					$.seismi.min_magnitude = varr;
				} else if (type == 'time') {
					$.seismi.timefilter = varr;
				}
				callAPI($.seismi.timefilter,'min_magnitude='+$.seismi.min_magnitude);
			})
		});
	}
	
	String.prototype.capitalize = function() {
	    return this.charAt(0).toUpperCase() + this.slice(1);
	}
	function countFilters(a) {
		var b = {}, i = a.length, j, mag;
		b.magnitude = {};
		while ( i-- ) {
			mag = Math.floor(a[i].magnitude);
			j = b['magnitude'][mag];
			b['magnitude'][mag] = j ? j+1 : 1;
		}
		return b;
	}
	
	function countValues(a) {
		var b = {}, i = a.length, j;
		while( i-- ) {
			j = b[a[i]];
			b[a[i]] = j ? j+1 : 1;
		}
		return b;
	}
	
});