package com.utils;

import java.sql.Timestamp;
import java.util.Date;

public class ObjUtil {
	
	//获取format格式
	private static String getFormat(String str)
	{
		String  format="yyyy-MM-dd HH:mm:ss";
		if(str.indexOf(":")<0)
		{
			 format="yyyy-MM-dd";
		}
		
		return format;
	}

	/**
	 * 把字符串数据转换成type类型的Object
	 * @param type 类型
	 * @param value 字符串内容
	 * @return
	 */
	public static Object getObj(String type,String value) 
	{
	
		String dataType=null;
		String format= null;
		if(type!=null && !type.equals(""))
		{
			if(type.indexOf(";")>0)
			{
				String[] strs=type.split(";");
				dataType=strs[0];
				format=strs[1];
			}
			else
			{
				dataType=type;
				if(dataType.toUpperCase().equals("DATE") || dataType.toUpperCase().equals("TIMESTAMP") || dataType.toUpperCase().equals("DATETIME")){
					format = getFormat(value);
				}
			}
			
		}
		else
		{
			return null;
		}
		Object obj=null;
		if(dataType.toUpperCase().equals("DATE") || dataType.toUpperCase().equals("TIMESTAMP") || dataType.toUpperCase().equals("DATETIME"))
		{
			if(value==null || value.equals("")|| value.equals("''") || value.indexOf("-")<=0)
			{
				obj=null;
			}
			else
			{
				obj=SimpleDateUtil.string2Date(value, format);
				
			}
		}
		else if(dataType.toUpperCase().equals("INTEGER")||dataType.toUpperCase().equals("NUMBER"))
		{
			if(value==null || value.equals(""))
			{
				obj=0;
			}
			else
			{
				obj=value;
			}
		}
		
		else if(dataType.toUpperCase().equals("BLOB"))
		{
			obj=StringUtil.strToObject(value);
		}
		else if(dataType.toUpperCase().equals("CLOB"))
		{
			if(value==null || value.equals(""))
			{
				value=null;
			}
			else
			{
				
				try {
					obj= new javax.sql.rowset.serial.SerialClob(value.toCharArray());
			
				} catch (Exception e) {
					obj= null;
					e.printStackTrace();
				}
				
			}
			
		}
		
		else
		{
			
			obj=value;
		}
		
		return obj;
	}
	
	public static Object getFormOBJ(String dataType,String value)
	{
		if(dataType!=null && value!=null )
		{
			if(dataType.toUpperCase().equals("VARCHAR2")|| dataType.toUpperCase().equals("TEXT") ||dataType.toUpperCase().equals("CHAR"))
			{
				return value.trim();
			}
			else if(dataType.toUpperCase().equals("INTEGER")|| dataType.toUpperCase().equals("NUMBER") ||dataType.toUpperCase().equals("DOUBLE"))
			{
				return Double.valueOf(value.trim());
			}
		
			else 
			{
				return value.trim();
				
			}
			
		}
		
		
		return null;
	}
	
	public static Double getDouble(String value)
	{
		try{
				double doubleValue=Double.valueOf(value.trim()).doubleValue();
				return doubleValue;	
	     }catch (Exception e) {
			return null;
		}
		
	}
	
	
	public static String getValue(String type,Object value)
	{
		String  strValue=null;
		String dataType=null;
		String format=null;
		if(type!=null && !type.equals(""))
		{
			if(type.indexOf(";")>0)
			{
				String[] strs=type.split(";");
				dataType=strs[0];
				format=strs[1];
			}
			else
			{
				dataType=type;
			}
			
		}
		else
		{
			if(value==null)
			{
				return null;
			}
			else
			{
			  return value.toString();
			}
		}
		
		if(dataType.toUpperCase().equals("DATE") || dataType.toUpperCase().equals("TIMESTAMP"))
		{
			
			
			if(value==null )
			{
				strValue=null;
			}
			else
			{
				Date date=null;
				if(value instanceof Timestamp)
				{
					date=new Date(((Timestamp)value).getTime());
				}
				else if(value instanceof oracle.sql.TIMESTAMP)
				{
					
					date=(Date)value;
				}
				else
				{
					date=(Date)StringUtil.getOracleTimestamp(value);
			
				}
				
				
				
				strValue=SimpleDateUtil.convert2String(date.getTime(), format);
			}
		}
		
		else
		{
			if(value==null )
			{
				strValue="";
			}
			else
			{
				
			strValue=value.toString();
			}
		}
		
		return strValue;
	}

}
