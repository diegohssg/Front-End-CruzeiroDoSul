// Rotas com templates JS
const routes = {
  '/': 'tpl-home',
  '/projetos': 'tpl-projetos',
  '/cadastro': 'tpl-cadastro'
};

const app = document.getElementById('app');

function getTemplate(id) {
  const tpl = document.getElementById(id);
  return tpl ? tpl.innerHTML : '<p>Template não encontrado.</p>';
}

function setActiveLink(path) {
  const links = document.querySelectorAll('nav a[data-route]');
  links.forEach(link => {
    const route = link.getAttribute('data-route');
    if (route === path) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

function navigate() {
  const hash = window.location.hash || '#/';
  const path = hash.replace('#', '') || '/';
  const tplId = routes[path] || routes['/'];

  setActiveLink(path);
  app.innerHTML = getTemplate(tplId);

  // Inicializa lógica específica de páginas
  if (path === '/cadastro' && typeof initCadastroForm === 'function') {
    initCadastroForm();
  }
}

window.addEventListener('load', navigate);
window.addEventListener('hashchange', navigate);
