define(["module"],function(e){"use strict";function n(e,n){return void 0===e||""===e?n:e}function t(e,t,r,o){if(t===o)return!0;if(e===r){if("http"===e)return n(t,"80")===n(o,"80");if("https"===e)return n(t,"443")===n(o,"443")}return!1}var r,o,i,a,s,u=["Msxml2.XMLHTTP","Microsoft.XMLHTTP","Msxml2.XMLHTTP.4.0"],l=/^\s*<\?xml(\s)+version=[\'\"](\d)*.(\d)*[\'\"](\s)*\?>/im,c=/<body[^>]*>\s*([\s\S]+)\s*<\/body>/im,f="undefined"!=typeof location&&location.href,p=f&&location.protocol&&location.protocol.replace(/\:/,""),d=f&&location.hostname,m=f&&(location.port||void 0),v={},g=e.config&&e.config()||{};return r={version:"2.0.15",strip:function(e){if(e){var n=(e=e.replace(l,"")).match(c);n&&(e=n[1])}else e="";return e},jsEscape:function(e){return e.replace(/(['\\])/g,"\\$1").replace(/[\f]/g,"\\f").replace(/[\b]/g,"\\b").replace(/[\n]/g,"\\n").replace(/[\t]/g,"\\t").replace(/[\r]/g,"\\r").replace(/[\u2028]/g,"\\u2028").replace(/[\u2029]/g,"\\u2029")},createXhr:g.createXhr||function(){var e,n,t;if("undefined"!=typeof XMLHttpRequest)return new XMLHttpRequest;if("undefined"!=typeof ActiveXObject)for(n=0;n<3;n+=1){t=u[n];try{e=new ActiveXObject(t)}catch(e){}if(e){u=[t];break}}return e},parseName:function(e){var n,t,r,o=!1,i=e.lastIndexOf("."),a=0===e.indexOf("./")||0===e.indexOf("../");return-1!==i&&(!a||i>1)?(n=e.substring(0,i),t=e.substring(i+1)):n=e,r=t||n,-1!==(i=r.indexOf("!"))&&(o="strip"===r.substring(i+1),r=r.substring(0,i),t?t=r:n=r),{moduleName:n,ext:t,strip:o}},xdRegExp:/^((\w+)\:)?\/\/([^\/\\]+)/,useXhr:function(e,n,o,i){var a,s,u,l=r.xdRegExp.exec(e);return!l||(a=l[2],s=l[3],s=s.split(":"),u=s[1],s=s[0],(!a||a===n)&&(!s||s.toLowerCase()===o.toLowerCase())&&(!u&&!s||t(a,u,n,i)))},finishLoad:function(e,n,t,o){t=n?r.strip(t):t,g.isBuild&&(v[e]=t),o(t)},load:function(e,n,t,o){if(o&&o.isBuild&&!o.inlineText)t();else{g.isBuild=o&&o.isBuild;var i=r.parseName(e),a=i.moduleName+(i.ext?"."+i.ext:""),s=n.toUrl(a),u=g.useXhr||r.useXhr;0!==s.indexOf("empty:")?!f||u(s,p,d,m)?r.get(s,function(n){r.finishLoad(e,i.strip,n,t)},function(e){t.error&&t.error(e)}):n([a],function(e){r.finishLoad(i.moduleName+"."+i.ext,i.strip,e,t)}):t()}},write:function(e,n,t,o){if(v.hasOwnProperty(n)){var i=r.jsEscape(v[n]);t.asModule(e+"!"+n,"define(function () { return '"+i+"';});\n")}},writeFile:function(e,n,t,o,i){var a=r.parseName(n),s=a.ext?"."+a.ext:"",u=a.moduleName+s,l=t.toUrl(a.moduleName+s)+".js";r.load(u,t,function(n){var t=function(e){return o(l,e)};t.asModule=function(e,n){return o.asModule(e,l,n)},r.write(e,u,t,i)},i)}},"node"===g.env||!g.env&&"undefined"!=typeof process&&process.versions&&process.versions.node&&!process.versions["node-webkit"]&&!process.versions["atom-shell"]?(o=require.nodeRequire("fs"),r.get=function(e,n,t){try{var r=o.readFileSync(e,"utf8");"\ufeff"===r[0]&&(r=r.substring(1)),n(r)}catch(e){t&&t(e)}}):"xhr"===g.env||!g.env&&r.createXhr()?r.get=function(e,n,t,o){var i,a=r.createXhr();if(a.open("GET",e,!0),o)for(i in o)o.hasOwnProperty(i)&&a.setRequestHeader(i.toLowerCase(),o[i]);g.onXhr&&g.onXhr(a,e),a.onreadystatechange=function(r){var o,i;4===a.readyState&&((o=a.status||0)>399&&o<600?((i=new Error(e+" HTTP status: "+o)).xhr=a,t&&t(i)):n(a.responseText),g.onXhrComplete&&g.onXhrComplete(a,e))},a.send(null)}:"rhino"===g.env||!g.env&&"undefined"!=typeof Packages&&"undefined"!=typeof java?r.get=function(e,n){var t,r,o=new java.io.File(e),i=java.lang.System.getProperty("line.separator"),a=new java.io.BufferedReader(new java.io.InputStreamReader(new java.io.FileInputStream(o),"utf-8")),s="";try{for(t=new java.lang.StringBuffer,(r=a.readLine())&&r.length()&&65279===r.charAt(0)&&(r=r.substring(1)),null!==r&&t.append(r);null!==(r=a.readLine());)t.append(i),t.append(r);s=String(t.toString())}finally{a.close()}n(s)}:("xpconnect"===g.env||!g.env&&"undefined"!=typeof Components&&Components.classes&&Components.interfaces)&&(i=Components.classes,a=Components.interfaces,Components.utils.import("resource://gre/modules/FileUtils.jsm"),s="@mozilla.org/windows-registry-key;1"in i,r.get=function(e,n){var t,r,o,u={};s&&(e=e.replace(/\//g,"\\")),o=new FileUtils.File(e);try{(t=i["@mozilla.org/network/file-input-stream;1"].createInstance(a.nsIFileInputStream)).init(o,1,0,!1),(r=i["@mozilla.org/intl/converter-input-stream;1"].createInstance(a.nsIConverterInputStream)).init(t,"utf-8",t.available(),a.nsIConverterInputStream.DEFAULT_REPLACEMENT_CHARACTER),r.readString(t.available(),u),r.close(),t.close(),n(u.value)}catch(e){throw new Error((o&&o.path||"")+": "+e)}}),r});