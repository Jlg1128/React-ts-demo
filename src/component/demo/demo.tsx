import React, { useEffect, useState } from 'react'
import Layout from '../../layout/layout'

import './demo.scss'
import Food1 from '../demoInside/food1'
import Food2 from '../demoInside/food2'
import Food3 from '../demoInside/food3'
type Props = {

}
const user: User.UserTypes = {name:"jlg",age:12}
const Datas = [
  { desc: '苹果' },
  { desc: '苹果' },
  { desc: '苹果' },
]

const imgsData = [
  { src:'scene1.png'},
  { src:'scene2.png'},
  { src:'scene3.png'},
  { src:'scene4.png'},
  { src:'scene5.png'},
  { src:'scene1.png'},
  { src:'scene2.png'},
  { src:'scene3.png'},
  { src:'scene4.png'},
  { src:'scene5.png'},
  { src:'scene1.png'},
  { src:'scene2.png'},
  { src:'scene3.png'},
  { src:'scene4.png'},
  { src:'scene5.png'},
  { src:'scene1.png'},
  { src:'scene2.png'},
  { src:'scene3.png'},
  { src:'scene4.png'},
  { src:'scene5.png'},
  { src:'scene1.png'},
  { src:'scene2.png'},
  { src:'scene3.png'},
  { src:'scene4.png'},
  { src:'scene5.png'},
  { src:'scene1.png'},
  { src:'scene2.png'},
  { src:'scene3.png'},
  { src:'scene4.png'},
  { src:'scene5.png'},
  { src:'scene1.png'},
  { src:'scene2.png'},
  { src:'scene3.png'},
  { src:'scene4.png'},
  { src:'scene5.png'},
  { src:'scene1.png'},
  { src:'scene2.png'},
  { src:'scene3.png'},
  { src:'scene4.png'},
  { src:'scene5.png'},  { src:'scene1.png'},
  { src:'scene2.png'},
  { src:'scene3.png'},
  { src:'scene4.png'},
  { src:'scene5.png'},
  { src:'scene1.png'},
  { src:'scene2.png'},
  { src:'scene3.png'},
  { src:'scene4.png'},
  { src:'scene5.png'},
  { src:'scene1.png'},
  { src:'scene2.png'},
  { src:'scene3.png'},
  { src:'scene4.png'},
  { src:'scene5.png'},
  { src:'scene1.png'},
  { src:'scene2.png'},
  { src:'scene3.png'},
  { src:'scene4.png'},
  { src:'scene5.png'},  { src:'scene1.png'},
  { src:'scene2.png'},
  { src:'scene3.png'},
  { src:'scene4.png'},
  { src:'scene5.png'},
  { src:'scene1.png'},
  { src:'scene2.png'},
  { src:'scene3.png'},
  { src:'scene4.png'},
  { src:'scene5.png'},
  { src:'scene1.png'},
  { src:'scene2.png'},
  { src:'scene3.png'},
  { src:'scene4.png'},
  { src:'scene5.png'},
  { src:'scene1.png'},
  { src:'scene2.png'},
  { src:'scene3.png'},
  { src:'scene4.png'},
  { src:'scene5.png'},  { src:'scene1.png'},
  { src:'scene2.png'},
  { src:'scene3.png'},
  { src:'scene4.png'},
  { src:'scene5.png'},
  { src:'scene1.png'},
  { src:'scene2.png'},
  { src:'scene3.png'},
  { src:'scene4.png'},
  { src:'scene5.png'},
  { src:'scene1.png'},
  { src:'scene2.png'},
  { src:'scene3.png'},
  { src:'scene4.png'},
  { src:'scene5.png'},
  { src:'scene1.png'},
  { src:'scene2.png'},
  { src:'scene3.png'},
  { src:'scene4.png'},
  { src:'scene5.png'},  { src:'scene1.png'},
  { src:'scene2.png'},
  { src:'scene3.png'},
  { src:'scene4.png'},
  { src:'scene5.png'},
  { src:'scene1.png'},
  { src:'scene2.png'},
  { src:'scene3.png'},
  { src:'scene4.png'},
  { src:'scene5.png'},
  { src:'scene1.png'},
  { src:'scene2.png'},
  { src:'scene3.png'},
  { src:'scene4.png'},
  { src:'scene5.png'},
  { src:'scene1.png'},
  { src:'scene2.png'},
  { src:'scene3.png'},
  { src:'scene4.png'},
  { src:'scene5.png'},  { src:'scene1.png'},
  { src:'scene2.png'},
  { src:'scene3.png'},
  { src:'scene4.png'},
  { src:'scene5.png'},
  { src:'scene1.png'},
  { src:'scene2.png'},
  { src:'scene3.png'},
  { src:'scene4.png'},
  { src:'scene5.png'},
  { src:'scene1.png'},
  { src:'scene2.png'},
  { src:'scene3.png'},
  { src:'scene4.png'},
  { src:'scene5.png'},
  { src:'scene1.png'},
  { src:'scene2.png'},
  { src:'scene3.png'},
  { src:'scene4.png'},
  { src:'scene5.png'},
]

