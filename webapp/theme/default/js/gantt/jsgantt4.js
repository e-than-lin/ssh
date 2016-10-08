
/**
 * @author ouwt
 * @version 1.0
 * @link http://chenjumin.javaeye.com
 */


//$folderColumnIndex 图标列数量(0开始)
//$indentation 层次缩进数
//$renderTo DIV

TreeGrid = function($path,$indentation,$folderColumnIndex,$renderToR,$renderToL,$pre,$minDate,$maxDate,$format){
    var rs = "";
    var ls = "";
    var vDepId = 1;
	var h = "";
	var d="";
	var f="";
	var vminDate=$minDate;
	var vmaxDate=$maxDate;
	var vFormat=$format;
	var HeaderStart="<tr >";
	var indexStr="<th >编号</th>";
	var preTH="<th >前置工作</th>";
	var Headerendt="</tr>";
	var rownum = 0;
	var pre=$pre;
	var __root;
	var __lRoot;
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
	 var renderToR=$renderToR;
	 var renderToL=$renderToL;
	 var vindex=1;
	 var preStr="";
	 this.getIndex= function(){ return vindex };
	 this.setIndex  = function(index) { vindex  = index; };
	 
	 var vTaskList     = new Array();	
	  var vFormatArr	= new Array("day","week","month","quarter");
     var vQuarterArr   = new Array(1,1,1,2,2,2,3,3,3,4,4,4);
     var vMonthDaysArr = new Array(31,28,31,30,31,30,31,31,30,31,30,31);
     var vMonthArr     = new Array("January","February","March","April","May","June","July","August","September","October","November","December");
	  setFormatArr = function() 	 {
										  vFormatArr = new Array();
										  for(var i = 0; i < arguments.length; i++) {vFormatArr[i] = arguments[i];}
										  if(vFormatArr.length>4){vFormatArr.length=4;}
										 };
										 
	 setFormat = function(pFormat){ 
		         
				vFormat = pFormat; 
				DrawLDate();
				__lRoot.empty();
				__lRoot.append(ls);
					};
    //添加表头
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
		 f+="<td ></td>";
       
	 }

     //添加行
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
	   
	 };

      //创建列表表头
    drowHeader= function()
	{
	  if(vindex==1)
	  {
		  h=HeaderStart+indexStr+h;
		  f="<tr><td ></td>"+f;
	  }
	  else
	  {
		  h=HeaderStart+h;
		  f="<tr>"+f;
	  }
	  if(pre==1)
	  {
		  h=h+preTH;
		f=f+"<td ></td>";;
	  }
	  h=h+Headerendt;
	  f=f+"</tr>";
	};

	//展示
	this.show = function(){
		rs += "<table  style='width:100%'  id='dateTable1' > ";
		rs += "<tr><td style='BACKGROUND-COLOR:#F1F1F1;height:20px;FILTER: progid:DXImageTransform.Microsoft.Gradient(gradientType=0,startColorStr=#FDFDFD,endColorStr=#DFDFDF);'></td></tr></table>";
		rs += "<table  style='width:2000px'    id='dateTable' class='list_table'> ";
	   //创建列表表头
		drowHeader();
	    rs +=h;
	    //创建列表
		drowRData();
		rs +=d;
		
		if(rowPArray==null || rowPArray.length==0)
		{
			for(var i=0;i<10;i++)
			{
				 rs +=f;
			}
		}
		else
		{
			var num=rowPArray.length+rowArray.length;
			if(num<10)
			{
				var num2=10-num;
				for(var i=0;i<num2;i++)
				{
					 rs +=f;
				}
			}
			else
			{
				 rs +=f;
			}
		}
	   
		rs += "</table>";
		//ls += "<table  style='width:850px;'  id='dateTable' class='list_table'> ";
		
		///ls += "</table>";
        __root = jQuery("#"+renderToR);
		__root.append(rs);
		
		//创建甘特图
		DrawLDate();
		__lRoot= jQuery("#"+renderToL);
		__lRoot.append(ls);

		//初始化事件
		init();
		//初始化前置
		initPre();
	}




	drowRData = function(){
		 if(rowPArray.length > 0)
	      {
        for(var i=0;i<rowPArray.length;i++)
		 {
		  
	          drowRRowData(rowPArray[i],1,i+1,0,'');
	      }
	      }
	  }

   var status=1;
   drowRRowData = function(obj,_level,orderStr,order,_pid){
		  
           
		 
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
			obj.trid='TR' + pid ;
			obj.vpid=(_pid=="")?"":("TR"+_pid);
            if(status%2==0)
	         {
			  d += "<tr   selseName='date' orders="+orders+" wid='"+obj.id+"'  id='TR" + pid + "' class='td_even'  onmouseover='over(this);'   onmouseout='out(this);'  othClass='td_even'  width='" + ((obj.width=="")?"":(obj.width+"pm")) + "'  pid='" + ((_pid=="")?"":("TR"+_pid)) + "' tropen='Y'   rowIndex='" + rownum++ + "'>";
            
			}
			else
	     {
			 d += "<tr  selseName='date' orders="+orders+" wid='"+obj.id+"' id='TR" + pid + "'  othClass='td_odd'   onmouseover='over(this);'  onmouseout='out(this);'         class='td_odd'   width='" + ((obj.width=="")?"":(obj.width+"pm")) + "'  pid='" + ((_pid=="")?"":("TR"+_pid)) + "' tropen='Y'   rowIndex='" + rownum++ + "'>";
            
			}
			status++;
			
           if(vindex==1)
           {
        	   d += "<td width='30px'  >"+orders+"</td>";
           }
			
            
			for(var j=0;j<obj.columns.length;j++)
		    {
			    var col = obj.columns[j];

				if(j==folderColumnIndex)
				{
				d += "<td   align='left'";
				}
				else
				{
				
				d += "<td  align='" + (col.dataAlign || "left") + "'";
				}
				
                
               
				


				//层次缩进
				if(j==folderColumnIndex){
				//	d += " style='display:inline;padding-left:" + (parseInt((indentation || "20"))*(_level-1)) + "px;'> ";
					d += "><img src='" + defaultLeafIcon + "' style='width:" + (parseInt((indentation || "20"))*(_level-1)) + "px;'   class='image_nohand'>";
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
				d +="<td style='height:27px;' width='60px' id='PRE" + pid + "' style='word-WRAP: break-word'></td>";
				
				if(obj.preWork!=null && obj.preWork!="" && obj.preWork!="null")
				{
					var prew="{tid:'PRE" + pid + "',prework:'"+obj.preWork+"'}";
					preStr=preStr+","+prew;
				}
			}
			
		    d += "</tr>";
             var  rowIndex=1;
             if(rowArray.length > 0)
             {
            	 for(var k=0;k<rowArray.length;k++)
 				{
 				   if(rowArray[k].pid==obj.id)
 					{
 					  
 				       drowRRowData(rowArray[k],_level+1,orders,rowIndex,pid);
                          rowIndex++;
 				     }
 			}
             }
            


		};






init = function(){

		//展开、关闭下级节点
		__root.find("img[folder='Y']").bind("click", function(){
			
			var trid = this.trid || $(this).attr("trid");
			var trObj=__root.find("tr[id='"+trid+"']")[0];
			
			
			var isOpen = $(trObj).attr("tropen");
		
			isOpen = (isOpen == "Y") ? "N" : "Y";
			
			 $(trObj).attr("tropen", isOpen); 
			 
	    	showHiddenNode(trid, isOpen);
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
    };

    
    
    
    
    
        
  	//显示或隐藏子节点数据
	showHiddenNode = function(_trid, _open){
		
		if(_open == "N"){ //隐藏子节点
			__root.find("#"+_trid).find("img[folder='Y']").attr("src", folderCloseIcon);
			__root.find("tr[id^=" + _trid + "_]").css("display", "none");
			__lRoot.find("div[id^=" + _trid + "_]").css("display", "none");
			
			if(rowPArray.length > 0)
		      {
	        for(var i=0;i<rowPArray.length;i++)
			 {
	        	if(rowPArray[i].trid.indexOf(_trid+"_")>=0)
	        	{
	        		rowPArray[i].display="none";
	        		
	        	}
		         
		      }
		      }
			 if(rowArray.length > 0)
             {
            	 for(var k=0;k<rowArray.length;k++)
 				{
            		 if(rowArray[k].trid.indexOf(_trid+"_")>=0)
     	        	{
            			 rowArray[k].display="none";
     	        		
     	        	}
 			}
             }
			
			
		}else{ //显示子节点
			
			__root.find("#"+_trid).find("img[folder='Y']").attr("src", folderOpenIcon);
			
			showSubs(_trid);
		}
		
		//画线
		DrawDepen();
		 sortTableCss();
	};



      



//递归检查下一级节点是否需要显示
	hiddenSubs = function(_trid){
		
		var isOpen = __root.find("#" + _trid).attr("tropen");
		if(isOpen == "Y"){
			__root.find("#"+_trid).find("img[folder='Y']").attr("src", folderCloseIcon);
			__root.find("tr[id^=" + _trid + "_]").css("display", "none");
			__lRoot.find("div[id^=" + _trid + "_]").css("display", "none");
			
			if(rowPArray.length > 0)
		      {
	        for(var i=0;i<rowPArray.length;i++)
			 {
	        	if(rowPArray[i].trid.indexOf(_trid+"_") >=0)
	        	{
	        		rowPArray[i].display="none";
	        		
	        	}
		         
		      }
		      }
			 if(rowArray.length > 0)
           {
          	 for(var k=0;k<rowArray.length;k++)
				{
          		 if(rowArray[k].trid.indexOf(_trid+"_")>=0)
   	        	{
          			rowArray[k].display="none";
   	        		
   	        	}
			}
           }
			
			
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
			
			var trsl = __lRoot.find("div[pid=" + _trid + "]");
			trsl.css("display", "");
			
			if(rowPArray.length > 0)
		      {
	        for(var i=0;i<rowPArray.length;i++)
			 {
	        	if(rowPArray[i].vpid==_trid)
	        	{
	        		rowPArray[i].display="";
	        		
	        	}
		         
		      }
		      }
			 if(rowArray.length > 0)
           {
          	 for(var k=0;k<rowArray.length;k++)
				{
          		 if(rowArray[k].vpid==_trid)
   	        	{
          			rowArray[k].display="";
   	        		
   	        	}
			}
           }
			
			
			__root.find("#" + _trid).attr("tropen","Y");
			for(var i=0;i<trs.length;i++){
				showSubs(trs[i].id);
			}
		}
	}

   //递归检查下一级节点是否需要显示
	showAllSubs = function(_trid){
			var trs = __root.find("tr[pid=" + _trid + "]");
			trs.css("display", "");
			var trsl = __lRoot.find("div[pid=" + _trid + "]");
			trsl.css("display", "");
			if(rowPArray.length > 0)
		      {
	        for(var i=0;i<rowPArray.length;i++)
			 {
	        	if(rowPArray[i].vpid==_trid)
	        	{
	        		rowPArray[i].display="";
	        		
	        	}
		         
		      }
		      }
			 if(rowArray.length > 0)
         {
        	 for(var k=0;k<rowArray.length;k++)
				{
        		 if(rowArray[k].vpid==_trid)
 	        	{
        			 rowArray[k].display="";
 	        		
 	        	}
			}
         }
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
		// sortTableCss();
		
		
	};
	
	//取得当前选中的行记录
	this.getSelectedItem = function(){
		return new TreeGridItem(__root, __selectedId, __selectedIndex, TreeGrid.str2json(__selectedData));
	};


	
	
	
	
	
	
	
	drowLRowData = function(obj,vTmpDate,vMinDate,vChartWidth,vItemRowStr,vDateRowStr,vDateDisplayFormat,vTaskLeft,vTaskRight,vDayWidth,vColUnit,_pid){
		  
		var pid= _pid + "_" +rownum; 
		  vTmpDate.setFullYear(vMinDate.getFullYear(), vMinDate.getMonth(), vMinDate.getDate(),0,0,0);
		  
		 
		  var vstartDate =$D(obj.columns[5].text);
		 
		 
		  var vendDate = $D(obj.columns[6].text);
		
       var  vTaskStart =vstartDate;
       var   vTaskEnd   =vendDate;
       var vNumCols = 0;
       var  vID = obj.id;	 
       var vNumUnits = (vTaskEnd - vTaskStart) / (24 * 60 * 60 * 1000) + 1;
		
        
       ls += "<DIV id='TR"+pid +"' pid='TR"+_pid+"' style='display:\""+obj.display+"\";'>";
       
       ls += '<DIV id="childgrid_' + vID + '" style="position:relative">';
       
       if(obj.pMile==1) {
      	  var leftNum=0;
    	   if (vFormat='day')
           {
    		   leftNum=10;
           }
      		  ls += '<DIV><TABLE  class="list_table"  style="position:relative; border:0;top:0px; width: ' + vChartWidth + 'px;" cellSpacing=0 cellPadding=0 border=0>' +
                '<TR id="childrow_' + vID + '"  >' + vItemRowStr + '</TR></TABLE></DIV>';
      		  vDateRowStr = formatDateStr(vTaskStart,vDateDisplayFormat);
      		  
      		  vTaskLeft = (Date.parse(vTaskStart) - Date.parse(vMinDate)) / (24 * 60 * 60 * 1000);
                vTaskRight = 1;
              
                ls +=
                    '<div id="bardiv_' + vID + '" style="position:absolute; top:5px; left:' + Math.ceil((vTaskLeft * (vDayWidth) + leftNum)) + 'px; height: 18px; width:160px; overflow:hidden;">' +
                    '  <div id="taskbar_' + vID + '" title="' + obj.columns[2].text + ': ' + vDateRowStr + '" style="height: 16px; width:12px; overflow:hidden; cursor: pointer;" >';
                ls += '&loz;</div>' ;
                ls += '<div style="FONT-SIZE:12px; position:absolute; top:2px; width:120px; left:12px">' +  obj.columns[3].text + '</div></div>';
                
      	 
           }
      	 
      	 else {
      		
      	 
      		 vDateRowStr = formatDateStr(vTaskStart,vDateDisplayFormat) + ' - ' + formatDateStr(vTaskEnd,vDateDisplayFormat);

              
              	 vTaskRight = (Date.parse(vTaskEnd) - Date.parse(vTaskStart)) / (24 * 60 * 60 * 1000)+1 ;
                   vTaskLeft = Math.ceil((Date.parse(vTaskStart) - Date.parse(vMinDate)) / (24 * 60 * 60 * 1000));
                
                   if (vFormat='day')
                   {
                       var tTime=new Date();
                       tTime.setTime(Date.parse(vTaskStart));
                       if (tTime.getMinutes() > 29)
                           vTaskLeft+=.5;
                   }
                              	 
               
      		 
      		 
      		  if( obj.pGroup!=0) {
      			  
      			  ls += '<DIV><TABLE  class="list_table" style="border:0;position:relative; top:0px; width: ' + vChartWidth + 'px;" cellSpacing=0 cellPadding=0 border=0>' +
                    '<TR id="childrow_' + vID + '"   >' + vItemRowStr + '</TR></TABLE></DIV>';
      		      
      			  ls +='<div id="bardiv_' + vID + '" style="position:absolute; top:6px; left:' + Math.ceil(vTaskLeft * (vDayWidth)) + 'px; height: 9px; width:' + Math.ceil((vTaskRight) * (vDayWidth) +1) + 'px">' +
                          '<div id="taskbar_' + vID + '" title="' +  obj.columns[2].text + ': ' + vDateRowStr + '" class=gtask style="background-color:#000000; height: 7px; width:' + Math.ceil((vTaskRight) * (vDayWidth) +1) + 'px;  cursor: pointer;opacity:0.9;">' +
                            '<div style="Z-INDEX: -4; float:left; background-color:#666666; height:3px; overflow: hidden; margin-top:1px; ' +
                                  'margin-left:1px; margin-right:1px; filter: alpha(opacity=80); opacity:0.8;  ' + 
                                  'cursor: pointer;" >' +
                              '</div>' +
                           '</div>' +
                           '<div style="Z-INDEX: -4; float:left; background-color:#000000; height:4px; overflow: hidden; width:1px;">ddd</div>' +
                           '<div style="Z-INDEX: -4; float:right; background-color:#000000; height:4px; overflow: hidden; width:1px;">ddd</div>' +
                           '<div style="Z-INDEX: -4; float:left; background-color:#000000; height:3px; overflow: hidden; width:1px;">ddd</div>' +
                           '<div style="Z-INDEX: -4; float:right; background-color:#000000; height:3px; overflow: hidden; width:1px;">dd</div>' +
                           '<div style="Z-INDEX: -4; float:left; background-color:#000000; height:2px; overflow: hidden; width:1px;">dd</div>' +
                           '<div style="Z-INDEX: -4; float:right; background-color:#000000; height:2px; overflow: hidden; width:1px;">dd</div>' +
                           '<div style="Z-INDEX: -4; float:left; background-color:#000000; height:1px; overflow: hidden; width:1px;">dd</div>' +
                           '<div style="Z-INDEX: -4; float:right; background-color:#000000; height:1px; overflow: hidden; width:1px;">dd</div>' ;
      		     
      			
      			 ls += '<div style="FONT-SIZE:12px; position:absolute; top:-3px; width:120px; left:' + (Math.ceil((vTaskRight) * (vDayWidth) - 1) + 6) + 'px">' + obj.columns[3].text + '</div></div>';
      		  }
      		  
      		  else {
      			  
      			 var vDivStr = '<DIV><TABLE  class="list_table" style="position:relative;border:0; top:0px; width: ' + vChartWidth + 'px;" cellSpacing=0 cellPadding=0 border=0>' +
                    '<TR id="childrow_' + vID + '"   >' + vItemRowStr + '</TR></TABLE></DIV>';
                     ls += vDivStr;
                     ls +='<div id="bardiv_' + vID + '" style="position:absolute; top:6px; left:' + Math.ceil(vTaskLeft * (vDayWidth)) + 'px; height:25px; width:' + Math.ceil((vTaskRight) * (vDayWidth) +1) + 'px">' +
                            '<div id="taskbar_' + vID + '" title="' +  obj.columns[2].text  + ': ' + vDateRowStr + '" class=gtask style="background-color:#00ffff; height: 13px; width:' + Math.ceil((vTaskRight) * (vDayWidth) +1) + 'px; cursor: pointer;opacity:0.9;" ' +
                               '>' +
                               '<div class=gcomplete style="Z-INDEX: -4; float:left; background-color:black; height:5px; overflow: auto; margin-top:4px; filter: alpha(opacity=40); opacity:0.4;  overflow:hidden">' +
                               '</div>' +
                            '</div>';
                    
                     ls += '<div style="FONT-SIZE:12px; position:absolute; top:-3px; width:120px; left:' + (Math.ceil((vTaskRight) * (vDayWidth) - 1) + 6) + 'px">' + obj.columns[3].text + '</div></div>';
      		  }
      		 
      		 
      	 }
      	 
       ls += '</DIV>';
       ls += '</DIV>';
      	 
       rownum++;
       
       for(var k=0;k<rowArray.length;k++)
				{
				   if(rowArray[k].pid==obj.id)
					{
					  
					   drowLRowData(rowArray[k],vTmpDate,vMinDate,vChartWidth,vItemRowStr,vDateRowStr,vDateDisplayFormat,vTaskLeft,vTaskRight,vDayWidth,vColUnit,pid);
                  
				     }
			}


		};
	
	
	
	
	//创建甘特图
	DrawLDate = function()
	{
		//日期格式
		  var vDateDisplayFormat = "mm/dd/yy";
		  //最大日期
		  var vMaxDate = new Date();
		  //最小日期
	      var vMinDate = new Date();	
	      
	      var vTmpDate = new Date();
	      
	      var vNxtDate = new Date();
	      var vCurrDate = new Date();
	      var vTaskLeft = 0;
	      var vTaskRight = 0;
	      var vNumCols = 0;
	      var vID = 0;
	      var vMainTable = "";
	      var vLeftTable = "";
	      var vRightTable = "";
	      var vDateRowStr = "";
	      var vItemRowStr = "";
	      var vColWidth = 0;
	      var vColUnit = 0;
	      var vChartWidth = 0;
	      var vNumDays = 0;
	      var vDayWidth = 0;
	      var vStr = "";
	      var vNameWidth = 220;	
	      var vStatusWidth = 70;
	      var vLeftWidth = 15 + 220 + 70 + 70 + 70 + 70 + 70;
	      var vNumUnits  = 0;
	      rownum=0;
	     
	    	 //取最小日期
	    	  vMinDate = getMinDate(vminDate, vFormat);
	    	  //取最大日期
	          vMaxDate = getMaxDate(vmaxDate, vFormat,vMinDate);
	         
	          //天视图
	          if(vFormat == 'day') {
	              vColWidth = 20;
	              vColUnit = 1;
	              vDayWidth=vColWidth+10;
	           }//周视图
	           else if(vFormat == 'week') {
	              vColWidth = 39;
	              vColUnit = 7;
	              vDayWidth = (vColWidth+10) /vColUnit-1;
	             
	           }//月视图
	           else if(vFormat == 'month') {
	              vColWidth = 37;
	              vColUnit = 30;
	              vDayWidth = (vColWidth+10) / vColUnit-1 ;
	           }//季视图
	           else if(vFormat == 'quarter') {
	              vColWidth = 60;
	              vColUnit = 90;
	              vDayWidth = (vColWidth+10) / vColUnit-1 ;
	           }
	           
	         
	          
	          //天数
	          vNumDays = (Date.parse(vMaxDate) - Date.parse(vMinDate)) / ( 24 * 60 * 60 * 1000);
	          vNumUnits = vNumDays / vColUnit;
	          
	          vChartWidth = vNumUnits * vColWidth + 1;
	         // vDayWidth = (vColWidth / vColUnit) + (1/vColUnit);
	         
	        
	          ls='<table style="border:0;width: ' + vChartWidth + 'px;"   class="list_table"> <TR style="padding: 1px;padding:1px;" >';
	            vTmpDate.setFullYear(vMinDate.getFullYear(), vMinDate.getMonth(), vMinDate.getDate());
	            vTmpDate.setHours(0);
	            vTmpDate.setMinutes(0);
	            while(Date.parse(vTmpDate) <= Date.parse(vMaxDate))
	            {	
	               vStr = vTmpDate.getFullYear() + '';
	               vStr = vStr.substring(2,4);
	               
	               
	              
	               
	     	         if(vFormat == 'day')
	               {
	   			      ls += '<th class=gdatehead style="FONT-SIZE: 12px; HEIGHT: 21px;" align=center colspan=7>' +
	   			      formatDateStr(vTmpDate,vDateDisplayFormat.substring(0,5)) + ' - ';
	                  vTmpDate.setDate(vTmpDate.getDate()+6);
	   		         ls += formatDateStr(vTmpDate, vDateDisplayFormat) + '</th>';
	                  vTmpDate.setDate(vTmpDate.getDate()+1);
	               }
	               else if(vFormat == 'week')
	               {
	     		         ls += '<th class=gdatehead align=center style="FONT-SIZE: 12px; HEIGHT: 20px;" width='+vColWidth+10+'px>`'+ vStr + '</th>';
	                  vTmpDate.setDate(vTmpDate.getDate()+7);
	               }
	               else if(vFormat == 'month')
	               {
	   	            ls += '<th class=gdatehead align=center style="FONT-SIZE: 12px; HEIGHT: 20px;" width='+vColWidth+10+'px>`'+ vStr + '</th>';
	                  vTmpDate.setDate(vTmpDate.getDate() + 1);
	                  while(vTmpDate.getDate() > 1)
	                  {
	                    vTmpDate.setDate(vTmpDate.getDate() + 1);
	                  }
	               }
	               else if(vFormat == 'quarter')
	               {
	   	            ls += '<th class=gdatehead align=center style="FONT-SIZE: 12px; HEIGHT: 20px;" width='+vColWidth+10+'px>`'+ vStr + '</th>';
	                  vTmpDate.setDate(vTmpDate.getDate() + 81);
	                  while(vTmpDate.getDate() > 1)
	                  {
	                    vTmpDate.setDate(vTmpDate.getDate() + 1);
	                  }
	               }

	            }

	            ls += '</TR><TR style="border: 2px solid solid #8BB6EF;padding: 1px;padding:1px;">';
	            
	            vTmpDate.setFullYear(vMinDate.getFullYear(), vMinDate.getMonth(), vMinDate.getDate());
	            vNxtDate.setFullYear(vMinDate.getFullYear(), vMinDate.getMonth(), vMinDate.getDate());
	            vNumCols = 0;
	            while(Date.parse(vTmpDate) <= Date.parse(vMaxDate))
	            {	
	                if(vFormat == 'day' )
	                {
	                  if( formatDateStr(vCurrDate,'mm/dd/yyyy') ==formatDateStr(vTmpDate,'mm/dd/yyyy')) {
	                     vWeekdayColor  = "ccccff";
	                     vWeekendColor  = "9999ff";
	                     vWeekdayGColor  = "bbbbff";
	                     vWeekendGColor = "8888ff";
	                  } else {
	                     vWeekdayColor = "ffffff";
	                     vWeekendColor = "cfcfcf";
	                     vWeekdayGColor = "f3f3f3";
	                     vWeekendGColor = "c3c3c3";
	                  }
	                  
	                  if(vTmpDate.getDay() % 6 == 0) {
	                     vDateRowStr  += '<td class="gheadwkend" style="FILTER: progid:DXImageTransform.Microsoft.Gradient(gradientType=0,startColorStr=#FDFDFD,endColorStr=#DFDFDF);width: '+vColWidth+10+'px;BORDER-TOP: #efefef 0px solid; FONT-SIZE: 12px;   BORDER-LEFT: #efefef 1px solid;" bgcolor=#' + vWeekendColor + ' align=center><div style="width: '+vColWidth+'px">' + vTmpDate.getDate() + '</div></td>';
	                     vItemRowStr  += '<td class="gheadwkend" style="height:29px;width: '+vColWidth+10+'px;BORDER-TOP: #efefef 0px solid; FONT-SIZE: 12px; BORDER-LEFT: #efefef 1px solid; cursor: default;"  bgcolor=#' + vWeekendColor + ' align=center><div style="width: '+vColWidth+'px">&nbsp</div></td>';
	                  }
	                  else {
	                     vDateRowStr += '<td class="ghead" style="FILTER: progid:DXImageTransform.Microsoft.Gradient(gradientType=0,startColorStr=#FDFDFD,endColorStr=#DFDFDF);width: 30px;BORDER-TOP: #efefef 0px solid; FONT-SIZE: 12px;   BORDER-LEFT: #efefef 1px solid;"  bgcolor=#' + vWeekdayColor + ' align=center><div style="width: '+vColWidth+'px">' + vTmpDate.getDate() + '</div></td>';
	                     if( formatDateStr(vCurrDate,'mm/dd/yyyy') == formatDateStr(vTmpDate,'mm/dd/yyyy')) 
	                        vItemRowStr += '<td class="ghead" style="height:29px;width: '+vColWidth+10+'px;BORDER-TOP: #efefef 0px solid; FONT-SIZE: 12px; width: '+vColWidth+'px;  BORDER-LEFT: #efefef 1px solid; cursor: default;"  bgcolor=#' + vWeekdayColor + ' align=center><div style="width: '+vColWidth+'px">&nbsp&nbsp</div></td>';
	                     else
	                        vItemRowStr += '<td class="ghead" style="height:29px;width: '+vColWidth+10+'px;BORDER-TOP: #efefef 0px solid;FONT-SIZE: 12px; BORDER-LEFT: #efefef 1px solid; cursor: default;"  align=center><div style="width: '+vColWidth+'px">&nbsp&nbsp</div></td>';
	                  }

	                  vTmpDate.setDate(vTmpDate.getDate() + 1);

	               }

	   	         else if(vFormat == 'week')
	               {

	                  vNxtDate.setDate(vNxtDate.getDate() + 7);

	                  if( vCurrDate >= vTmpDate && vCurrDate < vNxtDate ) 
	                     vWeekdayColor = "ccccff";
	                  else
	                     vWeekdayColor = "ffffff";

	                  if(vNxtDate <= vMaxDate) {
	                     vDateRowStr += '<td class="ghead" style="FILTER: progid:DXImageTransform.Microsoft.Gradient(gradientType=0,startColorStr=#FDFDFD,endColorStr=#DFDFDF);BORDER-TOP: #efefef 1px solid; FONT-SIZE: 12px;  BORDER-LEFT: #efefef 1px solid;" bgcolor=#' + vWeekdayColor + ' align=center ><div style="width: '+vColWidth+'px">' + (vTmpDate.getMonth()+1) + '/' + vTmpDate.getDate() + '</div></td>';
	                     if( vCurrDate >= vTmpDate && vCurrDate < vNxtDate ) 
	                        vItemRowStr += '<td class="ghead" style="height:29px;width: '+vColWidth+10+'px;BORDER-TOP: #efefef 1px solid; FONT-SIZE: 12px; BORDER-LEFT: #efefef 1px solid;" bgcolor=#' + vWeekdayColor + ' align=center><div style="width: '+vColWidth+'px">&nbsp&nbsp</div></td>';
	                     else
	                        vItemRowStr += '<td class="ghead" style="height:29px;width: '+vColWidth+10+'px;BORDER-TOP: #efefef 1px solid; FONT-SIZE: 12px; BORDER-LEFT: #efefef 1px solid;" align=center><div style="width: '+vColWidth+'px">&nbsp&nbsp</div></td>';

	                  } else {
	                     vDateRowStr += '<td class="ghead" style="FILTER: progid:DXImageTransform.Microsoft.Gradient(gradientType=0,startColorStr=#FDFDFD,endColorStr=#DFDFDF);width: '+vDayWidth+'px;BORDER-TOP: #efefef 1px solid; FONT-SIZE: 12px; HEIGHT: 29px; BORDER-LEFT: #efefef 1px solid; bgcolor=#' + vWeekdayColor + ' BORDER-RIGHT: #efefef 1px solid;" align=center width:'+vColWidth+'px><div style="width: '+vColWidth+'px">' + (vTmpDate.getMonth()+1) + '/' + vTmpDate.getDate() + '</div></td>';
	                     if( vCurrDate >= vTmpDate && vCurrDate < vNxtDate ) 
	                        vItemRowStr += '<td class="ghead" style="height:29px;width: '+vColWidth+10+'px;BORDER-TOP: #efefef 1px solid; FONT-SIZE: 12px; BORDER-LEFT: #efefef 1px solid; BORDER-RIGHT: #efefef 1px solid;" bgcolor=#' + vWeekdayColor + ' align=center><div style="width: '+vColWidth+'px">&nbsp&nbsp</div></td>';
	                     else
	                        vItemRowStr += '<td class="ghead" style="height:29px;width: '+vColWidth+10+'px;BORDER-TOP: #efefef 1px solid; FONT-SIZE: 12px; BORDER-LEFT: #efefef 1px solid; BORDER-RIGHT: #efefef 1px solid;" align=center><div style="width: '+vColWidth+'px">&nbsp&nbsp</div></td>';

	                  }

	                  vTmpDate.setDate(vTmpDate.getDate() + 7);

	               }

	   	         else if(vFormat == 'month')
	               {

	                  vNxtDate.setFullYear(vTmpDate.getFullYear(), vTmpDate.getMonth(), vMonthDaysArr[vTmpDate.getMonth()]);
	                  if( vCurrDate >= vTmpDate && vCurrDate < vNxtDate ) 
	                     vWeekdayColor = "ccccff";
	                  else
	                     vWeekdayColor = "ffffff";

	                  if(vNxtDate <= vMaxDate) {
	                     vDateRowStr += '<td class="ghead" style="FILTER: progid:DXImageTransform.Microsoft.Gradient(gradientType=0,startColorStr=#FDFDFD,endColorStr=#DFDFDF);BORDER-TOP: #efefef 1px solid; FONT-SIZE: 12px;  BORDER-LEFT: #efefef 1px solid;" bgcolor=#' + vWeekdayColor + ' align=center width:'+vColWidth+'px><div style="width: '+vColWidth+'px">' + vMonthArr[vTmpDate.getMonth()].substr(0,3) + '</div></td>';
	                     if( vCurrDate >= vTmpDate && vCurrDate < vNxtDate ) 
	                        vItemRowStr += '<td class="ghead" style="height:29px;width: '+vColWidth+10+'px;BORDER-TOP: #efefef 1px solid; FONT-SIZE: 12px; BORDER-LEFT: #efefef 1px solid;" bgcolor=#' + vWeekdayColor + ' align=center><div style="width: '+vColWidth+'px">&nbsp&nbsp</div></td>';
	                     else
	                        vItemRowStr += '<td class="ghead" style="height:29px;width: '+vColWidth+10+'px;BORDER-TOP: #efefef 1px solid; FONT-SIZE: 12px; BORDER-LEFT: #efefef 1px solid;" align=center><div style="width: '+vColWidth+'px">&nbsp&nbsp</div></td>';
	                  } else {
	                     vDateRowStr += '<td class="ghead" style="FILTER: progid:DXImageTransform.Microsoft.Gradient(gradientType=0,startColorStr=#FDFDFD,endColorStr=#DFDFDF);BORDER-TOP: #efefef 1px solid; FONT-SIZE: 12px; BORDER-LEFT: #efefef 1px solid; BORDER-RIGHT: #efefef 1px solid;" bgcolor=#' + vWeekdayColor + ' align=center width:'+vColWidth+'px><div style="width: '+vColWidth+'px">' + vMonthArr[vTmpDate.getMonth()].substr(0,3) + '</div></td>';
	                     if( vCurrDate >= vTmpDate && vCurrDate < vNxtDate ) 
	                        vItemRowStr += '<td class="ghead" style="height:29px;width: '+vColWidth+10+'px;BORDER-TOP: #efefef 1px solid; FONT-SIZE: 12px; BORDER-LEFT: #efefef 1px solid; BORDER-RIGHT: #efefef 1px solid;" bgcolor=#' + vWeekdayColor + ' align=center><div style="width: '+vColWidth+'px">&nbsp&nbsp</div></td>';
	                     else
	                        vItemRowStr += '<td class="ghead" style="height:29px;width: '+vColWidth+10+'px;BORDER-TOP: #efefef 1px solid;FONT-SIZE: 12px; BORDER-LEFT: #efefef 1px solid; BORDER-RIGHT: #efefef 1px solid;" align=center><div style="width: '+vColWidth+'px">&nbsp&nbsp</div></td>';
	                  }

	                  vTmpDate.setDate(vTmpDate.getDate() + 1);

	                  while(vTmpDate.getDate() > 1) 
	                  {
	                     vTmpDate.setDate(vTmpDate.getDate() + 1);
	                  }

	               }

	   	         else if(vFormat == 'quarter')
	               {

	                  vNxtDate.setDate(vNxtDate.getDate() + 122);
	                  if( vTmpDate.getMonth()==0 || vTmpDate.getMonth()==1 || vTmpDate.getMonth()==2 )
	                     vNxtDate.setFullYear(vTmpDate.getFullYear(), 2, 31);
	                  else if( vTmpDate.getMonth()==3 || vTmpDate.getMonth()==4 || vTmpDate.getMonth()==5 )
	                     vNxtDate.setFullYear(vTmpDate.getFullYear(), 5, 30);
	                  else if( vTmpDate.getMonth()==6 || vTmpDate.getMonth()==7 || vTmpDate.getMonth()==8 )
	                     vNxtDate.setFullYear(vTmpDate.getFullYear(), 8, 30);
	                  else if( vTmpDate.getMonth()==9 || vTmpDate.getMonth()==10 || vTmpDate.getMonth()==11 )
	                     vNxtDate.setFullYear(vTmpDate.getFullYear(), 11, 31);

	                  if( vCurrDate >= vTmpDate && vCurrDate < vNxtDate ) 
	                     vWeekdayColor = "ccccff";
	                  else
	                     vWeekdayColor = "ffffff";

	                  if(vNxtDate <= vMaxDate) {
	                     vDateRowStr += '<td class="ghead" style="FILTER: progid:DXImageTransform.Microsoft.Gradient(gradientType=0,startColorStr=#FDFDFD,endColorStr=#DFDFDF);width: '+vColWidth+10+'px;BORDER-TOP: #efefef 1px solid; FONT-SIZE: 12px; BORDER-LEFT: #efefef 1px solid;" bgcolor=#' + vWeekdayColor + ' align=center width:'+vColWidth+'px><div style="width: '+vColWidth+'px">Qtr. ' + vQuarterArr[vTmpDate.getMonth()] + '</div></td>';
	                     if( vCurrDate >= vTmpDate && vCurrDate < vNxtDate ) 
	                        vItemRowStr += '<td class="ghead" style="height:29px;width: '+vColWidth+10+'px;BORDER-TOP: #efefef 1px solid; FONT-SIZE: 12px; BORDER-LEFT: #efefef 1px solid;" bgcolor=#' + vWeekdayColor + ' align=center><div style="width: '+vColWidth+'px">&nbsp&nbsp</div></td>';
	                     else
	                        vItemRowStr += '<td class="ghead" style="height:29px;width: '+vColWidth+10+'px;BORDER-TOP: #efefef 1px solid; FONT-SIZE: 12px; BORDER-LEFT: #efefef 1px solid;" align=center><div style="width: '+vColWidth+'px">&nbsp&nbsp</div></td>';
	                  } else {
	                     vDateRowStr += '<td class="ghead" style="FILTER: progid:DXImageTransform.Microsoft.Gradient(gradientType=0,startColorStr=#FDFDFD,endColorStr=#DFDFDF);width: '+vColWidth+10+'px;BORDER-TOP: #efefef 1px solid; FONT-SIZE: 12px;  BORDER-LEFT: #efefef 1px solid; BORDER-RIGHT: #efefef 1px solid;" bgcolor=#' + vWeekdayColor + ' align=center width:'+vColWidth+'px><div style="width: '+vColWidth+'px">Qtr. ' + vQuarterArr[vTmpDate.getMonth()] + '</div></td>';
	                     if( vCurrDate >= vTmpDate && vCurrDate < vNxtDate ) 
	                        vItemRowStr += '<td class="ghead" style="height:29px;width: '+vColWidth+10+'px;BORDER-TOP: #efefef 1px solid; FONT-SIZE: 12px; BORDER-LEFT: #efefef 1px solid; BORDER-RIGHT: #efefef 1px solid;" bgcolor=#' + vWeekdayColor + ' align=center><div style="width: '+vColWidth+'px">&nbsp&nbsp</div></td>';
	                     else 
	                        vItemRowStr += '<td class="ghead" style="height:29px;width: '+vColWidth+10+'px;BORDER-TOP: #efefef 1px solid; FONT-SIZE: 12px; BORDER-LEFT: #efefef 1px solid; BORDER-RIGHT: #efefef 1px solid;" align=center><div style="width: '+vColWidth+'px">&nbsp&nbsp</div></td>';
	                  }

	                  vTmpDate.setDate(vTmpDate.getDate() + 81);

	                  while(vTmpDate.getDate() > 1) 
	                  {
	                     vTmpDate.setDate(vTmpDate.getDate() + 1);
	                  }

	               }
	            }

	            ls += vDateRowStr + '</TR>';
	           ls += '</TABLE>';
	            
	           ls+= '<DIV class=scroll3 id=rightside  style="position:relative;">';
	            if(rowPArray.length > 0)
	  	      {
	          for(var i=0;i<rowPArray.length;i++)
	  		 {
	  		  
	  	         
	  	        drowLRowData(rowPArray[i],vTmpDate,vMinDate,vChartWidth,vItemRowStr,vDateRowStr,vDateDisplayFormat,vTaskLeft,vTaskRight,vDayWidth+1,vColUnit,'');
                
	  	      }
	  	      }
	            else{
	            	
	        			for(var i=0;i<10;i++)
	        			{
	        				 ls += '<DIV><TABLE  class="list_table"  style="position:relative; border:0px ; width: ' + vChartWidth + 'px;" cellSpacing=0 cellPadding=0 border=0>' +
	        	                '<TR   >' + vItemRowStr + '</TR></TABLE></DIV>';
	        			}
	        		
	            	
	            }
	            
	            
	            if(rowPArray.length > 0)
	            {
	            	var num=rowPArray.length+rowArray.length;
	    			if(num<10)
	    			{
	    				var num2=10-num;
	    				for(var i=0;i<num2;i++)
	    				{
	    					 ls += '<DIV><TABLE  class="list_table"  style="position:relative; border:0px ;  width: ' + vChartWidth + 'px;" cellSpacing=0 cellPadding=0 border=0>' +
	        	                '<TR   >' + vItemRowStr + '</TR></TABLE></DIV>';
	    				}
	    			}
	    			else
	    			{
	    				 ls += '<DIV><TABLE  class="list_table"  style="position:relative; border:0px ; width: ' + vChartWidth + 'px;" cellSpacing=0 cellPadding=0 border=0>' +
     	                '<TR   >' + vItemRowStr + '</TR></TABLE></DIV>';
	    				
	    			}
	            }
	           
	             ls= ls + '</div></BODY></HTML>';
	            
	      
		
	};
	
	
	
	
	
	
	CalcTaskXY = function () 
    {
      
       var vTaskDiv,vBarDiv,vBarDiv;
       var vParDiv;
       var vLeft, vTop, vHeight, vWidth;
       var  vID ;
       if(rowPArray.length > 0)
	      {
       for(var i=0;i<rowPArray.length;i++)
		 {
		  
    	  vID = rowPArray[i].id;
           vTaskDiv = document.getElementById("taskbar_"+vID);
           vBarDiv  = document.getElementById("bardiv_"+vID);
           vParDiv  = document.getElementById("childgrid_"+vID); 
           if(vBarDiv) {
        	  
        	   rowPArray[i].sx=vBarDiv.offsetLeft;
        	   rowPArray[i].sy=vParDiv.offsetTop+vBarDiv.offsetTop+6 ;
        	   rowPArray[i].ex=vBarDiv.offsetLeft + vBarDiv.offsetWidth ;
        	   rowPArray[i].ey= vParDiv.offsetTop+vBarDiv.offsetTop+6;
            }
	      }
	      }
       
       if(rowArray.length > 0)
	      {
       for(var k=0;k<rowArray.length;k++)
		{
		 
    	    vID = rowArray[k].id;
             vTaskDiv = document.getElementById("taskbar_"+vID);
             vBarDiv  = document.getElementById("bardiv_"+vID);
             vParDiv  = document.getElementById("childgrid_"+vID); 
             if(vBarDiv) {
        	   rowArray[k].sx=vBarDiv.offsetLeft ;
        	   rowArray[k].sy= vParDiv.offsetTop+vBarDiv.offsetTop+6 ;
        	   rowArray[k].ex=vBarDiv.offsetLeft + vBarDiv.offsetWidth ;
        	   rowArray[k].ey=vParDiv.offsetTop+vBarDiv.offsetTop+6 ;
              }
			  
		    
	   }}
       
       
    };

	
	//计算线的方向
    drawDependency =function(x1,y1,x2,y2)
    {
       if(x1 + 10 < x2)
       { 
          sLine(x1,y1,x1+4,y1);
          sLine(x1+4,y1,x1+4,y2);
          sLine(x1+4,y2,x2,y2);
          dLine(x2,y2,x2-3,y2-3);
          dLine(x2,y2,x2-3,y2+3);
          dLine(x2-1,y2,x2-3,y2-2);
          dLine(x2-1,y2,x2-3,y2+2);
       }
       else
       {
          sLine(x1,y1,x1+4,y1);
          sLine(x1+4,y1,x1+4,y2-10);
          sLine(x1+4,y2-10,x2-8,y2-10);
          sLine(x2-8,y2-10,x2-8,y2);
          sLine(x2-8,y2,x2,y2);
          dLine(x2,y2,x2-3,y2-3);
          dLine(x2,y2,x2-3,y2+3);
          dLine(x2-1,y2,x2-3,y2-2);
          dLine(x2-1,y2,x2-3,y2+2);
       }
    };
	
	//画线
    sLine = function(x1,y1,x2,y2) {

        vLeft = Math.min(x1,x2);
        vTop  = Math.min(y1,y2);
        vWid  = Math.abs(x2-x1) + 1;
        vHgt  = Math.abs(y2-y1) + 1;

    vDoc = document.getElementById("rightside");

	 // retrieve DIV
	 var oDiv = document.createElement('div');

	 oDiv.id = "line"+vDepId++;
        oDiv.style.position = "absolute";
	 oDiv.style.margin = "0px";
	 oDiv.style.padding = "0px";
	 oDiv.style.overflow = "hidden";
	 oDiv.style.border = "0px";

	 // set attributes
	// oDiv.style.zIndex = 0;
	 oDiv.style.backgroundColor = "red";
	
	 oDiv.style.left = vLeft + "px";
	 oDiv.style.top = vTop + "px";
	 oDiv.style.width = vWid + "px";
	 oDiv.style.height = vHgt + "px";

	 oDiv.style.visibility = "visible";
	
	 vDoc.appendChild(oDiv);

     };
     dLine = function(x1,y1,x2,y2) {

         var dx = x2 - x1;
         var dy = y2 - y1;
         var x = x1;
         var y = y1;

         var n = Math.max(Math.abs(dx),Math.abs(dy));
         dx = dx / n;
         dy = dy / n;
         for ( i = 0; i <= n; i++ )
         {
            vx = Math.round(x); 
            vy = Math.round(y);
            this.sLine(vx,vy,vx,vy);
            x += dx;
            y += dy;
         }

      }
    
    clearDependencies = function()
    {
       var parent = document.getElementById('rightside');
       var depLine;
       var vMaxId = vDepId;
       for ( i=1; i<vMaxId; i++ ) {
          depLine = document.getElementById("line"+i);
          if (depLine) { parent.removeChild(depLine); }
       }
       vDepId = 1;
    };
	
	
    //切换视图
    this.change=function(dateType)
	{

		
       
		setFormat(dateType);

		this.DrawDependencies();

		
	
	 
	 };
	 
	 
	 
	 //画线
	 DrawDepen= function () {

	       
		   //计算线坐标
	       CalcTaskXY();
           //清除画线
	       clearDependencies();

	       
	        if(rowPArray.length > 0)
	   	 {
	        
	        for(var i=0;i<rowPArray.length;i++)
			 {
			  
	   	       
	   	     var  pDepend = rowPArray[i].vDepend;
	   	      if(pDepend) {
	   	    	 
	   	    	var vDependStr = pDepend + '';
	            var vDepList = vDependStr.split(',');
	            var n = vDepList.length;
	            if(rowPArray[i].display==''){
	            	
	            	 for(var k=0;k<n;k++) {
	                     var vTask =getArrayLocationByID(vDepList[k]);
	                     
	                     if(vTask!=null && vTask.display=='' )
	                     {
	                     	drawDependency(vTask.ex,vTask.ey,rowPArray[i].sx-1,rowPArray[i].sy);
	                     }
	                        
	                  }
	                 
	                 
	     	      }
	            }
	           
			 }
	   	 }
	        
	        if(rowArray.length > 0)
	   	 {
	   	 for(var i=0;i<rowArray.length;i++)
	   	 {
	        
	   		 var pDepend = rowArray[i].vDepend;
	  	      if(pDepend) {
	  	    
	  	    	var vDependStr = pDepend + '';
	           var vDepList = vDependStr.split(',');
	           var n = vDepList.length;
	           if(rowArray[i].display=='')
	           {
	        	   for(var k=0;k<n;k++) {
	                   var vTask = getArrayLocationByID(vDepList[k]);
	                     
	                   if(vTask!=null && vTask.display=='' )
	                   {
	                	  drawDependency(vTask.ex,vTask.ey,rowArray[i].sx-1,rowArray[i].sy); 
	                   }
	                     
	                } 
	           }
	           
	           
	           
		      }
			 }
	  	 }
	 
	        
	     };
	 
	
   this.DrawDependencies = function () {

       
	   //计算线坐标
       CalcTaskXY();
      //清除画线
       clearDependencies();

        
        if(rowPArray.length > 0)
   	 {
        
        for(var i=0;i<rowPArray.length;i++)
		 {
		  
   	       
   	     var  pDepend = rowPArray[i].vDepend;
   	      if(pDepend) {
   	    	 
   	    	var vDependStr = pDepend + '';
            var vDepList = vDependStr.split(',');
            var n = vDepList.length;
            if(rowPArray[i].display==''){
            	
            	 for(var k=0;k<n;k++) {
                     var vTask =getArrayLocationByID(vDepList[k]);
                     
                     if(vTask!=null && vTask.display=='' )
                     {
                     	drawDependency(vTask.ex,vTask.ey,rowPArray[i].sx-1,rowPArray[i].sy);
                     }
                        
                  }
                 
                 
     	      }
            }
           
		 }
   	 }
        
        if(rowArray.length > 0)
   	 {
   	 for(var i=0;i<rowArray.length;i++)
   	 {
        
   		 var pDepend = rowArray[i].vDepend;
  	      if(pDepend) {
  	    
  	    	var vDependStr = pDepend + '';
           var vDepList = vDependStr.split(',');
           var n = vDepList.length;
           if(rowArray[i].display=='')
           {
        	   for(var k=0;k<n;k++) {
                   var vTask = getArrayLocationByID(vDepList[k]);
                     
                   if(vTask!=null && vTask.display=='' )
                   {
                	  drawDependency(vTask.ex,vTask.ey,rowArray[i].sx-1,rowArray[i].sy); 
                   }
                     
                } 
           }
           
           
           
	      }
		 }
  	 }
 
        
     };
	
    
     getArrayLocationByID = function(pId)  {
    	 if(rowPArray.length > 0)
    	 {
    		 for(var i=0;i<rowPArray.length;i++)
    		 {
        		 if(rowPArray[i].id==pId)
        		 {
        			 return rowPArray[i];
        		 }
    		 }
    	 }
    	 if(rowArray.length > 0)
    	 {
    	 for(var k=0;k<rowArray.length;k++)
    	 {
    		 
    		 if(rowArray[k].id==pId)
    		 {
    			 return rowArray[k];
    		 }
    	 }
    	 }
    	 return null;
      };
    
    
	
	
	
	getMinDate = function getMinDate(xminDate, pFormat)  
    {
		 var vDate;
		if(xminDate=="")
		{
			vDate=new Date();
			vDate=$D($D(vDate).strftime('%Y-%m-%d'));
		}
		else
		{
			vDate = $D(xminDate);
		}
			
		//  var vDateParts = xminDate.split('-');
      
    
    // vDate.setFullYear(parseInt(vDateParts[0], 10), parseInt(vDateParts[1], 10) - 1, parseInt(vDateParts[2], 10),0,0,0);

     
       if ( pFormat== 'minute')
       {
          vDate.setHours(0);
          vDate.setMinutes(0);
       }
		 else if (pFormat == 'hour' )
       {
          vDate.setHours(0);
          vDate.setMinutes(0);
       }
      
       else if (pFormat=='day')
       {
          vDate.setDate(vDate.getDate() - 1);
          while(vDate.getDay() % 7 > 0)
          {
              vDate.setDate(vDate.getDate() - 1);
          }

       }

       else if (pFormat=='week')
       {
          vDate.setDate(vDate.getDate() - 7);
          while(vDate.getDay() % 7 > 0)
          {
              vDate.setDate(vDate.getDate() - 1);
          }

       }

       else if (pFormat=='month')
       {
          while(vDate.getDate() > 1)
          {
              vDate.setDate(vDate.getDate() - 1);
          }
       }

       else if (pFormat=='quarter')
       {
          if( vDate.getMonth()==0 || vDate.getMonth()==1 || vDate.getMonth()==2 )
             vDate.setFullYear(vDate.getFullYear(), 0, 1);
          else if( vDate.getMonth()==3 || vDate.getMonth()==4 || vDate.getMonth()==5 )
             vDate.setFullYear(vDate.getFullYear(), 3, 1);
          else if( vDate.getMonth()==6 || vDate.getMonth()==7 || vDate.getMonth()==8 )
             vDate.setFullYear(vDate.getFullYear(), 6, 1);
          else if( vDate.getMonth()==9 || vDate.getMonth()==10 || vDate.getMonth()==11 )
             vDate.setFullYear(vDate.getFullYear(), 9, 1);

       }
       
       return(vDate);

    };
	
	
	
	
    getMaxDate = function (xmaxDate, pFormat,vminDate)
    {
    	 
    	   var vDate ;
    	if(xmaxDate=='')
    	{
    		
    		vDate=$D( formatDateStr(vminDate,"yyyy-mm-dd")).add(15);
    		
    	}else
    	{
    		vDate = $D(xmaxDate);
    	}
        
          

          
             
    	     if (pFormat == 'minute')
             {
                vDate.setHours(vDate.getHours() + 1);
                vDate.setMinutes(59);
             }	
    	     
             if (pFormat == 'hour')
             {
                vDate.setHours(vDate.getHours() + 2);
             }				
    				
             // Adjust max date to specific format boundaries (end of week or end of month)
             if (pFormat=='day')
             {
                vDate.setDate(vDate.getDate() + 1);

                while(vDate.getDay() % 6 > 0)
                {
                    vDate.setDate(vDate.getDate() + 1);
                }

             }

             if (pFormat=='week')
             {
                //For weeks, what is the last logical boundary?
                vDate.setDate(vDate.getDate() + 11);

                while(vDate.getDay() % 6 > 0)
                {
                    vDate.setDate(vDate.getDate() + 1);
                }

             }

             // Set to last day of current Month
             if (pFormat=='month')
             {
                while(vDate.getDay() > 1)
                {
                    vDate.setDate(vDate.getDate() + 1);
                }

                vDate.setDate(vDate.getDate() - 1);
             }

             // Set to last day of current Quarter
             if (pFormat=='quarter')
             {
                if( vDate.getMonth()==0 || vDate.getMonth()==1 || vDate.getMonth()==2 )
                   vDate.setFullYear(vDate.getFullYear(), 2, 31);
                else if( vDate.getMonth()==3 || vDate.getMonth()==4 || vDate.getMonth()==5 )
                   vDate.setFullYear(vDate.getFullYear(), 5, 30);
                else if( vDate.getMonth()==6 || vDate.getMonth()==7 || vDate.getMonth()==8 )
                   vDate.setFullYear(vDate.getFullYear(), 8, 30);
                else if( vDate.getMonth()==9 || vDate.getMonth()==10 || vDate.getMonth()==11 )
                   vDate.setFullYear(vDate.getFullYear(), 11, 31);

             }
           
             return(vDate);
             
          };
	
	
	
          formatDateStr = function(pDate,pFormatStr) {
              vYear4Str = pDate.getFullYear() + '';
        	   vYear2Str = vYear4Str.substring(2,4);
              vMonthStr = (pDate.getMonth()+1) + '';
              vDayStr   = pDate.getDate() + '';

             var vDateStr = "";	

             switch(pFormatStr) {
       	        case 'mm/dd/yyyy':
                      return( vMonthStr + '/' + vDayStr + '/' + vYear4Str );
       	        case 'dd/mm/yyyy':
                      return( vDayStr + '/' + vMonthStr + '/' + vYear4Str );
       	        case 'yyyy-mm-dd':
                      return( vYear4Str + '-' + vMonthStr + '-' + vDayStr );
       	        case 'mm/dd/yy':
                      return( vMonthStr + '/' + vDayStr + '/' + vYear2Str );
       	        case 'dd/mm/yy':
                      return( vDayStr + '/' + vMonthStr + '/' + vYear2Str );
       	        case 'yy-mm-dd':
                      return( vYear2Str + '-' + vMonthStr + '-' + vDayStr );
       	        case 'mm/dd':
                      return( vMonthStr + '/' + vDayStr );
       	        case 'dd/mm':
                      return( vDayStr + '/' + vMonthStr );
             }		 
       	  
       };
	
	
	
	
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