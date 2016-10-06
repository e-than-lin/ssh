jQuery.extend(jQuery.validator.messages, {

  required: "必填字段",
  remote: "请修正该字段",
  email: "请输入邮件",
  url: "请输入合法的网址",
  date: "请输入合法的日期",
  dateISO: "请输入合法的日期",
  number: "请输入数字",
  digits: "只能输入整数",
  creditcard: "请输入合法的信用卡号",
  equalTo: "请再次输入相同的值",
  accept: "请输入拥有合法后缀名的字符串",
  maxlength: jQuery.validator.format("请输入一个 长度最多是 {0} 的字符串"),
  minlength: jQuery.validator.format("请输入一个 长度最少是 {0} 的字符串"),
  rangelength: jQuery.validator.format("请输入 一个长度介于 {0} 和 {1} 之间的字符串"),
  range: jQuery.validator.format("请输入一个介于 {0} 和 {1} 之间的值"),
  max: jQuery.validator.format("请输入一个最大为{0} 的值"),
  min: jQuery.validator.format("请输入一个最小为{0} 的值")
});

var quoteattrdom;
var quoteattr;
function getQuote(id)
{
	
	createQuoteAttrdom();
	
	var quotecontextStr=getQuoteContext();
	
	$.ajax({
		   url: "quote_getQuote.action",
		   type: "POST",
         data: "formText="+quotecontextStr,
         dataType:'json',
		   success: function(transport){
		   
			 $("#"+id).val(transport.sumPrice); 
		   }
		});
}

function getFromText()
{
	createQuoteAttrdom();
	return getQuoteContext();
}


function createQuoteAttrdom()
{
	

	var strXml='<?xml version="1.0" encoding="UTF-8" ?><root><FormAttributes></FormAttributes></root>';
	if(navigator.userAgent.toLowerCase().indexOf("msie")!=-1){ 
		quoteattrdom=new ActiveXObject("Microsoft.XMLDOM"); 
		quoteattrdom.loadXML(strXml); 
		} 
		else 
		{
			quoteattrdom=new DOMParser().parseFromString(strXml,"text/xml"); 
			}
	quoteattr= quoteattrdom.documentElement;
		
}

function getQuoteContext()
{
	
	$("#formContext").find("input,textarea,select").each(function(){	

		if(this.tagName.toLowerCase()=='input' )
		{
			createQuoteAttr($(this).attr("name"),$(this).val());
		}
		else if(this.tagName.toLowerCase()=='textarea' )
		{
			createQuoteAttr($(this).attr("name"),$(this).val());
			}
		else if(this.tagName.toLowerCase()=='select' )
		{
			createQuoteAttr($(this).attr("name"),$(this).val());
			}
		
	});

	
      var quotecontext=serializeQuoteXml(quoteattrdom);
      
       return quotecontext;
	}


function createQuoteAttr(name,value)
{
	var theElem2=quoteattrdom.createElement("Attribute");
	theElem2.setAttribute("name", name);
	theElem2.setAttribute("value", value);
	$(quoteattr).find("FormAttributes").each(function(){					
		this.appendChild(theElem2);			
	});
	
	}


function serializeQuoteXml(oNode) 
{
    if(oNode)
    {
    	if(navigator.userAgent.toLowerCase().indexOf("msie")!=-1){
    	    return oNode.xml;
    	}
    	else
    		{
    		
    		 var oSerializer = new XMLSerializer();
		      return oSerializer.serializeToString(oNode);
    		
    		}
       
    }
    return '';
}


