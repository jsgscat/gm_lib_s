// ==UserScript==
// @name        zhihu_assistant
// @namespace   https://github.com/jsgscat/greasemonkey
// @description 回答的导航栏
// @include     *www.zhihu.com/question/*
// @version     1
// @grant       none
// @downloadURL https://rawgit.com/jsgscat/greasemonkey/master/zhihu_assistant/zhihu_assistant.user.js
// @updateURL   https://rawgit.com/jsgscat/greasemonkey/master/zhihu_assistant/zhihu_assistant.user.js
// ==/UserScript==
var DEBUG = false;

// dfs();

setTimeout(main, 3000);

// function dfs() {
//     // 利用回答栏是否加载判断答案是否全部加载 - 不可行
//     if (document.getElementsByClassName('zm-editable-editor-outer').length == 0) {
//         console.log('dfs');
//         setTimeout(dfs, 100);
//     } else {
//         console.log('main');
//         if (DEBUG) {
//             main();
//         } else {
//             setTimeout(main, 3000);
//         }
//     }
// }

//var offsetTops = [];

function main() {
    DEBUG && console.log('begin');

    var div = document.createElement('div');
    div.style = 'position: fixed; top: 70px; left: 0; z-index: 99;';
    // div.setAttribute('style', 'position: fixed; top: 0; right: 0; z-index: 99;');

    document.documentElement.appendChild(div);

    var btHide = document.createElement('a');
    btHide.innerHTML = 'T';
    btHide.href = 'javascript:void(0)';
    btHide.onclick = function() {
        // $('#answerDivID').toggle();
        if (answerDiv.style.display !== 'none') {
            answerDiv.style.display = 'none';
        }
        else {
            answerDiv.style.display = 'block';
    }
    };
    div.appendChild(btHide);

    // var offsetTops = [];
    var btReturn = document.createElement('a');
    btReturn.innerHTML = ' ▲';
    btReturn.href = 'javascript:void(0)';
    btReturn.onclick = function() {
        var currentOffsetTop = document.documentElement.scrollTop;
        var lastOffsetTop = currentOffsetTop;
        for (var i = 0; i < offsetTops.length; ++i) {
            if (offsetTops[i] < currentOffsetTop) {
                lastOffsetTop = offsetTops[i];
            } else {
                //$(document.documentElement).stop();
                document.documentElement.scrollTop = lastOffsetTop;
                break;
            }
        }
    };
    div.appendChild(btReturn);

    var btFast = document.createElement('a');
    btFast.innerHTML = ' ▼';
    btFast.href = 'javascript:void(0)';
    btFast.onclick = function() {
        var currentOffsetTop = document.documentElement.scrollTop;
        for (var i = 0; i < offsetTops.length; ++i) {
            if (offsetTops[i] > currentOffsetTop) {
                //$(document.documentElement).stop();
                document.documentElement.scrollTop = offsetTops[i];
                break;
            }
        }
    };
    div.appendChild(btFast);

    DEBUG && console.log('button end.');

    // 直接跳转 href=#+id
    // 答案会跳转到顶部，会被导航栏遮住部分答案
    // innerHTML的方法有效
    // div.innerHTML = '<ul<li><a href="default.asp">Home</a></li><li><a href="news.asp">News</a></li><li><a href="contact.asp">Contact</a></li><li><a href="about.asp">About</a></li></ul>';

    // html()的方法没有效果
    // div.id = 'myNavDiv';
    // $('#myNavDiv').html('<ul<li><a href="default.asp">Home</a></li><li><a href="news.asp">News</a></li><li><a href="contact.asp">Contact</a></li><li><a href="about.asp">About</a></li></ul>');

    var answerDiv = document.createElement('div');
    div.appendChild(answerDiv);
    answerDiv.style = 'width: 70px; overflow: auto; color: #209fdd';
    answerDiv.style.height = (document.documentElement.clientHeight - headerOffset) * 0.9;

    window.onresize = function() {
        answerDiv.style.height = (document.documentElement.clientHeight - headerOffset) * 0.9 + 'px';
    };

    DEBUG && console.log('answerDiv end.');

    // 第二种方法：appendChild
    var answers = document.getElementsByClassName('AnswerItem-meta');
    DEBUG && console.log(answers.length, answers);


    // 计算每个答案的offsetTop，用于上下跳转的按钮
    var headerOffset = document.documentElement.getElementsByClassName('AppHeader-inner')[0].clientHeight;
    var offsetTops = [];
    for (var i = 0; i < answers.length; ++i) {
        var offsetTop = answers[i].offsetTop + answers[i].offsetParent.offsetTop - headerOffset;
        DEBUG && console.log('offsetParent, offset: ', answers[i].offsetParent.offsetTop, answers[i].offsetTop);
        offsetTops[i] = offsetTop;
    }

    DEBUG && console.log('offsetTops: ', offsetTops)

    var ul = document.createElement('ul');
    answerDiv.appendChild(ul);

    for (var i = 0; i < answers.length; ++i) {
        answers[i].id = 'answer' + i;

        // 第1种方法：修改innerHTML的onclick的匿名函数，在知乎失效，在其他网站（百度等）可用
        // divHtml += '<li><a href= "#" onclick="$(document.documentElement).animate({scrollTop:' + offsetTop + '}, ' + offsetTop * 10 + ');">' + answers[i].firstChild.data + '</a></li>';
        // 第2种方法：onclick="myFun()",所有网站都不能用。可能跟greasemonkey的安全机制有关。
        // 第3种方法：href.onclick=function(){},可用，但href无法和offsetTop绑定，所有href跳转的都是最后一个href的offsetTop。
        // 第4种方法：父容器.onclick=function (ev) {}，可用

        var li = document.createElement('li');

        var href1 = document.createElement('a');
        li.appendChild(href1);

        var authors = answers[i].getElementsByClassName('AuthorInfo-content')[0].getElementsByClassName('UserLink-link');
        if (authors.length > 0) {
            href1.innerHTML = authors[0].firstChild.data;
        } else {
            // 匿名用户的answers[i].getElementsByClassName('author-link')为空
            href1.innerHTML = '匿名';
            DEBUG && console.log('匿名:', authors);
        }
        //href1.innerHTML = (href1.innerHTML + '________').sub(6);
        // href1.href = '#';
        href1.href = 'javascript:void(0)';
        href1.id = 'href1_' + i;
        href1.style = 'font-size: 12px; display: inline-block; width: 36px; overflow: hidden; height: 15px;';

        var href2 = document.createElement('a');
        href2.innerHTML = ' ▶';
        // href2.href = '#';
        href2.href = 'javascript:void(0)';
        href2.id = 'href2_' + i;
        li.appendChild(href2);

        ul.appendChild(li);
    }

    var hrefs = ul.getElementsByTagName('a');
    ul.onclick = function (ev) {
        var ev = ev || window.event,
        target = ev.target || ev.srcElement;
        for (var i = 0, l = hrefs.length; i <l; i++) {
            if (hrefs[i] === target) {
                // offsetTop是指当前对象和offsetParent的距离
                var offsetTop = offsetTops[parseInt(hrefs[i].id.slice(6))];
                DEBUG && console.log(offsetTop);
                if (hrefs[i].id.slice(4, 5) == '1') {
                    //$(document.documentElement).stop();
                    document.documentElement.scrollTop = offsetTop;
                } else {
                    $(document.documentElement).stop().animate({scrollTop:offsetTop}, offsetTop);
                }
            }
        }
    }

    ul.onmouseover = function (ev) {
        var ev = ev || window.event,
        target = ev.target || ev.srcElement;
        for (var i = 0, l = hrefs.length; i <l; i++) {
            if (hrefs[i] === target) {
                hrefs[i].style.color = 'red';
            }
        }
    }

    ul.onmouseout = function (ev) {
        var ev = ev || window.event,
        target = ev.target || ev.srcElement;
        for (var i = 0, l = hrefs.length; i <l; i++) {
            if (hrefs[i] === target) {
                hrefs[i].style.color = '#209fdd';
            }
        }
    }

    DEBUG && console.log('all end.');
}



// 改写innerHtml
// console.log(1);
// var divHtml = '<ul>';
// var answers = document.getElementsByClassName('author-link');
// for (var i = 0; i < answers.length; ++i) {
//     console.log(i);
//     answers[i].id = 'answer' + i;

//     // 第一种方法：编辑html, onclick在知乎失效，在其他网站（百度等）可用
//     // divHtml += '<li><a href= "#" onclick="$(document.documentElement).animate({scrollTop:' + offsetTop + '}, ' + offsetTop * 10 + ');">' + answers[i].firstChild.data + '</a></li>';
//     //$(document.documentElement).animate({scrollTop:document.getElementById('area-comment').offsetTop}, document.getElementById('area-comment').offsetTop * 10);
//     divHtml += '<li><a href= "#" onclick="myfun()">' + answers[i].firstChild.data + '</a></li>';
// }
// function myfun() {
//     alert(12);
//     console.log(2);
// }
// divHtml += '<li><button onclick="javascript:window.myfun();">' + 'answers ' + '</button></li>';
// divHtml += '</ul>';
// console.log('%O',  divHtml );
// div.innerHTML = divHtml;
// document.documentElement.appendChild(div);
// console.log(5);


