const navItems = document.querySelectorAll('.nav-item');
const pages = document.querySelectorAll('.console-page');
const sidebar = document.querySelector('.sidebar');

function showPage(name) {
  navItems.forEach((item) => item.classList.toggle('active', item.dataset.page === name));
  pages.forEach((page) => page.classList.toggle('active', page.id === `page-${name}`));
  sidebar.classList.remove('open');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

navItems.forEach((item) => item.addEventListener('click', () => showPage(item.dataset.page)));
document.querySelectorAll('[data-jump]').forEach((item) => item.addEventListener('click', () => showPage(item.dataset.jump)));
document.querySelector('.mobile-menu')?.addEventListener('click', () => sidebar.classList.toggle('open'));
