import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import { hasToken } from 'utils/storage'
import { Redirect } from 'react-router-dom'


export default class AuthRoute extends Component {
  render() {
    //接收到的component属性改成用render进行渲染
    //...rest： 解构的剩余参数
    const { component: Component, ...rest } = this.props
    // console.log(this.props)
    // console.log(Component)
    // console.log(rest)
    console.log(hasToken())
    return (
      <Route
        {...rest}
        render={(props) => {
          // if (hasToken()) {
            //有token，可以登陆
            return <Component {...props}></Component>
          // } else {
          //   //如果没有token，返回登陆界面，渲染Redirect组件
          //   //这里有BUG！！！！！！！！！
          //   return (
          //     <Redirect
          //       to={{
          //         pathname: '/login',
          //         state: { from: props.location.pathname },
          //       }}
          //     ></Redirect>
          //   )
          //   // return <Navigate to="/login" />
          // }
        }}
      ></Route>
    )
  }
}
