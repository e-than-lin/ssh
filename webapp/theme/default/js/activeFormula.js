var objLi="";
var isParAdd=1,inputId;
var inputBoxList=[];//存储新增的输入框(绑定参数的输入框)
var editInputBoxList=[]; //存储编辑过后的输入框(绑定参数的输入框)
var delInputBoxList=[];  //存储需要删除的输入框
var parOmsIds=""; //存储所有oms工程字典的ID
var isOrder=1; //1:有序添加模式 2:无序添加模式
var c_formulat={
		//获得UUID
		getUUID:function(){
			var uuid="";
			$.ajax({
				url: "for_getUUID.action",
				type:'post',
				dataType:"text",
				async:false,
				success: function(msg){
			       uuid=msg;
			      },
				error:function(){alert("程序异常,请联系管理员!")}
			});
			return $.trim(uuid);
		},
		//删除li
		delLi:function(divId){
			if(objLi!="" && objLi !="undefined"){
				if($(objLi).attr("vtype")=="6"){
					var m={};
					m.inputId=$(objLi).find("input").attr("id");
					delInputBoxList.push(m);
					inputBoxList.pop();
				}
				$(objLi).remove();
				objLi="";
			}else{
				if($("#"+divId+" li:last").attr("vtype")=="6"){
					var m={};
					m.inputId=$("#"+divId+" li:last input").attr("id");
					delInputBoxList.push(m);
					inputBoxList.pop();
				}
				$("#"+divId+" li:last").remove();
			}
		},
		//分号换行
		addTr:function(obj){
			if($(obj).val()==";"){
				$(obj).parents("li").append("<br/>");
			}else{
				if($(obj).parents("li").find("br")!="null"){
					$(obj).parents("li").find("br").remove();	
				}
			}
		},
		orderMode:function(obj){
			if(isOrder==1){
				isOrder=2;
				//除去单击事件
				$("div li input").each(function(){
					if($.trim($(this).attr("onclick"))!=""){
						$(this).attr("onclick","");
						$(this).attr("readOnly",true);
					}
				});
				$("div li select").bind("blur",function(){
					objLi=$(this).parents("li");
				})
				$("div li input").bind("blur",function(){
					objLi=$(this).parents("li");
				})
				
				$(obj).attr("value","关闭无序");
			}else{
				objLi="";
				isOrder=1;
				$("div li input").unbind("blur");
				$("div li select").unbind("blur");
				//再次绑定单击事件
				$("div li input").each(function(){
					if($(this).attr("readOnly")){
						$(this).attr("onclick",$(this).attr("vclick"));
						$(this).attr("readOnly",false);
					}
				});
				$(obj).attr("value","启动无序")
			}
		},
		//添加参数按钮
		addParameter:function(divId,listType,initiParCode){
			inputId="";
			isParAdd=1;
			COMP_OmsDictPicker.getOmsDicts('paramid','',divId,listType,'','','',initiParCode);
		},
		//编辑参数
		editParameter:function(id,listType,callbackType,parCodes){
			isParAdd=2;
			inputId=id;
			COMP_OmsDictPicker.getOmsDicts('paramid','', callbackType,listType,$("#"+id).attr("parCode"),'','',parCodes);
		},
		//添加运算符
		addOperator:function(divId){//objType 1:用于条件按钮，2：用于非条件按钮
			var uuid=this.getUUID();
			var str="<li  style='display:inline;' vtype='2'><select onchange=\"c_formulat.addTr(this)\"  id='"+uuid+"'>"+
			"<option value=\"==\">等于</option>"+
			"<option value=\"!=\">不等于</option>"+
			"<option value=\"*\">乘以</option>"+
			"<option value=\"+\">加</option>"+
			"<option value=\"-\">减</option>"+
			"<option value=\"/\">除以</option>"+
			"<option value=\"(\">(</option>"+
			"<option value=\")\">)</option>"+
			"<option value=\">\">大于</option>"+
			"<option value=\">=\">大于等于</option>"+
			"<option value=\"<\">小于</option>"+
			"<option value=\"<=\">小于等于</option>"+
			"<option value=\" 来源于 \">来源于</option>"+
			"<option value=\"向上取整\">向上取整</option>"+
			"<option value=\",\">,</option>"+
			"<option value=\"取最大值\">取最大值</option>";
			if(divId=='conditionName'){
				str+="</select></li> ";
			}else{
				str+="<option value=\";\">;</option></select></li> ";
			}
			if(objLi!="" && objLi !="undefined"){
				if($(objLi).parents("div").attr("id")==divId){
					$(objLi).after(str);
				}else{
					$("#"+divId).append(str);
				}
				objLi="";
			}else{
				$("#"+divId).append(str);
			}
			if(isOrder==2){
				$("#"+uuid).bind("blur",function(){
					objLi=$(this).parents("li");
				})
			}
		},
		//添加条件符号
		addCondition:function(divId){
			var uuid=this.getUUID();
			var str="<li style='display:inline;' vtype='4'><select  id='"+uuid+"'>"+
					"<option  value=\"true\">真</option>"+
					"<option  value=\"false\">假</option>"+
					"<option  value=\"&&\">并且</option>"+
					"<option  value=\"||\">或</option>"+
					"</select></li> ";
			if(objLi!="" && objLi !="undefined"){
				if($(objLi).parents("div").attr("id")==divId){
					$(objLi).after(str);
				}else{
					$("#"+divId).append(str);
				}
				objLi="";
			}else{
				$("#"+divId).append(str);
			}
			if(isOrder==2){
				$("#"+uuid).bind("blur",function(){
					objLi=$(this).parents("li");
				})
			}
		},
		/**
		 *添加输入框
		 * inputType 1:直接添加输入框 2:弹出输入框
		 * objType 1:用于条件按钮，2：用于非条件按钮
		 *quotationModuleId 项目ID (后台保存输入框数据用)
		 */
		addInput:function(inputType,divId,quotationModuleId){
			var uuid=this.getUUID();
			if(typeof(inputType)!="undefined" && inputType=="1"){
				var str= '<li style="display:inline;" vtype="3"><input type="text" size="15" id="'+uuid+'" value=""/></li> ';
				if(objLi!="" && objLi !="undefined"){
					if($(objLi).parents("div").attr("id")==divId){
						$(objLi).after(str);
					}else{
						$("#"+divId).append(str);
					}
					objLi="";
				}else{
					$("#"+divId).append(str);
				}
				if(isOrder==2){
					$("#"+uuid).bind("blur",function(){
						objLi=$(this).parents("li");
					})
				}
			}else{
				var url="for_pageInputBox.action?formula.quotationModule.id="+quotationModuleId+"&id="+this.getUUID()+"&isAdd=1&iscondition="+divId;
			   	$.dialog({ id:'eidtInputBox',lock:true,parent:this,resize: false,zIndex:2002,
			   	    width: "500px",height: "400px",min:false,max:false,title:"新增输入框参数",
			   	    content: 'url:'+url+''
			   	});
			}
		},
		addInputBox:function(obj,quotationModuleId){
			var str="";
			var divId=""; //中间变量
			if(obj !=null && obj !="undefined"){
				divId=obj.iscondition;
				if(obj.parCode!=null && obj.parCode !="undefined" && obj.parCode!=""){
					str='<li style="display:inline;" vtype="6"><input readonly="readonly"  type="text" size="15" id="'+obj.inputId+'" value='+obj.inputValue+' vclick="c_formulat.editInput(\''+obj.inputId+'\',\''+quotationModuleId+'\',\''+obj.iscondition+'\')" onclick="c_formulat.editInput(\''+obj.inputId+'\',\''+quotationModuleId+'\',\''+obj.iscondition+'\')" /></li> ';
					if(obj.isAdd==1){
						inputBoxList.push(obj);
						if(objLi!="" && objLi !="undefined"){
							if($(objLi).parents("div").attr("id")==divId){
								$(objLi).after(str);
							}else{
								$("#"+divId).append(str);
							}
							objLi="";
						}else{
							$("#"+divId).append(str);
						}
						if(isOrder==2){
							$("#"+obj.inputId).attr("onclick","");
							$("#"+obj.inputId).attr("readOnly",true);
							$("#"+obj.inputId).bind("blur",function(){
								objLi=$(this).parents("li");
							})
						}
					}else if(obj.isAdd==2){
						//修改编辑过后里面输入框的数据
						$("#"+divId+" li input[id="+obj.inputId+"]").attr("value",obj.inputValue);//更改输入框的值
						for(var i=0;i<inputBoxList.length;i++){
							if(inputBoxList[i].inputId==obj.inputId){
								inputBoxList[i].inputValue=obj.inputValue;
								inputBoxList[i].parCode=obj.parCode;
								inputBoxList[i].parName=obj.parName;
							}
						}
					}else if(obj.isAdd==3){
						$("#"+divId+" li input[id="+obj.inputId+"]").attr("value",obj.inputValue);//更改输入框的值
						//存储从数据库读取数据编辑过后的数据
						editInputBoxList.push(obj);
					}else if(obj.isAdd==4){
						$("#"+divId+" li input[id="+obj.inputId+"]").attr("value",obj.inputValue);//更改输入框的值
						for(var i=0;i<editInputBoxList.length;i++){
							if(editInputBoxList[i].inputId==obj.inputId){
								editInputBoxList[i].inputValue=obj.inputValue;
								editInputBoxList[i].parCode=obj.parCode;
								editInputBoxList[i].parName=obj.parName;
							}
						}
					}
				}else{
					if(obj.isAdd==3 || obj.isAdd==4){
						//delInputBoxList.push(obj);
						//$("#formulaName li input[id="+obj.inputId+"]").attr("id","");//更改输入框的ID
					}else{
						str='<li style="display:inline;" vtype="3"><input type="text" size="15" id="'+obj.inputId+'" value="'+obj.inputValue+'"/></li> ';
						if(objLi!="" && objLi !="undefined"){
							if($(objLi).parents("div").attr("id")==divId){
								$(objLi).after(str);
							}else{
								$("#"+divId).append(str);
							}
							objLi="";
						}else{
							$("#"+divId).append(str);
						}
						if(isOrder==2){
							$("#"+obj.inputId).bind("blur",function(){
								objLi=$(this).parents("li");
							})
						}
					}
				}
			}
		},
		//编辑输入框
		editInput:function (id,quotationModuleId,iscondition){
			var url="";
			var obj;
//		 	alert(inputBoxList.length+"------"+editInputBoxList.length)
			if(inputBoxList.length==0 && editInputBoxList.length==0){
				//数据保存到数据库的编辑路径 isAdd=3 把数据添加到数组里面去
				url="for_pageEditInputBox.action?formula.quotationModule.id="+quotationModuleId+"&id="+id+"&isAdd=3";
			}
			var bool=true;
			//数据没保存到数据库 的编辑路劲
			if(inputBoxList.length>0){
				for(var i=0;i<inputBoxList.length;i++){
//		 			alert(inputBoxList[i].inputId+"-----"+id);
					if(inputBoxList[i].inputId==id){
						bool=false;
						obj=inputBoxList[i];
						url="for_pageInputBox.action?formula.quotationModule.id="+quotationModuleId+"&inputId="+obj.inputId+"&versionId="+obj.versionId+"&sheetCode="+obj.codeId+"&parCode="+obj.parCode+"&parName="+obj.parName+"&inputValue="+obj.inputValue+"&isAdd=2";
					}
				}
			}
			if(editInputBoxList.length>0){
				for(var i=0;i<editInputBoxList.length;i++){
//		 			alert("编辑"+editInputBoxList[i].inputId+"-----"+id);
					if(editInputBoxList[i].inputId==id){
						bool=false;
						obj=editInputBoxList[i];
						//数据库读取的数据再次修改
						url="for_pageInputBox.action?formula.quotationModule.id="+quotationModuleId+"&inputId="+obj.inputId+"&versionId="+obj.versionId+"&sheetCode="+obj.codeId+"&parCode="+obj.parCode+"&parName="+obj.parName+"&inputValue="+obj.inputValue+"&isAdd=4";
					}
					//alert("编辑="+editInputBoxList.length);
				}
			}
			if(bool){
				url="for_pageEditInputBox.action?formula.quotationModule.id="+quotationModuleId+"&id="+id+"&isAdd=3";
			}

			url=url+"&iscondition="+iscondition;
		   	$.dialog({ id:'eidtInputBox',lock:true,parent:this,resize: false,zIndex:2002,
		   	    width: "500px",height: "300px",min:false,max:false,title:"编辑输入框参数",
		   	    content: 'url:'+url+''
		   	});
		},
		//添加决策
		addDecision:function(divId,listType,initiDecisionIds){
			isParAdd=1;
			inputId="";
			if(initiDecisionIds ==null || initiDecisionIds=="" || typeof(initiDecisionIds)=="undefined"){
				$.dialog({lock:true,resize: false,title:"提示",content: '请选择项目决策表!',max: false,min: false,drag : false,time:2});
			}else{
				COMP_DecisionPicker.chooseDeicision('decisionDialog','',divId,listType,'','',initiDecisionIds,'','');
			}
		},
		//编辑决策表
		editDecision:function (id,listType,callbackType,initDecisionIds){
			isParAdd=2;
			inputId=id;
			inputId="";
			COMP_DecisionPicker.chooseDeicision('decisionDialog','',callbackType,listType,$("#"+id).attr("decId"),'',initDecisionIds,'','');
		},
		saveAjax:function(formObjId,projectId){
			 $("#showLoading").css("display","");
			$.ajax({
				url: "for_saveFormula.action",
				type:'post',
				dataType:"json",
				data:$("#"+formObjId).serialize(),
				success: function(msg){
			       if(msg!=null && msg!=""){
			    	   objW.viewProjectInfo(projectId,msg.msg,msg.projectJs);
			    	   api.close();	    	  
			       }
			      },
				error:function(){alert("程序异常,请联系管理员!")}
			});
		}
}




