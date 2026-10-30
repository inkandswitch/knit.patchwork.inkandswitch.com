import{a as se,b as St}from"./chunk-FW4363Y4.js";var Ie=se((pn,Ae)=>{var E=1e3,T=E*60,D=T*60,k=D*24,Vt=k*7,Jt=k*365.25;Ae.exports=function(e,r){r=r||{};var t=typeof e;if(t==="string"&&e.length>0)return Yt(e);if(t==="number"&&isFinite(e))return r.long?Gt(e):Xt(e);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(e))};function Yt(e){if(e=String(e),!(e.length>100)){var r=/^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(e);if(r){var t=parseFloat(r[1]),o=(r[2]||"ms").toLowerCase();switch(o){case"years":case"year":case"yrs":case"yr":case"y":return t*Jt;case"weeks":case"week":case"w":return t*Vt;case"days":case"day":case"d":return t*k;case"hours":case"hour":case"hrs":case"hr":case"h":return t*D;case"minutes":case"minute":case"mins":case"min":case"m":return t*T;case"seconds":case"second":case"secs":case"sec":case"s":return t*E;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return t;default:return}}}}function Xt(e){var r=Math.abs(e);return r>=k?Math.round(e/k)+"d":r>=D?Math.round(e/D)+"h":r>=T?Math.round(e/T)+"m":r>=E?Math.round(e/E)+"s":e+"ms"}function Gt(e){var r=Math.abs(e);return r>=k?V(e,r,k,"day"):r>=D?V(e,r,D,"hour"):r>=T?V(e,r,T,"minute"):r>=E?V(e,r,E,"second"):e+" ms"}function V(e,r,t,o){var n=r>=t*1.5;return Math.round(e/t)+" "+o+(n?"s":"")}});var Re=se((fn,Fe)=>{function Kt(e){t.debug=t,t.default=t,t.coerce=d,t.disable=a,t.enable=n,t.enabled=u,t.humanize=Ie(),t.destroy=c,Object.keys(e).forEach(s=>{t[s]=e[s]}),t.names=[],t.skips=[],t.formatters={};function r(s){let l=0;for(let p=0;p<s.length;p++)l=(l<<5)-l+s.charCodeAt(p),l|=0;return t.colors[Math.abs(l)%t.colors.length]}t.selectColor=r;function t(s){let l,p=null,g,b;function f(...h){if(!f.enabled)return;let m=f,v=Number(new Date),y=v-(l||v);m.diff=y,m.prev=l,m.curr=v,l=v,h[0]=t.coerce(h[0]),typeof h[0]!="string"&&h.unshift("%O");let x=0;h[0]=h[0].replace(/%([a-zA-Z%])/g,(ie,Ct)=>{if(ie==="%%")return"%";x++;let xe=t.formatters[Ct];if(typeof xe=="function"){let kt=h[x];ie=xe.call(m,kt),h.splice(x,1),x--}return ie}),t.formatArgs.call(m,h),(m.log||t.log).apply(m,h)}return f.namespace=s,f.useColors=t.useColors(),f.color=t.selectColor(s),f.extend=o,f.destroy=t.destroy,Object.defineProperty(f,"enabled",{enumerable:!0,configurable:!1,get:()=>p!==null?p:(g!==t.namespaces&&(g=t.namespaces,b=t.enabled(s)),b),set:h=>{p=h}}),typeof t.init=="function"&&t.init(f),f}function o(s,l){let p=t(this.namespace+(typeof l>"u"?":":l)+s);return p.log=this.log,p}function n(s){t.save(s),t.namespaces=s,t.names=[],t.skips=[];let l=(typeof s=="string"?s:"").trim().replace(/\s+/g,",").split(",").filter(Boolean);for(let p of l)p[0]==="-"?t.skips.push(p.slice(1)):t.names.push(p)}function i(s,l){let p=0,g=0,b=-1,f=0;for(;p<s.length;)if(g<l.length&&(l[g]===s[p]||l[g]==="*"))l[g]==="*"?(b=g,f=p,g++):(p++,g++);else if(b!==-1)g=b+1,f++,p=f;else return!1;for(;g<l.length&&l[g]==="*";)g++;return g===l.length}function a(){let s=[...t.names,...t.skips.map(l=>"-"+l)].join(",");return t.enable(""),s}function u(s){for(let l of t.skips)if(i(s,l))return!1;for(let l of t.names)if(i(s,l))return!0;return!1}function d(s){return s instanceof Error?s.stack||s.message:s}function c(){console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.")}return t.enable(t.load()),t}Fe.exports=Kt});var Oe=se((w,J)=>{w.formatArgs=Qt;w.save=er;w.load=tr;w.useColors=Zt;w.storage=rr();w.destroy=(()=>{let e=!1;return()=>{e||(e=!0,console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."))}})();w.colors=["#0000CC","#0000FF","#0033CC","#0033FF","#0066CC","#0066FF","#0099CC","#0099FF","#00CC00","#00CC33","#00CC66","#00CC99","#00CCCC","#00CCFF","#3300CC","#3300FF","#3333CC","#3333FF","#3366CC","#3366FF","#3399CC","#3399FF","#33CC00","#33CC33","#33CC66","#33CC99","#33CCCC","#33CCFF","#6600CC","#6600FF","#6633CC","#6633FF","#66CC00","#66CC33","#9900CC","#9900FF","#9933CC","#9933FF","#99CC00","#99CC33","#CC0000","#CC0033","#CC0066","#CC0099","#CC00CC","#CC00FF","#CC3300","#CC3333","#CC3366","#CC3399","#CC33CC","#CC33FF","#CC6600","#CC6633","#CC9900","#CC9933","#CCCC00","#CCCC33","#FF0000","#FF0033","#FF0066","#FF0099","#FF00CC","#FF00FF","#FF3300","#FF3333","#FF3366","#FF3399","#FF33CC","#FF33FF","#FF6600","#FF6633","#FF9900","#FF9933","#FFCC00","#FFCC33"];function Zt(){if(typeof window<"u"&&window.process&&(window.process.type==="renderer"||window.process.__nwjs))return!0;if(typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))return!1;let e;return typeof document<"u"&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||typeof window<"u"&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||typeof navigator<"u"&&navigator.userAgent&&(e=navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/))&&parseInt(e[1],10)>=31||typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)}function Qt(e){if(e[0]=(this.useColors?"%c":"")+this.namespace+(this.useColors?" %c":" ")+e[0]+(this.useColors?"%c ":" ")+"+"+J.exports.humanize(this.diff),!this.useColors)return;let r="color: "+this.color;e.splice(1,0,r,"color: inherit");let t=0,o=0;e[0].replace(/%[a-zA-Z%]/g,n=>{n!=="%%"&&(t++,n==="%c"&&(o=t))}),e.splice(o,0,r)}w.log=console.debug||console.log||(()=>{});function er(e){try{e?w.storage.setItem("debug",e):w.storage.removeItem("debug")}catch{}}function tr(){let e;try{e=w.storage.getItem("debug")||w.storage.getItem("DEBUG")}catch{}return!e&&typeof process<"u"&&"env"in process&&(e=process.env.DEBUG),e}function rr(){try{return localStorage}catch{}}J.exports=Re()(w);var{formatters:or}=J.exports;or.j=function(e){try{return JSON.stringify(e)}catch(r){return"[UnexpectedJSONParseError]: "+r.message}}});import{template as yt}from"solid-js/web";import{createComponent as To}from"solid-js/web";import{setAttribute as Do}from"solid-js/web";import{effect as Ao}from"solid-js/web";import{insert as _t}from"solid-js/web";import{getOwner as Io}from"solid-js/web";import{createMemo as wt}from"solid-js";import{createStore as Oo,reconcile as Mo}from"solid-js/store";import{render as Lo}from"solid-js/web";import{template as we}from"solid-js/web";import{insert as H}from"solid-js/web";import{getOwner as re}from"solid-js/web";import{use as oe}from"solid-js/web";import{createComponent as C}from"solid-js/web";import{createUniqueId as $t,untrack as ye}from"solid-js";import{isServer as Et,isDev as _e}from"solid-js/web";import{reconcile as Tt}from"solid-js/store";function le(e,r={}){let t=r.storage||globalThis.localStorage,o=r.name||`storage-${$t()}`;if(!t)return Object.assign(e,{2:null});let n=r.storageOptions,i=r.serialize||JSON.stringify.bind(JSON),a=r.deserialize||JSON.parse.bind(JSON),u=t.getItem(o,n),d=typeof e[0]=="function"?s=>{try{let l=a(s);e[1](()=>l)}catch(l){_e&&console.warn(l)}}:s=>{try{let l=a(s);e[1](Tt(l))}catch(l){_e&&console.warn(l)}},c=!0;if(u instanceof Promise?u.then(s=>c&&s&&d(s)):u&&d(u),typeof r.sync?.[0]=="function"){let s=typeof e[0]=="function"?e[0]:()=>e[0];r.sync[0](l=>{l.key!==o||!Et&&(l.url||globalThis.location.href)!==globalThis.location.href||l.newValue===i(ye(s))||d(l.newValue)})}return Object.assign([],e,{1:typeof e[0]=="function"?s=>{let l=e[1](s),p=s!=null?i(l):s;return r.sync?.[1](o,p),p!=null?t.setItem(o,p,n):t.removeItem(o,n),c=!1,l}:(...s)=>{e[1](...s);let l=ye(()=>i(e[0]));r.sync?.[1](o,l),t.setItem(o,l,n),c=!1},2:u})}import{createEffect as ut,createMemo as mt,createSignal as S,on as gt,onCleanup as ko,onMount as So,Show as ne}from"solid-js";import{createEffect as Ce,createSignal as ke,on as Se}from"solid-js";var _={leftCollapsed:"patchwork:leftSidebarCollapsed",rightCollapsed:"patchwork:rightSidebarCollapsed",leftWidth:"patchwork:leftSidebarWidth",rightWidth:"patchwork:rightSidebarWidth",contextToolId:"patchwork:contextSidebarToolId"},B="patchwork:collapse-context-sidebar",q=400;function $e(e,r){let t=localStorage.getItem(e);return t?parseInt(t,10):r}function Ee(e){return localStorage.getItem(e)==="true"}function Dt(){let[e,r]=ke(Ee(_.leftCollapsed)),[t,o]=ke($e(_.leftWidth,q));return Ce(Se(e,n=>{localStorage.setItem(_.leftCollapsed,String(n))})),Ce(Se(t,n=>{localStorage.setItem(_.leftWidth,String(n))})),{isSidebarCollapsed:e,setIsSidebarCollapsed:r,leftSidebarWidth:t,setLeftSidebarWidth:o}}import{onCleanup as At,onMount as It}from"solid-js";var Te=180,Ft=720,Rt=120,De=3;function ce(e,{isCollapsed:r,setCollapsed:t,setWidth:o}){let n=!1,i=null,a=!1,u=null,d=m=>{if(m<Rt){r()||t(!0),u=null;return}r()&&t(!1);let v=Math.min(Ft,m);o(v),u=v},c=()=>{r()||u!==null&&u<Te&&o(Te)},s=null,l=()=>{document.body.setAttribute("data-sidebar-resizing",e),s=document.createElement("div"),s.style.cssText="position:fixed;inset:0;z-index:2147483647;cursor:col-resize;",document.body.appendChild(s)},p=()=>{n=!1,i=null,document.body.style.userSelect="",document.body.removeAttribute("data-sidebar-resizing"),s?.remove(),s=null},g=m=>{m.preventDefault(),i={x:m.clientX,y:m.clientY},a=!1,u=null,n=!0,document.body.style.userSelect="none"},b=()=>{let m=n,v=a;p(),m&&v&&c()},f=m=>{if(!n||!i)return;let v=Math.abs(m.clientX-i.x),y=Math.abs(m.clientY-i.y);!a&&(v>De||y>De)&&(a=!0,l()),d(e==="left"?m.clientX:window.innerWidth-m.clientX)},h=m=>{if(a){m.preventDefault(),m.stopPropagation(),a=!1;return}t(v=>!v)};return It(()=>{document.addEventListener("mousemove",f),document.addEventListener("mouseup",b),At(()=>{document.removeEventListener("mousemove",f),document.removeEventListener("mouseup",b),n&&p()})}),{handleMouseDown:g,handleToggleClick:h}}import{createEffect as Ot,createSignal as Mt,onCleanup as Lt}from"solid-js";var $=(e,r)=>{let[t,o]=Mt(!1);return Ot(()=>{let n=r();if(!n)return;o(!1);let i=a=>{a.detail?.componentId===e&&o(!0)};n.addEventListener("patchwork:mounted",i),Lt(()=>n.removeEventListener("patchwork:mounted",i))}),t};import{createEffect as zt,createSignal as Pt,onCleanup as Ut}from"solid-js";var Nt=5e3,jt=(e,r)=>{let[t,o]=Pt(!1);return zt(()=>{if(t())return;let n=e(),i=r();if(!n||!i)return;let a=d=>{let c=d.detail;c?.url&&c.url!==i||o(!0)};n.addEventListener("patchwork:mounted",a),n.addEventListener("patchwork:no-tool",a);let u=setTimeout(()=>o(!0),Nt);Ut(()=>{n.removeEventListener("patchwork:mounted",a),n.removeEventListener("patchwork:no-tool",a),clearTimeout(u)})}),t};import{getRegistry as Wt}from"@inkandswitch/patchwork-plugins";import{createMemo as Ht,createSignal as Bt,onCleanup as qt}from"solid-js";function M(e){let r=Wt("patchwork:component"),[t,o]=Bt(0),n=r.on("changed",()=>o(i=>i+1));return qt(n),Ht(()=>(t(),(r.all?.()??[]).filter(i=>(i.tags??[]).includes(e)).map(i=>({id:i.id,name:i.name||i.id,icon:i.icon})).sort((i,a)=>i.name.localeCompare(a.name))))}import{template as j}from"solid-js/web";import{delegateEvents as Jr}from"solid-js/web";import{getOwner as Yr}from"solid-js/web";import{effect as st}from"solid-js/web";import{setAttribute as Xr}from"solid-js/web";import{memo as lt}from"solid-js/web";import{insert as F}from"solid-js/web";import{createComponent as R}from"solid-js/web";import{For as to,Show as me}from"solid-js";import{template as He}from"solid-js/web";import{delegateEvents as ur}from"solid-js/web";import{setAttribute as mr}from"solid-js/web";import{insert as gr}from"solid-js/web";import"solid-js/web";import{effect as We}from"solid-js/web";import{use as Be}from"solid-js/web";import{createComponent as de}from"solid-js/web";var ze=St(Oe(),1),Pe=(0,ze.default)("cabbages");function Me(e){return typeof e=="object"&&typeof e!=null&&Object.getPrototypeOf(e)==Object.prototype}var nr="\uFFFC";function Ue(e,...r){if(r.length==0){Pe("empty patch");return}let[t,o,n]=r,i=[...t];for(;;){let a=i.shift();if(!i.length){let d=Array.isArray(o);if(Me(e)&&d&&typeof a>"u"&&typeof o[0]=="string"){delete e[o[0]];return}if(d||typeof o=="number"){if(typeof a>"u")throw new Error("cant treat top level as a seq");a=a;let[c,s]=Array.isArray(o)?o:[o,o+1],l=Array.isArray(o)&&o.length==0;if(!l&&(c==null||s==null))throw new RangeError("it's all or nothing, no half measures");let p=typeof n>"u",g=c===s&&!p,b=l&&!p,f=!g&&!p&&!b;if(typeof e[a]>"u"){if(typeof e=="string")return;typeof n=="string"?e[a]="":e[a]=[]}let h=e[a];if(Array.isArray(h)){if(b){Array.isArray(n)?h.push(...n):h.push(n);return}if(g||f){Array.isArray(n)?h.splice(c,s-c,...n):h.splice(c,s-c,n);return}if(p){h.splice(c,s-c);return}throw new Error("i don't know what happened")}if(typeof h=="string"){if(b){e[a]=h+n;return}if(f||g){e[a]=h.slice(0,c)+(typeof n=="string"?n:n.map(m=>typeof m=="string"?m:nr).join(""))+h.slice(s);return}if(p){e[a]=h.slice(0,c)+h.slice(s);return}throw new Error("i don't know what happened")}if(Me(h)&&d&&typeof o[0]=="string"){delete h[o[0]];return}throw new Error("not implemented")}if(typeof a>"u"){if(typeof o!="string")throw new Error(`can't index top-level map with ${o}`);typeof n>"u"?delete e[o]:e[o]=n;return}if(typeof e[a]>"u"&&(e[a]={}),d){let[c,s]=o;c!=null&&s!=null&&(typeof n>"u"&&c!=null&&s!=null?delete e[a][c||s]:e[a][c||s]=n)}else if(typeof n>"u")delete e[a][o];else{if(typeof e[a]=="string")return;e[a][o]=n}return}if(typeof a>"u")throw new Error("cant treat top level as a seq");a=a;let u=i[0];if(typeof e[a]>"u")if(typeof u=="string")e[a]={};else if(typeof u=="number")e[a]=[];else throw new Error(`can't go down this road ${e}.${a}.${u}`);e=e[a]}}function Le(e,r){for(let t=0;t<r.length;t++)e=e?e[r[t]]:void 0;return e}function Ne(e,r){let t=e.path.slice(0,-1),o=e.path[e.path.length-1];switch(e.action){case"mark":case"unmark":return Pe(`skipping ${e.action} because it doesn't affect material reality`),[];case"inc":if(r)return[t,o,Le(r.patchInfo.after,e.path)];throw new Error(`can't apply ${e.action} without payload argument`);case"conflict":if(r)return[t,o,Le(r.patchInfo.after,e.path)];throw new Error(`can't apply ${e.action} without payload argument`);case"del":return typeof o=="string"?[t,o]:[t,[o,o+(e.length||1)]];case"insert":return[t,[o,o],structuredClone(e.values)];case"splice":return[t,[o,o],[e.value]];case"put":return[t,o,structuredClone(e.value)]}}function Y(e){return r=>{for(let t of e.patches)Ue(r,...Ne(t,e))}}import{createMemo as lr}from"solid-js";import{onCleanup as ar}from"solid-js";import{createStore as ir,produce as sr,reconcile as je}from"solid-js/store";var L=new WeakMap;function X(e){if(ar(()=>{let i=L.get(e);i&&(i.refs--||i.cleanup())}),L.has(e)){let i=L.get(e);return i.refs++,i.store}let[r,t]=ir(structuredClone(e.doc()));L.set(e,{refs:0,store:r,cleanup(){e.off("change",o),e.off("delete",n),L.delete(e)}});function o(i){if(i.scopeReplaced){t(je(i.doc??{}));return}t(sr(Y(i)))}function n(){t(je({}))}return e.on("change",o),e.on("delete",n),e.whenReady().then(()=>{t(structuredClone(e.doc()))}),r}import{getOwner as _n,onCleanup as Cn,createSignal as kn,untrack as Sn,sharedConfig as $n,onMount as En,DEV as Tn,equalFn as Dn}from"solid-js";import{isServer as In}from"solid-js/web";var A=e=>typeof e=="function"&&!e.length?e():e;function G(e){return lr(()=>A(e)&&X(A(e)))}import{createEffect as dr,createResource as hr,useContext as pr}from"solid-js";import{createContext as cr}from"solid-js";var K=cr(null);function z(e,r){let t=pr(K);if(!r?.repo&&!t)throw new Error("use outside <RepoContext> requires options.repo");let o=r?.repo||t;function n(){if(r?.["~skipInitialValue"])return;let u=A(e);if(!u)return;let d=o.findWithProgress(u).peek();return d.state==="ready"?d.handle:void 0}let[i,{mutate:a}]=hr(e,u=>o.findWithProgress(u).whenReady(),{initialValue:n()});return dr(()=>{A(e)||a()}),i}function Z(e,r){let t=z(e,r);return[G(t),t]}import{onCleanup as Yn}from"solid-js";import{createSignal as Gn}from"solid-js";import{createEffect as Qn,onCleanup as ea}from"solid-js";import{createSignal as ra}from"solid-js";import{useContext as ca}from"solid-js";import{getType as vr}from"@inkandswitch/patchwork-filesystem";import{getRegistry as wr,isLoadedPlugin as xr}from"@inkandswitch/patchwork-plugins";import{createEffect as yr,createMemo as Q,createSignal as he,onCleanup as _r,onMount as Ve,Show as Je}from"solid-js";var qe=He("<span class=threepane__title-text>"),br=He("<input class=threepane__title-input type=text>");function Ye(e){let r,[t,o]=he();return Ve(()=>{o(r.closest("repo-provider")?.repo)}),de(Je,{get when(){return t()},get fallback(){return(()=>{var n=qe(),i=r;return typeof i=="function"?Be(i,n):r=n,n})()},children:n=>de(Cr,{get docUrl(){return e.docUrl},get repo(){return n()}})})}function Cr(e){let[r,t]=Z(()=>e.docUrl(),{repo:e.repo}),o=wr("patchwork:datatype"),[n,i]=he(0);Ve(()=>{let f=o.on("changed",()=>i(h=>h+1));_r(f)});let a=Q(()=>{let f=r();return f?vr(f):void 0});yr(()=>{let f=a();f&&o.load(f)});let u=Q(()=>{n();let f=a();if(!f)return;let h=o.get(f);return h&&xr(h)?h:void 0}),d=Q(()=>{let f=r(),h=u();if(!(!f||!h))return h.module.getTitle(f)}),c=Q(()=>!!t()&&typeof u()?.module.setTitle=="function"),[s,l]=he(!1),p;function g(){c()&&(l(!0),queueMicrotask(()=>{p?.focus(),p?.select()}))}function b(f){if(!s()||(l(!1),!f))return;let h=p?.value.trim();if(!h||h===d())return;let m=t(),v=u()?.module.setTitle;!m||!v||m.change(y=>{v(y,h);let x=y["@patchwork"];x&&(x.title=h)})}return de(Je,{get when(){return s()},get fallback(){return(()=>{var f=qe();return f.$$click=g,gr(f,()=>d()??"Untitled"),We(h=>{var m=!!c(),v=c()?"Rename":void 0;return m!==h.e&&f.classList.toggle("threepane__title-text--editable",h.e=m),v!==h.t&&mr(f,"title",h.t=v),h},{e:void 0,t:void 0}),f})()},get children(){var f=br();f.$$keydown=m=>{m.key==="Enter"?(m.preventDefault(),b(!0)):m.key==="Escape"&&(m.preventDefault(),b(!1))},f.addEventListener("blur",()=>b(!0));var h=p;return typeof h=="function"?Be(h,f):p=f,We(()=>f.value=d()??""),f}})}ur(["keydown","click"]);import{template as N}from"solid-js/web";import{delegateEvents as Lr}from"solid-js/web";import{getOwner as zr}from"solid-js/web";import{insert as U}from"solid-js/web";import{createComponent as I}from"solid-js/web";import{Show as pe}from"solid-js";import{template as Ze}from"solid-js/web";import{delegateEvents as kr}from"solid-js/web";import{setStyleProperty as Sr}from"solid-js/web";import{insert as $r}from"solid-js/web";import{setAttribute as ee}from"solid-js/web";import{effect as Xe}from"solid-js/web";import{memo as P}from"solid-js/web";import{createComponent as Ge}from"solid-js/web";import{Show as Ke}from"solid-js";var Er=Ze('<button class="sidebar-toggle sidebar-toggle--resizable">'),Tr=Ze("<div class=sidebar>");function Qe(e){let r=()=>`${e.isCollapsed()?0:e.width()}px`,t=()=>e.canExpand?.()??!0,o=()=>Ge(Ke,{get when(){return!e.isCollapsed()},get children(){return e.children}}),n=()=>Ge(Ke,{get when(){return!e.isCollapsed()||t()},get children(){var i=Er();return i.$$mousedown=a=>e.onMouseDown(a),i.$$click=a=>e.onToggleClick(a),Xe(a=>{var u=e.isCollapsed()?"Expand sidebar":"Toggle or resize sidebar",d=e.isCollapsed()?"Click to expand, drag to resize":"Click to toggle, drag to resize";return u!==a.e&&ee(i,"aria-label",a.e=u),d!==a.t&&ee(i,"title",a.t=d),a},{e:void 0,t:void 0}),i}});return(()=>{var i=Tr();return $r(i,(()=>{var a=P(()=>e.side==="left");return()=>a()?[P(o),P(n)]:[P(n),P(o)]})()),Xe(a=>{var u=e.side,d=e.isCollapsed()?"":void 0,c=r();return u!==a.e&&ee(i,"data-side",a.e=u),d!==a.t&&ee(i,"data-collapsed",a.t=d),c!==a.a&&Sr(i,"width",a.a=c),a},{e:void 0,t:void 0,a:void 0}),i})()}kr(["click","mousedown"]);import{template as tt}from"solid-js/web";import{delegateEvents as Dr}from"solid-js/web";import{setAttribute as Ar}from"solid-js/web";import{effect as Ir}from"solid-js/web";import{insert as et}from"solid-js/web";import{createComponent as Fr}from"solid-js/web";import{For as Mr}from"solid-js";var Rr=tt("<div role=tablist class=context-sidebar__tablist>"),Or=tt("<button type=button role=tab class=context-sidebar__tab>");function rt(e){let r=()=>{let t=e.items().map(n=>n.id),o=e.selectedToolId();return o&&t.includes(o)?o:t[0]};return(()=>{var t=Rr();return et(t,Fr(Mr,{get each(){return e.items()},children:o=>(()=>{var n=Or();return n.$$click=()=>e.setSelectedToolId(o.id),et(n,()=>o.name),Ir(()=>Ar(n,"data-active",r()===o.id?"":void 0)),n})()})),t})()}Dr(["click"]);var Pr=N('<div class=context-sidebar__tabs><button type=button class=context-sidebar__close title="Hide context sidebar"aria-label="Hide context sidebar">'),Ur=N("<div class=context-sidebar__content>"),Nr=N("<div class=context-sidebar>"),jr=N("<patchwork-view>",!0,!1,!1),Wr=N('<svg xmlns=http://www.w3.org/2000/svg width=18 height=18 viewBox="0 0 24 24"fill=none stroke=var(--studio-chrome-line) stroke-width=1.75 stroke-linecap=round stroke-linejoin=round><rect width=18 height=18 x=3 y=3 rx=2></rect><path d="M15 3v18">');function ot(e){let r=M("context-tool"),t=()=>{let o=r().map(i=>i.id),n=e.selectedToolId();return n&&o.includes(n)?n:o[0]};return I(Qe,{side:"right",get isCollapsed(){return e.isCollapsed},get width(){return e.width},get onMouseDown(){return e.onMouseDown},get onToggleClick(){return e.onToggleClick},get canExpand(){return e.canExpand},get children(){var o=Nr();return U(o,I(pe,{get when(){return r().length},get children(){var n=Pr(),i=n.firstChild;return U(n,I(rt,{items:r,get selectedToolId(){return e.selectedToolId},get setSelectedToolId(){return e.setSelectedToolId}}),i),i.$$click=()=>e.onCollapse(),U(i,I(fe,{})),n}}),null),U(o,I(pe,{get when(){return!e.isCollapsed()},get children(){var n=Ur();return U(n,I(pe,{get when(){return t()},keyed:!0,children:i=>(()=>{var a=jr();return a.component=i,a._$owner=zr(),a})()})),n}}),null),o}})}function fe(){return Wr()}Lr(["click"]);import{template as Hr}from"solid-js/web";import{effect as nt}from"solid-js/web";import{getOwner as at}from"solid-js/web";import{createComponent as Br}from"solid-js/web";import{memo as qr}from"solid-js/web";import{Show as Vr}from"solid-js";var it=Hr("<patchwork-view>",!0,!1,!1),ue=e=>Array.isArray(e)?String(e[0]):String(e);function wi(e){let r=new Set;return e.filter(t=>{let o=ue(t);return r.has(o)?!1:(r.add(o),!0)})}function xi(e){return Br(Vr,{get when(){return qr(()=>!!Array.isArray(e.slot))()?e.slot:!1},get fallback(){return(()=>{var r=it();return r._$owner=at(),nt(()=>r.component=String(e.slot)),r})()},children:r=>(()=>{var t=it();return t._$owner=at(),nt(o=>{var n=r()[1],i=r()[0];return n!==o.e&&(t.docUrl=o.e=n),i!==o.t&&(t.toolId=o.t=i),o},{e:void 0,t:void 0}),t})()})}var Gr=j("<div class=threepane__title>"),Kr=j("<div class=threepane__doctitle-tools>"),Zr=j('<button type=button class=frame__sidebar-toggle title="Show context sidebar"aria-label="Show context sidebar">'),Qr=j("<div class=frame__topbar><div class=threepane__spacer>"),eo=j("<patchwork-view>",!0,!1,!1);function ct(e){let r=()=>e.toolSlots()??[];return(()=>{var t=Qr(),o=t.firstChild;return F(t,R(me,{get when(){return e.docUrl()},get children(){var n=Gr();return F(n,R(Ye,{get docUrl(){return e.docUrl}})),n}}),o),F(t,R(me,{get when(){return lt(()=>!!e.docUrl())()&&r().length},get children(){var n=Kr();return F(n,R(to,{get each(){return r()},children:i=>(()=>{var a=eo();return a._$owner=Yr(),st(u=>{var d=ue(i),c=e.docUrl();return d!==u.e&&(a.toolId=u.e=d),c!==u.t&&(a.docUrl=u.t=c),u},{e:void 0,t:void 0}),a})()})),n}}),null),F(t,R(me,{get when(){return lt(()=>!!e.hasContext())()&&e.isRightCollapsed()},get children(){var n=Zr();return n.$$click=()=>e.onToggleRight(),Xr(n,"aria-pressed",!1),F(n,R(fe,{})),n}}),null),st(()=>t.classList.toggle("frame__topbar--left-collapsed",!!e.isLeftCollapsed())),t})()}Jr(["click"]);import{template as W}from"solid-js/web";import{setAttribute as dt}from"solid-js/web";import{effect as ro}from"solid-js/web";import{getOwner as oo}from"solid-js/web";import{insert as te}from"solid-js/web";import{createComponent as O}from"solid-js/web";import{memo as ht}from"solid-js/web";import{use as ve}from"solid-js/web";import{getType as co}from"@inkandswitch/patchwork-filesystem";import{getFallbackTool as ho,getRegistry as po}from"@inkandswitch/patchwork-plugins";import{createEffect as fo,createMemo as uo,createSignal as ge,onCleanup as mo,onMount as pt,For as go,Show as be}from"solid-js";var no=W("<div class=document-view>"),ao=W("<div class=placeholder>Select a document in the sidebar"),io=W("<patchwork-view>",!0,!1,!1),so=W("<div class=no-tool><svg class=no-tool__defs aria-hidden=true></svg><div class=no-tool__card><h2 class=no-tool__rough>no tool for this</h2><p>it's a <code class=no-tool__type></code>, and nothing here knows how to open one yet.</p><p>if a package brings a tool for it, it'll open right here."),lo=W("<svg><filter><feTurbulence type=fractalNoise baseFrequency=0.04 numOctaves=2></feTurbulence><feDisplacementMap in=SourceGraphic scale=1.4></svg>",!1,!0,!1);function ft({viewKey:e,selectedDocUrl:r,toolId:t,path:o,ref:n}){let i,[a,u]=ge();return pt(()=>{u(i.closest("repo-provider")?.repo??null)}),(()=>{var d=no();return ve(c=>{i=c,n?.(c)},d),te(d,O(be,{get when(){return ht(()=>a()!==void 0)()&&e()},keyed:!0,children:c=>O(bo,{get url(){return r()},toolId:t,path:o,get repo(){return a()}})}),null),te(d,(()=>{var c=ht(()=>!r());return()=>c()&&ao()})(),null),d})()}function bo(e){let r=po("patchwork:tool"),[t,o]=ge(0);mo(r.on("changed",()=>{o(d=>d+1)}));let[n,i]=ge();async function a(d){try{let c=await d?.find(e.url);i(c?.doc()??null)}catch{i(null)}}a(e.repo);let u=uo(()=>{t();let d=n();if(d===void 0)return;let c=d?co(d):void 0,s=e.toolId();if(!s&&d&&c)try{let l=ho(d);l&&!vo(l.supportedDatatypes,c)&&(s=l.id)}catch{}return{id:s,type:c,missing:!!c&&!(s&&r.get(s))}});return O(be,{get when(){return u()},children:d=>O(be,{get when(){return!d().missing},get fallback(){return O(xo,{get type(){return d().type},get url(){return e.url}})},get children(){var c=io();return ve(s=>fo(()=>{let l=e.path?.();l?s.setAttribute("path",l):s.removeAttribute("path")}),c),c._$owner=oo(),ro(s=>{var l=e.url,p=d().id;return l!==s.e&&(c.docUrl=s.e=l),p!==s.t&&(c.toolId=s.t=p),s},{e:void 0,t:void 0}),c}})})}function vo(e,r){let t=e==="*"?["*"]:e;return t.includes("*")&&!t.includes(r)}var wo=[1,2,3];function xo(e){let r;return pt(()=>{r.dispatchEvent(new CustomEvent("patchwork:no-tool",{bubbles:!0,composed:!0,detail:{url:e.url}}))}),(()=>{var t=so(),o=t.firstChild,n=o.nextSibling,i=n.firstChild,a=i.nextSibling,u=a.firstChild,d=u.nextSibling,c=r;return typeof c=="function"?ve(c,t):r=t,te(o,O(go,{each:wo,children:s=>(()=>{var l=lo(),p=l.firstChild;return dt(l,"id",`no-tool-rough-${s}`),dt(p,"seed",s),l})()})),te(d,()=>e.type),t})()}var yo=we("<patchwork-view component=patchwork-draft-state-provider>",!0,!1,!1),_o=we("<div class=frame__main-column><div class=frame__doc-column><div class=main-area>"),Co=we("<patchwork-view component=patchwork-draft-overlay-provider><patchwork-view component=patchwork-comments-provider><patchwork-view component=patchwork-focus-provider>",!0,!1,!1);function bt(e){let[r,t]=S(e.initialRightCollapsed()),[o,n]=S(e.initialRightWidth());ut(gt(r,p=>{try{localStorage.setItem(_.rightCollapsed,String(p))}catch{}},{defer:!0})),ut(gt(o,p=>{try{localStorage.setItem(_.rightWidth,String(p))}catch{}},{defer:!0}));let i=ce("right",{isCollapsed:r,setCollapsed:t,setWidth:n});So(()=>{let p=()=>t(!0);window.addEventListener(B,p),ko(()=>window.removeEventListener(B,p))});let[a,u]=le(S(),{name:_.contextToolId}),[d,c]=S(),s=$("patchwork-draft-state-provider",d),l=()=>s()?d():void 0;return C(ne,{get when(){return e.selectedDocUrl()},keyed:!0,children:p=>(()=>{var g=yo();return oe(c,g),g.docUrl=p,g._$owner=re(),H(g,C(ne,{get when(){return l()},children:b=>C($o,{get host(){return b()},get setMainDocElement(){return e.setMainDocElement},get selectedDocUrl(){return e.selectedDocUrl},get selectedToolId(){return e.selectedToolId},get doctitleSlots(){return e.doctitleSlots},get isLeftCollapsed(){return e.isLeftCollapsed},isRightSidebarCollapsed:r,setIsRightSidebarCollapsed:t,rightSidebarWidth:o,get handleMouseDown(){return i.handleMouseDown},get handleToggleClick(){return i.handleToggleClick},selectedContextToolId:a,setSelectedContextToolId:u})})),g})()})}function $o(e){let r=M("context-tool"),t=()=>r().length>0,o=mt(()=>e.selectedDocUrl()),[n,i]=S(),a=$("patchwork-draft-overlay-provider",n),[u,d]=S(),c=$("patchwork-comments-provider",u),[s,l]=S(),p=$("patchwork-focus-provider",s),g=mt(()=>a()&&c()&&p());return(()=>{var b=Co(),f=b.firstChild,h=f.firstChild;return oe(i,b),b._$owner=re(),oe(d,f),f._$owner=re(),oe(l,h),h._$owner=re(),H(h,C(ne,{get when(){return g()},get children(){var m=_o(),v=m.firstChild,y=v.firstChild;return H(v,C(ct,{get docUrl(){return e.selectedDocUrl},get toolSlots(){return e.doctitleSlots},get isLeftCollapsed(){return e.isLeftCollapsed},hasContext:t,get isRightCollapsed(){return e.isRightSidebarCollapsed},onToggleRight:()=>e.setIsRightSidebarCollapsed(x=>!x)}),y),H(y,C(ft,{viewKey:o,get selectedDocUrl(){return e.selectedDocUrl},get toolId(){return e.selectedToolId},ref:x=>e.setMainDocElement?.(x)})),H(m,C(ne,{get when(){return t()},get children(){return C(ot,{get selectedToolId(){return e.selectedContextToolId},get setSelectedToolId(){return e.setSelectedContextToolId},get isCollapsed(){return e.isRightSidebarCollapsed},get width(){return e.rightSidebarWidth},get onMouseDown(){return e.handleMouseDown},get onToggleClick(){return e.handleToggleClick},onCollapse:()=>e.setIsRightSidebarCollapsed(!0)})}}),null),m}})),b})()}var ae=`:root,
:host,
[theme] {
  --threepane-bg: var(--studio-fill, white);
  --threepane-sidebar-fill: var(--studio-chrome, var(--studio-fill, white));
  --threepane-fg: var(--studio-line, black);
  /* ink for text sitting ON the sidebar/account-bar chrome surface. mirrors the
     toolbar/context-sidebar fg: it rides --studio-chrome-line (the chrome's own
     ink) so it tracks the chrome palette, not the content page. --threepane-fg
     is content ink and only belongs on --threepane-bg surfaces. */
  --threepane-sidebar-fg: var(--studio-chrome-line, var(--studio-line, black));
  --threepane-muted: var(--studio-line-offset-50, #999);
  --threepane-family: var(--studio-family-sans, system-ui, sans-serif);
  --threepane-family-code: var(--studio-family-code, ui-monospace, monospace);

  /* spacing scale, aliased from the base theme */
  --threepane-space-3xs: var(--studio-space-3xs, 0.125rem);
  --threepane-space-2xs: var(--studio-space-2xs, 0.25rem);
  --threepane-space-xs: var(--studio-space-xs, 0.375rem);
  --threepane-space-sm: var(--studio-space-sm, 0.5rem);
  --threepane-space: var(--studio-space, 0.75rem);
  --threepane-space-md: var(--studio-space-md, 1rem);
  --threepane-space-2xl: var(--studio-space-2xl, 3rem);

  /* radius scale, aliased from the base theme */
  --threepane-radius-xs: var(--studio-radius-xs, 2px);
  --threepane-radius-sm: var(--studio-radius-sm, 4px);
  --threepane-radius-md: var(--studio-radius-md, 8px);
  --threepane-radius-round: var(--studio-radius-round, 9999px);

  /* Height of the frame's top strip: the top bar over the main column, and the
     matching empty space reserved above the left sidebar's widgets so the two
     line up and the left toggle has a home. */
  --threepane-header-height: calc(
    env(safe-area-inset-top, 0px) + var(--threepane-space-2xl)
  );

  /* the left footer and right tray boxes share one height so they line up. */
  --threepane-tray-height: var(--threepane-space-2xl);
  /* sidebar toggles ride a touch paler than the line (first ink offset). they
     sit on chrome (left toggle over the sidebar, right over the toolbar), so
     they use the chrome ink ramp, not the content one. */
  --threepane-toggle-fg: var(--studio-chrome-line-offset-10, var(--studio-line-offset-10, #333));

  --threepane-toolbar: var(--studio-chrome, white);
  /* toolbar text rides on the chrome surface, so it uses the chrome ink */
  --threepane-toolbar-fg: var(--studio-chrome-line, var(--studio-line, black));
  --threepane-toolbar-border: var(--studio-chrome-offset-10, #ddd);
  /* Resize handle: a faint 1px divider that tracks the chrome ramp's contrast
     (it mixes toward the chrome ink, so it reads darker on light themes and
     lighter on dark ones), plus a primary-tinted glow + grab pill on hover. */
  --threepane-sidebar-divider: var(--studio-chrome-offset-20, #d4d4d4);
  --threepane-resize-glow: color-mix(in oklch, var(--studio-primary-fill, var(--studio-primary, #35f7ca)), transparent 35%);
  --threepane-resize-pill: var(--studio-primary-fill, var(--studio-primary, #35f7ca));

  /* The context (right) sidebar sits on a chrome surface stepped one offset off
     the toolbar's flat chrome, so the two chrome regions read as distinct. */
  --threepane-context-sidebar-fill: var(--studio-chrome-offset-10, #ececec);

  /* Context sidebar (tabbed) */
  --context-sidebar-bg: var(--threepane-context-sidebar-fill);
  /* the tab-bar header rides on the same flat chrome as the toolbar above it,
     so the two chrome strips read as one continuous band */
  --context-sidebar-header-bg: var(--studio-chrome, #f2f2f2);
  --context-sidebar-fg: var(--studio-chrome-line, var(--studio-line, black));
  /* match the lines drawn around the document-view so tab/tray edges read as
     one continuous frame */
  --context-sidebar-border: var(--threepane-toolbar-border);
  --context-sidebar-tab-fg: var(--studio-chrome-line-offset-40, var(--studio-line-offset-40, #666));
  --context-sidebar-tab-hover: var(--studio-chrome-offset-10, #e5e5e5);
  --context-sidebar-tab-active-bg: var(--studio-fill, white);
  --context-sidebar-tab-active-fg: var(--studio-line, black);
  --context-sidebar-tab-active-accent: var(--studio-primary-line, var(--studio-primary, #35f7ca));
  /* the content panel shares the active tab's surface so the selected tab
     connects seamlessly into the tool view below it */
  --context-sidebar-content-bg: var(--context-sidebar-tab-active-bg);
  --context-sidebar-family: var(--studio-family-sans, system-ui, sans-serif);
}

.frame-shell {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}

.frame-warning-banner {
  flex: none;
  padding: var(--threepane-space-2xs) var(--threepane-space-sm);
  text-align: center;
  text-transform: uppercase;
  font-family: var(--studio-family-ui, var(--threepane-family));
  font-size: 0.75rem;
  background: var(--studio-warning-fill, yellow);
  color: var(--studio-warning-line);
}

.frame {
  position: relative;
  display: flex;
  width: 100%;
  flex: 1;
  min-height: 0;
  font-family: var(--threepane-family);
  color: var(--threepane-fg);
  background: var(--threepane-bg);
}

.frame__version {
  position: absolute;
  top: var(--threepane-space-2xs);
  right: var(--threepane-space-sm);
  z-index: 10;
  color: var(--threepane-muted);
  font-size: 0.75rem;
  font-weight: 500;
  pointer-events: none;
  user-select: none;
}

.sidebar {
  position: relative;
  display: flex;
  flex: none;
  /* visible so the resize handle can straddle the boundary (sit on *both*
     sides of the divider line); the content clips itself instead. z-index lifts
     the handle's outer half above the main area so it stays grabbable. */
  overflow: visible;
  z-index: 1;
}

.sidebar[data-collapsed] {
  overflow: visible;
}

.sidebar[data-side="left"] {
  background: var(--threepane-sidebar-fill);
  color: var(--threepane-sidebar-fg);
}

.sidebar[data-side="right"] {
  background: var(--threepane-context-sidebar-fill);
}

.main-area {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
}

/* The main column (right of the left sidebar): a row of
   [document column | right sidebar], so the right sidebar spans the full frame
   height and its resize divider runs top-to-bottom exactly like the left one. */
.frame__main-column {
  position: relative;
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: row;
  height: 100%;
  overflow: hidden;
}

/* The document column: the top bar over the main document view. Sits left of the
   full-height context sidebar. */
.frame__doc-column {
  flex: 1;
  min-width: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
}

.frame__doc-column > patchwork-view,
.frame__doc-column > patchwork-view > patchwork-view,
.frame__doc-column > patchwork-view > patchwork-view > patchwork-view,
.frame__doc-column
  > patchwork-view
  > patchwork-view
  > patchwork-view
  > patchwork-view {
  display: contents;
}

/* The full-width top toolbar. Its height + top safe-area inset match the
   sideboard's reserved top margin so the bar reads as continuous across the top
   (the left sidebar's empty top region lines up with it). */
.frame__topbar {
  display: flex;
  align-items: stretch;
  box-sizing: border-box;
  min-height: var(--threepane-space-2xl);
  padding-top: env(safe-area-inset-top, 0px);
  padding-inline: var(--threepane-space-2xs);
  gap: var(--threepane-space-2xs);
  background: var(--threepane-toolbar);
  color: var(--threepane-toolbar-fg);
  /* A hairline along the bottom, in the same colour as the document-view's
     border, so the line under the bar runs unbroken across the whole width
     (document column + context tabs). The active tab pulls down 1px to break
     through it and connect to its panel below. */
  border-bottom: 1px solid var(--threepane-toolbar-border);
  /* Animate the collapsed left-slot in step with the sidebar's width transition
     so the title glides up against the pinned toggle instead of jumping. */
  transition: padding-left var(--studio-transition-slow, 0.25s ease);
}

/* When the left sidebar is collapsed the bar's left edge reaches the frame edge,
   where the pinned left toggle lives; reserve a matching slot so the title slides
   up against the toggle rather than under it. */
.frame__topbar--left-collapsed {
  padding-left: var(--threepane-space-2xl);
}

/* The left sidebar toggle, pinned to the frame's top-left corner so it keeps the
   same spot whether the sidebar is open or closed. Square, filling the top strip;
   sits over the sidebar's reserved (empty) top area when open. */
.frame__left-toggle {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 5;
  width: var(--threepane-space-2xl);
  height: var(--threepane-header-height);
  padding-top: env(safe-area-inset-top, 0px);
}

/* A sidebar toggle at either end of the top bar (always present). */
.frame__sidebar-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  padding-inline: var(--threepane-space-sm);
  border: none;
  background: transparent;
  color: var(--threepane-toggle-fg);
  cursor: pointer;
  transition: color var(--studio-transition-fast, 0.1s ease);
}

.frame__sidebar-toggle:hover {
  color: var(--threepane-sidebar-fg);
}

/* The document title, rendered intrinsically: shrinks to the title's width but
   never past half the bar; ellipsis beyond. */
.threepane__title {
  display: flex;
  align-items: center;
  flex: 0 1 auto;
  min-width: 0;
  max-width: 50%;
  overflow: hidden;
  padding-inline: var(--threepane-space-sm);
}

.threepane__title-text {
  font-weight: 600;
  white-space: nowrap;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
}

.threepane__title-text--editable {
  cursor: text;
}

.threepane__title-text--editable:hover {
  opacity: 0.7;
}

.threepane__title-input {
  font: inherit;
  font-weight: 600;
  color: inherit;
  min-width: 0;
  width: 100%;
  padding: 0;
  margin: 0;
  border: none;
  outline: none;
  background: transparent;
}

/* built-in spacer between the title and the right-hand tools */
.threepane__spacer {
  flex: 1;
  min-width: var(--threepane-space-sm);
}

/* configured doctitle tools at the right end; scroll horizontally when they
   overflow rather than squashing. */
.threepane__doctitle-tools {
  display: flex;
  align-items: center;
  gap: var(--threepane-space-sm);
  min-width: 0;
  padding-inline: var(--threepane-space-sm);
  overflow-x: auto;
  overflow-y: hidden;
  scrollbar-width: none;
}

.threepane__doctitle-tools::-webkit-scrollbar {
  display: none;
}

.threepane__doctitle-tools patchwork-view {
  display: flex;
  align-items: center;
  height: 2rem;
  flex-shrink: 0;
  width: auto;
}

.document-view {
  flex: 1;
  min-height: 0;
  overflow: hidden;
  /* Left divider only, square corners. The top line is the top bar's
     border-bottom and the bottom is open to the frame edge. The right divider
     (to the context sidebar) is the sidebar's own full-height border-left, so
     it runs the whole frame height rather than just the document view. When the
     left sidebar is collapsed the left divider is dropped (see the :has rule
     below) so nothing rides the frame edge. */
  border-left: 1px solid var(--threepane-toolbar-border);
}

/* Left sidebar collapsed to 0: drop the document-view's left divider so there's
   no stray line hugging the frame's left edge. */
.frame:has(.sidebar[data-side="left"][data-collapsed]) .document-view {
  border-left: none;
}

.document-view patchwork-view {
  display: block;
  width: 100%;
  height: 100%;
}

.placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: var(--threepane-fg);
}

/* a doc nothing here has a tool for: the card lattice shows, in its colours */
.no-tool {
  --no-tool-ink: var(--studio-line, #1c1a17);
  --no-tool-muted: var(--studio-line-offset-50, color-mix(in oklab, var(--no-tool-ink) 55%, transparent));
  --no-tool-line: var(--studio-chrome-line, var(--no-tool-ink));
  --no-tool-sheet: var(--editor-fill, var(--text-editor-fill, var(--studio-fill, #fffdf5)));
  --no-tool-highlighter: var(--studio-selection-fill, #ffee8888);
  --no-tool-radius: var(--studio-radius-sm, 3px);
  --no-tool-serif: "Fraunces", "Iowan Old Style", Palatino, Georgia, serif;
  --no-tool-mono: var(--studio-family-code, Monaco, ui-monospace, monospace);

  display: grid;
  box-sizing: border-box;
  height: 100%;
  place-items: center;
  padding: 16px;
}

.no-tool__defs {
  position: absolute;
  width: 0;
  height: 0;
}

.no-tool__card {
  max-width: 320px;
  padding: 24px 28px 20px;
  border: 1px solid var(--no-tool-line);
  border-radius: 0.5em;
  background: var(--no-tool-sheet);
  box-shadow: 0 0 10px 2px #66003322;
  text-align: center;

  & p {
    margin: 0 0 12px;
    color: var(--no-tool-muted);
  }
}

.no-tool__type {
  padding: 1px 5px;
  border-radius: var(--no-tool-radius);
  background: var(--no-tool-highlighter);
  color: var(--no-tool-ink);
  font: 11px var(--no-tool-mono);
}

/* the serif is drawn by hand, a little; it wobbles while you're near */
.no-tool__rough {
  margin: 0 0 6px;
  font: 400 28px/1.1 var(--no-tool-serif);
  filter: url(#no-tool-rough-1);

  .no-tool__card:hover & {
    animation: no-tool-boil 0.6s steps(1) infinite;
  }
}

@media (prefers-reduced-motion: reduce) {
  .no-tool__card:hover .no-tool__rough {
    animation: none;
  }
}

@keyframes no-tool-boil {
  0% { filter: url(#no-tool-rough-1); }
  33% { filter: url(#no-tool-rough-2); }
  66% { filter: url(#no-tool-rough-3); }
}

.sidebar patchwork-view {
  display: block;
  width: 100%;
  height: 100%;
  /* the sidebar itself doesn't clip, so the content does */
  overflow: hidden;
}

/* Context sidebar (tabbed): lifted tabs with a top accent bar and surface fill
   on the active tab, a hover surface, and a bottom-border separator between the
   tab bar and the mounted tool view. */
.context-sidebar {
  flex: 1;
  min-width: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  font-family: var(--context-sidebar-family);
  color: var(--context-sidebar-fg);
  background: var(--context-sidebar-bg);
  /* The full-height divider between the document column and the sidebar. Lives
     here (not on the document view) so it runs the whole frame height \u2014 top bar
     level included \u2014 and the resize handle straddling this edge is grabbable end
     to end, matching the left sidebar. */
  border-left: 1px solid var(--context-sidebar-border);
}

/* Tab bar: the row holding the tab list and the collapse button. Its height +
   top safe-area inset match the document column's top bar so the two header
   strips line up and their bottom hairlines read as one continuous line across
   the divider. */
.context-sidebar__tabs {
  display: flex;
  align-items: flex-end;
  box-sizing: border-box;
  min-height: var(--threepane-space-2xl);
  padding-top: env(safe-area-inset-top, 0px);
  background: var(--context-sidebar-header-bg);
  border-bottom: 1px solid var(--context-sidebar-border);
}

.context-sidebar__tablist {
  display: flex;
  flex: 1;
  min-width: 0;
  align-items: flex-end;
  gap: var(--threepane-space-2xs);
  padding-inline: var(--threepane-space-2xs);
  /* when there are more tabs than fit, scroll them horizontally rather than
     letting them shrink/wrap; scrollbar hidden for a clean header. */
  overflow-x: auto;
  overflow-y: hidden;
  scrollbar-width: none;
  /* extend the clip box 1px past the tab-bar border (compensated by the
     negative margin so layout is unchanged) so the active tab's -1px overflow
     isn't clipped by the horizontal scroll container, and it can still cover
     the border-bottom to connect into the panel. */
  padding-bottom: 1px;
  margin-bottom: -1px;
}
.context-sidebar__tablist::-webkit-scrollbar {
  display: none;
}

/* A single tab. */
.context-sidebar__tab {
  display: flex;
  align-items: center;
  flex-shrink: 0;
  padding: var(--threepane-space-xs) var(--threepane-space-sm);
  border: 1px solid transparent;
  border-bottom: none;
  border-top-left-radius: var(--threepane-radius-xs);
  border-top-right-radius: var(--threepane-radius-xs);
  background: transparent;
  font-family: inherit;
  font-size: 0.875rem;
  white-space: nowrap;
  color: var(--context-sidebar-tab-fg);
  cursor: pointer;
  user-select: none;
  transition: background var(--studio-transition-fast, 0.1s ease),
    color var(--studio-transition-fast, 0.1s ease);
}

.context-sidebar__tab:hover {
  background: var(--context-sidebar-tab-hover);
  color: var(--context-sidebar-tab-active-fg);
}

/* Exception: the selected tab. Pulled down 1px so its fill covers the tab-bar's
   bottom border, connecting the tab seamlessly into the panel below. */
.context-sidebar__tab[data-active] {
  position: relative;
  margin-bottom: -1px;
  background: var(--context-sidebar-tab-active-bg);
  color: var(--context-sidebar-tab-active-fg);
  border-color: var(--context-sidebar-border);
  box-shadow: inset 0 1px 0 0 var(--context-sidebar-tab-active-accent);
}

/* The close (collapse) button. Centred vertically in the tab header (the header
   is otherwise flex-end for the tabs) so it lands at the same height as the
   reopen toggle in the top bar when the sidebar is collapsed. */
.context-sidebar__close {
  display: flex;
  align-items: center;
  justify-content: center;
  align-self: center;
  flex-shrink: 0;
  padding-inline: var(--threepane-space-sm);
  margin-right: var(--threepane-space-2xs);
  border: none;
  background: transparent;
  color: var(--context-sidebar-fg);
  cursor: pointer;
  opacity: 0.5;
  transition: opacity var(--studio-transition-fast, 0.1s ease);
}

.context-sidebar__close:hover {
  opacity: 1;
}

/* The mounted tool view. */
.context-sidebar__content {
  flex: 1;
  min-height: 0;
  overflow: auto;
  background: var(--context-sidebar-content-bg);
  contain: content;
}

.context-sidebar__content patchwork-view {
  display: block;
  width: 100%;
  height: 100%;
}

/* Left sidebar body: a stack of widgets with the account footer pinned below. */
.threepane-sidebar {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  min-height: 0;
}

/* Reserve the docked tray's height at the sidebar's bottom so the account bar
   sits above the tray (which is pinned outside this collapsing column). */
.threepane-sidebar--has-tray {
  padding-bottom: calc(
    var(--threepane-tray-height) + env(safe-area-inset-bottom, 0px)
  );
}

/* account / packages / settings footer, pinned to the sidebar bottom */
.threepane-sidebar--has-tray .threepane-sidebar__footer {
  flex: none;
  margin-bottom: calc(var(--threepane-tray-height) + env(safe-area-inset-bottom, 0px));
}

/* The inlined account bar: avatar (account picker) + Packages + Settings. */
.threepane-account-bar {
  container-type: inline-size;
  display: flex;
  align-items: center;
  gap: var(--threepane-space-md);
  min-height: var(--threepane-space-2xl);
  box-sizing: border-box;
  background: var(--threepane-sidebar-fill);
  color: var(--threepane-sidebar-fg);
  border-top: 1px solid var(--threepane-sidebar-divider);
  padding-block: var(--threepane-space-2xs);
  padding-bottom: calc(var(--threepane-space-2xs) + env(safe-area-inset-bottom));
  padding-left: calc(env(safe-area-inset-left) + var(--threepane-space-md));
  padding-right: calc(env(safe-area-inset-right) + var(--threepane-space-md));
  justify-content: space-between;
  overflow: hidden;
}

.threepane-account-bar__button {
  display: flex;
  align-items: center;
  border: 1px solid transparent;
  padding-inline: var(--threepane-space-2xs);
  padding-block: var(--threepane-space-3xs);
  border-radius: var(--threepane-radius-xs);
  background: transparent;
  color: inherit;
  font: inherit;
  white-space: nowrap;
  cursor: pointer;
}

.threepane-account-bar__button:hover {
  border-color: var(--threepane-sidebar-divider);
}

.threepane-account-bar__avatar {
  padding: 0;
}

.threepane-account-bar__avatar patchwork-view {
  display: block;
  width: 100%;
  height: 100%;
}

/* Left sidebar: a stack of configured widgets. The widgets start below the
   frame's top strip (the empty space matching the top bar), so the frame owns
   that spacing rather than each widget reserving its own top margin. */
.threepane-widgets {
  flex: 1;
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 0;
  padding-top: var(--threepane-header-height);
  gap: 1rem;
}

.threepane-widget {
  position: relative;
  flex: 1;
  min-height: 0;
  overflow: hidden;
}

.threepane-widget patchwork-view {
  display: block;
  width: 100%;
  height: 100%;
}

/* empty state: offer to add the document list */
.threepane-widgets__empty {
  flex: 1;
  display: flex;
  align-items: flex-start;
  justify-content: center;
}

.threepane-widgets__add {
  padding: var(--threepane-space-xs) var(--threepane-space-sm);
  border: 1px dashed var(--threepane-sidebar-divider);
  border-radius: var(--threepane-radius-sm);
  background: transparent;
  color: var(--threepane-muted);
  font: inherit;
  cursor: pointer;
  white-space: nowrap;
}

.threepane-widgets__add:hover:not(:disabled) {
  color: var(--threepane-sidebar-fg);
  border-color: var(--threepane-sidebar-fg);
}

.threepane-widgets__add:disabled {
  opacity: 0.5;
  cursor: default;
}

/* System tray dock: pinned to the frame's bottom-left. Lives outside the
   collapsing left sidebar so it isn't torn down when the sidebar closes. When
   the sidebar is open the dock spans its width (set inline) and fills the space
   reserved by \`threepane-sidebar--has-tray\`; when the sidebar closes the dock is
   hidden (\`display: none\`) but stays mounted, so the tray is invisible while its
   tools keep running. */
.frame__tray-dock {
  position: absolute;
  left: 0;
  bottom: 0;
  z-index: 4;
  box-sizing: border-box;
  /* Fade the tray in only *after* the sidebar's width animation completes, so it
     doesn't flash at full size over the still-expanding sidebar. The delay equals
     the sidebar's transition duration; collapsing overrides this to hide at once. */
  opacity: 1;
  transition: opacity 0.1s ease 0.25s;
}

.frame__tray-dock--collapsed {
  opacity: 0;
  pointer-events: none;
  /* Hide immediately on collapse \u2014 no wait, no fade. */
  transition: opacity 0s;
}

/* A row of tray-tagged tools, filling the dock. */
.frame-tray {
  display: flex;
  align-items: center;
  gap: var(--threepane-space-2xs);
  box-sizing: border-box;
  /* min-height includes the safe-area inset (border-box), and the matching
     padding-bottom lifts the tray's contents clear of it while the tray's own
     background fills the inset down to the very bottom edge. */
  min-height: calc(
    var(--threepane-tray-height) + env(safe-area-inset-bottom, 0px)
  );
  padding-inline: var(--threepane-space-sm);
  padding-bottom: env(safe-area-inset-bottom, 0px);
  border-top: 1px solid var(--threepane-sidebar-divider);
  background: var(--threepane-sidebar-fill);
}

.frame-tray__item {
  display: flex;
  align-items: center;
}

.frame-tray patchwork-view {
  display: flex;
  width: auto;
  height: auto;
}

/* Isolation-mode chrome popover.
   In isolation the main document area is a sandboxed iframe, so host-realm tools
   opened from the account bar (account picker / Packages / Settings) are floated
   over the frame here instead of being routed into the iframe. The backdrop is a
   lowish-opacity, theme-tinted ink wash (dims the frame + picks up the theme's
   ink hue); the panel carries a soft drop shadow so it reads as lifted. Absolute
   inset:0 resolves to the \`.frame\` (its nearest positioned ancestor). */
.frame__popover-backdrop {
  position: absolute;
  inset: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--threepane-space-2xl);
  background: color-mix(in oklch, var(--threepane-fg), transparent 82%);
  animation: frame-popover-fade var(--studio-transition, 0.15s ease);
}

.frame__popover {
  display: flex;
  flex-direction: column;
  width: min(1100px, 100%);
  height: min(900px, 100%);
  overflow: hidden;
  background: var(--threepane-bg);
  color: var(--threepane-fg);
  border: 1px solid var(--threepane-toolbar-border);
  border-radius: var(--threepane-radius-md);
  box-shadow:
    0 32px 80px color-mix(in oklch, var(--threepane-fg), transparent 45%),
    0 12px 32px color-mix(in oklch, var(--threepane-fg), transparent 60%),
    0 2px 8px color-mix(in oklch, var(--threepane-fg), transparent 70%);
  animation: frame-popover-pop var(--studio-transition, 0.15s ease);
}

/* The "Open with" picker, docked to the popover's top. Sits at its natural
   height above the tool body; the doc-openwith tool renders a small titlebar
   button, so this is left-aligned chrome rather than a full-height view. */
.frame__popover-toolbar {
  display: flex;
  align-items: center;
  flex: 0 0 auto;
  gap: var(--threepane-space-sm);
  padding: var(--threepane-space-sm) var(--threepane-space-md);
  border-bottom: 1px solid var(--threepane-toolbar-border);
}

.frame__popover-toolbar patchwork-view {
  display: block;
}

.frame__popover-body {
  flex: 1 1 auto;
  min-height: 0;
  overflow: auto;
}

.frame__popover-body patchwork-view {
  display: block;
  width: 100%;
  height: 100%;
  overflow: auto;
}

@keyframes frame-popover-fade {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes frame-popover-pop {
  from {
    opacity: 0;
    transform: translateY(8px) scale(0.98);
  }
  to {
    opacity: 1;
    transform: none;
  }
}

.frame {
.sidebar-toggle {
  position: relative;
  align-self: stretch;
  height: 100%;
  padding: 0;
  /* 1px wide, overlapping the divider border while reserving no layout column
     (content stays flush against the view's border - no offset-bg seam). The
     divider border is painted inside the following column, so a centered 2px
     strip reads half a pixel left of the line. */
  width: 1px;
  margin-inline: 0 -1px;
  margin-block: 0;
  border: 0;
  z-index: 1;
  cursor: pointer;
  /* transparent at rest - the visible divider is the main view's border; the
     handle lights up (full-height glow + pill) on hover to signal resize. */
  background: transparent;
  transition: background-color var(--studio-transition, 0.15s ease);
  /* invisible hit target straddling the divider. The toggle sits on opposite
     edges of the two sidebars (right edge of the left pane, left edge of the
     right pane). The grab area reaches 6px past the line on both sides, so it
     works the same on either edge without per-side rules. */
  &::before {
    content: "";
    position: absolute;
    inset-block: 0;
    inset-inline: -6px;
  }
  &::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: 5px;
    height: 44px;
    border-radius: var(--threepane-radius-round);
    background: var(--threepane-resize-pill);
    opacity: 0;
    transform: translate(-50%, -50%) scaleY(0.55);
    transition: opacity var(--studio-transition, 0.15s ease),
      transform var(--studio-transition, 0.15s ease);
    pointer-events: none;
  }
  /* on hover the divider line lights up in the frame primary */
  &:hover,
  &:active {
    background: var(--threepane-resize-glow);
  }
  &:hover::after,
  &:active::after {
    opacity: 1;
    transform: translate(-50%, -50%) scaleY(1);
  }
}

.sidebar-toggle--resizable {
  cursor: col-resize;
  &:hover {
    cursor: col-resize;
  }
  &:active {
    cursor: col-resize;
  }
}

}

/* Animate sidebar width on collapse/expand, but never while the handle is being
   actively dragged - the width must track the pointer 1:1 with no easing lag.
   The body flag is set for the duration of a drag by \`useSidebarResize\`. */
.sidebar {
  transition: width var(--studio-transition-slow, 0.25s ease);
}
body[data-sidebar-resizing] .sidebar {
  transition: none;
}
`;function vt(){let e="patchwork-frame-styles",r=document.getElementById(e);if(r){r.textContent!==ae&&(r.textContent=ae);return}let t=document.createElement("style");t.id=e,t.textContent=ae,document.head.append(t)}var Fo=yt("<patchwork-view component=patchwork-isolation root-component=threepane-isolation-root shared-providers=patchwork:contact,patchwork:selected-doc,patchwork:worker-channel shared-tools=llm-config-tray style=display:contents><script type=application/json data-root-component-data>",!0,!1,!1),Ro=yt("<div class=frame>");function ys(e){let r=wt(()=>{let o=new Set,n=e.selectedDocUrl();return n&&o.add(n),e.contactUrl&&o.add(e.contactUrl),[...o]}),t=wt(()=>JSON.stringify({selectedDocUrl:e.selectedDocUrl(),selectedToolId:e.selectedToolId(),doctitleSlots:e.doctitleSlots(),isLeftCollapsed:e.isLeftCollapsed(),initialRightWidth:e.initialRightWidth(),initialRightCollapsed:e.initialRightCollapsed()}));return(()=>{var o=Fo(),n=o.firstChild;return o._$owner=Io(),_t(n,t),Ao(()=>Do(o,"automerge-allowlist",r().join(","))),o})()}function xt(e){if(!e?.textContent)return{};try{return JSON.parse(e.textContent)}catch(r){return console.error("[threepane-isolation-root] bad props JSON:",r),{}}}function _s(e){vt();let r=e.querySelector('script[type="application/json"]'),[t,o]=Oo(xt(r)),n=new MutationObserver(()=>{o(Mo(xt(r)))});r&&n.observe(r,{characterData:!0,childList:!0,subtree:!0});let i=Lo(()=>(()=>{var a=Ro();return _t(a,To(bt,{selectedDocUrl:()=>t.selectedDocUrl,selectedToolId:()=>t.selectedToolId,doctitleSlots:()=>t.doctitleSlots,isLeftCollapsed:()=>t.isLeftCollapsed??!1,initialRightWidth:()=>t.initialRightWidth??q,initialRightCollapsed:()=>t.initialRightCollapsed??!1})),a})(),e);return()=>{n.disconnect(),i()}}export{Oe as a,z as b,_ as c,B as d,q as e,$e as f,Ee as g,Dt as h,ce as i,jt as j,Qe as k,ue as l,wi as m,xi as n,ft as o,bt as p,vt as q,ys as r,_s as s};
//# sourceMappingURL=chunk-SQVJHGM5.js.map
