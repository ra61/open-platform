import { query as queryUsers, queryCurrent } from '@/services/user';
import { 
  getDeveloperInfo, // 获取个人信息
  updateDeveloperInfo, // 更新个人信息
  getSafeInfo, // 获取安全设置信息
  getVerifyCode, // 通过手机获取验证码
  modifyPassword, // 安全设置-修改密码
  bandingCheck, // 重新绑定前的手机验证
  bindPhone, // 绑定手机
  getEmailVerifyCode, // 通过邮箱获取验证码
  bindEmail,  // 绑定邮箱
  resetPasswordByPhone, // 通过手机重置密码
  resetPasswordByEmail,  // 通过邮箱重置密码
  accountLogin // 登录
} from '@/services/api';
import { message } from 'antd';
import router from 'umi/router';
import Cookies from 'js-cookie';
import { setAuthority } from '@/utils/authority';

export default {
  namespace: 'user',

  state: {
    list: [],
    currentUser: {},
    safeInfo:{}
  },

  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(queryUsers);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *fetchCurrent({ callback }, { call, put }) {
      const response = yield call(getDeveloperInfo);
      if(response.name){
        yield put({
          type: 'saveCurrentUser',
          payload: response,
        });
      } else {
        callback && callback(response);
      }
      
    },
    *UpdateDeveloperInfo({ payload, callback }, { call, put }) {
      const response = yield call(updateDeveloperInfo, payload);
      callback && callback(response)
    },
    *getVerifyCode({ payload }, { call, put }) {
      const response = yield call(getVerifyCode, payload);

      // 是否跳转 跳转地址
      if (response.status == 'ok' && payload.redirect){
        router.push({
          pathname: payload.redirect,
          state: {
            phone: payload.phone,
          },
        });
      };

      // 提示信息
      response.message && message.success(response.message);
    },
    *fetchSafeInfo(_, { call, put }) {
      const response = yield call(getSafeInfo);
      yield put({
        type: 'safe',
        payload: response,
      });
    },
    *modifyPassword({ payload }, { call, put }) {
      const response = yield call(modifyPassword, payload);
      response.message && message.success(response.message);
    },
    *resetPasswordByPhone({ payload }, { call, put }) {
      const response = yield call(resetPasswordByPhone, payload);

      // 是否跳转 跳转地址
      if (response.status == 'ok' && payload.redirect) {
        router.push(payload.redirect);
      };

      // 提示信息
      response.message && message.success(response.message);
    },
    *resetPasswordByEmail({ payload }, { call, put }) {
      const response = yield call(resetPasswordByEmail, payload);

      // 是否跳转 跳转地址
      if (response.status == 'ok' && payload.redirect) {
        router.push(payload.redirect);
      };

      // 提示信息
      response.message && message.success(response.message);
    },
    *bandingCheck({ payload }, { call, put }) {
      const response = yield call(bandingCheck, payload);

      // 是否跳转 跳转地址
      if (response.status == 'ok' && payload.redirect) {
        router.push(payload.redirect);
      };

      // 提示信息
      response.message && message.success(response.message);
    },
    *bindPhone({ payload }, { call, put }) {
      const response = yield call(bindPhone, payload);

      // 是否跳转 跳转地址
      if (response.status == 'ok' && payload.redirect) {
        router.push(payload.redirect);
      };

      // 提示信息
      response.message && message.success(response.message);
    },
    *getEmailVerifyCode({ payload }, { call, put }) {
      const response = yield call(getEmailVerifyCode, payload);

      // 是否跳转 跳转地址
      if (response.status == 'ok' && payload.redirect) {
        router.push({
          pathname: payload.redirect,
          state: {
            email: payload.email,
          },
        });
      };

      // 提示信息
      response.message && message.success(response.message);
    },
    *bindEmail({ payload }, { call, put }) {
      const response = yield call(bindEmail, payload);

      // 是否跳转 跳转地址
      if (response.status == 'ok' && payload.redirect) {
        router.push(payload.redirect);
      };

      // 提示信息
      response.message && message.success(response.message);
    },
  },

  reducers: {
    
    safe(state, { payload }) {
      return {
        ...state,
        safeInfo: payload.data
      };
    },
    save(state, action) {
      return {
        ...state,
        list: action.payload,
      };
    },
    saveCurrentUser(state, { payload }) {
      return {
        ...state,
        currentUser: payload || {},
      };
    },
    changeNotifyCount(state, action) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifyCount: action.payload,
        },
      };
    },
    changeLoginStatus(state, { payload }) {
      setAuthority(payload.currentAuthority);
      return {
        ...state,
        status: payload.status,
        message: payload.message,
        type: payload.type || 'account',
      };
    },
  },
};
