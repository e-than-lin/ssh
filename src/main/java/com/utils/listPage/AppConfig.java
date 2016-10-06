package com.utils.listPage;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * 应用配置
 * 
 * 
 * 
 */
@Entity
@Table(catalog="fpoms3",name = "tpm_appconfig")
public class AppConfig implements Serializable {
	private int id;
	private String name;// 应用名称
	private String key;

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public AppConfig() {
	}

	@Id
	@Column(name = "id_")
	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	@Column(name = "name_")
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	@Column(name = "key_")
	public String getKey() {
		return key;
	}

	public void setKey(String key) {
		this.key = key;
	}

}
