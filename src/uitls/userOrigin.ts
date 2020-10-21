import { time } from "console";
import { observable } from "mobx";

type UserOrginTypes = {
  name: string,
  code: number
}
class UserOrigin{
  @observable  name: string;
  @observable token?: string | null; 
  @observable  createdAt?: string;
  @observable  userName: string | null;
  @observable  passWord: string | null;
  @observable  loginStatus: boolean;
  constructor(name:string){
    this.name = name
    this.userName = null
    this.passWord = null
    this.loginStatus = false
    this.setName = this.setName.bind(this)
    this.judegLoginStatus()
  }
  setName:()=>void =()=>{
    this.name = 'ok'
  }
  handleUsername = (e:any) => {
    const username = e.currentTarget.value
    this.userName = username
  }

  handlePassword = (e:any) => {
    const passWord = e.currentTarget.value
    this.passWord = passWord
  }
  login() {
    if(!!this.userName && !!this.passWord){
      console.log('join');
      
      let token = (new Date()).getTime()
      localStorage.setItem("token",token.toString())
      this.judegLoginStatus()
    }else{
      console.log('请填写用户名或者密码')
    }
  }
  quitLogin(){
    localStorage.removeItem('token')
    this.judegLoginStatus()
    this.userName = null
    this.passWord = null
  }
  judegLoginStatus(){
    const token = localStorage.getItem('token')
    console.log(token);
    
    if(token){
      this.loginStatus = true
    }else{
      this.loginStatus = false
    }
  }
  test():UserOrginTypes{
    return {
      name: 'jlg',
      code:123
    }
  }
}





export default new UserOrigin('jlg')