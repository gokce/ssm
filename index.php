<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
<head>
	<title>Seismi - Earthquake visualization</title>
	<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1"/>
	<link href="styles.css" rel="stylesheet" type="text/css" media="all"/>
	<link rel="shortcut icon" href="images/favicon.png"> 
	<script type="text/javascript" src="js/jquery-1.6.2.min.js"></script>
</head>
<body>
	<img id="logo" src="images/seismi-logo.png" alt="Seismi" />
	<div id="intro-top"></div>
	<div id="intro">
		<h1>Seismi is an earthquake data visualization project which is using publicly available data provided by <a href="http://www.usgs.gov/" title="USGS - U.S. Geological Survey">USGS</a> and transforming it to a more informative, human readable and visually interesting form.</h1>
		<a href="seismi.php" onclick="loading(1);" title="Launch Seismi" id="launch"><img src="images/button_launch.png" alt="Launch Seismi" /></a>
	</div><div id="intro-bot"></div>
<div id="container">
	<div id="info">
		<div id="i1">
			<h2>About Seismi</h2>
			<p>Seismi is an earthquake data visualization project which is using publicly available data provided by USGS and transforming it to a more informative, human readable and visually interesting form.</p>
			<p>In order to use Seismi you need a modern browser &amp; to have javascript enabled</p>
			<p>Take a look at the <a href="http://seismi.org/api/">API</a>.</p>
		</div>
		<div id="i2">
			<h2>Twitter</h2>
			<!--<?php include('news/seismi_twitter.php'); ?>-->
		</div>
		<div id="i3">
			<h2>Disclaimer</h2>
			<p>This is a data visualization software set with the informations provided from the web sources.</p>
			<p>These informations are only provided for just data updating and especially not provided to warn or awaken against the earthquakes or any natural or subnatural movements or events. It is not meant to be used for scientific purposes.</p>
			<p>Visualization is based on data collected from <a href="http://www.usgs.gov/" title="USGS - U.S. Geological Survey">USGS</a> earthquake database.</p>
			<p>Data for volcanoes is collected from <a href="http://www.ngdc.noaa.gov" title="National Geophysical Data Center (NGDC)">NGDC</a>.</p>
			<p>Data for tectonic plates is collected from <a href="http://www.ig.utexas.edu/research/projects/plates/" title="University of Texas - Institute for Geophysics">UTIG</a>.</p>
			<p>The software is provided "as is", without warranty of any kind, express or implied, including but not limited to the warranties of merchantability, reality or accuracy for a particular purpose and non-infringement. In no event shall the authors or copyright holders be liable for any claim, damages or other liability, whether in an action of contract, tort or otherwise, arising from, out of or in connection with the software or the use or other dealings in the software.</p>
			<p>By clicking "LAUNCH SEISMI" button you accept these terms and conditions.</p>
		</div>
	</div>
</div>
<div id="copy">&copy; Seismi <?php print(Date("Y")); ?></div>
</body>
</html>