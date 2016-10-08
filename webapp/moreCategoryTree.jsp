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
			//获取选中的分类ids
			var moveList = window.parent.api.data;
			var moveStr = "";
			var pId = "<s:property value="category.parentId"/>";
			if(moveList!=null && moveList.length>0){
				for(var i=0;i<moveList.length;i++){
					if(moveStr==""){
						moveStr = moveList[i].value;
					}else{
						moveStr+=","+moveList[i].value;
					}
					if(pId==""){
						pId = moveList[i].id;
					}else{
						pId+=","+moveList[i].id;
					}
				}
			}
			
			function callClient(id)
			{
				window.parent.move(id);
			}
		
		</script>
	</head> 
	<body>
	      <script type="text/javascript">	
			var d = new dTree('d','<%=request.getContextPath()%>/theme/default/img/orgtree/');
			//d.add('0',-1,'<input type="radio" onclick="callClient(\'\')"/>分类管理','javascript:callClient(\'\')');
			if('<s:property value="category.parentId"/>'==0){
				d.add(0,-1,'分类管理','javascript:callClient(0)','','','','',true);
				
			}else{
				d.add(0,-1,'<input type="radio" onclick="callClient(0)"/>分类管理','javascript:callClient(0)','','','','',true);
				
			}
			</script>
			<s:iterator value="categoryList">
			
				<script type="text/javascript"> 
					if(moveStr.indexOf("<s:property value="id"/>")<0){
						if(pId.indexOf("<s:property value="id"/>")>=0){
							 d.add('<s:property value="id"/>','<s:property value="parentId"/>','<s:property value="name"/>','','','','<%=request.getContextPath()%>/theme/default/img/orgtree/folderOpen.png','<%=request.getContextPath()%>/theme/default/img/orgtree/folderOpen.png');
						}else{
							 d.add('<s:property value="id"/>','<s:property value="parentId"/>','<input type="radio" onclick="callClient(\'<s:property value="id"/>\')"/><s:property value="name"/>','javascript:callClient(\'<s:property value="id"/>\')','','','<%=request.getContextPath()%>/theme/default/img/orgtree/folderOpen.png','<%=request.getContextPath()%>/theme/default/img/orgtree/folderOpen.png');

						}
						
					}
				</script>		
			
			</s:iterator>
			
		  <div style="height: 10px;">
		  
			<script type="text/javascript">
			document.write(d);			
	        </script>
		</div> 
	</body>

</html>
