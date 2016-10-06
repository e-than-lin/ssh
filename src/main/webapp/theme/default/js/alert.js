/** 显示一条提示信息 */
function __popup($msg, $time, $win) {
  _messageMgr.popup($msg, $time, $win);
}

/** 显示正在操作中 */
function __waitx($msg, $win) {
  return _messageMgr.wait($msg, $win);
}

function __unwaitx($uuid) {
  _messageMgr.unwait($uuid);
}

var _jumpKey = null;
/**
 * jump page
 */
function __jump($win) {
  if (_jumpKey!=null) {
    __unJump();    
  }
  //  屏蔽浏览器  页面正在跳转中...  信息提示
 // _jumpKey = _messageMgr.wait("页面正在跳转中...", $win);
}

/**
 * kill jump lock call from pageloaded
 */
function __unJump() {
  if (_jumpKey!=null) {
    _messageMgr.unwait(_jumpKey);
    _jumpKey = null;
  }
}

var _messageMgr = new MessageMgr();

/** 提示信息管理类 */
function MessageMgr() {
  var _pool = []; //可用的对象池
  var _actives = []; //正在使用的
  var _waits = [];
  var _waitCount = 1;

  /** 弹出一个提示信息的层 */
  this.popup = popup;

  function popup($msg, $time, $win) {
    getThread().show($msg, $time, $win);
  };

  /** 屏蔽所有操作并显示正在操作中 */
  this.wait = wait;
  function wait($msg, $win) {
    _waitCount++;
    var t = getThread();
    _waits[_waitCount] = t;
    t.wait($msg, $win);
    return _waitCount;
  };

  /** 操作结束 */
  this.unwait = unwait;

  function unwait($uuid) {
	  try{
	    var t = _waits[$uuid*1];
	    if (t==null) {
	      return;
	    }
	    t.unwait();
	    _waits[$uuid] = null;
	  }catch(e){}
  };

  /** 获得一个可用的对象 */
  function getThread() {
	  try{
	    var t = _pool.pop();
	    if (t==null) {
	      t = new MsgThread();
	    }
	    _actives.push(t);
	    return t;
	  }catch(e){}
  }

  /** 线程结束 */
 
}

var __DIV_TOP = 300;
/**
 * 按指定的参数对对象显示缩放的动画
 * 线程类，使用一个Thread即New来调用
 * @author:TANTOM in SH.Erry
 */
