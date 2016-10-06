package com.ethan.action;


import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONArray;

import org.apache.commons.lang.StringUtils;
import org.apache.struts2.convention.annotation.Namespace;
import org.apache.struts2.convention.annotation.ParentPackage;
import org.apache.struts2.interceptor.ServletRequestAware;
import org.apache.struts2.interceptor.ServletResponseAware;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import com.ethan.domain.Category;
import com.ethan.service.CategoryServices;
import com.opensymphony.xwork2.ActionSupport;
import com.utils.listPage.AppConfig;
import com.utils.listPage.IPagination;
import com.utils.listPage.PaginationInfo;

@ParentPackage("basePackage")
@Namespace("/")
@Component("tCategoryAction")
@Scope("prototype")
public class CategoryAction extends BaseAction{
	protected IPagination listPage;// 分页列表
	protected PaginationInfo pageInfo = new PaginationInfo();// 分页对象
	private Category category;// 分类对象
	protected String msg;// 返回信息
	private List<Category> categoryList = new ArrayList<Category>();// 分类列表
	private List<AppConfig> appKeylist = new ArrayList<AppConfig>();// 所属应用列表
	private String pType;//
	private int moveType;
	private int re;
	//编号
	private String object;
	@Resource(name = "tCategoryServicesImp")
	private CategoryServices categoryServicesImp;
	
	private boolean orgAdmin;
     private String cid;
     private List<String> ids;
     private String parentId;
     private String selectId;
     private int isDefaultOrgId;//1:是默认的机构ID
     private int isCloudAdmin;//1:是云机构管理员
     
     private String oldID;
     
     /**
      * picker 使用
      */
     private String p_dialog;
     private String p_type;
     
     /**
      * 获取下拉列表分类信息
      */
     private List<Category> selectList;//下拉列表信息
     private String appkey;//appkey
     
	/**
	 * @roseuid 4E1BD27900DA
	 */
	public CategoryAction() {
          
	}
	
	

	/**
	 * 新增按钮跳转页面
	 * 
	 * @return
	 */
	public String pageAdd() {
		parentId = category.getParentId();
		// 获取所属应用的数据
		appKeylist = categoryServicesImp.getAllAppConfig();
		return "pageAdd";
	}

	

	
	/**
	 * 生成编号
	 * @return
	 */
	public String createNumber(){
		try {
			object =categoryServicesImp.createNumber(cid);
			object = "{'object':'" + object + "'}";
		} catch (Exception e) {
			e.printStackTrace();
		}
		return "aj";
	}
	
	/**
	 * 新增分类
	 * 
	 * @return String
	 */
	public String addCategory() {
		if(category==null){
			category = new Category();
		}
		appKeylist = categoryServicesImp.getAllAppConfig();
		if(isDefaultOrgId==1)
		{
			category.setOrgId(0);//分类模板
		}
		else
		{
		 category.setOrgId(this.getOAUser());
		}
		category.setCreator(this.getOAUser());
		Date date=new Date();
		category.setCreateTime(date);
		category.setUpdtime(date);
		category.setUpdUser(this.getOAUser());
		boolean flag = categoryServicesImp.addCategory(category);
		if (flag) {
			msg = "保存成功！";
		} else {
			msg = "保存失败！";
		}
		category = new Category();
		category.setParentId(parentId);
		if(isDefaultOrgId==1)
		{
			return searchTemplateByParentId();
		}
		else
		{
			return searchCategorysByParentId();
		}
		
	}

	/**
	 * 编辑分类
	 * 
	 * @return String
	 */
	public String updCategory() {
		// 获取所属应用的数据
		if(category==null){
			category = new Category();
		}
		appKeylist = categoryServicesImp.getAllAppConfig();
		if(isDefaultOrgId==1)
		{
			category.setOrgId(0);//分类模板
		}
		else
		{
		 category.setOrgId(this.getOAUser());
		}
		
		category.setUpdUser(this.getOAUser());
		category.setUpdtime(new Date());
		boolean flag =false;
		
			 flag = categoryServicesImp.updCategory(category);
	
		
		if (flag) {
			msg = "保存成功！";
		} else {
			msg = "保存失败！";
		}
		category = new Category();
		category.setParentId(parentId);
		if(isDefaultOrgId==1)
		{
			return searchTemplateByParentId();
		}
		else
		{
			return searchCategorysByParentId();
		}
	}

