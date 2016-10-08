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

/**
 * @version
 *
 */
public class ReturnBackAction extends HttpServlet {

	/**
	 * 
	 */
	private static final long serialVersionUID = -6363778616755789447L;

	/**
	 * Constructor of the object.
	 */
	public ReturnBackAction() {
		super();
	}

	/**
	 * Destruction of the servlet. <br>
	 */
	public void destroy() {
		super.destroy(); // Just puts "destroy" string in log
		// Put your code here
	}

	

	/**
	 * Initialization of the servlet. <br>
	 * @throws ServletException if an error occure
	 */
	public void init() throws ServletException {
		// Put your code here
	}
	
	/**
	 * The doGet method of the servlet. <br>
	 * This method is called when a form has its tag value method equals to get.
	 * @param request the request send by the client to the server
	 * @param response the response send by the server to the client
	 * @throws ServletException if an error occurred
	 * @throws IOException if an error occurred
	 */
	public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		
		
		this.doPost(request, response);
	}

	/**
	 * The doPost method of the servlet. <br>
	 * This method is called when a form has its tag value method equals to post.
	 * @param request the request send by the client to the server
	 * @param response the response send by the server to the client
	 * @throws ServletException if an error occurred
	 * @throws IOException if an error occurred
	 */
	public void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.setContentType("text/html");
		PrintWriter out = response.getWriter();

		String sReturnablePageId = (String) request.getParameter(ReturnBackFilter.RETURNABLE_PAGE_ID);
		if (sReturnablePageId == null || sReturnablePageId.equals("")) {
			out.println("sReturnablePageId = " + sReturnablePageId);
			return;
		}

		List<String[]> nameValueList = null;//ReturnBackFilter.getReturnablePageInfo(request, sReturnablePageId);
		String[] urls = nameValueList.get(0);
		String url = urls[0];
		out.println("<HTML>");
		out.println("  <HEAD><TITLE>A Servlet</TITLE></HEAD>");
		out.println("  <BODY>");
		out.println(" <form name=\"backForm\" action=" + url + " style=\"display: none;\" method=\"POST\"> ");
		for (int i = 1; i < nameValueList.size(); i++) {
			String[] nameValue = nameValueList.get(i);
			out.println("<input type='text' name='" + nameValue[0] + "' value='" + nameValue[1] + "'>" + "<br>");
		}
		out.println(" </form>");

		out.println(" <script type=\"text/javascript\">");
		out.println(" window.document.getElementById('backForm').submit(); ");
		out.println(" </script> ");

		out.println("  </BODY>");
		out.println("</HTML>");
		out.flush();
		out.close();
	}


}
