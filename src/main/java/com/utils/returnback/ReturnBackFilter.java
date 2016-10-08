/**				
 * 
 */
package com.utils.returnback;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Enumeration;
import java.util.List;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.commons.lang.StringUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

/**
 * 
 * @
 */
public class ReturnBackFilter implements Filter {

	private static final Log log = LogFactory.getLog(ReturnBackFilter.class);

	public static final String CURRENT_RETURNABLE_PAGE_ID = "currentReturnablePageId";// 在session中保存的当前最近一个可返回页面ID

	public static final String RETURNABLE_PAGE_ID = "returnablePageId";// 可返回页面ID

	private static final String PAGE_RETURNABLE = "pageReturnable";// 页面可返回 字段名

	private static final String RETURNABLE_PAGE_INFO_LIST = "returnPageInfoList"; //

	public static final String CLEAR_RETURN_PAGE_HISTORY = "clearReturnPageHistory";

	public static final String DISTINCT_PAGE_NAME = "distinct_page_name";

	protected FilterConfig filterConfig;

	private String returnBackUrl;

	public void destroy() {
	}

	public void doFilter(ServletRequest req, ServletResponse res,
			FilterChain chain) throws IOException, ServletException {
		HttpServletRequest request = (HttpServletRequest) req;
		HttpServletResponse response = (HttpServletResponse) res;
		// ServletContext servletContext = filterConfig.getServletContext();
		String targetURL = getRequestFullTargetURL(request);
		if (!targetURL.endsWith(returnBackUrl)) {
			if ("true".equalsIgnoreCase(request
					.getParameter(ReturnBackFilter.CLEAR_RETURN_PAGE_HISTORY))) {
				clearReturnPageHistory(request.getSession());
			}

			if ("true".equalsIgnoreCase(request
					.getParameter(ReturnBackFilter.PAGE_RETURNABLE))) {
				// 判断是否为可返回页面 , 是否pageReturnable =true
				dealCurrentRequestInfo(request);
			} else {
				// 如果没有设置返回标识,就给session中置一个空变量,处理部分jsp页面读取空对象,导致报错
				// 主要是为了统一处理代码不规范的问题,不属于系统逻辑
				if (null == request.getSession().getAttribute(
						ReturnBackFilter.CURRENT_RETURNABLE_PAGE_ID))
					request
							.getSession()
							.setAttribute(
									ReturnBackFilter.CURRENT_RETURNABLE_PAGE_ID,
									"null");
			}
		}

		chain.doFilter(request, response);
	}

	public FilterConfig getFilterConfig() {
		return filterConfig;
	}

	public void init(FilterConfig filterConfig) throws ServletException {
		this.filterConfig = filterConfig;
		this.returnBackUrl = filterConfig.getInitParameter("returnBackUrl");
	}

	private void dealCurrentRequestInfo(HttpServletRequest request) {
		HttpSession session = request.getSession();
		//======================================================================
		// ================
		RequestInfo newRequestInfo = getNewRequestInfo(request);
		RequestInfo currentRequestInfo = this.getCurrentRequestInfo(session);

		List<RequestInfo> requestInfoList = ReturnBackFilter
				.getRequestInfoList(session);

		boolean replaceCurrentOrNot = StringUtils.isNotEmpty(newRequestInfo
				.getDistinctPageName())
				&& currentRequestInfo != null
				&& newRequestInfo.getDistinctPageName().equals(
						currentRequestInfo.getDistinctPageName());

		if (replaceCurrentOrNot) {
			// 当前后两个页面为同一个页面时,只记录最后一次的信息,用当前的请求信息替换旧的请求信息
			replaceCurrentRequestInfo(newRequestInfo, requestInfoList);
		} else {
			requestInfoList.add(newRequestInfo);
			// 设置当前ReturnPageId值
			updateCurrentReturnPageIdInSession(session);
		}

		if (log.isDebugEnabled()) {
			log
					.debug("**************************** print requestInfoList start***********************************");
			for (RequestInfo info : requestInfoList) {
				log.debug("RequestInfo = " + info);
			}
			log
					.debug("**************************** print requestInfoList end***********************************");
		}
		//======================================================================
		// ================
	}

