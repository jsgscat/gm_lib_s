// ==UserScript==
// @name        leanote_blog_repair_navigation
// @namespace   https://github.com/jsgscat/greasemonkey
// @include     http://blog.leanote.com/post/mynote/*
// @version     1.02
// @grant       none
// @downloadURL https://rawgit.com/jsgscat/greasemonkey/master/leanote_blog_repair_navigation/leanote_blog_repair_navigation.user.js
// @updateURL   https://rawgit.com/jsgscat/greasemonkey/master/leanote_blog_repair_navigation/leanote_blog_repair_navigation.user.js
// ==/UserScript==
console.log('leanote_blog_repair_navigation begin');
// var toc = document.getElementsByClassName('toc');

console.log(document.body.clientHeight);
console.log(document.documentElement.clientHeight );

function dfs() {
    if (document.getElementsByClassName('nav-h1').length <= 0) {
        console.log('wait 500.');
        setTimeout(dfs, 500);
    } else {
        console.log('hey.');
        main();
    }
}

dfs();

/* Idea2 scrollTo */
function main() {
    var h1_anchor = document.getElementsByClassName('nav-h1');
    for (var i = 0; i < h1_anchor.length; ++i) {
        h1_anchor[i].childNodes[0].outerHTML = h1_anchor[i].childNodes[0].outerHTML.replace('scrollTo', 'window.scrollTo');
    }

    var h2_anchor = document.getElementsByClassName('nav-h2');
    for (var i = 0; i < h2_anchor.length; ++i) {
        h2_anchor[i].childNodes[0].outerHTML = h2_anchor[i].childNodes[0].outerHTML.replace('scrollTo', 'window.scrollTo');
    }

    var h3_anchor = document.getElementsByClassName('nav-h3');
    for (var i = 0; i < h3_anchor.length; ++i) {
        h3_anchor[i].childNodes[0].outerHTML = h3_anchor[i].childNodes[0].outerHTML.replace('scrollTo', 'window.scrollTo');
    }

    var h4_anchor = document.getElementsByClassName('nav-h4');
    for (var i = 0; i < h4_anchor.length; ++i) {
        h4_anchor[i].childNodes[0].outerHTML = h4_anchor[i].childNodes[0].outerHTML.replace('scrollTo', 'window.scrollTo');
    }

    $('#blogNav').css({
        'right': '0px',
        'left': ''
    })

    $('#blogNavContent').css({
        'max-height': document.documentElement.clientHeight * 0.8
    });

    window.onresize = function() {
        $('#blogNavContent').css({
        'max-height': document.documentElement.clientHeight * 0.8
    });
    };
    console.log('leanote_blog_repair_navigation end');
}

/* Idea1: use anchor, but 没有动画效果，看不到往哪个方向跳转 */
// // 第一个h1是博客标题，需要忽略
// var h1 = document.getElementsByTagName('h1');
// var h1_anchor = document.getElementsByClassName('nav-h1');
// for (var i = 1; i < h1.length; ++i) {
//     h1_anchor[i - 1].childNodes[0].href = '#' + h1[i].id;
// }

// var h2 = document.getElementsByTagName('h2');
// var h2_anchor = document.getElementsByClassName('nav-h2');
// for (var i = 0; i < h2.length; ++i) {
//     h2_anchor[i].childNodes[0].href = '#' + h2[i].id;
// }

// var h3 = document.getElementsByTagName('h3');
// var h3_anchor = document.getElementsByClassName('nav-h3');
// for (var i = 0; i < h3.length; ++i) {
//     h3_anchor[i].childNodes[0].href = '#' + h3[i].id;
// }

// var h4 = document.getElementsByTagName('h4');
// var h4_anchor = document.getElementsByClassName('nav-h4');
// for (var i = 0; i < h4.length; ++i) {
//     h4_anchor[i].childNodes[0].href = '#' + h4[i].id;
// }
