/* Modzak — script commun : en-tête, pied, langue, sélection WhatsApp, aperçu, transitions */
(() => {
const WA = '212629942924';
const IMG = '../assets/ig/';
const src = (id, big) => id[0] === 'c' ? `../assets/client/${id}${big ? '' : '-s'}.jpg` : `${IMG}${id}.jpg`;
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const store = {
  get(k, d) { try { return JSON.parse(localStorage.getItem(k)) ?? d } catch { return d } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)) } catch {} }
};

/* Catalogue : pas de prix, ils sont donnés sur WhatsApp */
const PRODUCTS = [
  { id:'c27', cat:'costumes', gal:['c27','c31','c19'], fr:'Costume bleu roi', ar:'بدلة زرقاء ملكية', dfr:'Veste deux boutons, pochette blanche. Une couleur qui se remarque, pour les fêtes et les cérémonies.', dar:'سترة بزرين ومنديل أبيض. لون لافت للحفلات والمناسبات.', sizes:[46,48,50,52,54,56] },
  { id:'c21', cat:'costumes', gal:['c21','c24','c30'], fr:'Costume bleu marine', ar:'بدلة كحلية', dfr:'Le costume qui va partout : bureau, réunion, mariage d’un ami.', dar:'البدلة التي تصلح لكل مكان: العمل، الاجتماعات، أعراس الأصدقاء.', sizes:[46,48,50,52,54,56] },
  { id:'c28', cat:'costumes', gal:['c28','c22','c25'], fr:'Costume gris clair', ar:'بدلة رمادية فاتحة', dfr:'Gris clair, coupe ajustée. Se porte avec une cravate bordeaux ou sans cravate.', dar:'رمادي فاتح بقصة مضبوطة، مع ربطة عنق خمرية أو بدونها.', sizes:[46,48,50,52,54,56] },
  { id:'c29', cat:'costumes', gal:['c29','c26'], fr:'Costume noir', ar:'بدلة سوداء', dfr:'Noir intense. Pour les soirées et les grandes occasions.', dar:'أسود عميق للسهرات والمناسبات الكبيرة.', sizes:[46,48,50,52,54,56] },
  { id:'c23', cat:'costumes', gal:['c23','c18','c20'], fr:'Costume taupe', ar:'بدلة بلون التوب', dfr:'Taupe clair, élégant en journée et en été.', dar:'لون توب فاتح، أنيق نهاراً وفي الصيف.', sizes:[46,48,50,52,54,56] },
  { id:'c01', cat:'chaussures', fr:'Mocassin cuir cognac', ar:'موكاسان جلد كونياك', dfr:'Cuir lisse cognac, semelle cousue.', dar:'جلد أملس بلون الكونياك.', sizes:[39,40,41,42,43,44,45] },
  { id:'c10', cat:'chaussures', fr:'Mocassin marron foncé', ar:'موكاسان بني داكن', dfr:'Cuir marron foncé, forme allongée.', dar:'جلد بني داكن بشكل ممدود.', sizes:[39,40,41,42,43,44,45] },
  { id:'c03', cat:'chaussures', fr:'Mocassin noir', ar:'موكاسان أسود', dfr:'Cuir noir, se porte avec un costume comme avec un jean.', dar:'جلد أسود يُلبس مع البدلة أو الجينز.', sizes:[39,40,41,42,43,44,45] },
  { id:'c09', cat:'chaussures', fr:'Mocassin noir uni', ar:'موكاسان أسود سادة', dfr:'Cuir noir sans couture apparente, très sobre.', dar:'جلد أسود بسيط وأنيق.', sizes:[39,40,41,42,43,44,45] },
  { id:'c04', cat:'chaussures', fr:'Mocassin noir verni à mors', ar:'موكاسان أسود لامع بإبزيم', dfr:'Cuir verni et mors métal. Pour les soirées.', dar:'جلد لامع بإبزيم معدني للسهرات.', sizes:[39,40,41,42,43,44,45] },
  { id:'c16', cat:'chaussures', fr:'Richelieu cognac', ar:'ريشيليو كونياك', dfr:'Lacets fermés, cuir cognac patiné.', dar:'أربطة مغلقة وجلد كونياك.', sizes:[39,40,41,42,43,44,45] },
  { id:'c14', cat:'chaussures', fr:'Richelieu chocolat', ar:'ريشيليو بني شوكولا', dfr:'Cuir brun foncé, bout arrondi.', dar:'جلد بني داكن بمقدمة دائرية.', sizes:[39,40,41,42,43,44,45] },
  { id:'c07', cat:'chaussures', fr:'Richelieu marron bout droit', ar:'ريشيليو بني بمقدمة مستقيمة', dfr:'Bout droit, le classique du costume.', dar:'مقدمة مستقيمة، الكلاسيكي مع البدلة.', sizes:[39,40,41,42,43,44,45] },
  { id:'c05', cat:'chaussures', fr:'Richelieu marron perforé', ar:'ريشيليو بني مثقب', dfr:'Bout fleuri perforé, cuir marron.', dar:'مقدمة مثقبة وجلد بني.', sizes:[39,40,41,42,43,44,45] },
  { id:'c12', cat:'chaussures', fr:'Derby cognac bout droit', ar:'ديربي كونياك', dfr:'Lacets ouverts, plus confortable au quotidien.', dar:'أربطة مفتوحة، مريح لكل يوم.', sizes:[39,40,41,42,43,44,45] },
  { id:'c15', cat:'chaussures', fr:'Richelieu noir', ar:'ريشيليو أسود', dfr:'Cuir noir lisse, la chaussure du mariage.', dar:'جلد أسود أملس، حذاء العرس.', sizes:[39,40,41,42,43,44,45] },
  { id:'c08', cat:'chaussures', fr:'Richelieu noir bout droit', ar:'ريشيليو أسود بمقدمة مستقيمة', dfr:'Bout droit, cuir noir.', dar:'مقدمة مستقيمة وجلد أسود.', sizes:[39,40,41,42,43,44,45] },
  { id:'c13', cat:'chaussures', fr:'Richelieu noir mat', ar:'ريشيليو أسود مطفي', dfr:'Cuir noir mat, bout droit.', dar:'جلد أسود مطفي.', sizes:[39,40,41,42,43,44,45] },
  { id:'c06', cat:'chaussures', fr:'Richelieu noir perforé', ar:'ريشيليو أسود مثقب', dfr:'Bout fleuri perforé, cuir noir.', dar:'مقدمة مثقبة وجلد أسود.', sizes:[39,40,41,42,43,44,45] },
  { id:'c17', cat:'chaussures', fr:'Derby noir', ar:'ديربي أسود', dfr:'Lacets ouverts, cuir noir.', dar:'أربطة مفتوحة وجلد أسود.', sizes:[39,40,41,42,43,44,45] },
  { id:'c11', cat:'chaussures', fr:'Richelieu gris anthracite', ar:'ريشيليو رمادي داكن', dfr:'Cuir anthracite, change du noir.', dar:'جلد رمادي داكن بديل للأسود.', sizes:[39,40,41,42,43,44,45] },
  { id:'p2',  cat:'costumes',   fr:'Smoking pailleté',      ar:'سموكينغ لامع',     dfr:'Veste brodée, revers satin, gilet assorti. La pièce des grands soirs.', dar:'سترة مطرزة بياقة ساتان مع صدرية. قطعة السهرات الكبيرة.', sizes:[46,48,50,52,54,56] },
  { id:'p12', cat:'costumes',   fr:'Smoking noir',          ar:'سموكينغ أسود',     dfr:'Col châle, nœud papillon. Le classique du mariage.', dar:'ياقة شال وربطة فراشة. كلاسيكية الأعراس.', sizes:[46,48,50,52,54,56] },
  { id:'p9',  cat:'costumes',   fr:'Costume beige',         ar:'بدلة بيج',         dfr:'Coupe droite, tissu léger. Pour les cérémonies d’été.', dar:'قصة مستقيمة وقماش خفيف. لمناسبات الصيف.', sizes:[46,48,50,52,54] },
  { id:'p11', cat:'costumes',   fr:'Trois-pièces marron',   ar:'بدلة ثلاثية بنية', dfr:'Veste, gilet et pantalon assortis.', dar:'سترة وصدرية وسروال.', sizes:[48,50,52,54] },
  { id:'p4',  cat:'costumes',   fr:'Costume tissu fil',     ar:'بدلة قماش فيل',     dfr:'Nouvel arrivage, plusieurs couleurs en boutique.', dar:'وصل حديثاً، عدة ألوان في المتجر.', sizes:[46,48,50,52,54,56] },
  { id:'p6',  cat:'chemises',   fr:'Chemise rayée bleue',   ar:'قميص مخطط أزرق',   dfr:'Rayures fines, col italien.', dar:'خطوط رفيعة وياقة إيطالية.', sizes:['S','M','L','XL','XXL'] },
  { id:'p10', cat:'chemises',   fr:'Chemises unies',        ar:'قمصان سادة',       dfr:'Rose, ciel, menthe, blanc, marine. Coupe ajustée.', dar:'وردي، سماوي، نعناعي، أبيض، كحلي.', sizes:['S','M','L','XL','XXL'] },
  { id:'p7',  cat:'polos',      fr:'Polos brodés',          ar:'بولو مطرز',        dfr:'Piqué de coton, plusieurs couleurs.', dar:'قطن بيكيه بعدة ألوان.', sizes:['S','M','L','XL','XXL'] },
  { id:'p5',  cat:'pantalons',  fr:'Pantalon taille haute', ar:'سروال خصر عالٍ',   dfr:'Pinces et pattes de serrage. Tombé net.', dar:'بثنيات وأبازيم جانبية.', sizes:[38,40,42,44,46] },
  { id:'p8',  cat:'chaussures', fr:'Sandales cuir',         ar:'صندل جلد',         dfr:'Cuir, semelle confort. Livrées en boîte.', dar:'جلد ونعل مريح.', sizes:[40,41,42,43,44,45] }
];
const CATS = { all:['Tout','الكل'], costumes:['Costumes','بدلات'], chemises:['Chemises','قمصان'], polos:['Polos','بولو'], pantalons:['Pantalons','سراويل'], chaussures:['Chaussures','أحذية'] };

