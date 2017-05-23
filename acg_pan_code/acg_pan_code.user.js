// ==UserScript==
// @name        acg_pan_code
// @namespace   https://github.com/jsgscat/greasemonkey
// @include     http://dm.tsdm.tv/*
// @include     http://666dm.net/*
// @include     http://www.shouyoutan.com/*
// @include     http://www.yxdm.tv/down.php*
// @version     1.00
// @grant       none
// @downloadURL https://rawgit.com/jsgscat/greasemonkey/master/acg_pan_code/acg_pan_code.user.js
// @updateURL   https://rawgit.com/jsgscat/greasemonkey/master/acg_pan_code/acg_pan_code.user.js

// ==/UserScript==
setTimeout(main, 2000);

function main() {
    if (location.href.indexOf('http://dm.tsdm.tv') != -1) {
        var hrefs = document.getElementsByTagName('a');
        for (var i = 0; i < hrefs.length; ++i) {
            if (hrefs[i].href.indexOf('pan.baidu.com/s/') != -1) {
                hrefs[i].href = hrefs[i].href + '#' + hrefs[i].innerText.slice(-4);
            }
        }
    }
    if (location.href.indexOf('http://666dm.net/?m=vod-detail') != -1) {
        var hrefs = document.getElementsByTagName('a');
        for (var i = 0; i < hrefs.length; ++i) {
            if (hrefs[i].href.indexOf('http://666dm.net/?m=vod-down') != -1 && hrefs[i].href.indexOf('src-1-num-1') != -1) {
                hrefs[i].href = hrefs[i].href + '#' + hrefs[i].innerText.slice(-4);
            }
        }
    }
    if (location.href.indexOf('http://666dm.net/?m=vod-down') != -1) {
        var hrefs = document.getElementsByTagName('a');
        for (var i = 0; i < hrefs.length; ++i) {
            if (hrefs[i].href.indexOf('pan.baidu.com/s/') != -1) {
                location.href = hrefs[i].href + '#' + location.href.slice(-4);
            }
        }
    }
    if (location.href.indexOf('http://www.shouyoutan.com') != -1) {
        var hrefs = document.getElementsByTagName('a');
        for (var i = 0; i < hrefs.length; ++i) {
            if (hrefs[i].href.indexOf('pan.baidu.com/s/') != -1) {
                var pos = hrefs[i].href.indexOf('#');
                if (pos != -1) {
                    location.href = hrefs[i].href.slice(0, pos) + '#' + hrefs[i].href.slice(-4);
                } else {
                    location.href = hrefs[i].href;
                }
            }
        }
    }
    if (location.href.indexOf('http://www.yxdm.tv/down.php') != -1) {
        var hrefs = document.getElementsByTagName('a');
        for (var i = 0; i < hrefs.length; ++i) {
            if (hrefs[i].href.indexOf('pan.baidu.com/s/') != -1) {
                location.href = hrefs[i].href;
            }
        }
    }
}
