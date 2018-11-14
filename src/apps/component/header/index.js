import React, {Component} from 'react';
import {Layout} from 'antd';
import logo from '../../../images/logo.png';
import {Link} from 'react-router-dom';
const {Header} = Layout;

class Headers extends Component {

  render() {
    return (
      <Header id="header">
        <div id="logo">
          <Link to="/">
            <img src={logo}/>
          </Link>
          <h1>网约车管理后台</h1>
        </div>

      </Header>
    )
  }
}

export default Headers;