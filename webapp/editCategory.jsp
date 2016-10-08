<%@page pageEncoding="UTF-8" contentType="text/html; charset=UTF-8"%>
<%@taglib prefix="s" uri="/struts-tags"%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<s:if test="#parameters.flag[0].equals('add')">
	<title>新增配置</title>
</s:if>
<s:else>
	<title>编辑配置</title>
</s:else>
<link rel="stylesheet" type="text/css"
	href="<%=request.getContextPath()%>/theme/default/css/default.css">
<link rel="stylesheet" type="text/css"
	href="<%=request.getContextPath()%>/theme/default/css/tabs.css">
<script type="text/javascript"
	src="<%=request.getContextPath()%>/theme/lhgdialog/jquery-1.7.2.min.js"></script>
<script type="text/javascript"
	src="<%=request.getContextPath()%>/theme/lhgdialog/lhgdialog.min.js?skin=blue"></script>
<script type="text/javascript">
var  isUseID=false;

$("document").ready(function(){
	$(".btn_save").click(function(){

		
       if($("#name").val()==""|| $("#categoryID").val()=="")
       {

    		if($("#name").val()==""){
    			$("#m_name").empty();
    			$("#m_name").append("不能为空");
    			$("#m_name").css("color","red");
    		
    		}

    		if($("#categoryID").val()==""){
    			$("#m_categoryID").empty();
    			$("#m_categoryID").append("不能为空");
    			$("#m_categoryID").css("color","red");
    		
    		}
    		return;
          }

   
   	if($("#categoryID").val()!=$("#categoryID").attr("oldId"))
	{
   		CheckId($("#categoryID").val());

		}

  
	if(isUseID)
	{
         return;
	}
		
		
		if($(this).attr("id") == "add"){
			document.getElementById("categoryForm").action = "cate_addCategory.action";
		}
		if($(this).attr("id") == "update"){
			document.getElementById("categoryForm").action = "cate_updCategory.action";
		}
		document.getElementById("categoryForm").submit();
	});
});
//返回
function returnBack(){
	if('<s:property value="isDefaultOrgId"/>'==1)
	{
		window.location.href="cate_searchTemplateByParentId.action?category.parentId="+$("#re_parentId").val()+"&isDefaultOrgId=1";
	}
	else
	{		
		window.location.href="cate_searchCategorysByParentId.action?category.parentId="+$("#re_parentId").val();
	}
}
//验证非空
$("document").ready(function(){
	$("#name").blur(function(){
		if($("#name").val()==""){
			$("#m_name").empty();
			$("#m_name").append("不能为空");
			$("#m_name").css("color","red");
			return false;
		}else{
			$("#m_name").empty();
			return true;
		}
	});
});


function changeId(obj)
{

	  var oldId =$(obj).attr("oldId");
	    var id= $(obj).val();

	     if(oldId!==id)
	     {
	    	 CheckId(id);
				
	         }
	     else
	     {
	    	 $("#m_categoryID").empty();
	    	 isUseID=false;
	         }
	
	}



function CheckId(id)
{

	 $.ajax({
		   url: "<%=request.getContextPath() %>/cate_isUseCategoryId.action",
		   type: "POST",
        data: "category.id="+id,
        dataType:'json',
		   success: function(transport){
			   if(transport.result==1){
				     $("#m_categoryID").empty();
					$("#m_categoryID").append("此ID已占用");
					$("#m_categoryID").css("color","red");
					isUseID=true;
		     }
			   else
			   {
				   isUseID=false;
				   $("#m_categoryID").empty();
				   }
		   }
		});

	}

</script>
	
</head>
<body>

<table class="page_title_bar">
	<tr>
		<td>
			<s:if test="#parameters.flag[0].equals('add')">
				新增配置
			</s:if>
			<s:else>
				编辑配置
			</s:else>
		</td>
	</tr>
</table>

<!--装按钮表格  -->


<!-- 增加或修改信息 -->
<s:form id="categoryForm" name="categoryForm" method="post">
<s:hidden name="pageBackKey"></s:hidden>
<s:hidden name="oldID"></s:hidden>


