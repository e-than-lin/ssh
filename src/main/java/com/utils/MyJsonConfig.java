package com.utils;

import net.sf.json.JsonConfig;
import net.sf.json.util.CycleDetectionStrategy;

public class MyJsonConfig {

	public MyJsonConfig() {

	}

	public static JsonConfig getJsonConfig() {
		JsonConfig jsonConfig = new JsonConfig();
		jsonConfig.setCycleDetectionStrategy(CycleDetectionStrategy.LENIENT);
		jsonConfig.registerJsonValueProcessor(float.class, new FloatJsonValueProcessor());
		return jsonConfig;
	}
}
