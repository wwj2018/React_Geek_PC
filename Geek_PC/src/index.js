import React from 'react'
import ReactDOM from 'react-dom/client'
//导入antd的全局样式
import 'antd/dist/antd.min.css'
import './index.css'
import App from './App'
import { ConfigProvider } from 'antd'
import 'moment/locale/zh-cn'
import locale from 'antd/es/locale/zh_CN'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <ConfigProvider locale={locale}>
    <App />
  </ConfigProvider>
)