	/**
	 * 根据id删除分类
	 * 
	 * @return String
	 */
	public String delCategoryById() {
		return null;
	}

	/**
	 * 批量删除分类
	 * 
	 * @return String
	 */
	public String batchDelCategory() {
		try{
		categoryServicesImp.batchDelCategory(ids);
		msg = "删除成功！";
		}catch (Exception e) {
			msg = "删除失败！";
		}
		if(isDefaultOrgId==1)
		{
			return searchTemplateByParentId();
		}
		else
		{
			return searchCategorysByParentId();
		}
		
	}

	/**
	 * 根据父类id查询子分类
	 * 
	 * @return String
	 */
	public String searchCategorysByParentId() {
		parentId = null;
		if(category==null)
		{
			category=new Category();
		}
		if(category!=null){			
			parentId = category.getParentId();
			
		}
		category.setOrgId(this.getOAUser());
		listPage = categoryServicesImp.getCategorysByParentId(pageInfo,
				category);
		category.setParentId(parentId);
		
		this.orgAdmin=this.getOAUser()==10000038;
		
		return "categoryList";
	}
	
	
	/**
	 * 根据父类父id查询子分类
	 * 
	 * @return String
	 */
	public void getCategorysByParentId() {
		String resultStr = null;
		
		if(parentId!=null && parentId.equals("-1"))
		{
			 resultStr = "";
			  resultStr += "[";
			  resultStr += "{";
				 resultStr += "\"id\": \"0\", \"text\": \"系统配置\", \"state\": \"closed\"";
				 resultStr += "},";
				 resultStr = resultStr.substring(0, resultStr.length()- 1);                   
					resultStr += "]";
		}
		else
		{
			List<Category> list=categoryServicesImp.getCategoryByPID(parentId);
			
			if(list!=null)
			{
				 resultStr = "";
				  resultStr += "[";
				for(Category c:list)
				{
					String closed="opened";
				//	String iconCls="tree-folder1";
					if(c.getHasChildren()>0)
					{
						closed="closed";
						///iconCls="tree-folder2";
					}
					 resultStr += "{";
					 resultStr += "\"id\": \""+c.getId()+"\", \"text\": \""+c.getName()+"\", \"state\": \""+closed+"\"";//,\"iconCls\":\""+iconCls+"\"";
					 resultStr += "},";
				}
				 resultStr = resultStr.substring(0, resultStr.length()- 1);                   
				resultStr += "]";
			}
		}
		
		this.printOut(response, resultStr);
	}
	
	
	public String toCategoryTree()
	{
		return "cTree";
	}
	
	

	  public void isUseCategoryId()
	   {
		   int faly=0;
		   category = categoryServicesImp.getCategoryById(category.getId());
		   if(category!=null)
		   {
			   faly=1;
		   }
		   
		   this.printOut(response, "{\"result\":"+faly+"}");
	   }
	   
	public void getJsonCategoryByCode() {
		Category c = categoryServicesImp.getCategoryByCode(null,category.getCode());
		if(c!=null){
			
			this.printOut(response, "{\"id\": \""+c.getId()+"\",\"code\": \""+c.getCode()+" \",\"text\": \""+c.getName()+"\", \"ex1\": \""+c.getEx1()+"\", \"ex2\": \""+c.getEx2()+"\", \"ex3\": \""+c.getEx3()+"\"}");
		}else{
	
			this.printOut(response, "-----------------查无信息---------------------");
		}
	}
	
	/**
	 * 根据id获取分类
	 * 
	 * @return String
	 */
	public String getCategoryById() {
		parentId = category.getParentId();
		// 获取所属应用的数据
		appKeylist = categoryServicesImp.getAllAppConfig();
		category = categoryServicesImp.getCategoryById(category.getId());
		this.oldID=category.getId();
		
		return "getCategoryById";
	}
	
	
	
	
	
