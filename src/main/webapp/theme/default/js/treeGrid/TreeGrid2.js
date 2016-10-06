
/**
 * @author ouwt
 * @version 1.0
 * @link http://chenjumin.javaeye.com
 */


//$folderColumnIndex 图标列数量(0开始)
//$indentation 层次缩进数
//$renderTo DIV



TreeGrid = function($path,$indentation,$folderColumnIndex,$renderTo,$pre){
	
	var leng=4;
    var s = "";
	var h = "";
	var d="";
	var HeaderStart="<tr >";
	var indexStr="<th id='orderID'>编号</th>";
	var preTH="<th >前置工作</th>";
	var Headerendt="</tr>";
	var rownum = 0;
	var pre=$pre;
	var __root;
	var tablewidth;
	var rowArray=new Array();
	var rowPArray=new Array();
	var __selectedData = null;
	var __selectedId = null;
	var __selectedIndex = null;
     var hoverRowBackground=true;
	var folderOpenIcon = $path+"folderOpen.gif";
	var folderCloseIcon = $path+"folderClose.gif";
	var defaultLeafIcon = $path+"defaultLeaf.gif";
     var  indentation=$indentation
	 var  folderColumnIndex=$folderColumnIndex;
	 var renderTo=$renderTo;
	 var vindex=1;
	 var preStr="";
	 this.getIndex= function(){ return vindex };
	 this.setIndex  = function(index) { vindex  = index; };
    
     this.addHeader  = function(headerAlign,width,headerText)
	{
		 if(width=='')
		{
		 
		h += "<th align='" + (headerAlign  || "center") + "' >" + (headerText || "") + "</th>";
	    }
		 else
		{
		 
		 h += "<th align='" + (headerAlign  || "center") + "' width='" + (width || "") + "px'>" + (headerText || "") + "</th>";
	     }
       
	 }

     //添加行数据
	 this.addRow = function(dateStr)
	{
	   var rowobj=eval("("+dateStr+")");
	
	   if(rowobj.pid=='' || rowobj.pid==null )
		{
          rowPArray[rowPArray.length]=rowobj;
	    }
	   else
		{
	      rowArray[rowArray.length]=rowobj;
	    }
	   
	 }

      //添加表头
    drowHeader= function()
	{
	  if(vindex==1)
	  {
		  h=HeaderStart+indexStr+h;
	  }
	  else
	  {
		  h=HeaderStart+h;
	  }
	  if(pre==1)
	  {
		  h=h+preTH;
	  }
	  h=h+Headerendt;
	 
	}

    //展示
	this.show = function(){
       s += "<table  width='100%' id='dateTable' class='list_table'> ";
        //创建列表表头
	    drowHeader();
	    s +=h;
	    //
		drowData();
        s +=d;
		s += "</table>";
		
		//展示区
        __root = jQuery("#"+renderTo);

		
		__root.append(s);
        var wit=leng*8;
        $("#orderID").css("width",wit+"px");
		init();
		initPre();
	}




	drowData = function(){
          
        for(var i=0;i<rowPArray.length;i++)
		 {
		  
	          drowRowData(rowPArray[i],1,i+1,0,'');
	      }
	  }

   var status=1;
   drowRowData = function(obj,_level,orderStr,order,_pid){
		  
           
		 
            var  orders;
			if(order!=0)
		   {
			 orders=orderStr+"."+order;
			}
			else
		   {
			 orders=orderStr;
			}

			var pid= _pid + "_" +rownum; 
            if(status%2==0)
	         {
			  d += "<tr  selseName='date' orders="+orders+" wid='"+obj.id+"'  id='TR" + pid + "' class='td_even'  onmouseover='over(this)'  onmouseout='out(this);'   othClass='td_even'  width='" + ((obj.width=="")?"":(obj.width+"px")) + "'  pid='" + ((_pid=="")?"":("TR"+_pid)) + "' tropen='Y'  rowIndex='" + rownum++ + "'>";
            
			}
			else
	     {
			 d += "<tr selseName='date' orders="+orders+" wid='"+obj.id+"' id='TR" + pid + "'  othClass='td_odd'   onmouseover='over(this)'  onmouseout='out(this);'         class='td_odd'   width='" + ((obj.width=="")?"":(obj.width+"px")) + "'  pid='" + ((_pid=="")?"":("TR"+_pid)) + "' tropen='Y'  rowIndex='" + rownum++ + "'>";
            
			}
			status++;
			
           if(vindex==1)
           {
        	   
        	   var len=orders.length;
        	  if(leng<len)
        	  {
        		  leng=len;
        	  }
        	   d += "<td >"+orders+"</td>";
           }
			
            
			for(var j=0;j<obj.columns.length;j++)
		    {
			    var col = obj.columns[j];

				if(j==folderColumnIndex)
				{
				d += "<td align='left'";
				}
				else
				{
				
				d += "<td align='" + (col.dataAlign || "left") + "'";
				}
				
                
               
				


				//层次缩进
				if(j==folderColumnIndex){
					d += " style='padding-left:" + (parseInt((indentation || "20"))*(_level-1)) + "px;'> ";
				}else{
					d += ">";
				}
                
				var hasCchildren=false;
                 
				for(var i=0;i<rowArray.length;i++)
				{
					
				   if(rowArray[i].pid==obj.id)
					{
				       hasCchildren=true;
					 
					   break;
				     }
				}

				//节点图标
				if(j==folderColumnIndex){
					if(hasCchildren){ //有下级数据
						d += "<img folder='Y' trid='TR" + pid + "'  src='" + folderOpenIcon + "' class='image_hand'>";
					}else{
						d += "<img src='" + defaultLeafIcon + "' class='image_nohand'>";
					}
				}
				if(obj.columns[j].onclick!='' )
				{
					d += "<a  href='javascript:"+obj.columns[j].onclick+"'>"+(  obj.columns[j].text|| "") + "</a></td>";
				}
				else
				{
					d += (  obj.columns[j].text|| "") + "</td>";
				}
				
			}
			if(pre==1)
			{
				d +="<td width='60px' id='PRE" + pid + "' style='word-WRAP: break-word'></td>";
				
				if(obj.preWork!=null && obj.preWork!="" && obj.preWork!="null")
				{
					var prew="{tid:'PRE" + pid + "',prework:'"+obj.preWork+"'}";
					preStr=preStr+","+prew;
				}
			}
			
		    d += "</tr>";
             var  rowIndex=1;
            for(var k=0;k<rowArray.length;k++)
				{
				   if(rowArray[k].pid==obj.id)
					{
					  
				       drowRowData(rowArray[k],_level+1,orders,rowIndex,pid);
                         rowIndex++;
				     }
			}


		}






init = function(){

		//展开、关闭下级节点
		__root.find("img[folder='Y']").bind("click", function(){
			
			var trid = this.trid || this.getAttribute("trid");
			var isOpen = __root.find("#" + trid).attr("tropen");
			isOpen = (isOpen == "Y") ? "N" : "Y";
			__root.find("#" + trid).attr("tropen", isOpen);
	    	
	    	showHiddenNode(trid, isOpen);
			 sortTableCss();
		});
		
	}


    sortTableCss= function(){
    	
    	
    	var trs=__root.find("tr[selseName='date']");
    	var trArray=new Array();
    	
    	 for(var i=0;i<trs.length;i++)
    	 {
    		 
    		 if(trs[i].style.display!='none')
    		 {
    			 trArray[trArray.length]=trs[i]; 
    		 }
    		
    	 }
    	 
    	 if(trArray.length>0)
    	 {
    		 for(var i=0;i<trArray.length;i++)
                {
                	if((i+1)%2==0)
                	{
                		trArray[i].className="td_even";
                		trArray[i].othClass="td_even";
                	}
                	else
                	{
                		trArray[i].className="td_odd";
                		trArray[i].othClass="td_odd";
                	}
                	
                	
                } 
    	 }
    }

    
    
    
    
    
        
  	//显示或隐藏子节点数据
	showHiddenNode = function(_trid, _open){
		
		if(_open == "N"){ //隐藏子节点
			__root.find("#"+_trid).find("img[folder='Y']").attr("src", folderCloseIcon);
			__root.find("tr[id^=" + _trid + "_]").css("display", "none");
			
		}else{ //显示子节点
			__root.find("#"+_trid).find("img[folder='Y']").attr("src", folderOpenIcon);
			showSubs(_trid);
		}
	}



      



//递归检查下一级节点是否需要显示
	hiddenSubs = function(_trid){
		var isOpen = __root.find("#" + _trid).attr("tropen");
		if(isOpen == "Y"){
			__root.find("#"+_trid).find("img[folder='Y']").attr("src", folderCloseIcon);
			__root.find("tr[id^=" + _trid + "_]").css("display", "none");
			var trs = __root.find("tr[pid=" + _trid + "]");
			for(var i=0;i<trs.length;i++){
				hiddenSubs(trs[i].id);
			}
		}
	 }


	//递归检查下一级节点是否需要显示
	showSubs = function(_trid){
		var isOpen = __root.find("#" + _trid).attr("tropen");
		if(isOpen == "Y"){
			var trs = __root.find("tr[pid=" + _trid + "]");
			trs.css("display", "");
			__root.find("#" + _trid).attr("open","Y");
			for(var i=0;i<trs.length;i++){
				showSubs(trs[i].id);
			}
		}
	}

   //递归检查下一级节点是否需要显示
	showAllSubs = function(_trid){
			var trs = __root.find("tr[pid=" + _trid + "]");
			trs.css("display", "");
			__root.find("#" + _trid).attr("tropen","Y");
			for(var i=0;i<trs.length;i++){
				__root.find("#"+_trid).find("img[folder='Y']").attr("src", folderOpenIcon);
				showAllSubs(trs[i].id);
			
		}
	}


   //初始化前置工作
	function initPre()
	{
		if(preStr!="" && preStr!=null)
		{
			preStr="["+preStr+"]";
			var arr=eval("("+preStr+")");
			if(arr.length>0)
			{
				//alert(arr[7].tid);//	var prew="{tid:'PRE" + pid + "',prework:'"+obj.preWork+"'}";
				//alert(arr.length);
				for(var i=1;i<arr.length;i++)
				{
					if(arr[i]!=null && arr[i].prework!=null &&  arr[i].prework!="")
					{
						var indexstr="";
						var preids=arr[i].prework.split(",");
						if(preids!=null && preids.length>0)
						{
							for(var j=0;j<preids.length;j++)
							{
								var trs = __root.find("tr[wid='"+preids[j]+"']");
								if(trs!=null && trs.length>0)
								{
									if(indexstr=="")
									{
										indexstr=trs.attr("orders");
									}
									else
									{
										indexstr=indexstr+","+trs.attr("orders");
									}
									
								}
							}
						}
						
						$("#"+arr[i].tid+"").html(indexstr); 
						
					}
				}
			}
		}
	}



	//展开或收起所有节点
	this.expandAll = function(isOpen){
		
		var trs = __root.find("tr[pid='']");
		if(isOpen=='Y')
		{
		  for(var i=0;i<trs.length;i++){
			var trid = trs[i].id || trs[i].getAttribute("id");
			__root.find("#"+trid).find("img[folder='Y']").attr("src", folderOpenIcon);
			showAllSubs(trid);
		  }
		}
		else
		{
		  for(var i=0;i<trs.length;i++){
			var trid = trs[i].id || trs[i].getAttribute("id");
			
			showHiddenNode(trid, isOpen);
		  }
		}
		 sortTableCss();
		
	}
	
	//取得当前选中的行记录
	this.getSelectedItem = function(){
		return new TreeGridItem(__root, __selectedId, __selectedIndex, TreeGrid.str2json(__selectedData));
	}


	};



