<!DOCTYPE html>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
	<title>SEISMI - visualizing earthquakes</title>
	<link type="text/css" href="style.css" rel="stylesheet" />
	<link rel="shortcut icon" href="images/favicon.png"> 
	<script type="text/javascript" src="js/jquery-1.6.2.min.js"></script>
	<script type="text/javascript" src="js/jquery.mousewheel.min.js"></script>
	<script type="text/javascript" src="js/mapbox.mod.js"></script>
	<script type="text/javascript" src="js/paper.js"></script>
	<script type="text/javascript" src="js/ui.js"></script>
	<script type="text/javascript" src="js/eqs.js"></script>
	<script type="text/javascript" src="js/view.js"></script>
</head>
<body>
<canvas id="viewcanvas" resize keepalive="true"></canvas>
	<div id="mapcontainer">
		<div id="map-1000"><!--top level map content goes here--></div>
		<div id="map-2000">
			<img src="images/map-2000.png" alt="" /> 
			<div class="mapcontent"><!--map content goes here--></div>
		</div>
		<div id="map-4000"> 
			<img src="images/map-4000.png" alt="" /> 
			<div class="mapcontent"><!--map content goes here--></div>
		</div>
	</div>
	<div id="mainbar">
		<div id="logo"><a href="seismi.php" title="reload page"><img src="images/seismi-logo.png" alt="Seismi" /></a></div>
		<ul id="navi">
			<li class="nst" title="Nearest View">NST</li>
			<li class="map" title="Map View">MAP</li>
			<!--<li class="tml" title="Timeline View">TML</li>-->
			<li class="dpt" title="Depth View">DPT</li>
			<li class="lst" title="List View">LST</li>
			<li class="hlp" title="Help">?</li>
		</ul>
		<div id="mag1"><div id="mag2"><a href="#" class="tt" title="Depth for selected earthquake"><em id="depth">255</em><em id="depthunit">km</em></a><a href="#" class="tt" title="Magnitude value for selected earthquake"><em id="magnitude">6.4</em></a><div class="i4"></div><div class="i5"></div><div class="i6 isel"></div><div class="i7"></div></div></div>
		<div id="tec1"><div id="tec2"><a href="#" class="tt" title="show/hide tectonic plates"><em id="tectonic">0FF</em></a></div></div>
		<div id="vol1"><div id="vol2"><a href="#" class="tt disable" title="show/hide volcanoes"><em id="volcanoes">0FF</em></a></div></div>
		<div id="tim1"><div id="tim2"><a href="#" class="tt" title="Date and time for selected earthquake"><em id="date">10.9.2010</em><em id="time">14:55</em></a></div></div>
		<div id="loc1"><div id="loc2"><a href="#" class="tt" title="Location area &amp; Longitude/Latitude cordinates for selected earthquake"><em id="region">Area, Country</em><em id="latlon">90.0000&deg;&nbsp;&nbsp;-180.0000&deg;</em></a></div></div>
		<div id="butr"></div><div id="buth"></div>
	</div>
	
	<div id="controlbuttons">
		<div id="b-zoom-in"></div><div id="b-zoom-out"></div>
		<div id="b-left"></div><div id="b-right"></div>
		<div id="b-up"></div><div id="b-down"></div>
	</div>
	<div id="eqrawdata">
		<ul>
			<li class="info"># raw earthquake data<br /> # number of earthquakes: 0</li>
			<li>Refreshing earthquake data. Please wait.</li>
		</ul>
	</div>

	<div id="bringsidebarhandle"></div><div id="bringsidebarborder"></div>
	<div id="sidebar">
		<ul class="ulmagnitude">
			<li>FILTER BY: MAGNITUDE</li>
			<li class="selected">&gt; 4 <em class="count">0</em><em class="var">4</em><em class="type">magnitude</em><span class="circ_eq4">&bull;</span></li>
			<li>&gt; 5 <em class="count">0</em><em class="var">5</em><em class="type">magnitude</em><span class="circ_eq5">&bull;</span></li>
			<li>&gt; 6 <em class="count">0</em><em class="var">6</em><em class="type">magnitude</em><span class="circ_eq6">&bull;</span></li>
			<li>&gt; 7 <em class="count">0</em><em class="var">7</em><em class="type">magnitude</em><span class="circ_eq7">&bull;</span></li>
		</ul>
		<ul class="ultime">
			<li>FILTER BY: TIME</li>
			<li class="latest selected"> 400 LATEST <em class="count">400</em><em class="var"></em><em class="type">time</em></li>
		<?php
		$curYear = date('Y');
		$curMonth = date('m');
		for ($i=$curYear;$i>=2010;$i--) {
			echo '<li class="year"> '.$i.' <em class="count">0</em><em class="var">'.$i.'</em><em class="type">time</em></li>';
			$startMonth = 12;
			if ($i==$curYear) {
				$startMonth = (int)$curMonth;
			}
			for ($j=$startMonth;$j>=1;$j--) {
				$j = ($j<10) ? "0$j" : $j;
				echo '<li>'.monthName($j).' '.$i.' <em class="count">0</em><em class="var">'.$i.'/'.$j.'</em><em class="type">time</em></li>';
			}
		}
		
		function monthName($month_int) {
			$month_int = (int)$month_int;
			$timestamp = mktime(0, 0, 0, $month_int);
			return date("F", $timestamp);
		}
		?>
		</ul>
	</div>
	<div id="help"></div><div id="help6"></div><div id="help1"></div><div id="help2"></div><div id="help3"></div><div id="help4"></div><div id="help5"></div>
	<div id="intro"><div id="intro-container"><img src="images/beginning.png" id="beginning-img" width="360" height="300" alt="beginning info" /><img src="images/loading-main.gif" id="loading" width="50" height="22" alt="loading..." /></div></div>
</body>
</html>