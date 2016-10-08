package com.utils;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.ArrayList;
import java.util.List;
//
//import org.apache.poi.ss.usermodel.Cell;
//import org.apache.poi.ss.usermodel.Row;
//import org.apache.poi.ss.usermodel.Sheet;
//import org.apache.poi.ss.usermodel.Workbook;
//import org.apache.poi.ss.usermodel.WorkbookFactory;
/**
 * 
 *
 */
public class ReadExcelTool {
	/**
	 * 读取Excel
	 */
	public ReadExcelTool(){
		
	}
	
//	public static List<ExcelContent> readExcelByPathname(String pathName) throws Exception{
//		Workbook wb = null;
//		int columnNum = 0; 
//		String value="";
//		ExcelContent excelContent = null;
//		List<ExcelContent> excelContentList = null;
//		
//		if(!pathName.endsWith(".xls")
//				&&!pathName.endsWith(".xlsx")
//				&&!pathName.endsWith(".et")){
//			new File(pathName).delete();
//			throw new Exception("文件格式错误！");
//		}
//		
//		excelContentList=new ArrayList<ExcelContent>();
//		try {
//			InputStream inp = new FileInputStream(pathName);
//			wb = WorkbookFactory.create(inp); 
//			Sheet sheet = wb.getSheetAt(wb.getFirstVisibleTab());
//			if(sheet.getRow(0)!=null){  
//			   columnNum = sheet.getRow(0).getLastCellNum()-sheet.getRow(0).getFirstCellNum();  
//			}else {
//				throw new Exception("文件内容为空！");
//			} 
//			 if(columnNum>0){
//				for (Row row:sheet) {
//					
//					if(row.getRowNum()<1)continue;
//					
//					excelContent= new ExcelContent();
//					for (int i = 0; i < columnNum; i++) {
//						 Cell cell = row.getCell(i, Row.CREATE_NULL_AS_BLANK);
//						 cell.setCellType(Cell.CELL_TYPE_STRING);
//						 value=cell.getStringCellValue().trim();
//						 switch(cell.getColumnIndex())
//			        		{
//			        		case 0:
//								excelContent.setStr_A(value);
//								break;
//							case 1:
//								excelContent.setStr_B(value);
//								break;
//							case 2:
//								excelContent.setStr_C(value);
//								break;
//							case 3:
//								excelContent.setStr_D(value);
//								break;
//							case 4:
//								excelContent.setStr_E(value);
//								break;
//							case 5:
//								excelContent.setStr_F(value);
//								break;
//							case 6:
//								excelContent.setStr_G(value);
//								break;
//							case 7:
//								excelContent.setStr_H(value);
//								break;
//							case 8:
//								excelContent.setStr_I(value);
//								break;
//							case 9:
//								excelContent.setStr_J(value);
//								break;
//							case 10:
//								excelContent.setStr_K(value);
//								break;	
//							case 11:
//								excelContent.setStr_L(value);
//								break;	
//							case 12:
//								excelContent.setStr_M(value);
//								break;
//							case 13:
//								excelContent.setStr_N(value);
//								break;
//							case 14:
//								excelContent.setStr_O(value);
//								break;
//							case 15:
//								excelContent.setStr_P(value);
//								break;
//							case 16:
//								excelContent.setStr_Q(value);
//								break;
//							case 17:
//								excelContent.setStr_R(value);
//								break;
//							case 18:
//								excelContent.setStr_S(value);
//								break;
//							case 19:
//								excelContent.setStr_T(value);
//								break;
//							case 20:
//								excelContent.setStr_U(value);
//								break;
//							case 21:
//								excelContent.setStr_V(value);
//								break;
//							case 22:
//								excelContent.setStr_W(value);
//								break;
//							case 23:
//								excelContent.setStr_X(value);
//								break;
//							case 24:
//								excelContent.setStr_Y(value);
//								break;
//							case 25:
//								excelContent.setStr_Z(value);
//								break;
//							case 26:
//								excelContent.setStr_AA(value);
//								break;
//							case 27:
//								excelContent.setStr_BB(value);
//								break;
//							case 28:
//								excelContent.setStr_CC(value);
//								break;
//							case 29:
//								excelContent.setStr_DD(value);
//								break;
//							case 30:
//								excelContent.setStr_EE(value);
//								break;
//							case 31:
//								excelContent.setStr_FF(value);
//								break;
//							case 32:
//								excelContent.setStr_GG(value);
//								break;
//							case 33:
//								excelContent.setStr_HH(value);
//								break;
//							case 34:
//								excelContent.setStr_II(value);
//								break;
//							case 35:
//								excelContent.setStr_JJ(value);
//								break;
//							case 36:
//								excelContent.setStr_KK(value);
//								break;
//							case 37:
//								excelContent.setStr_LL(value);
//								break;
//							case 38:
//								excelContent.setStr_MM(value);
//								break;
//							case 39:
//								excelContent.setStr_NN(value);
//								break;
//							case 40:
//								excelContent.setStr_OO(value);
//								break;
//							case 41:
//								excelContent.setStr_PP(value);
//								break;
//							case 42:
//								excelContent.setStr_QQ(value);
//								break;
//							case 43:
//								excelContent.setStr_RR(value);
//								break;
//							case 44:
//								excelContent.setStr_SS(value);
//								break;
//							case 45:
//								excelContent.setStr_TT(value);
//								break;
//							case 46:
//								excelContent.setStr_UU(value);
//								break;
//							case 47:
//								excelContent.setStr_VV(value);
//								break;
//							case 48:
//								excelContent.setStr_WW(value);
//								break;
//							case 49:
//								excelContent.setStr_XX(value);
//								break;
//							case 50:
//								excelContent.setStr_YY(value);
//								break;
//							case 51:
//								excelContent.setStr_ZZ(value);
//								break;	
//			        		}            	
//		            }
//		            excelContentList.add(excelContent);
//				}
//			 }
//			
//		} catch (Exception e) {
//			e.printStackTrace();
//			new File(pathName).delete();
//			throw new Exception(e.getMessage());
//		}
//		new File(pathName).delete();
//		return excelContentList;
//	}
//
//	public static String loadFile(File file,String fileFileName) throws Exception {
//		String root="";
//		if(null!=file)		
//		{
//			root = ApplicationResourcesUtil.getApplicationResourcesValue("excelUploadUrl");
//			File rootFile = new File(root);
//			if(!rootFile.exists()){
//				rootFile.mkdirs();
//			}
//			root+="/";
//				try 
//				{
//					InputStream is=new FileInputStream(file);
//					File destFile=new File(root,fileFileName);
//					if(destFile.exists())
//					{
//						//destFile.delete();
//						//throw new UniqueConstraintException(this.getFileFileName()+"已经存在,请重新命名后再上传！");
//					}
//					OutputStream os=new FileOutputStream(destFile);
//					byte[] buffer =new byte[4000];
//					int length=0;
//					while((length=is.read(buffer))>0){
//						os.write(buffer,0,length);
//					}
//					is.close();
//					os.close();
//				} catch (FileNotFoundException e) {
//					e.printStackTrace();
//					throw new FileNotFoundException("找不到文件！");
//				}catch (IOException e) {
//					e.printStackTrace();
//					throw new IOException("上传超时！");
//				}		
//		}else {
//			throw new Exception("文件为空！");
//		}
//		return root;
//	}
//
//	public static List<ExcelContent> analyseExcelFile(File file,String fileFileName) throws Exception {
//		try {
//			String filePath = loadFile(file,fileFileName);
//			return readExcelByPathname(filePath+fileFileName);
//		} catch (Exception e) {
//			throw new Exception(e.getMessage());
//		}
//	}
//	
//	
	
}

