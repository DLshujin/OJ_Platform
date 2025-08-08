<h2>说明</h2>

医生在书写药品名的时候经常不注意大小写，格式比较混乱。现要求你写一个程序将医生书写混乱的药品名整理成统一规范的格式，即药品名的第一个字符如果是字母要大写，其他字母小写。如将"<code>ASPIRIN</code>"、"<code>aspirin</code>"整理成"<code>Aspirin</code>"。
<h2>输入格式</h2>

第一行一个数字 $n$，表示有 $n$ 个药品名要整理，$n$不超过$100$。<br>接下来 $n$ 行，每行一个单词，长度不超过 $20$，表示医生手书的药品名。药品名由字母、数字和-组成。

<h2>输出格式</h2>

$n$ 行，每行一个单词，对应输入的药品名的规范写法。

<h2>样例</h2>
<pre><code class="language-input1">4
AspiRin
cisapride
2-PENICILLIN
Cefradine-6</code></pre><pre><code class="language-output1">Aspirin
Cisapride
2-penicillin
Cefradine-6</code></pre>