function MsgThread() {
  this.zoomOut = zoomOut;
  this.zoomIn = zoomIn;
  this.show = show;
  this.wait = wait;
  this.unwait = unwait;
  this.topDiv = topDiv;

  var _iT = null;
  var _iT2 = null;
  var _dom = null;
  var _domC = null;
  var _step = null;
  var _time = null;
  var _rect = null;
  var _iS = null;
  var _os = null;
  var _hide = null;
  var _pos = null;
  var _cs = null;
  var _ff = null;

  var _domMsg = null;
  var _domMsgContent = null;
  var _domBtnContainer = null;
  var _domBtnSure = "<span tt.type=A style=\"padding:2 20 2 20;display:inline;border:1px solid #808080;cursor:default\">确 定</span>";
  var _domBtnA = null;
  var _node = null;
  var _bZooming = false;
  var _delay = null;
  var _activeDoc = null;
  var _activeAction = null;



  function topDiv() {
    _node.style.zIndex = __DIV_TOP++;
  }

  /**
   * 获得一个基础Panel的代码
   * @return String
   */
  function getPanelHtml() {
    var n = document.createElement("DIV");
    n.style.padding = "2px";
    n.style.filter = "DropShadow(Color=#bbbbbb, OffX=2, OffY=2, Positive=45)";
    n.style.position = "absolute";
    n.style.display = "none";
    n.style.zIndex = __DIV_TOP;



    var s = "<div style='padding:0px;font-family:Tahoma;font-size:12px;border:1px solid #3e3e3e;background-color:#f5f5f5;'>" +
            "<div style='padding:0px;'>" +
            "<div style='padding:1px' ></div><div align=center style='padding:5px'></div></div></div>";

    n.innerHTML = s;
    __DIV_TOP++;
    return n;
  }

  /**
   * 显示提示信息
   * @param objModel 相关的配置信息都放在这个模型当中
   * @return void
   */
  var _ins = null;
  var _win = null;
  function show($msg, $delay, $win) {

    _quickMode = false;
    _win = $win;
    if (_node!=null) {
      document.body.removeChild(_node);
    }
    
    if (typeof(_win.__glass)!="undefined") {
      _win.__glass();
    }

    _node = getPanelHtml();
    _domMsg = _node;
    _domMsgContent = _domMsg.children[0].children[0].children[0];
    _domBtnContainer = _domMsg.children[0].children[0].children[1];
      
    //原有的造成滚动条出现2007.8.20
    document.body.insertAdjacentElement("afterBegin", _node);


    var str = $msg + "";
    str = str.replace(/\n/g, "<br>");

    _delay = $delay;
    _iS = 1;
    _bZooming = false;
    _domMsgContent.innerHTML = "<table width=200><tr><td align=center style='color:#6f6f6f;letter-spacing:2px'><img align=absbottom src=" + _c + "/img/juice/info.gif> &nbsp;" + str + "</td></tr></table>";

    _domBtnContainer.innerHTML = _domBtnSure;
    _domBtnA = _domBtnContainer.children[0];
    _domBtnA.style.display = "";
    _domBtnA.attachEvent("onmouseover", overBtnA);
    _domBtnA.attachEvent("onmouseout", outBtnA);

    var iCount = _messageMgr.getActiveCount();
    _domMsg.children[0].children[0].style.visiblity = "visible";
    _domMsg.children[0].children[0].style.display = "";
    _domMsg.style.display = "";

    center(_domMsg, new Position(0 + 10*iCount, 50 + 10*iCount));

    _domMsg.style.visiblity = "visible";
    _domBtnA.attachEvent("onmousedown", btnSureEvent);
    _ins = this;

    zoomOut(zoomFinish, _domMsg.children[0], _domMsg, _domMsg.children[0].children[0], 20, 1);
  }

  var _quickMode = false; //wait方式是直接显示，不以动画方式显示
  /** 显示正在操作中 */
  function wait($msg, $win) {
    _quickMode = true;
    _win = $win;
    if (_node!=null) {
      document.body.removeChild(_node);
    }

    if (typeof(_win.__glass)!="undefined") {
      _win.__glass();
    }

    _node = getPanelHtml();
    _domMsg = _node;
    _domMsgContent = _domMsg.children[0].children[0].children[0];
    _domBtnContainer = _domMsg.children[0].children[0].children[1];

    //原有的造成滚动条出现2007.8.20  
    document.body.insertAdjacentElement("afterBegin", _node);

    var str = $msg + "";
    str = str.replace(/\n/g, "<br>");

    //超时时间为15秒，没可能要15秒才执行完的
    _delay = 15;
     _iS = 1;
    _bZooming = false;
    var cimg = "info.gif";
    var bCust = false;
    var custParams = null;
    if ($msg.indexOf("跳转")!=-1) {
      cimg = "jump.gif";
    } else if ($msg.indexOf("操作正在")!=-1) {
      cimg = "waiting.gif";
    } else if ($msg.indexOf("|")!=-1) {
      var ctmp = $msg.split("|");
      cimg = ctmp[1];
      str = ctmp[0];
    } else if ($msg.indexOf("~")!=-1) {
      bCust = true;
      custParams = $msg.split("~");
    }

    if (bCust) {
      if (custParams.length==2) {
        _domMsgContent.innerHTML = custParams[0];
      }else {
        _domMsgContent.innerHTML = "<table width=200><tr><td align=center style='color:#cc0000;letter-spacing:2px;font-weight:bold' nowrap><img align=absbottom src=" + _c + "/img/juice/waiting.gif> &nbsp;" + custParams[0] + "</td></tr></table>"
      }
    }else {
      _domMsgContent.innerHTML = "<table width=200><tr><td align=center style='color:#6f6f6f;letter-spacing:2px;font-weight:bold' nowrap><img align=absbottom src=" + _c + "/img/juice/" + cimg + "> &nbsp;" + str + "</td></tr></table>";
    }

    _domBtnContainer.innerHTML = _domBtnSure;
    _domBtnA = _domBtnContainer.children[0];
    _domBtnA.style.display = "none";

    var iCount = 0;
    _domMsg.children[0].children[0].style.visiblity = "visible";
    _domMsg.children[0].children[0].style.display = "";      
    _domMsg.style.display = "";
    center(_domMsg, new Position(0 + 10*iCount, 50 + 10*iCount));

    _domMsg.style.visiblity = "visible";
    _ins = this;
    if (bCust) {
      _iT2 = setTimeout(unwaitZoomClose, custParams[1]*1000);
    }else {
      _iT2 = setTimeout(unwaitZoomClose, _delay*1000);
    }
  }

  /** 取消等待 */
  function unwait() {
    clearTimeout(_iT2);
    unwaitZoomClose();
  }

  function unwaitZoomClose() {
    _domMsg.style.display = "none";

    if (typeof(_win.__unglass)!="undefined") {
      try {
        _win.__unglass();
      }catch(e) {
      }
    }
    _messageMgr.popupDone(_ins);
  }

  /**
   * 将一个层对象至于页面的中间
   * @param domObj 需要至中的对象
   * @param posFix 修正参数
   * @return void
   */
  function center($domObj, $posFix) {

    centerCore(document.body, $domObj, $posFix);
  }

  /**
   * 将一个对象居中
   */
  function centerCore($area, $obj, $posFix) {
    if ($posFix==null)
      $posFix = new Position(0, 0);
    var bodyRect = __getRect($area);
    if (typeof(top.isLeftMenuShow)!="undefined") {
      var tf = top.isLeftMenuShow();
      if (tf) {
        bodyRect.w = bodyRect.w + 70;
      }
    }
    var objRect = __getRect($obj);
    var nX = (bodyRect.w - objRect.w) / 2;
    var nY = (bodyRect.h - objRect.h) / 2;
    var _os = $obj.style;
    var sT = document.body.scrollTop;
    var sL = document.body.scrollLeft;
    _os.left = nX - $posFix.x + sL;
    _os.top = nY - $posFix.y + sT;
  }

  function zoomFinish() {
     _iT2 = setTimeout(zoomClose, _delay*1000);
    /** 显示提示至中时就开放操作层 */
    if (typeof(_win.__unglass)!="undefined") {
      try {
      _win.__unglass();
      }catch(e){}
    }
  }

  /**
   * 确定按钮事件
   * @return void
   */
  function btnSureEvent() {
    _domBtnA.detachEvent("onmousedown", btnSureEvent);
    zoomIn(showDone, _domMsg.children[0], _domMsg, _domMsg.children[0].children[0], 20, 1);
    clearTimeout(_iT2);
  }

  function zoomClose() {
    if (_bZooming)
      return;
    var iCloseStep = _quickMode?1:20;
    zoomIn(showDone, _domMsg.children[0], _domMsg, _domMsg.children[0].children[0], iCloseStep, 1);
  }

  function showDone() {
    _domBtnA.detachEvent("onmousedown", btnSureEvent);
    /**
    if (typeof(_win.__unglass)!="undefined") {
      _win.__unglass();
    }
    */
    _messageMgr.popupDone(_ins);
  }

  /**
   * 开始缩放，会将对象由1*1开始缩放，分步为由1*1至原始
   * 大小将会分成多少步，而每步用多长时间使用iTime的设置
   * @param obj zoomout完成后执行的函数指针
   * @param domObj 缩放的对象
   * @param cHides 需要先隐藏的对象集合
   * @param domContainer 包含domObj的对象
   * @param iStep 分几步来缩放
   * @param iTime 每步使用的时长
   */
  function zoomOut($obj, $domObj, $domContainer, $domHide, $iStep, $iTime) {
    if (_bZooming)
      return;

    _bZooming = true;
    _iS = 1;
    _ff = $obj;
    _dom = $domObj;
    _step = $iStep;
    _time = $iTime;
    _hide = $domHide;
    _os = $domObj.style;
    _cs = $domContainer.style;
    _rect = __getRect($domContainer);
    _pos = __getPos($domContainer);

    _hide.style.display = "none";

    _os.width = 1;
    _os.height = 1;

    _iT = setInterval(animateOut, _time);
  }

  /**
   * 开始缩放，会将对象由1*1开始缩放，分步为由1*1至原始
   * 大小将会分成多少步，而每步用多长时间使用iTime的设置
   * @param obj zoomout完成后执行的函数指针
   * @param domObj 缩放的对象
   * @param cHides 需要先隐藏的对象集合
   * @param domContainer 包含domObj的对象
   * @param iStep 分几步来缩放
   * @param iTime 每步使用的时长
   */
  function zoomIn($obj, $domObj, $domContainer, $domHide, $iStep, $iTime) {
    if (_bZooming)
      return;

    _bZooming = true;
    _iS = 1;
    _ff = $obj;
    _dom = $domObj;
    _domC = $domContainer;
    _step = $iStep;
    _time = $iTime;
    _hide = $domHide;
    _os = $domObj.style;
    _cs = $domContainer.style;
    _rect = __getRect($domContainer);
    _pos = __getPos($domContainer);

    _hide.style.display = "none";

    _os.width = _rect.w;
    _os.height = _rect.h;

    _iT = setInterval(animateIn, _time);
  }

  /**
   * 循环运动
   * @return void
   */
  function animateOut() {
    var nW = _rect.w / _step * _iS;
    var nH = _rect.h / _step * _iS;
    var nX = _pos.x + (_rect.w - nW)/2;
    var nY = _pos.y + (_rect.h - nH)/2;

    _os.width = nW;
    _os.height = nH;
    _cs.left = nX;
    _cs.top = nY;

    if (_iS>=_step) {
      clearInterval(_iT);
      _hide.style.display = "";
      _bZooming = false;
      _ff();
      return;
    }
    _iS++;
  }

  /**
   * 循环运动
   * @return void
   */
  function animateIn() {
    var nW = _rect.w / _step * (_step-_iS);
    var nH = _rect.h / _step * (_step-_iS);
    var nX = _pos.x + (_rect.w - nW)/2;
    var nY = _pos.y + (_rect.h - nH)/2;

    _os.width = nW;
    _os.height = nH;
    _cs.left = nX;
    _cs.top = nY;

    if (_iS>=_step) {
      clearInterval(_iT);
      _domC.style.display = "none";
      _hide.style.display = "";
      _cs.left = _pos.x;
      _cs.top = _pos.y;
      _bZooming = false;
      _ff();
      return;
    }
    _iS++;
  }

  function overBtnA() {
    var obj = event.srcElement;
    obj.style.backgroundColor = "#ADB9D8";
  }

  function outBtnA() {
    var obj = event.srcElement;
    obj.style.backgroundColor = "transparent";
  }
}
/**
 * 提示信息的接口，显示给用户看到信息
 */
function __alert($msg) {
  var p = window.parent;
  if (p==null) {
    p = window;
  }
  if (typeof(top.__popup)!="undefined") {
    top.__popup($msg, 1.5, p);
  }else {
    alert($msg);
  }
}
