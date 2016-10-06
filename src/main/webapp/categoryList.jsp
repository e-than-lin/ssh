<%@ page language="java" contentType="text/html; charset=UTF-8"
	import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<jsp:include page="/theme/default/default.jsp" flush="true"/>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<title>列表页面</title>
<link rel="stylesheet" type="text/css"
	href="<%= request.getContextPath()%>/theme/default/css/default.css">
<script type="text/javascript"
	src="<%=request.getContextPath()%>/theme/default/js/default.js"></script>
<script type="text/javascript"
	src="<%=request.getContextPath()%>/theme/lhgdialog/jquery-1.7.2.min.js"></script>
<script type="text/javascript"
	src="<%=request.getContextPath()%>/theme/lhgdialog/lhgdialog.min.js?skin=blue"></script>
<link rel="stylesheet" type="text/css" 
	href="<%=request.getContextPath()%>/theme/default/css/highslide.css">
<script type="text/javascript" 
	src="<%=request.getContextPath()%>/theme/default/js/highslide-with-html.js"></script>
	
<script type="text/javascript">
//全选、反选
$("document").ready(function(){
	$("#allNumber").click(function(){
		if($(this).attr("checked")=="checked"){
			$(":input[@name='number']").each(function(){
				if($(this).attr("disabled")!="disabled"){
					$(this).attr("checked",true);
				}
			});
		}else{
			$(":input[@name='number']").each(function(){
				$(this).attr("checked",false);
			});
		}
	});
});

$("document").ready(function(){
	$(".btn_del").click(function(){
		var length = $("input[name='ids']:checked").length;
		if(length>0){
			$.dialog({
			    id: 'confirm',
			    lock:true,
			    resize: false,
			    title:"提示",
			    content: '您确定要删除吗',
			    max: false,
			    min: false,
			    drag : false,
			    button: [{
			            name: '确定',
			            callback: function(){
			    	   document.getElementById("listForm").action="cate_batchDelCategory.action";
			    	   $("#showLoading").css("display","");
			    	   $("#pageBack").val(0);
					   document.getElementById("listForm").submit();
					  
			            },
			            focus: true
			        },{
			           name: '取消'
			        }]
			});	
		}else{
			$.dialog({lock:true,resize: false, title:"提示", content: '请选择要删除的分类！', max: false, min: false, drag : false, time:3});
			
		}
	});
	
});

$("document").ready(function(){
	 $(".btn_send2").click(function(){	
		  var length = $("input[name='ids']:checked").length;
			if(length>0)
			{
				$.dialog({
				    id: 'confirm',
				    lock:true,
				    resize: false,
				    title:"提示",
				    content: '您是否要移动选中的分类吗?',
				    max: false,
				    min: false,
				    drag : false,
				    button: [{
				            name: '确定',
				            callback: function(){
				    			$.dialog({id:"dialogId", lock:true,parent:this,resize: false, width: 200,height: 250,min:false,max:false,
				    	           content: 'url:cate_moveCategorys.action?moveType=2&category.parentId='+$("#parentId").val()+'&isDefaultOrgId='+$("#isDefaultOrgId").val()
				    	        ,data:$("input[name='ids']:checked")	   
				    			});
				            },
				            focus: true
				        },{
				           name: '取消'
				        }]
				});
				}
			else
			{
				$.dialog({lock:true,resize: false, title:"提示", content: '请选择要移动的分类！', max: false, min: false, drag : false, time:3});
				
			}
	   });
});


	 



function move(id)
{
	$("#listForm").attr("action","cate_moveCategory.action?category.id="+id);
	$("#showLoading").css("display","");
	$("#listForm").submit();
	}

function addObj(parentId){
	$("#showLoading").css("display","");	
	$("#addForm").submit();
	//window.location.href = "cate_pageAdd.action?flag=add&category.parentId=" + parentId;
	}

function editCategory(id){
	$("#showLoading").css("display","");
	$("#categoryId").val(id);
	$("#editForm").submit();
	//window.location.href = "cate_getCategoryById.action?category.id="+id + "&category.parentId="+$("#parentId").val();
	
}

function search(){
	if('<s:property value="isDefaultOrgId"/>'==1)
	{
		document.getElementById("listForm").action="cate_searchTemplateByParentId.action";
	}
	else
	{
	  document.getElementById("listForm").action="cate_searchCategorysByParentId.action";
	}
	$("#showLoading").css("display","");
	document.getElementById("listForm").submit();

}
</script>

</head>
<body>
<table style="width:100%; " class="page_title_bar">
	<tr>
		<td>系统配置列表</td>
	</tr>
</table>
<form id="listForm" name="listForm" action="cate_searchCategorysByParentId.action" method="post">
<s:hidden name="pageBackKey"></s:hidden>
<input type="hidden" id="pageBack" name="pageBack" value="1"/>
<input type="hidden" id="parentId" name="category.parentId" value="<s:property value="category.parentId"/>"/>
<input type="hidden" id="isDefaultOrgId" name = "isDefaultOrgId" value="<s:property value="isDefaultOrgId"/>"/>
<table width="100%" class="search_table">
	<tr>
		
		<td  class="td_title" style="text-align:right">
		名称：<input type="text" name="category.name" value="<s:property value="category.name"/>"/></td>
		<td style="text-align:left"><input name="btnSel"  type="button" class="btn_query" style="margin-left:10px;" 
			onclick="search()" value="查询"></td>
	</tr>
