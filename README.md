Roon Connect 流媒体示例
==

这是一个 Roon 扩展应用，主要用途：
- 在 Roon 中收听在线中文广播
- 支持播放自定义流媒体链接
- 内置长三角地区精选高质量电台，包括：
  - 上海 FM101.7 经典音乐广播
  - 江苏音乐广播
  - 浙江音乐广播
  - 苏州音乐广播

## 快速开始指南

### 运行示例

使用 Docker Compose 运行:

```sh
docker-compose up -d
```

或者使用 Docker 直接构建运行:

```sh
docker build -t roon-connect .
docker run -d roon-connect
```

### 连接到 Roon

1. 打开 Roon
2. 在 Roon 中，进入 设置 > 扩展
3. 你应该能看到这个扩展。点击 "Epoch Audio Connect Stream" 旁边的 `启用` 按钮来启用它
4. 点击 `设置` 按钮（在原来 `启用` 按钮的位置），选择你想要此示例进行流媒体传输的音频输出
5. 返回 Roon 主页，确保 Roon 在底部栏中选择了该音频输出。当你开始播放音频时，这将有助于查看状态

### 使用方法

在运行示例的控制台中：

1. 按几次回车键以确保你能看到提示符
2. 你可以输入 `[play http://strm112.1.fm/dubstep_mobile_mp3](https://lhttp.qingting.fm/live/2803/64k.mp3)` 并按回车。开始流媒体传输/缓冲需要几秒钟时间，之后你应该能听到 Roon 播放这个流，并在底部栏看到你的播放状态
  
