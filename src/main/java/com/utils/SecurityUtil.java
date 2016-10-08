package com.utils;

import java.security.MessageDigest;

import sun.misc.BASE64Encoder;

public class SecurityUtil {

	// 混淆字节
	private static byte[] salt = new byte[] { 'A', 'X', 'C', 'R', 'T', '1',
			'K', 'S', '9', '6', 'L', 'W', 'O' };

	/**
	 * 加密字符串
	 * 
	 * @param str
	 * @return
	 */
	public static String encryptCode(String str) {
		try {
			if (str == null)
				return null;

			// 设置加密的格式
			MessageDigest md = MessageDigest.getInstance("MD5");
			// 加入混淆字节
			md.update(salt);
			// 设置加密字符串及编码格式
			md.update(str.getBytes("UTF-8"));

			// 加密之后统一转为大写字符
			return new BASE64Encoder().encode(md.digest()).toUpperCase();
		} catch (Exception er) {
			er.printStackTrace();
		}
		return null;
	}

	/**
	 * 加密验证
	 * 
	 * @param src
	 * @param encryptSrc
	 * @return boolean, 成功返回true, 失败false;
	 */
	public static boolean authenticate(String src, String encryptSrc) {
		try {
			if (src != null) {
				// 先加密，后匹配
				return SecurityUtil.encryptCode(src).equals(encryptSrc);
			}
		} catch (Exception er) {
			er.printStackTrace();
		}
		return false;
	}
}