let lang = store.get('mz-lang', 'fr');
let lenis = null;
const t = (fr, ar) => lang === 'ar' ? ar : fr;
const wa = text => `https://wa.me/${WA}?text=${encodeURIComponent(text)}`;
const ICON = {
  arrow:'<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.6"/></svg>',
  heart:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z"/></svg>',
  wa:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M17.5 14.4c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.7.1-.2.3-.8.9-.9 1.1-.2.2-.3.2-.6.1-.3-.1-1.2-.5-2.3-1.4-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6l.4-.5c.2-.2.2-.3.3-.5.1-.2 0-.4 0-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.2 5.1 4.5 2.5 1 3 .8 3.6.7.6-.1 1.7-.7 2-1.4.2-.7.2-1.2.2-1.4-.1-.1-.3-.2-.6-.3M12 21.8c-1.8 0-3.5-.5-5-1.4l-.4-.2-3.7 1 1-3.6-.2-.4A9.8 9.8 0 1 1 12 21.8M12 0a12 12 0 0 0-10.4 18L0 24l6.2-1.6A12 12 0 1 0 12 0"/></svg>'
};

/* ---------- gabarit commun ---------- */
const page = document.body.dataset.page;
const NAV = [['index.html','Accueil','الرئيسية','home'],['collection.html','Collection','المجموعة','collection'],['mariage.html','Mariage','الأعراس','mariage'],['boutique.html','La boutique','المتجر','boutique']];
function chrome() {
  document.querySelector('.hd')?.remove(); document.querySelector('.ft')?.remove();
  document.body.insertAdjacentHTML('afterbegin', `
  <header class="hd"><div class="wrap row">
    <a class="brand" href="index.html" aria-label="Modzak, accueil">MODZAK<small>YOUR WAY INTO ELEGANCE</small></a>
    <nav class="menu" id="menu" aria-label="${t('Navigation principale','القائمة')}">
      ${NAV.map(n => `<a href="${n[0]}" ${n[3]===page?'aria-current="page"':''}>${t(n[1],n[2])}</a>`).join('')}
    </nav>
    <div class="tools">
      <button class="chip" id="lang" lang="${t('ar','fr')}">${t('العربية','Français')}</button>
      <button class="chip" id="openSel" aria-label="${t('Ma sélection','اختياراتي')}"><span class="lbl">${t('Ma sélection','اختياراتي')}</span><span class="count" id="count">0</span></button>
      <button class="burger" id="burger" aria-label="${t('Ouvrir le menu','فتح القائمة')}" aria-expanded="false" aria-controls="menu"><span></span><span></span></button>
    </div>
  </div></header>`);
  document.body.insertAdjacentHTML('beforeend', `
  <footer class="ft"><div class="wrap">
    <div class="cols">
      <div><h4>Modzak</h4><p>${t('Costumes, smokings, chemises et chaussures pour homme. Livraison partout au Maroc.','بدلات، سموكينغ، قمصان وأحذية رجالية. التوصيل لجميع مدن المغرب.')}</p></div>
      <div><h4>${t('Pages','الصفحات')}</h4>${NAV.map(n=>`<a href="${n[0]}">${t(n[1],n[2])}</a>`).join('')}</div>
      <div><h4>${t('Contact','اتصل بنا')}</h4><a href="https://wa.me/${WA}" dir="ltr">WhatsApp 06 29 94 29 24</a><a href="tel:+212521060592" dir="ltr">05 21 06 05 92</a><a href="https://www.instagram.com/modzak.m/" target="_blank" rel="noopener">Instagram</a><a href="https://web.facebook.com/modzakma" target="_blank" rel="noopener">Facebook</a></div>
      <div><h4>${t('Adresse','العنوان')}</h4><p>${t('Central Park, Rue Abdelmoumen n°3, Mohammedia','سنترال بارك، شارع عبد المومن رقم 3، المحمدية')}</p></div>
    </div>
    <div class="word" aria-hidden="true">MODZAK</div>
    <div class="base"><span>© ${new Date().getFullYear()} Modzak</span><span>${t('Your way into elegance','طريقك نحو الأناقة')}</span></div>
  </div></footer>`);
}
function once() {
  document.body.insertAdjacentHTML('beforeend', `
  <div class="scrim" id="scrim"></div>
  <aside class="drawer" id="drawer" aria-hidden="true" aria-labelledby="dt" data-lenis-prevent></aside>
  <div class="qv" id="qv" role="dialog" aria-modal="true" aria-hidden="true" aria-labelledby="qvt" data-lenis-prevent></div>
  <div class="toast" id="toast" role="status"></div>
  <div class="cursor" id="cursor" aria-hidden="true"></div>
  <a class="wa-float" href="https://wa.me/${WA}" target="_blank" rel="noopener" aria-label="WhatsApp">${ICON.wa}</a>`);
}

