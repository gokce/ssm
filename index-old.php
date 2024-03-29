<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
	<title>SEISMI - Earthquake visualization</title>
	<meta name="description" content="Seismi is an earthquake data visualization project which is using publicly available data provided by USGS and transforming it to a more informative, human readable and visually interesting form.">
  <meta name="keywords" content="earthquake, earthquakes, visualization, data visualization, infographics, paperjs, paper.js, paperscript, open data, open source">
  <meta name="author" content="Gokce Taskan, Niko Knappe">
  <!-- Open graph -->
	<meta property="og:title" content="SEISMI - Earthquake visualization"/>
	<meta property="og:type" content="website"/>
	<meta property="og:url" content="http://www.seismi.org/"/>
	<meta property="og:image" content="http://www.seismi.org/images/seismi-logo-90x90.png"/>
	<meta property="fb:admins" content="574510857,619437333"/>
	<meta property="og:site_name" content="SEISMI"/>
	<meta property="og:description" content="Seismi is an earthquake data visualization project which is using publicly available data provided by USGS and transforming it to a more informative, human readable and visually interesting form."/>
	<link rel="image_src" href="http://www.seismi.org/images/seismi-logo-90x90.png" />
	<!-- Google Plus -->
	<meta itemprop="name" content="SEISMI - Earthquake visualization">
  <meta itemprop="description" content="Seismi is an earthquake data visualization project which is using publicly available data provided by USGS and transforming it to a more informative, human readable and visually interesting form.">
  <meta itemprop="image" content="http://www.seismi.org/images/seismi-logo-90x90.png">
	<!-- CSS concatenated and minified via ant build script-->
  <link rel="stylesheet" href="css/style.css">
  <!-- end CSS-->
	<link rel="shortcut icon" href="images/favicon.png"> 
	<script src="//ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js"></script>
  <script>window.jQuery || document.write('<script src="js/libs/jquery-1.6.2.min.js"><\/script>')</script>
  <script type="text/javascript">
    (function() {
      var po = document.createElement('script'); po.type = 'text/javascript'; po.async = true;
      po.src = 'https://apis.google.com/js/plusone.js';
      var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s);
    })();
  </script>
</head>
<body class="lng">

	<img id="seismilogoicon" src="images/icon-main.gif" alt="" />
	<img id="seismilogo" src="images/seismi-logo.png" alt="Seismi" />
	<div id="introduction">
		<h1>Seismi is an earthquake data visualization project which is using publicly available data provided by <a href="http://www.usgs.gov/" title="USGS - U.S. Geological Survey">USGS</a> and transforming it to a more informative, human readable and visually interesting form.</h1>
		<a href="seismi.php" onclick="loading(1);" title="Launch Seismi" id="launch"><img src="images/button_launch.png" alt="Launch Seismi" /></a>
	</div>
	<div id="share-container">
  	<div id="share-buttons">
  		<div style="float:left; margin-right:12px;">
  			<a href="https://twitter.com/share" class="twitter-share-button" data-count="vertical" data-via="Seismi">Tweet</a><script type="text/javascript" src="//platform.twitter.com/widgets.js"></script>
  		</div>
  		<div style="float:left; margin-right:8px;">
  			<div id="fb-root"></div>
        <script>(function(d, s, id) {
          var js, fjs = d.getElementsByTagName(s)[0];
          if (d.getElementById(id)) {return;}
          js = d.createElement(s); js.id = id;
          js.src = "//connect.facebook.net/en_US/all.js#xfbml=1";
          fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));</script>
  			<div class="fb-like" data-href="http://www.seismi.org" data-send="false" data-layout="box_count" data-show-faces="false"></div>
  		</div>
  		<div style="float:left; padding-top:2px;">
  			<div class="g-plusone" data-size="tall"></div>
  		</div>
  	</div>
  </div>
<div id="container">
	<div id="info">
		<div id="i1">
			<h2>About Seismi</h2>
			<p>Seismi is an earthquake data visualization project which is using publicly available data provided by USGS and transforming it to a more informative, human readable and visually interesting form.</p>
			<p>Seismi is developed by:<br /> <a href="http://www.gokcetaskan.com">Gokce Taskan</a> and <a href="http://www.nikoknappe.com">Niko Knappe</a>.<br />Contact us at: info@seismi.org</p>
			<p>Seismi is proudly using <a href="http://www.paperjs.org/">Paper.js</a>!</p>
			<p>In order to use Seismi you need a modern browser (for e.g. <a href="http://www.google.com/chrome/" title="Google Chrome">Chrome</a> or <a href="http://www.apple.com/safari/" title="Safari browser">Safari</a>) &amp; to have javascript enabled.</p>
			<p>Take a look at the <a href="http://seismi.org/api/">API</a>.</p>
			<p>Seismi is licensed under a <a href="http://creativecommons.org/licenses/by-nc-sa/3.0/" title="Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported">Creative Commons BY-NC-SA 3.0 license</a>.</p>
		</div>
		<div id="i2"><h2>Twitter</h2><?php @include 'news/seismi_twitter.php'; ?></div>
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
<div id="copy">&copy; Seismi <?php print(Date("Y")); ?> &bull; Licensed under a <a href="http://creativecommons.org/licenses/by-nc-sa/3.0/" title="Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported">Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported</a> License.</div>
<?php 
$ip = $_SERVER["SERVER_ADDR"];
if ($ip == '::1' || $ip == '127.0.0.1') {
  echo 'local';
} else { ?>
  <script>
    window._gaq = [['_setAccount','UA8957719-1'],['_trackPageview'],['_trackPageLoadTime']];
    Modernizr.load({
      load: ('https:' == location.protocol ? '//ssl' : '//www') + '.google-analytics.com/ga.js'
    });
  </script>
  <script>
  var pkBaseURL = (("https:" == document.location.protocol) ? "https://www.writebox.net/piwik/" : "http://www.writebox.net/piwik/");
  document.write(unescape("%3Cscript src='" + pkBaseURL + "piwik.js' type='text/javascript'%3E%3C/script%3E"));
  </script><script type="text/javascript">
  try {
  var piwikTracker = Piwik.getTracker(pkBaseURL + "piwik.php", 2);
  piwikTracker.trackPageView();
  piwikTracker.enableLinkTracking();
  } catch( err ) {}
  </script>
<?php } ?>
</body>
</html>