package com.filter;

import java.io.IOException;
import java.util.Enumeration;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.utils.SystemUtil;
import com.utils.returnback.RequestInfo;
import com.utils.returnback.ReturnBackFilter;

public class SysFilter implements Filter {
	private FilterConfig filterConfig;

	

	private HttpServletRequest request;

	private HttpServletResponse response;

	protected String encoding = null;

	public void init(FilterConfig fConfig) throws ServletException {
		SystemUtil.init();
		this.filterConfig = fConfig;
		// 从web.xml文件中读取encoding的值
		encoding = filterConfig.getInitParameter("encoding");
	}

	public void doFilter(ServletRequest servletRequest,
			ServletResponse servletResponse, FilterChain chain)
			throws IOException, ServletException {
		
		// 转换HttpServletRequest
		this.request = (HttpServletRequest) servletRequest;
		// 转换HttpServletResponse
		this.response = ((HttpServletResponse) servletResponse);
		// 设置编码方式，web.xml里面有filter参数的初始化设置
		request.setCharacterEncoding(encoding);
		response.setCharacterEncoding(encoding);
		String str=request.getHeader("User-Agent") == null ? "" : request.getHeader("User-Agent");
		// 取请求URL
		String url = request.getServletPath();
		if (url == null) {
			url = "";
		}
		
		
		
		// 获取session
		HttpSession session = request.getSession();
		
		session.setAttribute("@oauser","admin");
		
		// 是否已登录
		if (session.getAttribute("@oauser") == null) {
		
			 if(checkAppUrl(url))
			{
				chain.doFilter(request, response);
			}
			// 是否登录页面
			else if (checkUrl(url)) {

				// 设置登录类型
				session.setAttribute("loginType", "1");
				if(isFromMobile() )
				{
				 if(session.getAttribute("isMobile")==null || !  session.getAttribute("isMobile").equals("1"))
					{
						session.setAttribute("isMobile", "1");
						response.sendRedirect(request.getContextPath()
								+ "/MobileLogin.jsp");
					}
					else
					{
						session.setAttribute("isMobile", "");
						chain.doFilter(request, response);
					}
				}
				
				else
				{
					session.setAttribute("isMobile", "");
					chain.doFilter(request, response);
				}
				
				
			} else if (checkLogin(url)) {
				chain.doFilter(request, response);
			} else {
				// 重定向登录页面
				if(isFromMobile() )
				{
						response.sendRedirect(request.getContextPath()
								+ "/MobileLogin.jsp");
					
				}
				
				else
				{
					RequestInfo reInfo=getNewRequestInfo(request);
					session.setAttribute("url", reInfo.getUrl());
					response.sendRedirect(request.getContextPath() + "/login.jsp");
				}
				
				
				
				
			}
		} else {

			chain.doFilter(request, response);
		}

	}

	private boolean checkUrl(String url) throws ServletException, IOException {

		if (url.indexOf("/login.jsp") >= 0 || url.indexOf("/MobileLogin.jsp") >= 0 ) {

			return true;
		}
		else if (url.indexOf("/index.jsp") >= 0 )
		{
			return true;
		}
		return false;
	}

	

	private boolean checkAppUrl(String url) throws ServletException,
			IOException {

		if (url.indexOf("/order_addOrderInfo.action")>=0 || url.indexOf("/order_processSubmit.action")>=0 ) {
			return true;
		}
		else if(url.indexOf("/order_success.action")>=0 || url.indexOf("/order_saveExperienceUser.action")>=0 )
		{
			return true;
		}
		else if(url.indexOf("/order_valUserAccountName.action")>=0 ||url.indexOf("/refile_getRF.action")>=0 )//
		{
			return true;
		}
			
		return false;
	}

	private boolean checkLogin(String url) throws ServletException, IOException {

		if (url.indexOf("/sys_login.action") >= 0) {
			return true;
		}
		return false;
	}

	public SysFilter() {

	}

	
	
	
	
