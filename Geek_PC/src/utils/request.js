import { message } from 'antd'
import axios from 'axios'
import { getToken, hasToken, removeToken } from './storage'
import history from './history'

//创建axios实例
const instance = axios.create({
  baseURL: 'http://geek.itheima.net/v1_0/',
  timeout: 5000,
})

// 添加请求拦截器
instance.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    if (hasToken()) {
      config.headers.Authorization = `Bearer ${getToken()}`
    }
    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 添加响应拦截器
instance.interceptors.response.use(
  function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    return response.data
  },
  function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    //对token过期进行统一处理
    if (error.response.status === 401) {
      // 代表token过期
      // 1.删除token
      removeToken()
      // 2.提示消息
      message.warn('登录信息过期', 2)
      // 3.跳转登陆页
      //难点：非组件中，无法使用Redirect，也无法访问到history对象
      // window.location.href = '/login'  可以但是会把之前加载过的资源再次加载，浪费性能
      history.push('/login')
    }
    return Promise.reject(error)
  }
)

export default instance
