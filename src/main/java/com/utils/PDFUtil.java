package com.utils;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.util.Properties;
//
//import org.xhtmlrenderer.pdf.ITextFontResolver;
//import org.xhtmlrenderer.pdf.ITextRenderer;
//
//import com.lowagie.text.DocumentException;
//import com.lowagie.text.pdf.BaseFont;

public class PDFUtil {
	

//	
//	public static String createPDF(String fileName, String filePathKey,
//			String context) {
//		String filePath=ApplicationResourcesUtil.getApplicationResourcesValue(filePathKey);
//		filePath.replaceAll("\\\\", "/");
//		File myFilePath = new File(filePath);
//		if (!myFilePath.exists()) {
//			myFilePath.mkdirs();
//		}
//		String outputFile =filePath+"/"+fileName+".pdf";
//		try {
//			
//			OutputStream os = new FileOutputStream(outputFile);
//			
//			ITextRenderer renderer = new ITextRenderer();
//			// renderer.setDocument(url);
//			
//			renderer.setDocumentFromString(context);
//			// 解决中文支持问题
//			ITextFontResolver fontResolver = renderer.getFontResolver();
//
//			String systemType=ApplicationResourcesUtil.getApplicationResourcesValue("SYSTEMTYPE");
//		
//			 if (systemType!=null && systemType.equals("win"))
//			 {
//			       fontResolver.addFont("C:/Windows/Fonts/SIMSUN.TTC",
//				   BaseFont.IDENTITY_H, BaseFont.NOT_EMBEDDED);
//
//			 }
//			 else if (systemType!=null && systemType.equals("liunx"))
//			 {
//			     fontResolver.addFont("/usr/share/fonts/TTF/ARIALUNI.TTF",
//			     BaseFont.IDENTITY_H, BaseFont.NOT_EMBEDDED);
//			 }
//			// 解决图片的相对路径问题
//			// renderer.getSharedContext().setBaseURL("file:/D:/Work/Demo2do/Yoda/branch/Yoda%20-%20All/conf/template/");
//
//			 
//			renderer.layout();
//		
//			renderer.createPDF(os);
//			os.close();
//		} catch (DocumentException e) {
//			
//			e.printStackTrace();
//		} catch (IOException e) {
//			
//			e.printStackTrace();
//		}
//		return outputFile;
//	}
//
//	/**
//	 * 取PDF模板HTML
//	 * @param filePath
//	 * @return
//	 */
//	public static String getHtml(String filePath)
//	{
//		String html="";
//		
//			InputStream in = null;
//			try{
//				int byteCount = 0;
//				html="";
//				String file=filePath;//"properties/email.properties";
//				in = Thread.currentThread().getContextClassLoader().getResourceAsStream(file);
//				BufferedReader reader = new BufferedReader(new InputStreamReader(in, "utf-8"));  
//				 while(reader.ready()){
//
//					 html += reader.readLine();
//				    	}
//				 reader.close();
//				
//
//			}catch (Exception e) {
//				e.printStackTrace();
//			}finally{
//				if(in!=null )
//				{
//					try {
//						in.close();
//						in=null;
//					} catch (IOException e) {
//						e.printStackTrace();
//					}
//				}
//			}
//
//		return html;
//	}
//	
//	/**
//	 * 取PDF图片路径
//	 * @return
//	 */
//	public static String getImgPath()
//	{
//		String imgPath="";
//		
//			String u=Thread.currentThread().getContextClassLoader().getResource("/").getPath();
//			 int num = u.indexOf("/WEB-INF");  
//			 imgPath=u.substring(0, num); 
//			 imgPath+="/theme/default/img/pdf";
//
//		return imgPath;
//		
//	}
//	
//	
//	/**
//	 * 换行
//	 * @param str
//	 * @param wrapNumber
//	 * @return
//	 */
//	public static  String strToWrap(String str,int wrapNumber)
//	{
//		String br="<br></br>";
//		 if(str!=null && str.length()>wrapNumber)
//		 {
//			int ll= str.length()/wrapNumber;
//			int kk=0;
//			StringBuffer a = new StringBuffer(str);
//			for(int i=1;i<ll+1;i++)
//			{
//				int hh=i*wrapNumber+kk;
//				a.insert(hh, br);
//				kk+=br.length();
//			}
//			return a.toString();
//		 }
//		 else if(str!=null && str.length()<wrapNumber)
//		 {
//			 return str;
//		 }
//			 
//		return "";
//	}
//	
//	
//	/**
//	 * 换行
//	 * @param str
//	 * @param wrapNumber
//	 * @return
//	 */
//	public static  String getPDFHTMLHead()
//	{
//		StringBuffer htmlStr = new StringBuffer();
//		htmlStr.append("<!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.0 Transitional//EN\" \"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd\">");  
//		htmlStr.append("<html xmlns=\"http://www.w3.org/1999/xhtml\">")  
//	        .append("<head>")  
//	        .append("<meta http-equiv=\"Content-Type\" content=\"text/html; charset=UTF-8\" />")  
//	        .append("<style type='text/css'>BODY {FONT-SIZE: 6pt;background-color: #FFFFFF;MARGIN: 0px 0px 0px 0px;} table{TABLE-LAYOUT: fixed;} td{word-WRAP: break-word;}</style>")  
//	        .append("</head>"); 
//			 
//		return htmlStr.toString();
//	}

}
