import { observable, computed, action, autorun, when, reaction } from "mobx";


class UserStore{
  @observable price = 0;
  constructor(){
    when( 
      () => this.visible,
      () => console.log('fuck')
    )
  }
  @computed get getPrice(){
    return this.price
  }
  @action.bound
  increment(){
    this.price ++ 
  }
  @computed get visible(){
    return this.price >=8
  }

} 



let UserInfo = new UserStore()
const reaction1 = reaction(
  () => UserInfo.getPrice,
  price => console.log(price)
)
autorun(() => {
  console.log('xixixi',UserInfo.getPrice);
  
})

export default new UserStore()