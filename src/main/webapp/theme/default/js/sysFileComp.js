


function COMP_SysFilePicker(){
	sysFileDialog = null;
	_funName = null;
	
}

COMP_SysFilePicker.SysFilePicker=function(pickerWidth,pickerHeight,funName,appId,appCode)
{
	
	_funName=funName;
	 var _href='trmapp/common/sysFilePicker.jsp?appId='+appId+'&appCode='+appCode;
	 
	 sysFileDialog= $.dialog({ id:'sysFilePicker',lock:true,parent:this,resize: false,
		    width:pickerWidth+'px',height:pickerHeight+'px',min:false,max:false,title:"文件管理", padding:0,
		    content: 'url:'+_href+'',
		    close:function(){
		    	
		           }
		});
	
};

COMP_SysFilePicker.updateData = function(ids,names)
{
	
	 if(sysFileDialog!=null &&  !sysFileDialog.closed)
	{
		 sysFileDialog.close();
		}
	var str2=_funName+"('"+ids+"','"+names+"')";
   eval(str2);
  
}
