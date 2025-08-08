<h2>说明</h2>

杨辉三角是如下三角形:
<pre> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 1 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;1 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;1 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;1 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;2 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;1 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;1 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 3 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;3 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;1 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;1 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 4 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;6 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;4 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;1 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
 &nbsp; &nbsp; &nbsp; &nbsp;1 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 5 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;10 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 10 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;5 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 1 &nbsp; &nbsp; &nbsp; &nbsp;
1 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 6 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 15 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 20 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 15 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 6 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;1
……</pre>
<br />
可以发现杨辉三角的每个位置的值是左上角的值加上右上角的值，请输出倒杨辉三角。
<h2>输入格式</h2>

输入一行一个整数 $n$($1≤n≤5$)，表示选择的行数。

<h2>输出格式</h2>

输出 $n$ 行倒的杨辉三角（每一行相邻的数之间用一个空格隔开）。

<h2>样例</h2>
<pre><code class="language-input1">4</code></pre><pre><code class="language-output1">1 3 3 1
1 2 1
1 1
1</code></pre>
