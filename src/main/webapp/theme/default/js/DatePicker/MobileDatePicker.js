
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
	
	 var _href='mobile/common/datePicker.jsp?mode='+mode;
	 
	// var _href="sysDepartmentAction_compDepPicker.action?dialogId=DatePaicker";
	 DatePaickerdialog= $.dialog({ id:'DatePaicker',lock:true,parent:this,resize: false,
		 	width:"310px",height:"365px",min:false,max:false,title:"", padding:0,
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
