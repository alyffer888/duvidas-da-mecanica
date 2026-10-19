const nav=document.getElementById('nav');
const menu=document.getElementById('menu-toggle');
menu.addEventListener('click',()=>{const open=nav.classList.toggle('show');menu.setAttribute('aria-expanded',String(open));});
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('show');menu.setAttribute('aria-expanded','false');}));

const cards=[...document.querySelectorAll('.faq-card')];
const searchInput=document.getElementById('search-input');
const count=document.getElementById('result-count');
const noResults=document.getElementById('no-results');
function filterFaq(term='',category=''){
  const query=term.trim().toLocaleLowerCase('pt-BR');let visible=0;
  cards.forEach(card=>{
    const content=(card.innerText+' '+card.dataset.search+' '+card.dataset.category).toLocaleLowerCase('pt-BR');
    const match=(!query||content.includes(query))&&(!category||card.dataset.category===category);
    card.hidden=!match;if(match)visible++;
  });
  document.querySelectorAll('.category').forEach(b=>b.classList.toggle('active',!!category&&b.dataset.category===category));
  count.textContent=(query||category)?`${visible} pergunta(s) encontrada(s).`:'';
  noResults.hidden=visible!==0;
}
document.getElementById('search-form').addEventListener('submit',e=>{e.preventDefault();filterFaq(searchInput.value);document.getElementById('perguntas').scrollIntoView({behavior:'smooth'});});
document.querySelectorAll('.category').forEach(button=>button.addEventListener('click',()=>{const chosen=button.classList.contains('active')?'':button.dataset.category;filterFaq('',chosen);document.getElementById('perguntas').scrollIntoView({behavior:'smooth'});}));
document.querySelectorAll('.faq-question').forEach(button=>button.addEventListener('click',()=>{const card=button.closest('.faq-card');const open=card.classList.toggle('open');button.setAttribute('aria-expanded',String(open));button.querySelector('b').textContent=open?'−':'＋';}));
function resetFilters(){searchInput.value='';filterFaq();document.querySelectorAll('.faq-card').forEach(c=>c.classList.remove('open'));document.querySelectorAll('.faq-question').forEach(b=>{b.setAttribute('aria-expanded','false');b.querySelector('b').textContent='＋';});}
document.getElementById('show-all').addEventListener('click',()=>{resetFilters();document.getElementById('categorias').scrollIntoView({behavior:'smooth'});});
document.getElementById('clear-filters').addEventListener('click',resetFilters);
document.getElementById('reset-search').addEventListener('click',resetFilters);
document.getElementById('contact-form').addEventListener('submit',e=>{e.preventDefault();const name=document.getElementById('visitor-name').value.trim();const email=document.getElementById('visitor-email').value.trim();const question=document.getElementById('visitor-question').value.trim();const subject=encodeURIComponent('Pergunta pelo site Dúvidas da Mecânica');const body=encodeURIComponent(`Nome: ${name}\nE-mail: ${email}\n\nDúvida:\n${question}`);document.getElementById('form-status').textContent='Abrindo seu aplicativo de e-mail. O formulário não armazena a pergunta no site.';window.location.href=`mailto:?subject=${subject}&body=${body}`;});
document.getElementById('year').textContent=new Date().getFullYear();
