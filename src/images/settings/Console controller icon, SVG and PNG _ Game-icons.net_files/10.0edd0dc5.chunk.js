(this.webpackJsonpstudio=this.webpackJsonpstudio||[]).push([[10],{27:function(e,t,n){"use strict";n.d(t,"a",(function(){return r})),n.d(t,"b",(function(){return o})),n.d(t,"c",(function(){return i}));const r=0,o=1,i={sans:"Arial, Helvetica, sans-serif",serif:'"Times New Roman", Times, serif'}},285:function(e,t,n){"use strict";var r;!function(){var n=t||{}||this||window;void 0===(r=function(){return n}.apply(t,[]))||(e.exports=r),n.default=n;var o="http://www.w3.org/2000/xmlns/",i="http://www.w3.org/2000/svg",a=/url\(["']?(.+?)["']?\)/,s={woff2:"font/woff2",woff:"font/woff",otf:"application/x-font-opentype",ttf:"application/x-font-ttf",eot:"application/vnd.ms-fontobject",sfnt:"application/font-sfnt",svg:"image/svg+xml"},c=function(e){return e instanceof HTMLElement||e instanceof SVGElement},l=function(e){if(!c(e))throw new Error("an HTMLElement or SVGElement is required; got "+e)},u=function(e){return new Promise((function(t,n){c(e)?t(e):n(new Error("an HTMLElement or SVGElement is required; got "+e))}))},d=function(e){var t=Object.keys(s).filter((function(t){return e.indexOf("."+t)>0})).map((function(e){return s[e]}));return t?t[0]:(console.error("Unknown font format for "+e+". Fonts may not be working correctly."),"application/octet-stream")},f=function(e,t,n){var r=e.viewBox&&e.viewBox.baseVal&&e.viewBox.baseVal[n]||null!==t.getAttribute(n)&&!t.getAttribute(n).match(/%$/)&&parseInt(t.getAttribute(n))||e.getBoundingClientRect()[n]||parseInt(t.style[n])||parseInt(window.getComputedStyle(e).getPropertyValue(n));return"undefined"===typeof r||null===r||isNaN(parseFloat(r))?0:r},h=function(e){for(var t=window.atob(e.split(",")[1]),n=e.split(",")[0].split(":")[1].split(";")[0],r=new ArrayBuffer(t.length),o=new Uint8Array(r),i=0;i<t.length;i++)o[i]=t.charCodeAt(i);return new Blob([r],{type:n})},w=function(e){return Promise.all(Array.from(e.querySelectorAll("image")).map((function(e){var t,n=e.getAttributeNS("http://www.w3.org/1999/xlink","href")||e.getAttribute("href");return n?((t=n)&&0===t.lastIndexOf("http",0)&&-1===t.lastIndexOf(window.location.host)&&(n+=(-1===n.indexOf("?")?"?":"&")+"t="+(new Date).valueOf()),new Promise((function(t,r){var o=document.createElement("canvas"),i=new Image;i.crossOrigin="anonymous",i.src=n,i.onerror=function(){return r(new Error("Could not load "+n))},i.onload=function(){o.width=i.width,o.height=i.height,o.getContext("2d").drawImage(i,0,0),e.setAttributeNS("http://www.w3.org/1999/xlink","href",o.toDataURL("image/png")),t(!0)}}))):Promise.resolve(null)})))},p={},g=function(e){return Promise.all(e.map((function(e){return new Promise((function(t,n){if(p[e.url])return t(p[e.url]);var r=new XMLHttpRequest;r.addEventListener("load",(function(){var n=function(e){for(var t="",n=new Uint8Array(e),r=0;r<n.byteLength;r++)t+=String.fromCharCode(n[r]);return window.btoa(t)}(r.response),o=e.text.replace(a,'url("data:'+e.format+";base64,"+n+'")')+"\n";p[e.url]=o,t(o)})),r.addEventListener("error",(function(n){console.warn("Failed to load font from: "+e.url,n),p[e.url]=null,t(null)})),r.addEventListener("abort",(function(n){console.warn("Aborted loading font from: "+e.url,n),t(null)})),r.open("GET",e.url),r.responseType="arraybuffer",r.send()}))}))).then((function(e){return e.filter((function(e){return e})).join("")}))},m=null,v=function(e,t){var n=t||{},r=n.selectorRemap,o=n.modifyStyle,i=n.modifyCss,s=n.fonts,c=n.excludeUnusedCss,l=i||function(e,t){return(r?r(e):e)+"{"+(o?o(t):t)+"}\n"},u=[],f="undefined"===typeof s,h=s||[];return(m||(m=Array.from(document.styleSheets).map((function(e){try{return{rules:e.cssRules,href:e.href}}catch(t){return console.warn("Stylesheet could not be loaded: "+e.href,t),{}}})))).forEach((function(t){var n=t.rules,r=t.href;n&&Array.from(n).forEach((function(t){if("undefined"!=typeof t.style)if(function(e,t){if(t)try{return e.querySelector(t)||e.parentNode&&e.parentNode.querySelector(t)}catch(n){console.warn('Invalid CSS selector "'+t+'"',n)}}(e,t.selectorText))u.push(l(t.selectorText,t.style.cssText));else if(f&&t.cssText.match(/^@font-face/)){var n=function(e,t){var n=e.cssText.match(a),r=n&&n[1]||"";if(r&&!r.match(/^data:/)&&"about:blank"!==r){var o=r.startsWith("../")?t+"/../"+r:r.startsWith("./")?t+"/."+r:r;return{text:e.cssText,format:d(o),url:o}}}(t,r);n&&h.push(n)}else c||u.push(t.cssText)}))})),g(h).then((function(e){return u.join("\n")+e}))},b=function(){if(!navigator.msSaveOrOpenBlob&&!("download"in document.createElement("a")))return{popup:window.open()}};n.prepareSvg=function(e,t,n){l(e);var r=t||{},a=r.left,s=void 0===a?0:a,c=r.top,u=void 0===c?0:c,d=r.width,h=r.height,p=r.scale,g=void 0===p?1:p,m=r.responsive,b=void 0!==m&&m,x=r.excludeCss,y=void 0!==x&&x;return w(e).then((function(){var r=e.cloneNode(!0);r.style.backgroundColor=(t||{}).backgroundColor||e.style.backgroundColor;var a=function(e,t,n,r){if("svg"===e.tagName)return{width:n||f(e,t,"width"),height:r||f(e,t,"height")};if(e.getBBox){var o=e.getBBox(),i=o.x,a=o.y;return{width:i+o.width,height:a+o.height}}}(e,r,d,h),c=a.width,l=a.height;if("svg"!==e.tagName){if(!e.getBBox)return void console.error("Attempted to render non-SVG element",e);null!=r.getAttribute("transform")&&r.setAttribute("transform",r.getAttribute("transform").replace(/translate\(.*?\)/,""));var w=document.createElementNS("http://www.w3.org/2000/svg","svg");w.appendChild(r),r=w}if(r.setAttribute("version","1.1"),r.setAttribute("viewBox",[s,u,c,l].join(" ")),r.getAttribute("xmlns")||r.setAttributeNS(o,"xmlns",i),r.getAttribute("xmlns:xlink")||r.setAttributeNS(o,"xmlns:xlink","http://www.w3.org/1999/xlink"),b?(r.removeAttribute("width"),r.removeAttribute("height"),r.setAttribute("preserveAspectRatio","xMinYMin meet")):(r.setAttribute("width",c*g),r.setAttribute("height",l*g)),Array.from(r.querySelectorAll("foreignObject > *")).forEach((function(e){e.setAttributeNS(o,"xmlns","svg"===e.tagName?i:"http://www.w3.org/1999/xhtml")})),!y)return v(e,t).then((function(e){var t=document.createElement("style");t.setAttribute("type","text/css"),t.innerHTML="<![CDATA[\n"+e+"\n]]>";var o=document.createElement("defs");o.appendChild(t),r.insertBefore(o,r.firstChild);var i=document.createElement("div");i.appendChild(r);var a=i.innerHTML.replace(/NS\d+:href/gi,'xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href');if("function"!==typeof n)return{src:a,width:c,height:l};n(a,c,l)}));var p=document.createElement("div");p.appendChild(r);var m=p.innerHTML;if("function"!==typeof n)return{src:m,width:c,height:l};n(m,c,l)}))},n.svgAsDataUri=function(e,t,r){return l(e),n.prepareSvg(e,t).then((function(e){var t=e.src,n=e.width,o=e.height,i="data:image/svg+xml;base64,"+window.btoa(decodeURIComponent(encodeURIComponent('<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd" [<!ENTITY nbsp "&#160;">]>'+t).replace(/%([0-9A-F]{2})/g,(function(e,t){var n=String.fromCharCode("0x"+t);return"%"===n?"%25":n}))));return"function"===typeof r&&r(i,n,o),i}))},n.svgAsPngUri=function(e,t,r){l(e);var o=t||{},i=o.encoderType,a=void 0===i?"image/png":i,s=o.encoderOptions,c=void 0===s?.8:s,u=o.canvg,d=function(e){var t=e.src,n=e.width,o=e.height,i=document.createElement("canvas"),s=i.getContext("2d"),l=window.devicePixelRatio||1;i.width=n*l,i.height=o*l,i.style.width=i.width+"px",i.style.height=i.height+"px",s.setTransform(l,0,0,l,0,0),u?u(i,t):s.drawImage(t,0,0);var d=void 0;try{d=i.toDataURL(a,c)}catch(f){if("undefined"!==typeof SecurityError&&f instanceof SecurityError||"SecurityError"===f.name)return void console.error("Rendered SVG images cannot be downloaded in this browser.");throw f}return"function"===typeof r&&r(d,i.width,i.height),Promise.resolve(d)};return u?n.prepareSvg(e,t).then(d):n.svgAsDataUri(e,t).then((function(e){return new Promise((function(t,n){var r=new Image;r.onload=function(){return t(d({src:r,width:r.width,height:r.height}))},r.onerror=function(){n("There was an error loading the data URI as an image on the following SVG\n"+window.atob(e.slice(26))+"Open the following link to see browser's diagnosis\n"+e)},r.src=e}))}))},n.download=function(e,t,n){if(navigator.msSaveOrOpenBlob)navigator.msSaveOrOpenBlob(h(t),e);else{var r=document.createElement("a");if("download"in r){r.download=e,r.style.display="none",document.body.appendChild(r);try{var o=h(t),i=URL.createObjectURL(o);r.href=i,r.onclick=function(){return requestAnimationFrame((function(){return URL.revokeObjectURL(i)}))}}catch(a){console.error(a),console.warn("Error while getting object URL. Falling back to string URL."),r.href=t}r.click(),document.body.removeChild(r)}else n&&n.popup&&(n.popup.document.title=e,n.popup.location.replace(t))}},n.saveSvg=function(e,t,r){var o=b();return u(e).then((function(e){return n.svgAsDataUri(e,r||{})})).then((function(e){return n.download(t,e,o)}))},n.saveSvgAsPng=function(e,t,r){var o=b();return u(e).then((function(e){return n.svgAsPngUri(e,r||{})})).then((function(e){return n.download(t,e,o)}))}}()},300:function(e,t,n){"use strict";n.r(t),n.d(t,"Download",(function(){return c}));var r=n(1),o=n(0),i=n(3),a=n(285),s=n(27);class c extends o.Component{render(){var e;const{icon:t,bg:n,fg:o,frame:i,size:s}=this.props,c=1/(512/s)/(null!==(e=window.devicePixelRatio)&&void 0!==e?e:1),l={background:n.color.css,borderColor:i.color.css,color:o.color.css},u=document.querySelector("#canvas"),d=t.d?(u?u.innerHTML:"").replace(/ {2}|\n/g,"").replace(/ class="Icon"/,"").replace(/ data-reactroot=""/,""):"",f="data:image/svg+xml;charset=utf-8,"+encodeURIComponent(d),h=Object(r.jsx)("img",{src:"/icons/ffffff/000000/1x1/lorc/falling-boulder.svg",alt:"download"});return Object(r.jsx)("div",{className:"Preset",children:Object(r.jsxs)("ul",{className:"download",children:[Object(r.jsx)("li",{className:"hint--top","data-hint":`Download ${o.color.hex} on ${n.color.hex} SVG icon`,children:Object(r.jsxs)("a",{className:"wb",download:t.name+".svg",style:l,onMouseEnter:()=>this.forceUpdate(),href:f,children:[h,Object(r.jsx)("span",{children:"SVG"})]})}),Object(r.jsx)("li",{className:"hint--top","data-hint":`Download ${o.color.hex} on ${n.color.hex} PNG icon`,children:Object(r.jsxs)("a",{className:"wb",style:l,href:"#download",onClick:()=>Object(a.saveSvgAsPng)(document.querySelector(".Icon"),t.name+".png",{scale:c}),children:[h,Object(r.jsx)("span",{children:"PNG"})]})})]})})}}t.default=Object(i.b)((({icon:e,paths:t,frame:n,size:r})=>({icon:e,bg:t[s.a],fg:t[s.b],frame:n,size:r})))(c)}}]);
//# sourceMappingURL=10.0edd0dc5.chunk.js.map