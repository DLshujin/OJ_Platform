#!/bin/bash
# 重新创建judge用户的脚本（在您通过网页创建ID=2用户后运行）

echo "重新创建judge用户..."
cd /root/Hydro

# 创建judge用户（这将获得下一个可用ID）
node packages/hydrooj/bin/hydrooj.js cli user create judge@local.host judge judge123456

# 获取新创建的judge用户ID
JUDGE_ID=$(node -e "
const { MongoClient } = require('mongodb');
async function getJudgeId() {
  const client = new MongoClient('mongodb://127.0.0.1:27017');
  await client.connect();
  const db = client.db('hydro');
  const user = await db.collection('user').findOne({uname: 'judge'});
  console.log(user._id);
  await client.close();
}
getJudgeId();
")

echo "Judge用户创建完成，ID为: $JUDGE_ID"

# 设置judge用户权限
node packages/hydrooj/bin/hydrooj.js cli user setPriv $JUDGE_ID 543

echo "Judge用户权限设置完成"
echo "现在可以重启评测服务了："
echo "pm2 restart hydro-judge"