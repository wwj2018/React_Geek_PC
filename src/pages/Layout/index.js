import React, { Component } from 'react'
import styles from './index.module.scss'
import { Layout, Menu, message, Popconfirm } from 'antd'
import { Switch, Route, Link } from 'react-router-dom'
import {
  LogoutOutlined,
  HomeOutlined,
  HddOutlined,
  EditOutlined,
} from '@ant-design/icons'
import Home from 'pages/Home'
import ArticleList from 'pages/ArticleList'
import ArticlePublish from 'pages/ArticlePublish'
import { removeToken } from 'utils/storage'

const { Header, Content, Sider } = Layout

const text = '您确定要退出吗？'

export default class LayoutComponent extends Component {
  render() {
    return (
      <div className={styles.layout}>
        <Layout>
          <Header className="header">
            <div className="logo" />
            <div className="profile">
              <span>用户名</span>
              <span>
                <Popconfirm
                  placement="topRight"
                  title={text}
                  okText="确定"
                  cancelText="取消"
                  onConfirm={this.onConfirm}
                >
                  <LogoutOutlined /> 退出
                </Popconfirm>
              </span>
            </div>
          </Header>
          <Layout>
            <Sider width={200}>
              <Menu
                theme="dark"
                mode="inline"
                defaultSelectedKeys={['1']}
                items={[
                  {
                    key: '1',
                    icon: <HomeOutlined />,
                    label: <Link to="/home">数据概览</Link>,
                  },
                  {
                    key: '2',
                    icon: <HddOutlined />,
                    label: <Link to="/home/list">内容管理</Link>,
                  },
                  {
                    key: '3',
                    icon: <EditOutlined />,
                    label: <Link to="/home/publish">发布文章</Link>,
                  },
                ]}
              />
            </Sider>
            <Layout
              style={{
                padding: '24px',
              }}
            >
              <Content
                className="site-layout-background"
                style={{
                  padding: 24,
                  margin: 0,
                  minHeight: 280,
                }}
              >
                <Switch>
                  <Route exact path="/home" component={Home}></Route>
                  <Route path="/home/list" component={ArticleList}></Route>
                  <Route
                    path="/home/publish"
                    component={ArticlePublish}
                  ></Route>
                </Switch>
              </Content>
            </Layout>
          </Layout>
        </Layout>
      </div>
    )
  }

  onConfirm = () => {
    // console.log('点击了确定按钮')
    //1. 移除token
    // localStorage.removeItem('token')
    removeToken()
    //2. 跳转到登录页
    this.props.history.push('/login')
    //3. 提示消息
    message.success('退出成功')
  }
}
