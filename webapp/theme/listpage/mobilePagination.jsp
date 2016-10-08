<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@page import="com.opensymphony.xwork2.util.*"%>
<%@page import="com.opensymphony.xwork2.ognl.*"%>
<%@page import="com.utils.listPage.Pagination"%>
<%@page import="com.utils.listPage.IPagination"%>
<%@ taglib prefix="s" uri="/struts-tags" %>
<%@ taglib uri="http://java.sun.com/jstl/fmt" prefix="fmt" %>
<%
	String path = (String) request.getContextPath();
	String basePath = path;
	String valignStr=(String) request.getParameter("valign");
	boolean val=true;
	
	String valign="top_listpage_table";
	if(valignStr.equals("bottom"))
	{
    valign="listpage_table";
    val=false;
	}
%>
<%
	String pagination = request.getParameter("IPagination");
	pagination = pagination == null ? "listPage" : pagination;

	String pageInfo = request.getParameter("PaginationInfo");
	pageInfo = pageInfo == null ? "pageInfo" : pageInfo;
%>
<%
	OgnlValueStack stack = (OgnlValueStack) request.getAttribute("struts.valueStack");
     
    	 IPagination listPage = (IPagination) stack.findValue(pagination);
    	//IPagination<Object> listPage = new  Pagination<Object>(1,1,1);
 
	if (listPage == null)
		return;
%>

<style>

.m_pages li a:hover{background:#c1d0df;}


.m_pages li{list-style:none;  float: left; height: 30px; font-size: 14px; font-weight:bold ;color: #75818d; text-shadow: 0 1px 0 #fff;padding: 0px 20px 0px 0px}

.m_pages li a span{white-space:nowrap;}



</style>


<script type="text/javascript" for="document" event="onkeydown">
	if(event.keyCode==13 && event.srcElement.type=='text' && event.srcElement.id =='pageSize'){
		event.returnValue=false;
		event.cancel = true;
		fromObj.submit();
	}
</script>
<script type="text/javascript">
	var fromObj = document.<%=request.getParameter("formName")%>;
	function changePage(pageNo){
		document.getElementById("pageNo").value= pageNo;
		if(document.getElementById('distinct_page_name_id')){
			document.getElementById('distinct_page_name_id').disabled = false;
		}
		fromObj.submit();
		//showLoadingBox();
	}
	
	function aa(id){
		id.value = id.value.replace(/\D/g,'');
		if(id.value==''){
			id.value=15;
		}
	}
	function bb(id){
		id.value = id.value.replace(/\D/g,'');
		if(id.value==''){
			id.value=15;
		}
	};
</script>

		<table  id="marker" width="100%" border="0" cellspacing="0" cellpadding="0" class="<%=valign%>">
		<input type="hidden" name="<%=pageInfo%>.pageNo" id="pageNo"
									value="0" />
								<input type="hidden" value="<%=listPage.getLastPageNo()%>"
									id="lastPageNo" />
								<input type="hidden" value="<%=listPage.getTotalNumOfElements()%>"
									id="totalNum" />
									
			<tr>
				<td>
					<div class="m_pages">
						<ul>
						<li>
						<a title="上一页" style="cursor: pointer;"
						onclick="javascript:changePage('<%=listPage.getPreviousPageNo()%>')"><span>上一页</span></a>
						</li>
						<li >
						<%=listPage.getPageNo()%>/<%=listPage.getLastPageNo()%>
						</li>
						<li>
						<a tabindex="21" title="下一页" onclick="javascript:changePage('<%=listPage.getNextPageNo()%>')" style="cursor: pointer;">
						<span>下一页</span></a>
						</li></ul>
					</div>
				</td>
			</tr>
		</table>

<%
	String distinct_page_name = request
			.getParameter("distinct_page_name");
	if (distinct_page_name != null) {
		out
				.println("<input type=\"hidden\" id=\"distinct_page_name_id\" disabled=\"true\"  name=\"distinct_page_name\" value="
						+ distinct_page_name + " />");
	}
%>