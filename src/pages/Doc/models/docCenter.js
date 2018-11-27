import { getDocSummary } from '@/services/api';

export default {
  namespace: 'docCenter',

  state: {
    fileCenterList: []
  },

  effects: {
    *fetchDocSummary(_, { call, put }) {
      const response = yield call(getDocSummary);
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
