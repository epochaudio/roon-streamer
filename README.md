# Roon Connect 流媒体播放器

![Roon Ready](https://roonlabs.com/images/logo-roon-partner-ready-black.png)

## 简介

Roon Connect 流媒体播放器是一个专业的 Roon 扩展应用，让您能够在 Roon 音频系统中轻松播放在线流媒体内容。

### 主要功能

- 🎵 支持在线流媒体播放
- 🌐 自定义流媒体链接支持
- 📻 内置精选中文电台
- 🎨 优雅的用户界面
- 🔄 无缝集成 Roon

### 内置电台

精选长三角地区高品质电台：

- 上海 FM101.7 经典音乐广播
- 江苏音乐广播
- 苏州音乐广播

## 系统要求

- Docker 环境
- Roon Core (版本 1.8 或更高)
- 网络连接

## 安装指南

### 方式一：使用 Docker Compose（推荐）

```bash
# 克隆仓库
git clone https://github.com/your-repo/roon-streamer.git
cd roon-streamer

# 启动服务
docker-compose up -d
```

### 方式二：使用 Docker 手动构建

```bash
# 构建镜像
docker build -t roon-connect .

# 运行容器
docker run -d \
  --network host \
  --name roon-streamer \
  roon-connect
```

###  方法三：
```
docker run -d \
  --name roon-streamer \
  --network host \
  -e PORT=3012 \
  --restart unless-stopped \
  epochaudio/roon-streamer:latest
```


## 配置说明

### Roon 设置

1. 启动 Roon Core
2. 导航至：设置 > 扩展
3. 找到并启用 "Epoch Audio Connect Stream"
4. 点击设置图标，配置音频输出设备
5. 确保 Roon 底部控制栏已选择正确的输出设备

### 使用方法

#### Web 界面

访问 `http://localhost:3012` 使用 Web 界面：

- 选择预设电台
- 输入自定义流媒体链接
- 控制播放和音量

#### 命令行界面

也可以通过命令行控制：

```bash
# 播放流媒体
curl -X POST http://localhost:3012/play \
  -H "Content-Type: application/json" \
  -d '{"url":"http://your-stream-url","stationName":"电台名称"}'

# 停止播放
curl -X POST http://localhost:3012/stop
```

## 故障排除

1. 确保 Roon Core 正在运行且可访问
2. 检查网络连接是否正常
3. 验证端口 3012 是否被占用
4. 查看 Docker 日志：`docker logs roon-streamer`

## 技术支持

- 官方网站：http://www.epochaudio.cn
- 邮件支持：sales@epochaudio.cn

## 许可证

本项目采用 Apache 2.0 许可证。详情请参阅 [LICENSE](LICENSE) 文件。

---
由[门耳朵制作](http://www.epochaudio.cn)开发和维护
  






![image](https://github.com/user-attachments/assets/7bab78a9-c402-4908-9a59-64b1fc1ecb9a)


![image](https://github.com/user-attachments/assets/40b62a11-49de-4450-afde-4335bece5925)

  
