package com.utils.listPage;

import java.sql.SQLException;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import org.apache.commons.lang.StringUtils;
import org.hibernate.HibernateException;
import org.hibernate.Query;
import org.hibernate.Session;
import org.springframework.orm.hibernate5.HibernateCallback;
import org.springframework.orm.hibernate5.HibernateTemplate;


/**
 *
 * 
 * @version 
 * @param <T>
 */
public class ListPageHibernateExtFactory<T> extends ListPageFactory<T> {
    
    @SuppressWarnings("unchecked")
    public ListPageHibernateExtFactory(int hql_type,HibernateTemplate ht,String dbSql,String countDbSql,Map<String,Object> nameedPar){
        this.setListPageStrategy(new HibernateListPageStrategyProvider<T>(hql_type, ht, dbSql, countDbSql, nameedPar));
    }

    //--------------------------定义一个实现分页查询器内部类(开始)----------------------------
    private class HibernateListPageStrategyProvider<OT> implements ListPageStrategy{
        private int hql_type; //Hibernate的查询模式 0-hql,1-sql
        private HibernateTemplate ht;//Hibernate 的模板
        private String dbSql; //Sql 字符串或Hql 字符串
        private String countDbSql; //查询数量的Sql或Hql字符串
        private Map<String,Object> namedParameter; //命名参数Map;
        
        public HibernateListPageStrategyProvider(int hql_type,HibernateTemplate ht,String dbSql,String countDbSql,Map<String,Object> nameedPar){
            this.hql_type = hql_type;
            this.ht = ht;
            this.dbSql = dbSql;
            this.countDbSql = countDbSql;
            this.namedParameter = nameedPar;
        }
        @Override
        public int getTotalNumOfElements() {
            try{
            if(StringUtils.isNotBlank(countDbSql)){
                return (Integer) ht.execute(new HibernateCallback() {
                    public Object doInHibernate(Session session) {
                        Query query  = null;
                        int number =0;
                        if(hql_type==0){
                            //标准hql
                            query = session.createQuery(countDbSql);
                        }else if(hql_type==1){
                            //sql
                            query = session.createSQLQuery(countDbSql);
                        }
                        //赋值参数
                        if(namedParameter!=null && namedParameter.size()>0){
                            for (Entry<String, Object> entry: namedParameter.entrySet()) {
                               String  key = entry.getKey();
                               Object  value = entry.getValue();
                               query.setParameter(key, value);
                            }
                        }
                        List result = query.list();
                        if(result!=null && result.size()>0){
                            number = ((Long)result.get(0)).intValue();
                        }
                        return number;
                    }
                });
            }else{
                return 0;
            }
            }catch(Exception e){
                e.printStackTrace();
                return 0;
            }
        }
        @SuppressWarnings("unchecked")
        @Override
        public List<OT> getPageElements(final int firstNum, final int lastNum) {
            try{
            if(StringUtils.isNotBlank(dbSql)){
                return (List<OT>) ht.execute(new HibernateCallback() {
                    public Object doInHibernate(Session session) {
                        Query query  = null;
                        if(hql_type==0){
                            //标准hql
                            query = session.createQuery(dbSql);
                        }else if(hql_type==1){
                            //sql
                            query = session.createSQLQuery(dbSql);
                        }
                        //赋值参数
                        if(namedParameter!=null && namedParameter.size()>0){
                            for (Entry<String, Object> entry: namedParameter.entrySet()) {
                               String  key = entry.getKey();
                               Object  value = entry.getValue();
                               query.setParameter(key, value);
                            }
                        }
                        //设置分页
                        query.setFirstResult(firstNum - 1).setMaxResults(lastNum - (firstNum - 1));
                        return query.list();
                    }
                });
            }else{
                return null;
            }
            }catch(Exception e){
                e.printStackTrace();
                return null;
            }
        }
       
    }
    //--------------------------定义一个实现分页查询器内部类(结束)----------------------------
    



}

