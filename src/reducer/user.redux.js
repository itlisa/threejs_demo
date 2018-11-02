import axios from 'axios';
const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
const ERROR_MSG = 'ERROR_MSG';
//reducer
export function user(state,action){
  return state;
}

function errorMsg(msg){

  return ({msg,type:ERROR_MSG})
}
export function register({user,pwd,repeatpwd,type}) {
  if(!user||!pwd||!type){
    return errorMsg("用户名密码必须输入")
  }
  if(pwd!==repeatpwd){
    return errorMsg("密码和确认密码不同")
  }
  return dispatch=>{
    axios.post('/user/register',{user,pwd,type})
      .then(res=>{
        if(res.status&&res.data.code){
          dispatch(REGISTER_SUCCESS({user,pwd,type}))
        }else{
          return errorMsg(res.data.msg)
        }
      })
  };

}