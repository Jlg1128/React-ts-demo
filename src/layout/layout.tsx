import React, { useState } from 'react'

import './layout.scss'



type Props = {
  children?: React.ReactNode
}

const menuDatas = [{
  label: '首页',
  key: 'home',
  src: './',
  target: '_self',
}, {
  key: 'productService',
  label: '产品与服务',
  src: './productService.html',
  target: '_self',
}, {
  key: 'cloudService',
  label: '云服务',
  src: './cloudService.html',
  target: '_self',
}, {
  key: 'channelCooperation',
  label: '渠道合作',
  src: './channelCooperation.html',
  target: '_self',
}, {
  key: 'specifiedPrice',
  label: '定价',
  src: './specifiedPrice.html',
  target: '_self',
}, {
  key: 'help',
  label: '帮助中心',
  src: './help.html',
  target: '_self',
}, {
  key: 'aboutUs',
  label: '关于我们',
  src: './aboutUs.html',
  target: '_self',
}];

const Layout: React.FC<Props> = ({ children }) => {
  const [ activeIndex, setActive ] = useState(0)
  function renderNav(){
    return  menuDatas.map((item,index) => {
      return (
        <div onClick={ () => setActive(index) }  className='list' key={index}>
          <div className='list-title'>{item.label}</div>
        </div>
      )
    })
  }

  return (
    <div className='layoutContainer'>
      <div className='container'>
        <div className='layoutHead'>
          <div className='lists'>
            {renderNav()}
          </div>
        </div>
      </div>
      {children}
      <div className='container'>
        <div className='layoutFoot'>123</div>
      </div>
    </div>
  )
}

export default Layout