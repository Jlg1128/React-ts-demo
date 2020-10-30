/**
 * request 网络请求工具
 * 更详细的 api 文档: https://github.com/umijs/umi-request
 */
import { extend } from 'umi-request';
import { notification, message } from 'antd';
import { uaAssert } from '@/utils/utils';
import Config from '@/const/env';
import apiConf from './apiConf';

import { refreshToken } from '../login';

interface ResponseData {
  code: string;
  msg: string;
  success: boolean;
  timestamp: number;
}

// const codeMessage = {
//   200: '服务器成功返回请求的数据。',
//   201: '新建或修改数据成功。',
//   202: '一个请求已经进入后台排队（异步任务）。',
//   204: '删除数据成功。',
//   400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
//   401: '用户没有权限（令牌、用户名、密码错误）。',
//   403: '用户得到授权，但是访问是被禁止的。',
//   404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
//   406: '请求的格式不可得。',
//   410: '请求的资源被永久删除，且不会再得到的。',
//   422: '当创建一个对象时，发生一个验证错误。',
//   500: '服务器发生错误，请检查服务器。',
//   502: '网关错误。',
//   503: '服务不可用，服务器暂时过载或维护。',
//   504: '网关超时。',
// };

/**
 * 异常处理程序
 */
const errorHandler = async (error: { response: Response, data: ResponseData }): Response => {
  const { response, data } = error;
  if (data && data.msg) {
    // const { msg } = data;
    // if (data.code === '1006') {
    //   if (/refreshToken/.exec(response.url)) {
    //     window.g_app._store.dispatch({
    //       type: 'login/logout'
    //     })
    //   } else {
    //     window.g_app._store.dispatch({
    //       type: 'login/refreshToken',
    //       callback: () => { console.log("CALLBACK") }
    //     })
    //   }
    //   // const { redirect } = getPageQuery();
    //   // localStorage.clear();
    //   // // Note: There may be security issues, please note
    //   // if (window.location.pathname !== '/user/login' && !redirect) {
    //   //   router.replace({
    //   //     pathname: '/user/login',
    //   //     search: stringify({
    //   //       redirect: window.location.href,
    //   //     }),
    //   //   });
    //   // }
    //   return response;
    // }

    // notification.error({
    //   message: msg,
    //   // description: msg,
    // });
  } else if (!data || !data.msg) {
    if (uaAssert().isMobile) {
      message.error('网络异常');
    } else {
      notification.error({
        description: '您的网络发生异常，无法连接服务器',
        message: '网络异常',
      });
    }
  }
  return error;
};

/**
 * 配置request请求时的默认参数
 */
const requester = extend({
  prefix: apiConf.baseURL,
  errorHandler, // 默认错误处理
  getResponse: true,
  timeout: 15000,
  headers: {
    channel: Config.CHANNEL,
  },
  // credentials: 'include', // 默认请求是否带上cookie
});

/**
 * 增加401 状态下的
 * @param url
 * @param params
 */
const request = async (url: string, params: any, notErrorNote?: boolean): Promise<any> => {
  // TODO 后续优化配置入口
  const apiVersion = '2.0.1';

  const obj: any = {
    prefix: apiConf.baseURL,
    getResponse: true,
    timeout: 15000,
    headers: {
      channel: Config.CHANNEL,
      platform: 'web',
      apiversion: apiVersion,
    },
  };
  if (!notErrorNote) {
    obj.errorHandler = errorHandler;
  }
  let res: any;
  try {
    res = await extend(obj)(url, params);
  } catch (err) {
     console.log('REQUEST ERROR :: ', err, JSON.stringify(err));

     if (!res) res = err; // joe add： post下，res为null
  }

  if (!res) {
    return;
  }

  const { data, response } = res;
  if (!data) {
    // notification.error({
    //   message: '网络错误，请重试',
    // })
    return;
  }
  const { msg } = data;
  let ret = res;

  if (data.code !== '0000') {
    if (data.code === '1006' || data.code === '10006') {
      if (/refreshToken/.exec(response.url)) {
        if (uaAssert().isMobile) {
          message.error('身份认证失败，请重新登陆');
        } else {
          notification.error({
            message: '身份认证失败，请重新登陆',
            // description: msg,
          });
        }
        window.g_app._store.dispatch({
          type: 'login/logout',
        });
      } else if (localStorage.currentUser) {
        const currentUser: UserModel.CurrentUser = JSON.parse(localStorage.currentUser);
        if (currentUser && currentUser.refreshToken) {
          const res2 = await refreshToken(currentUser.refreshToken);
          if (res2 && res2.data && res2.data.success) {
            const { accessToken, refreshToken: newfresh } = res2.data.data;
            currentUser.token = accessToken;
            currentUser.refreshToken = newfresh;
            localStorage.currentUser = JSON.stringify(currentUser);
            localStorage.token = accessToken;
            if (params && params.headers && params.headers.token) {
              params.headers.token = accessToken;
            }
            ret = await requester(url, params);
          }
        }
      }
      // const { redirect } = getPageQuery();
      // localStorage.clear();
      // // Note: There may be security issues, please note
      // if (window.location.pathname !== '/user/login' && !redirect) {
      //   router.replace({
      //     pathname: '/user/login',
      //     search: stringify({
      //       redirect: window.location.href,
      //     }),
      //   });
      // }
    } else {
      console.log('response code is not 0000', notErrorNote, msg);
      if (!notErrorNote && !!msg) {
        if (uaAssert().isMobile) {
          message.error(msg);
        } else {
          notification.error({
            message: msg,
            // description: msg,
          });
        }
      }
    }
  }

  return new Promise((r) => { r(ret); });
};

export default request;
