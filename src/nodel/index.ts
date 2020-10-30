import { Reducer, AnyAction } from 'redux';
import { Effect, EffectsCommandMap } from 'dva';
import { getThirdPartyConfig, uaAssert } from '@/utils/utils';
import * as user from '@/services/account';
import { message } from 'antd';

export interface UpdateInfoParamsType {
  payload: {
    userName: string;
    avatar?: string;
  };
  callback: Function;
}

export interface BindEmailParamsType {
  payload: {
    email: string;
    verifyCode: string;
  };
  callback: Function;
}

export interface BindMobileParamsType {
  payload: {
    mobile: string;
    verifyCode: string;
  };
  callback: Function;
}

export type StateType = {
  userInfo: user.UserInfoType;
};

export interface ModelType {
  namespace: 'account';
  state: StateType;
  effects: {
    getBasicInfo: Effect;
    getLatestPackage: Effect;
    updateInfo: any;
    bindEmail: any;
    bindMobile: any;
  };
  reducers: {
    saveBasicInfo: Reducer<StateType>;
  };
}

const AccountModel: ModelType = {
  namespace: 'account',
  state: {
    userInfo: {
      avatar: '',
      userName: '',
      mobile: '',
      email: '',
      hasPassword: false,
      roomMo: {},
    },
  },
  effects: {
    /**
     * 获取用户基本信息
     * @param param0
     * @param param1
     */
    * getBasicInfo({ callback }: AnyAction, { call, put }: EffectsCommandMap) {
      const res = yield call(user.basicInfo);
      if (res && res.data.success) {
        yield put({
          type: 'saveBasicInfo',
          payload: res.data.data,
        });
        const userStr = localStorage.currentUser;
        if (userStr) {
          const currentUser = JSON.parse(userStr);
          const newUser = Object.assign(currentUser, { ...res.data.data });
          yield put({
            type: 'user/saveCurrentUser',
            payload: newUser,
          });
        }
        if (callback) callback(res.data.data);
      }
    },

    /**
     * 获取最新安装包存进本地缓存
     */
    * getLatestPackage({ payload, callback }, { call }: EffectsCommandMap) {
      const ua = uaAssert();
      let platform;
      const Config = getThirdPartyConfig();
      let pkgName;
      if (ua.isMac) {
        platform = 'MAC';
        pkgName = Config.DOWNLOAD_CONFIG.MAC;
      } else if (ua.isPc) {
        platform = 'WINDOWS';
        pkgName = Config.DOWNLOAD_CONFIG.WINDOWS;
      } else if (ua.isIOS) {
        platform = 'IOS';
        pkgName = Config.DOWNLOAD_CONFIG.IOS;
      } else if (ua.isAndroid) {
        platform = 'ANDROID';
        pkgName = Config.DOWNLOAD_CONFIG.ANDROID;
      }
      if (payload && payload.platform) {
        platform = payload.platform;
        pkgName = Config.DOWNLOAD_CONFIG[platform];
      }
     // console.log("package",pkgName,platform);
      const res = yield call(user.latestPackage, { packageName: pkgName, platform });
      if (res && res.data.success) {
        localStorage.latestPackage = JSON.stringify(res.data.data);
        if (callback) {
          callback(res.data.data);
        }
      }
    },

    /**
     * 更新用户新
     * @param param0
     * @param param1
     */
    * updateInfo({ payload, callback }: UpdateInfoParamsType, { call, put }: EffectsCommandMap) {
      const res = yield call(user.updateInfo, payload);
      if (res && res.data.success) {
        yield put({
          type: 'getBasicInfo',
        });
        const userStr = localStorage.currentUser;
        if (userStr) {
          const currentUser = JSON.parse(userStr);
          currentUser.userName = payload.userName;
          currentUser.avatar = payload.avatar;
          yield put({
            type: 'user/saveCurrentUser',
            payload: currentUser,
          });
        }
        if (callback) callback();
      } else {
        // message.error(res.data.msg);
      }
    },

    /**
     * 绑定邮箱
     * @param param0
     * @param param1
     */
    * bindEmail({ payload, callback }: BindEmailParamsType, { call, put }: EffectsCommandMap) {
      const res = yield call(user.bindEmail, payload);
      if (res && res.data.success) {
        yield put({
          type: 'getBasicInfo',
        });
        if (callback) callback();
      } else {
        // message.error(res.data.msg);
      }
    },

    /**
     * 绑定手机号
     * @param param0
     * @param param1
     */
    * bindMobile({ payload, callback }: BindMobileParamsType, { call, put }: EffectsCommandMap) {
      const res = yield call(user.bindMobile, payload);
      // console.log(res);
      if (res && res.data.success) {
        yield put({
          type: 'getBasicInfo',
        });
      } else {
        message.error(res.data.msg ? res.data.msg : 'Network Error');
      }
      if (callback) callback(res.data);
    },
  },

  reducers: {
    saveBasicInfo(state, { payload }): StateType {
      return {
        ...state,
        userInfo: payload,
      };
    },
  },
};

export default AccountModel;
