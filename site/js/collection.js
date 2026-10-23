/* Collection — script de page */
(() => {
const { PRODUCTS, CATS, card, t } = MZ;
const grid = document.getElementById('grid'), tabs = document.getElementById('tabs'), ink = document.getElementById('ink'), q = document.getElementById('q'), none = document.getElementById('none');
let cat = new URLSearchParams(location.search).get('c') || 'all', term = '';
if (!CATS[cat]) cat = 'all';

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
function drawGrid() { grid.innerHTML = PRODUCTS.map(card).join(''); filter(false) }

/* filtre animé : chaque carte glisse de son ancienne place à la nouvelle */
function filter(animate = true) {
  const cards = [...grid.children];
  const before = new Map(cards.map(c => [c, c.getBoundingClientRect()]));
  const s = term.trim().toLowerCase();
  let shown = 0;
  cards.forEach(c => {
    const p = PRODUCTS.find(x => x.id === c.dataset.id);
    const ok = (cat === 'all' || p.cat === cat) && (!s || (p.fr + ' ' + p.ar + ' ' + p.cat).toLowerCase().includes(s));
    c.classList.toggle('out', !ok); if (ok) shown++;
  });
  none.hidden = shown > 0;
  if (!shown) { none.textContent = `${t('Aucune pièce ne correspond à','لا توجد قطعة تطابق')} « ${term} ». `; none.insertAdjacentHTML('beforeend', `<button id="reset">${t('Tout afficher','عرض الكل')}</button>`) }
  if (!animate || MZ.reduce || !window.gsap) return;
  cards.filter(c => !c.classList.contains('out')).forEach((c, i) => {
    const a = before.get(c), b = c.getBoundingClientRect();
    if (a.width === 0) gsap.fromTo(c, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: .6, delay: i * .04, ease: 'power3.out', clearProps: 'all' });
    else gsap.fromTo(c, { x: a.left - b.left, y: a.top - b.top }, { x: 0, y: 0, duration: .7, ease: 'power3.inOut', clearProps: 'transform' });
  });
}

tabs.addEventListener('click', e => {
  const b = e.target.closest('[data-c]'); if (!b) return;
  cat = b.dataset.c; tabs.querySelectorAll('[data-c]').forEach(x => x.setAttribute('aria-pressed', x === b)); moveInk(); filter();
  history.replaceState(null, '', cat === 'all' ? location.pathname : `?c=${cat}`);
});
let timer; q.addEventListener('input', () => { clearTimeout(timer); timer = setTimeout(() => { term = q.value; filter() }, 160) });
none.addEventListener('click', e => { if (e.target.id === 'reset') { term = ''; q.value = ''; cat = 'all'; drawTabs(); filter() } });
addEventListener('resize', moveInk);
document.addEventListener('mz:lang', () => { drawTabs(); drawGrid() });

/* la barre de filtres remonte quand l'en-tête se cache */
addEventListener('scroll', () => document.body.classList.toggle('hd-hidden', !!document.querySelector('.hd.hide')), { passive: true });

drawTabs(); drawGrid();
document.fonts?.ready.then(moveInk);
})();
