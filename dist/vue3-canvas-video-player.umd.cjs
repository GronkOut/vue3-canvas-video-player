(function(e,w){typeof exports=="object"&&typeof module<"u"?module.exports=w(require("vue")):typeof define=="function"&&define.amd?define(["vue"],w):(e=typeof globalThis<"u"?globalThis:e||self,e.Vue3CanvasVideoPlayer=w(e.Vue))})(this,function(e){"use strict";const w=l=>{const t=parseInt(l),c=Math.floor(t/3600),a=Math.floor(t%3600/60),s=t%60;return`${c<10?"0"+c:c}:${a<10?"0"+a:a}:${s<10?"0"+s:s}`},M=(l,t)=>Math.round(l*t),W=(l,t)=>l/t,z=l=>l===void 0?!1:new Intl.NumberFormat().format(l),n=e.reactive({container:{element:null,fullScreen:!1,type:"overlay",mouseDown:!1,mouseMove:!1,mouseHold:!1},video:{element:null,src:"",canvas:null,width:0,height:0,duration:0,currentTime:0,muted:!1,volume:1,loop:!1,playbackRate:1,paused:!0,fps:0},progress:{seekWidth:0,seekTotal:0,bufferWidth:0},preview:{enabled:!1,element:null,left:0,time:"00:00:00"},range:{start:0,end:0,left:0,width:0,enabled:!1},bbox:{data:{},borderSize:1,borderColor:"rgba(255, 0, 0, 0.5)",fillColor:"rgba(0, 0, 255, 0.5)",enabled:!1},message:{time:1e3,visible:!1,text:""},block:{text:""}});let P=!1;function S(){const l=e.computed(()=>n.range.start>0&&n.range.end>0),t=e.computed(()=>n.video.fps>0),c=e.computed(()=>Object.keys(n.bbox.data).length>0),a=()=>{const{video:{element:o,canvas:r,width:d,height:u,duration:_,fps:v},range:{start:k,end:H},bbox:{data:R,fillColor:O,borderSize:E,borderColor:dt}}=n,D=r.getContext("2d");r.width=d,r.height=u,o.loop=n.video.loop,l.value&&(o.currentTime=k);const Y=()=>{const{video:{loop:ct},range:{enabled:ft},bbox:{enabled:pt}}=n;D.drawImage(o,0,0,d,u);let L=n.video.currentTime=o.currentTime;if(l.value&&ft?(F(),n.progress.seekWidth=((L-k)/(H-k)*100).toFixed(10),n.progress.bufferWidth=100):(o.ended&&ct&&(L=0),n.progress.seekWidth=(L/_*100).toFixed(10),o.buffered.length>0&&(n.progress.bufferWidth=o.buffered.end(o.buffered.length-1)/_*100)),t.value&&c.value&&pt){const mt=M(L,v),B=R[mt];if(B&&B.length===4){const Z=B[0],X=B[1],ee=B[2]-B[0],te=B[3]-B[1];D.fillStyle=O,D.fillRect(Z,X,ee,te),E&&(D.lineWidth=E,D.strokeStyle=dt,D.strokeRect(Z-E/2,X-E/2,ee+E,te+E))}}o.paused&&Math.floor(n.progress.seekWidth)===100&&(n.video.paused=!0),window.requestAnimationFrame(Y)};Y()},s=o=>{const{video:{element:r,duration:d,fps:u},range:{enabled:_,start:v,end:k}}=n;r.currentTime=l.value&&_?Math.max(Math.min(o,k),v):Math.max(Math.min(o,d),0),x(`Seek ${w(r.currentTime)} ${t.value?`[${z(M(r.currentTime,u))}]`:""} (${l.value&&_?Math.round((r.currentTime-v)/(k-v)*100):Math.round(r.currentTime/d*100)}%)`)},g=({offsetX:o})=>{const{container:{mouseDown:r},video:{element:d,duration:u},progress:{seekTotal:_},preview:{enabled:v,element:k},range:{enabled:H,start:R,end:O}}=n;if(!d)return;const E=H?o/_*(O-R)+R:o/_*u;E===1/0||isNaN(E)||(r&&s(E),k&&v&&(k.currentTime=E,n.preview.time=w(E),o<65?n.preview.left=65:o>_-65?n.preview.left=_-65:n.preview.left=o))};let N;const V=({detail:o})=>{if(o===1){const{video:{element:r,paused:d},range:{enabled:u,start:_,end:v}}=n;N=setTimeout(()=>{d?(l.value&&u&&r.currentTime===v&&(r.currentTime=_),r.play()):r.pause(),x(d?"Play":"Pause"),n.video.paused=!d},250)}else o===2&&(clearTimeout(N),G())},h=o=>{const{video:{element:r}}=n,d=Math.max(Math.min(o,1),0);r.volume=n.video.volume=d,x(`Volume ${Math.floor(d*100)}%`)},y=({offsetY:o})=>{const{container:{mouseDown:r}}=n;r&&h((100-o)/100)},p=()=>{const{video:{element:o,muted:r}}=n;o.muted=n.video.muted=!r,x(r?"Unmuted":"Muted")},m=()=>{const{video:{element:o,fps:r}}=n;t.value?s(W(M(o.currentTime,r)+1,r)):s(o.currentTime+1)},T=()=>{const{video:{element:o,fps:r}}=n;t.value?s(W(M(o.currentTime,r)-1,r)):s(o.currentTime-1)};let C;const q=o=>{const{container:{mouseDown:r}}=n;r?C=setInterval(()=>{o?m():T()},60):clearInterval(C)},i=o=>{const{video:{element:r}}=n;r.playbackRate=n.video.playbackRate=o,x(`Playback Rate x${o.toFixed(1)}`)},F=()=>{const{video:{element:o,loop:r},range:{enabled:d,start:u,end:_}}=n;!o||!(l.value&&d)||(o.currentTime<u&&(o.currentTime=u),o.currentTime>_&&(r?o.currentTime=u:(o.currentTime=_,o.pause(),n.video.paused=!0)))},f=()=>{const{video:{element:o,duration:r},progress:{seekTotal:d},range:{enabled:u,start:_,end:v}}=n;!o||(F(),n.range.left=l.value&&u?0:_/r*d,n.range.width=l.value&&u?d:v/r*d-_/r*d)},U=()=>{const{range:{enabled:o}}=n;n.range.enabled=!o,f(),x(o?"Inactive range":"Active range")},lt=()=>{const{video:{element:o,loop:r}}=n;o.loop=n.video.loop=!r,x(r?"Play once":"Repeat play")},st=()=>{const{bbox:{enabled:o}}=n;n.bbox.enabled=!o,x(o?"Hide bounding box":"Show bounding box")};let j;const x=o=>{const{message:r}=n,{time:d}=r;!d||(r.text=o,r.visible=!0,j&&clearTimeout(j),j=setTimeout(()=>{r.visible=!1},d))},G=()=>{const{container:{element:o}}=n;document.fullscreenElement?document.exitFullscreen():o.requestFullscreen()},K=()=>{const{container:{element:o},preview:{enabled:r}}=n;n.progress.seekTotal=o.offsetWidth,l.value&&f(),r&&(n.preview.left=0)},J=({altKey:o,ctrlKey:r,key:d})=>{const{video:{element:u,paused:_,volume:v,fps:k}}=n;if(o&&r){if(d==="g"&&t.value){const H=window.prompt("Go to frame number",M(u.currentTime,k));_&&u.pause(),u.currentTime=W(H,k)}d==="ArrowUp"&&h(v+.05),d==="ArrowDown"&&h(v-.05),d==="ArrowLeft"&&T(),d==="ArrowRight"&&m()}},Q=()=>{n.container.fullScreen=Boolean(document.fullscreenElement),x(`${n.container.fullScreen?"Full":"Normal"} screen`)};let A;const it=()=>{A&&clearTimeout(A),n.container.mouseMove=!0,!n.container.mouseHold&&(A=setTimeout(()=>{n.container.mouseMove=!1},2e3))};return e.onMounted(()=>{P||(window.addEventListener("resize",K),window.addEventListener("keydown",J),document.addEventListener("fullscreenchange",Q),setTimeout(()=>{window.dispatchEvent(new Event("resize"))},300),P=!0)}),e.onUnmounted(()=>{!P||(window.removeEventListener("resize",K),window.removeEventListener("keydown",J),document.removeEventListener("fullscreenchange",Q),P=!1)}),{data:n,initialVideo:a,setVideoSeek:g,toggleVideoPlay:V,toggleVideoMute:p,changeVideoVolume:y,changeVideoFrame:q,setVideoPlaybackRate:i,toggleVideoRange:U,toggleVideoLoop:lt,toggleVideoBbox:st,toggleFullScreen:G,setMessage:x,onContainerMouseMove:it}}const _t="",$=(l,t)=>{const c=l.__vccOpts||l;for(const[a,s]of t)c[a]=s;return c},I=l=>(e.pushScopeId("data-v-05360fd3"),l=l(),e.popScopeId(),l),oe={class:"cvp-header"},ne=I(()=>e.createElementVNode("span",{style:{opacity:"0.5"}}," / ",-1)),ae={key:0},re=I(()=>e.createElementVNode("span",{style:{opacity:"0.5"}}," / ",-1)),le=I(()=>e.createElementVNode("span",{style:{opacity:"0.5"}}," / ",-1)),se={key:0},ie=I(()=>e.createElementVNode("span",{style:{opacity:"0.5"}}," / ",-1)),de=$({__name:"Header",setup(l){const{data:t}=S(),c=e.computed(()=>t.range.start>0&&t.range.end>0),a=e.computed(()=>t.video.fps>0);return(s,g)=>(e.openBlock(),e.createElementBlock("div",oe,[e.createElementVNode("div",{class:e.normalizeClass(["cvp-information",!e.unref(t).range.enabled&&"cvp-information-active"])},[e.createElementVNode("span",null,e.toDisplayString(e.unref(w)(e.unref(t).video.currentTime)),1),ne,e.createElementVNode("span",null,e.toDisplayString(e.unref(w)(e.unref(t).video.duration)),1),e.unref(a)?(e.openBlock(),e.createElementBlock("span",ae,[e.createElementVNode("span",null," [ "+e.toDisplayString(e.unref(z)(e.unref(M)(e.unref(t).video.currentTime,e.unref(t).video.fps))),1),re,e.createElementVNode("span",null,e.toDisplayString(e.unref(z)(e.unref(M)(e.unref(t).video.duration,e.unref(t).video.fps)))+" ]",1)])):e.createCommentVNode("",!0)],2),e.unref(c)?(e.openBlock(),e.createElementBlock("div",{key:0,class:e.normalizeClass(["cvp-information",e.unref(t).range.enabled&&"cvp-information-active"])},[e.createElementVNode("span",null,e.toDisplayString(e.unref(w)(e.unref(t).video.currentTime)),1),le,e.createElementVNode("span",null,e.toDisplayString(e.unref(w)(e.unref(t).range.end)),1),e.unref(a)?(e.openBlock(),e.createElementBlock("span",se,[e.createElementVNode("span",null," [ "+e.toDisplayString(e.unref(z)(e.unref(M)(e.unref(t).video.currentTime,e.unref(t).video.fps))),1),ie,e.createElementVNode("span",null,e.toDisplayString(e.unref(z)(e.unref(M)(e.unref(t).range.end,e.unref(t).video.fps)))+" ]",1)])):e.createCommentVNode("",!0)],2)):e.createCommentVNode("",!0)]))}},[["__scopeId","data-v-05360fd3"]]),ut="",ce={class:"cvp-main"},fe=["src","muted","autoplay"],pe=$({__name:"Main",props:{src:{type:String,default:!1,required:!0},muted:{type:Boolean,default:!1},autoplay:{type:Boolean,default:!1}},emits:["loadedmetadata","play","pause","timeupdate","volumechange","error"],setup(l,{emit:t}){const c=l,a=e.ref(null),s=e.ref(null),{data:g,initialVideo:N,toggleVideoPlay:V}=S(),h=y=>{Object.assign(g,{video:{...g.video,element:a.value,canvas:s.value,width:a.value.videoWidth,height:a.value.videoHeight,duration:a.value.duration,paused:!(c.muted===!0&&c.autoplay===!0)}}),N(),t("loadedmetadata",y)};return(y,p)=>(e.openBlock(),e.createElementBlock("div",ce,[e.createElementVNode("video",{class:"cvp-video",ref_key:"video",ref:a,src:l.src,muted:l.muted,autoplay:l.autoplay,onLoadedmetadata:p[0]||(p[0]=m=>h(m)),onPlay:p[1]||(p[1]=m=>t("play",m)),onPause:p[2]||(p[2]=m=>t("pause",m)),onTimeupdate:p[3]||(p[3]=m=>t("timeupdate",m)),onVolumechange:p[4]||(p[4]=m=>t("volumechange",m)),onError:p[5]||(p[5]=m=>t("error",m))},null,40,fe),e.createElementVNode("canvas",{class:"cvp-canvas",ref_key:"canvas",ref:s,onClick:p[6]||(p[6]=(...m)=>e.unref(V)&&e.unref(V)(...m))},null,512)]))}},[["__scopeId","data-v-c9a7d0c6"]]),bt="",me={class:"cvp-progress"},_e={class:"cvp-progress-drag"},he=["src"],ue={class:"cvp-progress-preview-time"},ge=$({__name:"Progress",setup(l){const t=e.ref(null),c=e.ref(null),{data:a,setVideoSeek:s}=S(),g=e.computed(()=>a.range.start>0&&a.range.end>0),N=()=>{const{video:{width:V,height:h},preview:{enabled:y}}=a;if(!y)return;const p=c.value.getContext("2d"),m=V*.3,T=h*.3;c.value.width=m,c.value.height=T,Object.assign(a,{preview:{...a.preview,element:t.value}});const C=()=>{!t.value||(p.imageSmoothingEnabled=!0,p.drawImage(t.value,0,0,m,T),window.requestAnimationFrame(C))};C()};return(V,h)=>(e.openBlock(),e.createElementBlock("div",me,[e.createElementVNode("div",_e,[e.createElementVNode("div",{class:"cvp-progress-area",onMousedown:h[0]||(h[0]=e.withModifiers(y=>{e.unref(a).container.mouseDown=!0,e.unref(s)(y)},["self"])),onMousemove:h[1]||(h[1]=(...y)=>e.unref(s)&&e.unref(s)(...y)),onMouseup:h[2]||(h[2]=y=>e.unref(a).container.mouseDown=!1),onMouseleave:h[3]||(h[3]=y=>e.unref(a).container.mouseDown=!1)},[e.createElementVNode("div",{class:"cvp-progress-buffer",style:e.normalizeStyle({width:`${e.unref(a).progress.bufferWidth}%`})},null,4),e.createElementVNode("div",{class:"cvp-progress-bar",style:e.normalizeStyle({width:`${e.unref(a).progress.seekWidth}%`})},null,4),e.unref(g)?(e.openBlock(),e.createElementBlock("div",{key:0,class:"cvp-progress-range",style:e.normalizeStyle({left:`${e.unref(a).range.left}px`,width:`${e.unref(a).range.width}px`})},null,4)):e.createCommentVNode("",!0)],32)]),e.unref(a).preview.enabled?(e.openBlock(),e.createElementBlock("div",{key:0,class:"cvp-progress-preview",style:e.normalizeStyle({left:`${e.unref(a).preview.left}px`})},[e.createElementVNode("video",{class:"cvp-progress-preview-video",ref_key:"video",ref:t,src:e.unref(a).video.src,onCanplaythrough:N},null,40,he),e.createElementVNode("canvas",{class:"cvp-progress-preview-canvas",ref_key:"canvas",ref:c},null,512),e.createElementVNode("div",ue,e.toDisplayString(e.unref(a).preview.time),1)],4)):e.createCommentVNode("",!0)]))}},[["__scopeId","data-v-2f28077b"]]),vt="",b=l=>(e.pushScopeId("data-v-09e1eca1"),l=l(),e.popScopeId(),l),be={class:"cvp-controller"},ye=["title"],ve={key:0,class:"cvp-controller-icon",viewBox:"-2 -2 28 28","stroke-width":"1",stroke:"#ffffff",fill:"none"},ke=[b(()=>e.createElementVNode("path",{stroke:"none",d:"M0 0h24v24H0z",fill:"none"},null,-1)),b(()=>e.createElementVNode("path",{d:"M7 4v16l13 -8z"},null,-1))],Ee={key:1,class:"cvp-controller-icon",viewBox:"0 0 24 24","stroke-width":"1",stroke:"#ffffff",fill:"none"},we=[b(()=>e.createElementVNode("path",{stroke:"none",d:"M0 0h24v24H0z",fill:"none"},null,-1)),b(()=>e.createElementVNode("rect",{x:"6",y:"5",width:"4",height:"14",rx:"1"},null,-1)),b(()=>e.createElementVNode("rect",{x:"14",y:"5",width:"4",height:"14",rx:"1"},null,-1))],Ve={class:"cvp-controller-volume"},xe=["title"],Me={key:0,class:"cvp-controller-icon",viewBox:"-2 -2 28 28","stroke-width":"1",stroke:"#ffffff",fill:"none"},Ne=[b(()=>e.createElementVNode("path",{stroke:"none",d:"M0 0h24v24H0z",fill:"none"},null,-1)),b(()=>e.createElementVNode("path",{d:"M6 15h-2a1 1 0 0 1 -1 -1v-4a1 1 0 0 1 1 -1h2l3.5 -4.5a0.8 .8 0 0 1 1.5 .5v14a0.8 .8 0 0 1 -1.5 .5l-3.5 -4.5"},null,-1)),b(()=>e.createElementVNode("path",{d:"M16 10l4 4m0 -4l-4 4"},null,-1))],Be={key:1,class:"cvp-controller-icon",viewBox:"-2 -2 28 28","stroke-width":"1",stroke:"#ffffff",fill:"none"},Se=[b(()=>e.createElementVNode("path",{stroke:"none",d:"M0 0h24v24H0z",fill:"none"},null,-1)),b(()=>e.createElementVNode("path",{d:"M15 8a5 5 0 0 1 0 8"},null,-1)),b(()=>e.createElementVNode("path",{d:"M17.7 5a9 9 0 0 1 0 14"},null,-1)),b(()=>e.createElementVNode("path",{d:"M6 15h-2a1 1 0 0 1 -1 -1v-4a1 1 0 0 1 1 -1h2l3.5 -4.5a0.8 .8 0 0 1 1.5 .5v14a0.8 .8 0 0 1 -1.5 .5l-3.5 -4.5"},null,-1))],$e={class:"cvp-controller-volume-drag"},Te=[b(()=>e.createElementVNode("svg",{class:"cvp-controller-icon",viewBox:"-1 -1 26 26","stroke-width":"1",stroke:"#ffffff",fill:"none"},[e.createElementVNode("path",{stroke:"none",d:"M0 0h24v24H0z",fill:"none"}),e.createElementVNode("path",{d:"M20 5v14l-12 -7z"}),e.createElementVNode("line",{x1:"4",y1:"5",x2:"4",y2:"19"})],-1))],Ce=[b(()=>e.createElementVNode("svg",{class:"cvp-controller-icon",viewBox:"-1 -1 26 26","stroke-width":"1",stroke:"#ffffff",fill:"none"},[e.createElementVNode("path",{stroke:"none",d:"M0 0h24v24H0z",fill:"none"}),e.createElementVNode("path",{d:"M4 5v14l12 -7z"}),e.createElementVNode("line",{x1:"20",y1:"5",x2:"20",y2:"19"})],-1))],De=b(()=>e.createElementVNode("div",{style:{flex:"1"}},null,-1)),ze={class:"cvp-controller-playback-rate"},Fe={class:"cvp-controller-playback-rate-text"},He={class:"cvp-controller-playback-rate-list"},Pe={class:"cvp-controller-playback-rate-item"},Ie=["onClick"],Re=["title"],Le={key:0,class:"cvp-controller-icon",viewBox:"-4 -4 32 32","stroke-width":"1",stroke:"#ffffff",fill:"none"},We=[e.createStaticVNode('<path stroke="none" d="M0 0h24v24H0z" fill="none" data-v-09e1eca1></path><path d="M3 12h7l-3 -3m0 6l3 -3" data-v-09e1eca1></path><path d="M21 12h-7l3 -3m0 6l-3 -3" data-v-09e1eca1></path><path d="M9 6v-3h6v3" data-v-09e1eca1></path><path d="M9 18v3h6v-3" data-v-09e1eca1></path>',5)],je={key:1,class:"cvp-controller-icon",viewBox:"-4 -4 32 32","stroke-width":"1",stroke:"#ffffff",fill:"none"},Ae=[e.createStaticVNode('<path stroke="none" d="M0 0h24v24H0z" fill="none" data-v-09e1eca1></path><path d="M10 12h-7l3 -3m0 6l-3 -3" data-v-09e1eca1></path><path d="M14 12h7l-3 -3m0 6l3 -3" data-v-09e1eca1></path><path d="M3 6v-3h18v3" data-v-09e1eca1></path><path d="M3 18v3h18v-3" data-v-09e1eca1></path>',5)],Oe=["title"],qe=[b(()=>e.createElementVNode("svg",{class:"cvp-controller-icon",viewBox:"-4 -4 32 32","stroke-width":"1.5",stroke:"#ffffff",fill:"none"},[e.createElementVNode("path",{stroke:"none",d:"M0 0h24v24H0z",fill:"none"}),e.createElementVNode("path",{d:"M4 12v-3a3 3 0 0 1 3 -3h13m-3 -3l3 3l-3 3"}),e.createElementVNode("path",{d:"M20 12v3a3 3 0 0 1 -3 3h-13m3 3l-3 -3l3 -3"})],-1))],Ue=["title"],Ge=[e.createStaticVNode('<svg class="cvp-controller-icon" viewBox="-4 -4 32 32" stroke-width="1" stroke="#ffffff" fill="none" data-v-09e1eca1><path stroke="none" d="M0 0h24v24H0z" fill="none" data-v-09e1eca1></path><circle cx="5" cy="5" r="2" data-v-09e1eca1></circle><circle cx="19" cy="5" r="2" data-v-09e1eca1></circle><circle cx="5" cy="19" r="2" data-v-09e1eca1></circle><circle cx="19" cy="19" r="2" data-v-09e1eca1></circle><line x1="5" y1="7" x2="5" y2="17" data-v-09e1eca1></line><line x1="7" y1="5" x2="17" y2="5" data-v-09e1eca1></line><line x1="7" y1="19" x2="17" y2="19" data-v-09e1eca1></line><line x1="19" y1="7" x2="19" y2="17" data-v-09e1eca1></line></svg>',1)],Ke=["title"],Je={key:0,class:"cvp-controller-icon",viewBox:"0 0 24 24","stroke-width":"1",stroke:"#ffffff",fill:"none"},Qe=[e.createStaticVNode('<path stroke="none" d="M0 0h24v24H0z" fill="none" data-v-09e1eca1></path><path d="M15 19v-2a2 2 0 0 1 2 -2h2" data-v-09e1eca1></path><path d="M15 5v2a2 2 0 0 0 2 2h2" data-v-09e1eca1></path><path d="M5 15h2a2 2 0 0 1 2 2v2" data-v-09e1eca1></path><path d="M5 9h2a2 2 0 0 0 2 -2v-2" data-v-09e1eca1></path>',5)],Ye={key:1,class:"cvp-controller-icon",viewBox:"-2 -2 28 28","stroke-width":"1",stroke:"#ffffff",fill:"none"},Ze=[e.createStaticVNode('<path stroke="none" d="M0 0h24v24H0z" fill="none" data-v-09e1eca1></path><path d="M4 8v-2a2 2 0 0 1 2 -2h2" data-v-09e1eca1></path><path d="M4 16v2a2 2 0 0 0 2 2h2" data-v-09e1eca1></path><path d="M16 4h2a2 2 0 0 1 2 2v2" data-v-09e1eca1></path><path d="M16 20h2a2 2 0 0 0 2 -2v-2" data-v-09e1eca1></path>',5)],Xe=$({__name:"Controller",setup(l){const{data:t,toggleVideoPlay:c,toggleVideoMute:a,changeVideoVolume:s,changeVideoFrame:g,setVideoPlaybackRate:N,toggleVideoRange:V,toggleVideoLoop:h,toggleVideoBbox:y,toggleFullScreen:p}=S(),m=e.computed(()=>t.range.start>0&&t.range.end>0),T=e.computed(()=>t.video.fps>0),C=e.computed(()=>Object.keys(t.bbox.data).length>0);return(q,i)=>{var F;return e.openBlock(),e.createElementBlock("div",be,[e.createElementVNode("button",{class:"cvp-controller-button",title:e.unref(t).video.paused?"Play":"Pause",onClick:i[0]||(i[0]=(...f)=>e.unref(c)&&e.unref(c)(...f))},[e.unref(t).video.paused?(e.openBlock(),e.createElementBlock("svg",ve,ke)):(e.openBlock(),e.createElementBlock("svg",Ee,we))],8,ye),e.createElementVNode("div",Ve,[e.createElementVNode("button",{class:"cvp-controller-button",title:e.unref(t).video.muted?"Unmute":"Mute",onClick:i[1]||(i[1]=(...f)=>e.unref(a)&&e.unref(a)(...f))},[e.unref(t).video.muted?(e.openBlock(),e.createElementBlock("svg",Me,Ne)):(e.openBlock(),e.createElementBlock("svg",Be,Se))],8,xe),e.createElementVNode("div",$e,[e.createElementVNode("div",{class:"cvp-controller-volume-area",onMousedown:i[2]||(i[2]=e.withModifiers(f=>{e.unref(t).container.mouseDown=!0,e.unref(s)(f)},["self"])),onMousemove:i[3]||(i[3]=(...f)=>e.unref(s)&&e.unref(s)(...f)),onMouseup:i[4]||(i[4]=f=>e.unref(t).container.mouseDown=!1),onMouseleave:i[5]||(i[5]=f=>e.unref(t).container.mouseDown=!1)},[e.createElementVNode("div",{class:"cvp-controller-volume-bar",style:e.normalizeStyle({height:`${e.unref(t).video.volume*100}%`})},null,4)],32)])]),e.createElementVNode("button",{class:"cvp-controller-button",title:"Backward",onMousedown:i[6]||(i[6]=f=>{e.unref(t).container.mouseDown=!0,e.unref(g)(!1)}),onMouseup:i[7]||(i[7]=f=>{e.unref(t).container.mouseDown=!1,e.unref(g)(!1)})},Te,32),e.createElementVNode("button",{class:"cvp-controller-button",title:"Forward",onMousedown:i[8]||(i[8]=f=>{e.unref(t).container.mouseDown=!0,e.unref(g)(!0)}),onMouseup:i[9]||(i[9]=f=>{e.unref(t).container.mouseDown=!1,e.unref(g)(!0)})},Ce,32),De,e.createElementVNode("div",ze,[e.createElementVNode("div",Fe,"x"+e.toDisplayString(((F=e.unref(t).video.playbackRate)==null?void 0:F.toFixed(1))||"1.0"),1),e.createElementVNode("ul",He,[(e.openBlock(!0),e.createElementBlock(e.Fragment,null,e.renderList([.1,.5,1,1.5,2,5],f=>(e.openBlock(),e.createElementBlock("li",Pe,[e.createElementVNode("button",{class:"cvp-controller-playback-rate-button",onClick:U=>e.unref(N)(f)},e.toDisplayString(f.toFixed(1)),9,Ie)]))),256))])]),e.unref(m)?(e.openBlock(),e.createElementBlock("button",{key:0,class:"cvp-controller-button",title:e.unref(t).range.enabled?"Reset range":"Set range",onClick:i[10]||(i[10]=(...f)=>e.unref(V)&&e.unref(V)(...f))},[e.unref(t).range.enabled?(e.openBlock(),e.createElementBlock("svg",Le,We)):(e.openBlock(),e.createElementBlock("svg",je,Ae))],8,Re)):e.createCommentVNode("",!0),e.createElementVNode("button",{class:e.normalizeClass(["cvp-controller-button",e.unref(t).video.loop&&"cvp-controller-button-active"]),title:e.unref(t).video.loop?"Play once":"Repeat play",onClick:i[11]||(i[11]=(...f)=>e.unref(h)&&e.unref(h)(...f))},qe,10,Oe),e.unref(T)&&e.unref(C)?(e.openBlock(),e.createElementBlock("button",{key:1,class:e.normalizeClass(["cvp-controller-button",e.unref(t).bbox.enabled&&"cvp-controller-button-active"]),title:e.unref(t).bbox.enabled?"Hide bounding box":"Show bounding box",onClick:i[12]||(i[12]=(...f)=>e.unref(y)&&e.unref(y)(...f))},Ge,10,Ue)):e.createCommentVNode("",!0),e.createElementVNode("button",{class:"cvp-controller-button",title:e.unref(t).container.fullScreen?"Normal screen":"Full screen",onClick:i[13]||(i[13]=(...f)=>e.unref(p)&&e.unref(p)(...f))},[e.unref(t).container.fullScreen?(e.openBlock(),e.createElementBlock("svg",Je,Qe)):(e.openBlock(),e.createElementBlock("svg",Ye,Ze))],8,Ke)])}}},[["__scopeId","data-v-09e1eca1"]]),jt="",et=$({__name:"index",setup(l){const{data:t,onContainerMouseMove:c}=S();return(a,s)=>(e.openBlock(),e.createElementBlock("div",{class:e.normalizeClass(["cvp-footer",e.unref(t).container.mouseMove&&"cvp-footer-active"]),onMouseenter:s[0]||(s[0]=g=>e.unref(t).container.mouseHold=!0),onMouseleave:s[1]||(s[1]=g=>{e.unref(t).container.mouseHold=!1,e.unref(c)()})},[e.createVNode(ge),e.createVNode(Xe)],34))}},[["__scopeId","data-v-52798f3a"]]),Ot="",tt={class:"cvp-message"},ot=["innerHTML"],nt=$({__name:"Message",setup(l){const{data:t}=S();return(c,a)=>(e.openBlock(),e.createElementBlock("div",tt,[e.createElementVNode("div",{class:e.normalizeClass(["cvp-message-text",e.unref(t).message.visible?"cvp-message-text-show":"cvp-message-text-hide"]),innerHTML:e.unref(t).message.text},null,10,ot)]))}},[["__scopeId","data-v-1ecb3b3a"]]),Ut="",at=["data-dark-mode","data-type"],rt={key:0,class:"cvp-block"};return $({__name:"Vue3CanvasVideoPlayer",props:{src:{type:String,default:"",required:!0},muted:{type:Boolean,default:!1},autoplay:{type:Boolean,default:!1},loop:{type:Boolean,default:!1},range:{type:Array,validator:l=>!l.length||l.length===2&&l.every(t=>typeof t=="number"),default:()=>[0,0]},fps:{type:Number,default:0},bbox:{type:Object,default:()=>({data:{},borderSize:1,borderColor:"rgba(255, 0, 0, 0.5)",fillColor:"rgba(0, 0, 255, 0.5)"})},type:{type:String,default:"overlay"},messageTime:{type:Number,default:1e3},preview:{type:Boolean,default:!1},darkMode:{type:Boolean,default:!0}},setup(l){const t=l,c=e.ref(null),{data:a,onContainerMouseMove:s}=S();return e.watch(()=>t.src,g=>{a.video.src=g}),e.onMounted(()=>{Object.assign(a,{container:{...a.container,element:c.value,type:t.type},video:{...a.video,src:t.src,muted:t.muted,autoplay:t.autoplay,loop:t.loop,fps:t.fps},preview:{...a.preview,enabled:t.preview},range:{...a.range,start:t.range[0],end:t.range[1],enabled:t.range[0]>0&&t.range[1]>0},bbox:{...a.bbox,...t.bbox,enabled:Object.keys(t.bbox.data).length>0},message:{...a.message,time:t.messageTime},block:{...a.block,text:"Video file has not been loaded"}}),a.container.type==="overlay"&&a.container.element.addEventListener("mousemove",s)}),e.onBeforeUnmount(()=>{a.container.type==="overlay"&&a.container.element.removeEventListener("mousemove",s)}),(g,N)=>(e.openBlock(),e.createElementBlock("div",{id:"vue3-canvas-video-player",ref_key:"container",ref:c,"data-dark-mode":l.darkMode,"data-type":t.type},[e.createVNode(de),e.createVNode(pe,{src:t.src,muted:t.muted,autoplay:t.autoplay},null,8,["src","muted","autoplay"]),e.createVNode(et),e.createVNode(nt),t.src.length?e.createCommentVNode("",!0):(e.openBlock(),e.createElementBlock("div",rt,e.toDisplayString(e.unref(a).block.text),1))],8,at))}},[["__scopeId","data-v-c95126e3"]])});
