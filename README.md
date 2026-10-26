# 2026 俄勒冈圣诞公路旅行

中文旅行规划网页，静态站点在 [`docs/`](docs/) 中。网页内容包括冬季天气、景点介绍、地图、七日行程与 Crater Lake 取舍。

## GitHub Pages

本仓库在 `main` 分支更新 `docs/` 时，`.github/workflows/pages.yml` 会将静态网页部署到 GitHub Pages。首次部署需在仓库 **Settings → Pages → Build and deployment → Source** 选择 **GitHub Actions**。

网页使用相对路径引用本地 CSS、JavaScript 和照片，可在 GitHub Pages 的项目子路径下运行。地图底图由 OpenStreetMap 提供，需要联网。

## 本地查看

直接用浏览器打开 `docs/index.html` 即可查看页面；地图底图需要联网。

## 资料与照片

网页底部链接到 NOAA、NPS、ODOT 等规划资料；景点图片区逐张标注照片作者、来源和许可。照片摄于往年，不代表 2026 年圣诞周的实际天气。

## 更新记录

- 2026-10-26：创建七日中文旅行网页；核对路程、景点冬季限制及 Silverton Christmas Market 场次。
- 2026-10-26：修复地图图块越界，增加冬季实景照片及署名。
- 2026-10-26：将静态网站整理到 `docs/`，准备迁移至个人 GitHub 仓库并由 GitHub Pages 部署。
- 2026-10-26：补齐原计划 Day 1–10、逐站冬季首图与轮播，并增加推荐程度、天气和建议停留时间。
