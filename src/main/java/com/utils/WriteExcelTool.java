package com.utils;

import java.io.IOException;
import java.io.OutputStream;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

//import org.apache.commons.lang.StringUtils;
//import org.apache.poi.hssf.usermodel.HSSFCell;
//import org.apache.poi.hssf.usermodel.HSSFCellStyle;
//import org.apache.poi.hssf.usermodel.HSSFFont;
//import org.apache.poi.hssf.usermodel.HSSFRow;
//import org.apache.poi.hssf.usermodel.HSSFSheet;
//import org.apache.poi.hssf.usermodel.HSSFWorkbook;
//import org.apache.poi.hssf.util.HSSFColor;
/**
 * 
 *
 */
public class WriteExcelTool {
	
//	
//	public static void writeExcel(String fileName,List<ExcelSheets> sheets,HttpServletResponse re) throws Exception {
//		if(sheets!=null&&!sheets.isEmpty()){
//			HSSFWorkbook wb=null;
//			HSSFSheet sheet = null;
//			HSSFRow row = null;
//			int rowNum = 0;
//			HSSFCellStyle[] titleStyleArr = null;
//			HSSFCellStyle[] cellstyleArr = null;
//			wb = new HSSFWorkbook();
//			
//			// 添加sheet
//			for (ExcelSheets sheetTemp:sheets) {
//				sheet = wb.createSheet(sheetTemp.getSheetName());
// 
//				int showNum = 0;
//				JSONArray array=JSONArray.fromObject(sheetTemp.getTitleStyleJson());
//				showNum = array.size();
//				titleStyleArr = new HSSFCellStyle[showNum];
//				cellstyleArr = new HSSFCellStyle[showNum];
//				for (int i = 0; i < array.size(); i++) {
//					JSONObject obj = array.getJSONObject(i);
//					short width = (short)Integer.parseInt(obj.getString("width"));
//					short fontColor = getColot(obj.getString("fontColor"));
//					short bgColor = getColot(obj.getString("bgColor"));
//					short align = getAlign(obj.getString("align"));
//					sheet.setColumnWidth((short) i,width);//设置列宽
//					titleStyleArr[i] = createCellStyle(wb,getAlign("CENTER"), (short) 12,HSSFFont.BOLDWEIGHT_BOLD,sheetTemp.getBorder(),fontColor,bgColor,sheetTemp.getFontName());
//					cellstyleArr[i] = createCellStyle(wb,align, (short) 12,HSSFFont.BOLDWEIGHT_NORMAL,sheetTemp.getBorder(),getColot("AUTOMATIC"),getColot("WHITE"),sheetTemp.getFontName());;
//				}
//				
//				//设置样式
//				rowNum = 0;
//				for (ExcelContent contTemp:sheetTemp.getContentList()) {
//					// 添加row
//					row = sheet.createRow(rowNum);
//					
//					if(rowNum==0){
//						//设置行高
//						row.setHeight((short) 400);
//						setCellVal(wb,row,titleStyleArr, contTemp,showNum);
//					}else{
//						//填写行的数据
//						setCellVal(wb,row,cellstyleArr, contTemp,showNum);
//					}
//					rowNum++;
//				}
//			}
//			
//			try {
//				OutputStream os = re.getOutputStream();
//				re.reset();// 清空输出流
//				re.setHeader("Content-disposition", "attachment; filename="+new String(fileName.getBytes("gbk"),"ISO-8859-1")+".xls");
//				re.setContentType("application/vnd.ms-excel");//设置类型
//				re.setHeader("Pragma","No-cache");//设置头
//				re.setHeader("Cache-Control","no-cache");//设置头
//				
//				wb.write(os);
//				os.flush();
//				os.close();
//			} catch (IOException e) {
//				e.printStackTrace();
//				throw new Exception("导出excel出错！"+e.getMessage());
//			}
//		}
//	}
//	
//	@SuppressWarnings( { "deprecation", "unused" })
//	protected static void cteateCell(HSSFWorkbook wb, HSSFRow row, short ocoll,
//			HSSFCellStyle cellstyle, String val) {
//		HSSFCell cell = row.createCell(ocoll);
//		cell.setCellType(HSSFCell.CELL_TYPE_STRING);
//		cell.setCellValue(val);
//		cell.setCellStyle(cellstyle);
//	}
//	
//	protected static HSSFCellStyle createCellStyle(HSSFWorkbook wb,
//			short cAlign, short HfHeighteight, short fBoldweight,boolean boder
//			,short fontColor,short bgColor,String fontName) {
//		
//		HSSFCellStyle style = wb.createCellStyle();
//		style.setAlignment(cAlign);
//		if (boder) {
//			style.setBorderLeft(HSSFCellStyle.BORDER_THIN);
//			style.setBorderTop(HSSFCellStyle.BORDER_THIN);
//			style.setBorderRight(HSSFCellStyle.BORDER_THIN);
//			style.setBorderBottom(HSSFCellStyle.BORDER_THIN);			
//		}else {
//			style.setBorderLeft(HSSFCellStyle.BORDER_NONE);
//			style.setBorderTop(HSSFCellStyle.BORDER_NONE);
//			style.setBorderRight(HSSFCellStyle.BORDER_NONE);
//			style.setBorderBottom(HSSFCellStyle.BORDER_NONE);	
//		}
//		style.setVerticalAlignment(HSSFCellStyle.VERTICAL_CENTER);//设置垂直居中
//		style.setWrapText(true);    //自动换行
//		style.setFillPattern(HSSFCellStyle.SOLID_FOREGROUND);  
//		style.setFillForegroundColor(bgColor);//设置单元格显示颜色
//		HSSFFont font = wb.createFont();
//		font.setFontHeightInPoints(HfHeighteight);
//		font.setBoldweight(fBoldweight);
//		font.setColor(fontColor);
//		font.setFontName(fontName);
//		style.setFont(font);
//		return style;
//		
//	}
//	
//	protected static short getColot(String colorName) {
//		
//		if (StringUtils.isBlank(colorName)) {colorName = "AUTOMATIC";}
//		colorName = colorName.toUpperCase().trim();
//		short color = HSSFColor.AUTOMATIC.index;//默认色
//		if (colorName.equals("AUTOMATIC"))  {color=HSSFColor.AUTOMATIC.index;}
//		if (colorName.equals("AQUA"))  {color=HSSFColor.AQUA.index;}
//		if (colorName.equals("BLACK")) {color=HSSFColor.BLACK.index;}
//		if (colorName.equals("BLUE"))  {color=HSSFColor.BLUE.index;}
//		if (colorName.equals("BRIGHT_GREEN")) {color=HSSFColor.BRIGHT_GREEN.index;}
//		if (colorName.equals("BROWN")) {color=HSSFColor.BROWN.index;}
//		if (colorName.equals("CORAL")) {color=HSSFColor.CORAL.index;}
//		if (colorName.equals("CORNFLOWER_BLUE")) {color=HSSFColor.CORNFLOWER_BLUE.index;}
//		if (colorName.equals("DARK_BLUE")) {color=HSSFColor.DARK_BLUE.index;}
//		if (colorName.equals("DARK_GREEN")) {color=HSSFColor.DARK_GREEN.index;}
//		if (colorName.equals("DARK_RED")) {color=HSSFColor.DARK_RED.index;}
//		if (colorName.equals("DARK_TEAL")) {color=HSSFColor.DARK_TEAL.index;}
//		if (colorName.equals("DARK_YELLOW")) {color=HSSFColor.DARK_YELLOW.index;}
//		if (colorName.equals("GOLD")) {color=HSSFColor.GOLD.index;}
//		if (colorName.equals("GREEN")) {color=HSSFColor.GREEN.index;}
//		if (colorName.equals("GREY_25_PERCENT")) {color=HSSFColor.GREY_25_PERCENT.index;}
//		if (colorName.equals("GREY_40_PERCENT")) {color=HSSFColor.GREY_40_PERCENT.index;}
//		if (colorName.equals("GREY_50_PERCENT")) {color=HSSFColor.GREY_50_PERCENT.index;}
//		if (colorName.equals("GREY_80_PERCENT")) {color=HSSFColor.GREY_80_PERCENT.index;}
//		if (colorName.equals("INDIGO")) {color=HSSFColor.INDIGO.index;}
//		if (colorName.equals("LAVENDER")) {color=HSSFColor.LAVENDER.index;}
//		if (colorName.equals("LEMON_CHIFFON")) {color=HSSFColor.LEMON_CHIFFON.index;}
//		if (colorName.equals("LIGHT_BLUE")) {color=HSSFColor.LIGHT_BLUE.index;}
//		if (colorName.equals("LIGHT_CORNFLOWER_BLUE")) {color=HSSFColor.LIGHT_CORNFLOWER_BLUE.index;}
//		if (colorName.equals("LIGHT_GREEN")) {color=HSSFColor.LIGHT_GREEN.index;}
//		if (colorName.equals("LIGHT_ORANGE")) {color=HSSFColor.LIGHT_ORANGE.index;}
//		if (colorName.equals("LIGHT_TURQUOISE")) {color=HSSFColor.LIGHT_TURQUOISE.index;}
//		if (colorName.equals("LIGHT_YELLOW")) {color=HSSFColor.LIGHT_YELLOW.index;}
//		if (colorName.equals("LIME")) {color=HSSFColor.LIME.index;}
//		if (colorName.equals("MAROON")) {color=HSSFColor.MAROON.index;}
//		if (colorName.equals("OLIVE_GREEN")) {color=HSSFColor.OLIVE_GREEN.index;}
//		if (colorName.equals("ORANGE")) {color=HSSFColor.ORANGE.index;}
//		if (colorName.equals("ORCHID")) {color=HSSFColor.ORCHID.index;}
//		if (colorName.equals("PALE_BLUE")) {color=HSSFColor.PALE_BLUE.index;}
//		if (colorName.equals("PINK")) {color=HSSFColor.PINK.index;}
//		if (colorName.equals("PLUM")) {color=HSSFColor.PLUM.index;}
//		if (colorName.equals("RED")) {color=HSSFColor.RED.index;}
//		if (colorName.equals("ROSE")) {color=HSSFColor.ROSE.index;}
//		if (colorName.equals("ROYAL_BLUE")) {color=HSSFColor.ROYAL_BLUE.index;}
//		if (colorName.equals("SEA_GREEN")) {color=HSSFColor.SEA_GREEN.index;}
//		if (colorName.equals("SKY_BLUE")) {color=HSSFColor.SKY_BLUE.index;}
//		if (colorName.equals("TAN")) {color=HSSFColor.TAN.index;}
//		if (colorName.equals("TEAL")) {color=HSSFColor.TEAL.index;}
//		if (colorName.equals("TURQUOISE")) {color=HSSFColor.TURQUOISE.index;}
//		if (colorName.equals("VIOLET")) {color=HSSFColor.VIOLET.index;}
//		if (colorName.equals("WHITE")) {color=HSSFColor.WHITE.index;}
//		if (colorName.equals("YELLOW")) {color=HSSFColor.YELLOW.index;}
//		return color;
//	}
//	
//	protected static  short getAlign(String align) {
//		
//		if (StringUtils.isBlank(align)) {align = "CENTER";}
//		align = align.toUpperCase().trim();
//		short alignIndex = HSSFCellStyle.ALIGN_CENTER;
//		if (align.equals("LEFT")) {alignIndex=HSSFCellStyle.ALIGN_LEFT;}
//		if (align.equals("CENTER")) {alignIndex=HSSFCellStyle.ALIGN_CENTER;}
//		if (align.equals("RIGHT")) {alignIndex=HSSFCellStyle.ALIGN_RIGHT;}
//		return alignIndex;
//	}
//	
//	protected static void setCellVal(HSSFWorkbook wb, HSSFRow row,
//			HSSFCellStyle[] styleArr,ExcelContent content,int showNum) {
//		if (showNum==0) {
//			showNum = 51;
//		}else {
//			showNum =showNum-1;
//		}
//		if(showNum>=0){cteateCell(wb, row, (short) 0, styleArr[0], content.getStr_A());}
//		if(showNum>=1){cteateCell(wb, row, (short) 1, styleArr[1], content.getStr_B());}
//		if(showNum>=2){cteateCell(wb, row, (short) 2, styleArr[2], content.getStr_C());}
//		if(showNum>=3){cteateCell(wb, row, (short) 3, styleArr[3], content.getStr_D());}
//		if(showNum>=4){cteateCell(wb, row, (short) 4, styleArr[4], content.getStr_E());}
//		if(showNum>=5){cteateCell(wb, row, (short) 5, styleArr[5], content.getStr_F());}
//		if(showNum>=6){cteateCell(wb, row, (short) 6, styleArr[6], content.getStr_G());}
//		if(showNum>=7){cteateCell(wb, row, (short) 7, styleArr[7], content.getStr_H());}
//		if(showNum>=8){cteateCell(wb, row, (short) 8, styleArr[8], content.getStr_I());}
//		if(showNum>=9){cteateCell(wb, row, (short) 9, styleArr[9], content.getStr_J());}
//		if(showNum>=10){cteateCell(wb, row, (short) 10, styleArr[10], content.getStr_K());}
//		if(showNum>=11){cteateCell(wb, row, (short) 11, styleArr[11], content.getStr_L());}
//		if(showNum>=12){cteateCell(wb, row, (short) 12, styleArr[12], content.getStr_M());}
//		if(showNum>=13){cteateCell(wb, row, (short) 13, styleArr[13], content.getStr_N());}
//		if(showNum>=14){cteateCell(wb, row, (short) 14, styleArr[14], content.getStr_O());}
//		if(showNum>=15){cteateCell(wb, row, (short) 15, styleArr[15], content.getStr_P());}
//		if(showNum>=16){cteateCell(wb, row, (short) 16, styleArr[16], content.getStr_Q());}
//		if(showNum>=17){cteateCell(wb, row, (short) 17, styleArr[17], content.getStr_R());}
//		if(showNum>=18){cteateCell(wb, row, (short) 18, styleArr[18], content.getStr_S());}
//		if(showNum>=19){cteateCell(wb, row, (short) 19, styleArr[19], content.getStr_T());}
//		if(showNum>=20){cteateCell(wb, row, (short) 20, styleArr[20], content.getStr_U());}
//		if(showNum>=21){cteateCell(wb, row, (short) 21, styleArr[21], content.getStr_V());}
//		if(showNum>=22){cteateCell(wb, row, (short) 22, styleArr[22], content.getStr_W());}
//		if(showNum>=23){cteateCell(wb, row, (short) 23, styleArr[23], content.getStr_X());}
//		if(showNum>=24){cteateCell(wb, row, (short) 24, styleArr[24], content.getStr_Y());}
//		if(showNum>=25){cteateCell(wb, row, (short) 25, styleArr[25], content.getStr_Z());}
//		if(showNum>=26){cteateCell(wb, row, (short) 26, styleArr[26], content.getStr_AA());}
//		if(showNum>=27){cteateCell(wb, row, (short) 27, styleArr[27], content.getStr_BB());}
//		if(showNum>=28){cteateCell(wb, row, (short) 28, styleArr[28], content.getStr_CC());}
//		if(showNum>=29){cteateCell(wb, row, (short) 29, styleArr[29], content.getStr_DD());}
//		if(showNum>=32){cteateCell(wb, row, (short) 30, styleArr[30], content.getStr_EE());}
//		if(showNum>=31){cteateCell(wb, row, (short) 31, styleArr[31], content.getStr_FF());}
//		if(showNum>=32){cteateCell(wb, row, (short) 32, styleArr[32], content.getStr_GG());}
//		if(showNum>=33){cteateCell(wb, row, (short) 33, styleArr[33], content.getStr_HH());}
//		if(showNum>=34){cteateCell(wb, row, (short) 34, styleArr[34], content.getStr_II());}
//		if(showNum>=35){cteateCell(wb, row, (short) 35, styleArr[35], content.getStr_JJ());}
//		if(showNum>=36){cteateCell(wb, row, (short) 36, styleArr[36], content.getStr_KK());}
//		if(showNum>=37){cteateCell(wb, row, (short) 37, styleArr[37], content.getStr_LL());}
//		if(showNum>=38){cteateCell(wb, row, (short) 38, styleArr[38], content.getStr_MM());}
//		if(showNum>=39){cteateCell(wb, row, (short) 39, styleArr[39], content.getStr_NN());}
//		if(showNum>=40){cteateCell(wb, row, (short) 40, styleArr[40], content.getStr_OO());}
//		if(showNum>=41){cteateCell(wb, row, (short) 41, styleArr[41], content.getStr_PP());}
//		if(showNum>=42){cteateCell(wb, row, (short) 42, styleArr[42], content.getStr_QQ());}
//		if(showNum>=43){cteateCell(wb, row, (short) 43, styleArr[43], content.getStr_RR());}
//		if(showNum>=44){cteateCell(wb, row, (short) 44, styleArr[44], content.getStr_SS());}
//		if(showNum>=45){cteateCell(wb, row, (short) 45, styleArr[45], content.getStr_TT());}
//		if(showNum>=46){cteateCell(wb, row, (short) 46, styleArr[46], content.getStr_UU());}
//		if(showNum>=47){cteateCell(wb, row, (short) 47, styleArr[47], content.getStr_VV());}
//		if(showNum>=48){cteateCell(wb, row, (short) 48, styleArr[48], content.getStr_WW());}
//		if(showNum>=49){cteateCell(wb, row, (short) 49, styleArr[49], content.getStr_XX());}
//		if(showNum>=50){cteateCell(wb, row, (short) 50, styleArr[50], content.getStr_YY());}
//		if(showNum>=51){cteateCell(wb, row, (short) 51, styleArr[51], content.getStr_ZZ());}
//	}
}