   public String moveCategorys(){
	   return "moveCategorys";
   }
   
	public String moveCategory()
	{
		if(ids!=null &&! ids.equals(""))
		{
			for(String fid:ids)
			{
				categoryServicesImp.moveCategory(fid, category.getId(),this.getOAUser());
			}
		}
		re=1;
		msg="移动成功!";
		
		if(isDefaultOrgId==1)
		{
			return searchTemplateByParentId();
		}
		else
		{
			return searchCategorysByParentId();
		}
	}
	
	/**
	 * 获取所有分类
	 * 
	 * @return
	 */
	public String getCategorys() {
		
		categoryList = categoryServicesImp.getAllCategory(this.getOAUser());
		if(moveType==2){
			return "moreTree";
		}
		return "categoryTree";
	}
	
	
	
	
	
	
	
	/**
	 * 跳转到Manage页面
	 * @return
	 */
	public String pageManage()
	{
		isDefaultOrgId=1;
		if(true)
		{		  
		  isCloudAdmin =1;
		}
		return "manage";
	}
	
	/**
	 * 获取ORGID为0分类
	 * 
	 * @return
	 */
	public String getCategorysTemplate() {
		isDefaultOrgId=1;
		if(true)
		{		  
		  isCloudAdmin =1;
		  categoryList = categoryServicesImp.getAllCategory(0);
		}
		
		
		if(moveType==2){

			return "moreTree";
		}
		return "categoryTree";
	}
	
	/**
	 * 根据父类id查询子分类(ORGID为0)
	 * 
	 * @return String
	 */
	public String searchTemplateByParentId() {
		isDefaultOrgId=1;
		
		String parentId = null;
		if(category==null)
		{
			category=new Category();
		}
		if(category!=null){			
			parentId = category.getParentId();			
		}
		category.setOrgId(0);
		if(true)
		{		  
		  isCloudAdmin =1;
		  listPage = categoryServicesImp.getCategorysByParentId(pageInfo,
					category);
		}
		
		category.setParentId(parentId);
		
		this.orgAdmin=true;

		return "categoryList";
	}
	
	/**
	 * 获取所有子节点 的 picker
	 * 
	 * @param appkey
	 * @return
	 */
 	public String getAllNodesByAppkey() {
 		if (StringUtils.isNotBlank(category.getAppKey())) {
 			categoryList = categoryServicesImp.getAllNodesByAppkey(category.getAppKey());
		}
		return "picker";
	} 

 	/**
 	 * 获取父ID所属分类信息
 	 * @param appkey
 	 * @return
 	 */
 	public String getCategorySelectList(){
 		if (selectList!=null) {
			selectList.clear();
		}else {
			selectList = new ArrayList<Category>();
		}
		selectList = categoryServicesImp.getCategoryByPID(parentId);
		if(selectList==null)
		{
			selectList=new ArrayList<Category>();
		}
		return "categorySelect";
		
 	}
 	/**
 	 * @return
 	 */
 	public void ajaxGetCategorys(){
 		if (selectList!=null) {
			selectList.clear();
		}else {
			selectList = new ArrayList<Category>();
		}
		selectList = categoryServicesImp.getCategoryByPID(parentId);
		String str="";
		for (Category temp:selectList) {
			if (StringUtils.isBlank(str)) {
				str+="{\"name\":\""+temp.getName()+"\",\"val\":\""+temp.getCode()+"\"}";
			} else {
				str+=",{\"name\":\""+temp.getName()+"\",\"val\":\""+temp.getCode()+"\"}";
			}
		}
		str = "["+str+"]";
		this.printOut(response, str);
 	}	
 	
 	public void getCategorySelectListOption(){
 		String optionStr="";
 		try {
	 		if (selectList!=null) {
				selectList.clear();
			}else {
				selectList = new ArrayList<Category>();
			}
			selectList = categoryServicesImp.getCategoryByPID(parentId);
			for (Category temp:selectList) {
				if(StringUtils.isNotBlank(selectId)&&selectId.equals(temp.getCode())){
					optionStr +="<option value=\""+temp.getCode()+"\" selected=\"selected\" >"+temp.getName()+"</option>";
				}else{
					optionStr +="<option value=\""+temp.getCode()+"\">"+temp.getName()+"</option>";
				}
			}
			
 		} catch (Exception e) {
 			e.printStackTrace();
		}
		this.printOut(response, optionStr);
 	}
 	
