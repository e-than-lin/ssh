package com.utils;

import java.io.BufferedReader;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.InetAddress;
import java.net.UnknownHostException;
import java.util.Properties;

import org.apache.tools.ant.taskdefs.LoadProperties;


public class SystemUtil {
	 
	/**
     * 获取服务器机器的IP地址
     * @return
     */
    public static String getMachineIp() {
        try {
            InetAddress address = InetAddress.getLocalHost();
            // 返回机器IP地址
            return address.getHostAddress().toString();
        } catch (UnknownHostException e) {
            return "无效的IP地址";
        }
    }
    
    public static String getOsName() {
        String os = "";
        os = System.getProperty("os.name");
        return os;
    }

    public static  String getMACAddress() {
    String address = "";
    String os = getOsName();
    if (os.startsWith("Windows")) {
       try {
          String command = "cmd.exe /c ipconfig /all";
          Process p = Runtime.getRuntime().exec(command);
          BufferedReader br = new BufferedReader(new InputStreamReader(p.getInputStream()));
          String line;
          while ((line = br.readLine()) != null) {
              if (line.indexOf("Physical Address") > 0) {
                  int index = line.indexOf(":");
                  index += 2;
                  address = line.substring(index);
                  break;
              }
          }
          br.close();
          return address.trim();
      } catch (IOException e) {
      }
  } else if (os.startsWith("Linux")) {
      String command = "/bin/sh -c ifconfig -a";
      Process p;
      try {
          p = Runtime.getRuntime().exec(command);
          BufferedReader br = new BufferedReader(new InputStreamReader(p.getInputStream()));
          String line;
          while ((line = br.readLine()) != null) {
              if (line.indexOf("HWaddr") > 0) {
                  int index = line.indexOf("HWaddr") + "HWaddr".length();
                  address = line.substring(index);
                  break;
              }
          }
          br.close();
      } catch (IOException e) {
      }
  }
  address = address.trim();
  return address;
}
    
    
    public static void init(){
    	
    	 String mac=getMACAddress();
		 String url="ApplicationResources.properties";
		 Properties p=getProperties(url) ;
		 FileOutputStream out=null;
		 try {
		 if(p!=null)
		 {
			 String V9KUCIIMWE=p.getProperty("V9KUCIIMWE");
			 if(V9KUCIIMWE!=null && V9KUCIIMWE.equals("1"))
			 {
				 String V9KUCIIMWEDQRERTRWM4ZW=p.getProperty("V9KUCIIMWEDQRERTRWM4ZW");
				 if(V9KUCIIMWEDQRERTRWM4ZW!=null && !V9KUCIIMWEDQRERTRWM4ZW.equals(""))
				 {
					 if(!SecurityUtil.authenticate(mac,V9KUCIIMWEDQRERTRWM4ZW))
					  {
						 // System.out.println(StringUtil.getFromBASE64("0enWpMLrtO3O87vyyO28/srayKjS0bn9xtoh"));
						  System.exit(0);
					  }
				 }
				 else
				 {
					 out=new FileOutputStream(LoadProperties.class.getResource("/").getPath().replace("classes", "")+url);
					 p.setProperty("V9KUCIIMWEDQRERTRWM4ZW", SecurityUtil.encryptCode(V9KUCIIMWEDQRERTRWM4ZW));
					 p.save(out, "");
				 }
			 }
				 
		 }
		 } catch (Exception e) {
				e.printStackTrace();
			}finally
			{
				if(out!=null){
					try {
						out.close();
						out=null;
					} catch (IOException e) {
						e.printStackTrace();
					}
				}
			}
		 
    }
    
    
    public static Properties getProperties(String fileUrl) {
	     Properties p=null;
		InputStream in = null;
		try{
		
			
			String file=fileUrl;//"/properties/email.properties";
			in = Thread.currentThread().getContextClassLoader().getResourceAsStream(file);
			p = new Properties();
			p.load(in);
		}catch (Exception e) {
			e.printStackTrace();
		}finally{
			if(in!=null )
			{
				try {
					in.close();
					in=null;
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
		}
	
	return p;
}
    
}