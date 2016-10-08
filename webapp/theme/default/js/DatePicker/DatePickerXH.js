
var DatePaickerInput=null;
var DateStrPaickerInput=null;
var DatePaickerdialog=null;
function SelectDate(obj,str,mode,type)
{
	
	//已前:"before" 以后 :"after" 不限制："" 
	//after_today，before_today 表示包括今天 
     var DatePaickerHight=200;
	DatePaickerInput=obj;
	DateStrPaickerInput=str;
	if(str.indexOf("hh")>0 || str.indexOf("HH")>0)
	{
		DatePaickerHight=230;
	}
	
	 var _href='app/common/datePickerXH.jsp?mode='+mode+'&type='+type;
	 
	// var _href="sysDepartmentAction_compDepPicker.action?dialogId=DatePaicker";
	 DatePaickerdialog= $.dialog({ id:'DatePaicker',lock:true,parent:this,resize: false,
		    width:177,height:DatePaickerHight,min:false,max:false,title:"日历控件", padding:0,
		    content: 'url:'+_href+'',
		    close: function(){
		     this.content.calendar.Return("");
		     closeDate(obj);
	    }
		});
	


	
}

function getDatePaickerInput()
{
	
	return DatePaickerInput;
}

function getDateStrPaickerInput()
{
	return DateStrPaickerInput;
}

function closeDate(obj){
	return obj;
}
