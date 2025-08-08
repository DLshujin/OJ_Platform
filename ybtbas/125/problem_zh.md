<h2>说明</h2>

邮局对邮寄包裹有如下规定：若包裹的重量超过 $30$ 千克，不予邮寄，对可以邮寄的包裹每件收手续费 $0.2$ 元，再加上根据下表按重量 $x$ 计算的结果。<br />

<table border="1" bordercolor="#a0c6e5" style="border-collapse:collapse;">
	<tbody>
		<tr>
			<td align="center">
				重量(千克)
			</td>
			<td align="center">
				收费标准(元/公斤)
			</td>
		</tr>
		<tr>
			<td align="center">
				$x≤10$
			</td>
			<td align="center">
				$0.80$
			</td>
		</tr>
		<tr>
			<td align="center">
				$10&lt; x≤20$
			</td>
			<td align="center">
				$0.75$
			</td>
		</tr>
		<tr>
			<td align="center">
				$20&lt; x≤30$
			</td>
			<td align="center">
				$0.70$
			</td>
		</tr>
	</tbody>
</table>
<br />
请你编写一个程序，输入包裹重量，输出所需费用或"<code>Fail</code>"表示无法邮寄。
<h2>输入格式</h2>

输入一个整数 $x$，表示包裹的重量（单位：千克）。($0< x≤100$)

<h2>输出格式</h2>

输出对应的费用（答案保留 $2$ 位小数）或"<code>Fail</code>"表示无法邮寄。

<h2>样例</h2>
<pre><code class="language-input1">7</code></pre><pre><code class="language-output1">5.80</code></pre>

