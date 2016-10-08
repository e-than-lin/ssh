package com.utils.returnback;				

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Iterator;
import java.util.List;

import org.apache.commons.lang.builder.ToStringBuilder;
 
/**
 * 
 * @
 */
public class RequestInfo implements Serializable {

	private static final long serialVersionUID = 7939795120997659162L;
	private String requestURL;
	private String distinctPageName;
	private List<Parameter> parameterList ;//= new ArrayList<Parameter>();

	public String getRequestURL() {
		return requestURL;
	}

	public void setRequestURL(String requestURL) {
		this.requestURL = requestURL;
	}

	public void addParameter(String name, String value) {
		this.parameterList.add(new Parameter(name, value));

	}
	
	

	public Iterator<Parameter> iterator() {
		return parameterList.iterator();
	}

	public static RequestInfo getInstance(String requestURL) {
		RequestInfo requestInfo = new RequestInfo();
		requestInfo.setParameterList(new ArrayList<Parameter>());
		requestInfo.setRequestURL(requestURL);
		return requestInfo;
	}

	public List<Parameter> getParameterList() {
		return parameterList;
	}

	
	
	
	public String getUrl() {
		StringBuffer url=new StringBuffer();
		
		if(requestURL.indexOf(".action")>=0 || requestURL.indexOf(".jsp")>=0)
		{
		url.append(requestURL);
		
		if(parameterList!=null && parameterList.size()>0)
		{
			for(int i=0;i<parameterList.size();i++)
			{
				if(i==0)
				{
					url.append("?"+parameterList.get(i).getName()+"="+parameterList.get(i).getValue());	
				}
				else
				{
					url.append("&"+parameterList.get(i).getName()+"="+parameterList.get(i).getValue());	
					
				}
			}
			
		}
		 return url.toString();
		}
		
		return null;
	}
	
	
	@Override
	public String toString() {
		return new ToStringBuilder(this).append("requestURL", requestURL).append("parameterList",
				Arrays.toString(parameterList.toArray())).toString();
	}

	public String getDistinctPageName() {
		return distinctPageName;
	}

	public void setDistinctPageName(String distinctPageName) {
		this.distinctPageName = distinctPageName;
	}

	public void setParameterList(List<Parameter> parameterList) {
		this.parameterList = parameterList;
	}
	
	
	
}
