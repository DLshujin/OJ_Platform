<h2>说明</h2>

输入 $4$ 行全部由大写字母组成的文本，输出一个垂直直方图，给出每个字符出现的次数。注意：只用输出字符的出现次数，不用输出空白字符，数字或者标点符号的输出次数。
<h2>输入格式</h2>

输入包括$4$行由大写字母组成的文本，每行上字符的数目不超过$80$个。

<h2>输出格式</h2>

输出包括若干行。其中最后一行给出 $26$ 个大写英文字母，这些字母之间用一个空格隔开。前面的几行包括空格和星号，每个字母出现几次，就在这个字母的上方输出一个星号。注意：输出的第一行不能是空行。

<h2>样例</h2>
<pre><code class="language-input1">THE QUICK BROWN FOX JUMPED OVER THE LAZY DOG.
THIS IS AN EXAMPLE TO TEST FOR YOUR
HISTOGRAM PROGRAM.
HELLO!</code></pre><pre><code class="language-output1">*
*
*                   *
*                   *     *   *
*                   *     *   *
*       *     *             *     *   *
*       *     * *     * *   *     * * *
*       *   * * *     * *   * *   * * * *
*     * * * * * *     * * * * *   * * * *     * *
* * * * * * * * * * * * * * * * * * * * * * * * * *
A B C D E F G H I J K L M N O P Q R S T U V W X Y Z</code></pre>
