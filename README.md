# 荣格心理学体系网站

这是一个用于展示卡尔·古斯塔夫·荣格及其心理学体系的静态网站。网站以人物线和理论线为核心，将荣格、其直接学生、后荣格学派的重要作者，以及分析心理学的关键概念组织成一个可交互的视觉网络。

项目适合部署到 GitHub Pages，也可以在本地用 Vite 开发服务器运行。

## 功能特色

- 人物线：按照与荣格产生联系的时间和代际展开，覆盖 Jung、Jung+1、Jung+2、Jung+3 的代表人物。
- 理论线：展示分析心理学、集体无意识、原型、阴影、人格面具、阿尼玛/阿尼姆斯、个体化和积极想象等核心概念。
- 交互式网络图：点击气泡可以切换详情页。
- 人物档案：包含国籍/身份、关联时间、主要生活与工作地点、生平、贡献、时间线、主要著作和影响。
- 书籍资源：为相关著作添加封面，并提供豆瓣、Goodreads、読書メーター等书籍评论网站链接。
- 多语言字段：内容数据支持中文、英文和日文。
- GitHub Pages 自动部署：推送到 GitHub 后可通过 GitHub Actions 自动构建并发布。

## 技术栈

- Vite
- React
- TypeScript
- D3
- Lucide React
- GitHub Actions

## 本地运行

```powershell
cd D:\ProjectsJoe\jung_carl_gustav
pnpm install
pnpm dev
```

默认开发地址：

```text
http://127.0.0.1:5173/
```

## 构建

```powershell
pnpm build
```

构建产物会生成到：

```text
dist/
```

## 部署到 GitHub Pages

本仓库已经包含 GitHub Pages 部署 workflow：

```text
.github/workflows/deploy.yml
```

部署步骤：

1. 将本地改动提交到 git。
2. 推送到 GitHub 的 `main` 或 `master` 分支。
3. 打开 GitHub 仓库的 `Settings -> Pages`。
4. 在 `Build and deployment` 中将 `Source` 设置为 `GitHub Actions`。
5. 等待 `Actions` 页面中的 `Deploy to GitHub Pages` workflow 完成。

部署成功后，网站通常会出现在：

```text
https://elliott828.github.io/jung_carl_gustav/
```

## 内容维护

主要内容数据集中在：

```text
src/content.ts
```

新增人物或理论节点时，建议至少补充：

- 清晰的中英日标题和简介。
- 与荣格体系的关系。
- 时间线。
- 生平与贡献分区。
- 主要著作与可追溯链接。
- 至少一个可靠来源，例如机构页面、出版社页面、学术资料或百科资料。

## 版权与来源说明

网站中的人物照片、书籍封面和外部资料链接应优先使用可公开访问、来源清晰的资源。若没有可靠的可嵌入人物照片，页面会使用视觉占位图，避免误用图片。

