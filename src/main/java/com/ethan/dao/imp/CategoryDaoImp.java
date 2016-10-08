package com.ethan.dao.imp;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.apache.commons.lang.StringUtils;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.orm.hibernate4.HibernateCallback;
import org.springframework.orm.hibernate4.HibernateTemplate;
import org.springframework.orm.hibernate4.support.HibernateDaoSupport;
import org.springframework.stereotype.Service;

import com.ethan.dao.CategoryDao;
import com.ethan.domain.Category;
import com.utils.listPage.AppConfig;
import com.utils.listPage.IPagination;
import com.utils.listPage.ListPageFactory;
import com.utils.listPage.ListPageHibernateFactory;
import com.utils.listPage.PaginationInfo;

@Service("tCategoryDaoImp")
public class CategoryDaoImp extends HibernateDaoSupport implements CategoryDao {

	public CategoryDaoImp(SessionFactory sessionfactory){
	    setSessionFactory(sessionfactory);
	}
	public boolean addCategory(Category category) {
		try {
			this.getHibernateTemplate().save(category);
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}

	
	@Override
	public boolean batchDelCategory(final List<String> ids) {
		try {
			getHibernateTemplate().execute(new HibernateCallback() {
				public Object doInHibernate(Session session) {
					//session.beginTransaction();
					Query query = session
							.createQuery("from Category c where c.id in (:id) ");

					query.setParameterList("id", ids.toArray());
					List<Category> list = query.list();

					for (Category category : list) {
						session.delete(category);
					}
					//session.getTransaction().commit();

					return true;

				}
			});

		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}

		return true;
	}

	@Override
	public boolean delCategoryById(String id) {

		try {
			Category category = (Category) this.getHibernateTemplate().get(
					Category.class, id);
			this.getHibernateTemplate().delete(category);
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}

		return true;
	}

	@Override
	public boolean delCategoryByPId(final List<String> pids) {

		try {
			getHibernateTemplate().execute(new HibernateCallback() {
				public Object doInHibernate(Session session) {
					//session.beginTransaction();
					Query query = session
							.createQuery("from Category c where c.parentId in (:id) ");

					query.setParameterList("id", pids.toArray());
					List<Category> list = query.list();

					for (Category category : list) {
						session.delete(category);
					}
					//session.getTransaction().commit();

					return true;

				}
			});

		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}

		return true;
	}

	@Override
	public List<Category> getAllCategory() {
		StringBuffer hql = new StringBuffer();
		hql.append("from Category c order by c.sort asc ");
		try {
			List<Category> categoryList = (List<Category>) this.getHibernateTemplate().find(
					hql.toString());
			return categoryList;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	@Override
	public Category getCategoryById(String cId) {

		try {
			Category category = (Category) this.getHibernateTemplate().get(
					Category.class, cId);
			return category;
		} catch (Exception e) {
			e.printStackTrace();

		}

		return null;
	}

	@Override
	public IPagination getCategorysByParentId(PaginationInfo pageInfo,
			Category category) {
		List<Object> list = new ArrayList<Object>();
		StringBuilder hql = new StringBuilder();
		StringBuilder hql2 = new StringBuilder();
		hql.append("select new Category(c,(select ca.name from Category ca where ca.id = c.parentId), ");
			hql.append("(select a.name from AppConfig a where a.key = c.appKey ))");
			//hql.append("(select a.name from AppConfig a where a.key = null ))");
			hql2.append(" from Category c where 1=1 ");
		if(category!=null)
		{  
			if(category.getParentId()!=null&&!"".equals(category.getParentId()))
			{
				
				hql2.append(" and c.parentId=? ");
				list.add(category.getParentId());
			}
			if(category.getName()!=null&&!"".equals(category.getName()))
			{
				hql2.append(" and c.name like ? ");
				list.add("%"+category.getName()+"%");
			}
			if(category.getCode()!=null&&!"".equals(category.getCode())){
				hql2.append(" and c.code like ? ");
				list.add("%"+category.getCode()+"%");
			}
			if(category.getEx2()!=null&&!"".equals(category.getEx2())){
				hql2.append(" and c.ex2 like ? ");
				list.add("%"+category.getEx2()+"%");
			}
			
			
			
			
		}
		
		
		
		hql2.append(" order by c.sort asc ");
		Object[] obj = new Object[list.size()];
		for (int i = 0; i < list.size(); i++) {
			obj[i]=list.get(i);
		}
		try {
			HibernateTemplate ht=this.getHibernateTemplate();
			ListPageFactory<Category> listPageFactory =new ListPageHibernateFactory<Category>(ht, hql.toString()+hql2.toString(),hql2.toString(),obj);//
			IPagination<Category> lists = (IPagination<Category>) listPageFactory.getPaginationInstance(pageInfo.getPageNo(), pageInfo.getPageSize());
			return lists;
		} catch (Exception e) {
			e.printStackTrace();

		}

		return null;

	}

	@Override
	public boolean updCategory(Category category) {

		try {
			this.getHibernateTemplate().update(category);
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}

	@Override
	public List<Category> getAppCategory(String appKey,int orgId) {
		
		StringBuilder hql = new StringBuilder();
		//SELECT  cg.ID_ FROM tpm_category cg WHERE cg.appKey=(SELECT id_  FROM tpm_appconfig WHERE key_='2')
		
		hql.append(" from Category c where c.orgId=? and c.parentId in " );
		hql.append("(select cg.id from Category cg where cg.appKey=");
				hql.append("(select a.id  from AppConfig a where a.key=?)) order by sort ");
		
		
		
		try {
			List<Category> list=(List<Category>) this.getHibernateTemplate().find(hql.toString(),new Object[]{orgId,appKey});
			return list;
		} catch (Exception e) {
			e.printStackTrace();

		}

		return null;
	}

	@Override
	public List<AppConfig> getAllAppConfig() {
		StringBuffer hql = new StringBuffer();
		hql.append("from AppConfig ");
		try {
			List<AppConfig> appCofigList = (List<AppConfig>) this.getHibernateTemplate().find(
					hql.toString());
			return appCofigList;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	@Override
	public Category getParentCategoryByID(String id) {
		String hql="from Category   c where c.id=(select ca.parentId  from Category ca where  ca.id=?)";
		List<Category> list=(List<Category>) this.getHibernateTemplate().find(hql,new Object[]{id});
		if(list!=null && list.size()>0)
		{
			return list.get(0);
		}
		return null;
	}

	@Override
	public String getMaxCode(String appType, String str) {
		String hql=null;
		if(appType!=null && appType.equals("3"))
		{
			hql=" select con.number from  ContractInfo con where con.number like ?  order by  creatTime desc";
		}
		else
		{
			hql=" select p.number from  TProjectInfo p where  p.number like ? order by creatTime desc ";
		}
		str="%"+str+"%";
		List<String> list=(List<String>) this.getHibernateTemplate().find(hql,new Object[]{str});
		if(list!=null && list.size()>0)
		{
			return list.get(0);
		}
		return null;
	}

	@Override
	public List<Category> getAllCategory(int orgId) {
		StringBuffer hql = new StringBuffer();
		hql.append(" from Category  c where c.orgId=? order by c.sort asc ");
		try {
			List<Category> categoryList = (List<Category>) this.getHibernateTemplate().find(
					hql.toString(),new Object[]{orgId});
			return categoryList;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	@Override
	public boolean delCategoryByOrgId(final int orgId) {
		try {
			getHibernateTemplate().execute(new HibernateCallback() {
				public Object doInHibernate(Session session) {
					//session.beginTransaction();
					Query query = session.createQuery("from Category c where c.orgId =:orgId ");
					//query.setParameter("orgId", orgId);
					query.setInteger(0, orgId);
					List<Category> list = query.list();

					for (Category category : list) {
						session.delete(category);
					}
					//session.getTransaction().commit();

					return true;

				}
			});

		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}

		return true;
	}

	@Override
	public List<Category> getAppCategoryList(String arentcode, String appkey) {
		StringBuffer hql=new StringBuffer();
//		hql.append(" from Category c where   c.appKey='AO' and c.parentId in(select c1.id from Category c1 where c1.code='2' )");
		hql.append(" from Category c where   c.appKey='"+appkey+"' and c.parentId in(select c1.id from Category c1 where c1.code='"+arentcode+"' ) order by c.sort");
		
//		return this.getHibernateTemplate().find(hql.toString(),new Object[]{appkey,arentcode.trim()});
		return (List<Category>) this.getHibernateTemplate().find(hql.toString());
	}

	@Override
	public List<Category> getAppCategory(String appKey) {
		StringBuffer hql=new StringBuffer();
		hql.append(" from Category c where c.appKey=?  order by c.sort");
		
		return (List<Category>) this.getHibernateTemplate().find(hql.toString(),new Object[]{appKey});
	}

	@Override
	public List<Category> getAllNodesByAppkey(String appKey) {
		StringBuffer hql=new StringBuffer();
		hql.append(" from Category c where c.appKey = '"+appKey+"' ");
		Session   ssn   =   this.currentSession(); 
		Query query = ssn.createQuery(hql.toString());
		query.setMaxResults(1);
		List<Category> pl = query.list();
		if (pl.size()>0) {
			StringBuffer thql=new StringBuffer();
			thql.append(" from Category t where t.id ='"+pl.get(0).getId()+"' or t.allParentId like '%"+pl.get(0).getId()+"%' order by t.sort");
			return (List<Category>) this.getHibernateTemplate().find(thql.toString());
		}else
			return null;
	}

	@Override
	public Category getCategoryByCode(String appKey, String code) {
		StringBuffer hql = new StringBuffer();
		List<Object> objList = new ArrayList<Object>();
		try {
			hql.append("from Category t where 1=1");
			if(null!=appKey&&StringUtils.isNotBlank(appKey)){
				hql.append(" and t.appKey = ?");
				objList.add(appKey.trim());
			}
			if(null!=code&&StringUtils.isNotBlank(code)){
				hql.append(" and t.code = ?");
				objList.add(code.trim());
			}
			
			Object[] obj = new Object[objList.size()];
			for (int i = 0; i < objList.size(); i++) {
				obj[i] = objList.get(i);
			}
			List<Category> findList = (List<Category>) this.getHibernateTemplate().find(hql.toString(), obj);
			if(null!=findList&&findList.size()>0){
				return findList.get(0);
			}else{
				return null;
			}
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

	@Override
	public List<Category> getCategoryByAppkey(String appKey, Date startDate) {
		StringBuffer hql=new StringBuffer();
		try{
			
			hql.append(" from Category c where c.appKey = ? and  (c.createTime>=? or c.updtime>=? ) ");
			
			return (List<Category>) this.getHibernateTemplate().find(hql.toString(),new Object[]{appKey,startDate,startDate});
		}catch (Exception e) {
			e.printStackTrace();
		}
	
		
			return null;
	}

	@Override
	public List<Category> getAllNodesByAppkey(String appKey, Date startDate) {
		StringBuffer hql=new StringBuffer();
		try{
			
			hql.append(" from Category c where c.appKey = ? and  (c.createTime>=? or c.updtime>=? ) ");
			List<Category> list=(List<Category>) this.getHibernateTemplate().find(hql.toString(),new Object[]{appKey,startDate,startDate});
			
			if(list!=null && list.size()>0)
			{
				List<Category> allList=new ArrayList<Category>();
				for(Category c:list)
				{
					allList.add(c);
					String hqlstr=" from Category c where c.allParentId like ? and  (c.createTime>=? or c.updtime>=? )";
					List<Category> clist=(List<Category>) this.getHibernateTemplate().find(hqlstr.toString(),new Object[]{"%"+c.getId()+"%",startDate,startDate});
					if(clist!=null &&clist.size()>0)
					{
						for(Category cc:clist)
						{
							allList.add(cc);
						
						}
					}
					
				}
				
				return allList;
				
			}
		
		}catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	@Override
	public List<Category> getCategoryByPID(String pid) {
		StringBuffer hql=new StringBuffer();
        try{
			
			hql.append("select new Category(c,(select count(c2.id) from Category c2 where c2.parentId=c.id )) from Category c where c.parentId = ? order by sort ");
			List<Category> list=(List<Category>) this.getHibernateTemplate().find(hql.toString(),new Object[]{pid});
			List<Category> list2=null;
			if(list!=null && list.size()>0)
			{
				list2=new ArrayList<Category>();
				for(Category c:list)
				{
					list2.add(c.getCategory());
				}
			}
			
			return list2;
        }catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	@Override
	public List<Category> getAllChildCategory(String id) {
		 try{
			 StringBuffer hql=new StringBuffer();
				hql.append(" from Category c where c.allParentId like ?");
				List<Category> list=(List<Category>) this.getHibernateTemplate().find(hql.toString(),new Object[]{"%"+id+"%"});
				return list;
	        }catch (Exception e) {
				e.printStackTrace();
			}
			return null;
	}

	@Override
	public Category checkCategoryExitByName(String pid, String name) {
		try {
			StringBuffer hql=new StringBuffer();
			hql.append(" from Category c where c.parentId = ? and c.name= ? ");
			List<Category> list=(List<Category>) this.getHibernateTemplate().find(hql.toString(),new Object[]{pid,name});
			if (list!=null&&list.size()>0) {
				return list.get(0);
			}else {
				return null;
			}
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

	@Override
	public List<Category> getCategorysByCon(Category category) {
		List list = new ArrayList();
		StringBuilder hql = new StringBuilder();
			hql.append(" from Category c where 1=1 ");
		if(category!=null)
		{  
			
			if(category.getParentId()!=null&&!"".equals(category.getParentId()))
			{
				
				hql.append(" and c.parentId=? ");
				list.add(category.getParentId());
			}
			
			if(category.getName()!=null&&!"".equals(category.getName()))
			{
				hql.append(" and c.name like ? ");
				list.add("%"+category.getName()+"%");
			}
			if(category.getCode()!=null&&!"".equals(category.getCode())){
				hql.append(" and c.code = ? ");
				list.add(category.getCode());
			}
			if(category.getEx2()!=null&&!"".equals(category.getEx2())){
				hql.append(" and c.ex2 like ? ");
				list.add("%"+category.getEx2()+"%");
			}
	
		}
		hql.append(" order by c.sort asc ");
		Object[] obj = new Object[list.size()];
		for (int i = 0; i < list.size(); i++) {
			obj[i]=list.get(i);
		}
		try {
			List<Category> categoryList = (List<Category>) this.getHibernateTemplate().find(hql.toString(),obj);
			return categoryList;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}


	@Override
	public Category getCategoryCode(String parentId, String emsCode,boolean allChildren) {
		StringBuffer hql=new StringBuffer();
		if(allChildren)
		{
			hql.append(" from Category c where  c.allParentId  like ? and c.emsCode= ? ");
			List<Category> categoryList = (List<Category>) this.getHibernateTemplate().find(hql.toString(),new Object[]{"%"+parentId+"%",emsCode});
			if(categoryList!=null && categoryList.size()>0)
			{
				return categoryList.get(0);
			}
		}
		else
		{
			hql.append(" from Category c where c.parentId = ?  and c.emsCode= ? ");
			List<Category> categoryList = (List<Category>) this.getHibernateTemplate().find(hql.toString(),new Object[]{parentId,emsCode});
			if(categoryList!=null && categoryList.size()>0)
			{
				return categoryList.get(0);
			}
		}
		
		return null;
	}


	@Override
	public String getEmsCode(String parentId, String code) {
		StringBuffer hql = new StringBuffer();
		hql.append("select c.emsCode from Category c where c.parentId = ? and c.code= ? ");
		List<String> list = (List<String>) this.getHibernateTemplate().find(hql.toString(), new Object[] { parentId, code });
		if (list != null && list.size() > 0) {
			return list.get(0) == null ? "" : list.get(0);
		} else {
			return "";
		}
	}


	@Override
	public String getEmsCode(String parentId, String code, boolean allChildren) {
		StringBuffer hql=new StringBuffer();
		List<String> list = null;
		if(allChildren)
		{
			hql.append("select c.emsCode from Category c where c.allParentId like ? and c.emsCode= ? ");
			list = (List<String>) this.getHibernateTemplate().find(hql.toString(),new Object[]{"%"+parentId+"%",code});
		}
		else
		{
			hql.append("select c.emsCode from Category c where c.parentId = ? and c.code= ? ");
			list = (List<String>) this.getHibernateTemplate().find(hql.toString(), new Object[] { parentId, code });
		}
		if (list != null && list.size() > 0) {
			return list.get(0) == null ? "" : list.get(0);
		} else {
			return "";
		}
	}
	
}
