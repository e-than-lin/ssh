
var DatePaickerInput=null;
var DateStrPaickerInput=null;
var DatePaickerdialog=null;
function SelectDate(obj,str,mode)
{
	
	
     var DatePaickerHight=200;
	DatePaickerInput=obj;
	DateStrPaickerInput=str;
	if(str.indexOf("hh")>0 || str.indexOf("HH")>0)
	{
		DatePaickerHight=230;
		
	}
	
	 var _href='trmapp/common/datePicker.jsp?mode='+mode;
	 
	// var _href="sysDepartmentAction_compDepPicker.action?dialogId=DatePaicker";
	 DatePaickerdialog= $.dialog({ id:'DatePaicker',lock:true,parent:this,resize: false, zIndex:9999,
		    width:177,height:DatePaickerHight,min:false,max:false,title:"日历控件", padding:0,
		    content: 'url:'+_href+'',
		    close: function(){
		     this.content.calendar.Return("");
		     if(typeof closeDate == 'function')//关闭控件时，执行的方法。
		    {
		    	 closeDate(obj);
		    }
		    
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


