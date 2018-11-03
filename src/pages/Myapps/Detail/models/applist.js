import { queryAppList, queryAppListPagination } from '@/services/api';

export default {
  namespace: 'applist',

  state: {
    appList: [],
  },

  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(queryAppList);
      yield put({
        type: 'show',
        payload: response,
      });
    },
    *fetchPagination({ payload }, { call, put }) {
      const response = yield call(queryAppListPagination, payload);
      console.log(response);
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
