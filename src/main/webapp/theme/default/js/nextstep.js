
var userids=null;
var assigneeid=null;

//取人员选择范围
function aj(pid, nodeName, nodeId, transitionName,assigneeId) {
	assigneeid=assigneeId;
	
	
	
	try {
		//window.parent.document.getElementById("wfNodeId").value = nodeId; //不能覆盖原来的wfNodeId值，因为其他很多地方都要用到该变量
		window.parent.document.getElementById("transitionName").value = transitionName;
		var scopediv = document.getElementById('scope').children;
		for ( var i = 0; i < scopediv.length; i++) {
			scopediv[i].style.display = 'none';
		}
		var cuserdiv = document.getElementById('cuser').children;
		for ( var i = 0; i < cuserdiv.length; i++) {
			cuserdiv[i].style.display = 'none';
		}
		if (document.getElementById(nodeName) != null) {
			document.getElementById(nodeName).style.display = 'block';
		} else {

			$("#scope")
					.append(
							' <div  id="' + nodeName + '" style="display:block"> </div>');
			getDept(pid, nodeName);
			getGroup(pid, nodeName);
			getRole(pid, nodeName);
			getPost(pid, nodeName);
			getUser(pid, nodeName);
			getScope(pid, nodeName);
		}

		// 流程运行图frame对象
		var _array = document.getElementsByName('checkIds');
		// 当'流向选择'多于 1个时,选中流向之后,重新加载流程动画
		if (_array != null && _array.length > 1) {
			var runChartObj = document.getElementById('runChartFrame');
			var _path = runChartObj.src; 
			if (_path != null && _path.length > 0 
					&& nodeName != null && nodeName.length > 0) {
				if (_path.lastIndexOf('&aimstep=') > 0) {
					_path = _path.substring(0, _path.lastIndexOf('&aimstep='));
				}
				runChartObj.src = _path + "&aimstep=" + nodeName;
			}
		}
		// alert(runChartObj.src);
	} catch (e) {
	}
}


//取结点部门
function getDept(pid,nodeName)
{
	
	$.ajax({
		url:'nextStep_getDept.action',
		type:'post',
		data:'processDefinitionId='+pid+'&nodeName='+nodeName,
		dataType:'json',
		success:function(transport){
		
		if(transport.object!=null)
		{
		    var str='<script type="text/javascript">  var d = new dTree("d","<%=request.getContextPath()%>/theme/default/img/orgtree/");d.add("1",-1,"部门");';
			for(var i=0;i<transport.object.length;i++)
			{
				//str=str+' d.add('+transport.object[i].id+',-1,"'+transport.object[i].name+'","javascript:getGroupUser('+transport.object[i].id+')");';
				$("#"+nodeName+"").append(' <div><input type="radio" id="rtt'+transport.object[i].id+'" name="ddd" class="mouse_hand" onclick="getGroupUser('+transport.object[i].id+')" /><label for="rtt'+transport.object[i].id+'">(部门)'+transport.object[i].name+'</label></div>');
			}
			//str=str+'<\/script>';
			//$("#"+nodeName+"").append(' <div>jjj'+str+'</div>');
		}
     }
		
	});
	}

//取结点群组
function getGroup(pid,nodeName)
{
	$.ajax({
		url:'nextStep_getGroup.action',
		type:'post',
		data:'processDefinitionId='+pid+'&nodeName='+nodeName,
		dataType:'json',
		success:function(transport){
		if(transport.object!=null)
		{
			
			
			for(var i=0;i<transport.object.length;i++)
			{
				
				$("#"+nodeName+"").append('<div><input type="radio" id="rtg'+transport.object[i].id+'" name="ddd" class="mouse_hand" onclick="getGroupUser('+transport.object[i].id+')"/><label for="rtg'+transport.object[i].id+'">(群组)'+transport.object[i].gname+'</label></div>');

				}
			
			}
			}
		
	});
	}

//取结点角色
function getRole(pid,nodeName)
{
	$.ajax({
		url:'nextStep_getRole.action',
		type:'post',
		data:'processDefinitionId='+pid+'&nodeName='+nodeName,
		dataType:'json',
		success:function(transport){
		if(transport.object!=null)
		{
			
			
		for(var i=0;i<transport.object.length;i++)
		{
			
			$("#"+nodeName+"").append('<div><input type="radio" id="rtr'+transport.object[i].id+'" name="ddd" class="mouse_hand" onclick="getGroupUser('+transport.object[i].id+')"/><label for="rtr'+transport.object[i].id+'">(角色)'+transport.object[i].name+'</label></div>');
			}
		}
			}
		
	});
}

