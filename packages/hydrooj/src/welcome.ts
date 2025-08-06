import DomainModel from './model/domain';
import ProblemModel from './model/problem';
import RecordModel from './model/record';

const bulletin = `\
### 🎉 欢迎来到编译未来在线判题系统！

恭喜您，编译未来OJ系统已经成功部署并正常运行！  
这是一个专为信息学奥林匹克竞赛训练而设计的专业平台。

### 📋 系统管理员快速配置指南

**第一步：管理员账户设置**
- 在右上角注册一个管理员账号
- 回到终端，执行 \`node packages/hydrooj/bin/hydrooj.js cli user setSuperAdmin 2\` 设置超级管理员
- 使用 \`pm2 restart hydro-main\` 重启主服务使配置生效

**第二步：系统基础配置**
- 登录管理员账户，前往 [控制面板 -> 系统设置](/manage/setting) 进行系统配置
- 在 [管理域 -> 编辑域资料](/domain/edit) 页面配置机构信息
- 前往 "题库" 面板检查示例题目是否正常工作

**第三步：题库建设**
- 系统已预装 YBT 一本通题库，涵盖基础算法训练
- 可根据教学需要导入更多竞赛题目
- 建议创建不同难度等级的练习集供学生使用

### 🎯 编译未来教学特色

- **🎮 GOC图形化编程**：零基础入门，培养编程思维
- **⚡ C++竞赛编程**：系统化算法训练，覆盖NOIP/CSP考点
- **💻 在线实时判题**：即时反馈，高效学习
- **📊 数据统计分析**：学生学习进度一目了然

### 🚀 下一步建议

1. **用户管理**：为学生批量创建账户，分组管理
2. **比赛设置**：定期举办校内编程竞赛，激发学习兴趣
3. **作业布置**：使用作业系统布置练习任务
4. **成绩追踪**：关注学生解题进度和薄弱环节

### 📞 技术支持

如有任何技术问题或教学建议，请联系编译未来技术团队。  
让我们一起为学生创造最佳的编程学习体验！

---

*编译未来 - 让每一行代码都闪闪发光 ✨*
`;

const defaultProblem = JSON.stringify({
    en: `\
This is the example A+B problem.
If you didn't see 'No testdata at current' message, it means file storage is working properly.

Just write a program that reads two integers from standard input, and prints their sum to standard output.
Feel free to delete this problem in 'Edit' panel if you don't need this.

Click 'Enter Online Programming Mode' to open the built-in Hydro IDE.
`,
    zh: `\
这是一道简单的 A+B 题目。
如果您没有看到“当前没有测试数据”的消息，说明文件存储功能正常运行。

编写一个程序，从标准输入读取两个整数，并将它们的和输出到标准输出。
如果您不需要这道题目，可以在右侧“编辑”面板中删除它。

点击右侧 “进入在线编程模式” 打开内置的 Hydro IDE。
`,
});

const testdatas = {
    'config.yaml': 'time: 1s\nmemory: 64m\n',
    '1.in': '1 2\n',
    '1.out': '3\n',
    '2.in': '1 1\n',
    '2.out': '2\n',
};

const std = `\
// 这是由 Hydro 自动提交的测试代码，用于测试系统是否正常运行。
// 如果这个提交返回了 Accepted ，则说明一切正常。
// This is a submission by Hydro system, used to test if judge is working properly.
// If this submission returns 'Accepted', it means everything is fine.

#include<iostream>
using namespace std;
int main() {
  int a, b;
  cin >> a >> b;
  cout << a + b << endl;
  return 0;
}
`;

export default async function apply() {
    if (process.env.CI) return;
    await DomainModel.edit('system', { bulletin });
    const docId = await ProblemModel.add('system', 'P1000', 'A+B Problem', defaultProblem, 1, ['系统测试']);
    // This might fail so we are doing it asynchronously.
    Promise.all(
        Object.keys(testdatas).map(
            (i) => ProblemModel.addTestdata('system', docId, i, Buffer.from(testdatas[i])),
        ),
    ).then(() => RecordModel.add('system', docId, 1, 'cc', std, true));
}
