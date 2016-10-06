/**
 * @author pxy
 * @description wbs模板控件脚本
 */

function COMP_WBSTPPicker(){
	_dialogId=null;
	_obj = null;
	_type = null;
	_initIds = null;
	_initNames = null;
	_showIds = null;
	_selfId = null;
	_href = null;
	_callback=null;
}

//$obj: 传入要回写参数的对象。
//$callback: 如果需要使用单独的回调函数，传入对象的id值，并且在调用该js的页面中加上一个名称为defindCallBack的回调函数。
//$type: 表示选择框类型，single表示单选，double表示复选，如果不传入则默认复选。
//$initIds: 初始化选中的id序列。
//$initNames：初始化id序列对应的名称序列，都是用逗号隔开。
//$showIds：为要显示的id序列(只显示给出的id序列，用于过滤一些不必要显示的信息，如果为空则显示全部)。
//$selfId: 当前部门的id，暂时是用于在编辑部门信息时选择该部门的协管部门使用，传入当前部门的id，程序将把当前部门和它的所有子部门的数据过滤后再生成树。如没有使用到可不选。
//$root: 应用程序根目录(如:"/oa")

COMP_WBSTPPicker.chooseWBSTP=function($dialogId,$obj,$callback,$type,$initIds,$initNames,$showIds,$selfId, $root){
	_dialogId = $dialogId;
	
	_obj = $obj;
	_type = $type;
	_initIds = $initIds;
	_initNames = $initNames;
	_showIds = $showIds;
	_callback = $callback;
	_selfId = $selfId;
	
	_href= "wbsInfoTP_wbsTPCompPage.action?type="+$type+"&dialogId="+_dialogId;
	
	
	$.dialog({ id:''+$dialogId+'',lock:true,parent:this,
	    width: 520,height:300,min:false,max:false,title:"工作模板",
	    content: 'url:'+_href+''
	});
	
};

//回调函数
COMP_WBSTPPicker.updateData =function ($ids,$names)
{
	
	if($ids==null || $ids=="null" || $ids=="undefined"){
		$ids="";
		$names="";
		
	}

	if(_callback!=null&&_callback!=""&&_callback!=undefined){
		defindCallBack($ids,$names,_callback);
	}else{	
		$(_obj).attr("value",$ids);
		$(_obj).attr("innerText",$names);
	}
}