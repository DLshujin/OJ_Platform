// Simple in-browser IDE for Python (pyodide) and C++ (Judge0)
(function () {
  const el = (id) => document.getElementById(id);
  const statusEl = document.getElementById('status');
  const outputEl = document.getElementById('output');
  const stdinEl = document.getElementById('stdin');

  // Ace editor setup
  const editor = ace.edit('editor', {
    mode: 'ace/mode/python',
    theme: 'ace/theme/monokai',
    fontSize: 14,
    tabSize: 2,
    useSoftTabs: true,
    enableBasicAutocompletion: true,
    enableSnippets: true,
    enableLiveAutocompletion: true,
  });
  editor.setValue(
    '# Python 示例\nprint("Hello, World!")\n',
    -1
  );

  // Tabs
  let currentLang = 'python';
  const tabs = document.querySelectorAll('.tab');
  tabs.forEach((t) =>
    t.addEventListener('click', () => {
      tabs.forEach((x) => x.classList.remove('active'));
      t.classList.add('active');
      currentLang = t.dataset.lang;
      if (currentLang === 'python') {
        editor.session.setMode('ace/mode/python');
        if (!editor.getValue().trim().startsWith('# Python')) {
          editor.setValue('# Python 示例\nprint("Hello, World!")\n', -1);
        }
      } else {
        editor.session.setMode('ace/mode/c_cpp');
        if (!editor.getValue().includes('int main')) {
          editor.setValue(
            '#include <bits/stdc++.h>\nusing namespace std;\nint main(){\n  ios::sync_with_stdio(false);\n  cin.tie(nullptr);\n  cout << "Hello, World!\\n";\n  return 0;\n}\n',
            -1
          );
        }
      }
    })
  );

  // Pyodide loader
  let pyodideReadyPromise = null;
  function ensurePyodide() {
    if (!pyodideReadyPromise) {
      status('正在加载 Pyodide...');
      pyodideReadyPromise = loadPyodide({ indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.24.1/full/' })
        .then((pyodide) => {
          status('Pyodide 已就绪');
          return pyodide;
        });
    }
    return pyodideReadyPromise;
  }

  function status(msg) {
    statusEl.textContent = msg;
  }
  function appendOutput(text) {
    outputEl.textContent += text;
  }
  function setOutput(text) {
    outputEl.textContent = text;
  }

  // Execute Python with pyodide
  async function runPython() {
    const code = editor.getValue();
    const stdin = stdinEl.value || '';
    const pyodide = await ensurePyodide();
    status('运行 Python...');
    try {
      // Redirect stdin/stdout
      pyodide.setStdout({
        batched: (s) => appendOutput(s),
      });
      pyodide.setStderr({
        batched: (s) => appendOutput(s),
      });
      pyodide.FS.writeFile('input.txt', stdin);
      await pyodide.runPythonAsync(`
import sys
sys.stdin = open('input.txt','r')
` + '\n' + code);
      status('运行完成');
    } catch (e) {
      appendOutput('\n[错误]\n' + e + '\n');
      status('运行出错');
    }
  }

  // Execute C++ using Judge0
  function getJudge0Config() {
    try {
      const url = localStorage.getItem('JUDGE0_URL');
      const headers = localStorage.getItem('JUDGE0_HEADERS');
      if (!url) return null;
      return { url, headers: headers ? JSON.parse(headers) : {} };
    } catch (_) {
      return null;
    }
  }

  async function runCpp() {
    const code = editor.getValue();
    const stdin = stdinEl.value || '';
    setOutput('');

    // 方案 A：使用 Piston 公共实例（无需秘钥）
    try {
      status('提交到 Piston...');
      const pistonResp = await fetch('https://emkc.org/api/v2/piston/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          language: 'cpp',
          // 使用一个常见版本；公共实例会自动匹配最近的版本
          version: '10.2.0',
          files: [{ name: 'main.cpp', content: code }],
          stdin: stdin,
          args: [],
        }),
      });
      if (!pistonResp.ok) throw new Error('HTTP ' + pistonResp.status + ' ' + pistonResp.statusText);
      const data = await pistonResp.json();
      const compileOut = (data.compile && (data.compile.stdout || data.compile.stderr)) || '';
      const runOut = (data.run && ((data.run.stdout || '') + (data.run.stderr || ''))) || '';
      const out = (compileOut + runOut).trim();
      setOutput(out || '[无输出]');
      status('运行完成');
      return;
    } catch (e) {
      // 继续尝试方案 B
      appendOutput('[Piston 失败] ' + e + '\n尝试使用 Judge0...\n');
    }

    // 方案 B：可选 Judge0（需要你在浏览器 localStorage 设置 JUDGE0_URL 与 JUDGE0_HEADERS）
    const judge0 = getJudge0Config();
    if (!judge0) {
      status('运行出错');
      appendOutput('\n未配置 Judge0 服务，且 Piston 不可用。\n' +
        '可在浏览器控制台设置：\n' +
        "localStorage.setItem('JUDGE0_URL', 'https://<your-judge0>/submissions?base64_encoded=false&wait=true');\n" +
        "localStorage.setItem('JUDGE0_HEADERS', '{\\"X-Auth-Token\\":\\"<your-token>\\"}');\n");
      return;
    }

    try {
      status('提交到 Judge0...');
      const body = { source_code: code, language_id: 54, stdin };
      const submit = await fetch(judge0.url, {
        method: 'POST',
        headers: Object.assign({ 'Content-Type': 'application/json' }, judge0.headers || {}),
        body: JSON.stringify(body),
      });
      if (!submit.ok) {
        const text = await submit.text();
        throw new Error('HTTP ' + submit.status + ' ' + submit.statusText + '\n' + text);
      }
      const result = await submit.json();
      const out = (result.stdout || '') + (result.stderr || '') + (result.compile_output || '');
      setOutput(out || '[无输出]');
      status('运行完成');
    } catch (e) {
      setOutput('[Judge0 请求失败] ' + e);
      status('运行出错');
    }
  }

  async function run() {
    setOutput('');
    if (currentLang === 'python') return runPython();
    return runCpp();
  }

  document.getElementById('runBtn').addEventListener('click', run);
  document.getElementById('clearBtn').addEventListener('click', () => setOutput(''));
  // Shortcut
  window.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      run();
    }
  });
})();