 	/**
 	 * 根据父ID取子分类
 	 */
 	public void getCategoryByPID()
 	{
 		String categoryStr=null;
 		
 		selectList = categoryServicesImp.getCategoryByPID(parentId);
 		
 		if(selectList!=null && selectList.size()>0)
 		{
 			JSONArray jArray=JSONArray.fromObject(selectList);
 	 		categoryStr=jArray.toString();
 		}
 		
 		categoryStr = "{\"categoryStr\":"+categoryStr+"}";
 		
 		  this.printOut(response, categoryStr);
 	}
 	
 	
	public String getP_dialog() {
		return p_dialog;
	}
	
	public void setP_dialog(String p_dialog) {
		this.p_dialog = p_dialog;
	}

	public String getP_type() {
		return p_type;
	}

	public void setP_type(String p_type) {
		this.p_type = p_type;
	}

	public IPagination getListPage() {
		return listPage;
	}

	public void setListPage(IPagination listPage) {
		this.listPage = listPage;
	}

	public PaginationInfo getPageInfo() {
		return pageInfo;
	}

	public void setPageInfo(PaginationInfo pageInfo) {
		this.pageInfo = pageInfo;
	}

	public Category getCategory() {
		return category;
	}

	public void setCategory(Category category) {
		this.category = category;
	}

	public String getMsg() {
		return msg;
	}

	public void setMsg(String msg) {
		this.msg = msg;
	}

	public List<Category> getCategoryList() {
		return categoryList;
	}

	public void setCategoryList(List<Category> categoryList) {
		this.categoryList = categoryList;
	}

	public List<AppConfig> getAppKeylist() {
		return appKeylist;
	}

	public void setAppKeylist(List<AppConfig> appKeylist) {
		this.appKeylist = appKeylist;
	}

	public String getpType() {
		return pType;
	}

	public void setpType(String pType) {
		this.pType = pType;
	}

	

	public String getObject() {
		return object;
	}

	public void setObject(String object) {
		this.object = object;
	}

	public String getCid() {
		return cid;
	}

	public void setCid(String cid) {
		this.cid = cid;
	}

	public List<String> getIds() {
		return ids;
	}

	public void setIds(List<String> ids) {
		this.ids = ids;
	}

	public int getMoveType() {
		return moveType;
	}

	public void setMoveType(int moveType) {
		this.moveType = moveType;
	}

	public int getRe() {
		return re;
	}

	public void setRe(int re) {
		this.re = re;
	}

	public String getParentId() {
		return parentId;
	}

	public void setParentId(String parentId) {
		this.parentId = parentId;
	}



	public boolean getOrgAdmin() {
		return orgAdmin;
	}



	public void setOrgAdmin(boolean orgAdmin) {
		this.orgAdmin = orgAdmin;
	}



	public int getIsDefaultOrgId() {
		return isDefaultOrgId;
	}



	public void setIsDefaultOrgId(int isDefaultOrgId) {
		this.isDefaultOrgId = isDefaultOrgId;
	}



	public int getIsCloudAdmin() {
		return isCloudAdmin;
	}



	public void setIsCloudAdmin(int isCloudAdmin) {
		this.isCloudAdmin = isCloudAdmin;
	}



	public List<Category> getSelectList() {
		return selectList;
	}



	public void setSelectList(List<Category> selectList) {
		this.selectList = selectList;
	}



	public String getAppkey() {
		return appkey;
	}



	public void setAppkey(String appkey) {
		this.appkey = appkey;
	}



	public String getOldID() {
		return oldID;
	}



	public void setOldID(String oldID) {
		this.oldID = oldID;
	}

	public String getSelectId() {
		return selectId;
	}

	public void setSelectId(String selectId) {
		this.selectId = selectId;
	}


}
