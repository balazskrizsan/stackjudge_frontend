/*!
 * smooth-scroll v16.1.0
 * Animate scrolling to anchor links
 * (c) 2019 Chris Ferdinandi
 * MIT License
 * http://github.com/cferdinandi/smooth-scroll
 */
!function(e,t){"function"==typeof define&&define.amd?define([],(function(){return t(e)})):"object"==typeof exports?module.exports=t(e):e.SmoothScroll=t(e)}("undefined"!=typeof global?global:"undefined"!=typeof window?window:this,(function(e){"use strict";var t={ignore:"[data-scroll-ignore]",header:null,topOnEmptyHash:!0,speed:500,speedAsDuration:!1,durationMax:null,durationMin:null,clip:!0,offset:0,easing:"easeInOutCubic",customEasing:null,updateURL:!0,popstate:!0,emitEvents:!0},n=function(){var e={};return Array.prototype.forEach.call(arguments,(function(t){for(var n in t){if(!t.hasOwnProperty(n))return;e[n]=t[n]}})),e},o=function(e){"#"===e.charAt(0)&&(e=e.substr(1));for(var t,n=String(e),o=n.length,a=-1,r="",i=n.charCodeAt(0);++a<o;){if(0===(t=n.charCodeAt(a)))throw new InvalidCharacterError("Invalid character: the input contains U+0000.");t>=1&&t<=31||127==t||0===a&&t>=48&&t<=57||1===a&&t>=48&&t<=57&&45===i?r+="\\"+t.toString(16)+" ":r+=t>=128||45===t||95===t||t>=48&&t<=57||t>=65&&t<=90||t>=97&&t<=122?n.charAt(a):"\\"+n.charAt(a)}return"#"+r},a=function(){return Math.max(document.body.scrollHeight,document.documentElement.scrollHeight,document.body.offsetHeight,document.documentElement.offsetHeight,document.body.clientHeight,document.documentElement.clientHeight)},r=function(t){return t?(n=t,parseInt(e.getComputedStyle(n).height,10)+t.offsetTop):0;var n},i=function(t,n,o,a){if(n.emitEvents&&"function"==typeof e.CustomEvent){var r=new CustomEvent(t,{bubbles:!0,detail:{anchor:o,toggle:a}});document.dispatchEvent(r)}};return function(u,s){var c,l,d,f,m={};m.cancelScroll=function(e){cancelAnimationFrame(f),f=null,e||i("scrollCancel",c)},m.animateScroll=function(o,u,s){m.cancelScroll();var l=n(c||t,s||{}),h="[object Number]"===Object.prototype.toString.call(o),p=h||!o.tagName?null:o;if(h||p){var g=e.pageYOffset;l.header&&!d&&(d=document.querySelector(l.header));var y,v,S,E=r(d),b=h?o:function(t,n,o,r){var i=0;if(t.offsetParent)do{i+=t.offsetTop,t=t.offsetParent}while(t);return i=Math.max(i-n-o,0),r&&(i=Math.min(i,a()-e.innerHeight)),i}(p,E,parseInt("function"==typeof l.offset?l.offset(o,u):l.offset,10),l.clip),O=b-g,M=a(),I=0,A=function(e,t){var n=t.speedAsDuration?t.speed:Math.abs(e/1e3*t.speed);return t.durationMax&&n>t.durationMax?t.durationMax:t.durationMin&&n<t.durationMin?t.durationMin:parseInt(n,10)}(O,l),w=function(t,n){var a=e.pageYOffset;if(t==n||a==n||(g<n&&e.innerHeight+a)>=M)return m.cancelScroll(!0),function(t,n,o){0===t&&document.body.focus(),o||(t.focus(),document.activeElement!==t&&(t.setAttribute("tabindex","-1"),t.focus(),t.style.outline="none"),e.scrollTo(0,n))}(o,n,h),i("scrollStop",l,o,u),y=null,f=null,!0},C=function(t){y||(y=t),I+=t-y,S=g+O*function(e,t){var n;return"easeInQuad"===e.easing&&(n=t*t),"easeOutQuad"===e.easing&&(n=t*(2-t)),"easeInOutQuad"===e.easing&&(n=t<.5?2*t*t:(4-2*t)*t-1),"easeInCubic"===e.easing&&(n=t*t*t),"easeOutCubic"===e.easing&&(n=--t*t*t+1),"easeInOutCubic"===e.easing&&(n=t<.5?4*t*t*t:(t-1)*(2*t-2)*(2*t-2)+1),"easeInQuart"===e.easing&&(n=t*t*t*t),"easeOutQuart"===e.easing&&(n=1- --t*t*t*t),"easeInOutQuart"===e.easing&&(n=t<.5?8*t*t*t*t:1-8*--t*t*t*t),"easeInQuint"===e.easing&&(n=t*t*t*t*t),"easeOutQuint"===e.easing&&(n=1+--t*t*t*t*t),"easeInOutQuint"===e.easing&&(n=t<.5?16*t*t*t*t*t:1+16*--t*t*t*t*t),e.customEasing&&(n=e.customEasing(t)),n||t}(l,v=(v=0===A?0:I/A)>1?1:v),e.scrollTo(0,Math.floor(S)),w(S,b)||(f=e.requestAnimationFrame(C),y=t)};0===e.pageYOffset&&e.scrollTo(0,0),function(e,t,n){t||history.pushState&&n.updateURL&&history.pushState({smoothScroll:JSON.stringify(n),anchor:e.id},document.title,e===document.documentElement?"#top":"#"+e.id)}(o,h,l),"matchMedia"in e&&e.matchMedia("(prefers-reduced-motion)").matches?e.scrollTo(0,Math.floor(b)):(i("scrollStart",l,o,u),m.cancelScroll(!0),e.requestAnimationFrame(C))}};var h=function(t){if(!t.defaultPrevented&&!(0!==t.button||t.metaKey||t.ctrlKey||t.shiftKey)&&"closest"in t.target&&(l=t.target.closest(u))&&"a"===l.tagName.toLowerCase()&&!t.target.closest(c.ignore)&&l.hostname===e.location.hostname&&l.pathname===e.location.pathname&&/#/.test(l.href)){var n,a=o(l.hash);if("#"===a){if(!c.topOnEmptyHash)return;n=document.documentElement}else n=document.querySelector(a);(n=n||"#top"!==a?n:document.documentElement)&&(t.preventDefault(),function(t){if(history.replaceState&&t.updateURL&&!history.state){var n=e.location.hash;n=n||"",history.replaceState({smoothScroll:JSON.stringify(t),anchor:n||e.pageYOffset},document.title,n||e.location.href)}}(c),m.animateScroll(n,l))}},p=function(e){if(null!==history.state&&history.state.smoothScroll&&history.state.smoothScroll===JSON.stringify(c)){var t=history.state.anchor;"string"==typeof t&&t&&!(t=document.querySelector(o(history.state.anchor)))||m.animateScroll(t,null,{updateURL:!1})}};m.destroy=function(){c&&(document.removeEventListener("click",h,!1),e.removeEventListener("popstate",p,!1),m.cancelScroll(),c=null,null,l=null,d=null,null,f=null)};return function(){if(!("querySelector"in document&&"addEventListener"in e&&"requestAnimationFrame"in e&&"closest"in e.Element.prototype))throw"Smooth Scroll: This browser does not support the required JavaScript methods and browser APIs.";m.destroy(),c=n(t,s||{}),d=c.header?document.querySelector(c.header):null,document.addEventListener("click",h,!1),c.updateURL&&c.popstate&&e.addEventListener("popstate",p,!1)}(),m}}));