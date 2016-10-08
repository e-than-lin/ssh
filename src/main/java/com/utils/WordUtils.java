package com.utils;

import java.io.BufferedReader;
import java.io.ByteArrayInputStream;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;

//import org.apache.poi.poifs.filesystem.DirectoryEntry;
//import org.apache.poi.poifs.filesystem.DocumentEntry;
//import org.apache.poi.poifs.filesystem.POIFSFileSystem;

public class WordUtils {
	
//	public static void createDoc(String fileName,String content){
//		try {
//			
//		
//         InputStream cssIs = Thread.currentThread().getContextClassLoader().getResourceAsStream("properties/doc.css");
//        // InputStream cssIs = new FileInputStream("f:\\1.css");
//         String css = getContent(cssIs);
//         content = "<html><meta http-equiv=\"Content-Type\" content=\"text/html; charset=UTF-8\"><head><style>" + css + "</style></head><body>" + content + "</body></html>";
//         
//         byte b[] = content.getBytes("UTF-8");  
//         ByteArrayInputStream bais = new ByteArrayInputStream(b); 
//         POIFSFileSystem poifs = new POIFSFileSystem();  
//         DirectoryEntry directory = poifs.getRoot();  
//         DocumentEntry documentEntry = directory.createDocument("WordDocument", bais);  
//         FileOutputStream ostream = new FileOutputStream(fileName);  
//         poifs.writeFilesystem(ostream);  
//         bais.close();  
//         ostream.close(); 
//         cssIs.close();  
//		 } catch (IOException e) {  
//	            e.printStackTrace();  
//	      }  
//	}
//	
//	
//	/**
//     * 把输入流里面的内容以UTF-8编码当文本取出。
//     * 不考虑异常，直接抛出
//     * @param ises
//     * @return
//     * @throws IOException
//     */
//    private static String getContent(InputStream... ises) throws IOException {
//       if (ises != null) {
//          StringBuilder result = new StringBuilder();
//          BufferedReader br;
//          String line;
//          for (InputStream is : ises) {
//             br = new BufferedReader(new InputStreamReader(is, "UTF-8"));
//             while ((line=br.readLine()) != null) {
//                 result.append(line);
//             }
//          }
//          return result.toString();
//       }
//       return null;
//    }
//	

}