/* ---------- langue ---------- */
function setTexts() {
  document.documentElement.lang = lang; document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  document.querySelectorAll('[data-fr]').forEach(el => { el.innerHTML = (lang === 'ar' ? el.dataset.ar : el.dataset.fr) ?? el.dataset.fr });
  document.querySelectorAll('[data-ph-fr]').forEach(el => { el.placeholder = lang === 'ar' ? el.dataset.phAr : el.dataset.phFr });
  document.querySelectorAll('[data-al-fr]').forEach(el => el.setAttribute('aria-label', lang === 'ar' ? el.dataset.alAr : el.dataset.alFr));
  document.querySelectorAll('img[data-alt-ar]').forEach(el => { el.dataset.altFr ??= el.alt; el.alt = lang === 'ar' ? el.dataset.altAr : el.dataset.altFr });
}
function applyLang() {
  setTexts(); chrome(); bindChrome(); updateCount(); renderDrawer(); splitTitle(true);
  document.dispatchEvent(new CustomEvent('mz:lang', { detail: lang }));
  window.ScrollTrigger?.refresh();
}

/* ---------- sélection (envoyée en un message WhatsApp) ---------- */
let sel = store.get('mz-sel', []).filter(s => PRODUCTS.some(p => p.id === s.id));
const byId = id => PRODUCTS.find(p => p.id === id);
const isSaved = id => sel.some(s => s.id === id);
function saveSel() { store.set('mz-sel', sel); updateCount(true); renderDrawer(); document.querySelectorAll('.save[data-id]').forEach(b => b.setAttribute('aria-pressed', isSaved(b.dataset.id))) }
function toggle(id) {
  if (isSaved(id)) { sel = sel.filter(s => s.id !== id); toast(t('Retiré de votre sélection','حُذف من اختياراتك')) }
  else { sel = sel.concat({ id, size: '' }); toast(t('Ajouté à votre sélection','أُضيف إلى اختياراتك')) }
  saveSel();
}
function updateCount(bump) { const c = document.getElementById('count'); if (!c) return; c.textContent = sel.length; if (bump) { c.classList.remove('bump'); void c.offsetWidth; c.classList.add('bump') } }
function selMessage() {
  return t('Bonjour Modzak, voici ma sélection :\n','مرحباً مودزاك، هذه اختياراتي:\n') +
    sel.map(s => `- ${t(byId(s.id).fr, byId(s.id).ar)}${s.size ? ` (${t('taille','المقاس')} ${s.size})` : ''}`).join('\n') +
    t('\nPouvez-vous me donner les prix et la disponibilité ?','\nما الأثمنة والمقاسات المتوفرة؟');
}
function renderDrawer() {
  const d = document.getElementById('drawer');
  d.innerHTML = `<header><h2 id="dt">${t('Ma sélection','اختياراتي')}</h2><button class="x" data-close aria-label="${t('Fermer','إغلاق')}">×</button></header>
  <div class="list">${sel.length ? sel.map(s => { const p = byId(s.id); return `<div class="item"><img src="${src(p.id)}" alt=""><div><b>${t(p.fr,p.ar)}</b><select data-size="${p.id}" aria-label="${t('Taille','المقاس')}"><option value="">${t('Taille ?','المقاس؟')}</option>${p.sizes.map(z=>`<option ${String(z)===String(s.size)?'selected':''}>${z}</option>`).join('')}</select></div><button class="rm" data-rm="${p.id}">${t('Retirer','حذف')}</button></div>` }).join('')
    : `<p class="empty">${t('Votre sélection est vide. Touchez le cœur sur une pièce pour l’ajouter, puis envoyez tout en un message.','اختياراتك فارغة. اضغط على القلب لإضافة قطعة ثم أرسل الكل في رسالة واحدة.')}<br><br><a href="collection.html">${t('Voir la collection','شاهد المجموعة')}</a></p>`}</div>
  ${sel.length ? `<footer><a class="btn" target="_blank" rel="noopener" href="${wa(selMessage())}">${t('Envoyer ma sélection sur WhatsApp','أرسل اختياراتي عبر واتساب')}</a><p style="font-size:13px;color:var(--muted)">${t('Le prix et la disponibilité vous sont confirmés par message.','نؤكد لك الثمن والتوفر في رسالة.')}</p></footer>` : ''}`;
}
let lastFocus;
/* un panneau ouvert rend le reste de la page inerte : le focus reste dedans */
const behind = on => document.querySelectorAll('main,.hd,.ft,.wa-float').forEach(n => n.inert = on);
function openLayer(id) { lastFocus = document.activeElement; const el = document.getElementById(id); el.inert = false; el.classList.add('on'); el.setAttribute('aria-hidden','false'); document.getElementById('scrim').classList.add('on'); behind(true); lenis?.stop(); setTimeout(() => el.querySelector('button,a,select')?.focus(), 50) }
function closeLayers() { const was = document.querySelector('.drawer.on,.qv.on'); ['drawer','qv'].forEach(id => { const el = document.getElementById(id); el.classList.remove('on'); el.setAttribute('aria-hidden','true'); el.inert = true }); document.getElementById('scrim').classList.remove('on'); behind(false); if (!document.body.classList.contains('nav-open')) lenis?.start(); if (was) lastFocus?.focus?.() }

