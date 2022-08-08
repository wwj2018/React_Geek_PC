import React, { Component } from 'react'
import { Button, Checkbox, Form, Input, Card, message } from 'antd'
import styles from './index.module.scss'
import logo from 'assets/logo.png'
import { login } from 'api/user'
import { setToken } from 'utils/storage'

export default class Login extends Component {
  state = {
    loading: false,
  }
  render() {
    return (
      <div className={styles.login}>
        <Card className="login-contaniner">
          <img src={logo} alt="" className="login-logo" />

          {/* 表单 */}
          <Form
            size="large"
            //initialValues默认勾选
            initialValues={{
              remember: false,
              mobile: '13911111111',
              code: '246810',
              agree: true,
            }}
            autoComplete="off"
            onFinish={this.onFinish}
          >
            <Form.Item
              name="mobile"
              validateTrigger={['onChange', 'onBlur']}
              rules={[
                {
                  required: true,
                  message: '手机不能为空',
                },
                {
                  pattern: /^1[3-9]\d{9}$/,
                  message: '手机号码格式不对',
                },
              ]}
            >
              <Input placeholder="请输入你的手机" autoComplete="off" />
            </Form.Item>

            <Form.Item
              name="code"
              validateTrigger={['onChange', 'onBlur']}
              rules={[
                {
                  required: true,
                  message: '验证码不能为空',
                },
              ]}
            >
              {/* autoComplete当鼠标点击后有记录框出来，off表示关闭 */}
              <Input.Password
                placeholder="请输入你的验证码"
                autoComplete="off"
              />
            </Form.Item>

            <Form.Item
              name="agree"
              valuePropName="checked"
              rules={[
                {
                  //自定义校验 validator
                  validator: (rule, value) => {
                    if (value === true) {
                      return Promise.resolve()
                    } else {
                      return Promise.reject(new Error('请阅读并同意条款和协议'))
                    }
                  },
                },
              ]}
            >
              <Checkbox>我已阅读并同意[隐私条款]和[用户协议]</Checkbox>
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                block
                loading={this.state.loading}
              >
                登陆
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    )
  }

  //async 传参做了解构，应该是values
  onFinish = async ({ mobile, code }) => {
    this.setState({
      loading: true,
    })

    // console.log(mobile)
    // console.log(code)
    try {
      const res = await login(mobile, code)
      console.log(res)
      //登陆成功

      //3、提示消息
      // alert('登陆成功')
      message.success('登陆成功', 1, () => {
        //1、保存token
        // localStorage.setItem('token', res.data.token)
        setToken(res.data.token)
        //2、跳转到首页
        //判断location.state中是否有值
        const { state } = this.props.location
        if (state) {
          this.props.history.push(state.from)
        } else {
          this.props.history.push('/home')
        }
      })
    } catch (error) {
      message.error(error.response.data.message, 1, function () {
        this.setState({
          loading: false,
        })
      })
    }
  }
}
