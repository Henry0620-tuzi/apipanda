# ApiPanda 与 Sub2API 对接说明

## 当前状态

前端适配层已按 Sub2API 官方当前接口建立，但尚未配置真实后台地址。GitHub Pages 只托管静态文件，不能代替 Sub2API、PostgreSQL、Redis 和支付回调服务。

## 功能映射

| ApiPanda 功能 | Sub2API 接口 |
| --- | --- |
| 登录 / 当前用户 | `POST /api/v1/auth/login`、`GET /api/v1/auth/me` |
| 用户资料 | `GET /api/v1/user/profile` |
| API Key | `GET/POST /api/v1/keys`、`PUT/DELETE /api/v1/keys/:id` |
| 控制台统计 | `GET /api/v1/usage/dashboard/stats` |
| 用量趋势 | `GET /api/v1/usage/dashboard/trend` |
| 模型统计 | `GET /api/v1/usage/dashboard/models` |
| 调用 / 使用日志 | `GET /api/v1/usage`、`GET /api/v1/usage/stats` |
| 订单中心 | `GET /api/v1/payment/orders/my` |
| 订阅 | `GET /api/v1/subscriptions`、`GET /api/v1/subscriptions/summary` |
| 兑换记录 | `GET /api/v1/redeem/history` |
| 系统通知 | `GET /api/v1/announcements` |

“人物日志”和“等级权益”不是 Sub2API 当前标准用户接口，需要后续扩展后端表与 API，或映射到管理员审计/用户属性模块。

## 启用方式

部署后台后编辑 `sub2api-config.js`：

```js
window.APIPANDA_CONFIG = Object.freeze({
  apiBaseUrl: 'https://你的API域名/api/v1',
  gatewayBaseUrl: 'https://你的API域名',
  requestTimeoutMs: 15000,
  enableLiveData: true
});
```

如果前端与后台不是同一域名，需要在反向代理配置允许 GitHub Pages 或正式前端域名的 CORS，并允许 `Authorization`、`Content-Type` 和凭据请求。生产环境建议将静态站与 Sub2API 放在同一主域名下，通过 `/api/v1` 反向代理，避免跨域和 Cookie 问题。
