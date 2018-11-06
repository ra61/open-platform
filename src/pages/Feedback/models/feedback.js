import { queryFeedbackList, queryFeedbackDetail, queryDialogList, addFeedback } from '@/services/api';

export default {
  namespace: 'feedback',

  state: {
    dialogList: [],
    feedbackDetail: {}
  },

  effects: {
    *fetchList({ payload }, { call, put }) {
      const response = yield call(queryFeedbackList, payload);
      yield put({
        type: 'show',
        payload: response,
      });
    },
    *fetchDetail({ payload }, { call, put }) {
      const response = yield call(queryFeedbackDetail, payload);
      yield put({
        type: 'detail',
        payload: response,
      });
    },
    *fetchDialog({ payload }, { call, put }) {
      const response = yield call(queryDialogList, payload);
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
    detail(state, { payload }) {
      return {
        ...state,
        feedbackDetail: payload.feedback,
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
