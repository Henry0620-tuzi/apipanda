(function () {
  const config = window.APIPANDA_CONFIG || {};
  const base = String(config.apiBaseUrl || '').replace(/\/+$/, '');
  const enabled = Boolean(config.enableLiveData && base);

  const endpoints = Object.freeze({
    publicSettings: '/settings/public', login: '/auth/login', register: '/auth/register', me: '/auth/me',
    profile: '/user/profile', keys: '/keys', usage: '/usage', usageStats: '/usage/stats',
    dashboardStats: '/usage/dashboard/stats', dashboardTrend: '/usage/dashboard/trend',
    dashboardModels: '/usage/dashboard/models', orders: '/payment/orders/my', paymentPlans: '/payment/plans',
    subscriptions: '/subscriptions', subscriptionSummary: '/subscriptions/summary', redeemHistory: '/redeem/history',
    announcements: '/announcements', groups: '/groups/available'
  });

  function token() { return localStorage.getItem('auth_token') || ''; }
  function unwrap(payload) {
    if (payload && typeof payload === 'object' && 'code' in payload) {
      if (payload.code !== 0) throw new Error(payload.message || 'Sub2API request failed');
      return payload.data;
    }
    return payload;
  }
  async function request(path, options = {}) {
    if (!enabled) throw new Error('SUB2API_NOT_CONFIGURED');
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), config.requestTimeoutMs || 15000);
    try {
      const headers = { 'Content-Type': 'application/json', 'Accept-Language': document.documentElement.lang || 'zh-CN', ...(options.headers || {}) };
      if (token()) headers.Authorization = `Bearer ${token()}`;
      const response = await fetch(`${base}${path}`, { ...options, headers, credentials: 'include', signal: controller.signal });
      const payload = await response.json().catch(() => null);
      if (!response.ok) throw new Error(payload?.message || `HTTP ${response.status}`);
      return unwrap(payload);
    } finally { clearTimeout(timer); }
  }
  const get = (path) => request(path);
  const post = (path, body) => request(path, { method: 'POST', body: JSON.stringify(body) });

  window.Sub2API = Object.freeze({
    config, endpoints, enabled, request, get, post,
    publicSettings: () => get(endpoints.publicSettings),
    login: (email, password) => post(endpoints.login, { email, password }),
    currentUser: () => get(endpoints.me),
    profile: () => get(endpoints.profile),
    keys: () => get(`${endpoints.keys}?page=1&page_size=50`),
    dashboard: () => Promise.all([get(endpoints.dashboardStats), get(endpoints.dashboardTrend), get(endpoints.dashboardModels)]),
    usage: () => get(`${endpoints.usage}?page=1&page_size=50`),
    orders: () => get(`${endpoints.orders}?page=1&page_size=50`),
    subscriptions: () => get(endpoints.subscriptions),
    announcements: () => get(endpoints.announcements)
  });
})();
