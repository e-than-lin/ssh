package com.utils.listPage;

import java.util.List;

import org.apache.commons.logging.Log;

public interface IPagination<T> {
		
		  int getPageSize();
	
		  int getPageNo();
		  
		  int getTotalNumOfElements();
		  
	  boolean isFirstPage();

	  boolean isLastPage();

	  boolean hasNextPage();

	  boolean hasPreviousPage();

	  int getLastPageNo();

	  int getThisPageFirstElementNum();

	  int getThisPageLastElementNum();

	  int getPreviousPageNo();
	  
	  int getNextPageNo();
	  
	  List<T> getThisPageElements();
	  
	  void setThisPageElements(List<T> thisPageElements);
	  
	  Log getLogger();
	  
	  String getChangePageScript(int spePageNO, String speName);
	}
