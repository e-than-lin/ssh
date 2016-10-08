<%@page pageEncoding="UTF-8" contentType="text/html; charset=UTF-8" %>
<%@taglib prefix="s" uri="/struts-tags"%>
<html>
<head>
<title>分类管理</title>
<script type="text/javascript" src="<%=request.getContextPath()%>/theme/lhgdialog/jquery-1.7.2.min.js"></script>
<script type="text/javascript">
function main(url)
{
	var id=null;
	var frames=url.split("&"); 
	 for(var i=0;i<frames.length;i++)
	 {   
		   var frame= frames[i].split("=");
		   if(frame!=null)
		   { 
			   if(frame[0]=="frame_id")
		   {
			   id=frame[1];
			   }
			   }
		 }
   
   if(id!=null )
   {
	   if(document.getElementById('frame_'+id)==null){
			var newFrame= createNewFrame(id);
			newFrame.src=url;
			}
			//控制显示页面
			displayFrame(id);
	   }
	
 }
function re()
{	
	if(window.frames["folderframe1"].re!=null)
	{
		window.frames["folderframe1"].re();
		}
	
	}   

function createNewFrame(Frame_id){
		var tab_con=document.getElementById('user_contents');
		var newFrame=document.createElement("IFRAME");
		newFrame.setAttribute('id','frame_'+Frame_id);
		newFrame.setAttribute('name','frame_'+Frame_id);
		newFrame.style.width='100%';
		newFrame.style.height='100%';
		newFrame.setAttribute('frameBorder',0);
		newFrame.setAttribute('marginHeight',0);
		newFrame.setAttribute('marginWidth',0);
		//newFrame.setAttribute('onload','tabonload(this,frame_'+Frame_id+')');
		//newFrame.setAttribute('onresize','tabonload(this,frame_'+Frame_id+')');
		newFrame.scrolling='auto';
		newFrame.style.display='none';
		tab_con.appendChild(newFrame);
		return newFrame;
	}

	
function displayFrame(tab_id){
		//显示本的frame
		
		//隐藏其他frame
		var tabFrames=document.getElementById('user_contents').children;
		for(var i=0;i<tabFrames.length;i++){ 
					tabFrames[i].style.display='none';	
		}
		document.getElementById('frame_'+tab_id).style.display='block';
		//document.getElementById('frame_'+tab_id).style.display='none';

		
		//$("#frame_"+tab_id+"").slideDown(1000);

		//for(var i=0;i<tabFrames.length;i++){
		//	if(tabFrames[i].id!=('frame_'+tab_id)){
		//			tabFrames[i].style.display='none';
		//	}
		//}
	
	}
//function tabonload(obj,fh)
//{
  // if(obj.height<fh.document.body.scrollHeigh)
 //  {
//	   obj.height=fh.document.body.scrollHeigh;
//	   }
//   else{
//	   fh.document.body.scrollHeigh=obj.height;
//	   obj.height=obj.height;
//	   }
 //}
</script>
<link href="<%= request.getContextPath()%>/theme/default/css/header.css" rel="stylesheet" type="text/css">
</head>
	<body scroll="no" width="100%" leftMargin="0" rightMargin="0" topMargin="0" bottomMargin="0">
		<table border="0" cellPadding=0 cellSpacing=0 bgcolor="#FFFFFF" width="100%" height=100% valign="top"  leftMargin="0" rightMargin="0" topMargin="0" bottomMargin="0" >
			<tr>
				<td width="190" height="100%" align="top" valign="top" class="frameborder" id=FolderTD >
				     <s:if test="isDefaultOrgId==1">
				     <Iframe src="<%= request.getContextPath()%>/cate_getCategorysTemplate.action"
					 align="top" width="190" height="100%" noResize scrolling="auto" frameborder="0"	name="folderframe1" id="folderframe1"></iframe>
				     </s:if>
				    <s:else>				    
					<Iframe src="<%= request.getContextPath()%>/cate_toCategoryTree.action"
					 align="top" width="190" height="100%" noResize scrolling="auto" frameborder="0"	name="folderframe1" id="folderframe1"></iframe>
					 </s:else>
				</td>
				<td class="resizeDivClass" width="2px" bgcolor="#46A3FF"></td>
				<td height="100%"  class="frameborder" >				   
				    <s:if test="isDefaultOrgId==1">				   
				    <Iframe src="<%= request.getContextPath()%>/cate_searchTemplateByParentId.action?category.parentId=0&pageBack=2"
					 align="top" width="100%" height="100%" noResize scrolling="auto" frameborder="0"	name="folderframe2" id="folderframe2"></iframe>
				    </s:if>
				    <s:else>
					<Iframe src="<%= request.getContextPath()%>/cate_searchCategorysByParentId.action?category.parentId=0&pageBack=2"
					 align="top" width="100%" height="100%" noResize scrolling="auto" frameborder="0"	name="folderframe2" id="folderframe2"></iframe>
					 </s:else>
					</td>
				
			</tr>
		</table>
	</body>
</html>
