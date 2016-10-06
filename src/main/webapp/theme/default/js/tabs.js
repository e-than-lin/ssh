 var   showLoadingStr=" <div id=\"showLoading\" style=' width:100%;height:100% ;background-color:#ffffff; wZ-INDEX: 1000; right: 1px; POSITION: absolute; top: 0px;left:0px; '  >"+
	    "<table style='width:100%;height:100%;'><tr><td align=\"center\" valign=\"middle\" style='width:100%;height:100%;'>"+
	    "<img src=\"theme/default/img/main/load.gif\"  style=\"width:120px;height:120px;\"/>"+
	    "</td></tr></table>"+
	    "</div>";

function onTabClick(id,url){
 var  ul=document.getElementById("ul");
  for(var i=0;i<ul.children.length;i++)
  {
     ul.children[i].className ="";
  }
  document.getElementById(id).className ="current";
  var iframe=document.getElementsByTagName("iframe")[0];
  
    
  $(iframe).contents().find('body').html(showLoadingStr);

  
  iframe.src=url;

 

}




function fnNav(id,flag)
{
	
	$("#"+id+"").css("display",flag);
}

