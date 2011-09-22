<?php
/*
$allowed_ips = array('127.0.0.1','::1');
if(!in_array($_SERVER['REMOTE_ADDR'],$allowed_ips)){
    header("Location: http://www.seismi.org/api");
    exit;
} else {
  $r = (isset($_GET['r'])) ? $_GET['r'] : '';
  $p = (isset($_GET['p'])) ? $_GET['p'] : '';

  callAPI($r,$p);
}
*/

function is_xhr() {
    return @ $_SERVER[ 'HTTP_X_REQUESTED_WITH' ] === 'XMLHttpRequest';
  }

if( is_xhr() ){
  $r = (isset($_GET['r'])) ? $_GET['r'] : '';
  $p = (isset($_GET['p'])) ? $_GET['p'] : '';
  callAPI($r,$p);
} else {
  header( 'Location: http://www.seismi.org/api');
}

function callAPI($resources='',$parameters='') {
	// Call API
  $jsonurl = 'http://www.seismi.org/api/'.$resources.'?'.$parameters;
  $json = file_get_contents($jsonurl,0,null,null);
  
  echo $json;
  
  // $ch = curl_init();
  // // set URL and other appropriate options
  // curl_setopt($ch, CURLOPT_URL, 'http://www.seismi.org/api/eqs/'.resources.'?'.parameters);
  // curl_setopt($ch, CURLOPT_HEADER, 0);
  // 
  // curl_exec($ch);
  // curl_close($ch);
}
?>