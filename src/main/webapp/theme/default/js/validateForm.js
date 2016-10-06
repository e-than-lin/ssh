function  validateForm(){
	
}
/**
 * 表单字段输入长度控件
 * objId 表单字段输入框ID
 * labId 显示提示信息lab标签ID
 * propertyLength 该字段允许输入长度
 */
validateForm.MeMo = function(objId,labId,propertyLength){
	if($("#"+objId).val() != "" ){
		
	var size = $("#"+objId).val().length;
	if(propertyLength < size){
		$("#"+objId).val($("#"+objId).val().substring(0,propertyLength));
		$("#"+labId).addClass("label_tip");
		$("#"+labId).text("最大可以输入"+propertyLength+"个字，现已经输入:"+propertyLength+"个字，还可以输入0个字");	

		return ;
	}else{
		$("#"+labId).addClass("label_tip");
		$("#"+labId).text("最大可以输入"+propertyLength+"个字，现已经输入:"+size+"个字，还可以输入"+(propertyLength-size)+"个字");	
	}	}
	else{
		$("#"+labId).text("");	
	}
};
/**表单字段非空判断
 * objId 表单字段输入框ID
 * labId 显示提示信息lab标签ID
 * propertyName 表单属性显示名称
 * 
 */
validateForm.isNull = function(objId,labId,propertyName){
	var propertys = $("#"+objId).val();
	var regu = "^[ ]+$"; 
	var re = new RegExp(regu); 
	if (propertys == ""){
		$("#"+labId).addClass("label_tip");
		$("#"+labId).text(propertyName+"不能为空！");
		return ; 
	}else{
		$("#"+labId).text(""); 
	}
	if(re.test(propertys)){
		$("#"+labId).addClass("label_tip");
		$("#"+labId).text(propertyName+"不能为空！");
		return;
	}else{
		$("#"+labId).text(""); 
	}
};
/**
 * 判断表单字段非法字符输入（只能输入数字、英文和汉字）
 * objId 表单字段输入框ID
 * labId 显示提示信息lab标签ID
 * propertyName 表单属性显示名称
 * 
 */
validateForm.isIllegalCharacter = function(objId,labId,propertyName){
	var propertys = $("#"+objId).val();
	var regu = "^[0-9a-zA-Z\u4e00-\u9fa5]+$"; 
	var re = new RegExp(regu); 
	if (!re.test(propertys)) { 
		$("#"+labId).removeClass("label_go");
		$("#"+labId).addClass("label_tip");
		$("#"+labId).text(propertyName+"不能输入非法字符！");
		return ;
	}else{
		$("#"+labId).text(""); 
	}
		
};


/**
 * 判断表单字段数字输入（只能输入数字）
 * objId 表单字段输入框ID
 * labId 显示提示信息lab标签ID
 * propertyName 表单属性显示名称
 * 
 */
validateForm.isNoN = function(objId,labId,propertyName){
	var propertys = $("#"+objId).val(); 
	 var reg = /^\d+$/;
	if (!reg.test(propertys)) { 
		$("#"+labId).addClass("label_tip");
		$("#"+labId).text(propertyName+"只能输入数字！");
		return ;
	} else{
		$("#"+labId).text(""); 
	}
};

/**
 * 判断表单字段整数输入（只能输入整数字）
 * objId 表单字段输入框ID
 * labId 显示提示信息lab标签ID
 * propertyName 表单属性显示名称
 * 
 */
validateForm.isNum = function(objId,labId,propertyName){
	var propertys = $("#"+objId).val(); 
	var regu = /^[-]{0,1}[0-9]{1,}$/; 
	if (!regu.test(propertys)) { 
		$("#"+labId).addClass("label_tip");
		$("#"+labId).text(propertyName+"只能输入整数字！");
		return ;
	} else{
		$("#"+labId).text(""); 
	}
};

/**
 * 判断表单字段正整数输入（只能输入正整数字,不可以用零开头）
 * objId 表单字段输入框ID
 * labId 显示提示信息lab标签ID
 * propertyName 表单属性显示名称
 * 
 */
