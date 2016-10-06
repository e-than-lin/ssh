/**
 * @name COMP_CategoryPicker.js
 * @author WEIXH
 * @description 区域选择控件
 */
function COMP_CategoryPicker(){
	
	_dialogId	= null;
	_obj 		= null;
	_callback	= null;
	_type 		= null;
	_initIds 	= null;
	_initNames 	= null;
	_initCode 	= null;
	_showIds 	= null;
	_projId		= null;
	_href 		= null;
	
	_title		= null;
	_appkey		= null;
}

//$dialogId 控件ID 不能为空
//$obj: 传入要回写参数的对象。
//$callback: 如果需要使用单独的回调函数，传入对象的id值，并且在调用该js的页面中加上一个名称为defindCallBack的回调函数。
//$type: 表示选择框类型，single表示单选，double表示复选，如果不传入则默认复选。
//$initIds: 初始化选中的id序列。
//$appkey: 所属应用的key
COMP_CategoryPicker.getCategorys = function ($dialogId,$obj,$callback,$type,$initIds,$initNames,$showIds,$title,$appkey){
	_dialogId	= $dialogId;
	_obj 		= $obj;
	_callback 	= $callback;
	_type 		= $type;
	_initIds 	= $initIds;
	_initNames 	= $initNames;
	_showIds 	= $showIds;
	_title 		= $title;
	_appkey 	= $appkey;
	_href		= "baseGeo_getAllNodes.action?baseGeoInfo.appKey="+_appkey+"&p_dialog="+_dialogId+"&p_type="+_type;	
	$.dialog({ 
		id:''+_dialogId+'',
		lock:true,
		parent:this,
		resize: false,
	    width: 600,
	    height: 500,
	    min:false,
	    max:false,
	    zIndex:2000,
	    title:$title,
	    content: 'url:'+_href+''
	});	
}


//回调函数
COMP_CategoryPicker.updateData =function ($ids,$names)
{

	if($ids==null||$ids=="null"||$ids=="undefined"){
		$ids="";
		$names="";
	}
	
	if(_callback!=null&&_callback!=""&&_callback!=undefined){
		
		cateGoryCallBack($ids,$names,_callback);
		
	}else{	
		$(_obj).attr("value",$ids);
		$(_obj).text($code+":"+$names);
	}
}

/*
 * 使用范例
 */
/*
 	<script type="text/javascript" src="<%=request.getContextPath()%>/theme/default/js/COMP_CategoryPicker.js"></script>
	
	<script type="text/javascript">
		function cateGoryCallBack(ids,names,callback){
			$("#cateIds").text(ids);
			$("#cateName").text(names);
		}
	</script>
	
	<img src="<%=request.getContextPath()%>/img/search.gif" style="cursor: pointer"
		onClick="COMP_CategoryPicker.getCategorys('category','', 'category','','','','','XX控件','CON');" />
	<label id='cateIds'></label>
	<label id='cateName'></label>
	
*/
