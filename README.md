# 编译未来 - 专业信息学奥林匹克培训平台

> 基于 Hydro OJ 的定制化在线编程教育平台，专为信息学奥林匹克竞赛培训设计

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/node.js-22%2B-green)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-7.0-green)](https://www.mongodb.com/)
[![Hydro](https://img.shields.io/badge/Based%20on-Hydro%20OJ-blue)](https://github.com/hydro-dev/Hydro)

## 🎯 项目简介

**编译未来**是一个专业的信息学奥林匹克竞赛培训平台，基于开源的 Hydro OJ 系统深度定制开发。平台提供完整的编程教育解决方案，从基础编程入门到高级算法竞赛，为学生提供系统化的学习路径。

### 核心特色

- 🎨 **GoC编程入门** - 江涛老师独创的图形化编程语言，结合C和Go语言特点
- 🧩 **图形化Scratch编程** - 可视化编程环境，培养编程思维
- 💻 **专业在线IDE** - 类Dev-C++的编程环境，支持多语言实时编译
- 🏆 **完整题库系统** - 内置一本通编程启蒙题库，支持在线评测
- ⚡ **智能错误检测** - 实时语法检查，错误行高亮提示
- 🎯 **个性化学习** - 自适应字体大小，优化学习体验

## 🚀 功能特点

### 1. GoC编程环境
- **独创语言设计**：结合C和Go语言特点的教学语言
- **海龟绘图系统**：通过图形输出理解编程逻辑
- **丰富命令集**：绘图、数学、控制函数完整支持
- **完整语法支持**：支持循环、条件判断、函数等结构

### 2. 在线IDE环境
- **多语言支持**：C++、Python、Java、C、JavaScript
- **智能错误检测**：实时语法检查和错误提示
- **错误行高亮**：直观显示代码错误位置
- **字体大小调节**：A+/A-按钮自由调节字体
- **快捷键支持**：Ctrl+R快速运行代码
- **VS Code风格**：专业暗色主题界面

### 3. 图形化编程
- **Scratch集成**：完整的可视化编程环境
- **拖拽式编程**：积木式编程，培养逻辑思维
- **即时预览**：实时查看程序运行效果

### 4. 在线评测系统
- **完整OJ功能**：支持代码提交、编译、评测
- **题库管理**：内置一本通编程启蒙题库
- **多语言评测**：支持C++、Python、Java等主流语言
- **实时反馈**：即时获得评测结果和详细报告

### 5. 用户管理系统
- **权限分级**：管理员、教师、学生多级权限
- **学习进度跟踪**：完整的学习数据统计
- **成绩管理**：支持比赛组织和成绩统计

## 🏗️ 技术架构

### 前端技术栈
- **模板引擎**: Nunjucks
- **样式**: CSS3 + Stylus
- **JavaScript**: ES6+ 原生开发
- **代码编辑器**: Ace Editor
- **UI框架**: 自定义组件库

### 后端技术栈
- **运行环境**: Node.js 22+
- **开发语言**: TypeScript
- **Web框架**: Koa.js
- **数据库**: MongoDB 7.0
- **缓存**: Redis
- **评测沙箱**: Go-Judge

### 部署技术
- **进程管理**: PM2
- **构建工具**: Webpack + Yarn
- **容器化**: Docker (可选)
- **反向代理**: Nginx (推荐)

## 📦 快速开始

### 系统要求
- **操作系统**: Debian 12/11, Ubuntu 22.04
- **CPU**: 最低1核，推荐4核
- **内存**: 最低2GB，推荐8GB
- **存储**: 60-80GB可用空间
- **端口**: 8888(Web), 5050(沙箱), 27017(数据库)

### 一键部署脚本
```bash
# 克隆项目
git clone https://github.com/yourusername/CompileFuture.git
cd CompileFuture

# 运行部署脚本
chmod +x start_hydro.sh
./start_hydro.sh
```

### 手动部署
详细的手动部署指南请参考 [开发文档.md](./开发文档.md)

### Docker部署（推荐）
```bash
# 使用Docker Compose
docker-compose up -d

# 访问应用
http://localhost:8888
```

## 🎨 界面展示

### 首页设计
- 现代化响应式设计
- 清晰的功能导航
- 突出教学特色和优势

### GoC编程环境
- 左侧画布，右侧代码编辑区
- 命令面板和函数库
- 实时图形输出

### 在线IDE
- 专业代码编辑器
- 智能错误提示
- 实时编译结果显示

### 题目练习
- 清晰的题目描述
- 多语言代码提交
- 详细的评测反馈

## 🔧 开发指南

### 环境准备
```bash
# 安装依赖
yarn install

# 开发模式
yarn dev

# 构建项目
yarn build

# 构建UI
yarn build:ui
```

### 目录结构
```
├── packages/
│   ├── hydrooj/           # 核心后端逻辑
│   ├── ui-default/        # 前端UI模板
│   └── hydrojudge/        # 评测引擎
├── GOCandScratch/         # GoC和Scratch环境
├── 开发文档.md             # 完整部署文档
├── start_hydro.sh         # 快速启动脚本
└── README.md              # 项目说明
```

### 主要修改文件
- `packages/ui-default/templates/partials/homepage/welcome.html` - 首页设计
- `packages/ui-default/templates/practice.html` - 在线IDE
- `packages/ui-default/templates/goc_online.html` - GoC编程环境
- `packages/ui-default/templates/scratch_online.html` - Scratch环境
- `packages/hydrooj/src/handler/online_editor.ts` - 路由处理
- `packages/hydrooj/src/model/setting.ts` - 系统配置

### 自定义功能开发
1. **添加新的编程环境**
   - 在 `templates/` 目录创建新模板
   - 在 `handler/` 目录添加路由处理器
   - 更新首页导航链接

2. **扩展语法检查**
   - 修改 `practice.html` 中的 `checkSyntaxErrors` 函数
   - 添加新语言的错误检测规则

3. **自定义主题样式**
   - 编辑 `.styl` 样式文件
   - 运行 `yarn build:ui` 重新构建

## 🎓 教学应用

### 课程设计
1. **基础入门阶段**
   - GoC图形化编程
   - 基本编程概念
   - 算法思维培养

2. **语言学习阶段**
   - C++语法基础
   - 数据结构入门
   - 算法基础训练

3. **竞赛提高阶段**
   - 高级算法学习
   - 竞赛题目训练
   - 模拟比赛环境

### 实际应用场景
- **课堂教学**：教师可以创建题目，学生在线提交
- **课后练习**：学生自主学习，实时获得反馈
- **竞赛训练**：模拟真实比赛环境
- **能力评估**：通过题目完成情况评估学习进度

## 🤝 贡献指南

### 如何贡献
1. Fork 本仓库
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 创建 Pull Request

### 开发规范
- 遵循 TypeScript/JavaScript 编码规范
- 添加适当的注释和文档
- 确保新功能有对应的测试
- 保持代码风格一致

### 问题反馈
- 使用 GitHub Issues 报告Bug
- 详细描述问题复现步骤
- 提供错误日志和系统信息

## 📄 许可证

本项目基于 MIT 许可证开源 - 查看 [LICENSE](LICENSE) 文件了解详情

## 🙏 致谢

- **Hydro OJ Team** - 提供优秀的开源OJ系统基础
- **江涛老师** - GoC编程语言的创始人
- **开源社区** - 各种优秀的开源工具和库
- **所有贡献者** - 为项目改进提供的宝贵建议

## 📞 联系我们

- **项目主页**: https://github.com/yourusername/CompileFuture
- **问题反馈**: https://github.com/yourusername/CompileFuture/issues
- **功能建议**: https://github.com/yourusername/CompileFuture/discussions

## 🔄 更新日志

### v2.0.0 (2025-01-08)
- ✨ 全新的在线IDE环境，支持智能错误检测
- ✨ 字体大小调节功能，优化学习体验
- ✨ 错误行高亮显示，直观展示代码问题
- ✨ GoC和Scratch编程环境集成
- 🔧 优化首页设计，突出教学特色
- 🔧 简化题目练习界面，专注编程实践
- 🐛 修复评测系统稳定性问题
- 📚 完善部署文档和开发指南

### v1.0.0 (2024-12-XX)
- 🎉 基于Hydro OJ的基础平台搭建
- 📦 一本通题库导入
- 🔧 基础评测环境配置

---

**让每一行代码都闪闪发光 ✨**

*编译未来 - 专业信息学奥林匹克培训平台*
