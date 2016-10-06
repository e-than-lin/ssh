/**
 * @author WEIXH
 * @description 参数适用系统选择
 */
function COMP_SystemPicker(){
	
	_dialogId	= null;
	_obj 		= null;
	_callback	= null;
	_type 		= null;
	_initIds 	= null;
	_initNames 	= null;
	_showIds 	= null;
	_href 		= null;
	
}

//$dialogId 控件ID 不能为空
//$obj: 传入要回写参数的对象。
//$callback: 如果需要使用单独的回调函数，传入对象的id值，并且在调用该js的页面中加上一个名称为defindCallBack的回调函数。
//$type: 表示选择框类型，single表示单选，double表示复选，如果不传入则默认复选。
//$initIds: 初始化选中的id序列。
//$initNames：初始化id序列对应的名称序列，都是用逗号隔开。
//$showIds：为要显示的id序列(只显示给出的id序列，用于过滤一些不必要显示的信息，如果为空则显示全部)。
COMP_SystemPicker.getSystems = function ($dialogId,$obj,$callback,$type,$initIds,$initNames,$showIds){
	
	var left = (document.body.clientWidth)/2-124;
	
	_dialogId	= $dialogId;
	_obj 		= $obj;
	_callback 	= $callback;
	_type 		= $type;
	_initIds 	= $initIds;
	_initNames 	= $initNames;
	_showIds 	= $showIds;
	_href= "par_pickerManger.action?p_dialogId="+_dialogId+"&p_type="+$type;	
	
	$.dialog({ 
		id:''+_dialogId+'',
		lock:true,
		parent:this,
		resize: false,
	    width: 400,
	    height: 300,
	    min:false,
	    max:false,
	    title:"系统控件",
	    content: 'url:'+_href+''
	});	
}


//回调函数
COMP_SystemPicker.updateData =function ($ids,$names)
{

	if($ids==null||$ids=="null"||$ids=="undefined"){
		$ids="";
		$names="";
	}
	
	if(_callback!=null&&_callback!=""&&_callback!=undefined){
		
		defindCallBack($ids,$names,_callback);
		
	}else{	
	
		$(_obj).attr("value",$ids);
		$(_obj).text($names);
	}
}

/*
 * 使用范例
 */
/*
	<script type="text/javascript">
		function defindCallBack(ids,names,callback){
		
			$("#selectId").text(ids);
			$("#selectName").text(names);
		}
	</script>
	
	<img src="<%=request.getContextPath()%>/img/search.gif" style="cursor: pointer"
		onClick="COMP_ParameterPicker.getParameter('paramid','', 'param','single','','','');" />
	<label id='selectId'></label>
	<label id='selectName'></label>
*/
