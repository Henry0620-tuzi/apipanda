# ApiPanda 静态站

这是一个纯静态的项目介绍站，可直接发布到 GitHub Pages。当前页面不包含后端、数据库、API Key 或真实 API 服务。

## 发布到 GitHub Pages

1. 在 GitHub 新建一个公开仓库。
2. 将本目录中的 `index.html`、`styles.css`、`script.js` 上传到仓库根目录。
3. 打开仓库的 **Settings → Pages**。
4. 在 **Build and deployment** 中选择 **Deploy from a branch**。
5. 选择 `main` 分支和 `/ (root)`，保存。
6. 等待 GitHub Pages 发布完成。

## 发布前需要替换

在 `index.html` 中搜索 `https://github.com/`，替换为你的真实 GitHub 仓库地址。页面上的 `ApiPanda` 也可以替换成你的服务名称。

后续准备好域名、VPS 和合规上游后，可以继续在这个仓库中添加部署文档、服务状态页和 API 使用说明。