const Demo: React.FC<Props> = () => {
  const [active, setActive] = useState(0)
  const [ifshow, setShow] = useState(false)
  const handleClick = () => {
    setShow(true)
  }
 useEffect(() => {
  //  window.addEventListener('click', (e) => getPosition(e))
   window.addEventListener('mousedown', (e) => getPosition(e))})
  function renderImgs(){
    return imgsData.map((img,index) => {
      let id = `img-${index}`
      lazyLoda(id)
      return (
        <div className='list'>
        <img id={`img-${index}`} data-src={img.src} alt=""/>
      </div>
      )
    })
  }
   function getPosition(e:any){
     console.log(e.clientX);
   }

  function lazyLoda(id:string){
    window.addEventListener('scroll', () => {
      const ele: any = document.getElementById(id)
      const { top, height } = ele.getBoundingClientRect()
      const seenHeight = height/3
      
       if(document.documentElement.clientHeight>=(top+seenHeight)){

         
         ele.src = ele.dataset.src
       }
    })
  }
  useEffect( () => {
    const obj = {name:"jlg"}
    const a = 1
    console.log(!!obj.name);
    if(a===(1||2)){
      console.log(a);
      
    }
  })
  return (
    <Layout >
      <div className='channelContainer'>
        <div className='banner'></div>
        <div className='container'>
          <div className='lists'>
            {Datas.map((item, index) => {
              return (<div className='list' onClick={() => setActive(index)}> {item.desc}</div>)
            })}
          </div>
          {active === 0 ? <Food1 /> : ''}
          {active === 1 ? <Food2 /> : ''}
          {active === 2 ? <Food3 /> : ''}
          <div id ='dropDown' className='dropDown'>
          <button onClick={ () => handleClick() }>点击</button>
            <h1 className={`${ifshow?'h1':''}`}>asjdaksd</h1>
            <h1>asjdaksd</h1>
            <h1>asjdaksd</h1>
            <h1>asjdaksd</h1>
            <h1>asjdaksd</h1>
            <h1>asjdaksd</h1>
            <h1>asjdaksd</h1>
            <h1>asjdaksd</h1>
            <h1>asjdaksd</h1>
            <h1>asjdaksd</h1>
            <h1>asjdaksd</h1>
            <h1>asjdaksd</h1>
            <h1>asjdaksd</h1>
            <h1>asjdaksd</h1>
            <h1>asjdaksd</h1>
            <h1>asjdaksd</h1>
            <h1>asjdaksd</h1>
            <h1>asjdaksd</h1>
            <h1>asjdaksd</h1>
            <h1>asjdaksd</h1>
            <h1>asjdaksd</h1>
            <h1>asjdaksd</h1>
            <h1>asjdaksd</h1>
            <h1>asjdaksd</h1>
            <h1>asjdaksd</h1>
            <h1>asjdaksd</h1>
            <h1>asjdaksd</h1>
            <h1>asjdaksd</h1>
            <h1>asjdaksd</h1>
            <h1>asjdaksd</h1>
            <h1>asjdaksd</h1>
            <h1>asjdaksd</h1>
            <h1 id='final'>OKOKOKOK</h1>
            <h1>asjdaksd</h1>
            <h1>asjdaksd</h1>
            <h1>asjdaksd</h1>
            <h1>asjdaksd</h1>
            <h1>asjdaksd</h1>
            <h1>asjdaksd</h1>
            <h1>asjdaksd</h1>
            <h1>asjdaksd</h1>
            <h1>asjdaksd</h1>
            <h1>asjdaksd</h1>
            <h1>asjdaksd</h1>
            <h1>asjdaksd</h1>
            <h1>asjdaksd</h1>
            <h1>asjdaksd</h1>
            <h1>asjdaksd</h1>
            <h1>asjdaksd</h1>
            <h1>asjdaksd</h1>
            <h1>asjdaksd</h1>
            <h1>asjdaksd</h1>
            <h1>asjdaksd</h1>
            <h1>asjdaksd</h1>
            <h1>asjdaksd</h1>
            <h1>asjdaksd</h1>
            <h1>asjdaksd</h1>
            <h1>asjdaksd</h1>
            <h1>asjdaksd</h1>
            <h1>asjdaksd</h1>
            <h1>asjdaksd</h1>
            <h1>asjdaksd</h1>
            <h1>asjdaksd</h1>
            <h1>asjdaksd</h1>
            <h1>asjdaksd</h1>            <h1>asjdaksd</h1>
            <h1>asjdaksd</h1>
            <h1>asjdaksd</h1>
            <h1>asjdaksd</h1>
            <h1>asjdaksd</h1>
            <h1>asjdaksd</h1>
            <h1>asjdaksd</h1>
            <h1>asjdaksd</h1>
            <h1>asjdaksd</h1>
            <h1>asjdaksd</h1>
            <h1>asjdaksd</h1>
            <h1>asjdaksd</h1>
            <h1>asjdaksd</h1>
            <h1>asjdaksd</h1>
            <h1>asjdaksd</h1>
            <h1>asjdaksd</h1>
            <h1>asjdaksd</h1>
            <h1>asjdaksd</h1>
            <h1>asjdaksd</h1>
            <h1>asjdaksd</h1>
            <h1>asjdaksd</h1>
            <h1>asjdaksd</h1>
            <h1>asjdaksd</h1>
            <h1>asjdaksd</h1>
            <h1>asjdaksd</h1>
            <h1>asjdaksd</h1>
            <h1>asjdaksd</h1>
            <h1>asjdaksd</h1>
            <h1>asjdaksd</h1>
            <h1>asjdaksd</h1>
            <h1>asjdaksd</h1>
            <h1>asjdaksd</h1>            <h1>asjdaksd</h1>
            <h1>asjdaksd</h1>
            <h1>asjdaksd</h1>
            <h1>asjdaksd</h1>
            <h1>asjdaksd</h1>
            <h1>asjdaksd</h1>
            <h1>asjdaksd</h1>
            <h1>asjdaksd</h1>
            <h1>asjdaksd</h1>
            <h1>asjdaksd</h1>
            <h1>asjdaksd</h1>
            <h1>asjdaksd</h1>
            <h1>asjdaksd</h1>
            <h1>asjdaksd</h1>
            <h1>asjdaksd</h1>
            <h1>asjdaksd</h1>
            <h1>asjdaksd</h1>
            <h1>asjdaksd</h1>
            <h1>asjdaksd</h1>
            <h1>asjdaksd</h1>
            <h1>asjdaksd</h1>
            <h1>asjdaksd</h1>
            <h1>asjdaksd</h1>
            <h1>asjdaksd</h1>
            <h1>asjdaksd</h1>
            <h1>asjdaksd</h1>
            <h1>asjdaksd</h1>
            <h1>asjdaksd</h1>
            <h1>asjdaksd</h1>
            <h1>asjdaksd</h1>
            <h1>asjdaksd</h1>
            <h1>asjdaksd</h1>
           <button onClick={(e) => getPosition(e)}>点击</button>
          </div>
   
        </div>
      </div>
      <div className='lazyContainer'>
        <div className='container'>
          <div className='lists'>
            {renderImgs()}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Demo 