// ==UserScript==
// @name        leanote_repair_navigation
// @namespace   https://github.com/jsgscat/greasemonkey
// @include     https://leanote.com/note/*
// @version     1.02
// @grant       none
// @downloadURL https://rawgit.com/jsgscat/greasemonkey/master/leanote_repair_navigation/leanote_repair_navigation.user.js
// @updateURL   https://rawgit.com/jsgscat/greasemonkey/master/leanote_repair_navigation/leanote_repair_navigation.user.js
// ==/UserScript==

// 加载jquery
// var script = document.createElement('script');
// script.type = "text/javascript";
// script.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1.8.0/jquery.min.js';
// document.body.appendChild(script);
// document.getElementsByTagName('head')[0].appendChild(script);

// $("<scri"+"pt>"+"</scr"+"ipt>").attr({src:'http://code.jquery.com/jquery-latest.js',type:'text/javascript',id:'load'}).appendto($('head').remove('#loadscript'));

// document.write('<script src="http://code.jquery.com/jquery-latest.js" type="text/javascript"></script>');

// jQuery.getScript("http://code.jquery.com/jquery-latest.js");

// slimScroll 鼠标滚轮滑动太快
// console.log('%O', document.getElementsByClassName('slimScrollDiv')[1]);
// console.log('%O', document.getElementsByClassName('slimScrollDiv')[1]);
// console.log(document.getElementsByClassName('slimScrollDiv')[1].outerHTML);
var DEBUG = false;

dfs();

function dfs() {
    if (document.getElementsByTagName('h1').length <= 2) {
        if (DEBUG) {
            console.log('wait 500.');
        }
        setTimeout(dfs, 500);
    } else {
        if (DEBUG) {
            console.log('wait dfs completed.');
        }
        main();
        noteClick();
        notebookClick();
        setTimeout(main, 1000);
    }
}


function notebookClick() {
    $(".level0").click(function() {
        waitNotebook(document.getElementsByTagName('h1')[1].innerHTML);
    });
}


function waitNotebook(h1) {
    if (document.getElementsByTagName('h1')[1].innerHTML == h1) {
        if (DEBUG) {
            console.log('waitNotebook 100.');
        }
        setTimeout(function() {
            waitNotebook(h1);
        }, 100);
    } else {
        if (DEBUG) {
            console.log('waitNotebook completed.');
        }
        noteClick();
        main();
        setTimeout(main, 1000);
    }
}


function noteClick() {
    // $('div[class = ".item item-my"]').click(alert('hey.'));
    $(".item.item-my").click(function() {
        waitNote(document.getElementsByTagName('h1')[1].innerHTML);
        setTimeout(main, 1000);
    });
}


function waitNote(h1) {
    if (document.getElementsByTagName('h1')[1].innerHTML == h1) {
        if (DEBUG) {
            console.log('waitNote 100.');
        }
        setTimeout(function() {
            waitNote(h1);
        }, 100);
    } else {
        if (DEBUG) {
            console.log('waitNote completed.');
        }
        main();
    }
}


