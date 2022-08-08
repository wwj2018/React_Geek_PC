import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import AuthRoute from 'components/AuthRoute'
import Home from 'pages/Layout'
import Login from 'pages/Login'

function App() {
  return (
    <Router>
      <div className="App">
        {/* <Link to="/login">登陆</Link>
        <Link to="/home">首页</Link> */}

        {/* 配置路由的规则 */}
        <Switch>
          <Route path="/home" component={Home}></Route>
          <AuthRoute path="/login" component={Login}></AuthRoute>
          {/* 1.Route组件，可以不使用component，使用render属性 */}
        </Switch>
      </div>
    </Router>
  )
}

export default App
