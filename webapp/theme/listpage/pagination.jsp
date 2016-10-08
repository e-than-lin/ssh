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
	else if(valignStr.equals("el"))
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
	OgnlValueStack stack = (OgnlValueStack) request
			.getAttribute("struts.valueStack");
     
    	 IPagination listPage = (IPagination) stack.findValue(pagination);
    	//IPagination<Object> listPage = new  Pagination<Object>(1,1,1);
 
	if (listPage == null)
		return;
%>



<script type="text/javascript" for="document" event="onkeydown">
	if(event.keyCode==13 && event.srcElement.type=='text' && event.srcElement.id =='pageSize'){
		event.returnValue=false;
		event.cancel = true;
		fromObj.submit();
	}
</script>
<%
if(request.getParameter("valign").equals("top")){ %>
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
	<%} %>
		<table  id="marker" width="100%" border="0" cellspacing="0" cellpadding="0" class="<%=valign%>">
		<%if(request.getParameter("valign").equals("top")){ %>
	<input type="hidden" name="<%=pageInfo%>.pageNo" id="pageNo" value="1"/>
	<input type="hidden" value="<%=listPage.getLastPageNo()%>" id="lastPageNo" />
	<input type="hidden" value="<%=listPage.getTotalNumOfElements()%>" id="totalNum" />

	<input type="hidden" value="<%=listPage.getPageNo()%>" id="pagenextnum" />
	<%} %>
	<tr>
			<td  ></td>
				<td width="350" align="right">
					<table border="0" width="100%"  cellpadding="0" cellspacing="0"
						class="<%=valign%>">
						<tr>
							
								<%  if(!valignStr.equals("el")){ %>
							<td width="150" align="right">
								共<%=listPage.getTotalNumOfElements()%>条，<%=listPage.getPageNo()%>/<%=listPage.getLastPageNo()%>页
							</td>
								<input type="hidden" id="beforePageNo" value="<%=listPage.getPageNo()%>"></input>
								<td width="10"></td>
							<td >
							<nobr>
								每页
						<%  if(val==true){ 
						out.print("</td><td><INPUT  maxlength='3' size=\"3\" class=\"input\" id=\"pageSize\" name=\"");
						out.print("pageInfo.pageSize\"");
						out.print("\" ");
						out.print("");
						out.print("value=\"");
						out.print(listPage.getPageSize() <= 0 ? 10 : listPage .getPageSize());
						out.print("\" onkeyup=\"aa(this);\" onafterpaste=\"bb(this);\"/>");
						out.print(" </td><td>");
						%>
						<% } else {			
						out.print(listPage.getPageSize());
						}%>
								条</nobr>
							</td>
							<% } %>
							
								<td>
								<img src="<%=path%>/theme/default/img/page_first.png"
									width="23" height="20" title="首页" onclick="javascript:changePage('1')"
									style="cursor: hand">
							</td>
							<td>
								<img src="<%=path%>/theme/default/img/page_up.png" width="23"
									height="20" title="上一页"
									onclick="javascript:changePage('<%=listPage.getPreviousPageNo()%>')"
									style="cursor: hand">
							</td>
							<td>
								<img src="<%=path%>/theme/default/img/page_down.png" width="23"
									height="20" title="下一页"
									onclick="javascript:changePage('<%=listPage.getNextPageNo()%>')"
									style="cursor: hand">
							</td>
							<td>
								<img src="<%=path%>/theme/default/img/page_last.png" width="23"
									height="20" title="尾页"
									onclick="javascript:changePage('<%=listPage.getLastPageNo()%>')"
									style="cursor: hand">
							</td>
	
						</tr>
					</table>
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