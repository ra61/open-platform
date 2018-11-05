import { queryAppList } from '@/services/api';

export default {
  namespace: 'applist',

  state: {
    appList: [],
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryAppList, payload);

      yield put({
        type: 'show',
        payload: response,
      });
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
