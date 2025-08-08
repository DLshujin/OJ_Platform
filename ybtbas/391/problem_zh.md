<h2>说明</h2>

Julius Caesar 曾经使用过一种很简单的密码。对于明文中的每个字符，将它用它字母表中后 $5$ 位对应的字符来代替，这样就得到了密文。比如字符'$A$'用'$F$'来代替。如下是密文和明文中字符的对应关系。<br />
密文<code>A B C D E F G H I J K L M N O P Q R S T U V W X Y Z</code><br />
明文<code>V W X Y Z A B C D E F G H I J K L M N O P Q R S T U</code><br />
你的任务是对给定的密文进行解密得到明文。<br />
你需要注意的是，密文中出现的字母都是大写字母。密文中也包括非字母的字符（包括空格），对这些字符不用进行解码。
<h2>输入格式</h2>

一行，给出密文，密文不为空，而且其中的字符数不超过 $200$。

<h2>输出格式</h2>

输出一行，即密文对应的明文。

<h2>样例</h2>
<pre><code class="language-input1">NS BFW, JAJSYX TK NRUTWYFSHJ FWJ YMJ WJXZQY TK YWNANFQ HFZXJX</code></pre><pre><code class="language-output1">IN WAR, EVENTS OF IMPORTANCE ARE THE RESULT OF TRIVIAL CAUSES</code></pre>
