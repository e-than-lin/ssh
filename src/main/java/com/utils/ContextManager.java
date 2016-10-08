package com.utils;				

import java.io.File;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;

import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.context.support.WebApplicationContextUtils;



public class ContextManager {

	private static ServletContext _servletContext = null;
	/**
     * 表单附件
     */
    public static final String FORM_ATTACHMENTS = "form.attachments";
	private static String webRoot = null;

	private static String dirRoot = null;
	
	private static String contextPath = null;
	
	

	public static void load(ServletContext servletContext) {
		try {
			if (servletContext != null) {
				_servletContext = servletContext;
				
				String realPath = servletContext.getRealPath(File.separator);
				
				webRoot = new File(realPath).getCanonicalPath();
				
				dirRoot = new File(webRoot).getParent();
				
				contextPath = servletContext.getContextPath();
			}
		} catch(Exception er) {
		
		}
	}

	/**
	 * 获取Servlet上下文
	 * 
	 * @return
	 */
	public static ServletContext getServletContext() {
		return _servletContext;
	}
	
	/**
	 * Web程序部署目录(绝对路径)
	 * @return
	 */
	public static String getWebRoot() {
		return webRoot;
	}
	
	/**
	 * Web程序部署的根目录(绝对路径)
	 * @return
	 */
	public static String getDirRoot() {
		return dirRoot;
	}
	
	/**
	 * Web程序部署名称(相对路径名)
	 * @return
	 */
	public static String getContextPath() {
		return contextPath;
	}
	
	/**
	 * Web程序Http完整的访问目录(虚拟路径)
	 * @param request
	 * @return
	 */
	public static String getWebHttpUrl(HttpServletRequest request) {
		if (request != null) {
			StringBuffer urlBuf = new StringBuffer();
			urlBuf.append(request.getScheme()).append("://").append(
					request.getServerName()).append(":").append(
					request.getServerPort()).append(request.getContextPath());
			return urlBuf.toString();
		}

		return null;
	}

	/**
	 * 获取Web容器中应用程序的上下文
	 * 
	 * @return
	 */
	public static WebApplicationContext getWebApplicationContext() {
		return WebApplicationContextUtils
				.getRequiredWebApplicationContext(_servletContext);
	}

}
