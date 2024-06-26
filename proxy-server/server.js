const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

// Thay đổi URL backend cần proxy
const backendUrl = 'http://157.230.43.225:8080';

// Cấu hình proxy
app.use('/Update-account', createProxyMiddleware({ target: backendUrl, changeOrigin: true }));

// Lắng nghe cổng
const port = process.env.PORT || 5173;
app.listen(port, () => {
  console.log(`Proxy server is running on port ${port}`);
});
