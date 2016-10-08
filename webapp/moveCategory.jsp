<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@taglib prefix="s" uri="/struts-tags"%>
<html>
	<head>
	<link rel="stylesheet" type="text/css" href="<%= request.getContextPath()%>/theme/default/css/default.css">
	<link href="<%=request.getContextPath() %>/theme/default/css/header.css" rel="stylesheet" type="text/css">
	<link href="<%=request.getContextPath() %>/theme/default/css/orgtree.css" rel="stylesheet" type="text/css">
		<script type="text/javascript" src="<%=request.getContextPath()%>/theme/default/js/orgtree.js"></script>
	<script type="text/javascript" src="<%=request.getContextPath()%>/theme/lhgdialog/jquery-1.7.2.min.js"></script>
		<script type="text/javascript">
		var api = frameElement.api ;
		 var objW=api.get("dialogId",1).opener;    
		 api.lock();
			function move(id)
			{
				objW.move(id);
			}

		
		</script>
	</head>
	<body>
	<table style="width:100%;"  class="page_title_bar">
	<tr>
		
			<td>分类管理</td>
		
	</tr>
</table>	
<%--         <s:if test="isDefaultOrgId==1"> --%>
<%--         <iframe style="overflow: hidden;" src="cate_getCategorysTemplate.action?moveType=2&isDefaultOrgId=1&category.parentId=<s:property value="category.parentId"/>" width="100%" height="100%"  frameborder="0" ></iframe> --%>
<%--         </s:if> --%>
<%--         <s:else>        	 --%>
	     <iframe style="overflow: hidden;" src="cate_getCategorys.action?moveType=2&category.parentId=<s:property value="category.parentId"/>" width="100%" height="100%"  frameborder="0" ></iframe>
<%-- 	    </s:else> --%>
	</body>

</html>
