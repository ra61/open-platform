import { getDocDetail, upDownDoc } from '@/services/api';

export default {
  namespace: 'docDetail',

  state: {
    docData: {}
  },

  effects: {
    *fetchDocDetail({ payload }, { call, put }) {
      const response = yield call(getDocDetail, payload);
      yield put({
        type: 'show',
        payload: {
          docData: response.document
        }
      });
    },
    *fetchUpDownDoc({ payload }, { call, put }) {
      const response = yield call(upDownDoc, payload);
      yield put({
        type: 'show',
        payload: response
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
