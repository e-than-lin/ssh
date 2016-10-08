package com.utils;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * 数据处理工具类
 */
public class DataUtils {
	/**
	 * 格式化double类型值
	 * 
	 * @param value
	 *            待格式化的数值
	 * @param scale
	 *            精度。比如：2表示保留小数点后2位
	 * @return
	 */
	public static double format(double value, int scale) {
		BigDecimal decimal = new BigDecimal(value);
		return format(decimal, scale);
	}

	private static double format(BigDecimal decimal, int scale) {
		return format(decimal, scale, RoundingMode.HALF_UP);
	}

	private static double format(BigDecimal decimal, int scale, RoundingMode model) {
		return decimal.setScale(scale, model).doubleValue();
	}

	/**
	 * 正则表达式判断字符串是数字，可以为正数，可以为负数，不能含有字符
	 * @param str
	 * @return
	 */
	public static boolean isNumeric(String str){ 
		   Pattern pattern = Pattern.compile("^[-+]?\\d+(\\.\\d+)?$"); 
		   Matcher isNum = pattern.matcher(str);
		   if( !isNum.matches() ){
		       return false; 
		   } 
		   return true; 
		}
	
	/**
	 * Double数值加法运算
	 * 
	 * @param scale
	 *            精度。比如：2表示保留小数点后2位
	 */
	public static double add(double value1, double value2, int scale) {
		BigDecimal bd1 = new BigDecimal(value1);
		BigDecimal bd2 = new BigDecimal(value2);
		return format(bd1.add(bd2), scale);
	}

	/**
	 * Double数值减法运算
	 * 
	 * @param scale
	 *            精度。比如：2表示保留小数点后2位
	 */
	public static double subtract(double value1, double value2, int scale) {
		BigDecimal bd1 = new BigDecimal(value1);
		BigDecimal bd2 = new BigDecimal(value2);
		return format(bd1.subtract(bd2), scale);
	}

	/**
	 * Double数值乘法运算
	 * 
	 * @param scale
	 *            精度。比如：2表示保留小数点后2位
	 */
	public static double multiply(double value1, double value2, int scale) {
		BigDecimal bd1 = new BigDecimal(value1);
		BigDecimal bd2 = new BigDecimal(value2);
		return format(bd1.multiply(bd2), scale);
	}

	/**
	 * Double数值除法运算
	 * 
	 * @param scale
	 *            精度。比如：2表示保留小数点后2位
	 */
	public static double divide(double value1, double value2, int scale) {
		BigDecimal bd1 = new BigDecimal(value1);
		BigDecimal bd2 = new BigDecimal(value2);
		return format(bd1.divide(bd2, 4, RoundingMode.HALF_UP), scale);
	}

	/**
	 * 统计length选count的组合数量
	 * 
	 * @param length
	 * @param count
	 * @return
	 */
	public static int getTotalCombination(int length, int count) {
		if (count <= 0 || length < count) {
			return 0;
		}
		int tempTotal = 1;
		int tempCount = 1;
		for (int i = 0; i < count; i++) {
			tempTotal *= (length - i);
			tempCount *= (count - i);
		}
		return tempTotal / tempCount;
	}

	/**
	 * 获取阶加
	 */
	public static int getFactorAdd(int num) {
		int result = 0;
		for (int i = num; i > 0; i--) {
			result += i;
		}
		return result;
	}

	public static void main(String[] args) {
		double v1 = 4.123468;
		double v2 = 2.892;

		double v3 = add(v1, v2, 3);
		System.out.println("加法运算，保留3位小数：" + v1 + " ＋ " + v2 + " = " + v3);
		v3 = subtract(v1, v2, 3);
		System.out.println("减法运算，保留3位小数：" + v1 + " － " + v2 + " = " + v3);
		v3 = multiply(v1, v2, 3);
		System.out.println("乘法运算，保留3位小数：" + v1 + " × " + v2 + " = " + v3);
		v3 = divide(v1, v2, 3);
		System.out.println("除法运算，保留3位小数：" + v1 + " ÷ " + v2 + " = " + v3);

		int length = 10, count = 5;
		System.out.println(length + "选" + count + "共" + getTotalCombination(length, count) + "注");
	}
}