/* ---------- aperçu produit ---------- */
function quickView(id) {
  const p = byId(id); let size = '';
  const q = document.getElementById('qv');
  q.innerHTML = `<button class="x" data-close aria-label="${t('Fermer','إغلاق')}">×</button>
  <div class="pic"><img id="qvimg" src="${src(p.id,1)}" alt="${t(p.fr,p.ar)}">${p.gal ? `<div class="thumbs" role="group" aria-label="${t('Photos','الصور')}">${p.gal.map((g,i)=>`<button data-g="${g}" aria-pressed="${i===0}" aria-label="${t('Photo','صورة')} ${i+1}"><img src="${src(g)}" alt=""></button>`).join('')}</div>` : ''}</div>
  <div class="body"><span class="kicker">${CATS[p.cat][lang==='ar'?1:0]}</span><h2 class="display" id="qvt">${t(p.fr,p.ar)}</h2><p class="lead">${t(p.dfr,p.dar)}</p>
  <div><p style="font-size:13px;font-weight:600;margin-bottom:8px">${t('Choisissez votre taille','اختر مقاسك')}</p><div class="sizes">${p.sizes.map(z=>`<button aria-pressed="false" data-z="${z}">${z}</button>`).join('')}</div></div>
  <p style="font-size:14px">${t('Prix sur WhatsApp. Essayage possible en boutique.','الثمن عبر واتساب. القياس ممكن في المتجر.')}</p>
  <div class="row"><a class="btn" id="qvwa" target="_blank" rel="noopener">${t('Commander sur WhatsApp','اطلب عبر واتساب')} ${ICON.arrow}</a><button class="btn alt" id="qvsave">${t('Ajouter à ma sélection','أضف إلى اختياراتي')}</button></div></div>`;
  const link = () => q.querySelector('#qvwa').href = wa(t(`Bonjour Modzak, je souhaite commander : ${p.fr}${size?` en taille ${size}`:''}. Quel est le prix ?`,`مرحباً مودزاك، أريد طلب ${p.ar}${size?` بمقاس ${size}`:''}. ما الثمن؟`));
  link();
  q.querySelectorAll('[data-g]').forEach(b => b.onclick = () => { q.querySelector('#qvimg').src = src(b.dataset.g, 1); q.querySelectorAll('[data-g]').forEach(x => x.setAttribute('aria-pressed', x === b)) });
  q.querySelectorAll('[data-z]').forEach(b => b.onclick = () => { size = b.dataset.z; q.querySelectorAll('[data-z]').forEach(x => x.setAttribute('aria-pressed', x === b)); link() });
  q.querySelector('#qvsave').onclick = () => { sel = sel.filter(s => s.id !== id).concat({ id, size }); toast(t('Ajouté à votre sélection','أُضيف إلى اختياراتك')); saveSel(); closeLayers() };
  openLayer('qv');
}

