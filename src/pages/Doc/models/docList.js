import { getDocList} from '@/services/api';

export default {
  namespace: 'docList',

  state: {
    documentList: [],
    totalCount: 0
  },

  effects: {
    *fetchDocList({ payload }, { call, put }) {
      const response = yield call(getDocList, payload);
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
