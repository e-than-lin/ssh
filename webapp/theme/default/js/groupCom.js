
function initGroupCom2(tagId,type,initIds,allIds,retrnType){
	__open("sysOrginfo_groupCom.action","noclose=true;height="+200+";width="+300+";top=" + 50 +";left=" + 100, null);
}


/*
 * 调用角色控件函数
 * 
 * tagId 为鼠标所点击的标签的id
 * type 为类型，single：单选，double：多选
 * initIds 为初始化时被选中的群组的id: 以字符串形式，用逗号分隔，空时为""
 * allIds 只显示id在allIds里的群组: 以字符串形式，用逗号分隔，空时为""，allIds为空时显示所有
 * obj 回填的对象
 */
var selectGroupComId = "";   //记录被点击的控件的id

function initGroupCom(tagId,type,initIds,allIds,retrnType){
	
	if($("#role_overlay").html() == null || $("#role_overlay").html() == undefined || $("#role_overlay").html() == ""){
		selectGroupComId = tagId;
		initLoadGroupCom(tagId,type,initIds,allIds,retrnType);
	}else{
		if(selectGroupComId != tagId){
			selectGroupComId = tagId;
			$("#role_overlay").remove();
			initLoadGroupCom(tagId,type,initIds,allIds,retrnType);
		}
		var lefthValue =  $("#"+tagId).offset().left + "px";
		var topValue = $("#"+tagId).offset().top + 25 + "px";	
		$('#JT').css({left: lefthValue, top: topValue});
		$('#JT').show();
		$("#role_overlay").show();
	}
}
/*
 * 加载群组控件函数
 * 
 * tagId 为鼠标所点击的标签的id
 * type 为类型，single：单选，double：多选
 * initIds 为初始化时被选中的群组的id: 以字符串形式，用逗号分隔，空时为""
 * allIds 只显示id在allIds里的群组: 以字符串形式，用逗号分隔，空时为""，allIds为空时显示所有
 */
function initLoadGroupCom(tagId,type,initIds,allIds,retrnType){
	$("body").append("<div id='role_overlay'><div id='JT'><div id='JT_arrow_left'></div><div id='JT_close_left'><img src='theme/default/img/clear.gif' id='clear' />&nbsp;<img id='close' src='theme/default/img/close.gif' />&nbsp;</div><div id='JT_copy'><div class='JT_loader'><div></div></div></div>");//right sid	
	  
	var lefthValue =  $("#"+tagId).offset().left + "px";
	var topValue = $("#"+tagId).offset().top + 25 + "px";	
	$('#JT').css({left: lefthValue, top: topValue});
	$('#JT').show();
	
	//加载群组
	$.ajax( {
		type : "post",
		url : "sysOrginfo_groupCom.action",
		success : function(data) {
		
		    $('#JT_copy').html(data);
		    
		    if(type == "single") //单选时的处理
		    {
				$('#JT_copy').find("input[type=radio]").each(function(inputIndex){
					  //初始化被选中的群组
					  if(initIds != "" && initIds!=undefined && initIds!=null){
						  var initIdsStr = initIds.split(",");
						  for(var idsIdx=0;idsIdx<initIdsStr.length;idsIdx++){
							  if($(this).attr("id") == initIdsStr[idsIdx])$(this).attr("checked", true);
						  }
					  }
					  
					  $(this).click(function(){
						  var ids = [];
			    		  var values = [];
			    		  ids.push($(this).attr("id"));
			    		  values.push($(this).val());
			    		  if( retrnType!=undefined && retrnType!=null && retrnType!='' &&retrnType==true )
			    		  {
			    			  groupCallback(ids,values);
			    		  }
			    		  else
			    		  {
			    			  callbackObj(tagId,ids,values);
			    			  
			    		  }
						 
					  });
					//过渡不需要的群组
					  if(allIds != "" && allIds!=undefined && allIds!=null){
						  var allIdsStr = allIds.split(",");
						  var has = false;
						  for(var idsIdx=0;idsIdx<allIdsStr.length;idsIdx++){
							  if($(this).attr("id") == allIdsStr[idsIdx]){
								  has = true;
								  break;
							  }
						  }
						  if(!has) $(this).parent().remove();
					  }
				});
		    }
		    else   //多选时的处理
		    {
		    	$('#JT_copy').find("input[type=radio]").each(function(inputIndex){
		    		  var id = $(this).attr("id");
		    		  var value = $(this).val();
					  $(this).replaceWith("<input type='checkbox' id='" + id + "' value='" + value + "'/>");
				});
		    	//初始化被选中的群组
		    	$('#JT_copy').find("input[type=checkbox]").each(function(inputIndex){
		    		if(initIds != "" && initIds!=undefined && initIds!=null){
						  var initIdsStr = initIds.split(",");
						  for(var idsIdx=0;idsIdx<initIdsStr.length;idsIdx++){
							  if($(this).attr("id") == initIdsStr[idsIdx])$(this).attr("checked", true);
						  }
					  }
		    		$(this).click(function(){
		    			var ids = [];
		    			var values = [];
		    			$('#JT_copy').find("input:checked").each(function(inputCheckIndex){
		    				 ids.push($(this).attr("id"));
		    				 values.push($(this).val());
		    			});
		    			if( retrnType!=undefined && retrnType!=null && retrnType!='' && retrnType==true )
			    		  {
		    				groupCallback(ids,values);
			    		  }
			    		  else
			    		  {
			    			  callbackObj(tagId,ids,values);
			    			 
			    		  }
		    		});
		    		//过渡不需要的群组
		    		if(allIds != "" && allIds!=undefined && allIds!=null){
						  var allIdsStr = allIds.split(",");
						  var has = false;
						  for(var idsIdx=0;idsIdx<allIdsStr.length;idsIdx++){
							  if($(this).attr("id") == allIdsStr[idsIdx]){
								  has = true;
								  break;
							  }
						  }
						  if(!has) $(this).parent().remove();
					  }
		    	});
		    }
		} 
	});
	
	$("#role_overlay").find("img[id=clear]").click(function(){
		$('#JT_copy').find("input:checked").attr("checked", false);
		if( retrnType!=undefined && retrnType!=null && retrnType!='' &&retrnType==true )
		  {
			groupCallback(ids,values);
		  }
		  else
		  {
			  
			  callbackObj(tagId,"","");
		  }
		
	});
	
    //移除控件处理
	$("#role_overlay").find("img[id=close]").click(function(){
		$("#role_overlay").hide();
	});
}

/*
 * 群组成控件的回调函数
 * 
 * ids 为 群组的ids数组，以字符串形式，用逗号分隔，空时为""
 * names 为群组的名称数组，以字符串形式，用逗号分隔，空时为""
 * 
 * 其中ids 与 names的关系是一一对应的*/

function callbackObj(tagId,ids,names){
	
	$("#"+tagId+"").val(ids);
	document.getElementById(tagId).innerText=names;
	
}