/* carte produit réutilisable (accueil + collection) */
function card(p) {
  return `<article class="product" data-cat="${p.cat}" data-id="${p.id}">
    <div class="ph" data-qv="${p.id}" data-cursor="${t('Voir','عرض')}" role="button" tabindex="0" aria-label="${t('Aperçu','عرض')} ${t(p.fr,p.ar)}"><img loading="lazy" src="${src(p.id)}" alt="${t(p.fr,p.ar)}"></div>
    <button class="save" data-id="${p.id}" aria-pressed="${isSaved(p.id)}" aria-label="${t('Ajouter à ma sélection','أضف إلى اختياراتي')}">${ICON.heart}</button>
    <h3>${t(p.fr,p.ar)}</h3><p class="meta">${CATS[p.cat][lang==='ar'?1:0]} · ${t('Prix sur WhatsApp','الثمن عبر واتساب')}</p>
    <div class="actions"><button data-qv="${p.id}">${t('Choisir la taille','اختر المقاس')}</button><a target="_blank" rel="noopener" href="${wa(t(`Bonjour Modzak, je suis intéressé par : ${p.fr}. Quel est le prix ?`,`مرحباً مودزاك، أنا مهتم بـ ${p.ar}. ما الثمن؟`))}">WhatsApp</a></div>
  </article>`;
}