//取结点岗位
function getPost(pid,nodeName)
{
	$.ajax({
		url:'nextStep_getPost.action',
		type:'post',
		data:'processDefinitionId='+pid+'&nodeName='+nodeName,
		dataType:'json',
		success:function(transport){
		if(transport.object!=null)
		{
		
			for(var i=0;i<transport.object.length;i++)
			{
				
				$("#"+nodeName+"").append('<div><input type="radio" id="rtp'+transport.object[i].id+'" name="ddd" class="mouse_hand" onclick="getGroupUser('+transport.object[i].id+')"/><label for="rtp'+transport.object[i].id+'">(岗位)'+transport.object[i].gradeName+'</label></div>');
				}
			}
			}
		
	});
}

//取结点用户
function getUser(pid,nodeName)
{
	$.ajax({
		url:'nextStep_getUser.action',
		type:'post',
		data:'processDefinitionId='+pid+'&nodeName='+nodeName,
		dataType:'json',
		success:function(transport){
	
		if(transport.object!=null)
		{
                 var vnodeName=nodeName+"fff";
				$("#"+nodeName+"").append('<div><input type="radio" id="rtu'+nodeName+'" name="ddd" class="mouse_hand" onclick="getUserByUserId(\''+vnodeName+'\',\''+transport.object+'\')"/><label for="rtu'+transport.object+'">用户</label></div>');
		  }
		}
		
	});
}

//取结点上下级
function getScope(pid,nodeName)
{
	$.ajax({
		url:'nextStep_getScope.action',
		type:'post',
		data:'processDefinitionId='+pid+'&nodeName='+nodeName,
		dataType:'json',
		success:function(transport){
		if(transport.object!=null)
		{
			var str=transport.object;
			var sArray=str.split(",");
			for(var i=0;i<sArray.length;i++)
			{
               if(sArray[i]=="1")
               {
            	   $("#"+nodeName+"").append('<div><input type="radio" id="rts'+sArray[i]+'" name="ddd" class="mouse_hand" onclick="getScopeUser(\''+sArray[i]+'\')"/><label for="rts'+sArray[i]+'">当前部门</label></div>');
                   }
               if(sArray[i]=="2")
               {
            	   $("#"+nodeName+"").append('<div><input type="radio" id="rts'+sArray[i]+'" name="ddd" class="mouse_hand" onclick="getScopeUser(\''+sArray[i]+'\')"/><label for="rts'+sArray[i]+'">平级部门</label></div>');
                   }
               if(sArray[i]=="3")
               {
            	   $("#"+nodeName+"").append('<div><input type="radio" id="rts'+sArray[i]+'" name="ddd" class="mouse_hand" onclick="getScopeUser(\''+sArray[i]+'\')"/><label for="rts'+sArray[i]+'">直接下级</label></div>');
                   }
               if(sArray[i]=="4")
               {
            	   $("#"+nodeName+"").append('<div><input type="radio" id="rts'+sArray[i]+'" name="ddd" class="mouse_hand" onclick="getScopeUser(\''+sArray[i]+'\')"/><label for="rts'+sArray[i]+'">所有下级</label></div>');
                   }
               if(sArray[i]=="5")
               {
            	   $("#"+nodeName+"").append('<div><input type="radio"  id="rts'+sArray[i]+'" name="ddd" class="mouse_hand" onclick="getScopeUser(\''+sArray[i]+'\')"/><label for="rts'+sArray[i]+'">直接上级</label></div>');
                   }
               if(sArray[i]=="6")
               {
            	   $("#"+nodeName+"").append('<div><input type="radio"  id="rts'+sArray[i]+'"  name="ddd" class="mouse_hand" onclick="getScopeUser(\''+sArray[i]+'\')"/><label for="rts'+sArray[i]+'">所有上级</label></div>');
                   
                   }
				}
			
		}
		}
	});
}