validateForm.isNumber = function(objId,labId,propertyName){
	var propertys = $("#"+objId).val(); 
	var regu = "^[0-9]+$"; 
	var no = propertys.substring(0,1);
	var re = new RegExp(regu); 
	if(propertys==null || propertys==''){
		$("#"+labId).addClass("label_tip");
		$("#"+labId).text(propertyName+"不允许为空！");
		return;
	}else{
		$("#"+labId).text(""); 
	}
	if(no==0){
		$("#"+labId).addClass("label_tip");
		$("#"+labId).text(propertyName+"不能以零开头！");
		return;
	}else{
		$("#"+labId).text(""); 
	}
	if (propertys.search(re) == -1) { 
		$("#"+labId).addClass("label_tip");
		$("#"+labId).text(propertyName+"只能输入正整数字！");
		return ;
	} else{
		$("#"+labId).text(""); 
	}
	return true;
};

/**
 * 判断表单字段手机号输入
 * objId 表单字段输入框ID
 * labId 显示提示信息lab标签ID
 * propertyName表单属性显示名称
 */
validateForm.checkMobile = function(objId,labId,propertyName){
	var propertys = $("#"+objId).val(); 
	if(propertys != "" && propertys != null){
		//var regu = /^(13[0-9]|15[0|3|6|8|9]|18[0-9])\d{8}$/;//运营商不断推出新号段，所以改为只验证11位整数
		var regu = /^([0-9]\d{10})$/;
		var re = new RegExp(regu); 
		if (!re.test(propertys)) { 
			$("#"+labId).addClass("label_tip");
			$("#"+labId).text(propertyName+"格式不正确！");
			return ;
		} else{
			$("#"+labId).text(""); 
		}
	}else{
		$("#"+labId).text(""); 
	}
};



/**
 * 判断表单字段电话号码输入
 * objId 表单字段输入框ID
 * labId 显示提示信息lab标签ID
 * propertyName 表单属性显示名称
 * 
 */
validateForm.isTel = function(objId,labId,propertyName){
	var propertys = $("#"+objId).val(); 
	if(propertys != "" && propertys != null){
	var reg=/^((0\d{2,3})-)?(\d{7,8})(-(\d{3,}))?$/; 
	var re = new RegExp(reg); 
	var tel =new Array();
	tel = propertys.split(",");
	if(tel.length > 1){
		for(var i =0;i<tel.length;i++){
			if (!re.test(tel[i])) { 
				$("#"+labId).addClass("label_tip");
				$("#"+labId).text(propertyName+"输入格式不正确！");
				return ;
			} else{
				$("#"+labId).text(""); 
			}
		}
	}else{
		if (!re.test(propertys)) { 
			$("#"+labId).addClass("label_tip");
			$("#"+labId).text(propertyName+"输入格式不正确！");
			return ;
		} else{
			$("#"+labId).text(""); 
		}
	}
	}else{
		$("#"+labId).text(""); 
	}
};



/**
 * 判断表单字段身份证号输入
 * objId 表单字段输入框ID
 * labId 显示提示信息lab标签ID
 * 
 */
