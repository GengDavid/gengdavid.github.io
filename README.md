# Gengwei Zhang · Academic homepage

面向 GitHub Pages 的自定义 Jekyll 学术主页。使用本地 CSS、原生 JavaScript 和系统字体，无远程主题、Node 构建步骤或运行时内容请求。

预览：[桌面完整页面](docs/previews/desktop.png) · [手机首屏](docs/previews/mobile-first-screen.png) · [手机完整页面](docs/previews/mobile.png)。构建与浏览器验证记录见 [docs/verification.md](docs/verification.md)。

## 内容维护

| 文件 | 用途 |
| --- | --- |
| `_data/profile.yml` | 姓名、职位、机构、邮箱、学术账号、简介、主要研究方向卡片和研究兴趣 |
| `_data/news.yml` | 新闻，按时间从新到旧排列；前 4 条默认展示，其余可展开 |
| `_data/publications.yml` | 论文、作者、会议、年份、研究类别及论文 / 代码链接 |
| `index.html` | 首页结构、研究方向卡片模板和论文筛选按钮 |
| `_layouts/default.html` | 页面框架、导航、页脚、SEO 元信息 |
| `_includes/` | 图标和研究方向示意图 |
| `assets/css/main.css` | 配色、排版、响应式和打印样式 |
| `assets/js/main.js` | 论文主题筛选和导航当前位置提示 |
| `_config.yml` | 站点地址、描述及可选 Analytics 设置 |
| `zgw_pic.png` | 原始个人照片 |
| `docs/original-homepage.md` | 重构前 `index.md` 的完整备份，不会发布到站点 |

论文按年份倒序展示。新增论文可复制以下格式：

```yaml
- id: short-unique-id
  title: 'Full paper title'
  authors:
    - Gengwei Zhang*
    - Another Author*
  venue: ICCV
  venue_full: International Conference on Computer Vision
  year: 2027
  category: continual
  topics:
    - Continual Learning
    - Image Classification
  links:
    - label: Paper
      url: https://example.org/paper
    - label: Code
      url: https://github.com/example/project
```

上方只是格式示例。`id` 必须唯一；`category` 使用 `reasoning`、`generation`、`continual`、`few-shot`、`automl` 或 `graph`；作者名字后的 `*` 表示共同贡献，姓名与 `profile.yml` 中的 `name` 相同的作者会自动加粗。`links: []` 可表示暂时没有资源链接。增加新类别时同步更新 `index.html` 中的筛选按钮。

主要研究方向由 `profile.yml` 的 `research_directions` 控制，其 `id` 与论文类别对应。当前突出 Multimodal Reasoning、Visual Generation 和 Continual Learning；AutoML、Few-shot Learning 和 Graph Reasoning 保留为既有论文分类。研究方向与近期代表作依据 Google Scholar 和论文原始页面更新，来源见 [研究方向核对记录](docs/research-update.md)。

新闻日期使用带引号的 `YYYY.MM` 字符串；`text` 和简介段落支持 HTML 链接。现有内容来自旧主页；新增的论文入口已核对对应标题。首页示意图是研究主题的装饰性概念图，不是论文实验结果。

## 本地预览

需要 Ruby 和 Bundler。Jekyll 固定为 GitHub Pages 当前使用的 [3.10.0](https://pages.github.com/versions/)。

```bash
bundle config set --local path vendor/bundle
bundle install
bundle exec jekyll serve --host 127.0.0.1
```

打开 `http://127.0.0.1:4000`。仅构建时使用：

```bash
bundle exec jekyll build --strict_front_matter
```

## 发布

保持仓库现有 GitHub Pages 的分支部署方式即可，源目录使用仓库根目录 `/`。推送代码后由 GitHub Pages 构建 Jekyll；不需要额外的自定义 Actions 工作流。`_site/`、`vendor/` 等本地产物不应提交。

`url` 默认为 `https://gengdavid.github.io`，个人主页的 `baseurl` 为空。如果以后部署到项目子路径，设置对应 `baseurl`，本站本地资源链接会随之调整。

旧配置中的 Analytics 值 `300161146` 不是 GA4 的 `G-…` Measurement ID，因此当前未启用统计。需要时将确认过的 Measurement ID 填入 `_config.yml` 的 `google_analytics`。

## 交互与兼容性

- 桌面为双栏简介和双列论文卡片；手机自动收为单列。
- 论文内容由 Jekyll 直接生成，无 JavaScript 时仍完整可读；筛选控件仅在脚本初始化后出现。
- 历史新闻使用原生 `details`，无需 JavaScript。
- 提供键盘焦点样式、跳过导航链接、筛选状态播报和减少动画偏好支持。
- 打印时显示所有论文，包括此前被筛选隐藏的条目。
