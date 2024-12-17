import express from 'express';
import * as re from './lib.mjs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// 初始化Roon
const roon = re.init({
    extensionOptions: {
        extension_id:        'com.EpochAudio.connect_stream',
        display_name:        'Epoch Audio Connect Stream',
        display_version:     "1.0.1",
        publisher:           '门耳朵制作',
        email:              'sales@epochaudio.cn',
        website:            'http://www.epochaudio.cn',
    },
});

// 播放流媒体
app.post('/play', (req, res) => {
    try {
        const { url } = req.body;
        if (!url) {
            return res.status(400).json({ error: '缺少URL参数' });
        }

        re.play({
            url: url,
            name: "My Brand",
            line1: "来自门耳朵的中文在线广播",
            icon: "/image/qrcode_for_gh_75032b7b381b_344-300x300.jpg",
        });

        res.json({ success: true });
    } catch (error) {
        console.error('播放错误:', error);
        res.status(500).json({ error: '播放失败' });
    }
});

// 停止播放
app.post('/stop', (req, res) => {
    try {
        re.stop();
        res.json({ success: true });
    } catch (error) {
        console.error('停止播放错误:', error);
        res.status(500).json({ error: '停止播放失败' });
    }
});

// 调整音量（增加/减小）
app.post('/volume/:direction', (req, res) => {
    try {
        const { direction } = req.params;
        const step = 1; // 默认步进值

        if (direction === 'up') {
            roon.core.services.RoonApiTransport.change_volume(roon.current_output_id, 'relative_step', step);
        } else if (direction === 'down') {
            roon.core.services.RoonApiTransport.change_volume(roon.current_output_id, 'relative_step', -step);
        } else {
            return res.status(400).json({ error: '无效的方向参数' });
        }

        res.json({ success: true });
    } catch (error) {
        console.error('音量调整错误:', error);
        res.status(500).json({ error: '音量调整失败' });
    }
});

// 设置具体音量值
app.post('/volume', (req, res) => {
    try {
        const { volume } = req.body;
        if (volume === undefined || isNaN(volume)) {
            return res.status(400).json({ error: '无效的音量值' });
        }

        roon.core.services.RoonApiTransport.change_volume(roon.current_output_id, 'absolute', volume);
        res.json({ success: true });
    } catch (error) {
        console.error('音量设置错误:', error);
        res.status(500).json({ error: '音量设置失败' });
    }
});

// 启动服务器
const PORT = process.env.PORT || 3012;
app.listen(PORT, () => {
    console.log(`服务器运行在 http://localhost:${PORT}`);
}); 