</table>
<!--装按钮表格 -->
<table width="100%"  class="top_listpage_table">
	<!--<tr>
		<td  class="td_title" style="text-align:right">
		分类名称：<input type="text" name="category.name" value="<s:property value="category.name"/>"/></td>
		<td style="text-align:left"><input name="btnSel"  type="button" class="btn_query" style="margin-left:10px;" 
			onclick="search()" value="查询"></td>
	</tr>
	--><tr>
	
	
	  
		<td>
		   <s:if test="isDefaultOrgId==1">
		         <s:if test="isCloudAdmin == 1">
		             <input type="button" name="btnAdd" class="btn_add" value="新增"
					onclick="addObj('<s:property value="category.parentId"/>')" /> 
					<input name="btnDel" id="delUser" type="button" value="删除" class="btn_del" />
		            <input type="button" id="moveCls" name="btnCls" class="btn_send2" value="移动" />
		         </s:if>
		   </s:if>
		   <s:else>
			    <s:if test="orgAdmin==true">
			   <input type="button" name="btnAdd" class="btn_add" value="新增"
				onclick="addObj('<s:property value="category.parentId"/>')" /> 
				<input name="btnDel" id="delUser" type="button" value="删除" class="btn_del" />
	            <input type="button" id="moveCls" name="btnCls" class="btn_send2" value="移动" />
			    </s:if>
			    <s:else>
				<td></td>
				</s:else>
		    </s:else>
		  </td>
		
		
		<td>
		<jsp:include flush="true"
			page="/theme/listpage/pagination.jsp">
			<jsp:param name="formName" value="listForm" />
			<jsp:param name="valign" value="top" />
		</jsp:include></td>
	</tr>
</table>

<!-- 数据列表列表 -->
<table width="100%"  class="list_table">
	<tr>
	<th ><input type="checkbox" name="allNumber" id="allNumber" /></th>
	 
		<th width="30px">序号</th>
		<th >中文名称</th>
		<th >英文名称</th>
		<th >父节点</th>
		<th >父节点ID</th>
		<th >编码</th>
		<th >工程编码</th>
		<th >所属应用</th>
		<s:if test="orgAdmin==true">
		<th width="6%">操作</th>
		</s:if>
	</tr>
	<s:iterator value="listPage.getThisPageElements()" status="status">
		<tr
			class="<s:property value="%{#status.odd==true?'td_odd':'td_even'}"/>">
			<td class="td_index_number">
				
				<input type="checkbox" name="ids" 
				 value="<s:property value="category.id"/>" id="<s:property value="category.parentId"/>" />
			</td>
			<td align="center"><s:property value="category.sort" /></td>
			<td><s:property value="category.name" /></td>
			<td><s:property value="category.enName" /></td>
			<td align="center"><s:property value="parentName" /></td>
			<td align="center"><s:property value="category.parentId" /></td>
			<td align="center"><s:property value="category.code" /></td>
			<td align="center"><s:property value="category.emsCode"/></td>
			<td align="center"><s:property value="appName" /></td>
			<s:if test="orgAdmin==true">
			<td align="center"><a href="javascript:void(0)"
				onclick="editCategory('<s:property value="category.id"/>');">编辑</a> <!--  <a href="javascript:void(0)" onClick="delUserById(<s:property value="id"/>)">删除</a>  -->
			</td>
			</s:if>
		</tr>
	</s:iterator>

</table>

<table width="100%" class="top_listpage_table">
	<tr>
		<td>
       </td>
       
       <s:if test="orgAdmin==true">
		<td><input type="button" name="btnAdd" class="btn_add" value="新增" onclick="addObj('<s:property value="category.parentId"/>')" /> 
			<input type="button" name="btnDel" id="delUser"  value="删除" class="btn_del" />
            <input type="button" name="btnCls" id="moveCls"  value="移动" class="btn_send2"  />
		
		</s:if>
		<td><jsp:include flush="true"
			page="/theme/listpage/pagination.jsp">
			<jsp:param name="formName" value="listForm" />
			<jsp:param name="valign" value="bottom" />
		</jsp:include></td>
	</tr>
</table>

</form>
<form id="editForm" name="editForm" action="cate_getCategoryById.action" method="post">
   <s:hidden name="pageBackKey"></s:hidden>
  <input type="hidden" id="categoryId" name="category.id"/>
   <input type="hidden" id="parentId" name="category.parentId" value="<s:property value="category.parentId"/>"/>
  <input type="hidden" name = "isDefaultOrgId" value="<s:property value="isDefaultOrgId"/>"/>
</form>
<form id ="addForm" name="addForm"  action="cate_pageAdd.action" method="post">
  <s:hidden name="pageBackKey"></s:hidden>
  <input type="hidden" name="flag" value="add"/>
  <input type="hidden" id="parentId" name="category.parentId" value="<s:property value="category.parentId"/>"/>
  <input type="hidden" name = "isDefaultOrgId" value="<s:property value="isDefaultOrgId"/>"/>
</form>

<s:if test="msg!=null">
	<script>
		$.dialog({lock:true,resize: false, title:"提示", content:'<s:property value="msg" />', max: false, min: false, drag : false, time:3});
		window.parent.re();
	</script>
</s:if>
</body>
</html>