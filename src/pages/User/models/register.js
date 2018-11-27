import { doAjaxRegister, getVerifyCode } from '@/services/api';
import { setAuthority } from '@/utils/authority';
import { reloadAuthorized } from '@/utils/Authorized';
import { message } from 'antd';

export default {
  namespace: 'register',

  state: {
    status: undefined,
  },

  effects: {
    *submit({ payload }, { call, put }) {
      const response = yield call(doAjaxRegister, payload);
      yield put({
        type: 'registerHandle',
        payload: response,
      });

      if (response.status == 'ok'){
        response.message && message.success(response.message);
      }

      if (response.status == 'error') {
        response.message && message.error(response.message);
      }
    },
    *getVerifyCode({ payload }, { call }) {
      const response = yield call(getVerifyCode, payload);
      
      if (response.status == 'ok') {
        response.message && message.success(response.message);
      }

      if (response.status == 'error') {
        response.message && message.error(response.message);
      }
    },
  },

  reducers: {
    registerHandle(state, { payload }) {
      setAuthority('user');
      reloadAuthorized();
      return {
        ...state,
        status: payload.status,
      };
    },
    reset() {
      return {
        status: undefined
      };
    },
  },
};
