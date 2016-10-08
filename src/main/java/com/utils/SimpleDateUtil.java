package com.utils;

import java.sql.Timestamp;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

import org.apache.commons.lang.StringUtils;

public class SimpleDateUtil {
	
	// 短日期格式
	public static String DATE_FORMAT = "yyyy-MM-dd";
	
	// 长日期格式
	public static String TIME_FORMAT = "yyyy-MM-dd HH:mm:ss";

	/**
	 * 将日期格式的字符串转换为长整型
	 * 
	 * @param date
	 * @param format
	 * @return
	 */
	public static long convert2long(String date, String format) {
		try {
			if (StringUtils.isNotBlank(date)) {
				if (StringUtils.isBlank(format))
					format = SimpleDateUtil.TIME_FORMAT;

				SimpleDateFormat sf = new SimpleDateFormat(format);
				return sf.parse(date).getTime();
			}
		} catch (ParseException e) {
			e.printStackTrace();
		}
		return 0l;
	}

	
	public static Date string2Date(String dateStr)
	{
		 try {
			return new   SimpleDateFormat( "yyyy-MM-dd HH:mm:ss").parse(dateStr);
		} catch (ParseException e) {
			return null;
		
		}
		
	}
	
	public static Date orDateToJDate(oracle.sql.TIMESTAMP t)
	{
		t.toString();
		System.out.println("#################:"+t.toString());
		
		
		return null;
	}
	
	
	
	public static Date string2Date(String dateStr,String format)
	{
		 try {
			return new   SimpleDateFormat(format).parse(dateStr);
		} catch (ParseException e) {
			return null;
		
		}
		
	}
	
	/**
	 * 将长整型数字转换为日期格式的字符串
	 * 
	 * @param time
	 * @param format
	 * @return
	 */
	public static String convert2String(long time, String format) {
		if (time > 0l) {
			if (StringUtils.isBlank(format))
				format = SimpleDateUtil.TIME_FORMAT;

			SimpleDateFormat sf = new SimpleDateFormat(format);
			Date date = new Date(time);

			return sf.format(date);
		}
		return "";
	}

	/**
	 * 获取当前系统的日期
	 * 
	 * @return
	 */
	public static long curTimeMillis() {
		return System.currentTimeMillis();
	}

	
	
	public static Date getLastDayOfMonth(Date d) {  
		 try {
        Calendar cal = Calendar.getInstance();      
        cal.setTime(d) ;
        cal.set(Calendar.DAY_OF_MONTH,cal.getActualMaximum(Calendar.DATE)); 
        String dateStr=new   SimpleDateFormat( "yyyy-MM-dd ").format(cal.getTime()); 
        dateStr+=" 23:59:59";
           return new   SimpleDateFormat( "yyyy-MM-dd HH:mm:ss").parse(dateStr);
		 } catch (ParseException e) {
				
				e.printStackTrace();
				return null;
			}
    }  
	
	public static String date2Str(String format,long time)
	{
		  String dateStr=new   SimpleDateFormat( format).format(time); 
		return dateStr;
	}
	
	
    public static Date getFirstDayOfMonth(Date d) {      
        
        
        try {
 
        	String dateStr=convert2String(d.getTime(),"yyyy-MM")+"-01 00:00:00"; 

			return new   SimpleDateFormat( "yyyy-MM-dd HH:mm:ss").parse(dateStr);
		} catch (ParseException e) {
			
			return null;
		}
       
    }
    /**
     * 本季的第一天
     * @param d
     * @return
     */
    public static Date getFirstDayOfSeason(Date d)
    {
    	 Calendar c = Calendar.getInstance();
    	 c.setTime(d);    	 
         
         int m = c.get(Calendar.MONTH) + 1;            //月份
         int s = (int)Math.ceil( (m - 1)  / 3) + 1;     //季度
        
         int em = (s-1) * 3;                 //上季度最后一个月    
        
  
         Calendar ec = Calendar.getInstance();
         ec.setTimeInMillis(c.getTimeInMillis());
         ec.set(Calendar.MONTH, em );    //month 基于0,一月的值是0
         ec.set(Calendar.DAY_OF_MONTH, 1);
         ec.set(Calendar.HOUR_OF_DAY, 0);
         ec.set(Calendar.MINUTE, 0);
         ec.set(Calendar.SECOND, 0);
         ec.set(Calendar.MILLISECOND, 0);       
         return ec.getTime();
          
    }
    
