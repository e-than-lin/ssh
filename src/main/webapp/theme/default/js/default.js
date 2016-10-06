
 var keyStr = "ABCDEFGHIJKLMNOP" +
    "QRSTUVWXYZabcdef" +
    "ghijklmnopqrstuv" +
    "wxyz0123456789+/" +
    "=";

function encode64(input) {
input = escape(input);
var output = "";
var chr1, chr2, chr3 = "";
var enc1, enc2, enc3, enc4 = "";
var i = 0;

do {
chr1 = input.charCodeAt(i++);
chr2 = input.charCodeAt(i++);
chr3 = input.charCodeAt(i++);

enc1 = chr1 >> 2;
enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
enc4 = chr3 & 63;

if (isNaN(chr2)) {
enc3 = enc4 = 64;
} else if (isNaN(chr3)) {
enc4 = 64;
}

output = output + 
keyStr.charAt(enc1) + 
keyStr.charAt(enc2) + 
keyStr.charAt(enc3) + 
keyStr.charAt(enc4);
chr1 = chr2 = chr3 = "";
enc1 = enc2 = enc3 = enc4 = "";
} while (i < input.length);

return output;
}


//获取页面id的值
function getDialogValue(id)
{
	return $("#"+id).val();
}



function hasVisible(xml)
{
	
	$(xml).find("[required]").each(function()
	{
		var p=$(this.parentNode).prev()[0];
		if(p!=null)
		{
			$(p).html("<font color='red'>*</font>"+$(p).html());
		}
		
	});
	
	

	
	
	$(xml).find("[disabled]").each(function()
			{
		       
		        	if($(this).attr("visible")=="false")
		        	{
		        		$(this.parentNode).html(""); 
		        	}
		        	else
		        	{
		        		 if(this.tagName=="INPUT" || this.tagName=="input" )
		 		        {
		        			
		        			 $(this.parentNode).html($(this).val());
		 		        }
		        		 else  if(this.tagName=="IMG" || this.tagName=="img" )
		        		 {
		        			 if($(this).attr("tt.comp")=="TOffice" || $(this).attr("tt.comp")=="TAtt")
		        			 {
		        				
		        				 $(this.parentNode).find("[id='delImg']").each(function()
		        						 {
		        					          this.parentNode.removeChild(this);
		        						 });
		        				 
		        				 
		        			 }
		        			
		        			 this.parentNode.removeChild(this);
		        		 }
		        		 else  if(this.tagName=="SELECT" || this.tagName=="select" )
		        		 {
		        			 $(this.parentNode).html($(this).val());
		        		 }
		        		 else  if(this.tagName=="TEXTAREA" || this.tagName=="trxtarea" )
		        		 {
		        			 $(this.parentNode).html($(this).text());
		        		 }
		        	}
		       
		      
				
			});
	
	
}








function decode64(input) {
var output = "";
var chr1, chr2, chr3 = "";
var enc1, enc2, enc3, enc4 = "";
var i = 0;

// remove all characters that are not A-Z, a-z, 0-9, +, /, or =
var base64test = /[^A-Za-z0-9\+\/\=]/g;
if (base64test.exec(input)) {
alert("There were invalid base64 characters in the input text.\n" +
   "Valid base64 characters are A-Z, a-z, 0-9, '+', '/', and '='\n" +
   "Expect errors in decoding.");
}
input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

do {
enc1 = keyStr.indexOf(input.charAt(i++));
enc2 = keyStr.indexOf(input.charAt(i++));
enc3 = keyStr.indexOf(input.charAt(i++));
enc4 = keyStr.indexOf(input.charAt(i++));

chr1 = (enc1 << 2) | (enc2 >> 4);
chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
chr3 = ((enc3 & 3) << 6) | enc4;

output = output + String.fromCharCode(chr1);

if (enc3 != 64) {
output = output + String.fromCharCode(chr2);
}
if (enc4 != 64) {
output = output + String.fromCharCode(chr3);
}

chr1 = chr2 = chr3 = "";
enc1 = enc2 = enc3 = enc4 = "";

} while (i < input.length);

return unescape(output);
}
/*
 *checkbox  全选与全取消事件 
 *
 *obj:this
 *chListID:checkboxList的ID
 * */
