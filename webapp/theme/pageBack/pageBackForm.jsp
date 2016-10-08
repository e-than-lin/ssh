<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>
<script type="text/javascript">

function pageBackFun()
{

	 $("#pageBackForm").submit();
	}

</script>
<form action="<s:property value="requestInfo.requestURL" />" id="pageBackForm" method="post">

  <s:iterator value="requestInfo.parameterList" status="status">
  <input type="hidden" name="<s:property value="name" />" value="<s:property value="value" />"></input>
  </s:iterator>
</form>
