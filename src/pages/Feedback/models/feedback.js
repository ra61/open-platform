import { queryFeedbackList, queryFeedbackDetail, addFeedback } from '@/services/api';

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
    },
    *add({ payload, callback }, { call, put }) {
      const response = yield call(addFeedback, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
  },

  reducers: {
    show(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
    save(state, action) {
      return {
        ...state,
        data: action.payload,
      };
    },
  },
};
