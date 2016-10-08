package com.utils.returnback;				
import java.io.Serializable;

/**
 * 
 * 
 */
public class Parameter implements Serializable {
	private static final long serialVersionUID = 1L;
	private String name, value;

	public Parameter() {

	}

	public Parameter(String name, String value) {
		this.name = name;
		this.value = value;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getValue() {
		return value;
	}

	public void setValue(String value) {
		this.value = value;
	}

	@Override
	public String toString() {
		return "name=" + name + "; value=" + value;
	}
}
