package com.ethan.service.imp;

import java.util.Calendar;
import java.util.Date;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.ethan.dao.CategoryDao;
import com.ethan.domain.Category;
import com.ethan.service.CategoryServices;
import com.utils.listPage.AppConfig;
import com.utils.listPage.IPagination;
import com.utils.listPage.PaginationInfo;


@Service("tCategoryServicesImp")
public class CategoryServicesImp implements CategoryServices {
	@Resource(name = "tCategoryDaoImp")
	private CategoryDao categoryDaoImp;
	
	
	@Override
	public boolean addCategory(Category category) {
		if(category.getId()==null || category.getId().equals(""))
		{
			category.setId(java.util.UUID.randomUUID().toString());
		}
		if(category.getParentId()!=null && !category.equals(""))
		{
			Category pCategory=categoryDaoImp.getCategoryById(category.getParentId());
			if(pCategory!=null)
			{
				if(pCategory.getAllParentId()!=null && !pCategory.getAllParentId().equals(""))
				{
					category.setAllParentId(pCategory.getAllParentId()+","+pCategory.getId());
				}
				else
				{
					category.setAllParentId(pCategory.getId());
				}
			}
			else
			{
				category.setAllParentId(null);
			}
			
		}
		
		return categoryDaoImp.addCategory(category);
	}

	@Override
	public boolean batchDelCategory(List<String> ids) {
		
		return categoryDaoImp.batchDelCategory(ids);
	}

	@Override
	public boolean delCategoryById(String id) {
		
		return categoryDaoImp.delCategoryById(id);
	}

	@Override
	public List<Category> getAllCategory() {
		
		return categoryDaoImp.getAllCategory();
	}
	
	@Override
	public List<Category> getAllCategory(int orgId) {
		
		return categoryDaoImp.getAllCategory(orgId);
	}

	@Override
	public Category getCategoryById(String cid) {
		
		return categoryDaoImp.getCategoryById(cid);
	}

	@Override
	public IPagination getCategorysByParentId(PaginationInfo pageInfo,
			Category category) {
		
//		List<Category> cs=categoryDaoImp.getAppCategoryList("1", "AO");
//		
//		if(cs!=null && cs.size()>0)
//		{
//			for(Category c:cs)
//			{
//				System.out.println("#######:"+c.getName());
//			}
//		}
		return categoryDaoImp.getCategorysByParentId(pageInfo, category);
	}

	@Override
	public boolean updCategory(Category category) {
		if(category.getParentId()!=null && !category.equals(""))
		{
			Category pCategory=categoryDaoImp.getCategoryById(category.getParentId());
			if(pCategory!=null)
			{
				if(pCategory.getAllParentId()!=null && !pCategory.getAllParentId().equals(""))
				{
					category.setAllParentId(pCategory.getAllParentId()+","+pCategory.getId());
				}
				else
				{
					category.setAllParentId(pCategory.getId());
				}
			}
			else
			{
				category.setAllParentId(null);
			}
			
			
		}
		
		return categoryDaoImp.updCategory(category);
	}

	@Override
	public List<Category> getAppCategory(String appKey,int orgId) {
		
		return categoryDaoImp.getAppCategory(appKey,orgId);
	}

	@Override
	public List<AppConfig> getAllAppConfig() {
		return categoryDaoImp.getAllAppConfig();
	}