let toastTimer;
function toast(msg) { const el = document.getElementById('toast'); el.textContent = msg; el.classList.add('on'); clearTimeout(toastTimer); toastTimer = setTimeout(() => el.classList.remove('on'), 2200) }

/* ---------- titre principal : mots qui montent (un seul moment par page) ---------- */
function splitTitle(instant) {
  const h = document.querySelector('[data-split]'); if (!h) return;
  let i = 0;
  const walk = node => [...node.childNodes].forEach(n => {
    if (n.nodeType === 3) { const f = document.createDocumentFragment(); n.textContent.split(/(\s+)/).forEach(part => { if (!part) return; if (/^\s+$/.test(part)) { f.append(part); return } const w = document.createElement('span'); w.className = 'w'; w.innerHTML = `<span style="--i:${i++}">${part}</span>`; f.append(w) }); n.replaceWith(f) }
    else if (n.nodeType === 1 && !n.classList.contains('w') && n.tagName !== 'BR') walk(n);
  });
  walk(h); h.classList.add('split');
  if (instant) h.classList.add('go'); else if (h.dataset.split !== 'manual') setTimeout(() => h.classList.add('go'), 450);
}

/* ---------- interactions globales ---------- */
/* menu mobile : fermé = hors de l'ordre de tabulation */
const mobile = matchMedia('(max-width:860px)');
function setNav(open) {
  document.body.classList.toggle('nav-open', open);
  document.getElementById('burger')?.setAttribute('aria-expanded', open);
  const m = document.getElementById('menu'); if (m) m.inert = mobile.matches && !open;
  document.querySelectorAll('main,.ft,.wa-float').forEach(x => x.inert = open);
  document.documentElement.style.overflow = open ? 'hidden' : '';
  open ? lenis?.stop() : lenis?.start();
}
mobile.addEventListener('change', () => setNav(false));
function bindChrome() {
  document.getElementById('lang').onclick = () => { lang = lang === 'fr' ? 'ar' : 'fr'; store.set('mz-lang', lang); applyLang() };
  document.getElementById('openSel').onclick = () => { renderDrawer(); openLayer('drawer') };
  const burger = document.getElementById('burger');
  burger.onclick = () => setNav(!document.body.classList.contains('nav-open'));
  setNav(false);
}
document.addEventListener('click', e => {
  const el = e.target.closest('[data-qv],.save,[data-close],[data-rm],a[href$=".html"]');
  if (!el) return;
  if (el.matches('.save')) { e.preventDefault(); toggle(el.dataset.id) }
  else if (el.dataset.qv) quickView(el.dataset.qv);
  else if (el.matches('[data-close]')) closeLayers();
  else if (el.dataset.rm) { sel = sel.filter(s => s.id !== el.dataset.rm); saveSel(); (document.querySelector('#drawer .rm') || document.querySelector('#drawer .x'))?.focus() }
  else if (el.matches('a[href$=".html"]') && !e.metaKey && !e.ctrlKey && el.target !== '_blank' && !reduce) {
    e.preventDefault(); const c = document.createElement('div'); c.className = 'curtain in'; c.innerHTML = '<b>MZ</b>'; document.body.append(c);
    setTimeout(() => location.href = el.getAttribute('href'), 560);
  }
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') { if (document.body.classList.contains('nav-open')) { setNav(false); document.getElementById('burger').focus() } closeLayers() }
  if ((e.key === 'Enter' || e.key === ' ') && e.target.matches('.ph[data-qv]')) { e.preventDefault(); quickView(e.target.dataset.qv) }
});
document.addEventListener('change', e => { if (e.target.dataset.size) { const s = sel.find(x => x.id === e.target.dataset.size); if (s) { s.size = e.target.value; store.set('mz-sel', sel); const a = document.querySelector('#drawer footer a'); if (a) a.href = wa(selMessage()) } } });

