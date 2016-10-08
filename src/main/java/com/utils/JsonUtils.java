package com.utils;

import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import net.sf.json.JsonConfig;
import net.sf.json.util.CycleDetectionStrategy;



public class JsonUtils {
	/**
	 * 将json字符串转换为Bean
	 * 
	 * @param clazz
	 *            Bean的class值
	 * @param jsonStr
	 *            json字符串
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public static <T> T toBeanFromJson(Class<T> clazz, String jsonStr) {
		
		JsonConfig jsonConfig = new JsonConfig();
		jsonConfig.setCycleDetectionStrategy(CycleDetectionStrategy.LENIENT);// 据说是为了防止自己包含自己的死循环情况.
		return (T) JSONObject.toBean(JSONObject.fromObject(jsonStr, jsonConfig), clazz);
	}

	/**
	 * 将json字符串转换为Bean
	 * 
	 * @param clazz
	 *            Bean的class值
	 * @param jsonStr
	 *            json字符串
	 * @param classMap
	 *            字成员类型
	 * @return
	 */
	@SuppressWarnings({ "unchecked" })
	public static <T> T toBeanFromJson(Class<T> clazz, String jsonStr, Map<String, Class<?>> classMap) {
		
		return (T) JSONObject.toBean(JSONObject.fromObject(jsonStr), clazz, classMap);
	}

	/**
	 * 将json字符串转换为Bean数组
	 * 
	 * @param clazz
	 * @param jsonStr
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public static <T> List<T> toBeanListFromJson(Class<T> clazz, String jsonStr) {
		
		List<T> result = new ArrayList<T>();
		JSONArray array = JSONArray.fromObject(jsonStr);
		for (int i = 0, j = array.size(); i < j; i++) {
			result.add((T) JSONObject.toBean(array.getJSONObject(i), clazz));
		}
		return result;
	}

	/**
	 * 将json字符串转换为Bean数组
	 * 
	 * @param clazz
	 * @param jsonStr
	 * @param classMap
	 * @return
	 */
	@SuppressWarnings({ "unchecked" })
	public static <T> List<T> toBeanListFromJson(Class<T> clazz, String jsonStr, Map<String, Class<?>> classMap) {
		
		List<T> result = new ArrayList<T>();
		JSONArray array = JSONArray.fromObject(jsonStr);
		for (int i = 0, j = array.size(); i < j; i++) {
			result.add((T) JSONObject.toBean(array.getJSONObject(i), clazz, classMap));
		}
		return result;
	}

	/**
	 * 将Bean转换为json字符串
	 * 
	 * @param bean
	 * @return
	 */
	public static String toJsonString(Object bean) {
		
		String jsonString = JSONObject.fromObject(bean).toString();
		return jsonString;
	}

	public static String toJsonStringWithList(List<?> list) {
		String jsonString = JSONArray.fromObject(list).toString();
		return jsonString;
	}
	
	/**
	 * 获取对象的属性及属性值
	 * 
	 * @param obj
	 * @return
	 */
	public static Map<String, Object> getObjValueMap(Object obj) {
		if (obj == null) {
			return new HashMap<String, Object>();
		}
		Map<String, Object> valueMap = getParentValueMap(obj);
		Field[] fields = obj.getClass().getDeclaredFields();
		Field.setAccessible(fields, true);
		List<Class<?>> typeList = Arrays.asList(new Class<?>[] { String.class, Integer.class, Date.class,
				Boolean.class, Long.class, Double.class });
		for (Field field : fields) {
			try {
				if (typeList.contains(field.getType())) {
					Object value = field.get(obj);
					if (value == null && field.getType().equals(String.class)) {
						value = "";
					} if (value != null && field.getType().equals(Double.class)) {
						value = DataUtils.format((Double) value, 2);
					}
					valueMap.put(field.getName(), value);
				}
			} catch (Exception e) {
			}
		}
		return valueMap;
	}

	/**
	 * 获取对象父类的属性及属性值
	 * 
	 * @param obj
	 * @return
	 */
	public static Map<String, Object> getParentValueMap(Object obj) {
		if (obj == null) {
			return new HashMap<String, Object>();
		}
		Field[] fields = obj.getClass().getSuperclass().getDeclaredFields();
		Field.setAccessible(fields, true);
		List<Class<?>> typeList = Arrays.asList(new Class<?>[] { String.class, Integer.class, Date.class,
				Boolean.class, Long.class, Double.class });
		Map<String, Object> valueMap = new HashMap<String, Object>();
		for (Field field : fields) {
			try {
				if (typeList.contains(field.getType())) {
					Object value = field.get(obj);
					if (value == null && field.getType().equals(String.class)) {
						value = "";
					}
					valueMap.put(field.getName(), value);
				}
			} catch (Exception e) {
			}
		}
		return valueMap;
	}
}
