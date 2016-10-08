<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@taglib prefix="s" uri="/struts-tags"%>

<html>
<head>
<title></title>
<LINK href="<%=request.getContextPath()%>/theme/easyui/themes/default/easyui.css" type="text/css" rel="stylesheet">
<LINK href="<%=request.getContextPath()%>/theme/easyui/themes/icon.css" type="text/css" rel="stylesheet">
<script type="text/javascript" src="<%=request.getContextPath()%>/theme/lhgdialog/jquery-1.7.2.min.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/theme/easyui/jquery.easyui.js"></script>
<script type="text/javascript"> 
var ids = "";
var names = "";
function callClient(id)
{				
				
	window.parent.folderframe2.document.location="cate_searchCategorysByParentId.action?category.parentId="+id+"&pageBack=2" ;
	
}

function re()
{
	 var node = $('#tt2').tree('getSelected');
	    if (node) {
	        $('#tt2').tree('reload', node.target);
	        $('#tt2').tree('collapseAll', node.target); 
	    }
	    else {
	        $('#tt2').tree('reload');
	    }
}

//选中树的节点
function postSee(num,id)
{
	$("#showLoading").css("display","");
 // window.location="<%=request.getContextPath()%>/orgAuthorization_orgAugthoTree?openId="+id;
   
}

           $(function(){
	             $('#tt2').tree({  
	            	 lines:true, 
	                checkbox: false,   
	                 url: '<%=request.getContextPath()%>/cate_getCategorysByParentId.action?parentId=-1',   
	                onBeforeExpand:function(node,param){
	                    $('#tt2').tree('options').url = "<%=request.getContextPath()%>/cate_getCategorysByParentId.action?parentId="
										+ node.id;
							},
							onClick : function(node) {

								callClient(node.id);

							}
						});
	});
</script>
</head>
<body>
	<div style="width: 150px;">
		<ul id="tt2">
			
		</ul>
	</div>
</body>
</html>