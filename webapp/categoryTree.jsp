<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@taglib prefix="s" uri="/struts-tags"%>
<jsp:include page="/theme/default/default.jsp" flush="true"/>
<html>
	<head>
	<link rel="stylesheet" type="text/css" href="<%= request.getContextPath()%>/theme/default/css/default.css">
	<link href="<%=request.getContextPath() %>/theme/default/css/header.css" rel="stylesheet" type="text/css">
	<link href="<%=request.getContextPath() %>/theme/default/css/orgtree.css" rel="stylesheet" type="text/css">
	<script type="text/javascript" src="<%=request.getContextPath()%>/theme/default/js/orgtree.js"></script>
	<script type="text/javascript" src="<%=request.getContextPath()%>/theme/lhgdialog/jquery-1.7.2.min.js"></script>
		<script type="text/javascript">
			var ids = "";
			var names = "";
			function callClient(id)
			{				
				if('<s:property value="isDefaultOrgId"/>'==1)
				{									
					window.parent.folderframe2.document.location="cate_searchTemplateByParentId.action?category.parentId="+id+"&pageBack=2" ;
				}
				else
				{					
				window.parent.folderframe2.document.location="cate_searchCategorysByParentId.action?category.parentId="+id+"&pageBack=2" ;
				}
			}
			//function re(id)
			//{
			//	window.location="<%=request.getContextPath()%>/orgAuthorization_orgAugthoTree.action?openId="+id;
			//}

			//选中树的节点
            function postSee(num,id)
           {
            	$("#showLoading").css("display","");
              window.location="<%=request.getContextPath()%>/orgAuthorization_orgAugthoTree?openId="+id;
               
           }

            function re()
			{
            	$("#showLoading").css("display","");
            	if('<s:property value="isDefaultOrgId"/>'==1)
            	{
            	 window.location="<%=request.getContextPath()%>/cate_getCategorysTemplate.action";
                }
            	else
            	{
				 window.location="<%=request.getContextPath()%>/cate_getCategorys.action";
            	}
			}

			
		
		</script>
	</head>
	<body>
	      
	      <table class="page_title_bar">
			<tr>
				<td>
				
				
					系统配置管理
				
				</td>
			</tr>
         </table> 
		<div id="div1"  class="dtree" >
			<script type="text/javascript">	
			 var d = new dTree('d','<%=request.getContextPath()%>/theme/default/img/orgtree/');
			 d.add(0,-1,'系统配置','javascript:callClient(0)','','','','',true);
			var myid=null;
			</script>
			<s:iterator value="categoryList">		
				<script type="text/javascript">
			 	 d.add('<s:property value="id"/>','<s:property value="parentId"/>','<s:property value="name"/>','javascript:callClient(\'<s:property value="id"/>\')','','','<%=request.getContextPath()%>/theme/default/img/orgtree/folder.gif');		
		        </script>
			</s:iterator>
	
			<script type="text/javascript">
			document.write(d);			
	        </script>
		
		</div>
		<s:if test='openId!=null && openId!=""'>
		<script type="text/javascript">
			d.openTo('<s:property value="openId"/>', true);	
	        </script>
		</s:if>
		
	</body>

</html>
