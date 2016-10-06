package com.ethan.domain;


import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

/**
 * 分类
 */
@Entity
@Table(catalog="fpoms3",name = "tpm_category")
public class Category implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private String id;
	private String name;// 分类名称
	private String parentId;// 父类id
	private String code;// 编码
	private int sort;// 标注
	private String appKey; // 应用KEY（1：项目类型，2：合同类型,3.任务类型）
	private String parentName;//父类名称
	private String appName;//应用名称
	private Category category;
	private int orgId;
	private String allParentId;
	private int creator;//CREATOR_创建者
	private Date createTime;//创建时间
	private int  updUser;//更新者
	private Date updtime;//更新时间
	private long hasChildren;
	private String enName;//分类英文名称

	private String ex1;//板材:类别1 高频...
	private String ex2;//板材:生产商
	private String ex3;//板材:类别2 TG...
	private String ex4;//板材:类别3 无卤...
	private String ex5;//板材:是否主推



	private String emsCode;//工程编码  EMS_CODE;


	public Category() {
		
	}
	
	public Category(Category category,String parentName,String appName) {
		this.category = category;
		this.parentName = parentName;
		this.appName = appName;
	}
	
	public Category(Category category,long hasChildren) {
		this.category = category;
		this.category.setHasChildren(hasChildren);
	}

	@Id
	@Column(name = "ID_", nullable = false, unique = true)
	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	@Column(name = "G_NAME")
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	@Column(name = "PARENT_ID")
	public String getParentId() {
		return parentId;
	}

	public void setParentId(String parentId) {
		this.parentId = parentId;
	}

	@Column(name = "CODE_")
	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	@Column(name = "LABEL_")
	public int getSort() {
		return sort;
	}

	public void setSort(int sort) {
		this.sort = sort;
	}

	@Column(name = "appKey")
	public String getAppKey() {
		return appKey;
	}

	public void setAppKey(String appKey) {
		this.appKey = appKey;
	}

	@Transient
	public String getParentName() {
		return parentName;
	}

	public void setParentName(String parentName) {
		this.parentName = parentName;
	}

	@Transient
	public Category getCategory() {
		return category;
	}

	public void setCategory(Category category) {
		this.category = category;
	}

	@Transient
	public String getAppName() {
		return appName;
	}

	public void setAppName(String appName) {
		this.appName = appName;
	}

	
	@Column(name = "ORG_ID")
	public int getOrgId() {
		return orgId;
	}

	public void setOrgId(int orgId) {
		this.orgId = orgId;
	}

	@Column(name = "ALL_PARENT_ID")
	public String getAllParentId() {
		return allParentId;
	}

	public void setAllParentId(String allParentId) {
		this.allParentId = allParentId;
	}

	@Column(name = "CREATOR_")
	public int getCreator() {
		return creator;
	}

	public void setCreator(int creator) {
		this.creator = creator;
	}
	
	@Column(name = "CRE_TIME")
	public Date getCreateTime() {
		return createTime;
	}

	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}

	@Column(name = "UPD_USER")
	public int getUpdUser() {
		return updUser;
	}

	public void setUpdUser(int updUser) {
		this.updUser = updUser;
	}

	@Column(name = "UPD_TIME")
	public Date getUpdtime() {
		return updtime;
	}

	public void setUpdtime(Date updtime) {
		this.updtime = updtime;
	}

	@Transient
	public long getHasChildren() {
		return hasChildren;
	}

	public void setHasChildren(long hasChildren) {
		this.hasChildren = hasChildren;
	}
	@Column(name = "EN_NAME")
	public String getEnName() {
		return enName;
	}

	
	public void setEnName(String enName) {
		this.enName = enName;
	}
	@Column(name = "EX_1")
	public String getEx1() {
		return ex1;
	}


	public void setEx1(String ex1) {
		this.ex1 = ex1;
	}
	@Column(name = "EX_2")
	public String getEx2() {
		return ex2;
	}

	public void setEx2(String ex2) {
		this.ex2 = ex2;
	}
	@Column(name = "EX_3")
	public String getEx3() {
		return ex3;
	}

	public void setEx3(String ex3) {
		this.ex3 = ex3;
	}


	@Column(name = "EMS_CODE")
	public String getEmsCode() {//
		return emsCode;
	}

	public void setEmsCode(String emsCode) {
		this.emsCode = emsCode;
	}
	@Column(name = "EX_4")
	public String getEx4() {
		return ex4;
	}

	public void setEx4(String ex4) {
		this.ex4 = ex4;
	}
	@Column(name = "EX_5")
	public String getEx5() {
		return ex5;
	}

	public void setEx5(String ex5) {
		this.ex5 = ex5;
	}

	
	
    
	
	
	
}
