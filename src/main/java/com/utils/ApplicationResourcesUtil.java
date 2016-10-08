package com.utils;

import java.util.Properties;

public class ApplicationResourcesUtil {
	private static Properties  properties;
	private static Properties getProperties() {
		if(properties==null)
		{
			 String url="properties/ApplicationResources.properties";
			 properties=SystemUtil.getProperties(url) ;
			
		}
		return properties;
	}
	
	public static String getApplicationResourcesValue(String key)
	{
		if(getProperties()!=null)
		{
			return getProperties().getProperty(key);
		}
		else
		{
			return  null;
		}
		
	}
}
