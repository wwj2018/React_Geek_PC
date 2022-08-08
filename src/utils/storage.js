//用于封装所有的localStorage的操作
const TOKEN_KEY = 'token-geek-pc'
/**
 * 保存token
 * @param {*} token
 * @returns
 */
export const setToken = (token) => localStorage.setItem(TOKEN_KEY, token)

/**
 * 获取Token
 * @returns
 */
export const getToken = () => localStorage.getItem(TOKEN_KEY)

/**
 *
 * @returns 移除Token
 */
export const removeToken = () => localStorage.removeItem(TOKEN_KEY)

/**
 * 判断是否有Token
 * @returns
 */
export const hasToken = () => !!getToken()
