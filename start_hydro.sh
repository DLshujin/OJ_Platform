#!/bin/bash

# Hydro 系统启动脚本
# 用于确保所有Hydro服务正常启动

echo "=========================================="
echo "启动 Hydro 编程平台服务..."
echo "=========================================="

# 等待系统完全启动
sleep 10

# 检查PM2是否已运行
if ! pgrep -f "PM2 v" > /dev/null; then
    echo "启动 PM2..."
    pm2 resurrect
else
    echo "PM2 已在运行"
fi

# 等待服务启动
echo "等待服务启动..."
sleep 15

# 检查服务状态
echo "检查服务状态..."
pm2 status

echo "=========================================="
echo "Hydro 编程平台启动完成！"
echo "可访问的服务："
echo "- 主页: http://localhost:2333"
echo "- GoC编程: http://localhost:2333/goc"
echo "- Scratch编程: http://localhost:2333/scratch"
echo "- 在线IDE: http://localhost:2333/ide"
echo "- 题目练习: http://localhost:2333/p"
echo "=========================================="
