

package com.ethan.service;

import java.util.Date;
import java.util.List;
import com.ethan.domain.Category;
import com.utils.listPage.AppConfig;
import com.utils.listPage.IPagination;
import com.utils.listPage.PaginationInfo;


public interface CategoryServices {

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
	 *            -分类对象
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
	 *            -分类父类ID
	 * @return IPagination
	 */
	public IPagination getCategorysByParentId(PaginationInfo pageInfo, Category category);

	/**
	 * 根据条件查询
	 * 
	 * @param category
	 * @return
	 */
	public List<Category> getCategorysByCon(Category category);

	/**
	 * 根据分类ID取分类信息
	 * 
	 * @param cid
	 *            -分类ID
	 * @return ContactInfoPo
	 */
	public Category getCategoryById(String cid);

	/**
	 * 取所有分类
	 * 
	 * @return List<Category>
	 */
	public List<Category> getAllCategory();

	/**
	 * 取机构所有分类
	 * 
	 * @return List<Category>
	 */
	public List<Category> getAllCategory(int orgId);

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
	 * 生成编号
	 * 
	 * @param cid
	 * @return
	 */
	public String createNumber(String cid);

	/**
	 * 移动分类
	 * 
	 * @param id
	 * @param pid
	 * @return
	 */
	public boolean moveCategory(String id, String pid, int userId);

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

	/**
	 * 
	 * @param appKey
	 * @param startDate
	 * @return
	 */
	public List<Category> getAllNodesByAppkey(String appKey, Date startDate);

	/**
	 * 
	 * @param appKey
	 * @param startDate
	 * @return
	 */
	public List<Category> getCategoryByAppkey(String appKey, Date startDate);

	/**
	 * 根据父ID取子分类
	 * 
	 * @param pid
	 * @return
	 */
	public List<Category> getCategoryByPID(String pid);

	/**
	 * 取所有子分类
	 * 
	 * @param id
	 * @return
	 */
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
	 * @return code
	 */
	public String getCategoryCode(String parentId, String emsCode, boolean allChildren);

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