validateForm.isIDno = function(objId,labId){
		var propertys = $("#"+objId).val();   
		var fale =false;
	    var aCity={11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外"};  
	   
	    var iSum = 0;  
	    var idCardLength = propertys.length;    
	    if(!/^\d{17}(\d|x)$/i.test(propertys)&&!/^\d{15}$/i.test(propertys))   
	    {
	    	$("#"+labId).addClass("label_tip");
			$("#"+labId).text("非法身份证！"); 
			fale =false;
	        return ;  
	    }  
	   
	    //在后面的运算中x相当于数字10,所以转换成a  
	    propertys = propertys.replace(/x$/i,"a");  
	  
	    if(aCity[parseInt(propertys.substr(0,2))]==null)  
	    {  

	    	$("#"+labId).addClass("label_tip");
			$("#"+labId).text("非法地区！");   
			fale =false;
	        return ;  
	    }  
	      
	    if (idCardLength==18)  
	    {  
	        sBirthday=propertys.substr(6,4)+"-"+Number(propertys.substr(10,2))+"-"+Number(propertys.substr(12,2));  
	        var d = new Date(sBirthday.replace(/-/g,"/"))  
	        if(sBirthday!=(d.getFullYear()+"-"+ (d.getMonth()+1) + "-" + d.getDate()))  
	        {          
	        	$("#"+labId).addClass("label_tip");
				$("#"+labId).text("非法生日！"); 
				fale =false;
	            return ;  
	        }  
	  
	        for(var i = 17;i>=0;i --)  
	            iSum += (Math.pow(2,i) % 11) * parseInt(propertys.charAt(17 - i),11);  
	        if(iSum%11!=1)  
	        {   
	        	$("#"+labId).addClass("label_tip");
				$("#"+labId).text("非法身份证号！");  
				fale =false;
	            return ;  
	        }  
	    }  
	    else if (idCardLength==15)  
	    {  
	        sBirthday = "19" + propertys.substr(6,2) + "-" + Number(propertys.substr(8,2)) + "-" + Number(propertys.substr(10,2));  
	        var d = new Date(sBirthday.replace(/-/g,"/"))  
	        var dd = d.getFullYear().toString() + "-" + (d.getMonth()+1) + "-" + d.getDate();     
	        if(sBirthday != dd)  
	        {  
	        	$("#"+labId).addClass("label_tip");
				$("#"+labId).text("非法生日！"); 
				fale =false;
	            return ;  
	        }  
	    }  
	    fale =true;
	    if(fale){
	    	$("#"+labId).text(""); 
	    }
};



/**
 * 判断表单字段电子邮件输入
 * objId 表单字段输入框ID
 * labId 显示提示信息lab标签ID
 * 
 */
validateForm.isEmail = function(objId,labId,propertyName){
	var propertys = $("#"+objId).val();   
	if(propertys != "" && propertys != null){
		var myReg = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
		if (!myReg.test(propertys)){
			$("#"+labId).addClass("label_tip");
			$("#"+labId).text(propertyName+"地址不正确！"); 
			return;
		} else{
			$("#"+labId).text(""); 
		}
	}else{
		$("#"+labId).text(""); 
	}
	
};

/**
 * 判断表单字段电子邮件输入
 * objId 表单字段输入框ID
 * labId 显示提示信息lab标签ID
 * @returns true or false
 */
validateForm.checkEmail = function(objId,labId,propertyName){
		var flag = true;
		var propertys = $("#"+objId).val();   
		if(propertys != "" && propertys != null){
			var myReg = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
			if (!myReg.test(propertys)){
				$("#"+labId).addClass("label_tip");
				$("#"+labId).text(propertyName+"地址不正确！");				
				flag = false;
			} else{
				$("#"+labId).text(""); 
			}
		}else{
			$("#"+labId).text(""); 
		}
		return flag;
};
/**
 * 检查开始日期是否小于等于结束日期
 * dateOneId 开始日期 格式：2001-5-4
 * dateTwoId 结束日期 格式：2002-5-4
 * labId 显示提示信息lab标签ID
 * dateOneName 开始日期名称
 * dateTwoName 结束日期名称
 */
validateForm.data_compare = function(dateOneId,dateTwoId,labId,dateOneName,dateTwoName){
	var dateOne =$('#dateOneId').val(); 
	var dateTwo =$('#dateTwoId').val(); 
	var arr=dateOne.split("-");
	var starttime=new Date(arr[0],arr[1],arr[2]);
	var starttimes=starttime.getTime();
 
	var arrs=dateTwo.split("-");
	var endtime=new Date(arrs[0],arrs[1],arrs[2]);
	var endtimes=endtime.getTime();
 
	 if(starttimes>=endtimes)
	 {
		 $("#"+labId).addClass("label_tip");
		 $("#"+labId).text(dateOneName+"不能大于"+dateTwoName+"！"); 
	  return false;
	 }else{
		 $("#"+labId).text(""); 
	 }
};

/**
 * 检查输入字符串是否符合金额格式 ,格式定义为正数或者带小数的正数，小数点后最多三位 
 * objId 表单字段输入框ID
 * labId 显示提示信息lab标签ID
 * objName 字段对应的名称
 * 
 * 
 */
validateForm.isMoney = function(objId,labId,objName){
	var propertys = $("#"+objId).val();  
	var regu = "^[0-9]+[\.][0-9]{0,3}$"; 
	var regu2 = "^[0-9]+$"; 
	var re = new RegExp(regu); 
	var re2 = new RegExp(regu2); 
	if(!re2.test(propertys)){
		if (!re.test(propertys)) { 
			 $("#"+labId).addClass("label_tip");
			 $("#"+labId).text(objName+"格式不正确！"); 
			 return ; 
		} else { 
			$("#"+labId).text(""); 
		} 
	}else{
		$("#"+labId).text(""); 
	}	
	return true;
};


/**
 * 验证传真号码
 * objId 表单字段输入框ID
 * labId 显示提示信息lab标签ID
 * propertyName表单属性显示名称
 */
validateForm.checkFax = function(objId,labId,propertyName){
	var propertys = $("#"+objId).val(); 
	if(propertys != "" && propertys != null){
		var regu = /^((0[\d]{2,3})-)?[\d]{7,8}$/;
		var re = new RegExp(regu); 
		if (!re.test(propertys)) { 
			$("#"+labId).addClass("label_tip");
			$("#"+labId).text(propertyName+"格式不正确！");
			return ;
		} else{
			$("#"+labId).text(""); 
		}
	}else{
		$("#"+labId).text(""); 
	}
};

/**
 * 验证邮编
 * objId 表单字段输入框ID
 * labId 显示提示信息lab标签ID
 * propertyName表单属性显示名称
 */
validateForm.checkPost = function(objId,labId,propertyName){
	var propertys = $("#"+objId).val(); 
	if(propertys != "" && propertys != null){
		var regu = /^[0-9]{6}$/;
		var re = new RegExp(regu); 
		if (!re.test(propertys)) { 
			$("#"+labId).addClass("label_tip");
			$("#"+labId).text(propertyName+"格式不正确！");
			return ;
		} else{
			$("#"+labId).text(""); 
		}
	}else{
		$("#"+labId).text(""); 
	}
};

/**
 * 验证QQ
 * objId 表单字段输入框ID
 * labId 显示提示信息lab标签ID
 * propertyName表单属性显示名称
 */
validateForm.isQQ = function(objId,labId,propertyName){
	var propertys = $("#"+objId).val(); 
	if(propertys != "" && propertys != null){
		var regu = /^[0-9]{5,11}$/;
		var re = new RegExp(regu); 
		if (!re.test(propertys)) { 
			$("#"+labId).addClass("label_tip");
			$("#"+labId).text(propertyName+"格式不正确！");
			return ;
		} else{
			$("#"+labId).text(""); 
		}
	}else{
		$("#"+labId).text(""); 
	}
};

/**
 * 验证MSN
 * objId 表单字段输入框ID
 * labId 显示提示信息lab标签ID
 * propertyName表单属性显示名称
 */
validateForm.checkMSN = function(objId,labId,propertyName){
	var propertys = $("#"+objId).val(); 
	if(propertys != "" && propertys != null){
		var regu =  /^[a-zA-Z0-9_]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]+(.[a-zA-Z0-9]+)*$/;
		var re = new RegExp(regu); 
		if (!re.test(propertys)) { 
			$("#"+labId).addClass("label_tip");
			$("#"+labId).text(propertyName+"格式不正确！");
			return ;
		} else{
			$("#"+labId).text(""); 
		}
	}else{
		$("#"+labId).text(""); 
	}
};