	@Override
	public synchronized String createNumber(String cid) {
		
		String order = "";
		String monthStr = "";
		String dayStr = "";
		//获得当前日期
		Calendar cal = Calendar.getInstance();
		int year = cal.get(Calendar.YEAR);
		int month = cal.get(Calendar.MONTH) + 1;
		if(String.valueOf(month).length() == 1){
			monthStr = "0" + month;
		}else{
			monthStr = "" + month;
		}
		int day = cal.get(Calendar.DAY_OF_MONTH);
		if(String.valueOf(day).length() == 1){
			dayStr = "0" + day;
		}else{
			dayStr = "" + day;
		}
		String timeStr = "" + year + monthStr + dayStr;
		
		Category category=categoryDaoImp.getParentCategoryByID(cid);
		Category cat=categoryDaoImp.getCategoryById(cid);
		timeStr =category.getCode()+cat.getCode()+timeStr;
		if(category!=null && category.getAppKey()!=null)
		{
			String  number=categoryDaoImp.getMaxCode(category.getAppKey(), timeStr);
			if(number==null || number.equals(""))
			{
				return timeStr+"A";
			}
			else
			{
				char currentCode = number.charAt(number.length()-1);
				
				if(number.charAt(number.length()-2)=='Z')
				{
					
						order = (char)((int)currentCode + 1) + "";
						return timeStr+"Z"+order;
					
				}
				else
				{
					if(currentCode=='Z')
					{
						return category.getCode()+"Z"+"A";
					}
					else
					{
						order = (char)((int)currentCode + 1) + "";
						return timeStr+order;
					}
				}
				
				
				
			}
		}
		
		return null;
	}

	@Override
	public boolean moveCategory(String id, String pid,int useid) {
		Category category =	categoryDaoImp.getCategoryById(id);
		category.setParentId(pid);
		category.setUpdUser(useid);
		category.setUpdtime(new Date());
		if(category.getParentId()!=null && !category.equals(""))
		{
			Category pCategory=categoryDaoImp.getCategoryById(category.getParentId());
			if(pCategory!=null&&pCategory.getAllParentId()!=null && !pCategory.getAllParentId().equals(""))
			{
				category.setAllParentId(pCategory.getAllParentId()+","+pCategory.getId());
			}
			else{
				category.setAllParentId("BASE");
			}
			
		}
		
		categoryDaoImp.updCategory(category);
		return true;
	}

	@Override
	public boolean delCategoryByOrgId(int orgId) {
		return categoryDaoImp.delCategoryByOrgId(orgId);
	}

	@Override
	public List<Category> getAppCategory(String appKey) {
		
		return categoryDaoImp.getAppCategory(appKey);
	}

	@Override
	public List<Category> getAppCategoryList(String arentcode, String appkey) {
		return categoryDaoImp.getAppCategoryList(arentcode, appkey);
	}

	@Override
	public List<Category> getAllNodesByAppkey(String appKey) {
		return categoryDaoImp.getAllNodesByAppkey(appKey);
	}

	@Override
	public Category getCategoryByCode(String appKey, String code) {
		return categoryDaoImp.getCategoryByCode(appKey, code);
	}

	@Override
	public List<Category> getAllNodesByAppkey(String appKey, Date startDate) {
	
		return categoryDaoImp.getAllNodesByAppkey(appKey, startDate);
	}

	@Override
	public List<Category> getCategoryByAppkey(String appKey, Date startDate) {
		
		return categoryDaoImp.getCategoryByAppkey(appKey, startDate);
	}

	@Override
	public List<Category> getCategoryByPID(String pid) {
		
		return categoryDaoImp.getCategoryByPID(pid);
	}

	@Override
	public List<Category> getAllChildCategory(String id) {
		
		return categoryDaoImp.getAllChildCategory(id);
	}

	@Override
	public Category checkCategoryExitByName(String pid, String name) {
		return categoryDaoImp.checkCategoryExitByName(pid,name);
	}

	@Override
	public List<Category> getCategorysByCon(Category category) {
		return categoryDaoImp.getCategorysByCon(category);
	}

	@Override
	public String getCategoryCode(String parentId, String emsCode,boolean allChildren) {
		Category category= categoryDaoImp.getCategoryCode(parentId, emsCode,allChildren);
		if(category!=null)
		{
			return category.getCode();
		}
		return "";
	}

	@Override
	public String getEmsCode(String parentId, String code) {
		return categoryDaoImp.getEmsCode(parentId,code);
	}

	@Override
	public String getEmsCode(String parentId, String code, boolean allChildren) {
		return categoryDaoImp.getEmsCode(parentId, code, allChildren);
	}

	

}
