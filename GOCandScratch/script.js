;(function () {
  function buildUrlFromSearch() {
    var base = 'http://47.99.149.106:10086/static/gocWebNet/gocWebNet.html';
    var params = new URLSearchParams(window.location.search);
    if (!params.has('submitBt')) params.set('submitBt', '0');
    if (!params.has('insert')) params.set('insert', '0');
    if (!params.has('ra')) params.set('ra', '60');
    // 每次打开都是“本地窗口”：生成一个带时间戳的 winName，避免复用旧会话
    params.set('winName', 'local_' + Date.now());
    return base + '?' + params.toString();
  }

  function buildBlankInitUrl() {
    var base = 'http://47.99.149.106:10086/static/gocWebNet/gocWebNet.html';
    // 使用一个新的随机窗口名，避免继承旧状态；保持按钮默认关闭
    var params = new URLSearchParams({
      submitBt: '0',
      insert: '0',
      ra: '60',
      winName: 'init_' + Date.now()
    });
    return base + '?' + params.toString();
  }

  document.addEventListener('DOMContentLoaded', function () {
    var iframe = document.getElementById('appIframe');
    var url = buildUrlFromSearch();
    iframe.src = url;
    // 同步“新窗口”按钮
    var openNewTab = document.getElementById('openNewTab');
    if (openNewTab) openNewTab.href = url;

    // 监听加载完成后，触发一次尺寸“轻推”，促使内部布局计算
    iframe.addEventListener('load', function () {
      try {
        // 尝试通过改变 iframe 的高度 1px 再恢复来触发重排
        var h = iframe.style.height || window.getComputedStyle(iframe).height;
        iframe.style.height = 'calc(100vh - 1px)';
        // 下一帧恢复
        requestAnimationFrame(function () {
          iframe.style.height = h || '100vh';
        });
      } catch (e) {
        // 忽略跨域导致的访问限制
      }
    });

    // 窗口尺寸变化时也做一次轻推
    window.addEventListener('resize', function () {
      var h = iframe.style.height || window.getComputedStyle(iframe).height;
      iframe.style.height = 'calc(100vh - 1px)';
      requestAnimationFrame(function () {
        iframe.style.height = h || '100vh';
      });
    });

    // 初始化按钮：加载一个全新会话（仅含空白模板）
    var initBtn = document.getElementById('initBtn');
    if (initBtn) {
      initBtn.addEventListener('click', function () {
        var initUrl = buildBlankInitUrl();
        iframe.src = initUrl;
        if (openNewTab) openNewTab.href = initUrl;
      });
    }
  });
})();


