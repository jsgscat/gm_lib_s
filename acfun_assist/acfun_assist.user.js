// ==UserScript==
// @name        acfun_assist
// @namespace   https://github.com/jsgscat/greasemonkey
// @include     http://www.acfun.tv/*
// @version     1.03
// @grant       none
// @downloadURL https://rawgit.com/jsgscat/greasemonkey/master/acfun_assist/acfun_assist.user.js
// @updateURL   https://rawgit.com/jsgscat/greasemonkey/master/acfun_assist/acfun_assist.user.js
// ==/UserScript==

// 添加悬浮按钮，滚动页面不会消失
// append button 到页面div上，设置position的时候，搜索框会跟着移动
// 自己添加div，然后设置position为fixed（网上说absolute），最后添加子元素button

var div = document.createElement('div');
// div.setAttribute('style', 'position: fixed; top: 0; right: 0; z-index: 99;');
div.style = 'position: fixed; top: 0; left: 0; z-index: 99;';

var btSlow = document.createElement('button');
btSlow.id = btSlow;
btSlow.innerHTML = 'Slow';
btSlow.onclick = function() {
    $(document.documentElement).animate({scrollTop:document.getElementById('area-comment').offsetTop}, document.getElementById('area-comment').offsetTop * 10);
};
div.appendChild(btSlow);

var btStop = document.createElement('button');
btStop.id = btStop;
btStop.innerHTML = 'Stop';
btStop.onclick = function() {
    $(document.documentElement).stop();
};
div.appendChild(btStop);

var btFast = document.createElement('button');
btFast.id = btFast;
btFast.innerHTML = 'Comment';
btFast.onclick = function() {
    // $(document.documentElement).stop().animate({scrollTop:document.getElementById('area-comment').offsetTop}, 100);
    $(document.documentElement).stop().scrollTop(document.getElementById('area-comment').offsetTop);
    //$(document.documentElement).stop().scrollTop($('#area-comment').offset().top);
};
div.appendChild(btFast);

var btReturn = document.createElement('button');
btReturn.id = btReturn;
btReturn.innerHTML = 'Return';
btReturn.onclick = function() {
    // $(document.documentElement).stop().animate({scrollTop:0}, 100);
    $(document.documentElement).stop().scrollTop(0);
};
div.appendChild(btReturn);

document.documentElement.appendChild(div);