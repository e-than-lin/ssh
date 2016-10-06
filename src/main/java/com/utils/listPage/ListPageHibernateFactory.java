package com.utils.listPage;

import java.util.List;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.hibernate.HibernateException;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.criterion.DetachedCriteria;
import org.springframework.orm.hibernate5.HibernateCallback;
import org.springframework.orm.hibernate5.HibernateTemplate;

public class ListPageHibernateFactory<T> extends ListPageFactory<T> {

    private static Log log = LogFactory.getLog(ListPageHibernateFactory.class);

    @SuppressWarnings("unchecked")
    public ListPageHibernateFactory(HibernateTemplate ht, String hql,Object...objects) {
    	this.setListPageStrategy(new HQLListPageStrategyProvider<T>(ht, hql, hql,objects,objects));
    }
    
    @SuppressWarnings("unchecked")
    public ListPageHibernateFactory(HibernateTemplate ht, String hql,String countDbSql,Object[] objects) {
    	this.setListPageStrategy(new HQLListPageStrategyProvider<T>(ht, hql, countDbSql,objects,objects));
    }
    @SuppressWarnings("unchecked")
    public ListPageHibernateFactory(HibernateTemplate ht, String hql,String countDbSql,Object[] objects,Object[] countObjects) {
    	this.setListPageStrategy(new HQLListPageStrategyProvider<T>(ht, hql, countDbSql,objects,countObjects));
    }

//    @SuppressWarnings("unchecked")
//    private ListPageHibernateFactory(HibernateTemplate ht,  DetachedCriteria criteria) {
//    	this.setListPageStrategy(new DetachedCriteriaListPageStrategyProvider<T>(ht, criteria));
//    }  
    
    private class HQLListPageStrategyProvider<OT> implements ListPageStrategy {
	private HibernateTemplate ht;
	private String hql;
	private Object[] objects;
	private String countDbSql;
	private Object[] countObjects;

	public HQLListPageStrategyProvider(HibernateTemplate ht, String hql,String countDbSql,Object[] objects ,Object[] countObjects) {
	    this.ht = ht;
	    this.hql = hql;
	    this.objects = objects;
	    this.countDbSql = countDbSql;
	    this.countObjects = countObjects;
	}

	@SuppressWarnings("unchecked")
	public List<OT> getPageElements(final int firstNum, final int lastNum) {
	    log.info("firstNum = " + (firstNum - 1) + " lastNum = " + lastNum);
	       
	    return (List<OT>) ht.execute(new HibernateCallback() {
		public Object doInHibernate(Session session)throws HibernateException {
		    Query query = session.createQuery(hql);
			for (int i = 0; i < objects.length; i++) {
				query.setParameter(i, objects[i]);
			}
			query.setFirstResult(firstNum - 1).setMaxResults(lastNum - (firstNum - 1));
		    return query.list();
		}
	    });
	}

	public int getTotalNumOfElements() {

		if(countDbSql.indexOf("new")>0)
		{
			List<OT> objectlist=(List<OT>) ht.find(hql,countObjects);
			if(objectlist!=null)
			{
				return objectlist.size();
			}
		}
		else
		{
			return  new Integer(ht.find(dealCountHQL(countDbSql),countObjects).get(0).toString()).intValue();

		}
		return  0;
	}
    }

    public static void main(String[] args) {
	String ss = "select  distinct t.type_id ,distinct t.name, t.company_id  from CL_FL_IC_REGISTER t";
	System.out.println(dealCountHQL(ss));
	String ss2 = "select distinct t.type_id from CL_FL_IC_REGISTER t";
	System.out.println(dealCountHQL(ss2));
	String hs = "from RegRecord ";
	System.out.println(dealCountHQL(hs));
    }

   
    public static String dealCountHQL(String hql) {
    	String upHQL = hql.toUpperCase();
    	
    	int x = upHQL.indexOf("FROM");
    	int i = upHQL.substring(0, x).indexOf("DISTINCT");
    	
    	StringBuffer sb2 = new StringBuffer();
    	if (i != -1) {
    	    int j = upHQL.indexOf(",");
    	    j = j == -1 ? x : j;
    	    sb2.append(hql.substring(0, i)).append("count(").append(
    		    hql.substring(i, j - 1).trim()).append(") ").append(
    		    hql.substring(x));
    	} 
    	else
    	{
    		sb2.append("select count(*) ").append(
        		    hql.substring(x).trim());
    	}
        
    	return sb2.toString();
    }

    private class DetachedCriteriaListPageStrategyProvider<OT> implements
	    ListPageStrategy {

	public DetachedCriteriaListPageStrategyProvider(HibernateTemplate ht,
		DetachedCriteria criteria) {
	// TODO Auto-generated constructor stub
	}

	public List<OT> getPageElements(int firstNum, int lastNum) {
	    // TODO Auto-generated method stub
	    return null;
	}

	public int getTotalNumOfElements() {
	    // TODO Auto-generated method stub
	    return 0;
	}

    }
}
