<h2>说明</h2>
fish-finder 是一个能够帮助垂钓者找到鱼的神奇装置。它根据某个物体连续的四个深度来判断这个物体是不是一条鱼。我们的目的是实现一个 fish-finder，具体要求如下：<br />
如果连续的四个深度是严格递增的，fish-finder 发出"<code>Fish Rising</code>"的警报。<br />
如果连续的四个深度是严格递减的，Fish-finder 发出"<code>Fish Diving</code>"的警报。<br />
如果连续的四个深度是相同的，fish-finder 发出"<code>Fish At Constant Depth</code>"警报。<br />
如果都不是，Fish-finder 发出"<code>No Fish</code>"提示。
<h2>输入格式</h2>
一行四个整数 $a$,$b$,$c$,$d$ ($1 \le a,b,c,d \le 100$)，表示四个深度的大小。
<h2>输出格式</h2>
输出一个字符串，表示一种提示语。
<h2>样例</h2>
<pre><code class="language-input1">3 4 9 11</code></pre><pre><code class="language-output1">Fish Rising</code></pre>
