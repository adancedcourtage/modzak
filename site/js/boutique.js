
(()=>{

const MZ=window.MZ;
function localized(){document.title=MZ.lang()==='ar'?'مودزاك · المتجر في المحمدية':'Modzak · La boutique à Mohammedia';document.querySelectorAll('[data-alt-fr]').forEach(el=>el.alt=MZ.t(el.dataset.altFr,el.dataset.altAr));}
localized();document.addEventListener('mz:lang',localized);

const formatter=new Intl.DateTimeFormat('en-GB',{timeZone:'Africa/Casablanca',weekday:'short',hour:'2-digit',minute:'2-digit',hourCycle:'h23'});
function render(){const parts=formatter.formatToParts(new Date());const part=k=>parts.find(x=>x.type===k).value;const day={Sun:0,Mon:1,Tue:2,Wed:3,Thu:4,Fri:5,Sat:6}[part('weekday')];const minutes=Number(part('hour'))*60+Number(part('minute')),opening=[0,5].includes(day)?900:660,closing=1350;const open=minutes>=opening&&minutes<closing;let fr,ar;if(open){const remaining=closing-minutes;fr=`Ouvert · ferme dans ${remaining} min`;ar=`مفتوح · يغلق خلال ${remaining} دقيقة`;}else{const nextDay=minutes>=closing;const nextOpening=[0,5].includes((day+1)%7)?'15:00':'11:00';const time=nextDay?nextOpening:(opening===900?'15:00':'11:00');fr=`Fermé · ouvre ${nextDay?'demain ':''}à ${time}`;ar=`مغلق · يفتح ${nextDay?'غداً ':''}الساعة ${time}`;}const status=document.getElementById('live-status');status.dataset.fr=fr;status.dataset.ar=ar;const text=MZ.t(fr,ar);if(status.textContent!==text)status.textContent=text;status.parentElement.classList.toggle('is-open',open);document.querySelectorAll('[data-day]').forEach(row=>{const current=Number(row.dataset.day)===day;row.classList.toggle('today',current);if(current)row.setAttribute('aria-current','date');else row.removeAttribute('aria-current');});document.querySelectorAll('[data-wa]').forEach(a=>a.href=MZ.wa(MZ.t('Bonjour Modzak, je souhaite préparer ma visite en boutique.','مرحباً مودزاك، أود التحضير لزيارتي للمتجر.')));document.querySelector('[data-delivery]').href=MZ.wa(MZ.t('Bonjour Modzak, je souhaite des informations sur la livraison dans ma ville.','مرحباً مودزاك، أود معلومات عن التوصيل إلى مدينتي.'));const frame=document.querySelector('iframe');frame.title=MZ.t(frame.dataset.titleFr,frame.dataset.titleAr);}
render();setInterval(render,15000);document.addEventListener('visibilitychange',()=>{if(!document.hidden)render();});document.addEventListener('mz:lang',render);
if(window.gsap&&window.ScrollTrigger&&!MZ.reduce){gsap.registerPlugin(ScrollTrigger);gsap.utils.toArray('.photo-strip img').forEach(image=>gsap.fromTo(image,{yPercent:-3},{yPercent:3,ease:'none',scrollTrigger:{trigger:image.parentElement,start:'top bottom',end:'bottom top',scrub:true}}));}

})();
