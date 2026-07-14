const menuButton = document.querySelector('.menu-button');
const nav = document.querySelector('.nav-links');

menuButton?.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('is-open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
});

nav?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    nav.classList.remove('is-open');
    menuButton?.setAttribute('aria-expanded', 'false');
  });
});

document.querySelector('#year').textContent = new Date().getFullYear();

document.querySelectorAll('details').forEach((item) => {
  item.addEventListener('toggle', () => {
    if (!item.open) return;
    document.querySelectorAll('details').forEach((other) => {
      if (other !== item) other.open = false;
    });
  });
});

const toolMenus = document.querySelectorAll('.tool-menu');
const closeToolMenus = (except) => toolMenus.forEach((menu) => {
  if (menu !== except) {
    menu.classList.remove('open');
    menu.querySelector(':scope > button')?.setAttribute('aria-expanded', 'false');
  }
});

toolMenus.forEach((menu) => {
  const trigger = menu.querySelector(':scope > button');
  trigger?.addEventListener('click', (event) => {
    event.stopPropagation();
    const opening = !menu.classList.contains('open');
    closeToolMenus(menu);
    menu.classList.toggle('open', opening);
    trigger.setAttribute('aria-expanded', String(opening));
  });
});
document.addEventListener('click', () => closeToolMenus());
document.querySelectorAll('.tool-popover').forEach((popover) => popover.addEventListener('click', (event) => event.stopPropagation()));

document.querySelectorAll('[data-node]').forEach((choice) => choice.addEventListener('click', () => {
  document.querySelectorAll('[data-node]').forEach((item) => item.classList.remove('active'));
  choice.classList.add('active');
  document.querySelector('.node-name').textContent = choice.dataset.node;
  localStorage.setItem('apipanda-node', choice.dataset.node);
}));

const applyTheme = (theme) => {
  const dark = theme === 'dark' || (theme === 'system' && matchMedia('(prefers-color-scheme: dark)').matches);
  document.documentElement.dataset.theme = dark ? 'dark' : 'light';
  document.querySelector('.theme-icon').textContent = dark ? '☾' : '☼';
  document.querySelectorAll('[data-theme]').forEach((item) => {
    item.classList.toggle('active', item.dataset.theme === theme);
    const mark = item.querySelector('b');
    if (mark) mark.remove();
    if (item.dataset.theme === theme) item.insertAdjacentHTML('beforeend', '<b>✓</b>');
  });
  localStorage.setItem('apipanda-theme', theme);
};
document.querySelectorAll('[data-theme]').forEach((choice) => choice.addEventListener('click', () => applyTheme(choice.dataset.theme)));
applyTheme(localStorage.getItem('apipanda-theme') || 'light');

const translations = {
  zh: { home: '首页', console: '控制台', models: '模型广场', docs: '开发文档', roadmap: '建设路线' },
  en: { home: 'Home', console: 'Console', models: 'Models', docs: 'Docs', roadmap: 'Roadmap' },
  ja: { home: 'ホーム', console: 'コンソール', models: 'モデル', docs: 'ドキュメント', roadmap: 'ロードマップ' },
  ko: { home: '홈', console: '콘솔', models: '모델', docs: '문서', roadmap: '로드맵' }
};
const applyLanguage = (lang) => {
  document.documentElement.lang = lang === 'zh' ? 'zh-CN' : lang;
  document.querySelectorAll('[data-i18n]').forEach((item) => item.textContent = translations[lang][item.dataset.i18n]);
  document.querySelectorAll('[data-lang]').forEach((item) => {
    item.classList.toggle('active', item.dataset.lang === lang);
    item.querySelector('b')?.remove();
    if (item.dataset.lang === lang) item.insertAdjacentHTML('beforeend', '<b>✓</b>');
  });
  localStorage.setItem('apipanda-lang', lang);
};
document.querySelectorAll('[data-lang]').forEach((choice) => choice.addEventListener('click', () => applyLanguage(choice.dataset.lang)));
applyLanguage(localStorage.getItem('apipanda-lang') || 'zh');

document.querySelector('.read-all')?.addEventListener('click', () => {
  document.querySelectorAll('.notice-popover article').forEach((item) => item.classList.remove('unread'));
  document.querySelector('.notice-dot')?.remove();
});
