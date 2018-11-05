import { queryFileCenterList, queryDocumentList} from '@/services/api';

export default {
  namespace: 'docu',

  state: {
    fileCenterList: [],
    documentList: []
  },

  effects: {
    *fetchFileCenterList(_, { call, put }) {
      const response = yield call(queryFileCenterList);
      yield put({
        type: 'queryList',
        payload: response,
      });
    },
    *fetchDocumentList({ payload }, { call, put }) {
      const response = yield call(queryDocumentList, payload);
      yield put({
        type: 'queryList',
        payload: response,
      });
    }
  },

  reducers: {
    queryList(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};