//将json对象转换成字符串
TreeGrid.json2str = function(obj){
	var arr = [];

	var fmt = function(s){
		if(typeof s == 'object' && s != null){
			if(s.length){
				var _substr = "";
				for(var x=0;x<s.length;x++){
					if(x>0) _substr += ", ";
					_substr += TreeGrid.json2str(s[x]);
				}
				return "[" + _substr + "]";
			}else{
				return TreeGrid.json2str(s);
			}
		}
		return /^(string|number)$/.test(typeof s) ? "'" + s + "'" : s;
	}

	for(var i in obj){
		if(typeof obj[i] != 'object'){ //暂时不包括子数据
			arr.push(i + ":" + fmt(obj[i]));
		}
	}

	return '{' + arr.join(', ') + '}';
}

TreeGrid.str2json = function(s){
	var json = null;
	if(jQuery.browser.msie){
		json = eval("(" + s + ")");
	}else{
		json = new Function("return " + s)();
	}
	return json;
}

//数据行对象
function TreeGridItem (_root, _rowId, _rowIndex, _rowData){
	var __root = _root;
	
	this.id = _rowId;
	this.index = _rowIndex;
	this.data = _rowData;
	
	this.getParent = function(){
		var pid = jQuery("#" + this.id).attr("pid");
		if(pid!=""){
			var rowIndex = jQuery("#" + pid).attr("rowIndex");
			var data = jQuery("#" + pid).attr("data");
			return new TreeGridItem(_root, pid, rowIndex, TreeGrid.str2json(data));
		}
		return null;
	}
	
	this.getChildren = function(){
		var arr = [];
		var trs = jQuery(__root).find("tr[pid='" + this.id + "']");
		for(var i=0;i<trs.length;i++){
			var tr = trs[i];
			arr.push(new TreeGridItem(__root, tr.id, tr.rowIndex, TreeGrid.str2json(tr.data)));
		}
		return arr;
	}
};