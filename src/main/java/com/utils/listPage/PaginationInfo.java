package com.utils.listPage;

import java.io.Serializable;
import java.util.Map;


public class PaginationInfo implements Serializable{

	private static final long serialVersionUID = -8717204048691826019L;

	public PaginationInfo() { }
	
	private int pageSize ;// 页面显示的记录数

	private int pageNo ;// 第几页

	private Map<String, Boolean> orderConditions;// <FieldName, ascending>
	

	public int getPageNo() {
		return pageNo;
	}

	public int getPageSize() {
		return pageSize;
	}

	public Map<String, Boolean> getOrderConditions() {
		return orderConditions;
	}

	/**
	 * 设置当前的页数
	 * 
	 * @param pageNumber
	 */
	public void setPageNo(int pageNo) {
		this.pageNo = pageNo;
	}

	/**
	 * 设置每页要显示的记录数
	 * 
	 * @param pageSize
	 */
	public void setPageSize(int pageSize) {
		this.pageSize = pageSize;
	}

	/**
	 * <要排序的字段,排序方式>

	 * @param orderConditions
	 */
	public void setOrderConditions(Map<String, Boolean> orderConditions) {
		this.orderConditions = orderConditions;
	}

	@Override
	public String toString() {
		return "com.rich.app.listPageDemo.domain.PaginationInfo[pageNo:"+pageNo+" ;pageSize:"+pageSize+" ;]";
	}

}
