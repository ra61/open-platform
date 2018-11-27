import { getDocDetail, upDownDoc } from '@/services/api';

export default {
  namespace: 'docDetail',

  state: {
    docData: {},
  },

  effects: {
    *fetchDocDetail({ payload, callback }, { call, put }) {
      const response = yield call(getDocDetail, payload);
      yield put({
        type: 'show',
        payload: {
          docData: response.document,
        },
      });
      callback && callback(response.document);
    },
    *fetchUpDownDoc({ payload, callback }, { call, put }) {
      const response = yield call(upDownDoc, payload);
      callback && callback(response);
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
