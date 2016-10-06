package com.utils.listPage;

public interface ListPageDao<T> {
	public IPagination<T> getListPage(final PaginationInfo pageInfo,final T t);
}
