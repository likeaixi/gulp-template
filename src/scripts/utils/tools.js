define(function(){var e={};return e.getQueryString=function(e){var n=new RegExp("(^|&)"+e+"=([^&]*)(&|$)","i"),r=window.location.search.substr(1).match(n);return null!=r?unescape(r[2]):null},e.isImageFile=function(e){if("string"==typeof e){var n=e.split("."),r=n[n.length-1].toLocaleLowerCase();return"jpg"==r||"jpeg"==r||"png"==r||"bmp"==r||"gif"==r}},e.validPassword=function(e){return!!/^[a-z|A-Z|0-9]{6,}$/.exec(e)},e});