function main() {
    if (DEBUG) {
        console.log('begin');
    }

    var mapTitle = new Array();
    var h1 = document.getElementsByTagName('h1');
    for (var i = 0; i < h1.length; ++i) {
        mapTitle[h1[i].id] = 'h1' + i;
        h1[i].id = 'h1' + i;
    }

    var h2 = document.getElementsByTagName('h2');
    for (var i = 0; i < h2.length; ++i) {
        mapTitle[h2[i].id] = 'h2' + i;
        h2[i].id = 'h2' + i;
    }

    var h3 = document.getElementsByTagName('h3');
    for (var i = 0; i < h3.length; ++i) {
        mapTitle[h3[i].id] = 'h3' + i;
        h3[i].id = 'h3' + i;
    }

    var h4 = document.getElementsByTagName('h4');
    for (var i = 0; i < h4.length; ++i) {
        mapTitle[h4[i].id] = 'h4' + i;
        h4[i].id = 'h4' + i;
    }

    var editor = document.getElementsByClassName('preview-container')[0];
    var links = document.getElementsByTagName('a');
    for (var i = 0; i < links.length; ++i) {
        var po = links[i].href.indexOf('#');
        if (po >= 0) {
            //console.log('%O', links[i]);
            //console.log(links[i].href);
            //console.log('decode', decodeURIComponent(links[i].href));
            //console.log(decodeURI(links[i].href));
            //console.log('content', decodeURIComponent(links[i].href).substr(po + 1));
            var nSite = mapTitle[decodeURIComponent(links[i].href).substr(po + 1)];
            //console.log('new site: ', nSite); //2 toc, 显示2次
            if (nSite != null) {
                //links[i].href = '#' + nSite;
                //links[i].href = "javascript:void(0);"; //会跳到空白网页
                links[i].href = "#";
                //console.log('out: ', links[i].outerHTML);

                // 直接跳转目标，没有动画 scrollTop=
                // links[i].outerHTML = links[i].outerHTML.replace('<a', '<a onclick="document.getElementsByClassName(' + "'preview-container'" + ")[0].scrollTop = " + document.getElementById(nSite).offsetTop + ';" ');

                // 直接跳转目标，没有动画 scrollTo(0, y)
                //links[i].outerHTML = links[i].outerHTML.replace('<a', '<a onclick="document.ge tElementsByClassName(' + "'preview-container'" + ")[0].scrollTo(0," + document.getElementById(nSite).offsetTop + ');" ');

                // 使用$选择目标才能成功
                // links[i].outerHTML = links[i].outerHTML.replace('<a', '<a onclick="document.getElementsByClassName(' + "'preview-container'" + ")[0].animate({scrollTop:" + document.getElementById(nSite).offsetTop + '}, 2000);" ');

                links[i].outerHTML = links[i].outerHTML.replace('<a', '<a onclick="$(' + "'.preview-container'" + ").animate({scrollTop:" + document.getElementById(nSite).offsetTop + '}, 500);" ');

                // 点击隐藏元素 - 测试是否引入了jquery.js文件
                // links[i].outerHTML = links[i].outerHTML.replace('<a', '<a onclick="$(this).hide()' + ';" ');

                // FUNCTION 失败，改为使用outerHTML
                // links[i].onclick = function() {
                //     console.log(nSite);
                //     //console.log(document.getElementById(nSite).offsetTop);
                //     document.getElementsByClassName('preview-container')[0].scrollTop = document.getElementById(nSite).offsetTop;
                // }
            }
        }
    }

    // 标题css
    $('h1:not(:last)').css({
        'font-size': '48px',
        'text-align': 'center',
        'padding': '20px',
        'margin': '20px'
    });
    $('h2').css({
        'border-left': '10px solid #089DFF',
        'padding': '10px 0 10px 10px',
        'margin': '30px 0px 30px 0px',
        'background-color': '#f7f7f7',
    });

    // 代码编辑器css
    $('code.prettyprint, pre.prettyprint').css({
        'background-color': '#000000e6',
    });

    $('code.prettyprint .str, pre.prettyprint .str').css({
        'color': '#65B02E'
    });

    $('code.prettyprint .kwd, pre.prettyprint .kwd').css({
        'color': '#3b6aff'
    });

    $('code.prettyprint .pln, pre.prettyprint .pln').css({
        'color': '#ffffff'
    });

    // var pp = document.createElement('span');
    // pp.innerHTML = '000';
    // pp.onclick = function() {
    //     pp.innerHTML = '1111';
    //     console.log(document.getElementsByClassName('preview-container')[0].scrollTop);
    //     console.log(document.getElementById('h12').offsetTop);
    //     document.getElementsByClassName('preview-container')[0].scrollTop = document.getElementById('h12').offsetTop;
    // };
    // document.getElementById('newMyNote').appendChild(pp);

    if (DEBUG) {
        console.log('end');
    }
}
