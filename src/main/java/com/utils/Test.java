package com.utils;

public class Test {

	/**
	 * @param args
	 */
	public static void main(String[] args) {
		// TODO Auto-generated method stub
		String str="2010-01-02";
//		if()
//		{
//			
//		}
		Object obj=SimpleDateUtil.string2Date("2010-01-02 00:00:00");
		System.out.println(obj);
		String dd="ddEEhh_";
		System.out.println(dd.substring(0,dd.length()-1));
	}

}
