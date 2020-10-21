const dev = {
    // cutterBase: 'https://exam.abcpen.com',
    cutterBase: 'https://exam.abcpen.com/',
    openBase: 'http://owl-test.woyoushi.com',
    weixinAppId: 'wx5ed2f11ee432428a',
    weixinRedirectUri: 'https://www.abcpen.com/display/middleware.html',
    // mpBase: 'https://zarkshao.cn'
    mpBase: 'http://owl-test.woyoushi.com'
    // http://owl-test.woyoushi.com/webapi/user/login/QRCode/query
  };
  /**
  * 笔声智能公众号
  * @type {{cutterBase: string, openBase: string, weixinAppId: string, weixinRedirectUri: string}}
  */
  const pro = {
    cutterBase: 'https://exam.abcpen.com',
    openBase: 'https://owl.abcpen.com',
    payBase: 'https://pay.abcpen.com',
    weixinAppId: 'wx5ed2f11ee432428a',
    weixinRedirectUri: 'https://www.abcpen.com/display/middleware.html',
    mpBase: 'https://mp.abcpen.com'
  };
  
  let env = dev;
  
  if (process.env.BUILD_TARGET === 'pro') {
    env = pro;
  }
  
module.exports = env