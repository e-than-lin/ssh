<%@ page language="java" contentType="text/html; charset=UTF-8"
	import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<!DOCTYPE html>
<html>
<head>
<link rel="stylesheet" type="text/css" href="<%= request.getContextPath()%>/theme/default/css/default.css">
<script type="text/javascript" src="<%=request.getContextPath()%>/theme/default/js/default.js"></script>	
<script type="text/javascript" src="<%=request.getContextPath()%>/theme/default/js/treeGrid/TreeGrid.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/theme/lhgdialog/jquery-1.7.2.min.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/theme/lhgdialog/lhgdialog.min.js?skin=blue"></script>

<script type="text/javascript">
var api = frameElement.api;
var win = api.get('<%=request.getParameter("p_dialog")%>',1).opener;
api.lock();


$("document").ready(function(){		
	
	$("#submit").click(function(){
		
		if(win._initIds!=null && win._initIds!="0"  && win._initIds !=""){
			win.COMP_CategoryPicker.updateData(win._initIds,win._initNames);
			api.close();
		}else{
			$.dialog({
				id:"msg",
				lock:true,
			    title:"",
			    content: '办事机构/区域！',
			    max: false,
			    min: false,
			    drag : false,
			    zIndex:3000,
			    time:2
			});	
		}
    	
	});

	$("#clear").click(function(){
		 $("#show").contents().find("input").each(function(index){
	           $(this).attr("checked",false);
	     });
		 win._initIds = "";
	     win._initNames = "";
	     win.COMP_CategoryPicker.updateData("","");
	});

	$("#close").click(function(){
		api.close();
	});
});


$("document").ready(function(){
	$(":input[type=radio]").each(function(index){
		var initIdsStr =[];
		var initNamesStr =[];
		if(win._initIds!=null && win._initIds!="")
		{
			 initIdsStr = win._initIds.split(",");
	    }
		if(win._initNames!=null && win._initNames!="")
		{
			 initNamesStr = win._initNames.split(",");
	    }
		var selected = [];
	
		for(var i=0;i<initIdsStr.length;i++){
			var m = [];
			m.id = initIdsStr[i];
			m.name = initNamesStr[i];
			selected.push(m);
		}
		
		for(var i=0;i<selected.length;i++){
	    	  var s = selected[i];
	          if (s!=null&&s.id==$(this).attr("value")) {
	        	  $(this).attr("checked",true);
	          }
	      }
	
	    $(this).click(function(){                    
	    	try {
	            win._initIds = $(this).attr("value");
	            win._initNames = $(this).attr("desc");
	            win.COMP_CategoryPicker.updateData($(this).attr("value"),$(this).attr("desc"));
	            window.api.close();
	            //win.__clear();
	        } catch(e){}
	    });
	});



	$(":input[type=checkbox]").each(function(index){
		var initIdsStr =[];
		var initNamesStr =[];
		
		if(win._initIds!=null && win._initIds!="")
		{
			initIdsStr = win._initIds.split(",");
	    }
		
		if(win._initNames!=null && win._initNames!="")
		{
			initNamesStr = win._initNames.split(",");
	    }
		
		var selected = [];
	
		for(var i=0;i<initIdsStr.length;i++){
			var m = [];
			m.id = initIdsStr[i];
			m.name = initNamesStr[i];
			selected.push(m);
		}
		
		for(var i=0;i<selected.length;i++){
	    	  var s = selected[i];
	          if (s!=null&&s.id==$(this).attr("value")) {
	        	  $(this).attr("checked",true);
	          }
	      }
	
	    $(this).click(function(){
	    	var initIdsStr =[];
	    	var initNamesStr =[];
	    	if(win._initIds!=null && win._initIds!="")
	    	{
	    		 initIdsStr = win._initIds.split(",");
	        }
	
	    	if(win._initNames!=null && win._initNames!="")
	    	{
	    		 initNamesStr = win._initNames.split(",");
	        }
	    	
			
			var selected = [];
	
			for(var i=0;i<initIdsStr.length;i++){
				//alert(initIdsStr.length);
				var m = [];
				m.id = initIdsStr[i];
				m.name = initNamesStr[i];
				selected.push(m);
			}
			
	    	var m = [];
	        m.id = $(this).attr("value");
	        m.name = $(this).attr("desc");
	        
	    	if(selected.length==0){
	            selected.push(m);
	        }else{
	      	  var flag = 1;
	            for(var i=0;i<selected.length;i++){
	          	  var s = selected[i];
	                if (s!=null&&s.id==m.id) {
	                    selected[i] = null;
	                    flag = 0;
	                }
	            }
	            if(flag == 1)
	                selected.push(m);
	            
	        }
	        var returnIds="";
	    	var returnNames="";
	    	for(var i=0;i<selected.length;i++){
	    		if(selected[i]!=null){
	    			if(returnIds==null||returnIds==undefined||returnIds==""){
	    				returnIds = selected[i].id;
	    				returnNames = selected[i].name;
	    			}else{
	    				returnIds += ","+selected[i].id;
	    				returnNames += ","+selected[i].name;
	    			}
	    		}
	    	}
	        win._initIds = returnIds;
	        win._initNames = returnNames;
	    });
	});
});
var type='<s:property value="p_type"/>';
var wParentId='';
var ids = win._initIds;

