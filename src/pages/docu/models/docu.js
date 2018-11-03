import { queryFileCenterList} from '@/services/api';

export default {
  namespace: 'docu',

  state: {
    fileCenterList:[]
  },

  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(queryFileCenterList);
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
