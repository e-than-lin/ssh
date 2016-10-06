<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    
<html>
<head>
<meta charset="utf-8">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0, minimum-scale=1.0, maximum-scale=1.0">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black">
<script type="text/javascript" src="<%=request.getContextPath()%>/theme/default/js/jquery/jquery-1.8.2.min.js"></script>
<script>
$("document").ready(function(){
	var height=$(window).height()+50;
	$("#showLoading").css('height',height);
	$("#tabLoading").css('height',height);
	$("#tdLoading").css('height',height);
});
</script>
</head>
<body>
	<div id="showLoading" style='display:none;background:#ffffff;position:absolute; width:100%;top:0px;bottom:0px;wZ-INDEX:1000;z-index:10;'>
		 <table id="tabLoading" style='width:100%;'><tr><td id="tdLoading" align="center" valign="middle" style='width:100%;' >
			<img src="<%=request.getContextPath()%>/theme/default/css/mobile-css/images/ajax-loader.gif"  style="width:32px;height:32px;"/>
			</td></tr>
		</table>
	</div>
</body>
</html>