package com.utils.listPage;


import java.util.List;

import com.utils.listPage.PaginationInfo;

public  class ListPageFactory<T> {

	public static interface ListPageStrategy<T> {
			public List<T> getPageElements(final int firstNum, final int lastNum);
			public int getTotalNumOfElements();
			
		}

	private ListPageStrategy<T> listPageStrategy;
	
	public ListPageFactory() {}
	
	public ListPageFactory(ListPageStrategy<T> listPageStrategy) {
		this.listPageStrategy = listPageStrategy;
	}
	

	public  IPagination<T> getPaginationInstance(int pageNo,int pageSize){
		int totalNumOfElements = getTotalNumOfElements();
		IPagination<T>  listPage = new Pagination<T>(pageNo,pageSize,totalNumOfElements);
		List<T> elements = getPageElements(listPage.getThisPageFirstElementNum(),listPage.getThisPageLastElementNum());
		listPage.setThisPageElements(elements);
		return listPage;
	}
	
	public  IPagination<T> getPaginationInstance(PaginationInfo paginationInfo){
	    paginationInfo = paginationInfo == null?new PaginationInfo():paginationInfo;
		int totalNumOfElements = getTotalNumOfElements();
		IPagination<T>  listPage = new Pagination<T>(paginationInfo.getPageNo(),paginationInfo.getPageSize(),totalNumOfElements);
		List<T> elements = getPageElements(listPage.getThisPageFirstElementNum(),listPage.getThisPageLastElementNum());
		listPage.setThisPageElements(elements);
		return listPage;
	}
	
	
	public  int getTotalNumOfElements(){
		return this.listPageStrategy.getTotalNumOfElements();
	}

	public  List<T>  getPageElements(final int firstNum,final int lastNum){
		return this.listPageStrategy.getPageElements(firstNum,lastNum);
	}

	public void setListPageStrategy(ListPageStrategy<T> listPageStrategy) {
		this.listPageStrategy = listPageStrategy;
	}
	
}