function selectAllRow(obj,chListID)
	{
		var caridlist = document.getElementById(chListID);
		for(var i = 0; i < caridlist.length; i++)
		{
			caridlist[i].checked = obj.checked;
		}
	}

function __getObjs($name) {
	  return __arrayDoms(document.getElementsByName($name));
	}

/**
* all trust the given dom object it's an array type
*/
function __arrayDoms($doms) {
if ($doms==null)
  return new Array();

  if ($doms.length>0) {
    var tmp = new Array();
    for (var i=0; i<$doms.length; i++) {
      tmp.push($doms[i]);
    }
    return tmp;
  }
 

return new Array($doms);
}

function __getReal($dom, $attr, $value) {
	  while (($dom != null) && ($dom.tagName != "BODY")) {
	    if ($dom.$attr == $value) {
	      return $dom;
	    }
	    $dom =$($dom).parent()[0];
	  }
	  return null;
	}


function __go($url) {
	   
	   var s = $url.indexOf("#");
	   if (s!=-1) {
	     $url = $url.substr(0, s);
	   }
	   document.location = $url;
	}



function __filter($str) {
	  $str = $str.replace(/</g,"&lt;");
	  $str = $str.replace(/>/g,"&gt;");
	  $str = $str.replace(/\"/g,"&quot;");
	  return $str;
	}

function __validateElement($element) {
	
	  var $errorList=null;
	  var checkType = $($element).attr("tt.checktype");
	  var bRequire = $($element).attr("tt.require")=="true"?true:false;
	  var val =$($element).val();
	  var comment = $($element).attr("tt.comment");

	  // if the comment it's null,then try to find the text in the td previouse
	  if (comment==null) {
	    if ($($element).parent()[0].tagName=="TD") {
	      if ($($element).parent().prev()[0]!=null) {
	        comment = $($element).parent().prev().text();
	      }
	    }
	  }

	  // check the textarea length
	  if ($element.tagName=="TEXTAREA") {
	    var mx = $($element).attr("maxlength");
	    if (mx!=null) { // textarea都当其输入中文来处理
	     // 按实际的长度计算（laihr）
	      if (val.length>mx) {
	    	  
	        $errorList+=comment + "中的内容过长，请减少输入的内容，最大值[" + mx + "]<br>";
	      }
	    }
	  }

	  // required input check
	  if (bRequire) {
	    if (val==null || val=="" ) {
	    	$errorList+=comment + "不能为空<br>";
	    }
	  }

	  // type check date, int, double,if you found the type i do not implements
		// yet, tell me i will implement it at once

	  if (checkType=="int"||checkType=="double"||checkType=="-double") {
	    if (val==null || val=="" ) {
	       $element.value = "";
	    }
	  }

	  switch(checkType) {
	    case "int":
	      if (!__isInt(val)) {
	    	  $errorList+=comment + "请输入整数<br>";
	      }
	      var min = $($element).attr("tt.min");
	      if (min!=null && val!="" && val*1<min*1) {
	    	  $errorList+=comment + "不允许小于" + min+"<br>";
	      }
	      var max =$($element).attr("tt.max");
	      if (max!=null && val!="" && val*1>max*1) {
	    	  $errorList+=comment + "不允许大于" + max+"<br>";
	      }
	      break;
	    case "double":
	      if (!__isDouble(val)) {
	    	  $errorList+=comment + "请输入整数或小数<br>";
	      }else {
	        /** 检查小数点后的限制 */
	        var l =$($element).attr("tt.acc"); // 提供数字
	        if (l!=null) {
	          var dIdx = val.indexOf(".");
	          if (dIdx!=-1) {
	            var t = val.substr(dIdx+1);
	            if (t.length>l) {
	            	$errorList+=comment + "格式不正格，限制小数点数长度为：" + l+"<br>";
	            }
	          }
	        }
	        var max =$($element).attr("tt.max");
	        if (max!=null && val!="" && val*1>max*1) {
	          $errorList.add(new Error(comment + "不允许大于" + max, $element));
	        }
	        var min = $element.getAttribute("tt.min");
	        if (min!=null && !__isEmpty(val) && val*1<min*1) {
	        	$errorList+=comment + "不允许小于" + min+"<br>";
	        }
	        var reg = $($element).attr("tt.reg");
	        if (reg!=null && val!="") { // 如8,2 6,2之类的
	            rs = reg.split(",");
	            var a = rs[0]*1-rs[1]*1;
	            reg = eval("/^\\d{1," + a + "}$|^\\d{1," + a + "}\\.\\d{1," + rs[1] + "}$/");
	            if (!reg.test(val)) {
	              if (val.indexOf(".")==-1) {
	            	  $errorList+=comment + "不符合规则，只允许" + a + "位整数<br>";
	              }else {
	            	  $errorList+=comment + "不符合规则，只允许" + rs[1] + "位小数<br>";
	              }
	            }
	        }
	      }

	      break;
	    case "-double":
	      if (!__isDouble(val)) {
	    	  $errorList+=comment + "请输入浮点类型<br>";
	      }
	      break;
	    case "datetime":
	      var max = $($element).attr("tt.max");
	      if (max!=null && val!="") {
	        var m = max.split("|");
	        var dTime = new Date();
	        dTime.setTime(m[0]);
	        var vTime = __parseDateAuto(val);
	        if (__compareTimeD(vTime, dTime, ">")) {
	        	$errorList+=comment + "不允许大于" + m[1]+"<br>";
	        }
	      }
	      break;
	    case "IDCard":
	      if(val!="") {
	         if (!__isIDCard(val)) {
	        	 $errorList+=comment + "只能由数字组成（18位的可以有字母x）<br>";
	         }
	      }
	      break;
	     case "mobile":
	      break;
	     case "phone":
	      if (val!="") {
	         
	         if (__istell(val)) {
	        	 $errorList+=comment + "中带有不正确的符号只允许\"(\",\"-\",\")\"与数字<br>";
	         }
	      }
	      break;
	     // 注意只要使用性比较多的才加在通用检查当中，较少使用的不要单独写就行了，Juice是每个jsp都引入的，这个文件小就小一点
	  }
	  
	  return $errorList;
	}


function __isInt(str) 
{ 
var result=str.match(/^(-|\+)?\d+$/); 
if(result==null) return false; 
return true; 
} 


function __isDouble(str) 
{ 
return !isNaN(str); 
} 


function __istell(str) 
{ 
var result=str.match(/\d{3}-\d{8}|\d{4}-\d{7}/); 
if(result==null) return false; 
return true; 
} 




function __isIDCard(str) 
{ 
var result=str.match(/\d{15}|\d{18}/); 
if(result==null) return false; 
return true; 
} 



/**
* 2个Date类型的时间进行比较
*/
function __compareTimeD(dTime1,dTime2,sOption) {
  if (dTime1==null || dTime2==null) {
      return false;
  }    
  if(sOption==">") {
      return (dTime1>dTime2);
  }else if(sOption=="<") {
      return (dTime1<dTime2);
  }else if(sOption=="=") {
      return (dTime1==dTime2);
  }else if(sOption==">=") {
      return (dTime1>=dTime2);
  }else if(sOption=="<=") {
      return (dTime1<=dTime2);
  }else{
     
      return false;
  }
}


function __isEmpty($str) {
	  return __trim($str).length==0;
	}


function __trim($text) {
	  if ($text==null)
	    return "";
	  return $text.replace(_regLtrim, "").replace(_regRtrim, "");
	};
	
	
function __parseDateAuto($dateStr) {
	if ($dateStr=="") {
	      return null;
	  }
	var regDateS =null;
	 var idx = $dateStr.indexOf(":");    // 长日期
	   if(idx==-1){
		   regDateS = /(\d*)年(\d*)月(\d*)日/;
	    }else{
	    	regDate = /(\d*)年(\d*)月(\d*)日\s(\d*)\:(\d*)/;
	    }
	   
	   var t = $dateStr.match(regDate);
	   var date = new Date();
	   
	   date.setYear(t[1]);
	   date.setMonth(t[2]*1-1);
	   date.setDate(t[3]);
	   date.setHours(t[4]);
	   date.setMinutes(t[5]);
	   return date;
	   
	   
	}





function over(obj)
{

	$(obj).attr("class","td_over");

	}

function out(obj)
{

	$(obj).attr("class",$(obj).attr("othClass"));
	}




//页面初始化读方法，ID为要初始为读的区域ID
function initPageToRead(id)
{
	
	$("#"+id+"").find("span[name='editspan']").css("display","none");
	
	$("#"+id+"").find("input[type='text']").each(function(){
		
		if($(this).css("display")!="none"){
			$(this).before("<label name=\"read\" id=\"lab"+$(this).attr("id")+"\" oldid=\""+$(this).attr("id")+"\" >"+$(this).val()+"</label>");
			$(this).css("display","none");
			$(this).attr("oldValue",$(this).val());
		}
	});
	
	$("#"+id+"").find("textarea").each(function(){
		if($(this).css("display")!="none"){
			var oldtextareaText=this.innerHTML;
			var textareaText=oldtextareaText;
			
			if(textareaText.length>30){//add by weixh 
				var length = textareaText.length;
				var str = "";
				var index=0;
				var time = Math.ceil(length/30);
				for(var i=0;i<time;i++){
					if((index+30)<length){
						str+=textareaText.substring(index,index+30)+"<br/>"; 
					}else{
						str+=textareaText.substring(index,length); 	
					}
					index+=30;
				}
				textareaText = str;
			}
			
			$(this).before("<label name=\"read\" id=\"lab"+$(this).attr("id")+"\" oldid=\""+$(this).attr("id")+"\" style=\"width:100px\" >"+textareaText+"</label>");
			$(this).css("display","none");
			$(this).attr("oldValue",oldtextareaText);
		}
	});
	
	$("#"+id+"").find("select[id!='notuse']").each(function(){
			if($(this).css("display")!="none"){
				   
				    var selectv=$(this).val();
					$(this).before("<label name=\"selectLab\" id=\"lab"+$(this).attr("id")+"\" oldid=\""+$(this).attr("id")+"\"  oldValue='"+selectv+"' selectname='"+$(this).attr("name")+"' oldtext='"+$(this).find("option:selected").text()+"' >"+$(this).find("option:selected").text()+"</label>");
					$(this).css("display","none");
			
			}
		});
	
	$("#"+id+"").find("select[class*=easyui-combobox]").each(function(){
		
		//$(this).combobox('hidePanel');

      });
	
	

	$("#"+id+"").find("input[type='checkbox']").attr("disabled","disabled");
	$("#"+id+"").find("input[type='checkbox']").each(function(){
		
		
		if($(this).attr("checked")!="checked")
		{
			
			$(this).attr("oldchecked","false");
		 }
		else
		{
			$(this).attr("oldchecked","true");
			}
		
	});

	var radioName="";
	$("#"+id+"").find("input[type='radio']").each(function(){
		  var radioCss=false;
          var thisName=$(this).attr("name");
          if($(this).attr("class")!=null)
          {
        	  thisName=$(this).attr("class");
        	  radioCss=true;
          }
          $(this).css("display","none");
         
          $(this).parent("td,div").find("label[name!='radioLab'][name!='read']").css("display","none");

		if(radioName.indexOf(thisName+",")<0)
		{   
			var  radioobj=null;
			if(radioCss)
			{
				radioobj=$("input[class='"+thisName+"']:checked");
				   //添加oldclass='"+thisName+"' add by wxh
				$(this).before("<label name=\"radioLab\" id=\"lab"+$(this).attr("id")+"\"  oldid=\""+$(this).attr("id")+"\"   oldValue='"+radioobj.val()+"' oldclass='"+thisName+"'   radioname='"+$(this).attr("name")+"'  >"+$("input[class='"+thisName+"']:checked + label").text()+" </label>");
				radioName+=thisName+",";
			}
			else
			{
				radioobj=$("input[name='"+thisName+"']:checked");  
				$(this).before("<label name=\"radioLab\"  oldValue='"+radioobj.val()+"' id=\"lab"+$(this).attr("id")+"\"  oldid=\""+$(this).attr("id")+"\"   radioname='"+$(this).attr("name")+"'  >"+$("input[name='"+thisName+"']:checked + label").text()+" </label>");
				radioName+=thisName+",";
			}
		}
		
	});

	$("#"+id+"").find("tbody[id='fileaddSpan']").css("display","none");
	
	
	$("#"+id+"").css("display","");
	 $("#orderInfocheckbox").css("display","");

}


//转为可编辑，ID为要转为可编辑的区域ID
function pageToEdit(id)
{
	

	$("#"+id+"").find("input[type='text'],textarea").css("display","");
	$("#"+id+"").find("select[label!='readonly']").not("[class*=easyui-combobox]").css("display","");
	$("#"+id+"").find("label[name='read']").css("display","none");
	$("#"+id+"").find("label[name='selectLab']").css("display","none");
	$("#"+id+"").find("label[name='radioLab']").css("display","none");
	$("#"+id+"").find("span[name='editspan']").css("display","");
	$("#"+id+"").find("input[type='checkbox']").removeAttr("disabled");
	$("#"+id+"").find("tbody[id='fileaddSpan']").css("display","");
	$("#"+id+"").find("input[type='radio']").each(function(){
          $(this).css("display","");
          
          $(this).parents("td").find("label[class='label_tip']").css("display","");
          if($(this).attr("class")!=null)
          {
        	  $("input[class='"+$(this).attr("class")+"']+ label").css("display","");
          }
          else
          {
        	  $("input[name='"+$(this).attr("name")+"']+ label").css("display","");
        	 
          }
          

	});

	$("#"+id+"").find("input[type='checkbox']").each(function(){
		
		
		$(this).css("display","");
		
		$(this).parents("td").find("input[type='checkbox']:[id='"+$(this).attr("id")+"']+ span").css("display","");
		
		
	});

}

//转为只读，ID为要转为只读的区域ID
function pageToRead(id)
{
	$("#"+id+"").find("input[type='text'],textarea").css("display","none");
	$("#"+id+"").find("select[label!='readonly']").css("display","none");
	$("#"+id+"").find("span[name='editspan']").css("display","none");
	$("#"+id+"").find("label[name='read']").css("display","");
	$("#"+id+"").find("label[name='selectLab']").css("display","");
	$("#"+id+"").find("label[name='radioLab']").css("display","");
	$("#"+id+"").find("tbody[name='addData']").html("");
	$("#"+id+"").find("tr[opt='del']").css("display","");
	$("#"+id+"").find("tr[opt='del']").attr("opt","");
	$("#"+id+"").find("input[type='checkbox']").attr("disabled","disabled");
	$("#"+id+"").find("tbody[id='fileaddSpan']").css("display","none");
	$("#delDeliveryDataId").val("");

	
	$("#"+id+"").find("tbody[id='fileaddSpan']").find("input[type='file']").each(function(){
		$(this).after("<input type='file' name='"+$(this).attr("name")+"'/>"); 
		$(this).remove(); 
	});
	
	$("#"+id+"").find("input[type='checkbox']").each(function(){
		
		 
		if($(this).attr("oldchecked")=="true")
		{
			$(this).attr("checked",true);
			
			
			}
		else
		{
			$(this).attr("checked",false);
			
			}
		
	});
	
	
	
	
	$("#"+id+"").find("input[type='text'],textarea").each(function(){
		 $(this).val($(this).attr("oldValue"));
		 if( $(this).attr("onchange")!="")
		 {
			 $(this).change();
			 }
	});

	


	$("#"+id+"").find("label[name='selectLab']").each(function(){
			 var selectobj=document.getElementsByName($(this).attr("selectname")); 
	          $(selectobj).val($(this).attr("oldValue"));
	          //alert(this[0].getAttributeNode("onchange").nodeValue);
	          if( $(this).attr("onchange")!="")
	 		 {
	 			 $(this).change();
	 			 }
		});

	
	
	$("#"+id+"").find("label[name='radioLab']").each(function(){

		 if($(this).attr("class")!=null)
		 {
			 $("input[class='"+$(this).attr("class")+"']:[value='"+$(this).attr("oldValue")+"']").attr("checked","true");
			 $("input[class='"+$(this).attr("class")+"']").css("display","none");
		 }
		 else
		 {
			 $("input[name='"+$(this).attr("radioname")+"']:[value='"+$(this).attr("oldValue")+"']").attr("checked","true");
			 $("input[name='"+$(this).attr("radioname")+"']").css("display","none");
		 }
		 $("input[name='"+$(this).attr("radioname")+"']:[value='"+$(this).attr("oldValue")+"']").attr("checked","true");
		 $("input[name='"+$(this).attr("radioname")+"']").css("display","none");
		 $(this).parent("td").find("label[name!='radioLab']").css("display","none");
	});


}


function commomDownFile(filePath,fileName)
{
	
	var form=$("<form>");//定义一个form表单
	form.attr("style","display:none");
	form.attr("target","");
	form.attr("method","post");
	form.attr("action","sysFile_downFile.action");
	var input1=$("<input>");
	input1.attr("type","hidden");
	input1.attr("name","fileUrl");
	input1.attr("value",filePath);
	var input2=$("<input>");
	input2.attr("type","hidden");
	input2.attr("name","sysFileNames");
	input2.attr("value",fileName);
	$("body").append(form);//将表单放置在web中
	form.append(input1);
	form.append(input2);
	form.submit();

}

/**
 * 检测input框的输入字符是否超出范围
 */
function testInputLen(obj,size){
	var val = $(obj).val();
	var len = val.replace(/[^\x00-\xff]/g, '***').length;
	if(len>size){
		alert("输入长度超出范围");
		$(obj).val((cutStr(val,size))); 
	}

}

/**
 * 截取指定字符的字符串
 */
function cutStr(str,L){  
    var result = '',
        strlen = str.length, // 字符串长度
        chrlen = str.replace(/[^\x00-\xff]/g,'***').length; // 字节长度
    if(chrlen<=L){return str;}
    
    for(var i=0,j=0;i<strlen;i++){
        var chr = str.charAt(i);
        if(/[\x00-\xff]/.test(chr)){
            j++; // ascii码为0-255，一个字符就是一个字节的长度
        }else{
            j+=3; // ascii码为0-255以外，一个字符就是两个字节的长度
        }
        if(j<=L){ // 当加上当前字符以后，如果总字节长度小于等于L，则将当前字符真实的+在result后
            result += chr;
        }else{ // 反之则说明result已经是不拆分字符的情况下最接近L的值了，直接返回
            return result;
        }
    }
}


function isFloat(obj){
	var reg = /^\d+(\.\d+)?$/;
	
	if(obj.value!=''&&!reg.test(obj.value)){
		obj.value= '0.0';
		obj.focus();
		alert("非法输入!");
	}
} 
//PositiveOrNegative
function isPosOrNegFloat(obj){
	var reg = /^(-?\d+)(\.\d+)?/;
	if(obj.value!=''&&!reg.test(obj.value)){
		obj.value= '0.0';
		obj.focus();
		alert("非法输入!");
	}
} 




