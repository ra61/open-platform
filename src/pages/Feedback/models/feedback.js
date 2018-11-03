import { queryFeedbackList, queryFeedbackDetail } from '@/services/api';

export default {
  namespace: 'feedback',

  state: {
    FeedbackList: [],
    FeedbackDetail: []
  },

  effects: {
    *fetchList({ payload }, { call, put }) {
      const response = yield call(queryFeedbackList, payload);
      yield put({
        type: 'show',
        payload: response,
      });
    },
    *fetchDetail(_, { call, put }) {
      const response = yield call(queryFeedbackDetail);
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