var treeGird =new TreeGrid('<%=request.getContextPath()%>/theme/default/img/treeGrid/','',1,'workTreedivs');
if(type=='double')
{
	//treeGird.addHeader('','30','<input type="checkbox" name="allNumber" id="allNumber" />');
	treeGird.addHeader('','30','');
	treeGird.addHeader('','','名称');
	treeGird.setIndex(0);
}
else
{
	treeGird.addHeader('','30','');
	treeGird.addHeader('','','名称');
	treeGird.setIndex(0);
}


function addRow(id,parentId,name)
{
	if(type=='double')
	{
	   var ss="{id:'"+id+"',pid:'"+parentId+"',preWork:'',"+
		  "columns:["+
		  "{text:'<input type=\"checkbox\" name=\"ids\" id=\"ids\" value=\""+id+"\" desc=\""+name+"\" />\',dataAlign:'center',onclick:''},"+
		  "{text:'"+name+"',dataAlign:\'\',onclick:''}]}";	
		  treeGird.addRow(ss);
	}else{
		   if(id==wParentId){
				  var ss="{id:'"+id+"',pid:'"+parentId+"',preWork:'',"+
				  "columns:["+
				  "{text:'',dataAlign:'center',onclick:''},"+
				  "{text:'"+name+"',dataAlign:\'\',onclick:''}]}";		
				  treeGird.addRow(ss);
			}else{
				  var ss="{id:'"+id+"',pid:'"+parentId+"',preWork:'',"+
		 		  "columns:["+
		 		  "{text:'<input type=\"radio\" name=\"ids\" id=\"ids\"  value=\""+id+"\" desc=\""+name+"\" />\',dataAlign:'center',onclick:''},"+
		 		  "{text:'"+name+"',dataAlign:\'\',onclick:''}]}";
				 treeGird.addRow(ss);
			}
	}
}
	
//折叠或展开
function toOpenOrClose(val){
	
	treeGird.expandAll(val);
}
</script>
</head>
<body>
		<table border="0" style="width: 100%"  borderColor="#DAEAF7" cellPadding=0 cellSpacing=0 bgcolor="#FFFFFF" height="25" valign="top"  leftMargin="0" rightMargin="0" topMargin="0" bottomMargin="0" >
			<tr bgcolor="#DAEAF7"><td height="3px;" colspan="2"></td></tr>
			<tr bgcolor="#DAEAF7" ><td width="3px;">&nbsp;</td>
			  <td  style="width: 100%">	
			  	 <span style='text-decoration:underline;cursor:pointer;display:inline;font-size:12px' onclick="toOpenOrClose('Y')">展开</span>
          		<span style='text-decoration:underline;cursor:pointer;display:inline;font-size:12px' onclick="toOpenOrClose('N')">折叠</span>
          		&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	
			  	<span  style='text-decoration:underline;cursor:pointer;font-size:12px' id="submit" >确定</span>
           		<span style='text-decoration:underline;cursor:pointer;font-size:12px' id="clear" >清空</span>
          		<span style='text-decoration:underline;cursor:pointer;display:inline;font-size:12px' id="close" >关闭</span>
			  </td>
			</tr>
		</table>
	<div id="workTreedivs"></div>
	<s:iterator value="baseGeoInfoList" status="status">
		 <script type="text/javascript">
           		addRow('<s:property value="id"/>','<s:property value="parentId"/>','<s:property value="name"/>');
         </script>
	</s:iterator>

</body>
 <script type="text/javascript">
    treeGird.show();
  </script>
</html>