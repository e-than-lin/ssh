package com.utils.listPage;
import java.sql.SQLException;
import java.util.List;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.ResultSetExtractor;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;

public class ListPageSpringJdbcFactory<T>  extends ListPageFactory<T> {

	private Log log = LogFactory.getLog(ListPageSpringJdbcFactory.class);

	public ListPageSpringJdbcFactory(JdbcTemplate jt, String querySQL,
			RowMapper rowMapper) {
		this.setListPageStrategy(new SQLListPageStrategyProvider<T>(jt,
				querySQL, rowMapper));
	}

	public ListPageSpringJdbcFactory(JdbcTemplate jt, String querySQL,
			ResultSetExtractor<T> rm, Object... args) {
		this.setListPageStrategy(new SQLWithParmListPageStrategyProvider<T>(jt,
				querySQL, rm, args));
	}

	public ListPageSpringJdbcFactory(JdbcTemplate jt, String querySQL,
			String orderByField, ResultSetExtractor<T> rm, Object... args) {
		this
				.setListPageStrategy(new SqlserverWithParmListPageStrategyProvider<T>(
						jt, querySQL, orderByField, rm, args));
	}

	/**
	 * 去除 distinct ： select distinct xx from tab .引起的错误
	 */
	private String getCountSQL(String originalSQl) {
		// String UpperSQL = originalSQl.toUpperCase();
		// String countTotalNum_SQL =
		// originalSQl.substring(UpperSQL.indexOf("FROM"));
		// return new StringBuilder("select count(*)
		// ").append(countTotalNum_SQL).toString();
		return new StringBuilder("select count(*) rowcount from ( ").append(originalSQl)
				.append(") target").toString();

	}

	/**
	 * >>>>>如果SQL
	 * Server有支持分页的sql语句，你可以自己编写一个SQLServerDialect类，这样不就行了，可以在Hibernate里面使用SQL
	 * Server的分页语句了吗？
	 * Sqlserver是有的，也是利用嵌套查询，并且速度亦是非常地快，在查询分析器里测试，亦是50万的表，取49万以后的20条只要0.01秒
	 * 语句如下： 获取按照F1字段升序排序的，从m至n行记录 F1一定要做索引或主键，最好是主键 select t2.* from (Select
	 * top n-m t1.* from (Select top n * from Tablename as t order by t.F1) as
	 * t1 order by t1.F1 desc) as t2 order by t2.F1 select t2.* from ( select
	 * top 20 t1.* from ( select top 500020 * from dbgen as t order by t.F1 ) as
	 * t1 order by t1.F1 desc ) as t2 order by t2.F1
	 * @see
	 * @since 2008-5-22 下午02:11:04
	 * @updatehistory 时间:2008-5-22 下午02:11:04;
	 * @param <OT>
	 */
	private class SqlserverWithParmListPageStrategyProvider<OT> implements
			ListPageStrategy<T> {

		private final JdbcTemplate simpleJdbcTemplate;

		private final String querySQL;

		private ResultSetExtractor<T> rowMapper;

		private Object[] parmValues;

		private String orderByField;

		public SqlserverWithParmListPageStrategyProvider(JdbcTemplate jt,
				String querySQL, String orderByField,
				ResultSetExtractor<T> rm, Object... args)
				throws DataAccessException {
			this.simpleJdbcTemplate = jt;
			this.querySQL = querySQL;
			this.orderByField = orderByField;
			this.rowMapper = rm;
			this.parmValues = args;
		}

		public List<T> getPageElements(final int firstNum, final int lastNum) {
			if (log.isInfoEnabled()) {
				log.info("firstNum = " + firstNum + "; lastNum =  " + lastNum);
				log
						.info("paginationSQL = "
								+ getPaginationSQL(firstNum, lastNum,
										this.orderByField));
			}
			return getPageElements(getPaginationSQL(firstNum, lastNum,
					this.orderByField));
		}

		public int getTotalNumOfElements() {
			if (log.isInfoEnabled()) {
				log.info("TotalNumOfElements SQL= " + getCountSQL(querySQL));
			}
			return (Integer) simpleJdbcTemplate.queryForMap(getCountSQL(querySQL),parmValues).get("rowcount");
		}

		private List<T> getPageElements(String paginationSQL) {
			return (List<T>) simpleJdbcTemplate.query(paginationSQL, rowMapper,parmValues);
		}

		private String getPaginationSQL(int firstNum, final int lastNum,
				String F1) {
			String sql = querySQL.toLowerCase();
			sql = sql.replace("select", "select top " + lastNum + "  ");
			sql = "select t2.* from (	select top "
					+ ((lastNum >= firstNum) ? (lastNum - firstNum)+1 : 0)
					+ " t1.* from	(" + sql + " order by  " + F1
					+ ")	as t1 order by t1." + F1 + " desc) as t2 order by t2."
					+ F1;
			return sql;
		}

	}

