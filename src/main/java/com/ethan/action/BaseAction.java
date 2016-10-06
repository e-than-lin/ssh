package com.ethan.action;

/**
 * Created by ETHAN on 2016/9/22.
 */
import java.io.IOException;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang.StringUtils;
import org.apache.struts2.ServletActionContext;
import org.apache.struts2.convention.annotation.Namespace;
import org.apache.struts2.convention.annotation.ParentPackage;
import org.apache.struts2.interceptor.ApplicationAware;
import org.apache.struts2.interceptor.RequestAware;
import org.apache.struts2.interceptor.SessionAware;

import com.alibaba.fastjson.JSON;
import com.opensymphony.xwork2.ActionSupport;

//@Namespace("/")
//@ParentPackage("basePackage")
public class BaseAction extends ActionSupport implements RequestAware, SessionAware, ApplicationAware {
	protected HttpServletRequest request = null;
	protected HttpServletResponse response = null;
    private static final long serialVersionUID = 1L;
    private Map<String, Object> requestMap;
    private Map<String, Object> session;
    private Map<String, Object> application;

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

    public Map<String, Object> getRequestMap() {
        return requestMap;
    }

    public void setRequest(Map<String, Object> request) {
        this.requestMap = request;
    }

    public Map<String, Object> getSession() {
        return session;
    }

    public void setSession(Map<String, Object> session) {
        this.session = session;
    }

    public Map<String, Object> getApplication() {
        return application;
    }

    public void setApplication(Map<String, Object> application) {
        this.application = application;
    }
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
 	public void setServletResponse(HttpServletResponse response) {
		this.response = response;
		
	}
	public void setServletRequest(HttpServletRequest request) {
		this.request = request;
		
	}   
}