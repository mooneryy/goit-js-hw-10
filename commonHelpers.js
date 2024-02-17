import"./assets/modulepreload-polyfill-3cfb730f.js";import{f,i}from"./assets/vendor-77e16229.js";let e;const n=document.querySelector("[data-start]"),h=document.querySelector("[data-days]"),y=document.querySelector("[data-hours]"),C=document.querySelector("[data-minutes]"),b=document.querySelector("[data-seconds]");function o(t){return t<10?`0${t}`:t}const S={enableTime:!0,time_24hr:!0,defaultDate:new Date,minuteIncrement:1,onClose(t){t&&t[0]?(e=t[0],console.log(t[0]),e.getTime()>Date.now()?n.removeAttribute("disabled"):(i.error({title:"Error",message:"Please choose a date in the future"}),n.setAttribute("disabled","true"))):(console.error("User date is not defined"),e=void 0)}};f("#datetime-picker",S);n.addEventListener("click",()=>{if(!e){console.error("User date is not defined");return}const t=e.getTime()-Date.now();if(t<=0){i.error({title:"Error",message:"Please choose a date in the future"});return}g(t),n.setAttribute("disabled","true")});function g(t){let r;function c(){const{days:d,hours:s,minutes:u,seconds:a}=p(t);h.textContent=o(d),y.textContent=o(s),C.textContent=o(u),b.textContent=o(a),t-=1e3,t<0&&(clearInterval(r),i.success({title:"Success",message:"Countdown completed"}))}r=setInterval(c,1e3)}function p(t){const s=Math.floor(t/864e5),u=Math.floor(t%864e5/36e5),a=Math.floor(t%864e5%36e5/6e4),m=Math.floor(t%864e5%36e5%6e4/1e3);return{days:s,hours:u,minutes:a,seconds:m}}
//# sourceMappingURL=commonHelpers.js.map