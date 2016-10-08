package com.utils;

import java.util.ArrayList;
import java.util.List;
/**
 * 
 *
 */
public class ExcelSheets {
	private String sheetName;
	private List<ExcelContent> contentList;
	private String fontName;//字体
	private String titleStyleJson;//表头样式json
	private boolean border;
	public ExcelSheets() {
		sheetName = "Sheet1";
		fontName = "仿宋";
		border = true;
		StringBuffer json = new StringBuffer();
		for (int i = 0; i < 52; i++) {
			if(i==0){
				json.append("{\"width\":\"3700\",\"fontColor\":\"BLACK\",\"bgColor\":\"BLACK\",\"align\":\"center\"}");
			}else{
				json.append(",{\"width\":\"3700\",\"fontColor\":\"BLACK\",\"bgColor\":\"BLACK\",\"align\":\"LEFT\"}");
			}
		}
		titleStyleJson = "["+json.toString()+"]";
		
		if(contentList==null){
			contentList = new ArrayList<ExcelContent>();
		}
	}
	
	public String getSheetName() {
		return sheetName;
	}
	public void setSheetName(String sheetName) {
		this.sheetName = sheetName;
	}
	public List<ExcelContent> getContentList() {
		return contentList;
	}
	public void setContentList(List<ExcelContent> contentList) {
		this.contentList = contentList;
	}

	public String getFontName() {
		return fontName;
	}

	public void setFontName(String fontName) {
		this.fontName = fontName;
	}

	public String getTitleStyleJson() {
		return titleStyleJson;
	}

	public void setTitleStyleJson(String titleStyleJson) {
		this.titleStyleJson = titleStyleJson;
	}

	public boolean getBorder() {
		return border;
	}

	public void setBorder(boolean border) {
		this.border = border;
	}
	
}