	@SuppressWarnings("unchecked")
	private RequestInfo getNewRequestInfo(HttpServletRequest request) {
		RequestInfo requestInfo = RequestInfo.getInstance(this
				.getRequestFullTargetURL(request));
		requestInfo.setDistinctPageName(request
				.getParameter(ReturnBackFilter.DISTINCT_PAGE_NAME));
		Enumeration<String> parameterNames = request.getParameterNames();
		while (parameterNames.hasMoreElements()) {
			String pname = parameterNames.nextElement();
			requestInfo.addParameter(pname, request.getParameter(pname));
		}
		return requestInfo;
	}

	private void replaceCurrentRequestInfo(RequestInfo currentRequestInfo,
			List<RequestInfo> requestInfoList) {
		// 当前后两个页面为同一个页面时,只记录最后一次的信息
		requestInfoList.set(getCurrentRequestInfoId(requestInfoList),
				currentRequestInfo);
	}

	/**
	 * return the Current RequestInfo. return null when the requestInfoList is
	 * empty.
	 * 
	 * @param session
	 * @return
	 */
	private RequestInfo getCurrentRequestInfo(HttpSession session) {
		List<RequestInfo> requestInfoList = ReturnBackFilter
				.getRequestInfoList(session);
		if (requestInfoList.size() > 0) {
			return requestInfoList.get(getCurrentRequestInfoId(session));
		}
		return null;
	}

	/**
	 * 返回当前的返回ID,即最大的元素所在的index
	 * 
	 * @param session
	 * @return
	 */
	private static Integer getCurrentRequestInfoId(HttpSession session) {
		return getCurrentRequestInfoId(ReturnBackFilter
				.getRequestInfoList(session));
	}

	private static Integer getCurrentRequestInfoId(
			List<RequestInfo> requestInfoList) {
		return requestInfoList.size() - 1;
	}

	private String getRequestFullTargetURL(HttpServletRequest request) {
		return request.getRequestURL().toString();
	}

	private static void updateCurrentReturnPageIdInSession(HttpSession session) {
		session.setAttribute(ReturnBackFilter.CURRENT_RETURNABLE_PAGE_ID,
				getCurrentRequestInfoId(session));
	}

	@SuppressWarnings("unchecked")
	private static List<RequestInfo> getRequestInfoList(HttpSession session) {
		List<RequestInfo> requestInfoList = (List) session
				.getAttribute(ReturnBackFilter.RETURNABLE_PAGE_INFO_LIST);
		if (requestInfoList == null) {
			requestInfoList = new ArrayList<RequestInfo>();
			session.setAttribute(ReturnBackFilter.RETURNABLE_PAGE_INFO_LIST,
					requestInfoList);
		}
		return requestInfoList;
	}

	/**
	 * 清除历史访问记录信息,并更新session中保存的"当前返回页面ID"
	 * 
	 * @param session
	 */
	private void clearReturnPageHistory(HttpSession session) {
		session.setAttribute(ReturnBackFilter.RETURNABLE_PAGE_INFO_LIST,
				new ArrayList<RequestInfo>());
		updateCurrentReturnPageIdInSession(session);
	}

	public static RequestInfo getReturnablePageInfo(HttpServletRequest request,
			String sBackPageId) {
		if (StringUtils.isEmpty(sBackPageId)) {
			throw new IllegalArgumentException(
					"sBackPageId = null or sBackPageId = \"\" ");
		} else {
			HttpSession session = request.getSession();
			List<RequestInfo> requestInfoList = ReturnBackFilter
					.getRequestInfoList(session);
			int iBackPageId = Integer.parseInt(sBackPageId);
			if (requestInfoList.size() < iBackPageId) {
				throw new IllegalArgumentException(
						"the size of requestInfoList ="
								+ requestInfoList.size()
								+ " ,but backPageId = " + sBackPageId);
			} else {
				for (int i = iBackPageId + 1; i < requestInfoList.size(); i++) {
					requestInfoList.remove(i);// 删除不会再被使用的记录信息,但不包括要回返的页面本身(
					// 因为还可能从它到别的页面再次返回到此页面)
				}
				updateCurrentReturnPageIdInSession(session);// 更新session中的CurrentReturnPageId
				return requestInfoList.get(iBackPageId);
			}
		}
	}

}
