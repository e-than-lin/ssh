package com.utils;

import java.io.BufferedReader;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.sql.Blob;
import java.sql.Clob;
import java.sql.SQLException;
import java.sql.Timestamp;

import org.apache.commons.lang.StringUtils;

import java.lang.reflect.Method;



import sun.misc.BASE64Decoder;

public class StringUtil {

	
	
	public static String subString(String str,int len) {
		if (StringUtils.isBlank(str)  )
		{
			return "";
		}
		else if(str.length()>len)
		{
			str=str.substring(0,len);
		}
			

		return str;
	}
	
	/**
	 * 将null字符串对象转换成字符串
	 * 
	 * @param str
	 * @return
	 */
	public static String null2String(String str) {
		if (StringUtils.isBlank(str))
			return "";

		return str;
	}

	/**
	 * 将null对象转换成字符串
	 * 
	 * @param obj
	 *            指定的字符串
	 * @return String 如果obj为null,则返回""；否则返回原字符串;
	 */
	public static String null2String(Object obj) {
		if (obj == null)
			return "";

		return obj.toString();
	}

	/**
	 * 将inputStream对象转换成字符串
	 * 
	 * @param in
	 *            inputStream对象
	 * @return
	 */
	public static String inputStream2String(InputStream stream) {
		if (stream != null) {
			BufferedReader in = null;
			try {
				in = new BufferedReader(new InputStreamReader(stream,"utf-8"));
			
			StringBuffer buffer = new StringBuffer();
			String line = "";
			
				while ((line = in.readLine()) != null) {
					buffer.append(line);
				}
				return buffer.toString();
			} catch (IOException e) {
				e.printStackTrace();
			} finally {
				
					try {
						in.close();
						stream.close();
					} catch (IOException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}
				
				
			}
		}
		return "";
	}

	/**
	 * 按分割符号切分,获取切分后末尾段的字符内容
	 * 
	 * @param str
	 * @return
	 */
	public static String getLastStr(String str, String regex) {
		if (StringUtils.isNotBlank(str) && StringUtils.isNotBlank(regex)
				&& str.lastIndexOf(regex) > 0) {
			return str.substring(str.lastIndexOf(regex) + 1, str.length());
		}
		return str;
	}

	/**
	 * 按分割符号切分,获取切分后最前面段的字符内容
	 * 
	 * @param str
	 * @param regex
	 * @return
	 */
	public static String getFrontStr(String str, String regex) {
		if (StringUtils.isNotBlank(str) && StringUtils.isNotBlank(regex)
				&& str.indexOf(regex) > 0) {
			return str.substring(0, str.indexOf(regex));
		}
		return str;
	}

	/**
	 * 按"."符号切分,获取切分后最前面段的字符内容
	 * 
	 * @param str
	 * @return
	 */
	public static String getFrontStrByDot(String str) {
		return getFrontStr(str, ".");
	}

	/**
	 * 用呼号将两个单独的字符，串联在一起 
	 * 例：字符'A', 字符'B',符号'&',结果返回'A&B'
	 * 
	 * @param src
	 *            源字符
	 * @param dest
	 *            目标字符
	 * @param sign
	 *            串联符号
	 * @return
	 */
	public static String appendStr(String src, String dest, String sign) {
		if (StringUtils.isNotBlank(src) && StringUtils.isNotBlank(dest)) {
			if (src.endsWith(",")) {
				return src + dest;
			} else {
				return src + "," + dest;
			}
		}
		return src;
	}
	
	
	// 将 s 进行 BASE64 编码 
	public static String getBASE64(String s) { 
	if (s == null) return null; 
	return (new sun.misc.BASE64Encoder()).encode( s.getBytes() ); 
	} 

	// 将 BASE64 编码的字符串 s 进行解码 
	public static String getFromBASE64(String s) { 
	if (s == null) return null; 
	BASE64Decoder decoder = new BASE64Decoder(); 
	try { 
	byte[] b = decoder.decodeBuffer(s); 
	return new String(b); 
	} catch (Exception e) { 
	return null; 
	} 
	}
	
	public static String clobToStr(Clob clob)
	{
		String detailInfo="";
		if(clob!=null)
		{

		  try {
			detailInfo=clob.getSubString((long)1,(int)clob.length());
		} catch (SQLException e) {
			e.printStackTrace();
		}
		}
		return detailInfo;
	}
	
	public static byte[] getBlog(Blob blob) throws SQLException
	{
		byte[] data = null;
		 InputStream inStream =null;
		   try {
		    
				inStream = blob.getBinaryStream();
		    
		       long nLen = blob.length();

		       int nSize = (int) nLen;

		       data = new byte[nSize];

		       inStream.read(data);

		       
		      } catch (IOException e) {
                    e.printStackTrace();
		                	}
		      finally{
		    	  
		    	  try {
		    		  if(inStream!=null)
		    		  {
		    			  inStream.close();
		    		  }
					
				} catch (IOException e) {
				
					e.printStackTrace();
				}
		      }
		                return data;
	}
	
	
	public static Object strToObject(String longStr)
	{
		try{
		byte[]     bytes_zyjs     =     longStr.getBytes();  
		  ByteArrayInputStream     baisss     =     new     ByteArrayInputStream(bytes_zyjs);  
		  InputStreamReader     bais     =     new     InputStreamReader(baisss); 
		  return bais;
		}catch (Exception e) {
			e.printStackTrace();
		}
		
		return null;
		
	}
	
	
	
	public static Timestamp getOracleTimestamp(Object value) {
		  try {
		    Class clz = value.getClass();
		  
		    Method method = clz.getMethod("timestampValue", null); 
		         //method = clz.getMethod("timeValue", null); 时间类型 
		         //method = clz.getMethod("dateValue", null); 日期类型
		    return (Timestamp)method.invoke(value, null);
		  } catch (Exception e) {
		    e.printStackTrace();
		  }
		return null;
		}
	
	/***
	 *  创建XML标签
	 * @param name  标签名称
	 * @param value 标签值
	 * @return
	 */
	public static String creatXmlLabel( String name,String value) {
		StringBuffer sb=new StringBuffer();
		sb.append("<"+name+">");
		sb.append("[CDATA["+value+"]]");
		sb.append("</"+name+">");
		return sb.toString();
	}
	
	public static String getNewString(String input){
		String result = "";
		try{
		result = new String(input.getBytes("iso-8859-1"),"utf-8");
		}catch(Exception e){
		e.printStackTrace();
		}
		return result;
		}
	
}
