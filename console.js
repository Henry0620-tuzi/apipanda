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

const backendStatus = document.querySelector('#backend-status');
const backendCheck = document.querySelector('#backend-check');
async function checkBackend() {
  if (!window.Sub2API?.enabled) {
    backendStatus.className = 'backend-status offline';
    backendStatus.querySelector('b').textContent = 'Sub2API 后台未配置';
    backendStatus.querySelector('p').textContent = '请在 sub2api-config.js 填写后台 /api/v1 地址并启用实时数据。';
    return;
  }
  backendStatus.className = 'backend-status checking';
  backendStatus.querySelector('b').textContent = '正在检测 Sub2API…';
  try {
    await window.Sub2API.publicSettings();
    backendStatus.className = 'backend-status online';
    backendStatus.querySelector('b').textContent = 'Sub2API 后台连接正常';
    backendStatus.querySelector('p').textContent = '公开设置接口可用；登录后将加载账户、密钥、用量和订单数据。';
  } catch (error) {
    backendStatus.className = 'backend-status offline';
    backendStatus.querySelector('b').textContent = 'Sub2API 后台连接失败';
    backendStatus.querySelector('p').textContent = error.message === 'SUB2API_NOT_CONFIGURED' ? '后台尚未配置。' : `无法访问后台：${error.message}`;
  }
}
backendCheck?.addEventListener('click', checkBackend);
checkBackend();
