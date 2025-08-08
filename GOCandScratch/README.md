# GOC 青少年编程在线（本地启动页）

本项目提供一个本地可双击打开的启动页：全屏直达 GOC 在线编程环境，并提供一个 Scratch 在线编辑器的便捷入口页。

## 目录结构

- `index.html`：GOC 在线页全屏载入（iframe），自动透传地址栏参数并提供本地会话。
- `script.js`：为 `index.html` 构建目标 URL、处理工具按钮与首次渲染优化。
- `styles.css`：旧的分栏样式（当前简化版页面未使用）。
- `scratch.html`：Scratch 在线编辑器快捷入口页（尝试内嵌 + 自动新标签打开）。
- `scratch.js`：`scratch.html` 的脚本逻辑。
- `ide.html` / `ide.css` / `ide.js`：在线 Python / C++ 代码编辑与运行（浏览器端）。

## 使用说明

### 1) GOC 在线页（index.html）
- 直接双击 `index.html` 即可打开。
- 每次打开/刷新都会生成新的「本地会话」窗口编号：`winName=local_时间戳`，避免复用旧会话状态。
- 页面右上角悬浮工具条：
  - 初始化：以全新会话加载，进入仅含空白模板的环境（只有 `int main(){ return 0; }`）。
  - 新窗口：在浏览器新标签中打开当前会话链接。
- 也可在地址栏追加参数（没有就用默认值）：
  - `submitBt`：是否显示提交按钮（0/1），默认 0
  - `insert`：是否允许插入（0/1），默认 0
  - `ra`：刷新/速度（默认 60）
  - `winName`：窗口编号（若缺省将被覆盖为 `local_时间戳`）

引用的在线资源与命令帮助：
- GOC 在线编程页：`http://47.99.149.106:10086/static/gocWebNet/gocWebNet.html`
- GOC 常见绘图命令说明（V3.8）：参见文档链接 [命令帮助](http://47.99.149.106:10086/static/gocWebNet/help/gocComListHelp.htm)

> 注意：外部资源来自远端服务器，离线环境需要联网才能访问上述在线页面与素材。

### 2) Scratch 在线页（scratch.html）
- 双击 `scratch.html` 打开。
- 页面尝试以 iframe 方式加载 Scratch 官方编辑器：
  - 链接：[Scratch Editor](https://scratch.mit.edu/projects/editor/?tutorial=getStarted)
  - 出于安全策略（X-Frame-Options / CSP），官方站点通常不允许第三方网页内嵌。如果被阻止，页面会自动在浏览器新标签打开，同时页面内也提供显式按钮。

### 3) 在线 IDE（ide.html）
- Python：基于 Pyodide，在浏览器本地运行，无需服务器。
- C++（重要）：
  - 默认优先使用 Piston 公共实例（`https://emkc.org/api/v2/piston/execute`），无需密钥；若该服务在你的网络环境下不可达或受限，将回退至 Judge0（需要你手动配置 Endpoint）。
  - 若看到“HTTP 401/403”等错误，说明公共服务限制或需要授权。请按下文“Judge0 可选配置”设置。

Judge0 可选配置（当你准备好可用的 Judge0 服务时）：
1. 打开 `ide.html`，按 F12 → Console。
2. 执行：
```js
localStorage.setItem('JUDGE0_URL', 'https://<your-judge0>/submissions?base64_encoded=false&wait=true');
// 若需要鉴权，请设置请求头（JSON 字符串）
localStorage.setItem('JUDGE0_HEADERS', '{"X-Auth-Token":"<your-token>"}');
```
3. 刷新页面，再次运行 C++。

说明：
- C++ 语言 ID（Judge0）：54（GCC 9.x 常见配置）。
- 在线沙箱稳定性受网络与配额影响；如需稳定可控，建议自建服务。

## 自定义与二次开发
- 可在 `script.js` 中更改默认参数（如默认 `ra`、是否显示提交按钮等）。
- 若你需要恢复到之前的左右分栏布局，可回退到早期的 `index.html` + `styles.css` 布局，或告诉我期望的布局和交互，我来改造。

## 引用与参考
- GOC 命令帮助：[命令帮助](http://47.99.149.106:10086/static/gocWebNet/help/gocComListHelp.htm)
- Scratch 在线编辑器：[Scratch Editor](https://scratch.mit.edu/projects/editor/?tutorial=getStarted)


