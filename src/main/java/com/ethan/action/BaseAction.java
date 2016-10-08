package com.ethan.action;

/**
 * Created by ETHAN on 2016/9/22.
 */
import java.io.IOException;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.Locale;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang.StringUtils;
import org.apache.struts2.ServletActionContext;
import org.apache.struts2.interceptor.ServletRequestAware;
import org.apache.struts2.interceptor.ServletResponseAware;

import com.alibaba.fastjson.JSON;
import com.opensymphony.xwork2.ActionContext;
import com.opensymphony.xwork2.ActionSupport;
import com.utils.returnback.RequestInfo;

public class BaseAction extends ActionSupport implements ServletRequestAware, ServletResponseAware{
	
	protected HttpServletRequest request = null;
	protected HttpServletResponse response = null;
    private static final long serialVersionUID = 1L;
//    private Map<String, Object> requestMap;
//    private Map<String, Object> session;
//    private Map<String, Object> application;
    private String pageBackKey;
    private int pageBack;//1、替换key的内容；2、新建key；3、map全清再创建key
    private String pageBackUrl;
    private String pengdingCode;//待办经办的业务code，用于识别哪个业务的待办经办
    public String pagebackUrl;
    public int viewPage;//查看页面。1为是；0为否。
    private RequestInfo requestInfo;
    public void writeJson(Object object) {
        try {
            String json = JSON.toJSONStringWithDateFormat(object, "yyyy-MM-dd HH:mm:ss");
            ServletActionContext.getResponse().setContentType("text/html;charset=utf-8");
            ServletActionContext.getResponse().getWriter().write(json);
            ServletActionContext.getResponse().getWriter().flush();
            ServletActionContext.getResponse().getWriter().close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

//    public Map<String, Object> getRequestMap() {
//        return requestMap;
//    }
//
//    public void setRequest(Map<String, Object> request) {
//        this.requestMap = request;
//    }
//
//    public Map<String, Object> getSession() {
//        return session;
//    }
//
//    public void setSession(Map<String, Object> session) {
//        this.session = session;
//    }
//
//    public Map<String, Object> getApplication() {
//        return application;
//    }
//
//    public void setApplication(Map<String, Object> application) {
//        this.application = application;
//    }
    public int getOAUser()
	{
		return 10000038;
	}
 	protected synchronized void printOut(HttpServletResponse response,
			String str) {
		try {
			if (StringUtils.isNotBlank(str)) {
				// 设置字符编码
				response.setCharacterEncoding("UTF-8");
				// 设置输出流的头文件格式
				response.setContentType("text/html;charset="
						+ "UTF-8");
				// 将目标内容输出到页面
				response.getWriter().print(
						new String(str.getBytes("UTF-8"),"UTF-8"));
			}
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
    public String compType;//控件的single、double类型
  
    public String showMsg(){
    	return "SHOWMSG";
    }
    
    /**
     * 用于切换语言 
     */
	private String flag;

	public void setServletRequest(HttpServletRequest request) {
		this.request = request;
		if(this.request.getParameter("pageBack")!=null && !this.request.getParameter("pageBack").equals(""))
		{
			this.setPageBack(new Integer(this.request.getParameter("pageBack").trim()));
		}
		this.setPageBackKey(this.request.getParameter("pageBackKey"));

		if(this.pageBack==1 || this.pageBack==2 || this.pageBack==3)
		{
			if(this.pageBack==3)
			{
                   request.getSession().setAttribute("pageBackMap", null);
                   request.getSession().setAttribute("pageBackKeyMap", null);
				this.setPageBackKey(java.util.UUID.randomUUID().toString());
			}
			if(this.pageBack==2)
			{

				this.setPageBackKey(java.util.UUID.randomUUID().toString());
			}
			if(this.pageBack==1)
			{
				if(this.pageBackKey==null || this.pageBackKey.equals(""))
				{
					this.setPageBackKey(java.util.UUID.randomUUID().toString());
				}
			}
			
			if(this.pageBackKey!=null && !this.pageBackKey.equals(""))
			{
				setPageBackInfo(this.request,this.pageBackKey);
			}
		}
		
	}


	public void setServletResponse(HttpServletResponse response) {
		
		this.response = response;
	}

	
	private void setPageBackInfo(HttpServletRequest request,String backInfoKey)
	{
		
		 //pageBackKeyMap
		  Map<String,RequestInfo> pageBackMap=(Map)request.getSession().getAttribute("pageBackMap");
		  Map<String,String> pageBackKeyMap=(Map)request.getSession().getAttribute("pageBackKeyMap");
		  
		  if(pageBackMap==null)
		  {
			  pageBackMap=new HashMap<String, RequestInfo>();
			  request.getSession().setAttribute("pageBackMap", pageBackMap);
		  }
		  if(pageBackKeyMap==null)
		  {
			  pageBackKeyMap=new HashMap<String, String>();
			  request.getSession().setAttribute("pageBackKeyMap", pageBackKeyMap);
		  }
		
		  RequestInfo requestInfo = RequestInfo.getInstance(request.getRequestURL().toString());
		  Enumeration<String> parameterNames = request.getParameterNames();
			while (parameterNames.hasMoreElements()) {
				String pname = parameterNames.nextElement();
				requestInfo.addParameter(pname, request.getParameter(pname));
			}
			pageBackMap.put(backInfoKey, requestInfo);
	}
	

	protected void getBackKey(String pageBackcode)
	{
		 Map<String,String> pageBackKeyMap=(Map)request.getSession().getAttribute("pageBackKeyMap");
		 if(pageBackKeyMap!=null)
		 {
			 this.pageBackKey=pageBackKeyMap.get(pageBackcode);
		 }
	}
	
	protected void setBackKey(String pageBackcode)
	{
		 Map<String,String> pageBackKeyMap=(Map)request.getSession().getAttribute("pageBackKeyMap");
		 if(pageBackKeyMap!=null)
		 {
			 pageBackKeyMap.put(pageBackcode, this.pageBackKey);
		 }
	}
	
	
	
	
	
	//取登录类型
	protected String getLoginType()
	{
		if(request.getSession().getAttribute("loginType")!=null)
		{
			return (String)request.getSession().getAttribute("loginType");
			
		}
		return "1";
	}
	
	//设置重新验证
	protected void setFiltered()
	{
		request.getSession().setAttribute("isFiltered", null);
	}


		
	/**
	 * 退出
	 */
	protected void setLoginOut()
	{
		
	}
	public String getPageBackKey() {
		return pageBackKey;
	}

	public void setPageBackKey(String pageBackKey) {
		this.pageBackKey = pageBackKey;
	}

	public int getPageBack() {
		return pageBack;
	}

	public void setPageBack(int pageBack) {
		this.pageBack = pageBack;
	}

	public String getPageBackUrl() {
		
		  Map<String,RequestInfo> pageBackMap=(Map)request.getSession().getAttribute("pageBackMap");
		  if(pageBackMap!=null)
		  {
			  RequestInfo requestInfo =pageBackMap.get(pageBackKey);
			  if(requestInfo!=null)
			  {
				  pageBackUrl=requestInfo.getUrl();
			  }
		  }
		  //System.out.println(pageBackUrl);
		return pageBackUrl;
	}

	public void setPageBackUrl(String pageBackUrl) {
		this.pageBackUrl = pageBackUrl;
	}

	public RequestInfo getRequestInfo() {
		
		 Map<String,RequestInfo> pageBackMap=(Map)request.getSession().getAttribute("pageBackMap");
		  if(pageBackMap!=null)
		  {
			  requestInfo=pageBackMap.get(pageBackKey);
		  }
		return requestInfo;
	}

	public void setRequestInfo(RequestInfo requestInfo) {
		this.requestInfo = requestInfo;
	}

	public String getPengdingCode() {
		return pengdingCode;
	}

	public void setPengdingCode(String pengdingCode) {
		this.pengdingCode = pengdingCode;
	}
	

	public String getFlag() {
		return flag;
	}

	public void setFlag(String flag) {
		this.flag = flag;
	}

 
	public void change(){
		flag = (String)request.getSession().getAttribute("flag");
    	try {
	        Locale l = Locale.getDefault();     
	        if(this.flag==null){     
	           l = new Locale("zh", "CN");     
	        }else if (this.flag.equals("2")) {     
	           l = new Locale("zh", "CN");     
	        } else if (this.flag.equals("1")) {     
	           l = new Locale("en", "US");     
	        } 
	     ActionContext.getContext().setLocale(l); 	
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	public String getPagebackUrl() {
		return pagebackUrl;
	}

	public void setPagebackUrl(String pagebackUrl) {
		this.pagebackUrl = pagebackUrl;
	}

	public int getViewPage() {
		return viewPage;
	}

	public void setViewPage(int viewPage) {
		this.viewPage = viewPage;
	}

	public String getCompType() {
		return compType;
	}

	public void setCompType(String compType) {
		this.compType = compType;
	}



	

	
}