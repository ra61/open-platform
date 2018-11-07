import { routerRedux } from 'dva/router';
import { message } from 'antd';
import { submitCreateNewApp } from '@/services/api';

export default {
  namespace: 'createNewApp',

  state: {
    result: {},
    info:{}
  },

  effects: {
    *submitCreateNewApp({ payload }, { call, put }) {
      const response = yield  call(submitCreateNewApp, payload);
      yield put({
        type: 'backInfo',
        payload: response
      });
      yield put(routerRedux.push('/createApp/backInfo'));
    }
  },

  reducers: {
    backInfo(state, { payload }) {
      return {
        ...state,
        result: payload,
        info: payload.info
      };
    },
  },
};
