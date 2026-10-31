
(()=>{

const MZ=window.MZ;
function localized(){document.title=MZ.lang()==='ar'?'مودزاك · بدلة العرس في المحمدية':'Modzak · Costume de mariage à Mohammedia';document.querySelectorAll('[data-alt-fr]').forEach(el=>el.alt=MZ.t(el.dataset.altFr,el.dataset.altAr));}
localized();document.addEventListener('mz:lang',localized);

const form=document.getElementById('appointment'), date=document.getElementById('date');
function today(){const parts=new Intl.DateTimeFormat('en-CA',{timeZone:'Africa/Casablanca',year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(new Date());const v=k=>parts.find(p=>p.type===k).value;return `${v('year')}-${v('month')}-${v('day')}`;}
const slot=document.getElementById('slot');
function minimum(){
const parts=new Intl.DateTimeFormat('en-CA',{timeZone:'Africa/Casablanca',year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',hourCycle:'h23'}).formatToParts(new Date());
const v=k=>parts.find(p=>p.type===k).value;
const currentDate=`${v('year')}-${v('month')}-${v('day')}`,minutes=Number(v('hour'))*60+Number(v('minute'));
date.min=currentDate;
const ends={afternoon:18*60,evening:21*60};
Array.from(slot.options).forEach(option=>{option.disabled=!!ends[option.value]&&date.value===currentDate&&minutes>=ends[option.value];});
if(slot.selectedOptions[0]?.disabled)slot.value='';
}
minimum();date.addEventListener('change',minimum);date.addEventListener('input',minimum);setInterval(minimum,60000);document.addEventListener('visibilitychange',minimum);
const errors={};
function error(id,fr='',ar=''){const el=document.getElementById(id+'-error');el.dataset.fr=fr;el.dataset.ar=ar;el.textContent=MZ.t(fr,ar);document.getElementById(id).setAttribute('aria-invalid',String(!!fr));if(fr)errors[id]=[fr,ar];else delete errors[id];}
function validate(id){const el=form.elements[id];let msg=null;if(!el.value.trim())msg=['Veuillez compléter ce champ.','يرجى إكمال هذا الحقل.'];else if(id==='name'&&!el.value.trim().length)msg=['Indiquez votre nom.','أدخل اسمك.'];else if(id==='date'&&(el.value<today()||!el.validity.valid))msg=['Choisissez aujourd’hui ou une date future.','اختر اليوم أو تاريخاً لاحقاً.'];else if(id==='people'&&(!Number.isSafeInteger(Number(el.value))||Number(el.value)<1))msg=['Indiquez un nombre entier à partir de 1.','أدخل عدداً صحيحاً ابتداءً من 1.'];error(id,...(msg||['','']));return !msg;}
const ids=['name','date','slot','occasion','people'];ids.forEach(id=>form.elements[id].addEventListener('input',()=>{if(form.elements[id].hasAttribute('aria-invalid'))validate(id);}));
form.addEventListener('submit',e=>{e.preventDefault();minimum();const valid=ids.map(validate);if(valid.includes(false)){form.elements[ids[valid.indexOf(false)]].focus();return;}const option=id=>{const o=form.elements[id].selectedOptions[0];return MZ.t(o.dataset.fr,o.dataset.ar)};const message=MZ.t(`Bonjour Modzak, je souhaite un rendez-vous d’essayage.
Nom : ${form.elements.name.value.trim()}
Date : ${date.value}
Créneau : ${option('slot')}
Occasion : ${option('occasion')}
Personnes à habiller : ${form.elements.people.value}
Merci de confirmer le rendez-vous et les disponibilités.`,`مرحباً مودزاك، أود حجز موعد قياس.
الاسم: ${form.elements.name.value.trim()}
التاريخ: ${date.value}
الفترة: ${option('slot')}
المناسبة: ${option('occasion')}
عدد الأشخاص: ${form.elements.people.value}
يرجى تأكيد الموعد والتوفر.`);window.open(MZ.wa(message),'_blank','noopener');const status=document.getElementById('form-status');status.dataset.fr='Votre demande est prête dans WhatsApp. Envoyez le message pour demander confirmation.';status.dataset.ar='طلبك جاهز في واتساب. أرسل الرسالة لطلب التأكيد.';status.textContent=MZ.t(status.dataset.fr,status.dataset.ar);});
document.addEventListener('mz:lang',()=>{Object.entries(errors).forEach(([id,msg])=>error(id,...msg));});
if(window.gsap&&window.ScrollTrigger&&!MZ.reduce){gsap.registerPlugin(ScrollTrigger);const mm=gsap.matchMedia();function animate(){mm.revert();mm.add('(min-width: 860px)',()=>{const section=document.querySelector('.journey');section.classList.add('horizontal');gsap.to('.steps',{x:()=>-section.clientWidth*3,ease:'none',scrollTrigger:{trigger:section,start:'top 76px',end:()=>'+='+section.clientWidth*3,pin:true,scrub:.6,invalidateOnRefresh:true,onUpdate:s=>gsap.set('.progress i',{scaleX:s.progress})}});return()=>{section.classList.remove('horizontal');gsap.set('.progress i',{clearProps:'transform'});};});mm.add('(max-width: 859px)',()=>{gsap.to('.progress i',{scaleX:1,ease:'none',scrollTrigger:{trigger:'.steps',start:'top 70%',end:'bottom 70%',scrub:true}});});}animate();document.addEventListener('mz:lang',animate);}

})();
