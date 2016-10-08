/**
 * 
 */
package com.utils.returnback;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang.StringEscapeUtils;
import org.apache.commons.lang.StringUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

/**
 */
public class ReturnBackServlet extends HttpServlet {
	protected static Log log = LogFactory.getLog(ReturnBackServlet.class);

	/**
	 * 
	 */
	private static final long serialVersionUID = -6363778616755789447L;

	/**
	 * Constructor of the object.
	 */
	public ReturnBackServlet() {
		super();
	}

	/**
	 * Destruction of the servlet. <br>
	 */
	public void destroy() {
		super.destroy(); // Just puts "destroy" string in log

	}

	public void init() throws ServletException {

	}

	public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		this.doPost(request, response);
	}

	public void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.setContentType("text/html;charset=UTF-8");
		response.setCharacterEncoding("UTF-8");
		PrintWriter out = response.getWriter();
		// 输出头部
		out.println("<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.01 Transitional//EN\">");
		out.println("<HTML>");
		out.println("  <HEAD>");
		out.println("      <title>ReturnBackPage</title>");
		out.println("      <meta http-equiv=\"content-type\" content=\"text/html; charset=UTF-8\">");
		out.println("      <meta http-equiv=\"pragma\" content=\"no-cache\">");
		out.println("      <meta http-equiv=\"cache-control\" content=\"no-cache\">");
		out.println("      <meta http-equiv=\"expires\" content=\"0\">");
		out.println("  </HEAD>");
		out.println("  <BODY>");

		// 根据不同情况返回不同页面.
		String sReturnablePageId = (String) request.getParameter(ReturnBackFilter.RETURNABLE_PAGE_ID);

		try {
			// 由于系统传递过来的参数太复杂,不能保证都是数字
			// 所以增加如下转换,保证是一个数字字符
			int iBackPageId = Integer.parseInt(sReturnablePageId);
		} catch (NumberFormatException e) {
			sReturnablePageId = null;
		}
		if (sReturnablePageId == null || "null".equals(sReturnablePageId) || StringUtils.isEmpty(sReturnablePageId)) {
			// out.println("Can not return to any page. Because the given returnablePageId  is  \"" + sReturnablePageId
			// + "\"");
			// return;

			/*
			 * 20090612 如果sReturnablePageId为空,那么就返回一段脚本. 脚本功能: 1.如果窗口的history有记录的话,就返回上一页. 2.如果没有history,那么就关闭窗口.
			 */
			out.println(" <script type=\"text/javascript\">");
			out.println("function doOnLoad() {");
			out.println("	if(history.length>0) history.go(-1);");
			out.println("	try {if (dialogArguments != null) {window.close();}");
			out.println("	} catch (e) {}");
			out.println("	try {if (opener != null) {window.close();}");
			out.println("	} catch (e) {}");
			out.println("	history.go(-1); }");
			out.println(" doOnLoad();");
			out.println(" </script> ");
		} else {
			RequestInfo requestInfo = ReturnBackFilter.getReturnablePageInfo(request, sReturnablePageId);
			String url = requestInfo.getRequestURL();

			out.println(" <form name=\"backForm\" action=" + url + " style=\"display: none;\" method=\"POST\"> ");

			List<Parameter> parameterList = requestInfo.getParameterList();
			for (Parameter parameter : parameterList) {
				out.println(createInputValueScript(parameter));
			}

			if (log.isDebugEnabled()) {
				for (Parameter parameter : parameterList) {
					log.debug(createInputValueScript(parameter));
				}
			}

			out.println(" </form>");
			out.println(" <script type=\"text/javascript\">");
			if (log.isDebugEnabled()) {
				out.println(" setTimeout(\"window.document.getElementById('backForm').submit()\",500); ");
			} else {
				out.println("window.document.getElementById('backForm').submit();");
			}
			out.println(" </script> ");

		}// end sReturnablePageId 不为空

		out.println("  </BODY>");
		out.println("</HTML>");
		out.flush();
		out.close();
	}

	private static final String createInputValueScript(Parameter parameter) {
		return parameter.getName() + ": <textarea name=\"" + parameter.getName() + "\"  >"
				+ dealParameterValue(parameter.getValue()) + "</textarea><br>";
	}

	
	private static final String dealParameterValue(String value) {
		return value == null ? "" : StringEscapeUtils.escapeHtml(value);
	}

	
	
	
}
