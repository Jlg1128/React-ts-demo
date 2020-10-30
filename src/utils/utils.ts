import axios from 'axios';

const Host = `${window.location.protocol}//${window.location.host}/zmeet`;
// const API_Host = `${window.location.protocol}//${window.location.host}`;
const API_Host = 'https://a.abcpen.com';

const DOWNLOAD_CONFIG = 'com.abcpen.meeting';

/**
 * 获取当前用户信息
 */
export const getCurrentUser = () => {
  const str = localStorage.getItem('currentUser');
  if (str) {
    return JSON.parse(str);
  }
};

/**
 * 下载客户端相关
 */
export enum Platform {
  Windows = 'WINDOWS',
  Android = 'ANDROID',
  Mac = 'MAC',
  iOS = 'IOS',
}

export const download = (type: Platform | null | string) => {
  let platform = '';
  if (type) {
    platform = type;
  } else if (uaAssert().isMobile) {
    platform = uaAssert().isAndroid ? Platform.Android : Platform.iOS;
  }
  if (platform) {
    axios.get(`${API_Host}/api/package/latest`, {
      params: {
        packageName: DOWNLOAD_CONFIG,
        platform,
      },
    }).then((res: any) => {
      if (res.data.success) {
        const a = document.createElement('a');
        a.href = res.data.data.packageUrl;
        a.click();
      }
    });
  }
};

/**
 * 判断dom是否出现在可视区域
 * @param any
 */
export const displayClient = (dom: any) => {
  const box = dom.getBoundingClientRect();
    const top = (box.top >= 0);
    const left = (box.left >= 0);
    const bottom = (box.bottom <= (window.innerHeight || document.documentElement.clientHeight));
    const right = (box.right <= (window.innerWidth || document.documentElement.clientWidth));
  if (top && left && bottom && right) {
    return true;
  }
  return false;
};

/**
 * assert判断环境
 *
 */
export const uaAssert = () => {
  const { userAgent } = navigator;
  const isMobile = !!userAgent.match(
    /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i,
  );

  const isIOS9 = () => {
    // 获取固件版本
    const getOsv = () => {
      const regOS = /OS ((\d+_?){2,3})\s/;
      if (
        navigator.userAgent.match(/iPad/i)
        || navigator.platform.match(/iPad/i)
        || navigator.userAgent.match(/iP(hone|od)/i)
        || navigator.platform.match(/iP(hone|od)/i)
      ) {
        const osv = regOS.exec(navigator.userAgent);
        // @ts-ignore
        if (osv.length > 0) {
          // @ts-ignore
          return osv[0]
            .replace('OS', '')
            .replace('os', '')
            .replace(/\s+/g, '')
            .replace(/_/g, '.');
        }
      }
      return '';
    };
    const osv = getOsv();
    const osvArr = osv.split('.');

    if (osvArr && osvArr.length > 0) {
      if (Number(osvArr[0]) >= 9) {
        return false;
      }
    }
    return true;
  };

  return {
    ua: userAgent,
    isAndroid: !!(
      userAgent.indexOf('Android') > -1 || userAgent.indexOf('Adr') > -1
    ),
    // android终端
    isIOS: !!userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), // ios终端
    isIOS9: isIOS9(),
    isWeiXin: !!(userAgent.indexOf('MicroMessenger') > -1),
    isMobile,
    isMac: userAgent.match(/OS X/) && !isMobile,
    isPc: !isMobile,
    isChrome: !!(userAgent.indexOf('Chrome') > -1),
    isSafari: !!(userAgent.indexOf('Safari') > -1 && userAgent.indexOf('Chrome') === -1),
  };
};

// 懒加载
/**
 *
 * @param id dom节点或者 querySelectorAll所得的object
 */

export function lazyLoad(imgs:any) {
  const arr = arguments[0].length ? Array.prototype.slice.call(arguments[0]) : Array.prototype.slice.call(arguments);
    arr.map((item) => {
      if (!item.id || item.src) {
        return;
      }
      const { top, height } = item.getBoundingClientRect();
      const seenHeight = height / 3;
      if (document.documentElement.clientHeight >= top) {
        item.src = item.dataset.src;
      } else {
        window.addEventListener('scroll', () => {
          if (document.documentElement.clientHeight >= (top + seenHeight)) {
            console.log(item);
            item.src = item.dataset.src;
          }
       });
      }
    });
}

/**
 * 检查元素是否进入可视区域
 * @param el
 */
export const checkInClient = (el:any) => {
  if (!el) return false;
  const { clientHeight } = document.documentElement;
  const contentTop = el.getBoundingClientRect().top;
  const contentHeight = el.offsetHeight;
  return (contentTop < clientHeight && contentTop >= 0) || (contentTop < 0 && (contentTop + contentHeight > 0));
};
