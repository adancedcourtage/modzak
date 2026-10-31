/* Accueil — script de page */
(() => {
const { PRODUCTS, card } = MZ;
const featured = () => document.getElementById('featured').innerHTML = ['c27','c01','c29','c16'].map(id => card(PRODUCTS.find(p => p.id === id))).join('');
document.getElementById('strip').innerHTML = ['p4','p10','p7','p9','p5','p3'].map(i => `<a href="https://www.instagram.com/modzak.m/" target="_blank" rel="noopener" aria-label="Instagram"><img loading="lazy" src="assets/ig/${i}.jpg" alt=""></a>`).join('');
featured();
document.addEventListener('mz:lang', featured);

const h1 = document.querySelector('[data-split]');
if (!window.gsap || !window.ScrollTrigger || MZ.reduce) { document.documentElement.classList.add('no-pin'); h1.classList.add('go'); return }
gsap.registerPlugin(ScrollTrigger);

/* ouverture : le mot grossit, la photo prend tout l'écran, puis le titre monte */
gsap.timeline({ scrollTrigger: { trigger: '#open', start: 'top top', end: 'bottom bottom', scrub: .6,
    onUpdate: s => h1.classList.toggle('go', s.progress > .72) } })
  .to('#hint', { opacity: 0, duration: .1 }, 0)
  .to('#word', { scale: 9, ease: 'power2.in', duration: 1 }, 0)
  .to('#full', { opacity: 1, duration: .35 }, .55)
  .fromTo('#full img', { scale: 1.25 }, { scale: 1, duration: .5 }, .55)
  .to('#word', { opacity: 0, duration: .1 }, .9)
  .to('#copy', { opacity: 1, duration: .15 }, .75);

gsap.to('#wedImg', { yPercent: -8, ease: 'none', scrollTrigger: { trigger: '.wed', start: 'top bottom', end: 'bottom top', scrub: true } });
})();
