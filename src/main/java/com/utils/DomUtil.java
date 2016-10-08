package com.utils;

import org.apache.commons.lang.StringUtils;
import org.dom4j.Document;
import org.dom4j.DocumentException;
import org.dom4j.DocumentHelper;

public class DomUtil {

	/**
	 * 将XML字符串转换为Document对象
	 * 
	 * @param xmlStr
	 *            XML字符串
	 * @return
	 */
	public static Document str2Docment(String xmlStr) {
		try {
			if (StringUtils.isNotBlank(xmlStr)) {
				// 将传入的XML字符串转换为Document对象
				return DocumentHelper.parseText(xmlStr);
			}
		} catch (DocumentException e) {
			e.printStackTrace();
		}
		return null;
	}

	/**
	 * 将Document对象转为字符串
	 * @param document
	 * @return
	 */
	public static String document2Str(Document document) {
		if (document != null) {
			// obj.asXML()则为Document对象转换为字符串方法
			return document.asXML();
		}
		return null;
	}
}