/* curseur « Voir » sur les photos produit */
function cursor() {
  if (matchMedia('(hover:none)').matches) return;
  const c = document.getElementById('cursor');
  let x = 0, y = 0, cx = 0, cy = 0;
  addEventListener('pointermove', e => { x = e.clientX; y = e.clientY; const h = e.target.closest('[data-cursor]'); c.classList.toggle('on', !!h); if (h) c.textContent = h.dataset.cursor });
  (function loop() { cx += (x - cx) * .2; cy += (y - cy) * .2; c.style.translate = `${cx}px ${cy}px`; requestAnimationFrame(loop) })();
}

/* boutons aimantés (attribut data-magnet) */
function magnetic() {
  if (matchMedia('(hover:none)').matches || reduce) return;
  document.addEventListener('pointermove', e => {
    document.querySelectorAll('[data-magnet]').forEach(b => {
      const r = b.getBoundingClientRect(), dx = e.clientX - (r.left + r.width / 2), dy = e.clientY - (r.top + r.height / 2);
      b.style.transition = 'transform .4s cubic-bezier(.2,.7,.2,1)';
      b.style.transform = Math.hypot(dx, dy) < 110 ? `translate(${dx * .25}px,${dy * .3}px)` : '';
    });
  });
}

/* en-tête qui se cache en descendant */
function headerScroll() {
  let last = 0;
  addEventListener('scroll', () => { const y = scrollY, hd = document.querySelector('.hd'); hd.classList.toggle('scrolled', y > 30); hd.classList.toggle('hide', y > last && y > 400 && !document.body.classList.contains('nav-open')); last = y }, { passive: true });
}

