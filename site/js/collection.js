/* Collection — script de page */
(() => {
const { PRODUCTS, CATS, card, t } = MZ;
const grid = document.getElementById('grid'), tabs = document.getElementById('tabs'), ink = document.getElementById('ink'), q = document.getElementById('q'), none = document.getElementById('none');
const SUBS = {
  mocassins:['Mocassins','أحذية موكاسين'], baskets:['Baskets','أحذية رياضية'],
  mules:['Mules','أحذية مفتوحة'], habillees:['Habillées','أحذية رسمية'],
  blazers:['Blazers','سترات بليزر'], cuir:['Cuir','سترات جلدية'], blousons:['Blousons','سترات قصيرة'],
  pulls:['Pulls','كنزات'], polos:['Polos','بولو'], cardigans:['Cardigans','سترات صوفية'],
  unies:['Unies','سادة'], rayees:['Rayées','مخططة'], carreaux:['À carreaux','مربعات']
};
const subfilters = document.getElementById('subfilters'), more = document.getElementById('more');
const params = new URLSearchParams(location.search);
let cat = params.get('c') || 'all', sub = params.get('s') || '', term = '', limit = 24;
if (!Object.prototype.hasOwnProperty.call(CATS, cat)) cat = 'all';
function availableSubs() {
  return cat === 'all' ? [] : [...new Set(PRODUCTS.filter(p => p.cat === cat && p.sub && Object.prototype.hasOwnProperty.call(SUBS, p.sub)).map(p => p.sub))];
}
if (!availableSubs().includes(sub)) sub = '';
function syncURL() {
  const url = new URL(location.href);
  url.searchParams.delete('c'); url.searchParams.delete('s');
  if (cat !== 'all') url.searchParams.set('c', cat);
  if (sub) url.searchParams.set('s', sub);
  history.replaceState(null, '', url.pathname + url.search + url.hash);
}
function drawSubs() {
  const keys = availableSubs();
  subfilters.hidden = !keys.length;
  subfilters.replaceChildren();
  ['', ...keys].forEach(key => {
    const b = document.createElement('button');
    b.type = 'button'; b.dataset.sub = key;
    b.setAttribute('aria-pressed', String(key === sub));
    b.textContent = key ? SUBS[key][MZ.lang() === 'ar' ? 1 : 0] : t('Tout', 'الكل');
    subfilters.append(b);
  });
}
function drawTabs() {
  tabs.querySelectorAll('button').forEach(b => b.remove());
  Object.keys(CATS).forEach(k => {
    const n = k === 'all' ? PRODUCTS.length : PRODUCTS.filter(p => p.cat === k).length;
    tabs.insertAdjacentHTML('beforeend', `<button data-c="${k}" aria-pressed="${k === cat}">${CATS[k][MZ.lang() === 'ar' ? 1 : 0]}<sup>${n}</sup></button>`);
  });
  moveInk();
}
function moveInk() {
  const b = tabs.querySelector(`[data-c="${cat}"]`); if (!b) return;
  ink.style.width = b.offsetWidth + 'px'; ink.style.transform = `translateX(${b.offsetLeft}px)`;
}
function drawGrid() { grid.replaceChildren(); filter(false) }

/* Seules les cartes de la page progressive participent au filtre animé. */
function filter(animate = true) {
  const old = new Map([...grid.children].map(c => [c.dataset.id, c.getBoundingClientRect()]));
  const search = term.trim().toLowerCase();
  const matches = PRODUCTS.filter(p => (cat === 'all' || p.cat === cat) && (!sub || p.sub === sub) &&
    (!search || [p.fr, p.ar, p.cat, p.sub, p.color].filter(Boolean).join(' ').toLowerCase().includes(search)));
  grid.innerHTML = matches.slice(0, limit).map(card).join('');
  const remaining = Math.max(0, matches.length - limit);
  more.hidden = !remaining;
  more.textContent = t(`Voir plus (${remaining} restants)`, `عرض المزيد (${remaining})`);
  none.hidden = matches.length > 0;
  if (!matches.length) {
    none.textContent = `${t('Aucune pièce ne correspond à','لا توجد قطعة تطابق')} « ${term} ». `;
    const reset = document.createElement('button'); reset.id = 'reset';
    reset.textContent = t('Tout afficher','عرض الكل'); none.append(reset);
  }
  if (!animate || MZ.reduce || !window.gsap) return;
  [...grid.children].forEach((c, i) => {
    const a = old.get(c.dataset.id), b = c.getBoundingClientRect();
    if (!a) gsap.fromTo(c, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: .6, delay: Math.min(i, 12) * .04, ease: 'power3.out', clearProps: 'all' });
    else gsap.fromTo(c, { x: a.left - b.left, y: a.top - b.top }, { x: 0, y: 0, duration: .7, ease: 'power3.inOut', clearProps: 'transform' });
  });
}

tabs.addEventListener('click', e => {
  const b = e.target.closest('[data-c]'); if (!b) return;
  cat = b.dataset.c; sub = ''; limit = 24;
  drawTabs(); drawSubs(); filter(); syncURL();
});
subfilters.addEventListener('click', e => {
  const b = e.target.closest('[data-sub]'); if (!b) return;
  sub = b.dataset.sub; limit = 24; drawSubs(); filter(); syncURL();
});
function showMore() { if (!more.hidden) { limit += 24; filter(false) } }
more.addEventListener('click', showMore);
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    if (entries.some(entry => entry.isIntersecting)) showMore();
  });
  observer.observe(more);
}
let timer; q.addEventListener('input', () => { clearTimeout(timer); timer = setTimeout(() => { term = q.value; limit = 24; filter() }, 160) });
none.addEventListener('click', e => { if (e.target.id === 'reset') { term = ''; q.value = ''; cat = 'all'; sub = ''; limit = 24; drawTabs(); drawSubs(); filter(); syncURL() } });
addEventListener('resize', moveInk);
document.addEventListener('mz:lang', () => { drawTabs(); drawSubs(); drawGrid() });

/* la barre de filtres remonte quand l'en-tête se cache */
addEventListener('scroll', () => document.body.classList.toggle('hd-hidden', !!document.querySelector('.hd.hide')), { passive: true });

drawTabs(); drawSubs(); drawGrid();
syncURL();
document.fonts?.ready.then(moveInk);
})();