	private class SQLListPageStrategyProvider<OT> implements
			ListPageStrategy<T> {

		private final JdbcTemplate jt;

		private final String querySQL;

		private RowMapper rowMapper;

		public SQLListPageStrategyProvider(JdbcTemplate jt, String querySQL,
				RowMapper rowMapper) {
			this.jt = jt;
			this.querySQL = querySQL;
			this.rowMapper = rowMapper;
		}

		public List<T> getPageElements(final int firstNum, final int lastNum) {
			String paginationSQL = getPaginationSQL(firstNum, lastNum);
			if (log.isInfoEnabled()) {
				log.info("firstNum = " + firstNum + "; lastNum =  " + lastNum);
				log.info("paginationSQL = " + paginationSQL);
			}
			return getPageElements(paginationSQL);
		}

		public int getTotalNumOfElements() {
			if (log.isInfoEnabled()) {
				log.info("TotalNumOfElements SQL= " + getCountSQL(querySQL));
			}
			return  (Integer) jt.queryForMap(getCountSQL(querySQL)).get("rowcount");
		}

	

		@SuppressWarnings("unchecked")
		private List<T> getPageElements(String paginationSQL) {
			return jt.query(paginationSQL, rowMapper);
		}

		private String getPaginationSQL(int firstNum, int lastNum) {
			
			StringBuffer SQL = null;
			
			String driverName=null;
			try {
				driverName="MYSQL";//this.jt.getDataSource().getConnection().getMetaData().getDriverName();
			} catch (Exception e) {
				
				e.printStackTrace();
			}
			if(driverName!=null && !driverName.equals(""))
			{
				driverName=driverName.toUpperCase();
				if(driverName.contains("MYSQL"))
				{
					SQL=new StringBuffer();
					SQL.append("select ttt.* from ("+querySQL+" )ttt ");
					firstNum=firstNum-1;
					if(lastNum>firstNum)
					{
						SQL.append(" limit "+firstNum+","+(lastNum-firstNum));
					}
					else
					{
						SQL.append(" limit "+firstNum+",0");
					}
					return SQL.toString();
				}
				else if(driverName.contains("ORACLE"))
				{
					SQL = new StringBuffer(
					" select *　from (select ppl.* from ( select t.*, ROWNUM rn from ( ");
					SQL.append(querySQL);
					SQL.append(" ) t ) ppl　where rn <=  ");
					SQL.append(lastNum);
					SQL.append(" )　where rn >=   ");
					SQL.append(firstNum);
					SQL.append("  order by rn ");
				}else
				{
					SQL=new StringBuffer();
					SQL.append(querySQL);
					return SQL.toString();
					
				}
				
				
			}
			else
			{
				
				SQL=new StringBuffer();
				SQL.append(querySQL);
			}
			
			
			
			
			return SQL.toString();
		}
	}

	// select *
	// from ( select /*+ FIRST_ROWS(n) */
	// a.*, ROWNUM rnum
	// from ( your_query_goes_here,
	// with order by ) a
	// where ROWNUM <=
	// :MAX_ROW_TO_FETCH )
	// where rnum >= :MIN_ROW_TO_FETCH;

	private class SQLWithParmListPageStrategyProvider<OT> implements
			ListPageStrategy<T> {

		private final JdbcTemplate simpleJdbcTemplate;

		private final String querySQL;

		private ResultSetExtractor<T> rowMapper;

		private Object[] parmValues;

		public SQLWithParmListPageStrategyProvider(JdbcTemplate jt,
				String querySQL, ResultSetExtractor<T> rm, Object... args)
				throws DataAccessException {
			this.simpleJdbcTemplate = jt;
			this.querySQL = querySQL;
			this.rowMapper = rm;
			this.parmValues = args;
		}

		public List<T> getPageElements(final int firstNum, final int lastNum) {
			if (log.isInfoEnabled()) {
				log.info("firstNum = " + firstNum + "; lastNum =  " + lastNum);
				log.info("paginationSQL = " + getPaginationSQL(firstNum,lastNum));
			}
			return getPageElements(getPaginationSQL(firstNum, lastNum));
		}

		public int getTotalNumOfElements() {
			if (log.isInfoEnabled()) {
				log.info("TotalNumOfElements SQL= " + getCountSQL(querySQL));
			}
			
			String SQL=getCountSQL(querySQL);
			int count= (Integer) simpleJdbcTemplate.queryForMap(SQL,parmValues).get("rowcount");
			return count;
		}

	

		private List<T> getPageElements(String paginationSQL) {
			int len = parmValues.length;
			//System.arraycopy(parmValues, 0, allParmVal, 0, len);
			return (List<T>) simpleJdbcTemplate.query(paginationSQL,parmValues, rowMapper);
		}

		private String getPaginationSQL( int firstNum,
				final int lastNum) {
			
			
             StringBuffer SQL = null;
			
			String driverName=null;
			try {
				driverName="ORACLE";//this.simpleJdbcTemplate.getDataSource().getConnection().getMetaData().getDriverName();
			} catch (Exception e) {
				
				e.printStackTrace();
			}
			if(driverName!=null && !driverName.equals(""))
			{
				driverName=driverName.toUpperCase();
				
				if(driverName.contains("MYSQL"))
				{
					firstNum=firstNum-1;
					SQL=new StringBuffer();
					SQL.append("select ttt.* from ("+querySQL+" )ttt ");
					if(lastNum>firstNum)
					{
						SQL.append(" limit "+firstNum+","+(lastNum-firstNum));
					}
					else
					{
						SQL.append(" limit "+firstNum+",0");
					}
					
					return SQL.toString();
				}
				else if(driverName.contains("ORACLE"))
				{
					SQL = new StringBuffer(
					" select *　from (select ppl.* from ( select t.*, ROWNUM rn from ( ");
					SQL.append(querySQL);
					SQL.append(" ) t ) ppl　where rn <=  ");
					SQL.append(lastNum);
					SQL.append(" )　where rn >=   ");
					SQL.append(firstNum);
					SQL.append("  order by rn ");
				}else
				{
					SQL=new StringBuffer();
					SQL.append(querySQL);
					return SQL.toString();
					
				}
				
				
			}
			else
			{
				SQL=new StringBuffer();
				SQL.append(querySQL);
			}

			return SQL.toString();
		}
	}

}
