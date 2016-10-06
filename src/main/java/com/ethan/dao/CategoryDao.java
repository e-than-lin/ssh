package com.ethan.dao;

import java.util.Date;
import java.util.List;

import com.ethan.domain.Category;
import com.utils.listPage.AppConfig;
import com.utils.listPage.IPagination;
import com.utils.listPage.PaginationInfo;


public interface CategoryDao {

	/**
	 * 新增分类
	 * 
	 * @param category
	 *            -分类对象
	 * @return boolean
	 */
	public boolean addCategory(Category category);

	/**
	 * 更新分类
	 * 
	 * @param category
	 *            - 分类对象
	 * @return boolean

	 */
	public boolean updCategory(Category category);

	/**
	 * 根据id删除分类
	 * 
	 * @param id
	 *            -分类ID
	 * @return boolean

	 */
	public boolean delCategoryById(String id);

	/**
	 * 取机构所有分类
	 * 
	 * @return List<Category>

	 */
	public List<Category> getAllCategory(int orgId);

	/**
	 * 根据条件查询
	 * 
	 * @param category
	 * @return
	 */
	public List<Category> getCategorysByCon(Category category);

	/**
	 * 批量删除分类
	 * 
	 * @param ids
	 *            -分类ID列表
	 * @return boolean

	 */
	public boolean batchDelCategory(List<String> ids);

	/**
	 * 根据父类ID获取分类
	 * 
	 * @param pageInfo
	 * @param parentId
	 *            父类ID
	 * @return IPagination

	 */
	public IPagination getCategorysByParentId(PaginationInfo pageInfo, Category category);

	/**
	 * 根据分类ID取分类信息
	 * 
	 * @param cId
	 *            分类ID
	 * @return com.twi.common.domain.Category

	 */
	public Category getCategoryById(String cId);

	/**
	 * 取所有分类
	 * 
	 * @return List<Category>

	 */
	public List<Category> getAllCategory();

	/**
	 * 根据父ID删除分类
	 * 
	 * @param pids
	 *            -分类父ID列表
	 * @return booleam

	 */
	public boolean delCategoryByPId(List<String> pids);

	/**
	 * 根据应用KEY取应用类型
	 * 
	 * @param appKey
	 * @return List<Category>
	 */
	public List<Category> getAppCategory(String appKey, int orgId);

	/**
	 * 获取所有应用分类
	 * 
	 * @return
	 */
	public List<AppConfig> getAllAppConfig();

	/**
	 * 根据ID取父分类
	 * 
	 * @param id
	 * @return
	 */
	public Category getParentCategoryByID(String id);

	public String getMaxCode(String appType, String str);

	/**
	 * 根据机构id删除分类信息
	 * 
	 * @param orgId
	 *            机构id
	 * @return
	 */
	public boolean delCategoryByOrgId(int orgId);

	/**
	 * 根据父编码和应用KEY取分类
	 * 
	 * @param appKey
	 * @return List<Category>
	 */
	public List<Category> getAppCategoryList(String arentcode, String appkey);

	/**
	 * 根据应用KEY取应用类型
	 * 
	 * @param appKey
	 * @return List<Category>
	 */
	public List<Category> getAppCategory(String appKey);

	/**
	 * 根据appkey 获取所有节点
	 * 
	 * @author weiXH
	 * @param appKey
	 * @return
	 */
	public List<Category> getAllNodesByAppkey(String appKey);

	/**
	 * 根据code和appKey获取应用类型
	 * 
	 * @author sunjb
	 * @param appKey
	 * @param code
	 * @return
	 */
	public Category getCategoryByCode(String appKey, String code);

	public List<Category> getCategoryByAppkey(String appKey, Date startDate);

	public List<Category> getAllNodesByAppkey(String appKey, Date startDate);

	public List<Category> getCategoryByPID(String pid);

	public List<Category> getAllChildCategory(String id);

	/**
	 * 根据pid 和名称检查Category是否存在
	 * 
	 * @param pid
	 * @param name
	 * @return
	 */
	public Category checkCategoryExitByName(String pid, String name);

	/**
	 * 根据父类id和工程编码获取应用类型
	 * 
	 * @param parentId
	 *            根据父类id
	 * @param emsCode
	 *            工程编码
	 * @param allChildren
	 *            是否在所有子类里查
	 * @return Category
	 */
	public Category getCategoryCode(String parentId, String emsCode, boolean allChildren);

	/**
	 * 根据父id和编码获取分类的工程编码
	 * 
	 * @param parentId
	 *            父id
	 * @param code
	 *            编码
	 * @return
	 */
	public String getEmsCode(String parentId, String code);

	/**
	 * 根据父id和编码获取工程编码
	 * 
	 * @param parentId
	 *            父id
	 * @param code
	 *            编码
	 * @param allChildren
	 *            是否在所有子类中查
	 * @return
	 */
	public String getEmsCode(String parentId, String code, boolean allChildren);

}
