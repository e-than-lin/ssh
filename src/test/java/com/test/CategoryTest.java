package com.test;

import static org.junit.Assert.*;

import java.util.Date;

import org.junit.Before;
import org.junit.Test;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import com.ethan.domain.Category;
import com.ethan.service.CategoryServices;
import com.ethan.service.imp.CategoryServicesImp;

public class CategoryTest {
	private static ApplicationContext ctx;
	private CategoryServices categoryServicesImp;
	@Before
	public void init(){
		ctx=new ClassPathXmlApplicationContext("classpath:applicationContext.xml","classpath:spring.xml");
		categoryServicesImp=ctx.getBean("tCategoryServicesImp",CategoryServicesImp.class);
	}
	@Test
	public void addTest() {
		Category category = new Category();
		category.setId("JTEST-001");
		category.setCode("JTEST-001");
		category.setName("JTEST-001");
		category.setAllParentId("BASE");
		category.setOrgId(20000002);
		category.setCreator(20000002);
		Date date=new Date();
		category.setCreateTime(date);
		category.setUpdtime(date);
		category.setUpdUser(20000002);
		boolean flag = categoryServicesImp.addCategory(category);
		assertTrue(flag);
	}
	@Test
	public void updateTest() {
		Category category = new Category();
		category.setId("JTEST-001");
		category.setCode("JTEST-002");
		assertTrue(categoryServicesImp.updCategory(category));
	}
	@Test
	public void searchTest() {
		Category category =categoryServicesImp.getCategoryById("JTEST-001");
		assertNotNull(category);
		assertTrue(category.getCode().equals("JTEST-001"));
	}
	@Test
	public void deleteTest() {
		assertTrue(categoryServicesImp.delCategoryById("JTEST-001"));
	}

}
