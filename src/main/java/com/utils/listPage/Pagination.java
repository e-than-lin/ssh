package com.utils.listPage;

import java.util.List;

import org.apache.commons.lang.builder.ReflectionToStringBuilder;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;


public  class Pagination<T> implements IPagination<T> {
	
	private static Log log = LogFactory.getLog(Pagination.class);

	private static final int pageSize_Default = 15;
	
	
/*********************初始化时不可缺少的属性**************************/


	private int pageSize;// 页面显示的记录数

	private int pageNo;// 第几页
	
	private int totalNumOfElements; // 总记录数
/***********************计算得出的数据***************************/
	
	private int lastPageNo;//最后一页的页码数

	private int startRowNum;//本次查询所指定的起始行号

	private int endRowNum;//本次查询所指定的截止行号

	private int previousPageNo;//前一页页码数

	private int nextPageNo;//下一页页码数

	/********************设置查询的结果**************************/
 	private List<T> thisPageElements;
	
	public  Pagination(int pageNo,int pageSize,int totalNumOfElements) { 
		this.pageNo = pageNo ;
		this.pageSize = pageSize;
		this.totalNumOfElements = totalNumOfElements;
		initParm();
	}
	
	
	protected void initParm(){
		pageSize = pageSize <= 0 ? pageSize_Default : pageSize;

		lastPageNo = pageSize > totalNumOfElements ? 1 : (totalNumOfElements + pageSize - 1) / pageSize;

		pageNo = pageNo < 1 ? 1 : pageNo;	
		
		pageNo = pageNo > lastPageNo ? lastPageNo : pageNo;

		startRowNum = pageSize * (pageNo - 1) + 1;

		endRowNum = pageSize * pageNo;		
		
		endRowNum = endRowNum > totalNumOfElements ? totalNumOfElements : endRowNum;

		previousPageNo = pageNo > 2 ? pageNo - 1 : 1;

		nextPageNo = pageNo < lastPageNo ? pageNo + 1 : lastPageNo;
	}



	/**
	 * 得到本页的结果
	 */
	public  List<T> getThisPageElements() {	return thisPageElements;}
	
	@SuppressWarnings("unchecked")
	public void setThisPageElements(List thisPageElements) {	this.thisPageElements = thisPageElements;	}
			
	/**
	 * 页面显示的记录数
	 */
	public int getPageSize() {	return pageSize;}

	/**
	 * 当前是第几页
	 */
	public int getPageNo() {return  pageNo;}

	/**
	 * 符合条件的总记录数
	 */
	public int getTotalNumOfElements() {return totalNumOfElements;}

	/**
	 * 前一页页码数
	 */
	public int getPreviousPageNo() {return previousPageNo;}

	/**
	 * 下一页页码数
	 */
	public int getNextPageNo() {return nextPageNo;}

	/**
	 * 最后一页的页码数
	 */
	public int getLastPageNo() {return lastPageNo;}

	/**
	 * 本次查询所指定的起始行号
	 */
	public int getThisPageFirstElementNum() {return startRowNum;}

	/**
	 * 本次查询所指定的截止行号
	 */
	public int getThisPageLastElementNum() {return endRowNum;}

	/**
	 * 是否是第一页
	 */
	public boolean isFirstPage() {return getPageNo() == 0;}

	/**
	 * 是否是最后一页
	 */
	public boolean isLastPage() {return getPageNo() >= getLastPageNo();}

	/**
	 * 是否有前一页
	 */
	public boolean hasPreviousPage() {return getPageNo() > 0;}

	/**
	 * 是否有下一页
	 */
	public boolean hasNextPage() {return getLastPageNo() > getPageNo();}

	public Log getLogger() {return log;}
	
	public String getChangePageScript(int spePageNO, String speName) {
		if (spePageNO == this.getPageNo()) {
			return speName;
		} else {
				StringBuilder script = new StringBuilder("<a href=\"javascript:changePage('");
				script.append(spePageNO);
				script.append("');\" class=\"tableFooter\">").append(speName).append("</a>");
			return script.toString();
		}
	}

	@Override
	public String toString() {
		return ReflectionToStringBuilder.reflectionToString(this);
	}

}