    /**
     * 本季的最后一天
     * @param d
     * @return
     */
    public static Date getLastDayOfSeason(Date d)
    {
    	 try {
    	 Calendar c = Calendar.getInstance();
    	 c.setTime(d);    	
         
         int m = c.get(Calendar.MONTH) + 1;            //月份
         int s = (int)Math.ceil( (m - 1)  / 3) + 1;     //季度
        
         int em = s * 3;                        //本季度最后一个月
         
         Calendar sc = Calendar.getInstance();
         sc.setTimeInMillis(c.getTimeInMillis());
         sc.set(Calendar.MONTH, em);
         sc.set(Calendar.DAY_OF_MONTH, 1);
         sc.set(Calendar.HOUR_OF_DAY, 0);
         sc.set(Calendar.MINUTE, 0);
         sc.set(Calendar.SECOND, 0);
         sc.set(Calendar.MILLISECOND, 0);
         sc.add(Calendar.MILLISECOND, -1);    //前一秒的时间则-1    
		return sc.getTime();
		} catch (Exception e) {			
			e.printStackTrace();
			return null;
		}
    	
    }
	
    /**
     * 本周开始日期
     * @param d
     * @return
     */
	public static Date getFirstDayOfWeek(Date d)
	{
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(d);
	    int min = calendar.getActualMinimum(Calendar.DAY_OF_WEEK); //获取周开始基准	   
	    int current = calendar.get(Calendar.DAY_OF_WEEK); //获取当天周内天数
	    calendar.add(Calendar.DAY_OF_WEEK, min-current); //当天-基准，获取周开始日期
	    calendar.set(Calendar.HOUR_OF_DAY, 0);
	    calendar.set(Calendar.MINUTE, 0);
	    calendar.set(Calendar.SECOND, 0);
	    calendar.set(Calendar.MILLISECOND, 0);
	    Date start = calendar.getTime();
	   
	    return start;   
	}
	
	/**
     * 本周结束日期
     * @param d
     * @return
     */
	public static Date getLastDayOfWeek(Date d)
	{
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(d);
	    int min = calendar.getActualMinimum(Calendar.DAY_OF_WEEK); //获取周开始基准
	    int current = calendar.get(Calendar.DAY_OF_WEEK); //获取当天周内天数
	    calendar.add(Calendar.DAY_OF_WEEK, min-current+7); //当天-基准，获取周开始日期,+7下个星期的开始日期
	    calendar.set(Calendar.HOUR_OF_DAY, 0);
	    calendar.set(Calendar.MINUTE, 0);
	    calendar.set(Calendar.SECOND, 0);
	    calendar.set(Calendar.MILLISECOND, 0);
	    calendar.add(Calendar.MILLISECOND, -1);	    
	    Date end = calendar.getTime();
	    
	    return end;
	}
	
	
	
	/**
	 * 示例函数
	 * 
	 * @param args
	 */
	public static void main(String[] args) {
		System.out.println(SimpleDateUtil.convert2long("2000-01-01 01:01:01",
				SimpleDateUtil.DATE_FORMAT));

		System.out.println(SimpleDateUtil.convert2String(SimpleDateUtil
				.curTimeMillis(), SimpleDateUtil.TIME_FORMAT));		
	}
	
	
	
	
	/**
	 * 根据天数获取给出日期的天数前或者后的日期
	 * @param 日期 
	 * @param days 天数(如果获取日期之前的日期，需要用负数)
	 * @return
	 */
	public static Date getDateBeforOrAfterDays(Date date,int days){
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(date);
		calendar.add(5, days);
		Date date1 = calendar.getTime();
		return date1;
	}
	
	
	
	
	
	
	
}