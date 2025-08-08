<h2>说明</h2>

设计一个最简单的计算器，支持'<code>+</code>'、'<code>-</code>'、'<code>*</code>'、'<code>/</code>'四种运算。<br />
仅需考虑输入输出为整数的情况，数据和运算结果不会超过 int 表示的范围。
<h2>输入格式</h2>

输入只有一行，共有三个参数，其中第 $1$、$2$ 个参数为整数，第 $3$ 个参数为操作符（'<code>+</code>'、'<code>-</code>'、'<code>*</code>'、'<code>/</code>'或其它符号）。

<h2>输出格式</h2>

输出只有一行，一个整数，为运算结果。然而：<br>如果出现除数为 $0$ 的情况，则输出："<code>Divided by zero!</code>"；<br>如果出现无效的操作符(即不为'<code>+</code>'、'<code>-</code>'、'<code>*</code>'、'<code>/</code>'之一），则输出："<code>Invalid operator!</code>"。

<h2>样例</h2>
<pre><code class="language-input1">1 2 +</code></pre><pre><code class="language-output1">3</code></pre>
