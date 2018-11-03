import { queryAppBasicInfo } from '@/services/api';

export default {
  namespace: 'appBasicInfo',

  state: {
    appList: [],
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryAppBasicInfo, payload);
      console.log(response)
      yield put({
        type: 'show',
        payload: response,
      });
    }
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