//取结点上下级用户用户
function getScopeUser(id)
{

	var scopediv=document.getElementById('cuser').children;
	for(var i=0;i<scopediv.length;i++){ 
		scopediv[i].style.display='none';	
	}
	if(document.getElementById(id)!=null)
	{
		document.getElementById(id).style.display='block';
		}
	else		
	{
		
		$("#cuser").append(' <div  id="'+id+'" style="display:block"> </div>');
		$.ajax({
			url:'nextStep_getScopeUser.action',
			type:'post',
			data:'id='+id+'&assigneeId='+assigneeid,
			dataType:'json',
			success:function(transport){
			if(transport.object!=null)
			{
				
				if(transport.object!=null)
				{

					for(var i=0;i<transport.object.length;i++)
					{
						$("#"+id+"").append('<div id="d'+transport.object[i].id+'"><input   id="c'+transport.object[i].id+'" type="checkbox" name="chbuser" class="mouse_hand" onclick="setUser(\''+transport.object[i].id+'\',\''+transport.object[i].nickName+'\',this)" /><label for="c'+transport.object[i].id+'">'+transport.object[i].nickName+'</label></div>');
					}
				  }
			}
			
			}
		});
		
		}
	
}


//根据结点用户IDS取用户
function getUserByUserId(uid,id)
{
  
	var scopediv=document.getElementById('cuser').children;
	for(var i=0;i<scopediv.length;i++){ 
		scopediv[i].style.display='none';	
	}
	if(document.getElementById(uid)!=null)
	{
		document.getElementById(uid).style.display='block';
	}
	else
	{
		
		$("#cuser").append('<div id="'+uid+'" style="display:block"></div>');
		$.ajax({
			url:'nextStep_getUserByid.action',
			type:'post',
			data:'id='+id,
			dataType:'json',
			success:function(transport){
			if(transport.object!=null)
			{
				
					for(var i=0;i<transport.object.length;i++)
					{
						
						$("#"+uid+"").append('<div id="d'+transport.object[i].id+'"><input   id="c'+transport.object[i].id+'" type="checkbox" name="chbuser" class="mouse_hand" onclick="setUser(\''+transport.object[i].id+'\',\''+transport.object[i].nickName+'\',this)" /><label for="c'+transport.object[i].id+'">'+transport.object[i].nickName+'</label></div>');
					}
				  
			}
			
			}
		});
		
	}
		
		
		
	
}


//取群组用户用户
function getGroupUser(id)
{
	
	var scopediv=document.getElementById('cuser').children;
	for(var i=0;i<scopediv.length;i++){ 
		scopediv[i].style.display='none';	
	}
	if(document.getElementById(id)!=null)
	{
		document.getElementById(id).style.display='block';
		}
	else
	{
		getGUser(id);
		}

	}



//根据群组ID取用户
function getGUser(id)
{

	var scopediv=document.getElementById('cuser').children;
	for(var i=0;i<scopediv.length;i++){ 
		scopediv[i].style.display='none';	
	}
	if(document.getElementById(id)!=null)
	{
		document.getElementById(id).style.display='block';
		}
	else
	{
	$("#cuser").append(' <div id="'+id+'" > </div>');
	$.ajax({
		url:'nextStep_getGroupUser.action',
		type:'post',
		data:'id='+id,
		dataType:'json',
		success:function(transport){
		if(transport.object!=null)
		{
			if(transport.object!=null)
			{

				for(var i=0;i<transport.object.length;i++)
				{
					$("#"+id+"").append('<div id="d'+transport.object[i].id+'"><input   id="c'+transport.object[i].id+'" type="checkbox" name="chbuser" class="mouse_hand" onclick="setUser(\''+transport.object[i].id+'\',\''+transport.object[i].nickName+'\',this)" /><label for="c'+transport.object[i].id+'">'+transport.object[i].nickName+'</label></div>');
				}
			  }
		}
		
		}
	});
	}
}




function delUser(id)
{
	var userdiv=document.getElementById("df"+id);
	document.getElementById("c"+id).checked=false;
	var chuser=document.getElementsByName("chbuser");
	for(var i=0;i<chuser.length;i++){
          if(chuser[i].id==("c"+id))
          {
        	  chuser[i].checked=false;
        	  
              }
		}

	document.getElementById("fuser").removeChild(userdiv);
	delUserID(id);
	
}
//删除用户
function delUserID(id)
{
	
	if(userids!=null)
	{
		var uArray=userids.split(",");
		var ustr=null;
		for(var i=0;i<uArray.length;i++)
		{
			if(id!=uArray[i])
			{
	             if(ustr==null)
	             {
	            	 ustr=uArray[i];
	                 }
	             else
	             {
	            	 ustr=ustr+","+uArray[i];
	                 }
				}
			
			}
		userids=ustr;
		
		window.parent.document.getElementById("assignee").value=userids;
		
		
		
		}
	
}

