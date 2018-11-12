import { query as queryUsers, queryCurrent } from '@/services/user';
import { 
  getDeveloperInfo, 
  updateDeveloperInfo, 
  getSafeInfo, 
  getVerifyCode, 
  modifyPassword, 
  bandingCheck, 
  bindPhone, 
  getEmailVerifyCode,
  bindEmail 
} from '@/services/api';
import { message } from 'antd';
import router from 'umi/router';


export default {
  namespace: 'user',

  state: {
    list: [],
    currentUser: {},
    safeInfo:{},
    phone:''
  },

  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(queryUsers);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *fetchCurrent(_, { call, put }) {
      const response = yield call(getDeveloperInfo);
      yield put({
        type: 'saveCurrentUser',
        payload: response,
      });
    },
    *UpdateDeveloperInfo({ payload }, { call, put }) {
      const response = yield call(updateDeveloperInfo, payload);
    },
    *getVerifyCode({ payload }, { call, put }) {
      const response = yield call(getVerifyCode, payload);

      // 是否跳转 跳转地址
      if (response.status == 'ok' && payload.redirect){
        router.push(payload.redirect);
      };

      // 提示信息
      message.success(response.message);
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
      message.success(response.message);
    },
    *bandingCheck({ payload }, { call, put }) {
      const response = yield call(bandingCheck, payload);

      // 是否跳转 跳转地址
      if (response.status == 'ok' && payload.redirect) {
        router.push(payload.redirect);
      };

      // 提示信息
      message.success(response.message);
    },
    *bindPhone({ payload }, { call, put }) {
      const response = yield call(bindPhone, payload);

      // 是否跳转 跳转地址
      if (response.status == 'ok' && payload.redirect) {
        router.push(payload.redirect);
      };

      // 提示信息
      message.success(response.message);
    },
    *getEmailVerifyCode({ payload }, { call, put }) {
      const response = yield call(getEmailVerifyCode, payload);

      // 是否跳转 跳转地址
      if (response.status == 'ok' && payload.redirect) {
        router.push(payload.redirect);
      };

      // 提示信息
      message.success(response.message);
    },
    *bindEmail({ payload }, { call, put }) {
      const response = yield call(bindEmail, payload);

      // 是否跳转 跳转地址
      if (response.status == 'ok' && payload.redirect) {
        router.push(payload.redirect);
      };

      // 提示信息
      message.success(response.message);
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
  },
};
