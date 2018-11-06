import { queryAppBasicInfo, updateAppBasicInfo } from '@/services/api';
import {
  message
} from 'antd';

export default {
  namespace: 'appBasicInfo',

  state: {
    appInfo: {},
    appkeys: []
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryAppBasicInfo, payload);
      yield put({
        type: 'show',
        payload: {
          appInfo: response.appInfo,
          appkeys: response.appInfo.appkeys
        }
      });
    },
    *submitForm({ payload }, { call, put }) {
      const response = yield call(updateAppBasicInfo, payload);
      yield put({
        type: 'show',
        payload: response,
      });
      message.success('提交成功');
    },
  },

  reducers: {
    show(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};
