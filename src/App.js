import React, { Component } from 'react';
import 'antd-mobile/dist/antd-mobile.css';
import './App.css';
import {HashRouter, Route, Link} from 'react-router-dom';
//引入组件
import Login from './container/login/login';
import Register from './container/register/Register';
import AuthRoute from './container/authRoute/authRoute';
import CreateBar from './container/createBar/CreateBar';

class App extends Component {
  constructor () {
    super();
    this.state = {};
  }

  render () {
    return (
      <HashRouter>
        <div className="App">
          <ul style={{display: 'flex', flexDirection: 'row', width: 400, margin: '0 auto', listStyle: 'none'}}>
            <li style={{width: 100}}><Link to='/'>page1</Link></li>
            <li style={{width: 100}}><Link to='/register'>page2</Link></li>
            <li style={{width: 100}}><Link to='/authRoute'>page3</Link></li>
            <li style={{width: 100}}><Link to='/createBar'>page4</Link></li>
          </ul>
          <div>
            {/*exact 严格匹配*/}
            <Route exact path='/' component={Login}></Route>
            <Route path='/register' component={Register}></Route>
            <Route path='/authRoute' component={AuthRoute}></Route>
            <Route path='/createBar' component={CreateBar}></Route>
          </div>
        </div>
      </HashRouter>
    );
  }
}

export default App;