	/**手机浏览器的User-Agent里的关键词*/
	private static String mobileUserAgents[]=new String[]{
	"Nokia",//诺基亚，有山寨机也写这个的，总还算是手机，Mozilla/5.0 (Nokia5800 XpressMusic)UC AppleWebkit(like Gecko) Safari/530
	"SAMSUNG",//三星手机 SAMSUNG-GT-B7722/1.0+SHP/VPP/R5+Dolfin/1.5+Nextreaming+SMM-MMS/1.2.0+profile/MIDP-2.1+configuration/CLDC-1.1
	"MIDP-2",//j2me2.0，Mozilla/5.0 (SymbianOS/9.3; U; Series60/3.2 NokiaE75-1 /110.48.125 Profile/MIDP-2.1 Configuration/CLDC-1.1 ) AppleWebKit/413 (KHTML, like Gecko) Safari/413
	"CLDC1.1",//M600/MIDP2.0/CLDC1.1/Screen-240X320
	"SymbianOS",//塞班系统的，
	"MAUI",//MTK山寨机默认ua
	"UNTRUSTED/1.0",//疑似山寨机的ua，基本可以确定还是手机
	"Windows CE",//Windows CE，Mozilla/4.0 (compatible; MSIE 6.0; Windows CE; IEMobile 7.11)
	"iPhone",//iPhone是否也转wap？不管它，先区分出来再说。Mozilla/5.0 (iPhone; U; CPU iPhone OS 4_1 like Mac OS X; zh-cn) AppleWebKit/532.9 (KHTML, like Gecko) Mobile/8B117
	"iPad",//iPad的ua，Mozilla/5.0 (iPad; U; CPU OS 3_2 like Mac OS X; zh-cn) AppleWebKit/531.21.10 (KHTML, like Gecko) Version/4.0.4 Mobile/7B367 Safari/531.21.10
	"Android",//Android是否也转wap？Mozilla/5.0 (Linux; U; Android 2.1-update1; zh-cn; XT800 Build/TITA_M2_16.22.7) AppleWebKit/530.17 (KHTML, like Gecko) Version/4.0 Mobile Safari/530.17
	"BlackBerry",//BlackBerry8310/2.7.0.106-4.5.0.182
	"UCWEB",//ucweb是否只给wap页面？ Nokia5800 XpressMusic/UCWEB7.5.0.66/50/999
	"ucweb",//小写的ucweb,貌似是uc的代理服务器,Mozilla/6.0 (compatible; MSIE 6.0;) Opera ucweb-squid
	"BREW",//很奇怪的ua，例如：REW-Applet/0x20068888 (BREW/3.1.5.20; DeviceId: 40105; Lang: zhcn) ucweb-squid
	"J2ME",//,很奇怪的ua，只有J2ME四个字母
	"YULONG",//宇龙手机，YULONG-CoolpadN68/10.14 IPANEL/2.0 CTC/1.0
	"YuLong",//还是宇龙
	"COOLPAD",//宇龙酷派,YL-COOLPADS100/08.10.S100 POLARIS/2.9 CTC/1.0
	"TIANYU",//天语手机,TIANYU-KTOUCH/V209/MIDP2.0/CLDC1.1/Screen-240X320
	"TY-",//天语，TY-F6229/701116_6215_V0230 JUPITOR/2.2 CTC/1.0
	"K-Touch",//还是天语,K-Touch_N2200_CMCC/TBG110022_1223_V0801 MTK/6223 Release/30.07.2008 Browser/WAP2.0
	"Haier",//海尔手机，Haier-HG-M217_CMCC/3.0 Release/12.1.2007 Browser/WAP2.0
	"DOPOD",//多普达手机,
	"Lenovo",//联想手机，Lenovo-P650WG/S100 LMP/LML Release/2010.02.22 Profile/MIDP2.0 Configuration/CLDC1.1
	"LENOVO",//联想手机，比如：LENOVO-P780/176A
	"HUAQIN",//华勤手机
	"AIGO-",//爱国者居然也出过手机，AIGO-800C/2.04 TMSS-BROWSER/1.0.0 CTC/1.0
	"CTC/1.0",//含义不明
	"CTC/2.0",//含义不明
	"CMCC",//移动定制手机，K-Touch_N2200_CMCC/TBG110022_1223_V0801 MTK/6223 Release/30.07.2008 Browser/WAP2.0
	"DAXIAN",//大显手机,DAXIAN X180 UP.Browser/6.2.3.2(GUI) MMP/2.0
	"MOT-",//摩托罗拉，MOT-MOTOROKRE6/1.0 LinuxOS/2.4.20 Release/8.4.2006 Browser/Opera8.00 Profile/MIDP2.0 Configuration/CLDC1.1 Software/R533_G_11.10.54R
	"SonyEricsson",//索爱手机，SonyEricssonP990i/R100 Mozilla/4.0 (compatible; MSIE 6.0; Symbian OS; 405) Opera 8.65 [zh-CN]
	"GIONEE",//金立手机
	"HTC",//HTC手机
	"ZTE",//中兴手机，ZTE-A211/P109A2V1.0.0/WAP2.0 Profile
	"HUAWEI",//华为手机，
	"webOS",//palm手机，Mozilla/5.0 (webOS/1.4.5; U; zh-CN) AppleWebKit/532.2 (KHTML, like Gecko) Version/1.0 Safari/532.2 Pre/1.0
	"GoBrowser",//3g GoBrowser.User-Agent=Nokia5230/GoBrowser/2.0.290 Safari
	"IEMobile",//Windows CE手机自带浏览器，
	"WAP2.0",//支持wap 2.0的
	};
	
	
	
	


	public  boolean isFromMobile() {
		String userAgent = request.getHeader("User-Agent");
	if (userAgent != null) {
	for (String mheader : mobileUserAgents) {
	if (userAgent.contains(mheader)) {
	return true;
	}
	}
	
	}
	return false;
	}

	
	
	private RequestInfo getNewRequestInfo(HttpServletRequest request) {
		RequestInfo requestInfo = RequestInfo.getInstance(this.getRequestFullTargetURL(request));
		requestInfo.setDistinctPageName(request
				.getParameter(ReturnBackFilter.DISTINCT_PAGE_NAME));
		Enumeration<String> parameterNames = request.getParameterNames();
		while (parameterNames.hasMoreElements()) {
			String pname = parameterNames.nextElement();
			requestInfo.addParameter(pname, request.getParameter(pname));
		}
		return requestInfo;
	}
	
	
	private String getRequestFullTargetURL(HttpServletRequest request) {
		return request.getRequestURL().toString();
	}
	
	public void destroy() {
		//this.filterConfig = null;
	}

}