/* ---------- démarrage ---------- */
once(); document.getElementById('scrim').onclick = closeLayers;
['drawer','qv'].forEach(id => document.getElementById(id).inert = true);
setTexts(); chrome(); bindChrome(); updateCount(); renderDrawer(); cursor(); magnetic(); headerScroll();

/* rideau d'ouverture : se lève à l'arrivée sur la page */
if (!reduce) {
  const c = document.createElement('div'); c.className = 'curtain'; c.innerHTML = '<b>MZ</b>'; document.body.append(c);
  const lift = () => { c.classList.add('out'); setTimeout(() => c.remove(), 1100) };
  document.readyState === 'complete' ? setTimeout(lift, 200) : addEventListener('load', lift); setTimeout(lift, 2000);
}
addEventListener('pageshow', e => { if (e.persisted) document.querySelectorAll('.curtain').forEach(c => c.remove()) });
splitTitle(reduce);

if (window.Lenis && !reduce) {
  lenis = new Lenis({ lerp: .1 });
  if (window.gsap && window.ScrollTrigger) { lenis.on('scroll', ScrollTrigger.update); gsap.ticker.add(time => lenis.raf(time * 1000)); gsap.ticker.lagSmoothing(0) }
  else { const raf = time => { lenis.raf(time); requestAnimationFrame(raf) }; requestAnimationFrame(raf) }
}

window.MZ = { PRODUCTS, CATS, card, t, wa, lang: () => lang, quickView, ICON, IMG, src, reduce, toast, WA };
})();