<input type="hidden" name="category.orgId" value="<s:property value="category.orgId" />"/>
<input type="hidden" name="category.parentId" value="<s:property value="category.parentId" />"/>
<input type="hidden" id="re_parentId" name="parentId" value="<s:property value="parentId" />"/>
<input type="hidden" name = "isDefaultOrgId" value="<s:property value="isDefaultOrgId"/>"/>
<input type="hidden" name = "creator" value="<s:property value="category.creator"/>"/>
<input type="hidden" name = "createTime" value="<s:property value="category.createTime"/>"/>

<table width="100%" class="top_listpage_table">
	<tr>
		<td>
			<input type="button" class="btn_return" value="返回" onclick="pageBackFun();" />
			<s:if test="#parameters.flag[0].equals('add')">
				<input type="button" class="btn_save" id="add" value="保存"  /> 
			</s:if>
			<s:else>
				<input type="button" class="btn_save" id="update" value="保存"  /> 
			</s:else>
		</td>
	</tr>
</table>

	<table border="0" align="center" frame=void rules=none
		class="data_table">
		
		<s:if test='category.id!=null && !category.id.equals("")'>
		
		<tr>
			<td  class="td_title">ID：</td>
			<td width="70%"><input type="hidden"  name="category.id" id="categoryID"  oldId="<s:property value="category.id" />"  class="input"
				 value="<s:property value="category.id" />"  /><s:property value="category.id" />
			  
			</td>
		</tr>
		</s:if>
		<s:else>
		<tr>
			<td  class="td_title"><font color="red">*</font>ID：</td>
			<td width="70%"><input name="category.id" id="categoryID"  oldId="<s:property value="category.id" />"   type="text"
				class="input" value="<s:property value="category.id" />"  onchange="changeId(this);"/>
				<label id="m_categoryID"></label>
			</td>
		</tr>
		
		</s:else>
		
		<tr>
			<td  class="td_title"><font color="red">*</font>中文名称：</td>
			<td width="70%"><input name="category.name" id="name" class="input"
				class="input" value="<s:property value="category.name" />" />
				<label id="m_name"></label>
			</td>
		</tr>
		<tr>
			<td  class="td_title">英文名称：</td>
			<td width="70%"><input name="category.enName" id="enName" class="input"
				class="input" value="<s:property value="category.enName" />" />
			
			</td>
		</tr>
		<tr>
			<td class="td_title">编码：</td>
			<td width="70%"><input name="category.code" id="code"
				class="input"   value="<s:property value="category.code" />" 
				 />
			</td>
		</tr>
		<tr>
			<td class="td_title">工程编码：</td>
			<td width="70%"><input name="category.emsCode" id="emsCode"
				class="input"   value="<s:property value="category.emsCode" />" 
				 />
			</td>
		</tr>
		<tr>
			<td class="td_title">扩展1：</td>
			<td width="70%"><input name="category.ex1" id="ex1"
				class="input"   value="<s:property value="category.ex1" />" 
				 />
			</td>
		</tr>
		<tr>
			<td class="td_title">扩展2：</td>
			<td width="70%"><input name="category.ex2" id="ex2"
				class="input"   value="<s:property value="category.ex2" />" 
				 />
			</td>
		</tr>
		<tr>
			<td class="td_title">扩展3：</td>
			<td width="70%"><input name="category.ex3" id="ex3"
				class="input"   value="<s:property value="category.ex3" />" 
				 />
			</td>
		</tr>
		
		<tr>
			<td class="td_title">排序号：</td>
			<td width="70%"><input name="category.sort" class="input"
				class="input" maxlength="4" value="<s:property value="category.sort" />" 
				onkeyup="this.value=this.value.replace(/\D/g,'')"  
				onafterpaste="this.value=this.value.replace(/\D/g,'')" />
			</td>
		</tr>
		<tr>
			<td class="td_title">所属应用：</td>
			<td width="70%">
				
			<s:select cssClass="SELECT" theme="simple" name="category.appKey"
			 	list="appKeylist" listKey="key" listValue="name" headerKey="0" headerValue=""/>
			</td>
		</tr>
	</table>
<table width="100%" class="top_listpage_table">
	<tr>
		<td height="20">
		</td>
	</tr>
</table>
</s:form>


<s:if test="msg!=null">
	<script>
		$.dialog({lock:true,resize: false, title:"提示", content: '<s:property value="msg" />', max: false, min: false, drag : false, time:3});
		
	</script>
</s:if>
<jsp:include flush="true" page="/theme/pageBack/pageBackForm.jsp"/>
</body>
</html>
