import React,{Component} from 'react';
import logoImg from './phone.jpg';
import './login.css';
//logo

class Register extends Component {
  constructor(){
    super();
  }
  render(){
    return (
      <div>
        <div className="logo-container">
          <img src={logoImg} alt="数据星空科技有限公司"/>
        </div>
      </div>
    )
  }
}
export default Register;