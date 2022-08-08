import request from 'utils/request'

/**
 * 登陆请求，用于用户登陆
 * @param {string} mobile    手机号 string类型
 * @param {string} code      验证码 string类型
 * @returns
 */
export const login = (mobile, code) => {
  return request({
    method: 'POST',
    url: '/authorizations',
    data: {
      mobile,
      code,
    },
  })
}

/**
 * 获取用户信息
 * @returns
 */
export const getUserProfile = () => {
  return request({
    method: 'get',
    url: '/user/profile',
  })
}
