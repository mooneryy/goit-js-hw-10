import"./assets/modulepreload-polyfill-3cfb730f.js";import{i}from"./assets/vendor-77e16229.js";const o=document.querySelector(".form");o.addEventListener("submit",function(t){t.preventDefault();const r=o.querySelector('input[name = "delay"]'),l=o.querySelector('input[name="state"]:checked'),e=parseInt(r.value,10);if(isNaN(e)||e<=0){i.error({title:"Error",message:"Please enter a valid positive delay value"});return}const s=l?l.value:null;if(s===null){i.error({title:"Error",message:"Please select a state (Fulfilled/Rejected)"});return}n(e,s)});function n(t,r){new Promise((e,s)=>{setTimeout(()=>{r==="fulfilled"?e(t):r==="rejected"&&s(t)},t)}).then(e=>{i.success({title:"Fulfilled",message:`✅ Fulfilled promise in ${e}ms`})}).catch(e=>{i.error({title:"Rejected",message:`❌ Rejected promise in ${e}ms`})})}
//# sourceMappingURL=commonHelpers2.js.map