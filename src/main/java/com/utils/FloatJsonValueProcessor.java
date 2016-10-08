package com.utils;

import java.math.RoundingMode;
import java.text.NumberFormat;
import java.util.Locale;

import net.sf.json.JsonConfig;
import net.sf.json.processors.JsonValueProcessor;

public class FloatJsonValueProcessor implements JsonValueProcessor {

	public FloatJsonValueProcessor() {

	}

	@Override
	public Object processArrayValue(Object value, JsonConfig jsonConfig) {
		if (value instanceof float[]) {

			String[] obj = {};

			float[] nums = (float[]) value;

			for (int i = 0; i < nums.length; i++) {
				obj[i] = roundHalfUp(nums[i], 2);
			}

			return obj;
		}

		return value;
	}

	@Override
	public Object processObjectValue(String key, Object value, JsonConfig jsonConfig) {
		if (value instanceof Float) {
			return roundHalfUp((Float) value, 2);
		}

		return value;
	}

	/**
	 * 四舍五入。
	 * 
	 * @param number
	 *            数值
	 * @return 舍入后的数值
	 * @see java.text.RoundingMode.HALF_UP
	 */
	public String roundHalfUp(double number, int digits) {
		NumberFormat fmt = NumberFormat.getInstance(Locale.CHINA);//中国格式有逗号
		fmt.setMaximumFractionDigits(digits);//为格式化对象设定小数点后的显示的最多位,显示的最后位是舍入的
		fmt.setRoundingMode(RoundingMode.HALF_UP);//向上取整
		return fmt.format(number).replace(",", "");
	}

}
