(function () {
  var SCRATCH_URL = 'https://scratch.mit.edu/projects/editor/?tutorial=getStarted';

  function tryEmbed() {
    var frame = document.getElementById('scratchFrame');
    frame.src = SCRATCH_URL;

    // 如果站点设置了 X-Frame-Options/SameOrigin，内嵌会失败。我们在 onload 后探测可访问性，
    // 若跨域限制导致访问异常，退化为新标签打开。
    var opened = false;
    frame.addEventListener('load', function () {
      try {
        // 尝试访问同源对象（若跨域会抛错）
        var _ = frame.contentWindow.location.href;
      } catch (e) {
        if (!opened) {
          opened = true;
          window.open(SCRATCH_URL, '_blank', 'noopener');
        }
      }
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('openTab').href = SCRATCH_URL;
    // 优先直接打开新标签，避免内嵌失败：
    window.open(SCRATCH_URL, '_blank', 'noopener');
    // 同时尝试内嵌（供允许嵌入的浏览器/网络环境使用）
    document.getElementById('reloadBtn').addEventListener('click', tryEmbed);
    tryEmbed();
  });
})();


